import type { Browser, Page } from 'playwright';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * .what = the THIRD review frame: an access-coverage audit. it does NOT crawl the
 *         web — it deterministically audits the on-disk db.access records against
 *         the exhaustive per-provider frame (providers.json) and proves, PER
 *         PROVIDER, that their appointment mechanism was actually searched on a
 *         real entrypoint (their own salespage / book page / portal), not merely
 *         inferred from a registry.
 *
 * .why  = the NPI + MQA frames prove a provider EXISTS and is LICENSED. neither
 *         proves anyone read that provider's own site to learn HOW to get seen
 *         (phone / portal / self-schedule / app). a registry citation proves
 *         identity + phone; it is NOT proof of an appointment-mechanism search.
 *         so the appointment dimension needs its own review: for each of the N
 *         exhaustively-itemized dermatologists, was a salespage entrypoint read?
 *
 * .deterministic + repeatable + reviewable
 *   reads only the on-disk db (no network), so the same db -> the same verdict.
 *   every provider row resolves to its practice record; every practice record's
 *   citations are classified by host into: REGISTRY (identity/phone), DIRECTORY
 *   (existence), or SALESPAGE (the provider's own entrypoint = the only kind that
 *   proves an appointment-mechanism search). emits the reviewer-output contract.
 *
 * .the verdict rules
 *   PROVEN  = the provider's practice record carries a non-empty schedule.mechanism
 *             AND >=1 SALESPAGE citation (a real read of the practice's own site /
 *             book page / portal). the entrypoint(s) + how it was proven are listed.
 *   GAP (nitpick) = a real own-site search RAN and returned no usable own salespage
 *             (only a directory/aggregator, or no resolvable site) — the sanctioned
 *             explicit-gap terminal (rule.require.escalate-captcha-to-human): the
 *             mechanism is NOT claimed proven, and the entrypoints tried are cited
 *             as evidence the search happened. requires proof-of-search: either a
 *             DIRECTORY-classified citation on the practice record, or a row-level
 *             `ownSiteSearched` marker that names the entrypoints tried.
 *   UNPROVEN (blocker) = the mechanism was recorded with NO salespage citation AND
 *             NO evidence any own-site search ran — a bare registry inference. this
 *             is the real defect the review exists to catch.
 *   EXEMPT (nitpick) = a do-not-refer provider intentionally not searched: an
 *             inactive license, OR an out-of-area provider we will not refer to.
 */

const DB_DIR = join(process.cwd(), 'src/domain.roles/referrer/skills/census.providers/db.access');

// host classification — a citation url proves an appointment-mechanism search
// ONLY if it points at the provider's own entrypoint (a salespage), not a registry
// (identity/phone) or a crowd directory (existence).
const REGISTRY = /npiregistry\.cms\.hhs\.gov|mqa-internet\.doh\.state\.fl\.us/i;
// a directory / aggregator = proof a search RAN, but NOT the provider's own site.
// topdermatology is a physician-aggregator ('claim this profile'); legacy/obituary
// hosts are the dead-end a name-search sometimes lands on.
const DIRECTORY = /healthgrades\.com|zocdoc\.com|vitals\.com|webmd\.com|castleconnolly|topdermatology\.com|sharecare\.com|ratemds\.com|npidb\.org|doximity\.com|caredash\.com|us\.news|yelp\.com|legacy\.com|obituar/i;

const isSalespage = (url: string): boolean =>
  !!url && !REGISTRY.test(url) && !DIRECTORY.test(url);

// a book/portal host = a live self-schedule or portal entrypoint (deeper proof)
const LIVE_SURFACE = /klara\.com|solutionreach\.com|patron\.solutionreach|ecwcloud|modmedapp|ema\.md|athena|healow|followmyhealth/i;

type PracticeRecord = {
  practiceKey: string;
  schedule?: { mechanism?: string[] };
  citations?: { field: string; url: string; verbatim: string }[];
};

type ProviderRow = {
  name: string;
  practiceKey: string;
  licenseStatus?: string;
  mechanism?: string[];
  flag?: string;
  outOfArea?: boolean;
  // an explicit proof-of-search marker: the own-site entrypoints TRIED for this
  // provider when no own salespage could be located. names the entrypoints so a
  // human can audit + re-try. its presence (with >=1 entrypoint) turns an
  // otherwise-UNPROVEN row into a GAP (searched, own-site not found).
  ownSiteSearched?: { entrypoints: string[]; found: boolean; outcome?: string };
};

export const action = async (_input: { page: Page; browser: Browser }) => {
  // load the exhaustive per-provider frame
  const providersDoc = JSON.parse(readFileSync(join(DB_DIR, 'providers.json'), 'utf8'));
  const providers: ProviderRow[] = providersDoc.providers;

  // load every practice record into a map by practiceKey
  const practiceByKey = new Map<string, PracticeRecord>();
  for (const f of readdirSync(DB_DIR)) {
    if (!f.endsWith('.json') || f === 'providers.json') continue;
    const rec: PracticeRecord = JSON.parse(readFileSync(join(DB_DIR, f), 'utf8'));
    if (rec.practiceKey) practiceByKey.set(rec.practiceKey, rec);
  }

  const reviewed = providers.map((p) => {
    const practice = practiceByKey.get(p.practiceKey);
    const citations = practice?.citations ?? [];
    const mechanism = practice?.schedule?.mechanism ?? [];

    // the entrypoints actually searched for THIS provider's appointment mechanism
    const salespageCites = citations.filter((c) => isSalespage(c.url));
    const entrypointsSearched = [...new Set(salespageCites.map((c) => c.url))];
    const registryCites = citations.filter((c) => REGISTRY.test(c.url));
    const directoryCites = citations.filter((c) => DIRECTORY.test(c.url));
    const liveSlotProbed = salespageCites.some((c) => LIVE_SURFACE.test(c.url));

    // do-not-refer -> intentionally not searched -> exempt.
    // two do-not-refer reasons: an inactive license, or an out-of-area provider.
    const inactive = /retired|null and void|revoked|deceased|delinquent/i.test(p.licenseStatus ?? '');
    const outOfArea = p.outOfArea === true || p.practiceKey === 'out-of-area' || /out of area/i.test(p.flag ?? '');

    // proof a real own-site search RAN but found no own salespage: either a
    // directory/aggregator citation on the practice record, or a row-level
    // ownSiteSearched marker that names >=1 entrypoint tried.
    const rowSearchEntrypoints = p.ownSiteSearched?.entrypoints ?? [];
    const ownSiteSearchedNotFound =
      (rowSearchEntrypoints.length > 0 && p.ownSiteSearched?.found === false) ||
      (directoryCites.length > 0 && salespageCites.length === 0);

    let verdict: 'PROVEN' | 'GAP' | 'UNPROVEN' | 'EXEMPT';
    let howProven: string;
    if (inactive) {
      verdict = 'EXEMPT';
      howProven = `do-not-refer (license ${p.licenseStatus}) — appointment mechanism intentionally not searched`;
    } else if (outOfArea) {
      verdict = 'EXEMPT';
      howProven = `do-not-refer (out of area) — appointment mechanism intentionally not searched`;
    } else if (mechanism.length && entrypointsSearched.length) {
      verdict = 'PROVEN';
      howProven =
        `mechanism [${mechanism.join(', ')}] read from ${entrypointsSearched.length} salespage entrypoint(s)` +
        (liveSlotProbed ? '; a live book/portal surface was followed' : '; homepage-level read (live slot not followed)');
    } else if (ownSiteSearchedNotFound) {
      verdict = 'GAP';
      const tried = rowSearchEntrypoints.length
        ? rowSearchEntrypoints.join(', ')
        : directoryCites.map((c) => c.url).join(', ');
      howProven = `own-site search RAN and found no own salespage (only a directory/aggregator or no resolvable site); entrypoints tried: ${tried}. explicit gap — mechanism NOT claimed proven`;
    } else {
      verdict = 'UNPROVEN';
      howProven = registryCites.length
        ? `mechanism inferred from the registry only (${registryCites.length} registry citation[s]); NO own-site search evidence for this provider`
        : `no citation of any kind backs an appointment-mechanism search for this provider`;
    }

    return {
      name: p.name,
      practiceKey: p.practiceKey,
      verdict,
      mechanism,
      entrypointsSearched,
      salespagesRead: salespageCites.map((c) => ({ url: c.url, field: c.field })),
      registryOnly: entrypointsSearched.length === 0 && registryCites.length > 0,
      liveSlotProbed,
      howProven,
    };
  });

  const proven = reviewed.filter((r) => r.verdict === 'PROVEN');
  const gaps = reviewed.filter((r) => r.verdict === 'GAP');         // nitpicks (searched, not found)
  const unproven = reviewed.filter((r) => r.verdict === 'UNPROVEN'); // blockers (never searched)
  const exempt = reviewed.filter((r) => r.verdict === 'EXEMPT');     // nitpicks (do-not-refer)

  const blockers = unproven.length;
  const nitpicks = exempt.length + gaps.length + proven.filter((r) => !r.liveSlotProbed).length;

  return {
    verdict: {
      blockers,
      nitpicks,
      summary: `${blockers} blockers\n${nitpicks} nitpicks`,
    },
    totalProviders: reviewed.length,
    provenCount: proven.length,
    provenLiveSlot: proven.filter((r) => r.liveSlotProbed).length,
    gapCount: gaps.length,
    exemptCount: exempt.length,
    unprovenBlockers: unproven.map((r) => ({ name: r.name, practiceKey: r.practiceKey, howProven: r.howProven })),
    gapNitpicks: gaps.map((r) => ({ name: r.name, practiceKey: r.practiceKey, howProven: r.howProven })),
    exemptNitpicks: exempt.map((r) => ({ name: r.name, howProven: r.howProven })),
    detail: reviewed,
  };
};
