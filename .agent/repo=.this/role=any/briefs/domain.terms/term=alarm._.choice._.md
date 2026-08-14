# domain.term: alarm

term.chosen   = alarm
term.kind     = noun
term.synonyms.forbidden:
- warning
- flag
- tripwire
- trigger

## .what

the threshold condition that, when a monitor's observation crosses it, fires and demands an
escalation. the second half of an alert. distinct from the monitor (the observation) and from the
escalation (the action). see `rule.require.hazard-alerts`.

## .refs

- `.agent/repo=.this/role=any/briefs/rule.require.hazard-alerts.[rule].md`

## .reason

see the ref-level cluster beside this choice:
- `term=alarm._.choice.reason.md` — etymology, the rejected `warning`/`flag`, evidence
