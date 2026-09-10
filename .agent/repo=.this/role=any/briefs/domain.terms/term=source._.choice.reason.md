# domain.term.choice.reason: source

## .etymology

**source** — old french *sourse*, "a spring, a place where water rises." the word carries **origin**:
the place a claim comes FROM. that is exactly the relation wanted — a claim flows from a source, and
you can walk back up it.

⇒ and the water metaphor carries the invariant too: **two channels off one spring are not two
springs.** that is the `publisher` distinction below, already latent in the word.

chosen over the rejected set for one reason each:

| rejected | why |
|---|---|
| `reference` | 🔴 **collides outright.** `.refs` is a declared field in every term cluster, and `ref.*` is an artifact kind in this repo. one word, three senses |
| `publication` | too narrow. a forum thread, an api response, and a product label are all sources; none is a publication in the ordinary sense |
| `site` | names a **web location**. one site hosts many sources — `msdmanuals.com` hosts two editions that behave differently, which is the whole measured case below |
| `page` | names **one document**. a source may span many pages, or be an api that has none |
| `link` | names the **pointer**, never the target. the same category error as `citation` |
| `citation` | 🔴 the **record that points at** a source. pointer and target may not share a word — an excerpt has one attribution, and the attribution and the source are different objects |
| `publisher` | 🔴 **not a synonym at all — a distinct concept.** see the dispute below |

## .disputes

### dispute: is `publisher` the same concept as `source`? — raised 2026-09-07 — status: RESOLVED (distinct)

- raised.by = a terms round that measured one publisher's two editions and got two different answers
- claim = they are the same. MSD is the source; *"professional edition"* is a detail of the same
  source, the way an edition number is a detail of a book
- counter = 🔴 **the measurement refutes it.** the professional edition yielded **8 quantities with
  primary citations**; the consumer edition of the same topic, same publisher, same day, yielded
  **none of the eight**. two objects that answer *"is a rate obtainable?"* differently are not one
  object
- 🔴 **and the counter-counter is real and must be kept**: for **independence**, they ARE one. one
  editorial board, one review process. to count both toward a divergence bar would inflate
  confidence over a single failure mode — which is verbatim the defect
  `rule.require.fifty-divergent-citations` exists to catch
- resolution = **two distinct concepts, and `source` is put to two questions.** a `publisher` holds
  one or many `source`s. count by **publisher** for independence; count by **source** for content.
  ⚠️ **stated rather than resolved away** — the ambiguity is real and a reader must be warned of it,
  which is what `rule.forbid.domain-term-ambiguity` (bhrain/learner) asks when a split is impractical

### dispute: should it be boundary-qualified? — raised 2026-09-07 — status: RESOLVED (keep it flat)

- raised.by = `rule.require.boundary-qualified-terms` (bhrain/learner)
- claim = *"source, of WHAT?"* answers `citation` — a source is what a citation draws from, and
  `citation` is already in use as the boundary of `citation.excerpt`
- counter = 🔴 **`citation` was itself undeclared** as a term, so `citation.source` would have named a
  boundary with no declaration behind it — which that same rule grades a blocker. and `census`,
  `coverage`, and `inventory` all sit flat, so a qualified `source` would be the odd one out
- 🔴 **the prerequisite has since been met, and it did not settle the way it was expected to.**
  `citation` is declared (`term=citation._.choice._.md`, 2026-09-08), so the blocker the counter
  rested on is gone — **and the answer is still flat**, for a reason the declaration exposed:
  a citation is a **record**; a source is an **authored body that exists whether or not any record
  points at it**. ⇒ *"source, of what?"* answers **"of a claim"**, never "of a citation" — the
  citation is what points AT the source, never what the source belongs to
- resolution = **flat.** ⚠️ the boundary a reader reaches for first is the one object in the
  neighbourhood that sits **downstream** of a source rather than above it

⇒ this closes the **fourth** of five boundary blocks recorded in three days. still open: `order`,
`intake` ×2, `artifact`. 🔴 **the boundaries are the backlog, and the leaf terms are not.**

## .evidence

### 🔴 the phantom attribution that provoked this cluster — 2026-09-07

`rule.require.source-tier-carries-the-quantity` shipped with a `.see also` line that read:

> *"`rule.require.fifty-divergent-citations` — divergence is across **publishers**; two editions of
> one publisher are one source"*

**that rule says no such thing.** its declared divergence axes are **source type · community · study
group/author · geography/population**. the words `publisher` and `edition` appear nowhere in it.

| what happened | the grade |
|---|---|
| a claim was invented | — |
| and credited to a source that does not hold it | 🔴 **the attribution defect**, verbatim per `rule.require.excerpt-carries-the-qualifier` |
| in a file authored the same round | 🔴 and the round's other results were *about* citation fidelity |

⇒ **the invented claim was CORRECT and the citation was FALSE**, which is the dangerous combination:
a reader who trusts the pointer finds a rule that does not say it, and a reader who trusts the claim
is right by luck. **verbatim is not fidelity, and neither is plausible.**

✅ **the repair went both ways**: the `.see also` now states what the rule actually declares, **and**
names the gap the rule genuinely has — no publisher axis, so the two MSD editions would count as two
sources toward the 50 while they corroborate each other not at all. **the correct claim was kept and
re-homed here, where it is owed.**

### the measured case behind the publisher split

| edition | prefix | quantities yielded |
|---|---|---|
| MSD **professional** | `/professional/…` | ✅ 8 distinct, each with a primary citation |
| MSD **consumer** | `/home/…` | 🔴 none of the eight |

⇒ one publisher, one condition, one day. **the only variable was the intended audience**, and it
changed what was obtainable completely.

## .invariants

- a source has **exactly one** author-body
- 🔴 **two sources under one publisher are not independent evidence** — collapse them in any
  divergence count
- ⚠️ **trusted is not sufficient.** a source may be authoritative and still structurally unable to
  answer the question asked of it ⇒ *"I read a trusted source and found no rate"* is not evidence
  that no rate exists

## .see also

- `term=citation.excerpt._.choice._.md` — the part-of-a-source, and the attribution/scope split
- `rule.require.excerpt-carries-the-qualifier` — the rule the phantom attribution above violated
- `rule.require.source-tier-carries-the-quantity` — what each kind of source can carry
- `rule.require.fifty-divergent-citations` — the count bar, and the publisher axis it lacks
