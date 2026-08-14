# whyto.apply-causal-chain-frame

## .what

why the four-node split (`define.causal-chain-frame`) buys diagnostic power that a flat
"cause → symptom" model does not.

> ⚠️ **not medical / veterinary advice — informational only.**

## .the payoffs

### 1. it separates "which action" from "what damage"

`cause:exposure` (the lever) and `effect:mechanism` (the lesion) are different questions. a flat
model conflates them and you argue in circles. split, you can attribute the **action** even
before you know the **lesion** — and act on it.

### 2. it makes the search tractable — a graph, not a guess

the many-to-many wire (one pathway → many lesions, one lesion ← many pathways) means diagnosis is
a **search over a bipartite graph**. a name for each layer lets you prune each layer
independently, instead of a jump to a single story that you then anchor on.

### 3. it splits prevention from treatment cleanly

- the **cause:*** side answers *how do we stop a recurrence* → prevention
- the **effect:*** side answers *what do we fix now* → treatment

a defect ("routine action, disproportionate harm") is fundamentally a cause-side question; a
sick patient is an effect-side question. one frame serves both without confusion.

### 4. cause:mechanism vs effect:mechanism stops two failure modes

- collapse them (the rejected `culprit`) and you **lose the many-to-many** — you assume one
  pathway per lesion and miss alternates.
- keep them apart and the **formal cross-check has a precise job**: validate each
  cause:mechanism → effect:mechanism **edge** (known pathway? at what rate?), rather than a vague
  "is this plausible".

### 5. it fixes where evidence attaches

each node takes a different kind of evidence:
- cause:exposure → the disentangle stats (forward/backtrack)
- cause:mechanism → mechanism-of-action literature
- effect:mechanism → the assay / a hands-on exam
- effect:symptom → direct observation

so a claim can always be traced to the node it belongs to, and the weakest node is obvious.

## .the one-line why

> a flat cause→symptom model hides the two decisions that matter — *which lever* and *which
> lesion* — behind one word. the four-node frame surfaces both, and the many-to-many between them
> is where the real diagnostic search lives.

## .see also

- `define.causal-chain-frame` · `howto.apply-causal-chain-frame` · `whento.apply-causal-chain-frame`
- `define.causal-chain` (`repo=.this/role=any`) — the ontology + rejected `catalyst` / `culprit`
