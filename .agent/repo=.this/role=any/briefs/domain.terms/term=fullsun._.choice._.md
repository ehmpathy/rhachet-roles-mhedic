# domain.term: fullsun

term.chosen   = fullsun
term.kind     = noun · adj · verb (one concept, three inflections — see below)
term.glyph    = ☀️
term.synonyms.forbidden:
- public (names the AUDIENCE, not the value claim. an obscure brief may sit in a public repo, held by a trigger)
- open / open-source (names a LICENSE. a license grants permission; fullsun asserts that daylight is the value)
- publishable (names the PERMISSION. fullsun is the stronger claim — not merely "allowed out", but "worth more out")
- safe (🔴 the OUTCOME of the triage, not the posture — and in a medical repo it collides with clinical safety)
- cleared (names the APPROVAL, never the reason. same error `prune` makes against `removed`)
- daylight / sunlight (the metaphor's raw material, not the term)

⚠️ **`share` is NOT forbidden — it is the declared verdict alias.** see below.

## .what

**the posture of a knowledge artifact whose value IS its daylight** — the artifact loses no value by
exposure, and gains (goodwill, thought-leadership, defensibility) by it.

fullsun is the least restrictive of a **three-step light gradient**, and the trio is one scale:

| posture | value that is… | if it leaks |
|---|---|---|
| ☀️ **fullsun** | **right / defensible** — value *is* daylight | no loss. sunlight was the point |
| 🕶️ **obscure** | **first / rare / uncopied** | competitive loss — **reversible**, out-execute it |
| 🔒 **protect** | **a right you hold** | **irreversible**. a waiver does not return |

## 🔴 .`share` is the ALIAS, and `fullsun` is the canonical word

> **one decision, two lenses.** the **verdict** names the action (share / scrub / prune); the
> **posture** names the rationale (fullsun / obscure / protect). they map one-to-one.

`rule.require.publishability-triage` declares the posture canonical and the verdict its alias, and
its `.reporting` section mandates the posture **lead** every report, with its glyph.

⇒ so `share` is a **legitimate co-term**, never a drift. a forbid-list that banned it would break the
rule that coined it. ⚠️ what IS a defect is a report that gives the **verdict alone** — the severity
signal rides on the posture.

- 👍 `☀️ fullsun (share) — 35 briefs cleared for daylight`
- 👎 `share: 35 briefs`

## .the three inflections — one concept, not three

| inflection | example | sense |
|---|---|---|
| **noun** | *"the fullsun set"* | the collection that carries the posture |
| **adj** | *"a fullsun brief"* | one artifact that carries it |
| **verb** | *"fullsun the facts, never the tactics"* · *"what could be fullsunned?"* | **the act of a move INTO the set** |

⚠️ **this is inflection, not overload** — one concept in three grammatical roles, which
`rule.forbid.domain-term-ambiguity` (bhrain/learner) permits. the test it must pass: every use answers
*"whose value is daylight?"*, and all three do.

🔴 **the verb sense carries a duty the rules do not yet state** — see `.reason`, the open dispute.

## .refs

- `rule.require.publishability-triage.[rule].md` — the trio, the four tests, the two-phase workflow (33 lines)
- `rule.require.fullsun-facts-not-tactics.[rule].md` — WHAT may be fullsunned: facts, never decisions
- `howto.redact-obscure-to-medical-facts.[lesson].md` — the obscure → fullsun transform (8 lines)
- `rule.require.accrue-research.[rule].md` (7) · `rule.forbid.aggregation-index-build-narrative.[rule].md` (5)
- `rule.forbid.pii.[rule].md` — carries a `## .publishability` tag, as every brief must

## .invariants

- 🔴 **a tag is a HYPOTHESIS, never a verdict.** a fullsun claim holds only after a **blind red-team**
  fails to recover any protect or obscure item from the set. an author's own read is phase 1 of two
- 🔴 **fullsun is a property of a SET, not only of a brief.** the voice test fires across the corpus:
  every brief may pass alone while the set still reconstructs the design. ⇒ **a per-file audit cannot
  establish a fullsun verdict**
- **fullsun is a destination, never only a start.** an obscure artifact carries a **graduation
  trigger** — obscurity is a delay, not a right, and an untriggered hold forfeits the upside
- **under doubt, take the more restrictive posture.** a false protect costs a re-review; a false
  fullsun costs a leak
- ⚠️ **a fullsun artifact still owes its other duties** — the disclaimer, the citations, the PII
  scrub. ⇒ **fullsun is a verdict about VALUE, never a waiver of hygiene**

## .reason

- `term=fullsun._.choice.reason.md` — the horticultural etymology, the gradient it makes coherent,
  the open dispute about the verb's duty

## .see also

- `term=obscure._.choice._.md` — the middle rung; the reversible one, and the only one with a trigger
- `term=protect._.choice._.md` — the top rung; the irreversible one
- `term=hazard._.choice._.md` — one of the fact kinds that IS fullsun
- `term=citation._.choice._.md` — what a fullsun claim must carry to stand on its own
- `term=source._.choice._.md` — a fullsun brief cites a public source, so a reader can re-check it

## .publishability

☀️ **fullsun** (share) — a glossary entry for a generic publication-hygiene posture. it carries no
subject identity and no client-specific mechanic; the term is itself the tool by which leaks are
caught.
