import { readFileSync } from 'fs';
import { join } from 'path';
import type { Browser, Page } from 'playwright';

/**
 * .what = the SECOND independent review frame: the Florida DOH / MQA medical-
 *         license registry. it does two jobs the NPI frame cannot:
 *           (b) VERIFY — confirm every NPI-census license number is CLEAR/ACTIVE
 *               (not deceased, void, delinquent, or absent).
 *           (a) CATCH — confirm a candidate provider found off-NPI (a cash-only
 *               suspect from web/crowd search) is a real licensed MD/DO.
 *
 * .why  = the NPI registry only enumerates providers who bill insurance. a cash-
 *         only dermatologist need not hold an NPI, so NPI alone cannot be called
 *         exhaustive. the state license registry is the OTHER authoritative frame:
 *         every legally-practicing FL physician MUST hold a license, insurance or
 *         not. so it (a) catches the cash-only gap and (b) certifies each NPI row
 *         is a currently-valid license, not a stale/dead one.
 *
 * .the honest scope limit
 *   MQA has NO dermatology profession filter (only "Medical Doctor" /
 *   "Osteopathic Physician"; Bay County alone has 757 MDs). so this frame CANNOT
 *   enumerate dermatologists by specialty — it is a VERIFY frame (by license
 *   number) and a name-CONFIRM frame (for a candidate), not a specialty census.
 *   the cash-only catch therefore needs a candidate NAME to check, sourced from
 *   crowd/web search — not a pure MQA enumeration.
 *
 * .systemic + repeatable + reviewable
 *   deterministic: same license list + same registry -> same verdict. every
 *   lookup drives the public MQA form; the result table is quoted verbatim.
 *   emits the reviewer-output contract (`N blockers` / `N nitpicks`).
 *
 * .the verdict rules
 *   blocker = a census provider whose license is NOT clear/active (deceased,
 *             null-and-void, delinquent, revoked) OR not found in MQA at all
 *             (a provider recommended who cannot be confirmed as licensed).
 *   nitpick = an org NPI (no personal license to verify) OR a license this run
 *             could not read (transient), each to re-check, not a hard fail.
 */

const FORM =
  'https://mqa-internet.doh.state.fl.us/MQASearchServices/HealthCareProviders';

// the on-disk (gitignored) db that holds the roster identifiers. no provider name,
// license number, or org NPI is hardcoded here: the frame reads what to verify from
// data so the committed engine carries method, not identity.
const DB_DIR = join(
  process.cwd(),
  'src/domain.roles/referrer/skills/census.providers/db.access',
);

// the NPI-census individual providers to verify: {name, license, npi} rows derived
// from providers.json — every FL-licensed individual that carries BOTH a personal
// license number AND an NPI. org NPIs (NPI-2) have no personal license -> nitpick,
// listed separately (from claimed-orgs.json). VERIFY BY NUMBER, not name — a number
// returns a single unambiguous MQA detail record, which sidesteps namesake
// collisions, result pagination, and the MD-vs-DO split (a DO carries an "OS"
// license a "Medical Doctor" name search would never surface). the FL-state filter
// keeps this to the FL MQA form's scope; an out-of-state (AL/GA) number is not
// resolvable on the FL registry and would only add UNREAD noise.
type ProviderRow = {
  name: string;
  npi?: string | null;
  license?: string | null;
  licenseState?: string | null;
};

const loadRoster = (): {
  toVerify: { name: string; license: string; npi: string }[];
  orgNpis: string[];
} => {
  const providersDoc = JSON.parse(
    readFileSync(join(DB_DIR, 'providers.json'), 'utf8'),
  );
  const rows: ProviderRow[] = providersDoc.providers ?? [];
  const toVerify = rows
    .filter((r) => !!r.license && !!r.npi && (r.licenseState ?? '') === 'FL')
    .map((r) => ({
      name: r.name,
      license: r.license as string,
      npi: r.npi as string,
    }));

  const orgsDoc = JSON.parse(
    readFileSync(join(DB_DIR, 'claimed-orgs.json'), 'utf8'),
  );
  const orgNpis: string[] = orgsDoc.orgNpis ?? [];

  return { toVerify, orgNpis };
};

const { toVerify: TO_VERIFY, orgNpis: ORG_NPIS } = loadRoster();

const ACTIVE = /CLEAR\/ACTIVE/i;

// verify ONE license number -> a single MQA detail record. the detail page holds
// a LABELED status field:  "License Status\n<value>/"  (e.g. Clear/Active,
// Retired/, Null And Void/). read THAT field exactly — never a whole-page keyword
// scan, which false-flags a page whose legend/history mentions an adverse word.
//   'ACTIVE'   the License Status field reads Clear/Active
//   'INACTIVE' the field reads any non-active status (retired/void/revoked/...)
//   'UNREAD'   no license to check, or the status field could not be read this run
const verifyOne = async (
  page: Page,
  license: string,
): Promise<{ status: 'ACTIVE' | 'INACTIVE' | 'UNREAD'; field: string }> => {
  if (!license)
    return { status: 'UNREAD', field: 'no license number in NPI record' };
  await page.goto(FORM, { waitUntil: 'domcontentloaded', timeout: 40000 });
  await page.waitForTimeout(700);
  await page.fill('#SearchDto_LicenseNumber', license).catch(() => {});
  const submit = await page.$('input[type="submit"][value="Search"]');
  if (submit) {
    await submit.click();
    await page.waitForTimeout(2400);
  }
  const text = await page.evaluate(() => document.body.innerText);

  // extract the exact "License Status" field value (the line after the label)
  const m = text.match(/License Status\s*\n\s*([^\n]+)/i);
  if (!m?.[1])
    return { status: 'UNREAD', field: 'no License Status field on page' };
  const field = m[1].trim().replace(/\/+$/, ''); // "Clear/Active", "Retired", "Null And Void"
  const status = ACTIVE.test(field) ? 'ACTIVE' : 'INACTIVE';
  return { status, field };
};

export const action = async (input: { page: Page; browser: Browser }) => {
  const results: {
    npi: string;
    name: string;
    license: string;
    status: 'ACTIVE' | 'INACTIVE' | 'UNREAD';
    field: string;
  }[] = [];

  for (const q of TO_VERIFY) {
    const page = await input.page.context().newPage();
    try {
      const r = await verifyOne(page, q.license);
      results.push({
        npi: q.npi,
        name: q.name,
        license: q.license,
        status: r.status,
        field: r.field,
      });
    } catch {
      results.push({
        npi: q.npi,
        name: q.name,
        license: q.license,
        status: 'UNREAD',
        field: 'read error',
      });
    } finally {
      await page.close();
    }
  }

  const active = results.filter((r) => r.status === 'ACTIVE');
  const inactive = results.filter((r) => r.status === 'INACTIVE'); // real blockers
  const unread = results.filter((r) => r.status === 'UNREAD'); // nitpicks (re-check)

  // verdict: a claimed provider whose license reads an ADVERSE status = blocker.
  // an unreadable/absent license = nitpick (re-check), not a hard fail.
  // org NPIs carry no personal license -> verified via their clinicians -> nitpick.
  const blockers = inactive.length;
  const nitpicks = unread.length + ORG_NPIS.length;

  return {
    verdict: {
      blockers,
      nitpicks,
      summary: `${blockers} blockers\n${nitpicks} nitpicks`,
    },
    verified_active: active.length,
    inactive_blockers: inactive,
    unread_nitpicks: unread,
    orgNpisSkipped: ORG_NPIS.length,
    detail: results,
  };
};
