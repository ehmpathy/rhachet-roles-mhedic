# philosophy: the care-referral route

## .what

this brief teaches **why** the `refer.care` route is shaped the way it is — for the humans and robots
who will drive it and maintain it. the skill beside this file stamps the route; this file explains the
design so nobody collapses the teach-to-search method back into a one-shot "here is a doctor" lookup.

it is the **downstream half** of a two-skill composition. the diagnostician's `diagnose.melanoma` sets
the urgency; `refer.care` takes that urgency as GIVEN and routes the patient to real care. the two
stand alone and compose in order — this route never re-judges the acuity it was handed.

## .the core idea — teach to search, do not hand a frozen list

there is **no sanctioned provider directory** (wisher's call). so the route does not pretend to own a
clinician database it would have to keep fresh. instead it runs an actual **bhrowser search** for real,
local options — and records the **repeatable search method** alongside the results. the durable
deliverable is the *method*, not the list: a clinician shortlist goes stale in weeks, but the query
terms + sites + filters let the human re-run the search whenever they need it.

> a directory lookup hands a frozen answer. this route teaches a repeatable way to find the answer.

that is why the clinician-find stone is a **research stone**: every option is bhrowser-cited
(`rule.require.bhrowser-citations`), and the generic facts (a venue's access profile, a telederm cost
band, the search method itself) accrue into `accrue/inventory.of=<topic>.md`
(`rule.require.accrue-research`) so future routes inherit them.

## .the six phases and why each exists

```
1. intake.need        capture the specialty implied + urgency (as GIVEN) + the four access constraints
2. venue.enumerate    map the given urgency -> venue fit (ER / urgent / primary / specialist / telederm)
3. clinician.find     teach-to-search: real options via bhrowser + the repeatable method
4. access.rank        sort by the path the patient can actually walk (wait x cost x distance x language)
5. prepare            what to carry, what to ask, what to expect
6. referral.yield     two-layer: 6.1 cited clinical detail, 6.2 plain-language patient summary
```

## .the design principles baked into that order

### 1. urgency is carried, never re-judged (the referrer boundary)

phase 1 transcribes the diagnostician's urgency **as GIVEN** — verbatim, in whatever tiers that
diagnostician used. the referrer decides **where** and **how** to get seen; it never decides **how
urgent**. a venue map that silently re-grades severity has stepped out of scope
(`define.referrer-scope`). the canonical hand-off is the diagnostician's `4.1.acuity.yield.md` — the
onward-care kind + urgency, short of the venue — not the `5.1`/`5.2` human-reader layers.

### 2. the venue decision consumes cited virtual-vs-in-person evidence

phase 2 maps urgency to venue fit. for a telederm venue on a **pigmented lesion** it must carry the
cited tradeoff (wish Q3, from `inventory.of=teledermatology-concordance.md`): telederm triage is strong
(~94.9% any-skin-cancer sensitivity) but the melanoma-specific evidence is weaker and scarcer
(sensitivity 59%–100%), and comparative data vs in-person are thin. so "start virtual, upgrade to
in-person if flagged" — telederm is a reasonable start, never an equal substitute for a possible
melanoma.

### 3. rank by the path the patient can actually walk

phase 4 sorts options by the **access reality**, not by a clinical ideal: wait time × cost/coverage ×
distance/transport × language/accessibility. the best clinician the patient cannot reach in time is not
the best referral. a telehealth / wider-radius fallback surfaces when local options run thin, so the
patient never hits a dead end (the "6-month wait" the wish names is exactly this failure mode).

### 4. search geography is a query parameter, not patient PII

the route searches for **local** clinicians, which needs city-level granularity. that does not conflict
with `rule.forbid.pii`: the **care-search area** (the city the human seeks care in) is a search
parameter, distinct from the patient's PII-protected **home location**. coarsen the home address to
region; keep the search-target area at city-level. a clinician's public practice address is a business
fact, not patient PII. (reconciled in `1.1.intake.need.stone` + `3.1.clinician.find.stone`.)

### 5. the output is two-layered — clinical engine, patient interface

phase 6 emits **two** artifacts, and the layperson reader sees only the top one:

- **clinical (6.1)** — the raw layer: the ranked clinician options, their access constraints, every
  bhrowser citation, and the repeatable search method.
- **patient (6.2)** — the plain-language translation: "who to see and how to get seen", carried with
  the not-medical-advice disclaimer and the emergency carve-out.

the raw clinical read is the *engine*, not the *interface*. that separation is the safety hinge — the
same discipline the diagnostician's output layers follow.

### 6. citations are bhrowser-traced, never WebSearch/WebFetch

every clinician option and every access fact traces to a bhrowser read
(`rule.require.bhrowser-citations`) — WebSearch/WebFetch are forbidden as citation sources. a referral
on un-traceable options is a guess the patient acts on.

## .for maintainers — what NOT to do

- **do not** re-grade the urgency — it is the diagnostician's, carried as GIVEN (principle 1)
- **do not** present telederm as an equal substitute for in-person on a pigmented lesion (principle 2)
- **do not** rank by clinical ideal over the access path the patient can actually walk (principle 3)
- **do not** coarsen the *search area* to region — that is a query parameter, not patient PII (principle 4)
- **do not** hand a layperson the raw clinical layer — the patient layer is the interface (principle 5)
- **do not** cite via WebSearch/WebFetch — every option traces to a bhrowser read (principle 6)
- **do not** freeze the clinician list as the deliverable — the repeatable **method** is the durable half

## .see also

- `philosophy.diagnosis-melanoma-route.[philosophy].md` (beside `diagnose.melanoma`) — the upstream half this route composes with
- `define.referrer-scope.[lesson].md` — the specialty/venue/access outputs + the "which-test vs where-test" boundary
- `motto.not-medical-advice.[motto].md` — the disclaimer + emergency carve-out
- `rule.require.bhrowser-citations.[rule].md` — claims must trace to bhrowser sources
- `rule.require.accrue-research.[rule].md` — the compound-research discipline
- `rule.forbid.pii.[rule].md` — persona-handle redaction, and the search-area-vs-home-location reconciliation
