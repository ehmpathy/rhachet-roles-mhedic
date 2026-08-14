# inventory.of=sources.case=signal.reddit-social

- **source**: Reddit (r/AskVet, r/cats, r/herbalism, r/SeniorCats, etc.) — public social forums
- **domain**: reddit.com / old.reddit.com
- **case**: **signal** — a distinct tier: **trusted for hazard-signal / lived-experience,
  avoid for ground-truth medical claims**
- **bhrowser retrieval**: ok (2026-08-08)

## .the two-axis verdict (why not just "avoid")

a source's trust is **not one number**. reddit splits across two axes:

| axis | verdict | reason |
|------|---------|--------|
| ground-truth for a **medical claim** (dose, safety, mechanism) | **avoid** | anonymous, unvetted; r/AskVet even auto-strips anecdote/dosing/diagnosis |
| **hazard signal** — what real owners actually hit | **trust (high value)** | it surfaces common, real-world failure modes early, in the wild, at volume |

dismissing reddit outright throws away the second axis. **crowd anecdote is a genuine early-warning
system**: it shows which hazards recur, which mistakes are easy to make, and which label warnings
bite in practice — often before the literature quantifies them.

## .why the hazard signal is worth harvesting

- **recurrence = real**: when many independent owners report the *same* worry (appetite loss,
  neuro signs, sub-5.5 lb dosing, NSAID/steroid overlap, dose errors, crushing tablets), that
  convergence is itself evidence of a common, reproducible hazard — even though each single post
  is just anecdote.
- **coverage the label lacks**: owners report *lived* practicalities (crushing tablets, "off-label
  >3 days," interactions with fluticasone/convenia/metacam) that a label states only abstractly.
- **cheap, early, high-volume**: the crowd reports faster and wider than a case series.

## .the discipline that keeps it honest

1. cite the **exact permalink + verbatim owner text + read date** via the bhrowser (the *post* is
   verifiable even when its *claim* is not).
2. never present an anecdote as medical fact — map each to the label warning it echoes, and mark
   unverified.
3. harvest **broadly** — one post is noise; the *distribution* of posts is the signal.
4. don't over-attribute — a bad outcome coinciding with the drug is not proof the drug caused it
   (e.g. a post-dental death may be disease, not the NSAID). say "temporally associated," not "caused."

## .worked example

`src/domain.roles/prescriber/briefs/inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.claims-social.md`
— 20+ distinct bhrowser-read reddit permalinks, each owner concern mapped onto a real FDA-label
warning; used as a hazard map, never a basis to act.

## .what to pair it with

confirm any actionable claim against tier-1 (`case=trust.fda-dailymed`) or peer review
(`case=trust.ncbi-pmc`). the crowd tells you *where to look*; the label/literature tells you *what
is true*.
