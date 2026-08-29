# domain.term: online-capacity

term.chosen   = online-capacity
term.kind     = noun
term.synonyms.forbidden:
- online-booking (names only the top tier; online-capacity spans all four, including phone-only)
- self-schedule (the mechanism of one tier, not the graded capability across providers)
- portal (a single tier — the prior-patient login — not the whole graded axis)
- availability (too broad; availability is a date, online-capacity is the tier that gates it)
- e-scheduling (jargon; says naught about the new-patient vs prior-patient split that is the point)

## .what

the **graded tier of a provider's new-patient online appointment capability** — a four-value
ordinal that answers "can a NEW patient book here without a phone call, and how far?": `live-calendar`
(self-schedule with a concrete date observable on the page), `online-request` (a form that submits
a request, no public slot), `portal-prior` (a login gated to PRIOR patients — not open to a new
patient), or `phone-only`. the distinction that carries the weight: a patient PORTAL is not
new-patient capacity — it serves prior patients, so it ranks below an open request form. only
`live-calendar` yields a citable earliest date.

## .refs

- src/domain.roles/referrer/skills/census.providers/review.requirements.play.ts (asOnlineCapacity, onlineCapacityTier, onlineCapacityByPractice)
- src/domain.roles/referrer/skills/census.providers/probe.onlinecapacity.earliest.play.ts (probes the null-earliest tiers)

## .reason

see the ref-level cluster beside this choice:
- `term=online-capacity._.choice.reason.md` — etymology, the portal-vs-new-patient split, evidence
