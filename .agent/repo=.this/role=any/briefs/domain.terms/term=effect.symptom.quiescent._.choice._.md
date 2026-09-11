# domain.term: effect.symptom.quiescent

term.chosen   = quiescent
term.kind     = adj
term.boundary = effect.symptom
term.synonyms.forbidden:
- lull
- interval
- remission
- abated
- settled

## .what

an `effect:symptom` that has **stopped, while the process that caused it continues.** the stop is a
**phase of the scenario**, never its end.

paired with **`resolved`** — a symptom that stopped because the process ended. every symptom-stop is
one or the other, and the pair is exhaustive.

🔴 **the two are indistinguishable at the moment of the stop.** that is the whole reason the axis
earns a term: a `quiescent` and a `resolved` symptom present identically — *"it went away"* — and
only a later assay, or a later course, separates them.

## .why the distinction earns a term

**because the stop of a symptom reads as the elimination of a scenario, and it is not one.**

`rule.require.superposition-until-elimination` states that only *"an assay that distinguishes the
scenario out"* removes it, and names three things that do not: low probability · absence of a
positive result · a clean front-runner. ⇒ **symptom abatement is a fourth, and the rule did not name
it** — so it is the one that slips.

| the mechanism | why the symptom stops |
|---|---|
| **perforation** | the distended organ decompresses ⇒ 🔴 pain stops *because it got worse* |
| **torsion** | it untwists ⇒ full relief, and it can twist again |
| **infarction** | the wall's nerves stop their report |
| **an episodic bleed** | the episode ends; the lesion remains |

⇒ in each, **complete relief is the disease's own next chapter.**

## .the trap it names

a `quiescent` symptom is more dangerous than a persistent one, because it **buys agreement**. the
owner stops worry, the clinician is not called, and the interval is spent. ⇒ *"it went away"* is an
argument the reader is inclined to accept, so it must be a datum that **carries its own doubt.**

## .how a stop is graded

| the evidence | the grade |
|---|---|
| an assay eliminated the scenario | ✅ `resolved` |
| the whole clinical picture normalized, and stayed normal across the scenario's own clock | ✅ `resolved`, provisionally |
| the symptom stopped and no assay ran | 🔴 **`unknown` — never `resolved`** |
| it stopped **suddenly and completely** after a severe peak | 🔴🔴 **presume `quiescent`** until an assay says otherwise |

⚠️ **`unknown` is the default, and it is not the same as `quiescent`.** to grade every stop
`quiescent` would make the term a scold; to grade a stop `resolved` with no assay is the defect.

## .refs

- `rule.require.superposition-until-elimination.[rule].md` — the rule this axis protects
- `term=effect.symptom.provoked._.choice._.md` — the peer axis (origin), same boundary
- ⚠️ **the origin route was a private case and was removed** (`rule.forbid.pii`). the four
  mechanisms above are literature-sourced and stand on their own

## .reason

- `term=effect.symptom.quiescent._.choice.reason.md`
