# domain.term: excerpt

term.chosen   = excerpt
term.kind     = noun
term.boundary = citation
term.synonyms.forbidden:
- snippet
- extract
- span
- passage

## .what

the **portion of a source** an artifact quotes. it is a part-of relation: an excerpt is always
less than the whole post, page, or document it was taken from.

⇒ **an excerpt has two independent properties, and a defect in either misreports the source:**

| property | the question it answers | its failure |
|---|---|---|
| **attribution** | *which source did this come from?* | the excerpt is credited to a document that does not hold it |
| **scope** | *how much of that source did I take?* | the excerpt omits a clause that bounds or reverses it |

## .why the two must stay parted

they need **opposite** repairs. a wrong attribution is repaired by a **re-point**; a wrong scope is
repaired by a **re-read**. ⇒ to fuse them under one word sends a traveler to the wrong remedy.

## .refs

- `rule.require.excerpt-carries-the-qualifier.[rule].md` — the rule that governs **scope**
- `rule.require.bhrowser-citations.[rule].md` — the rule that governs **provenance**

## .reason

- `term=citation.excerpt._.choice.reason.md`

## .see also

- `term=citation._.choice._.md` — **the boundary this term hangs from**, declared 2026-09-08. an
  excerpt is one of a citation's three parts; the other two are `attribution` and `locator`
- `term=source._.choice._.md` — the whole this is a part of
