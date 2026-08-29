# philosophy: the melanoma-diagnosis route

## .what

this brief teaches **why** the `diagnose.melanoma` route is shaped the way it is — for the humans and
robots who will drive it and maintain it. the skill beside this file stamps the route; this file
explains the design so nobody re-inflates it back into the general open-differential engine.

it is **not** a specialization of `diagnose.health`'s superposition route. it is the opposite move: a
**compiled** decision procedure. `diagnose.health` is a discovery engine for an *open* domain — it
enumerates and disentangles a per-case differential because the candidate set is unknown up front.
melanoma is a **closed** domain, so this route amortizes that work at build time and merely **applies**
the compiled procedure per case.

## .the core idea — a closed domain applies, it does not re-discover

melanoma diagnosis rests on a **known constant**: a textbook pigmented-lesion differential (benign
nevus, dysplastic nevus, melanoma, seborrheic keratosis, solar lentigo, basal-cell carcinoma,
squamous-cell carcinoma) and a set of **validated instruments** with published thresholds (the ABCDE
rule, dermoscopy checklists). none of this changes per case. so the route does not spend runtime stones
to enumerate a differential it already knows, nor to re-derive an instrument the literature already
settled.

this is the `rule.require.amortize-known-domain-research` principle made concrete: when the differential
is **closed** and the literature is **settled**, do the study once, at build time, and bake the cited
instrument + thresholds into the route. the runtime route is short because the hard work is already
compiled into it.

> the general engine **discovers** a method per case. this route **applies** a method known in advance.

## .the compiled five phases and why each exists

```
1. intake        capture the lesion history + ABCDE observations + red-flag symptoms
2. score         apply the fixed ABCDE instrument + a validated dermoscopy checklist (pre-cited thresholds)
3. redteam       the can't-miss guard — the closed set of asymmetric-miss presentations
4. acuity        collapse to a binary: emergency-now vs. see-a-clinician-soon
5. output        two-layer: plain-language patient summary on top, cited clinical detail beneath
```

## .the design principles baked into that order

### 1. the differential is a constant, not a per-case build

there is **no enumeration phase and no disentangle phase**. the pigmented-lesion differential is a
closed, textbook set — it is inventoried once (cited, in `accrue/`) and referenced, not rebuilt per
lesion. a runtime stone that re-enumerates a known-constant differential is exactly the ceremony this
route exists to cut.

### 2. score against fixed, pre-cited instruments

phase 2 applies the **ABCDE** rule (Asymmetry, Border, Color, Diameter, Evolution — the naked-eye
pattern) and a **validated dermoscopy checklist** (e.g. the seven-point or three-point checklist)
against thresholds that were **cited at build time** into the accrued inventory. the runtime work is to
*apply* the instrument to this lesion, not to *choose or justify* the instrument. the two lenses stay
labeled — a phone photo yields ABCDE, not dermoscopy — so the read is honest about which signal the
case actually carries.

### 3. the can't-miss redteam survives — the miss is asymmetric

the one place a closed domain still needs an adversarial stone is the **asymmetric miss**. an
under-called melanoma costs a life; an over-called benign lesion costs a biopsy. so phase 3 checks the
lesion against the closed set of **can't-miss presentations** — amelanotic melanoma, the nodular
subtype, the lesion that changes — the very cases where the naked-eye score reads as false comfort.
absence of a worrisome feature is never evidence of benignity.

### 4. acuity collapses to a BINARY for a possible cancer

for a melanoma-flagged lesion, a three-tier urgency grade is a hazard: a self-managed "watch" tier
reads as reassurance, and a false "watch" on a melanoma is a costly miss. so phase 4 collapses acuity
to a **binary**:

- **emergency-now** — a lesion that bleeds, is ulcerated, or changes fast → "call your local emergency number now"
- **see-a-clinician-soon** — every other melanoma-flagged lesion → have a dermatologist look promptly

there is **no self-managed "watch" tier** while melanoma is still in play. the tool must not claim a
finer urgency grade than it can safely own for a possible cancer. a lesion the redteam **confidently
cleared** (every can't-miss member excluded by an exam-grade read) gets a distinct **routine** read —
no urgent referral, but the disclaimer holds and any future change warrants a fresh look. the binary
is the discipline for the still-live case; it is not a denial that a benign lesion can read benign.

### 5. the output is two-layered — clinical engine, patient interface

phase 5 emits **two** artifacts, and the layperson reader sees only the top one:

- **clinical** — the raw layer for a clinician: the ABCDE + dermoscopy scores, the can't-miss check, every claim cited.
- **patient** — the plain-language translation: "how worried / what next", carried with the
  not-medical-advice disclaimer and the emergency carve-out. a layperson is never handed a raw score to self-interpret.

the raw clinical read is the *engine*, not the *interface*. that separation is the safety hinge.

### 6. the thresholds are cited, not invented

the whole value of a compiled route is that its instrument thresholds trace to real evidence. every
number the score stone applies is bhrowser-cited into `accrue/inventory.of=<topic>.md`
(`rule.require.bhrowser-citations`, `rule.require.accrue-research`) — the ABCDE sensitivity/specificity,
the dermoscopy checklist cut-points, the teledermatology concordance, the phone/AI classifier accuracy
and regulatory status. a compiled route on un-cited thresholds is a guess in a lab coat.

## .the grounds

the frame unifies established decision-theory + dermatology canon — cited (bhrowser-verified) in the
route's accrue: minimax / precautionary logic (an under-called melanoma dwarfs an over-called one), the
ABCDE rule, validated dermoscopy checklists, and can't-miss / rule-out logic.

## .for maintainers — what NOT to do

- **do not** add an enumeration or disentangle phase — the differential is a known constant (principle 1)
- **do not** make a runtime stone re-justify the instrument — it is fixed and pre-cited (principle 2)
- **do not** drop the can't-miss redteam — the asymmetric miss is the one adversarial step a closed domain still needs (principle 3)
- **do not** add a "watch" tier to the acuity — the binary is deliberate for a possible cancer (principle 4)
- **do not** hand a layperson the raw clinical layer — the patient layer is the interface (principle 5)
- **do not** let the score stone apply an un-cited threshold — every number traces to the accrue (principle 6)
- **do not** let the diagnostician say WHERE to get seen — that is the referrer's (the boundary)

## .see also

- `rule.require.amortize-known-domain-research.[rule].md` — why a closed domain compiles its research at build time
- `philosophy.diagnosis-superposition-route.[philosophy].md` (beside `diagnose.health`) — the open-domain engine this route deliberately is NOT
- `motto.not-medical-advice.[motto].md` — the disclaimer + emergency carve-out
- `rule.require.bhrowser-citations.[rule].md` — claims must trace to bhrowser sources
- `rule.require.accrue-research.[rule].md` — the compound-research discipline
- `rule.forbid.pii.[rule].md` — persona-handle redaction at intake
