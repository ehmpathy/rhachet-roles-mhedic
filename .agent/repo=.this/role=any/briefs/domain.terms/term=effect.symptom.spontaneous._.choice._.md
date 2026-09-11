# domain.term: effect.symptom.spontaneous

term.chosen   = spontaneous
term.kind     = adj
term.boundary = effect.symptom
term.synonyms.forbidden:
- unprovoked
- volunteered
- reported
- passive

## .what

an `effect:symptom` that **occurs on its own**, with no act needed to produce it. pain, fever,
loose stool, appetite loss, a bleed.

paired with `provoked` (`term=effect.symptom.provoked`). every `effect:symptom` is one or the
other, and the pair is exhaustive.

## .why it is named rather than left as the default

there is a pull to name only `provoked` and treat spontaneous as the unmarked case. that pull
is the defect:

> **if only one value of an axis has a name, the axis is invisible, and a row never gets
> classified at all.**

⇒ an explicit `spontaneous` forces the question *"which is this?"* on **every** effect row.
that check is what surfaces a provoked symptom concealed among spontaneous ones — which is
exactly what a route misses when the axis has no name.

## .what it licenses

a spontaneous symptom is closeable by an **ask**. that is the whole practical payload: a gap on
a spontaneous symptom is a question the route can put to the owner right now, and it needs no
manoeuvre, no clinician, and no test.

⚠️ **`spontaneous` describes the symptom's ORIGIN, never its grade.** a spontaneous symptom may
be `owner-reported` (the owner says they have a fever) or `observed` (a clinician measures one).
the two axes are independent.

## .refs

- `.agent/repo=.this/role=any/briefs/define.causal-chain-frame.[lesson].md`
- ⚠️ **the origin route was a private case and was removed** (`rule.forbid.pii`). the axis was
  first applied at its intake stones — structure, then gaps

## .reason

see the ref-level cluster beside this choice:
- `term=effect.symptom.spontaneous._.choice.reason.md`
