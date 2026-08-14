# domain.term.choice.reason: cause.mechanism

## .etymology

**mechanism** (with the `cause:` facet) names the mechanism-of-action — the pathway by which an
exposure inflicts harm. the `cause:` prefix marks its layer, since `mechanism` alone is
ambiguous between the pathway and the lesion it yields.

## .disputes

### dispute: culprit — raised 2026-08-08 — status: RESOLVED (reject `culprit`)
- raised.by  = owner
- claim      = a single "culprit" names the guilty cause
- counter    = "culprit" blurred two distinct nodes — the *pathway* (cause:mechanism) and the
               *lesion* (effect:mechanism). the link between them is many-to-many, so they must
               be separate terms. see `define.causal-chain`.
- resolution = reject `culprit`; split into `cause:mechanism` + `effect:mechanism`.

### note: etiology / pathogenesis
- these are near-synonyms from clinical literature; kept as forbidden synonyms so one canonical
  term (`cause:mechanism`) carries the concept in contracts.

## .evidence

- the many-to-many, process-vs-state split in `define.causal-chain`
