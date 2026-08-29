# domain.term: refer

term.chosen   = refer
term.kind     = verb
term.synonyms.forbidden:
- recommend (advice, not a handoff — a recommendation stops at words; a referral routes the patient)
- redirect (implies the first destination was wrong; a referral is a deliberate onward route)
- send (too generic; loses the clinical handoff sense)

## .what

to route a patient to the right care — the deliberate clinical handoff from one point of care to the
specialty / venue / clinician that fits the need. the referrer's canonical action; the verb in
`refer.care`. it does not diagnose or treat.

## .refs

- src/domain.roles/referrer/skills/refer.care.sh
- src/domain.roles/referrer/skills/refer.care/ (the route)
- src/domain.roles/referrer/briefs/define.referrer-scope.[lesson].md

## .reason

see the ref-level cluster beside this choice:
- `term=refer._.choice.reason.md` — etymology, the rejected `recommend`, evidence
