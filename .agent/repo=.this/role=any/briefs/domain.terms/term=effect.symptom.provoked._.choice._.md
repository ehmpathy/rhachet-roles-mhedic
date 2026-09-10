# domain.term: effect.symptom.provoked

term.chosen   = provoked
term.kind     = adj
term.boundary = effect.symptom
term.synonyms.forbidden:
- elicited
- induced
- examined
- maneuver-positive

## .what

an `effect:symptom` that **does not occur on its own** — it appears only in response to an act
someone performs. a press, a release, a cough, a heel-drop, a leg raise.

⇒ so a provoked symptom **always implies a `cause:exposure`**: the act that produced it. a
provoked symptom itemized with no exposure has deleted half of its own causal chain.

paired with `spontaneous` (`term=effect.symptom.spontaneous`). every `effect:symptom` is one or
the other, and the pair is exhaustive.

## .why the distinction earns a term

it changes **how the gap closes**, which changes what a gap list may promise:

| | closed by |
|---|---|
| a **spontaneous** symptom | an **ask**. the owner reports it |
| a **provoked** symptom | an **act**. someone must perform the manoeuvre |

⇒ `UNCAPTURED` on a provoked symptom is **not an unasked question** — it is an unperformed
manoeuvre. a route that conflates the two files an examination result among the things a text
message could supply.

## .the second axis — who provokes it

a provoked symptom is **not** automatically `observed`. the grade tracks *who reported it*,
never *what kind of act it was*:

| the provoker | the grade |
|---|---|
| the owner, on themselves | `owner-reported` — crude, never definitive |
| a clinician | `observed` |

⚠️ **the owner-provoked case is the one a route forgets.** it is neither an ask nor a clinic
visit, so it falls between the two obvious tiers and gets deferred — even where the owner could
produce a partial answer immediately.

## .refs

- `.agent/repo=.this/role=any/briefs/define.causal-chain-frame.[lesson].md`
- ⚠️ **the origin route was a private case and was removed** (`rule.forbid.pii`). the axis was
  first applied at its intake stones — structure, then gaps

## .reason

see the ref-level cluster beside this choice:
- `term=effect.symptom.provoked._.choice.reason.md`
