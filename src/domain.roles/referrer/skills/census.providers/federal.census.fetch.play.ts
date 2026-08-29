import * as fs from 'fs';
import * as path from 'path';
import type { Browser, Page } from 'playwright';

/**
 * .what = deterministically CAPTURE the federal NPI registry frame for Dermatology
 *         across the ~1hr-radius postal band of Panama City Beach, FL, and persist
 *         each raw API response to db.federal/raw.<label>.json verbatim.
 *
 * .why  = the provider universe must be a code-derived projection of the federal
 *         source, not a brain's transcription. this playbook makes the federal frame
 *         a durable on-disk artifact so the projection + diff downstream are fully
 *         deterministic (no judgement, re-runnable, auditable).
 *
 * .the source = the public CMS NPI Registry API (npiregistry.cms.hhs.gov/api),
 *         a plain JSON endpoint. no auth, no render — a raw http GET via the
 *         browser context's request client.
 *
 * .the band = FL postal prefixes 324* (Bay/Washington/Holmes/Jackson — Panama City
 *         Beach, Panama City, Lynn Haven, Chipley, Marianna) and 325* (Okaloosa/
 *         Walton — Destin, Fort Walton Beach, Niceville, Crestview, Santa Rosa
 *         Beach). these two prefixes cover the drive band the wish scopes.
 *
 * .the taxonomy = the NPI API filters on taxonomy_description. we pull the
 *         dermatology family: Dermatology, plus its sub-specialties so no
 *         dermatologist is missed by a narrower registration.
 */

const DB_FEDERAL = path.join(__dirname, 'db.federal');

const TAXONOMIES = [
  'Dermatology',
  'Dermatology, MOHS-Micrographic Surgery',
  'Dermatology, Procedural Dermatology',
  'Dermatology, Dermatopathology',
  'Dermatology, Pediatric Dermatology',
  'Dermatology, Clinical & Laboratory Dermatological Immunology',
];

const POSTAL_PREFIXES = ['324', '325'];

const buildQueries = (): { label: string; url: string }[] => {
  const out: { label: string; url: string }[] = [];
  for (const postal of POSTAL_PREFIXES) {
    for (const tax of TAXONOMIES) {
      const label = `postal-${postal}__${tax.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`;
      const url =
        'https://npiregistry.cms.hhs.gov/api/?version=2.1' +
        `&country_code=US&state=FL&postal_code=${postal}*` +
        `&taxonomy_description=${encodeURIComponent(tax)}` +
        '&limit=200';
      out.push({ label, url });
    }
  }
  return out;
};

export const action = async (input: { page: Page; browser: Browser }) => {
  const req = input.page.context().request;
  const queries = buildQueries();
  const out: any[] = [];

  for (const q of queries) {
    try {
      const res = await req.get(q.url, { timeout: 30000 });
      const status = res.status();
      const bodyText = await res.text();
      let parsed: any = null;
      try {
        parsed = JSON.parse(bodyText);
      } catch {
        parsed = null;
      }
      const resultCount = parsed?.result_count ?? null;
      const file = path.join(DB_FEDERAL, `raw.${q.label}.json`);
      // persist the raw response verbatim, wrapped with its query provenance
      const record = {
        label: q.label,
        url: q.url,
        status,
        retrievedAt: new Date().toISOString().slice(0, 10),
        result_count: resultCount,
        raw: parsed ?? bodyText.slice(0, 4000),
      };
      fs.writeFileSync(file, JSON.stringify(record, null, 2));
      out.push({
        label: q.label,
        status,
        result_count: resultCount,
        written: file,
      });
    } catch (e) {
      out.push({ label: q.label, url: q.url, error: String(e).slice(0, 160) });
    }
  }

  return { out };
};
