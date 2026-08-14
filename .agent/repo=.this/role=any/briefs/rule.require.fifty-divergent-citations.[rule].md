# rule.require.fifty-divergent-citations

## .what

research that grounds a **medical conclusion** — a differential, a ranked cause, a diagnosis, a
prevention plan, a supportive-care recommendation — must stand on **at least 50 good, divergent
citations**, each read through the **bhrowser**.

**divergent** is the operative word. the 50 must diverge across independent origins — not 50 posts
pulled from one pool. fifteen reddit threads from three subreddits is not 50 divergent citations;
it is one biased sample cited fifteen times.

this raises the floor set by `rule.require.seven-distinct-citations` (>= 7 for any research doc) to
a far higher bar for the subset of research a human may **act on medically**.

## .why

- a medical conclusion a human acts on demands breadth far past a 7-source floor — a wrong
  conclusion here can cost a life, not a lawsuit (`motto.not-medical-advice`)
- **clustered anecdote masquerades as breadth**: many cases drawn from one community share one
  selection bias, one attribution habit, one demographic. to count them as independent inflates
  confidence over a single failure mode
- 50 **divergent** sources triangulate a claim across independent failure modes — if a formal
  study, an official label, a professional reference, and several unrelated lived communities all
  converge, the signal survives the collapse of any one
- a high, hard bar defeats **fast research**: a doc that clears a low floor and stops is the exact
  defect this rule exists to catch (a differential rushed on ~19 sources is not enough)

## .the rule

| requirement | detail |
|-------------|--------|
| minimum count | **>= 50 distinct bhrowser-read sources** per medical-conclusion research set |
| divergent | spread across the divergence axes below — no single axis-bucket may dominate |
| bhrowser-read | each source counts only after the bhrowser returned real content (`rule.require.bhrowser-citations`) |
| verbatim | each source maps to a verbatim quote — no paraphrase-and-cite |
| discovery role | a search only discovers candidate urls; a snippet is never a citation |

## .the divergence axes — spread across, never cluster

the 50 must span, not pile into one bucket:

| axis | spread requirement |
|------|--------------------|
| **source type** | formal literature (PubMed/PMC), official labels (FDA/EMA/manufacturer), professional refs (VCA, vet orgs), lived/social — each type represented, none the sole basis |
| **community** | social sources drawn from **multiple distinct communities/platforms**, not one subreddit |
| **study group / author** | independent studies, not one research group's own series counted many times |
| **geography / population** | more than one region/population where the claim allows |

a set of 50 that is 45 threads from r/AskVet **fails divergence** even though it clears the count.

## .the divergence test

> if the single largest bucket (one community, one study group, one source type) were removed,
> would the conclusion still stand on the rest?

- yes → divergent enough
- no → the set is clustered; gather across the thin axes before the doc is done

## .relationship to the seven-distinct floor

| doc kind | bar |
|----------|-----|
| any research doc with factual claims | >= 7 distinct (`rule.require.seven-distinct-citations`) |
| research that grounds a medical conclusion a human may act on | **>= 50 divergent (this rule)** |

the higher bar governs the moment the research feeds a differential, diagnosis, or care plan.

## .enforcement

- medical-conclusion research with < 50 divergent bhrowser-read citations = **blocker**
- 50 citations that fail the divergence test (one bucket dominates) = **blocker**
- padded count (repeats, snippets, dead reads) = **blocker**
- any citation from WebFetch or WebSearch = **blocker**

### enforced via a deepseek l1 peer review

this rule is checked by a **level-1 peer reviewer brained on deepseek** in the gather stone's
guard — the reviewer tallies the distinct bhrowser-read sources, applies the divergence test, and
blocks if either the count (< 50) or the divergence (one bucket dominates) fails:

```
$rhachet run --repo bhrain --skill review --brain fireworks/deepseek/v4-flash --rules '.agent/repo=.this/role=any/briefs/rule.require.{fifty-divergent-citations,bhrowser-citations}.*.md' --paths '$route/2.2.2*.yield.md' --output '$route/.reviews/$stone.peer-review.citation-count.md'
```

## .exception

- pure navigation/rollup artifacts that make no independent medical claim (a glossary index, a
  catalogue) — they inherit citations from what they point to
- a non-medical research doc (process, infra) — the 7-distinct floor applies, not this bar

## .see also

- `rule.require.seven-distinct-citations.[rule].md` — the floor this raises
- `rule.require.bhrowser-citations.[rule].md` — the quality bar per citation
- `rule.require.source-inventory.[rule].md` — the trust/avoid split the axes draw on
- `motto.not-medical-advice.[motto].md` — why the medical bar is this high
