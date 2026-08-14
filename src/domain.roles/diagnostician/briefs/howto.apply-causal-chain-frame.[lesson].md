# howto.apply-causal-chain-frame

## .what

the step-by-step to trace a case through the four-node causal chain (`define.causal-chain-frame`).

> ⚠️ **not medical / veterinary advice — informational only.**

## .the moves

### 1. anchor the observed end — effect:symptom

write down what is actually seen, with a duration bar. this is the fixed point all else is
traced back from.
> miki: limps, cannot hop >5in (a new post-visit deficit), hides, will not eat — 2+ days.

### 2. list the levers — cause:exposures

enumerate every action taken that could be a lever, **neutral about harm**.
> miki: vaccines, blood draw, restraint, distress-scream (proxy).

### 3. enumerate the lesions — effect:mechanisms

for the symptom, list candidate pathological states that could produce it.
> limp ← myositis, sterile abscess, nerve irritation, joint strain, bruise/hematoma.

### 4. draw the middle edges — cause:mechanism links

for each lever, name the pathway(s) by which it could reach each lesion. this is where the
**many-to-many** shows up — one lever fans out to several pathways, one lesion is fed by several.
> vaccine → (needle trauma | immune adjuvant response) → myositis
> blood draw → (needle trauma | bruise) → hematoma / nerve irritation

### 5. attribute the levers — run disentangle (both directions)

use `tactic.disentangle-exposure-causes`:
- **forward** P(symptom | exposure alone) — the risk of each lever
- **backtrack** P(exposure | symptom) — which lever is most implicated among the afflicted
seek "X alone" cohorts to break the confound when levers fired together.

### 6. validate the edges — formal cross-check

confirm the cause:mechanism → effect:mechanism edges against trusted sources (is there a known
pathway from this exposure to this lesion, at what incidence / duration?).

### 7. name the path — the diagnosis

pick the single most-likely **full path** through all four nodes, with confidence and the
open questions. treatment is the prescriber's; the route is the referrer's.

## .the shape of a traced case

```
effect:symptom   ← anchor
   ▲
effect:mechanism ← enumerate candidates
   ▲ (edges, formal cross-check)
cause:mechanism  ← pathways
   ▲
cause:exposure   ← attribute via disentangle (both directions)
```

## .see also

- `define.causal-chain-frame` — the frame this applies
- `whento.apply-causal-chain-frame` · `whyto.apply-causal-chain-frame`
- `tactic.disentangle-exposure-causes` — step 5 in full
- `inventory.of=examples.causal-chain` — worked examples
