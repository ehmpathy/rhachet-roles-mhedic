# domain.term: citation

term.chosen   = citation
term.kind     = noun
term.synonyms.forbidden:
- reference (🔴 collides outright — `.refs` is a field in every term file, and `ref.*` is an artifact kind)
- link (names the locator alone; a citation that carries a url and no excerpt is incomplete)
- source (the TARGET, not the record — `term=source._.choice._.md`)
- quote (names the excerpt alone; a quote with no attribution is not a citation)
- attribution (one PART of a citation, not the whole)
- pointer (accurate and generic — it names the mechanism, never the evidentiary claim)

## .what

**the record an artifact keeps of where a claim came from.** a citation is the pointer; a `source`
is its target; an `excerpt` is the part of that target it carries.

⇒ a citation has **three parts, and each fails on its own:**

| part | the question it answers | its failure |
|---|---|---|
| **attribution** | *which source?* | the named source does not hold the claim |
| **locator** | *where, exactly?* | the url or path reaches no target |
| **excerpt** | *what did it say?* | the words are absent, paraphrased, or scoped wrong |

⚠️ **the three are independent.** a citation may be reachable and misattributed; it may be correctly
attributed and dead; it may be both and still drop the clause that reversed it.

## 🔴 .the boundary is NOT the web — an internal pointer is a citation

the corpus's rules all illustrate `citation` with an external source (`bhrowser-citations`,
`fifty-divergent-citations`, `seven-distinct-citations`). that made a repo path *look* like a
different kind of thing. **it is not.** enumerated 2026-09-08 across ~25 files:

| the pointer | is it a citation? |
|---|---|
| a claim + url + verbatim quote in an `inventory.of=sources` | ✅ the illustrated case |
| a `.refs` line in a term cluster, at a repo path | ✅ same three parts, same three failures |
| a `.see also` that names a peer brief | ✅ |
| a **parent claim** — *"per `rule.X`"* — that an argument rests on | ✅ **the highest-stakes row**: the argument fails if the premise was never written |
| a foreign artifact in a peer repo | ✅ — and it owes a marker (see invariants) |
| an api response quoted as evidence | ✅ |

⇒ **one word covers all six, because all six break the same three ways.** to hold `citation` to the
web half would leave the repo-path half unnamed — and that half is where the measured defects were.

## 🔴 .the three phantom classes

named across three rounds, 2026-09-06 → 2026-09-07. all three are citation defects, and they are
parted by **when** the fault entered:

| class | the fault | when it entered |
|---|---|---|
| phantom **claim** | the cited source does not say what it was cited for | at authorship — **wrong from the start** |
| unmarked **foreign** | the pointer is correct, and it targets a peer repo with no marker to say so | at authorship — right target, **wrong marking** |
| phantom **path** | the target no longer exists | 🔴 **after** authorship — the file was real when cited, then **rotted** |

⚠️ **the third is the one a review cannot catch by a re-read of the diff.** the other two are visible
in the words; a phantom path is visible only against the filesystem, at the moment you look.

⇒ **a path is a claim, and an unverified path is an unverified claim.**

## .refs

- `rule.require.bhrowser-citations.[rule].md` — governs the **locator**: how the target must be reached
- `rule.require.excerpt-carries-the-qualifier.[rule].md` — governs the **excerpt**'s scope
- `rule.require.peer-gate-on-cited-claims.[rule].md` — governs the **attribution**
- `rule.require.fifty-divergent-citations.[rule].md` · `rule.require.seven-distinct-citations.[rule].md` — the count bars
- `rule.require.cite-the-adjacency-not-the-item.[rule].md` — what an ORDERED citation additionally owes
- `howto.cite-via-bhrowser.[lesson].md`

## .invariants

- a citation has **exactly one** attribution (inherited from `term=citation.excerpt`)
- a citation to a **foreign** artifact must be marked foreign **in the same breath** — an unmarked
  foreign pointer carries a local pointer's full authority and cannot be told from a rotted one
- ⚠️ **a citation may be verbatim, well-attributed, and reachable, and still be wrong** — when its
  excerpt's scope drops a qualifier. ⇒ **reachable is not fidelity**
- 🔴 **a citation ROTS without any edit to it.** it is the only field in a term cluster whose truth
  value changes while the file sits untouched. ⇒ **age is evidence against a citation**, and a
  citation's read-date is therefore part of the record, not decoration

## .reason

- `term=citation._.choice.reason.md` — etymology, the boundary dispute, the measured evidence

## .see also

- `term=citation.excerpt._.choice._.md` — the part a citation carries
- `term=source._.choice._.md` — the target a citation points at
- `term=inventory._.choice._.md` — the artifact kind that holds appraised sources
