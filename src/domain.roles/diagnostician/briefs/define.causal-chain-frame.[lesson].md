# define.causal-chain-frame

## .what

the diagnostician's core reason-frame: a **four-node causal chain** that a case is traced
through, cause-side to effect-side.

```
cause:exposure ──▶ cause:mechanism ──▶ effect:mechanism ──▶ effect:symptom
```

the **ontology** (the four node terms + the many-to-many graph) is defined once, repo-wide, in
`define.causal-chain` (`repo=.this/role=any`). this brief formalizes it as a **diagnostic
instrument** — how the diagnostician wields it, and how it maps to the route stages.

> ⚠️ **not medical / veterinary advice — informational only.** a reason-frame; its output is
> signal for a licensed clinician, never a substitute for one.

## .the four nodes (recap)

| node | what it is | nature |
|------|-----------|--------|
| cause:exposure | the action / exposure taken — a lever | an event |
| cause:mechanism | *how* it harms — mechanism-of-action | a **process** |
| effect:mechanism | the lesion / pathological state | a **state** |
| effect:symptom | the observable sign | an observation |

## .the graph is many-to-many

the two `mechanism` nodes are different layers, cross-wired both ways:

```
cause:exposure ─┐   cause:mechanism ─┐   effect:mechanism ─┐   effect:symptom
  vaccine       ┼─▶  needle trauma   ┼─▶  myositis         ┼─▶  limp
  blood draw    ┼─▶  immune response ┼─▶  sterile abscess  ┼─▶  cannot hop >5in
  restraint     ┘   mechanical strain┘   nerve irritation  ┘   will not eat
```

- one cause:mechanism → many effect:mechanisms
- one effect:mechanism ← many cause:mechanisms

this cross-wire is the whole reason the diagnosis is a *search over a graph*, not a lookup.

## .how the frame maps to the route

each diagnostician stage owns one layer of the chain:

| stage | layer it works | direction |
|-------|----------------|-----------|
| `1.intake` | records the observed **effect:symptom** + the candidate **cause:exposures** | — |
| `2.1.differential.enumerate` | lists candidate **effect:mechanisms** (the lesions) | effect-side |
| `2.2.differential.disentangle` | attributes **cause:exposures** via forward/backtrack stats | cause-side |
| formal cross-check | validates **cause:mechanism → effect:mechanism** edges | the middle |
| `3.assay` | picks tests that separate the top **effect:mechanisms** | effect-side |
| `5.diagnosis` | names the most-likely path through all four nodes | full chain |

## .the two things you can act on

- the **cause:*** pair = *why it happened* → change it to **prevent** recurrence
- the **effect:*** pair = *what is wrong now* → treat it to **heal**

## .see also

- `define.causal-chain` (`repo=.this/role=any`) — the ontology + the four node terms
- `howto.apply-causal-chain-frame` — the step-by-step
- `whento.apply-causal-chain-frame` — the triggers
- `whyto.apply-causal-chain-frame` — why the split buys power
- `tactic.disentangle-exposure-causes` — the cause-side attribution method
- `inventory.of=examples.causal-chain` — worked examples of the many-to-many
