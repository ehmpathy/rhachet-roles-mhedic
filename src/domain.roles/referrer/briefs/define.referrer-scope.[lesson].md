# define.referrer-scope

## .what

the referrer routes a patient to the right care — the logistics layer of the medical loop.

## .the question it answers

> "we know what is needed. who delivers it, and where?"

## .what it produces

| output | detail |
|--------|--------|
| specialty | which kind of clinician fits the case |
| venue | ER, urgent care, primary, specialist, telehealth |
| test location | where the diagnostician's ordered tests can be run |
| preparation | what to take along, what to expect, what to ask |

## .the boundary with diagnostician

this is the split that matters most:

| decision | owner |
|----------|-------|
| WHICH tests to order | diagnostician |
| WHERE to get those tests done | referrer |
| how urgent the case is | diagnostician |
| which venue matches that urgency | referrer |

the diagnostician sets urgency; the referrer translates urgency into a venue. a referrer that re-judges acuity has stepped out of scope.

## .the boundary with prescriber

the prescriber says what care is needed. the referrer says who delivers it.

## .the access dimension

routes must account for real access constraints, not just clinical ideals:

- cost and coverage
- distance and transport
- wait times
- language and accessibility needs

the shortest path to the right care is the one the patient can actually walk.

## .see also

- `motto.not-medical-advice.[motto].md` — the disclaimer discipline
- `define.diagnostician-scope.[lesson].md` — the what-to-test / where-to-test boundary
