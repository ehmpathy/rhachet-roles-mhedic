# domain.term.choice.reason: diagnostician

## .etymology

from greek *diagignōskein* — "to know thoroughly, to tell apart" (*dia-* through +
*gignōskein* to know). the word already carries the whole act: not merely to name a disease,
but to **tell one cause apart from another**.

that is exactly the role's job, and it is why the word beat every alternative: the
alternatives each name one *step*, while `diagnostician` names the *whole act*.

## .disputes

### dispute: diagnoser — raised 2026-08-08 — status: RESOLVED (keep `diagnostician`)

- raised.by  = the human, at role design
- claim      = `diagnoser` is the plainer word — it reads as "one who diagnoses", no jargon
- counter    = `diagnoser` is a back-formation nobody in medicine says. the domain expert's
               word is `diagnostician`; per `rule.require.ubiqlang`, the expert's word wins
               over the convenient one. it also reads as a lesser act — a `diagnoser` labels,
               a `diagnostician` reasons.
- resolution = keep `diagnostician`; record `diagnoser` as a forbidden synonym.
               (the human's own words: "diagnostician is better, lets go with that")

### dispute: intaker / assayer / triager — raised 2026-08-08 — status: RESOLVED (absorbed)

- raised.by  = the human, at role design
- claim      = intake, assay, and triage are three distinct acts, so three distinct roles
- counter    = they are three **phases of one act**, not three acts. a clinician who takes a
               history, orders a panel, and ranks urgency has not switched professions — the
               diagnosis is what they pursue throughout. to split them would fracture one
               bounded context into three that must constantly hand state back and forth.
- resolution = absorb all three into `diagnostician`; record `intaker`, `assayer`, and
               `triager` as forbidden synonyms. no separate roles are declared.
               (the human's own words: "diagnoser must do all three of these really")

## .the three absorbed phases

| phase | what it does | why it is not its own role |
|-------|--------------|----------------------------|
| intake | gather the history, symptoms, context | a history taken with no hypothesis in mind is a form, not a diagnosis |
| assay | order and read the tests | which test to order IS a diagnostic judgment |
| triage | rank urgency | urgency follows from the differential, so it cannot precede it |

## .evidence

- discovery: domain-expert narrative — the human walked the role set and collapsed four
  candidate roles into one
- the absorption is visible in the role's declared purpose: "trace symptoms to their likely
  causes" — a purpose that spans all three phases
- invariant: `mhedic` declares exactly one role that reasons from symptom to cause. a second
  such role would overload the concept and split the differential across two contexts.
