# domain.term: source

term.chosen   = source
term.kind     = noun
term.synonyms.forbidden:
- reference (🔴 collides outright — `.refs` is a field in every term file, and a `ref.*` brief is an artifact kind)
- publication (too narrow; a forum thread and an api response are sources and neither is published)
- site (names a web location, not an authority — one site can host several sources)
- page (names one document; a source may span many, or none at all)
- link (names the pointer, never the target)
- citation (the RECORD that points at a source; the two are pointer and target — `term=citation._.choice._.md`)
- publisher (🔴 **a distinct concept, not a synonym** — see below. one publisher may hold several sources)

## .what

**the authored body a citation draws from** — the whole of which an `excerpt` is a part.

a source has an **author or author-body**, an **intended audience**, and a **stance toward evidence**
(does it publish rates, or adjectives?). those three are what make one source unable to substitute
for another.

## 🔴 .source vs publisher — the distinction the corpus needs and neither rule declares

> **one publisher may hold MANY sources. two sources from one publisher corroborate each other not
> at all.**

measured 2026-09-07: MSD Manuals publishes a **professional** edition and a **consumer** edition of
the same topic. same organization, same day, same condition. the professional edition yielded **8
quantities with primary citations**; the consumer edition yielded **none of the eight**.

| the question | are the two MSD editions one source, or two? |
|---|---|
| *which one publishes a rate?* | 🔴 **TWO** — they demonstrably differ, and that difference is the whole point of `rule.require.source-tier-carries-the-quantity` |
| *do they independently corroborate a claim?* | 🔴 **ONE** — one editorial board, one review process, one house position |

⚠️ **that is not a contradiction — it is one word put to two different questions**, and it must be
stated or a reader will hit it unaware (`rule.forbid.domain-term-ambiguity`, bhrain/learner).

⇒ **the rule: count sources by PUBLISHER when you count independence; count them by EDITION when you
ask what content is obtainable.**

## .the verdict axis a source carries

the `inventory.of=sources.case=<verdict>.*` convention files each appraised source under one of:

| verdict | sense |
|---|---|
| `trust` | cite it directly; its claims may carry a conclusion |
| `signal` | read it for presentation language and lay attributions, never for a rate |
| `avoid` | do not cite; the record says why |

## .refs

- `.agent/repo=.this/role=any/briefs/inventory/inventory.of=sources.case=*` — 20 appraised sources
- `rule.require.source-inventory` — the rule that requires each be appraised
- `rule.require.source-tier-carries-the-quantity` — what each kind of source can and cannot carry
- `ref.trusted-sources.medical.[ref].md`
- `rule.require.fifty-divergent-citations` — the count bar, and the publisher gap in it

## .invariants

- a source has **exactly one** author-body. two author-bodies means two sources
- an **excerpt** is strictly less than its source (`term=citation.excerpt`)
- 🔴 **two sources under one publisher are NOT independent evidence** — the divergence count must
  collapse them, even where their content differs
- ⚠️ **a source may be trustworthy and still unable to answer your question** — the tier rule's whole
  claim. ⇒ **trusted is not sufficient**, and that is the invariant this term exists to carry

## .reason

- `term=source._.choice.reason.md` — etymology, the `publisher` dispute, the measured evidence

## .see also

- `term=citation._.choice._.md` — the record that points here; the pointer to this target
- `term=citation.excerpt._.choice._.md` — the part; this is the whole
- `term=coverage._.choice._.md` · `term=census._.choice._.md` — a census's frame is a source
