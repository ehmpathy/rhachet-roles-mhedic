# domain.term.choice.reason: alarm

## .etymology

"alarm" names the *condition that fires* — the smoke-alarm model: a sensor (the monitor) reads,
and at a threshold the alarm sounds. it cleanly separates the trip-condition from the observation
that feeds it and from the response it demands.

## .disputes

### dispute: warning / flag / trigger — raised 2026-08-10 — status: RESOLVED (keep `alarm`)
- raised.by  = owner
- claim      = these name "what tells you to act"
- counter    = "warning" is a soft notice with no defined threshold; "flag" and "trigger" are
               overloaded across code (a feature flag, an event trigger). alarm names a
               *thresholded* fire tied to an escalation tier, which the rule requires.
- resolution = keep `alarm`; record warning, flag, trigger, tripwire as forbidden synonyms.

## .evidence

- `rule.require.hazard-alerts` (alarm = threshold + escalation tier)
