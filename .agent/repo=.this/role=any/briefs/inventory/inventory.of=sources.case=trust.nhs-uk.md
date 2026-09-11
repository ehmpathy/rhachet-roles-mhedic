# inventory.of=sources.case=trust.nhs-uk

- **source**: NHS (UK National Health Service) — the public health service's patient-tier reference
- **domain**: `nhs.uk/conditions/…`, `nhs.uk/symptoms/…`
- **case**: **trust** — tier 2 (authoritative, **patient-tier**)
- **bhrowser retrieval**: ok (2026-09-05) — renders headless and headful, no captcha, no paywall

## .why we can trust it

a national health service's own patient-facing reference. editorially reviewed, dated, and — the
part that matters most — it is the **operational front end of a real triage system**, so its
escalation thresholds are not advice-shaped prose but the actual criteria behind `999` and `111`.

## 🔴 .what it is unusually strong at — ESCALATION THRESHOLDS and NORMAL-COURSE BASELINES

no professional reference states these as plainly, because a professional reference assumes a
clinician is already present.

**escalation thresholds, stated by tier** — `999`/A&E vs `111`/GP vs self-care. these are the
cleanest published statement of *when a layperson must act*, and they are directly reusable as the
acuity envelope of a patient-facing output.

🔴 **normal-course baselines — the bound on a safe wait.** the rarest item in the corpus, and the
only tier that publishes it:

> *"diarrhoea … usually stops within 5 to 7 days"* · *"vomiting … usually stops in 1 to 2 days"*
> — NHS, Diarrhoea and vomiting

⇒ **a baseline is what converts a duration into a datum.** without one, a reported duration is a
number that carries no sense; with one, it is a value inside or outside a published range.

## 🔴🔴 .it NAMES THE TRAPS, which the professional tier omits

NHS pages state, in plain words, the signs that **mislead as reassurance**:

> *"If appendicitis is not treated quickly, your appendix can burst. If this happens **your pain may
> suddenly get better for a short time.** You'll then usually have severe pain that spreads to the
> whole of your abdomen."* — NHS, Appendicitis

> *"Contact your GP or call NHS 111 if you have a combination of any of the above symptoms and you
> might be pregnant – **even if you haven't had a positive pregnancy test**."* — NHS, Ectopic pregnancy

⇒ **the professional tier states mechanisms; the patient tier states the misreads.** a route that
reads only the professional tier will reproduce the misread it never saw named.

## 🔴 .the caveat that decides the whole tier — ADJECTIVES, NOT RATES

**the patient tier publishes frequency words and almost never denominators.** *"common"*,
*"usually"*, *"rarely"* — never `> 5% of the population` with a primary citation behind it.

⇒ 🔴 **so a corpus built only from NHS cannot support a probability rank, by construction.** the
repair is a **tier change** (MSD professional, StatPearls), never more reads of the same pages.
⚠️ **this failure reads as an absence of evidence and is really an absence of the right corpus.**

## .other caveats

- **UK-specific service names** — `999`, `111`, `GP`, `A&E` have no direct equivalent elsewhere.
  the **clinical** threshold transfers; the **phone number** does not
- **no inline primary citations** — a claim cannot be traced to its study from the page
- **conditions are covered one page at a time**, so a differential must be assembled across pages
  rather than read off one

## .use

escalation thresholds · normal-course baselines that bound a safe wait · the plain-language traps ·
the calibration floor (what the common benign causes actually are). ⇒ **pair it with a
professional-tier source for any quantity**, and localize the service names.

## .see also

- `inventory.of=sources.case=trust.msd-manuals-professional` — the professional tier that carries the
  quantities this one omits
- `inventory.of=sources.case=trust.ncbi-pmc` — StatPearls and the systematic reviews
- `rule.require.bhrowser-citations` — how these quotes must be obtained
