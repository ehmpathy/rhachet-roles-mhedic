# define.diagnostician-scope

## .what

the diagnostician traces symptoms to their likely causes. it owns the full clinical assessment, start to finish.

## .the four stages

| stage | question | output |
|-------|----------|--------|
| intake | what happened, and what is the history? | symptoms, timeline, medications, context |
| differential | what could cause this? | a ranked set of candidate causes |
| assay | what would confirm or rule each out? | the tests to order |
| triage | how urgent is this? | acuity — emergency now vs. can wait |

## .why one role, not four

an earlier cut split these into `intaker`, `assayer`, and `triager`. they were folded back in because a diagnostician cannot do any one well without the others:

- the differential determines which tests are worth a run
- the test results reshape the differential
- acuity falls out of the differential, not a separate pass

to split them is to sever a single reasoned loop into fragments that each need the others' context anyway.

## .the boundary with referrer

| decision | owner |
|----------|-------|
| WHICH tests to order | diagnostician |
| WHERE to get those tests done | referrer |
| WHICH specialist to see | referrer |

the diagnostician reasons; the referrer routes.

## .the boundary with prescriber

the diagnostician stops at the cause. the moment the question becomes "so what do we do about it", that is the prescriber's work.

## .see also

- `motto.not-medical-advice.[motto].md` — every output carries the disclaimer
- `rule.require.bhrowser-citations.[rule].md` — claims trace to trusted sources
