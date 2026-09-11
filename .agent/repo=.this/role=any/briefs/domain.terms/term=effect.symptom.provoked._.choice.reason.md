# domain.term.choice.reason: effect.symptom.provoked

## .etymology

**provoked** = called forth by an act. chosen over `elicited`, which is the standard clinical
word and was rejected on two grounds.

### 1. `elicited` presupposes a clinician; `provoked` is agent-neutral

*"an elicited sign"* reads as **a sign a skilled examiner drew out**. the verb carries an
examiner in it.

that presupposition is false in the case that produced this term. the owner pressed and rubbed
their own abdomen, unprompted, and reported two opposite responses. **no clinician was in the
room**, and the signs were real data.

⇒ a word that implies an examiner makes the owner-self-performed case read as an approximation
of a clinical exam rather than as its own row. it is not a lesser version of one — it is a
distinct exposure with a distinct grade (`owner-reported`, never `observed`).

### 2. `provoked` has an antonym; `elicited` does not

the concept is useful **only as a pair**. every `effect:symptom` is one or the other, and the
partition is what makes a gap list correct.

| | |
|---|---|
| spontaneous ↔ **provoked** | symmetric. both adjectives, both name the sign's origin |
| spontaneous ↔ *elicited* | 🔴 asymmetric. `elicited` names an act done TO the sign, not a property OF it |

⇒ per `rule.prefer.symmetric-term-pairs`, a matched shape for complementary labels. the pair
must read as one axis with two values, and `spontaneous/elicited` reads as two unrelated ideas.

## .disputes

### dispute: elicited — raised 2026-09-05 — status: RESOLVED (keep `provoked`)

- raised.by  = the route itself, mid-drive
- claim      = `elicited` is the standard clinical term of art. *"elicited sign"* is what a
               clinician says and what the literature prints. a domain that speaks medicine
               should use the medical word, per `rule.require.ubiqlang`'s *"speak the human's
               words"*
- counter    = the standard word carries a presupposition our domain violates. mhedic's cases
               include **owner-self-performed** manoeuvres, and `elicited` renders those as a
               degraded clinical exam rather than as their own class with their own grade.
               and the concept carries load only as a **pair** — `elicited` has no antonym, so
               the axis cannot be named with it
- resolution = keep `provoked`; record `elicited` as a forbidden synonym.
               ⚠️ the loss is real and recorded: we diverge from the clinical term of art here,
               so a clinician who reads our artifacts meets an unfamiliar word for a familiar
               idea. that cost is accepted because the pair-symmetry and the agent-neutrality
               both bear directly on whether a gap list is correct

## .evidence

### the drift that forced the choice — 2026-09-05

⚠️ **the origin route was a private case and was removed** (`rule.forbid.pii`). its intake
structure stone used **both words for one concept, in one file**:

> *"E3 and E4 are **elicited** signs, not spontaneous symptoms"*
> *"E1 and E2 are spontaneous; E3 and E4 are **provoked**"*

two words, one concept, no canonical term declared — `rule.forbid.domain-term-inconsistency`
exactly. and the inconsistency was **the signal that the concept had earned a term**: it
recurred often enough in one stone to be said two ways.

### the discovery — a dimensional walk of the effect set

the axis surfaced from `howto.dimensional-decomposition` applied to the four captured effects:

⚠️ **generalized from that case** — the shape is what transfers, never the words:

| the effect's shape | origin | why |
|---|---|---|
| a pain, reported | **spontaneous** | it occurs unbidden; an **ask** closes it |
| a multi-day stool change, reported | **spontaneous** | likewise |
| 🔴 tenderness — *worse when you **press*** | **provoked** | the verb names an act |
| 🔴 relief — *better when you **rub*** | **provoked** | likewise |

⇒ **the tell is a VERB inside the report.** *press*, *rub*, *cough*, *stand* — each names an act, and
an act is an exposure.

the split is clean, exhaustive, and it predicted a defect: the two provoked rows had been itemized
as effects **with no exposure**, because the act inside each report had been read as part of the
observation rather than as its own node.

### the invariant it produced

> **a provoked `effect:symptom` requires a `cause:exposure`.** an itemized provoked symptom
> with no exposure row is a broken chain, and it is silent — it reads as a complete record.

⇒ checkable: for every effect marked `provoked`, there must exist an exposure it is the effect
of. in the case above, that check produced `X9` (self-palpation) and `X10` (clinician
examination manoeuvres), neither of which the first draft held.

### the cost of the conflation, measured

before the split, the yield's headline read *"the cause side of the chain is ~EMPTY"*. that was
**false, and it was produced by the defect** — the one exposure with a captured effect had been
folded into its own effect. a structural error presented as a substantive conclusion about the
case.

## .see also

- `term=effect.symptom.spontaneous._.choice._.md` — the pair
- `term=effect.symptom._.choice._.md` — the parent node
- `term=cause.exposure._.choice._.md` — what a provoked symptom always implies
- `rule.prefer.symmetric-term-pairs` (ergonomist) — the pair-shape argument
- `rule.forbid.domain-term-inconsistency` (learner) — the rule the drift violated
