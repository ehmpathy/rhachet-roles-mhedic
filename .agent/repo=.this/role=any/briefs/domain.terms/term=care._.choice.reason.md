# domain.term.choice.reason: care

## .etymology

from the referrer's own scope brief — "route to the right **care**". "care" is the umbrella the domain
already uses for a health destination (primary care, urgent care, specialist care, telehealth care),
broader than any single act within it.

## .disputes

### dispute: treatment — raised 2026-08-14 — status: RESOLVED (keep `care`)
- raised.by  = mechanic
- claim      = "treatment" is what the patient ultimately wants.
- counter    = "treatment" is the *prescriber's* act (a drug, a procedure), one act that happens
               *within* care. the referrer routes to care and stops at the boundary — it does not
               prescribe. to name the target "treatment" would leak the prescriber's scope into the
               referrer's. `care` is the destination; `treatment` is a downstream act inside it.
- resolution = keep `care`; record `treatment` as a forbidden synonym.

## .evidence

- the referrer scope brief bounds the role at "route to the right care" — specialty, venue, clinician,
  preparation — and hands the given urgency across without re-judgement (`define.referrer-scope`).
- the role separation is explicit: diagnostician (what is wrong) → referrer (who to see, where) →
  prescriber (what treatment). `care` is the referrer's noun; `treatment` belongs to the prescriber.
