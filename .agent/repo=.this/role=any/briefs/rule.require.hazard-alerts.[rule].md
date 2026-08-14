# rule.require.hazard-alerts

## .what

for **any exposure** a patient undergoes — a treatment, a drug, a procedure, a vaccine, or a
notable experience — the analysis MUST produce two things:

1. **an itemized hazard list** — every adverse effect the exposure can cause, and
2. **an alert per hazard** — a **monitor** (what to observe, and how often) plus an **alarm** (the
   threshold that triggers escalation, and the escalation action).

delayed hazards MUST carry a **scheduled (cron) re-check**, not only an "if you notice X" trigger.

an exposure is not fully analyzed until every hazard it can cause has a monitor and an alarm.

## .why

exposures cause effects on a **timeline** (this is the causal-chain frame:
`define.causal-chain-frame`). some hazards are immediate (anaphylaxis, minutes), some are delayed
by days (systemic malaise), and some by **months to years** (injection-site sarcoma). a hazard
that is never itemized is never watched; a delayed hazard with no scheduled re-check is missed
precisely because everyone has moved on by the time it surfaces.

- **itemization** forces completeness — you cannot watch a hazard you never named.
- **monitors** turn a named hazard into an observable signal with a cadence.
- **alarms** turn an observation into a decision (watch / call / emergency) at a stated threshold.
- **cron re-checks** cover the delayed hazards that a one-time check would miss.

in a medical context the cost of a missed critical escalation is not a defect ticket — it is
harm. the bar is: **name it, watch it, and set the alarm that catches the escalation.**

## .the two deliverables, per exposure

### 1. the hazard itemization

for each hazard, record:

| field | what it is |
|-------|-----------|
| hazard | the adverse effect (an `effect:mechanism` / `effect:symptom`) |
| mechanism | *why* the exposure causes it (the `cause:mechanism`) |
| likelihood | rough rate / how common |
| onset window | when it can appear (minutes / hours / days / months–years) |

### 2. the alert (monitor + alarm)

for each hazard, establish:

| field | what it is |
|-------|-----------|
| monitor | the observable signal + the **cadence** to check it (once / daily / weekly / monthly) |
| alarm threshold | the specific value/pattern that trips the alarm |
| escalation | the action when tripped — one of the severity tiers below |

### the escalation tiers

| tier | what it is | example trigger |
|------|-----------|-----------------|
| 🔴 emergency — now | life-critical; act at once | collapse, labored breath, a swollen face |
| 🟠 soon — 24–72 h | needs a vet/clinician, not an ER | mild signs that overstay their window |
| 🟡 scheduled — weeks–months | a cron re-check on a delayed hazard | a lump watched on the "3-2-1" schedule |

## .the cron dimension

an alert is not only *"if you see X, act."* for delayed hazards it is also *"check at time T."*
every hazard with an onset window beyond a few days MUST get a scheduled re-check cadence, so the
watch does not lapse before the hazard can appear. a delayed hazard with no cron re-check is an
un-watched hazard.

## .how to apply

emit a table per exposure:

```
exposure: <what was done>
| hazard | mechanism | likelihood | onset | monitor (cadence) | alarm threshold | escalation |
|--------|-----------|------------|-------|-------------------|-----------------|------------|
| ...    | ...       | ...        | ...   | ...               | ...             | 🔴/🟠/🟡    |
```

worked instances of this rule (feline vaccine exposures):
- `../../../src/domain.roles/diagnostician/briefs/clade=feline/inventory.of=effects.for=feline.case=postvaccinal-reaction.md`
- `../../../src/domain.roles/diagnostician/briefs/clade=feline/howto.monitor-injection-site-sarcoma.[lesson].md`

## .enforcement

- an exposure analyzed with **no itemized hazard list** = blocker
- a hazard listed with **no monitor and alarm** = blocker
- a **delayed** hazard (onset beyond a few days) with **no scheduled cron re-check** = blocker
- an alarm with no stated escalation tier = blocker

## .see also

- `define.causal-chain-frame` — the exposure → mechanism → effect timeline this rule watches
- `rule.require.recommendation-disclaimer.[rule].md` — any alert that carries guidance carries the disclaimer
- `motto.not-medical-advice.[motto].md` — the escalation carve-out for emergency-shaped cases
- `rule.require.source-inventory.[rule].md` — the companion "itemize it" discipline for sources
