# domain.term.choice.reason: expectation

## .etymology

"expectation" names what we **anticipate** of a symptom we have reason to foresee — how likely it
is, and how long it lasts. it is the projection we hold *before* the symptom plays out, so the owner
knows what is routine and what is not.

chosen over:
- **prediction** / **forecast** — weather-and-model jargon; they imply a computed point estimate.
  an expectation here is a band (probability bucket + a duration range), not a precise forecast.
- **projection** — overloaded (finance, geometry, a data projection).
- **outlook** — vague, and drifts toward **prognosis**, which is a genuinely distinct medical
  concept (the outlook of a *disease course*), not the small per-symptom "what to expect."

## .the symmetry — expectation ↔ alert

the domain fits each node of an exposure's fallout with one apparatus:

| node | fitted with | made of |
|------|-------------|---------|
| **hazard** (a potential adverse outcome) | an **alert** | monitor + alarm |
| **symptom** (an anticipated observable sign) | an **expectation** | probability + duration |

the owner's shorthand for the pair: *"we build alarms on hazards, expectations on symptoms."*
the two are deliberate counterparts — a hazard is watched for and its alarm fires; a symptom is
anticipated and its expectation projects. held distinct, the two inventories
(`inventory.of=hazards` vs `inventory.of=symptoms`) stay cleanly split.

## .disputes

none. the term was settled alongside the hazard/monitor/alarm/alert cluster; no synonym contested.

## .evidence

- `rule.require.hazard-alerts` — the rule that pairs a node with what it is fitted with
- `inventory.of=symptoms.for=feline.case=vaccines-felv-fvrcp-rabies/` — the first realization: each
  symptom file (`pNN.$slug.md`) carries a probability (`pNN`) + a duration = its expectation
