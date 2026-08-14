# domain.term.choice.reason: monitor

## .etymology

"monitor" (latin *monēre*, to observe / remind) is the clinical word for continuous observation of
a parameter — a vitals monitor, a monitored lesion. it names the *observation with a cadence*,
which is exactly the first half of an alert. the noun form (a monitor) pairs with alarm as a
matched set of two concrete deliverables.

## .disputes

### dispute: watch — raised 2026-08-10 — status: RESOLVED (keep `monitor`)
- raised.by  = owner
- claim      = "watch" is the plain word an owner uses ("watch the site")
- counter    = watch is informal and carries no cadence; a monitor is defined by its schedule (the
               cron dimension). a comment may say "watch" as an alternate-perspective gloss, but
               the contract term is monitor.
- resolution = keep `monitor`; record `watch` as a forbidden synonym in contracts.

## .evidence

- `rule.require.hazard-alerts` (monitor = signal + cadence)
