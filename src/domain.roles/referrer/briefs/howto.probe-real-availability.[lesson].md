# howto.probe-real-availability

## .what

the repeatable method to turn a clinician shortlist into a **walkable** one: probe each
option for a **real availability signal** — an actual next-open slot or a stated turnaround —
rather than a guessed wait time. this is the bhrowser method that feeds `4.1.access.rank`.

## .why

a referral that lists clinicians without availability is half a referral. the human's whole
problem is often the wait (the six-month book), so the access rank is only honest if the wait
figure is **observed**, not guessed. this method is how the referrer earns the wait column.

## .the ladder of availability signals

probe in this order; take the strongest signal each option offers.

| rung | signal | where to read it | strength |
|------|--------|------------------|----------|
| 1 | a real bookable slot | a platform that shows live times (e.g. Zocdoc) | strongest — an actual date |
| 2 | a practice self-schedule page | the clinic's own "book now" / patient-portal scheduler | strong — often shows next-open |
| 3 | a stated turnaround | a telederm platform's "diagnosis in 24–48h" claim | strong for the virtual path |
| 4 | an indirect signal | a review that says "got in quickly as a new patient" | weak — corroboration only |
| 5 | phone-only | no online signal at all; only a call confirms | the result itself (see below) |

## .the absence-of-a-scheduler result

if rungs 1–3 all come up empty for the in-person options — no live slots, no online
scheduler — that is **not a dead end, it is the answer**: local in-person access is
phone-gated, so the human cannot see or compare waits online and must call each office. report
that plainly. it is the concrete shape of the "six-month wait" complaint, and it makes the
telederm turnaround (a rung-3 signal that IS observable) the honest fast path.

## .the two-path split this always surfaces

- **in-person**: usually rung 4–5 (phone-gated). the wait is real and often long; you give the
  human the numbers to call and the method to re-check.
- **telederm**: usually rung 3 (a published turnaround, often 24–48h, no appointment). this is
  the observable-availability path, and many telederm services will also **expedite an in-person
  referral** if the virtual read warrants it.

carry the given urgency as the floor: a melanoma-flagged lesion never rides a slow in-person
wait when a same-week telederm read plus expedite is open.

## .the method, step by step

```
1. for each in-person option, try a live-slot platform (Zocdoc et al.) for the metro
   - a real slot → record the date (rung 1)
   - "no results" → record phone-gated (rung 5), a real result
2. open each clinic's own site; look for a self-schedule page (rung 2)
3. for each telederm option, read its stated turnaround verbatim (rung 3)
4. scan reviews for an access hint only as corroboration (rung 4)
5. hand 4.1.access.rank a wait figure or a phone-gated flag for every option — never a guess
```

## .the disclaimer + freshness caveat

availability is the most perishable fact in a referral. a slot open today is gone tomorrow.
so this method hands back **the signal AND the way to re-check it** (the teach-to-search
discipline): the human re-runs the probe, they do not trust a frozen list. and every referral
carries the not-medical-advice disclaimer.

## .see also

- `define.referrer-scope.[lesson].md` — the access dimension this method serves
- `rule.require.availability-probe.[rule].md` — the rule that mandates this method in access.rank
- `rule.require.bhrowser-citations.[rule].md` — availability signals are read via the bhrowser
- `4.1.access.rank.stone` — the stone this method feeds
