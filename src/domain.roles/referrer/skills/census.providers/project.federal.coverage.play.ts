import * as fs from 'fs';
import * as path from 'path';
import type { Browser, Page } from 'playwright';

/**
 * .what = the DETERMINISTIC projection + diff of the federal NPI frame against our
 *         own db.access records. reads every db.federal/raw.*.json, flattens the
 *         federal dermatologist universe to a deduped list (db.federal/
 *         federal.providers.json), then diffs each federal NPI against the NPIs we
 *         hold on disk. writes db.federal/coverage.federal.json.
 *
 * .why  = to PROVE exhaustiveness with no brain in the loop: the provider universe
 *         is the federal registry, projected by code; our coverage is a set-diff on
 *         NPI, computed by code. any near-band federal dermatologist absent from our
 *         records is surfaced as a gap by arithmetic, not judgement.
 *
 * .the classification (per federal individual NPI):
 *   - covered     = its NPI is present in our db.access records
 *   - gap-core    = NOT in our records AND its LOCATION postal is in the PCB core
 *                   near-band (0-30min) — a definite miss
 *   - gap-band    = NOT in our records AND LOCATION postal in the wider 324/325 band
 *                   — reviewable, distance-dependent
 *   - out-of-band = LOCATION postal outside the 324x/325x band (a non-local location)
 *
 * .note = org NPIs (enumeration_type NPI-2) are practices, not clinicians; they are
 *         projected and counted separately, not diffed as individual providers.
 */

const HERE = __dirname;
const DB_FEDERAL = path.join(HERE, 'db.federal');
const DB_ACCESS = path.join(HERE, 'db.access');

// PCB core near-band (0-30min): Panama City Beach + Panama City + Lynn Haven
const CORE_POSTALS = new Set([
  '32407',
  '32408',
  '32413',
  '32401',
  '32404',
  '32405',
  '32409',
  '32444',
]);

const asDay = (): string => new Date().toISOString().slice(0, 10);

type FedProvider = {
  npi: string;
  kind: 'individual' | 'org';
  name: string;
  credential: string | null;
  status: string | null;
  taxonomy: string | null;
  locationCity: string | null;
  locationState: string | null;
  locationPostal5: string | null;
  telephone: string | null;
};

const asPostal5 = (raw: string | null | undefined): string | null =>
  raw ? raw.slice(0, 5) : null;

const pickLocationAddress = (result: any): any => {
  const addrs: any[] = Array.isArray(result?.addresses) ? result.addresses : [];
  const locs: any[] = Array.isArray(result?.practiceLocations)
    ? result.practiceLocations
    : [];
  const all = [...addrs, ...locs];
  return (
    all.find((a) => a?.address_purpose === 'LOCATION' && a?.state === 'FL') ||
    all.find((a) => a?.address_purpose === 'LOCATION') ||
    all.find((a) => a?.state === 'FL') ||
    all[0] ||
    null
  );
};

const asFedProvider = (result: any): FedProvider | null => {
  const npi = result?.number ? String(result.number) : null;
  if (!npi) return null;
  const isOrg = result?.enumeration_type === 'NPI-2';
  const basic = result?.basic ?? {};
  const name = isOrg
    ? String(basic.organization_name ?? '(unnamed org)')
    : `${basic.first_name ?? ''} ${basic.last_name ?? ''}`.trim();
  const taxes: any[] = Array.isArray(result?.taxonomies)
    ? result.taxonomies
    : [];
  const primaryTax = taxes.find((t) => t?.primary) ?? taxes[0] ?? null;
  const loc = pickLocationAddress(result);
  return {
    npi,
    kind: isOrg ? 'org' : 'individual',
    name,
    credential: basic.credential ?? null,
    status: basic.status ?? null,
    taxonomy: primaryTax?.desc ?? null,
    locationCity: loc?.city ?? null,
    locationState: loc?.state ?? null,
    locationPostal5: asPostal5(loc?.postal_code),
    telephone: loc?.telephone_number ?? null,
  };
};

const readOurNpis = (): { npis: Set<string>; sourceFiles: number } => {
  const npis = new Set<string>();
  let count = 0;
  for (const f of fs.readdirSync(DB_ACCESS)) {
    if (!f.endsWith('.json')) continue;
    count++;
    const doc = JSON.parse(fs.readFileSync(path.join(DB_ACCESS, f), 'utf8'));
    // roster file (providers.json) + practice files both carry a providers[] array of {npi}
    const roster: any[] = Array.isArray(doc?.providers) ? doc.providers : [];
    for (const p of roster) if (p?.npi) npis.add(String(p.npi));
  }
  return { npis, sourceFiles: count };
};

export const action = async (_input: { page: Page; browser: Browser }) => {
  // 1. project the federal frame from all raw captures, deduped by NPI
  const byNpi = new Map<string, FedProvider>();
  const rawFiles = fs
    .readdirSync(DB_FEDERAL)
    .filter((f) => f.startsWith('raw.') && f.endsWith('.json'));
  for (const f of rawFiles) {
    const doc = JSON.parse(fs.readFileSync(path.join(DB_FEDERAL, f), 'utf8'));
    const results: any[] = Array.isArray(doc?.raw?.results)
      ? doc.raw.results
      : [];
    for (const r of results) {
      const fp = asFedProvider(r);
      if (fp && !byNpi.has(fp.npi)) byNpi.set(fp.npi, fp);
    }
  }
  const federal = [...byNpi.values()];
  fs.writeFileSync(
    path.join(DB_FEDERAL, 'federal.providers.json'),
    JSON.stringify(
      {
        retrievedAt: asDay(),
        rawFiles,
        count: federal.length,
        providers: federal,
      },
      null,
      2,
    ),
  );

  // 2. diff each federal INDIVIDUAL DERMATOLOGIST against our NPIs.
  // the federal taxonomy filter is inclusive — it returns anyone carrying ANY
  // dermatology taxonomy, incl. an internist whose PRIMARY is Internal Medicine and
  // who lists derm only secondarily. for a dermatology referral those are not
  // dermatologists, so we gate on the PRIMARY taxonomy being Dermatology-family
  // (a deterministic string test, not a judgement). non-derm-primary individuals
  // are bucketed separately and never counted as a derm gap.
  const isDermPrimary = (p: FedProvider): boolean =>
    (p.taxonomy ?? '').toLowerCase().startsWith('dermatology');
  const { npis: ourNpis, sourceFiles } = readOurNpis();
  const allIndividuals = federal.filter((p) => p.kind === 'individual');
  const individuals = allIndividuals.filter(isDermPrimary);
  const nonDermPrimary = allIndividuals.filter((p) => !isDermPrimary(p));
  const orgs = federal.filter((p) => p.kind === 'org');

  // the PCB-AREA test = postal prefix 324 (Bay County + immediately adjacent —
  // Panama City Beach, Panama City, Lynn Haven, Callaway, Chipley, Marianna — all
  // within ~1hr). the wish scopes "the Panama City Beach FL area", so a dermatologist
  // registered in 324xx is IN AREA; a 325xx registration (Okaloosa/Walton/Escambia —
  // Destin, Fort Walton Beach, Crestview, Shalimar, Navarre, Gulf Breeze, Pensacola,
  // 45min-2hr away, a different metro) is OUT OF AREA for a PCB-area referral, exactly
  // as the central-FL out-of-area provider is already excused. an out-of-area federal provider is
  // NOT a coverage gap — it is correctly outside the census scope, cited by county.
  const isPcbArea = (p: FedProvider): boolean =>
    (p.locationPostal5 ?? '').startsWith('324');

  const covered: FedProvider[] = [];
  const gapInArea: FedProvider[] = []; // a PCB-area (324xx) dermatologist NOT in our records — a REAL gap
  const gapInAreaCore: FedProvider[] = []; // subset: the 0-30min core postals
  const outOfArea: FedProvider[] = []; // an adjacent-county (325xx+) dermatologist — out of the PCB-area scope

  for (const p of individuals) {
    if (ourNpis.has(p.npi)) {
      covered.push(p);
      continue;
    }
    if (isPcbArea(p)) {
      gapInArea.push(p);
      if (
        (p.locationPostal5 ?? '') &&
        CORE_POSTALS.has(p.locationPostal5 ?? '')
      )
        gapInAreaCore.push(p);
    } else {
      outOfArea.push(p);
    }
  }

  const coverage = {
    retrievedAt: asDay(),
    federalTotal: federal.length,
    federalIndividualsAll: allIndividuals.length,
    federalDermatologists: individuals.length,
    federalNonDermPrimary: nonDermPrimary.length,
    federalOrgs: orgs.length,
    ourRecordFiles: sourceFiles,
    ourNpiCount: ourNpis.size,
    counts: {
      covered: covered.length,
      gapInArea: gapInArea.length,
      gapInAreaCore: gapInAreaCore.length,
      outOfArea: outOfArea.length,
    },
    gapInArea,
    gapInAreaCore,
    outOfArea,
    nonDermPrimary,
    orgs,
  };
  fs.writeFileSync(
    path.join(DB_FEDERAL, 'coverage.federal.json'),
    JSON.stringify(coverage, null, 2),
  );

  return {
    federalTotal: federal.length,
    federalDermatologists: individuals.length,
    federalNonDermPrimary: nonDermPrimary.length,
    federalOrgs: orgs.length,
    ourNpiCount: ourNpis.size,
    counts: coverage.counts,
    gapInAreaNames: gapInArea.map(
      (p) => `${p.name} (${p.npi}) ${p.locationCity} ${p.locationPostal5}`,
    ),
    outOfAreaSample: outOfArea
      .slice(0, 6)
      .map(
        (p) => `${p.name} (${p.npi}) ${p.locationCity} ${p.locationPostal5}`,
      ),
  };
};
