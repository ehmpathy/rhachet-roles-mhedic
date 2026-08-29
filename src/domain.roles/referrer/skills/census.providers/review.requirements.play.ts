import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import type { Browser, Page } from 'playwright';

/**
 * .what = the FOURTH review frame: a three-requirement enumeration audit. it does
 *         NOT crawl the web — it deterministically audits the on-disk db.access
 *         records and proves, PER PROVIDER, that all THREE referral requirements
 *         are declared:
 *           req1 = earliest appointment time (a concrete date, OR the phone-gated
 *                  answer "call <phone>" when no slot is publishable online)
 *           req2 = book method (online vs phone), derivable from schedule.mechanism
 *           req3 = insurances accepted (with Cigna specifically flagged)
 *
 * .why  = the wish demands an exhaustive answer for EVERY provider across all three
 *         dimensions. the access review proves the appointment MECHANISM was
 *         searched; it does NOT prove the earliest-time, the online-vs-phone book
 *         path, or the insurance coverage were each declared. this frame closes
 *         that: one deterministic pass that flags any provider absent any of the
 *         three, so the loop has a concrete worklist to drive to zero.
 *
 * .deterministic + repeatable + reviewable
 *   reads only the on-disk db (no network), so the same db -> the same verdict.
 *   emits the reviewer-output contract (N blockers / N nitpicks).
 *
 * .the verdict rules
 *   COMPLETE = a referable provider whose practice record declares all THREE
 *              requirements. the referral is answerable end to end.
 *   INCOMPLETE (blocker) = a referable provider absent one or more of the three.
 *              the absent requirement(s) are named as the worklist.
 *   EXCUSED (nitpick) = a provider we will not refer to (EXEMPT: inactive license
 *              or out-of-area) OR whose own site was searched and not found (GAP).
 *              such a provider is not held to the three-requirement bar.
 */

const DB_DIR = join(
  process.cwd(),
  'src/domain.roles/referrer/skills/census.providers/db.access',
);
const DB_FEDERAL = join(
  process.cwd(),
  'src/domain.roles/referrer/skills/census.providers/db.federal',
);

type FederalGap = {
  npi: string;
  name: string;
  locationCity: string | null;
  locationPostal5: string | null;
};
type FederalCoverage = {
  federalTotal: number;
  federalDermatologists: number;
  federalNonDermPrimary: number;
  federalOrgs: number;
  ourNpiCount: number;
  counts: {
    covered: number;
    gapInArea: number;
    gapInAreaCore: number;
    outOfArea: number;
  };
  gapInArea: FederalGap[];
  gapInAreaCore: FederalGap[];
  outOfArea: FederalGap[];
};

// read the federal coverage diff, if project.federal.coverage has been run. absent
// file = the federal proof has not been computed; the review reports that plainly
// rather than assume federal coverage it never checked.
const readFederalCoverage = (): FederalCoverage | null => {
  try {
    return JSON.parse(
      readFileSync(join(DB_FEDERAL, 'coverage.federal.json'), 'utf8'),
    ) as FederalCoverage;
  } catch {
    return null;
  }
};

type Insurance = {
  accepted?: string[];
  cignaAccepted?: boolean | null;
  ownSiteSearched?: { pages?: string[]; found?: boolean };
  citations?: { field: string; url: string; verbatim: string }[];
};

type PracticeRecord = {
  practiceKey: string;
  practiceName?: string;
  providers?: { name: string }[];
  contact?: { phonePrimary?: string | null };
  schedule?: { mechanism?: string[]; bookUrl?: string | null };
  availabilitySignal?: {
    rung?: number;
    signal?: string;
    observedWait?: string | null;
  };
  insurance?: Insurance;
  // a practice record may declare itself do-not-refer as a distinct entity: a
  // corporate NPI shell that dupes an audited practice, or an out-of-area
  // registration. an exempt-marked practice with an empty roster is a coverage
  // NITPICK (cited, deliberate), not a blocker.
  exempt?: { kind?: string; of?: string; reason?: string };
};

type ProviderRow = {
  name: string;
  practiceKey: string;
  licenseStatus?: string;
  flag?: string;
  outOfArea?: boolean;
  ownSiteSearched?: { entrypoints: string[]; found: boolean; outcome?: string };
};

// classify the book path from the practice's schedule mechanism.
// online     = a self-schedule calendar or a patient portal the human can use
// online-req = an online request form (submit, office confirms) — still online
// phone      = phone and/or email only
const asBookMethod = (
  mechanism: string[],
): 'online' | 'online-request' | 'phone' | 'unknown' => {
  if (!mechanism.length) return 'unknown';
  if (mechanism.includes('self-schedule')) return 'online';
  if (mechanism.includes('patient-portal')) return 'online';
  if (mechanism.includes('online-request')) return 'online-request';
  if (mechanism.includes('phone') || mechanism.includes('email'))
    return 'phone';
  return 'unknown';
};

// classify the NEW-PATIENT online appointment capacity — the honest tier a referral
// (a new patient) can actually use. deliberately NARROWER than bookMethod: a
// patient-portal is login-gated for PRIOR patients, so it is NOT new-patient online
// capacity. the tier is read deterministically from the mechanism + the probed
// observedWait text (a concrete future date proves a live calendar; a "no public
// earliest" note proves a request-only form).
//   live-calendar  = a public self-schedule calendar exposing real slots — the
//                    earliest date is observable online (observedWait carries it)
//   online-request = a public request/contact form a new patient can submit, but
//                    no slot is shown — the earliest is staff-confirmed
//   portal-prior   = only a login-gated portal for PRIOR patients — a new patient
//                    cannot self-book; the earliest is phone-gated
//   phone-only     = no online surface for a new patient
const asOnlineCapacity = (input: {
  mechanism: string[];
  observedWait: string | null;
}): {
  tier: 'live-calendar' | 'online-request' | 'portal-prior' | 'phone-only';
  earliest: string | null;
} => {
  const wait = input.observedWait ?? '';
  const saysNoPublic = /no public earliest/i.test(wait);
  const saysPhoneGated = /^phone-gated/i.test(wait);
  // a live calendar names a concrete future date/slot in the probed observedWait
  const namesConcreteDate =
    /\b20\d\d\b/.test(wait) && /(slot|appointment|@|available)/i.test(wait);
  const hasSelfSchedule = input.mechanism.includes('self-schedule');
  const hasRequestForm = input.mechanism.includes('online-request');
  const hasPortal = input.mechanism.includes('patient-portal');

  if (namesConcreteDate && !saysNoPublic && !saysPhoneGated)
    return { tier: 'live-calendar', earliest: wait };
  if (saysNoPublic || hasRequestForm || (hasSelfSchedule && !namesConcreteDate))
    return { tier: 'online-request', earliest: null };
  if (hasPortal) return { tier: 'portal-prior', earliest: null };
  return { tier: 'phone-only', earliest: null };
};

export const action = async (_input: { page: Page; browser: Browser }) => {
  const providersDoc = JSON.parse(
    readFileSync(join(DB_DIR, 'providers.json'), 'utf8'),
  );
  const providers: ProviderRow[] = providersDoc.providers;

  const practiceByKey = new Map<string, PracticeRecord>();
  for (const f of readdirSync(DB_DIR)) {
    if (!f.endsWith('.json') || f === 'providers.json') continue;
    const rec: PracticeRecord = JSON.parse(
      readFileSync(join(DB_DIR, f), 'utf8'),
    );
    if (rec.practiceKey) practiceByKey.set(rec.practiceKey, rec);
  }

  const reviewed = providers.map((p) => {
    const practice = practiceByKey.get(p.practiceKey);
    const mechanism = practice?.schedule?.mechanism ?? [];
    const bookUrl = practice?.schedule?.bookUrl ?? null;
    const rung = practice?.availabilitySignal?.rung ?? null;
    const observedWait = practice?.availabilitySignal?.observedWait ?? null;
    const phone = practice?.contact?.phonePrimary ?? null;
    const insurance = practice?.insurance;

    // an excused provider (do-not-refer or own-site-not-found) is not held to the bar
    const inactive = /retired|null and void|revoked|deceased|delinquent/i.test(
      p.licenseStatus ?? '',
    );
    const outOfArea =
      p.outOfArea === true ||
      p.practiceKey === 'out-of-area' ||
      /out of area/i.test(p.flag ?? '');
    const ownSiteNotFound =
      (p.ownSiteSearched?.entrypoints?.length ?? 0) > 0 &&
      p.ownSiteSearched?.found === false;
    const excused = inactive || outOfArea || ownSiteNotFound;

    // req1 = earliest appointment time declared.
    // a rung-1 practice exposes a LIVE calendar, so its earliest is a concrete date
    // that must be captured (observedWait). every other practice (rung >= 2, or no
    // rung) exposes only a request form and/or phone — no online calendar — so its
    // earliest is genuinely NOT publishable online. for those the exhaustive, honest
    // answer is the contact path itself ("request at <url> or call <phone>"), which
    // is satisfied whenever a book path (a request url or a phone) exists.
    const hasLiveCalendar = rung === 1;
    const bookPath = bookUrl ?? phone ?? null;
    const req1EarliestDeclared =
      !!observedWait || (!hasLiveCalendar && !!bookPath);

    // req2 = book method (online vs phone) derivable from the mechanism.
    const bookMethod = asBookMethod(mechanism);
    const req2BookMethodDeclared = bookMethod !== 'unknown';

    // the honest NEW-PATIENT online capacity tier (narrower than bookMethod), so the
    // "who can a new patient book online, and what is the earliest" question is a
    // deterministic field, not a guess over prose.
    const onlineCapacity = asOnlineCapacity({ mechanism, observedWait });

    // req3 = insurances accepted, with Cigna specifically resolved. the dimension
    // is DECLARED (exhaustively answered) in three shapes:
    //   published        = the own site names carriers (accepted non-empty) or
    //                       resolves Cigna explicitly (cignaAccepted true/false)
    //   searched-quoted  = the own insurance/patient page was read via the site's
    //                       own sitemap/crawl and names NO carrier list — the honest
    //                       answer is "not published; call to confirm" (a declared,
    //                       cited terminal, a mirror of the access-review GAP)
    //   absent           = no insurance evidence at all (never searched) — the defect
    const acceptedList = insurance?.accepted ?? [];
    const cignaResolved =
      insurance?.cignaAccepted !== undefined &&
      insurance?.cignaAccepted !== null;
    const insuranceSearchedPages = insurance?.ownSiteSearched?.pages ?? [];
    const insuranceSearched = insuranceSearchedPages.length > 0;
    const insuranceState: 'published' | 'searched-quoted' | 'absent' =
      acceptedList.length > 0 || cignaResolved
        ? 'published'
        : insuranceSearched
          ? 'searched-quoted'
          : 'absent';
    const req3InsuranceDeclared = insuranceState !== 'absent';

    const absent: string[] = [];
    if (!req1EarliestDeclared) absent.push('req1:earliest-appointment');
    if (!req2BookMethodDeclared) absent.push('req2:book-method');
    if (!req3InsuranceDeclared) absent.push('req3:insurance-cigna');

    let verdict: 'COMPLETE' | 'INCOMPLETE' | 'EXCUSED';
    let excusedReason: string | null = null;
    if (excused) {
      verdict = 'EXCUSED';
      excusedReason = inactive
        ? `do-not-refer (license ${p.licenseStatus})`
        : outOfArea
          ? 'do-not-refer (out of area)'
          : 'own site searched, not found (GAP)';
    } else {
      verdict = absent.length === 0 ? 'COMPLETE' : 'INCOMPLETE';
    }

    return {
      name: p.name,
      practiceKey: p.practiceKey,
      verdict,
      excusedReason,
      req1EarliestDeclared,
      earliest:
        observedWait ??
        (req1EarliestDeclared
          ? bookUrl
            ? `contact-quoted — request at ${bookUrl} or call ${phone}`
            : `phone-gated — call ${phone}`
          : null),
      req2BookMethodDeclared,
      bookMethod,
      onlineCapacityTier: onlineCapacity.tier,
      onlineEarliest: onlineCapacity.earliest,
      req3InsuranceDeclared,
      insuranceState,
      cignaAccepted: insurance?.cignaAccepted ?? null,
      acceptedInsurers: acceptedList,
      absent,
    };
  });

  // COVERAGE — the exhaustiveness self-check. the per-provider audit above only
  // sees providers listed in providers.json; a practice record on disk whose
  // roster is empty, or whose providers were never folded into providers.json, is
  // INVISIBLE to it. so, deterministically, every practice file must map to at
  // least one audited provider row — else it is an UNAUDITED practice, a coverage
  // hole the review must surface itself (not leave a human to notice).
  const auditedKeys = new Set(reviewed.map((r) => r.practiceKey));
  const SYNTHETIC_KEYS = new Set(['out-of-area']); // synthetic keys with no on-disk file
  const unauditedPractices = [...practiceByKey.values()]
    .filter((rec) => !SYNTHETIC_KEYS.has(rec.practiceKey))
    .filter((rec) => !auditedKeys.has(rec.practiceKey))
    .map((rec) => {
      const rosterCount = rec.providers?.length ?? 0;
      const exempt = rec.exempt ?? null;
      return {
        practiceKey: rec.practiceKey,
        practiceName: rec.practiceName ?? rec.practiceKey,
        rosterCount,
        exempt,
        reason: exempt
          ? `do-not-refer (${exempt.kind ?? 'exempt'}${exempt.of ? ` of ${exempt.of}` : ''}) — ${exempt.reason ?? 'cited dupe / out-of-area shell'}`
          : rosterCount === 0
            ? 'empty roster — practice record on disk but NO individual providers captured (org-NPI shell); the roster was never enumerated, so it escapes the per-provider audit'
            : `roster of ${rosterCount} on the practice record but ZERO rows in providers.json — the providers exist on disk but are absent from the review population`,
      };
    });

  // an EXEMPT unaudited practice (a cited dupe / out-of-area shell) is a nitpick;
  // an unaudited practice with NO exempt marker is a true coverage blocker.
  const coverageBlockers = unauditedPractices.filter((u) => !u.exempt);
  const coverageExempt = unauditedPractices.filter((u) => u.exempt);

  const complete = reviewed.filter((r) => r.verdict === 'COMPLETE');
  const incomplete = reviewed.filter((r) => r.verdict === 'INCOMPLETE'); // blockers
  const excusedRows = reviewed.filter((r) => r.verdict === 'EXCUSED'); // nitpicks

  // FEDERAL COVERAGE — the exhaustiveness proof against the federal source of truth.
  // the coverage self-check above proves every practice FILE maps to an audited row;
  // it does NOT prove our file set covers the federal NPI registry. that proof lives
  // in db.federal/coverage.federal.json, computed by project.federal.coverage from
  // the raw federal captures. we read it here and fold its gaps into the verdict:
  //   gapCore = a dermatologist in the PCB core near-band (0-30min) with NO NPI in
  //             our records — a definite miss, a BLOCKER.
  //   gapBand = a dermatologist in the wider 324x/325x band absent from our records —
  //             distance-dependent, surfaced as a NITPICK for review.
  const federal = readFederalCoverage();
  const federalGapInArea = federal?.gapInArea ?? [];
  const federalOutOfArea = federal?.outOfArea ?? [];

  // an unaudited, non-exempt practice is a real exhaustiveness failure — it counts
  // as a blocker, so the review cannot read green while a practice on disk goes
  // unaudited without a cited do-not-refer reason. a federal PCB-AREA gap (a 324xx
  // dermatologist absent from our records) is the same class of failure, proven
  // against the federal registry. a federal OUT-OF-AREA provider (325xx+, a
  // different metro 45min-2hr away) is NOT a gap — it is correctly outside the
  // PCB-area scope, cited by county, and surfaced only as an informational nitpick.
  const blockers =
    incomplete.length + coverageBlockers.length + federalGapInArea.length;
  const nitpicks =
    excusedRows.length + coverageExempt.length + federalOutOfArea.length;

  // ONLINE APPOINTMENT CAPACITY — the direct answer to "for each with online
  // capacity, when is the earliest". one entry per REFERABLE practice (dedup by
  // practiceKey), its new-patient online tier + the earliest date when a live
  // calendar exposes one. ordered by tier so live-calendar practices lead.
  const capacityByPractice = new Map<
    string,
    { practiceKey: string; tier: string; earliest: string | null }
  >();
  for (const r of reviewed) {
    if (r.verdict === 'EXCUSED') continue;
    if (!capacityByPractice.has(r.practiceKey))
      capacityByPractice.set(r.practiceKey, {
        practiceKey: r.practiceKey,
        tier: r.onlineCapacityTier,
        earliest: r.onlineEarliest,
      });
  }
  const tierOrder: Record<string, number> = {
    'live-calendar': 0,
    'online-request': 1,
    'portal-prior': 2,
    'phone-only': 3,
  };
  const onlineCapacityByPractice = [...capacityByPractice.values()].sort(
    (a, b) => (tierOrder[a.tier] ?? 9) - (tierOrder[b.tier] ?? 9),
  );
  const onlineCapacityEarliest = onlineCapacityByPractice
    .filter((c) => c.tier === 'live-calendar')
    .map((c) => ({ practiceKey: c.practiceKey, earliest: c.earliest }));

  // the insurance worklist: referable practices (dedup by practiceKey) whose
  // insurance dimension is not yet resolved. this is the loop's next drive.
  const practicesAbsentInsurance = [
    ...new Map(
      reviewed
        .filter((r) => r.verdict !== 'EXCUSED' && !r.req3InsuranceDeclared)
        .map((r) => [r.practiceKey, r.practiceKey]),
    ).keys(),
  ];
  const practicesAbsentEarliest = [
    ...new Map(
      reviewed
        .filter((r) => r.verdict !== 'EXCUSED' && !r.req1EarliestDeclared)
        .map((r) => [r.practiceKey, r.practiceKey]),
    ).keys(),
  ];
  const practicesAbsentBookMethod = [
    ...new Map(
      reviewed
        .filter((r) => r.verdict !== 'EXCUSED' && !r.req2BookMethodDeclared)
        .map((r) => [r.practiceKey, r.practiceKey]),
    ).keys(),
  ];

  const practiceFileCount = [...practiceByKey.values()].filter(
    (rec) => !SYNTHETIC_KEYS.has(rec.practiceKey),
  ).length;

  return {
    verdict: {
      blockers,
      nitpicks,
      summary: `${blockers} blockers\n${nitpicks} nitpicks`,
    },
    coverage: {
      practiceFilesOnDisk: practiceFileCount,
      practicesAudited: new Set(reviewed.map((r) => r.practiceKey)).size,
      practicesUnauditedExempt: coverageExempt.length,
      practicesUnauditedBlocker: coverageBlockers.length,
      providersAudited: reviewed.length,
      coverageExempt,
      coverageBlockers,
    },
    federalCoverage: federal
      ? {
          computed: true,
          federalTotal: federal.federalTotal,
          federalDermatologists: federal.federalDermatologists,
          federalNonDermPrimary: federal.federalNonDermPrimary,
          federalOrgs: federal.federalOrgs,
          ourNpiCount: federal.ourNpiCount,
          counts: federal.counts,
          gapInAreaBlockers: federalGapInArea.map(
            (g) =>
              `${g.name} (${g.npi}) — ${g.locationCity} ${g.locationPostal5} — PCB-area (324xx), absent from our records`,
          ),
          outOfAreaNitpicks: federalOutOfArea.map(
            (g) =>
              `${g.name} (${g.npi}) — ${g.locationCity} ${g.locationPostal5} — out of PCB area (adjacent county, 45min-2hr)`,
          ),
        }
      : {
          computed: false,
          note: 'db.federal/coverage.federal.json absent — run project.federal.coverage to prove federal exhaustiveness',
        },
    totalProviders: reviewed.length,
    completeCount: complete.length,
    incompleteCount: incomplete.length,
    excusedCount: excusedRows.length,
    coverageBlockers,
    onlineCapacityByPractice,
    onlineCapacityEarliest,
    practicesAbsentInsurance,
    practicesAbsentEarliest,
    practicesAbsentBookMethod,
    incompleteBlockers: incomplete.map((r) => ({
      name: r.name,
      practiceKey: r.practiceKey,
      absent: r.absent,
    })),
    detail: reviewed,
  };
};
