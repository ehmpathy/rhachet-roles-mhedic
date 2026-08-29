# domain.term: care

term.chosen   = care
term.kind     = noun
term.synonyms.forbidden:
- treatment (narrower — treatment is the prescriber's act; care is the broader destination a referral routes to)
- service (generic business word, not the domain's)
- appointment (one instance of access to care, not care itself)

## .what

the health destination a patient is routed to — the specialty + venue + clinician a referral points at.
the referrer routes to the right **care**; it does not diagnose (the diagnostician's job) or treat (the
prescriber's). the noun in `refer.care`.

## .refs

- src/domain.roles/referrer/skills/refer.care.sh
- src/domain.roles/referrer/skills/refer.care/ (the route)
- src/domain.roles/referrer/briefs/define.referrer-scope.[lesson].md

## .reason

see the ref-level cluster beside this choice:
- `term=care._.choice.reason.md` — etymology, the rejected `treatment`, evidence
