# domain.term.choice.reason: effect.mechanism

## .etymology

**mechanism** (with the `effect:` facet) names the pathophysiology — the lesion / state that a
cause:mechanism produces. the `effect:` prefix marks its layer, distinct from the pathway that
caused it.

## .disputes

### dispute: culprit — raised 2026-08-08 — status: RESOLVED (reject `culprit`)
- raised.by  = owner
- claim      = "culprit" names the guilty pathology
- counter    = `culprit` collapsed the pathway and the lesion into one word; the two form a
               many-to-many graph and need separate terms. see `term=cause.mechanism.choice.reason`.
- resolution = reject `culprit`; this node is `effect:mechanism`.

### note: pathophysiology / lesion / pathology
- clinical near-synonyms; kept as forbidden synonyms so one canonical term carries the concept.

## .evidence

- the process-vs-state distinction and many-to-many edges in `define.causal-chain`
