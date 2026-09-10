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

- src/domain.roles/referrer/skills/census.providers/review.requirements.play.ts (`asOnlineCapacity` L145, `onlineCapacityTier` L284, `onlineCapacityByPractice` L378, `onlineCapacityEarliest` L381)

⚠️ **a second ref named `probe.onlinecapacity.earliest.play.ts` was cited here and no such file
exists** — verified 2026-09-07, a glob of `src/**/probe*` returns zero. the null-earliest logic it
claimed lives at `review.requirements.play.ts:381` above. ⇒ **phantom path removed.**

## .reason

see the ref-level cluster beside this choice:
- `term=online-capacity._.choice.reason.md` — etymology, the portal-vs-new-patient split, evidence
