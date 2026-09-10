# inventory.of=sources.case=trust.msd-manuals-professional

- **source**: MSD Manual, **Professional** Edition — the human-medicine professional reference
  (published as the *Merck Manual* Professional Edition inside the US)
- **domain**: `msdmanuals.com/professional/…`
- **case**: **trust** — tier 2/3 (authoritative professional reference)
- **bhrowser retrieval**: ok (2026-09-05, 2026-09-06) — renders headless and headful, no captcha

## 🔴 .why this sits at `role=any` — the native-to test, run rather than assumed

`rule.require.accrue-research` makes a **premature lift a blocker**: a promotion to repo-wide
`role=any` is illegitimate when only one role's expertise owns the fact, and *"a cross-role citation
does not earn `role=any`, only shared authorship does."*

⚠️ **the 21 neighbouring source-trust briefs all sit here, and that is NOT the reason this one does.**
precedent is a reason to look, never a reason to conform.

the rule's test — **"which role's expertise would AUTHOR this fact?"**:

| what is promoted here | native to |
|---|---|
| ✅ **a judgment about a PUBLISHER** — is it citable, what tier, does it render, which prefix carries the quantities | **every role that does research** — diagnostician, referrer, preventer would each author this independently |
| 🔴 **the clinical facts it yielded** — the `> 5%` figure, the 6-hour bound, the exam definitions | **the diagnostician alone** ⇒ these are **NOT** promoted. they live in `$route/accrue/`, and the quotes below are **illustrative of the source's quality only** |

⇒ **a source-trust entry is a research-methodology fact, not a domain fact.** that is what earns
`role=any`. the domain facts it produced stay where the route accrued them.

## .why we can trust it

the standard professional human-medicine reference. every page is signed by a named clinician
author, carries an explicit **full review** and **last updated** date, and cites primary literature
inline by number.

it is the human twin of `inventory.of=sources.case=trust.merck-vet-manual`, and it earns the same
tier for the same reasons.

> *"In the United States, acute appendicitis is the most common cause of acute abdominal pain
> requiring surgery. Over 5% of the population develops appendicitis at some point (1)."*
> — *Appendicitis*, Parswa Ansari MD, full review Jul 2024 — cited there to
> Addiss DG et al, *Am J Epidemiol* 1990;132(5):910–925

## 🔴 .the PROFESSIONAL / CONSUMER split is the whole point of this entry

MSD publishes **two editions of the same topic** at two URL prefixes:

| edition | prefix | what it yields |
|---|---|---|
| **professional** | `/professional/…` | ✅ **base rates with denominators**, operational exam definitions, red-flag lists, time bounds |
| **consumer** | `/home/…` | 🔴 the same topic, **with the quantities removed** |

🔴🔴 **measured, 2026-09-06:** one professional page yielded **8 distinct quantities** with primary
citations behind them. **its consumer-tier twin, already in the corpus, yielded none of the eight.**

⇒ **a route that needs base rates must request the `/professional/` prefix explicitly.** to land on
the consumer page and conclude *"no rate exists"* is a corpus-tier error, not an absence of
evidence.

## .what it is unusually strong at

- **base rates with honest denominators** — and it names the primary study
- **operational definitions a non-clinician can apply** — e.g. rebound as *"a distinct flinch upon
  brisk withdrawal"*, distinguished from the *"involuntary contraction"* of the abdominal muscles
- **unconditional safety instructions** — e.g. *"a bedside urine pregnancy test should be done for
  all women of childbearing age"*, stated with no symptom precondition
- **time bounds** — e.g. *"gangrene and perforation … can occur < 6 hours from onset"*
- **can't-miss differential shortlists** per presentation

## .caveats

- **a broad reference, not a primary study.** for a specific magnitude claim, corroborate with the
  cited source. ⚠️ check its **vintage** — the appendicitis lifetime rate traces to a 1990 paper.
- **a review date is not a data date.** *"full review Jul 2024"* means the page was reviewed then,
  never that its cited figures were re-measured then.
- **read the denominator, not the number.** its rates mix kinds freely on one page — cumulative
  lifetime, per-episode, conditional-given-disease — and two of different kinds may not be compared.
- ⚠️ **URL paths shift.** ectopic pregnancy has been served from both
  `/abnormalities-of-pregnancy/…` and `/early-pregnancy-disorders/…`. **verify the page title after
  each fetch** rather than trust the path.

## .use

base rates, red flags, acuity bounds, operational exam definitions, differential shortlists.
**always request `/professional/`.** corroborate quantified claims against the primary literature
it cites, and carry each rate's denominator with it.

## .see also

- `inventory.of=sources.case=trust.merck-vet-manual` — the veterinary twin, same publisher, same tier
- `rule.require.bhrowser-citations` — how these quotes must be obtained
- `rule.require.fifty-divergent-citations` — MSD professional and MSD consumer are **one** publisher;
  count them as such when divergence is assessed
