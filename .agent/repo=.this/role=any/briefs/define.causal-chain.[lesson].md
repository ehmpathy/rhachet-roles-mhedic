# define.causal-chain

## .what

the canonical ontology for how a cause leads to a symptom in this repo. a diagnosis is a path
through a **four-node causal chain**, cause-side to effect-side:

```
cause:exposure ──▶ cause:mechanism ──▶ effect:mechanism ──▶ effect:symptom
```

## .the four nodes

| node | what it is | nature | miki example |
|------|-----------|--------|--------------|
| **cause:exposure** | the action / exposure taken — a lever you can pull or withhold | an event | vaccine injected into the thigh |
| **cause:mechanism** | *how* the exposure does harm — the mechanism-of-action / etiology | a **process / pathway** | needle trauma + immune response acts on the muscle |
| **effect:mechanism** | the pathological state that follows — the pathophysiology / lesion | a **state / lesion** | localized myositis (inflamed hind-limb tissue) |
| **effect:symptom** | the observable sign | an observation | limps, cannot hop >5in, hides, will not eat |

## .the chain is many-to-many, not linear

the two `mechanism` nodes share a word but sit at different layers, and the edges between every
layer are **many-to-many**:

- one **cause:exposure** can act through several **cause:mechanisms** (a needle both traumatizes
  tissue *and* introduces an immune adjuvant)
- one **cause:mechanism** can produce several **effect:mechanisms** (needle trauma → myositis *or*
  a sterile abscess *or* nerve irritation)
- one **effect:mechanism** can arise from several **cause:mechanisms** (myositis from the trauma
  *or* from the immune response)
- one **effect:mechanism** can present as several **effect:symptoms** (myositis → a limp *and*
  inappetence)

```
cause:exposure ─┐   cause:mechanism ─┐   effect:mechanism ─┐   effect:symptom
  vaccine       ┼─▶  needle trauma   ┼─▶  myositis         ┼─▶  limp
  blood draw    ┼─▶  immune response ┼─▶  sterile abscess  ┼─▶  cannot hop >5in
  restraint     ┘   mechanical strain┘   nerve irritation  ┘   will not eat
```

so `cause:mechanism` ≠ `effect:mechanism`: the first is a **process** (verb-like, "how it
harms"), the second is a **state** (noun-like, "what is now wrong"). many pathways, many lesions,
cross-wired.

## .why the split matters

- **cause-side vs. effect-side** cleanly separates the two things you can act on:
  - the `cause:*` pair is *why it happened* → what you change to **prevent** recurrence
  - the `effect:*` pair is *what is wrong now* → what you treat to **heal**
- **the layers map to the route stages** (diagnostician):
  - `2.1.differential.enumerate` → candidate **effect:mechanisms** (the lesions)
  - `2.2.differential.disentangle` → attributes **cause:exposures** (the levers, via stats)
  - the formal cross-check → validates **cause:mechanism → effect:mechanism** edges (known pathway?)
  - **effect:symptom** → the observed match-target

## .the terms

each node is a domain term, itemized in `domain.terms/`:
- `term=cause.exposure._.choice._.md`
- `term=cause.mechanism._.choice._.md`
- `term=effect.mechanism._.choice._.md`
- `term=effect.symptom._.choice._.md`

`catalyst` and `culprit` are **rejected** — `catalyst` for its wrong "accelerant, not consumed"
connotation, `culprit` because it blurred the two mechanism nodes into one word.

## .see also

- `tactic.disentangle-exposure-causes` (diagnostician) — how exposures are attributed
- `define.diagnostician-scope` (diagnostician) — the route stages this ontology feeds
- `domain.terms/` — the four node terms
