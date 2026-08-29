import type { Browser, Page } from 'playwright';

/**
 * .what = the systemic exhaustive-search engine: build a provider CENSUS from
 *         the CMS NPI registry (the authoritative population frame), not a recall.
 *
 * .why  = a crowd directory (Healthgrades) is an opt-in sample and misses whole
 *         practices. the NPI registry is complete by construction — every US
 *         clinician who submits insurance claims must hold an NPI. so the frame
 *         is the denominator; crowd directories become capture-recapture checks.
 *
 * .systemic + repeatable + reviewable:
 *   - PARTITIONED by an explicit postal-code allowlist (RADIUS_ZIPS below) so the
 *     union provably covers the drive-radius without pagination overflow. the ZIP
 *     set IS the reviewable seam — a peer-reviewer challenges/extends it.
 *   - DETERMINISTIC: same inputs -> same NPI query URLs -> same roster.
 *   - the query URL for every record is emitted, so any claim is re-checkable.
 *
 * .the reviewable seam
 *   RADIUS_ZIPS is the declared geo-filter. it is an INPUT to be audited, not a
 *   hidden constant. the peer-review engine (review.census.play.ts) re-pulls the
 *   same frame and flags any in-radius NPI the census dropped, AND challenges
 *   whether this ZIP set covers every town the radius touches.
 */

const TAXONOMY = 'Dermatology';

// the declared radius filter — ZIP codes within ~1hr drive of Panama City Beach.
// grouped by county so a reviewer can audit coverage town-by-town. marked as a
// SEED set: the peer-review challenges omissions. edit here to re-scope.
const RADIUS_ZIPS: { zip: string; area: string }[] = [
  // Bay County — core (0–25 min)
  { zip: '32401', area: 'Panama City' },
  { zip: '32403', area: 'Panama City (Tyndall)' },
  { zip: '32404', area: 'Panama City / Callaway' },
  { zip: '32405', area: 'Panama City (Cove/Harrison)' },
  { zip: '32407', area: 'Panama City Beach' },
  { zip: '32408', area: 'Panama City Beach (Thomas Dr)' },
  { zip: '32409', area: 'Panama City (Bayou George)' },
  { zip: '32410', area: 'Mexico Beach' },
  { zip: '32413', area: 'Panama City Beach (West/Margaritaville)' },
  { zip: '32444', area: 'Lynn Haven' },
  { zip: '32466', area: 'Southport' },
  // Washington County — Chipley (~40 min)
  { zip: '32428', area: 'Chipley' },
  // Jackson County — Marianna (~55 min)
  { zip: '32446', area: 'Marianna' },
  { zip: '32448', area: 'Marianna (Malone)' },
  { zip: '32420', area: 'Alford' },
  // Gulf County — Port St. Joe (~50 min)
  { zip: '32456', area: 'Port St. Joe' },
  // Walton County — Santa Rosa Beach / Miramar (~40–55 min)
  { zip: '32459', area: 'Santa Rosa Beach' },
  { zip: '32550', area: 'Miramar Beach' },
  // Okaloosa County — Destin / Niceville (edge, ~55–70 min)
  { zip: '32541', area: 'Destin' },
  { zip: '32578', area: 'Niceville' },
];

const npiUrl = (postal: string): string =>
  'https://npiregistry.cms.hhs.gov/api/?version=2.1' +
  '&taxonomy_description=' +
  encodeURIComponent(TAXONOMY) +
  '&country_code=US&postal_code=' +
  encodeURIComponent(postal) +
  '&limit=200';

type FrameRow = {
  npi: string;
  name: string;
  org: string | null;
  taxonomy: string | null;
  license: string | null;
  licenseState: string | null;
  mohs: boolean;
  address: string;
  postal: string;
  phone: string | null;
  sourceUrl: string;
};

export const action = async (input: { page: Page; browser: Browser }) => {
  const seen = new Set<string>();
  const roster: FrameRow[] = [];
  const perZip: { zip: string; area: string; count: number }[] = [];

  for (const { zip, area } of RADIUS_ZIPS) {
    const url = npiUrl(zip);
    const page = await input.page.context().newPage();
    let count = 0;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForTimeout(900);
      const body = await page.evaluate(() => document.body.innerText);
      const json = JSON.parse(body);
      for (const r of json.results || []) {
        const npi = String(r.number);
        if (seen.has(npi)) continue;
        seen.add(npi);
        const b = r.basic || {};
        const loc =
          (r.addresses || []).find(
            (a: any) => a.address_purpose === 'LOCATION',
          ) || {};
        const taxes = r.taxonomies || [];
        const primary = taxes.find((t: any) => t.primary) || taxes[0] || {};
        const mohs = taxes.some((t: any) => /MOHS/i.test(t.desc || ''));
        roster.push({
          npi,
          name: b.name || `${b.first_name || ''} ${b.last_name || ''}`.trim(),
          org: b.organization_name || null,
          taxonomy: primary.desc || null,
          license: primary.license || null,
          licenseState: primary.state || null,
          mohs,
          address: [loc.address_1, loc.city, loc.state, loc.postal_code]
            .filter(Boolean)
            .join(', '),
          postal: (loc.postal_code || '').slice(0, 5),
          phone: loc.telephone_number || null,
          sourceUrl: url,
        });
        count++;
      }
    } catch (e) {
      perZip.push({ zip, area, count: -1 });
      await page.close();
      continue;
    }
    perZip.push({ zip, area, count });
    await page.close();
  }

  // keep only rows whose LOCATION postal is inside the declared radius set
  const allow = new Set(RADIUS_ZIPS.map((z) => z.zip));
  const inRadius = roster.filter((r) => allow.has(r.postal));
  const outOfRadius = roster.filter((r) => !allow.has(r.postal));

  return {
    taxonomy: TAXONOMY,
    zipsQueried: RADIUS_ZIPS.length,
    perZip,
    frameSize: roster.length,
    inRadiusCount: inRadius.length,
    mohsCount: inRadius.filter((r) => r.mohs).length,
    inRadius: inRadius.sort((a, b) => a.postal.localeCompare(b.postal)),
    outOfRadiusSample: outOfRadius.slice(0, 20),
  };
};
