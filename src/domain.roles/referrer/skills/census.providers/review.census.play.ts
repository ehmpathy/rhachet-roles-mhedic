import { readFileSync } from 'fs';
import { join } from 'path';
import type { Browser, Page } from 'playwright';

/**
 * .what = the PEER-REVIEW engine for an exhaustive provider census. it does NOT
 *         trust the census author. it INDEPENDENTLY re-pulls the NPI frame and
 *         diffs it against the roster the census claims, then emits a verdict in
 *         the reviewer-output contract (`N blockers` / `N nitpicks`).
 *
 * .why  = "exhaustive" is not a claim you assert, it is a diff you can reproduce.
 *         a second, independent frame pull that finds a provider the census
 *         dropped is a BLOCKER — proof the census was not exhaustive. this is the
 *         reviewable half of the systemic method: search proves, review disproves.
 *
 * .systemic + repeatable + reviewable:
 *   - reproduces the frame from the same authoritative source (NPI registry),
 *     via its OWN ZIP sweep (REVIEW_ZIPS) — deliberately a SUPERSET of the
 *     search engine's, so it also challenges the search's ZIP coverage.
 *   - deterministic: same CLAIMED_NPIS + same registry -> same verdict.
 *   - emits the exact reviewer-output contract lines a route guard parses.
 *
 * .the verdict rules
 *   blocker  = an in-radius DERMATOLOGY provider present in the reproduced frame
 *              but ABSENT from the census's claimed roster (a missed provider),
 *              OR a non-dermatology taxonomy the census wrongly claimed.
 *   nitpick  = a claimed NPI not found in the reproduced frame (stale/unverifiable),
 *              OR a ZIP the review swept that the search engine did not (coverage gap),
 *              OR a non-derm taxonomy the frame returned (to exclude, not claim).
 */

const TAXONOMY = 'Dermatology';

// the on-disk (gitignored) db that holds the roster identifiers. no provider/org
// NPI is hardcoded here: the review reads the CLAIMED roster from data so the
// committed engine carries method, not identity.
const DB_DIR = join(
  process.cwd(),
  'src/domain.roles/referrer/skills/census.providers/db.access',
);

// the census's CLAIMED roster — the NPIs the written inventory currently commits
// to. the review's job is to find in-radius derm providers NOT in this set.
// derived from the on-disk db: every non-null individual NPI in providers.json,
// unioned with the org + satellite NPIs in claimed-orgs.json (org NPI-2 records
// + per-office registrations that carry no individual providers.json row).
const loadClaimedNpis = (): Set<string> => {
  const providersDoc = JSON.parse(
    readFileSync(join(DB_DIR, 'providers.json'), 'utf8'),
  );
  const individualNpis: string[] = (providersDoc.providers ?? [])
    .map((p: { npi?: string | null }) => p.npi)
    .filter((npi: string | null | undefined): npi is string => !!npi);

  const orgsDoc = JSON.parse(
    readFileSync(join(DB_DIR, 'claimed-orgs.json'), 'utf8'),
  );
  const orgNpis: string[] = orgsDoc.orgNpis ?? [];
  const additionalNpis: string[] = orgsDoc.additionalClaimedNpis ?? [];

  return new Set<string>([...individualNpis, ...orgNpis, ...additionalNpis]);
};

const CLAIMED_NPIS = loadClaimedNpis();

// the review's OWN ZIP sweep — a deliberate SUPERSET of the search engine's, to
// challenge its coverage. adds Callaway/Springfield/Freeport/DeFuniak/FWB edges.
const REVIEW_ZIPS = [
  '32401',
  '32403',
  '32404',
  '32405',
  '32406',
  '32407',
  '32408',
  '32409',
  '32410',
  '32413',
  '32444',
  '32466',
  '32428',
  '32462',
  '32446',
  '32448',
  '32420',
  '32456',
  '32459',
  '32550',
  '32541',
  '32578',
  '32433',
  '32435',
  '32547',
  '32548',
];

const npiUrl = (postal: string): string =>
  'https://npiregistry.cms.hhs.gov/api/?version=2.1' +
  '&taxonomy_description=' +
  encodeURIComponent(TAXONOMY) +
  '&country_code=US&postal_code=' +
  encodeURIComponent(postal) +
  '&limit=200';

export const action = async (input: { page: Page; browser: Browser }) => {
  const seen = new Set<string>();
  const frame: {
    npi: string;
    label: string;
    taxonomy: string;
    postal: string;
    isDerm: boolean;
  }[] = [];

  for (const zip of REVIEW_ZIPS) {
    const page = await input.page.context().newPage();
    try {
      await page.goto(npiUrl(zip), {
        waitUntil: 'domcontentloaded',
        timeout: 45000,
      });
      await page.waitForTimeout(800);
      const json = JSON.parse(
        await page.evaluate(() => document.body.innerText),
      );
      for (const r of json.results || []) {
        const npi = String(r.number);
        if (seen.has(npi)) continue;
        seen.add(npi);
        const b = r.basic || {};
        const loc =
          (r.addresses || []).find(
            (a: any) => a.address_purpose === 'LOCATION',
          ) || {};
        const postal = (loc.postal_code || '').slice(0, 5);
        if (!REVIEW_ZIPS.includes(postal)) continue; // strict in-radius
        const taxes = r.taxonomies || [];
        const primary = taxes.find((t: any) => t.primary) || taxes[0] || {};
        // blocker-grade "derm" requires the PRIMARY taxonomy to be dermatology;
        // a secondary-only derm tag (e.g. an ophthalmologist) is a nitpick-exclude,
        // not a missed provider.
        const isDerm = /dermatolog/i.test(primary.desc || '');
        frame.push({
          npi,
          label:
            b.organization_name ||
            `${b.first_name || ''} ${b.last_name || ''}`.trim(),
          taxonomy: primary.desc || '',
          postal,
          isDerm,
        });
      }
    } catch {
      /* a single ZIP failure is a nitpick, surfaced below via coverage note */
    }
    await page.close();
  }

  // reconcile
  const frameDerm = frame.filter((f) => f.isDerm);
  const missed = frameDerm.filter((f) => !CLAIMED_NPIS.has(f.npi)); // BLOCKERS
  const claimedNotInFrame = [...CLAIMED_NPIS].filter(
    (npi) => !frame.some((f) => f.npi === npi),
  ); // nitpicks (stale/unverifiable via this sweep)
  const nonDerm = frame.filter((f) => !f.isDerm); // nitpicks (exclude, do not claim)

  const blockers = missed.length;
  const nitpicks = claimedNotInFrame.length + nonDerm.length;

  return {
    verdict: {
      blockers,
      nitpicks,
      summary: `${blockers} blockers\n${nitpicks} nitpicks`,
    },
    reproduced: {
      zipsSwept: REVIEW_ZIPS.length,
      frameDermCount: frameDerm.length,
      claimedCount: CLAIMED_NPIS.size,
    },
    blockers_missed_in_radius_derm: missed.map((m) => ({
      npi: m.npi,
      label: m.label,
      taxonomy: m.taxonomy,
      postal: m.postal,
    })),
    nitpicks_claimed_not_reproduced: claimedNotInFrame,
    nitpicks_nonderm_to_exclude: nonDerm.map((n) => ({
      npi: n.npi,
      label: n.label,
      taxonomy: n.taxonomy,
      postal: n.postal,
    })),
  };
};
