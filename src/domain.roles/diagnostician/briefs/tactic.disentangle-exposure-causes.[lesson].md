# tactic.disentangle-exposure-causes

## .what

a reusable diagnostician method to **disambiguate a root cause** by attribution of the
**exposure** — the raw action/exposure that could have led to harm — separately from the
**effect:mechanism** — the pathology that actually resulted. it deconfounds tangled actions via
evidence gathered in two directions and ranked by stats.

> ⚠️ **not veterinary / medical advice — informational only.** this is a research method; its
> output is signal for a licensed clinician, never a substitute for one.

## .exposure vs. effect:mechanism

| type | definition | example (a cat lame after a vet visit) |
|------|-----------|----------------------------------------|
| **exposure cause** | the action / exposure taken — a lever you can pull or withhold | vaccine, blood draw, restraint, a distress event |
| **effect:mechanism** | the pathology that results and hurts | injection-site reaction, hematoma, nerve pinch, strain |

why split them: you can act on a **exposure** (change technique, space out actions) to prevent
recurrence **even before** the exact effect:mechanism is known. attribution of the exposure is
often the first actionable win.

## .the confound problem

when several exposures fire at once (a visit stacks vaccine + draw + restraint), a single case
**cannot** tell you which one drove the effect — they are tangled. the deconfound needs cases
from the wild where the exposures occur **apart**.

## .the two directions

distinct quantities (bayes — they do not equal each other); gather **both**:

| direction | quantity | reads as | tells you |
|-----------|----------|----------|-----------|
| **forward** (exposure → effect) | P(effect \| exposure) | "of N cats who had X **alone**, Y showed the effect" | the **risk** of each action |
| **backtrack** (effect → exposure) | P(exposure \| effect) | "of N cats with the effect, Y had had X" | which action is most **implicated** |

forward finds the risky action; backtrack finds the common implicated exposure among the
afflicted. together they triangulate.

## .the deconfound move

seek the **"X alone" cohorts** — cases where one exposure occurred without the others
(blood-draw-without-vaccine, vaccine-without-restraint-distress). those isolate a exposure's
independent contribution.

## .the steps

1. **name the exposure set** — the raw actions taken (the levers).
2. **define the effect** — the observed symptom, with a duration bar.
3. **forward gather** — via the bhrowser (`rule.require.bhrowser-citations`), find experiences per
   exposure, **read the comments** (`rule.require.read-social-comments`); favor "X alone" cohorts.
4. **backtrack gather** — search the effect directly; record which exposures each case carried.
5. **itemize** — one row per case, tagged by each exposure + the effect flag, url + verbatim
   snippet; every social claim is **signal, not fact**.
6. **contingency stats** — per exposure, both directions, with counts + n; note sample size +
   selection bias; association is not causation.
7. **formal cross-check** — trusted-source incidence/duration for each exposure's known harm.
8. **attribute + feed back** — rank exposures by combined weight; use it to re-rank the
   effect:mechanism candidates.

## .the output shape

```
exposure   | forward P(effect | X alone) | backtrack P(X | effect) | n | note
-----------|-----------------------------|-------------------------|---|-----
vaccine    |            .                |            .            | . |
blood draw |            .                |            .            | . |
restraint  |            .                |            .            | . |
distress   |            .                |            .            | . | proxy, not a mechanism
```

## .caveats

- a **distress proxy** (a scream) is a marker, not an injury mechanism — never rank it as a
  direct exposure of harm.
- social data is skewed to problems; the forward risk it implies is an **upper bound**, not a
  base rate.
- correlation across exposures is not causation; the output is a ranked hypothesis, handed to a
  clinician + the assay stage.

## .see also

- `define.diagnostician-scope.[lesson].md` — where this sits in the differential
- `rule.require.bhrowser-citations.[rule].md` · `rule.require.read-social-comments.[rule].md`
- `rule.require.prescription-inventory.[rule].md` — the itemization spirit the inventory follows
