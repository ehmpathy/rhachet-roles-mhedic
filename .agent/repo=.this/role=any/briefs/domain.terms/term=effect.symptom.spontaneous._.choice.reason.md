# domain.term.choice.reason: effect.symptom.spontaneous

## .etymology

**spontaneous** = arises of itself, with no external act. the ordinary english sense, and the
sense the clinical literature already uses (*"spontaneous pain"*, *"spontaneous remission"*),
so it needs no gloss for either audience.

chosen over the rejected set for one reason each:

| rejected | why |
|---|---|
| `unprovoked` | ⚠️ defines the concept as the **negation** of its pair. an axis whose values are `X` and `not-X` cannot be walked — a reader cannot tell whether `not-X` was checked or merely left unset |
| `volunteered` | describes **how the datum reached us** (the owner offered it), not how the symptom arose. that is the reporter axis, not the origin axis — a different concept, already covered by the grades |
| `reported` | 🔴 overloaded outright. `owner-reported` is an extant **grade**. to reuse `reported` for an origin would collide two axes on one word — `rule.forbid.domain-term-ambiguity` |
| `passive` | implies the *patient* is passive. a patient can be very active and still have a spontaneous symptom. the adjective attaches to the symptom, not the person |

## .disputes

### dispute: leave it unnamed — raised 2026-09-05 — status: RESOLVED (name it)

- raised.by  = the route itself, mid-drive
- claim      = only `provoked` needs a name. spontaneous is the great majority case, so it is
               the natural default — an unmarked value costs a term and buys little, per
               `ref.reviewer.dont-bikeshed-terms`
- counter    = 🔴 **an axis with one named value is not an axis, it is a flag** — and a flag is
               only ever set on the rows someone remembered to look at. the whole payload of
               this distinction is that it forces a per-row question, and an unmarked default
               lets a row pass unclassified. that is not hypothetical: the case below carried
               ten candidate effects with the axis unnamed, and **two were misclassified by
               omission**
- resolution = name both values. the pair is exhaustive, so every row must carry one, and a
               blank cell becomes a visible defect rather than an invisible default

## .evidence

### the measured cost of the unnamed default — 2026-09-05

⚠️ **origin route removed** (`rule.forbid.pii`); the measurement transfers.

an intake structure stone held a **candidate effect** table of ten rows with no origin column. two
of the ten are provoked, and both sat unmarked among the spontaneous ones:

| row | actual origin | filed as |
|---|---|---|
| rebound tenderness | 🔴 **provoked** — press and release | an ordinary unasked question |
| dehydration signs | ⚠️ **mixed** — skin turgor and capillary refill are provoked | an ordinary unasked question |

⇒ the misclassification was **silent**. a table with no origin column looks complete, so the
error had no surface. it survived a self-review that had *just* split the same axis on the
captured effects one table over.

### why the misclassification is not cosmetic

it changes what the downstream gap list may promise:

> `rebound tenderness: UNCAPTURED` in an unclassified table reads as **an unasked question**.
> it is not. it is an **unperformed manoeuvre**, and no question can close it.

a gap list that inherits the unmarked table claims a reach it does not have — it files a
peritoneal discriminator among things a text message could supply.

### the correction the pair enables

once both values are named, the column is mandatory, and the classification becomes auditable
per row. in the case above that produced a three-tier gap list (**ask / act / test**) in place
of the stone's two, and surfaced the middle tier — a manoeuvre the **owner** can perform on
themselves — which neither of the two original tags could express.

⇒ and that middle tier was not theoretical: the owner had **already performed one unprompted**,
and it produced two of the four effects the case holds.

## .see also

- `term=effect.symptom.provoked._.choice._.md` — the pair
- `term=effect.symptom._.choice._.md` — the parent node
- `rule.forbid.domain-term-ambiguity` (learner) — why `reported` was rejected
- `rule.prefer.symmetric-term-pairs` (ergonomist) — the pair-shape argument
- `rule.require.dimensional-decomposition` (behaver) — why an axis must be walked, not sampled
