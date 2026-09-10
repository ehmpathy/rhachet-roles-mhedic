# domain.term.choice.reason: citation

## .etymology

**citation** — latin *citare*, "to summon, to call forth"; a legal *citation* is the summons that
calls a witness before the court. that is exactly the posture wanted: **a citation summons a source
to testify for a claim**, and the court may find the witness absent, mistaken, or misquoted.

⇒ the word therefore carries its own failure modes. `link` and `pointer` carry a mechanism and no
obligation; `citation` carries an **evidentiary** obligation, which is what the corpus's rules
enforce.

chosen over the rejected set for one reason each:

| rejected | why |
|---|---|
| `reference` | 🔴 **collides outright.** `.refs` is a declared field in every term cluster and `ref.*` is an artifact kind. one word, three senses — `rule.forbid.domain-term-ambiguity` (bhrain/learner) |
| `link` | names the **locator** only. a url with no excerpt and no attribution satisfies `link` and fails every citation rule this repo has |
| `quote` | names the **excerpt** only. the inverse gap: words with no source |
| `attribution` | names one **part**. to raise a part to the whole leaves the other two parts unnamed |
| `source` | the **target**, not the record. declared separately — `term=source._.choice._.md` |
| `pointer` | accurate and generic. it names how the mechanism works, never what the record owes |

## .disputes

### dispute: does `citation` cover an internal repo path? — raised 2026-09-08 — status: RESOLVED (yes)

- raised.by = the phantom-path round, which found two dead `.refs` in declared term clusters and had
  no word for what they were
- claim = the corpus's five citation rules all illustrate an **external** source, read through the
  bhrowser. a repo path is a different mechanism — no browser, no publisher, no read-date — so it is
  a different concept and wants a different word
- counter = 🔴 **the enumeration settles it against the claim.** six pointer kinds were listed, and
  all six carry the same three parts and break the same three ways. the mechanism differs; the
  **obligation** does not. a dead `.refs` and a dead url fail a reader identically
- resolution = **one word, six kinds.** `citation` is bounded by the evidentiary obligation, never by
  the transport. ⚠️ the five extant rules stay correct as written — they govern the web subset. what
  a reader took them to mean (that a repo path is out of scope) was never what they said

⇒ this is `rule.require.specialize-a-rule-its-readers-look-past` (bhrain/learner) in its diagnostic
form: **every example in those five rules is a url, and a reader looked straight past them while
they typed a repo path.**

### dispute: should it be boundary-qualified as `artifact.citation`? — raised 2026-09-08 — status: RESOLVED (no — it is not an artifact)

- raised.by = the same round that left `artifact.inventory` OPEN
  (`term=inventory._.choice.reason.md`), against `rule.require.boundary-qualified-terms` (bhrain/learner)
- claim = symmetry. if `inventory` owes an `artifact` boundary, so does `citation`
- counter = 🔴 **they are not the same kind of thing.** an inventory is a **document** — it has a
  filename, it is read on its own. a citation is a **record inside** a document; it has no file and
  cannot be opened. ⇒ the boundary test — *"$word, of WHAT?"* — answers **"of a claim"**, not "of an
  artifact", and `claim` is likewise undeclared
- resolution = **flat, and for a different reason than `inventory`'s.** `inventory` sits flat while
  it **waits** on `artifact`; `citation` sits flat because `artifact` is the **wrong** boundary for
  it. ⚠️ the two must not be moved together on that mistaken symmetry

### the dispute this CLOSES

`term=source._.choice.reason.md` carried an open note that `citation.excerpt`'s boundary was
undeclared, and that a declaration of `citation` would retro-justify it. **that is now done** —
`term=citation.excerpt` names a real declared boundary as of this file.

## .evidence

### the enumeration that bounded the term — 2026-09-08

`grepsafe --pattern 'citation' --path .agent/repo=.this/role=any/briefs --count` → **143 lines
across ~25 files.** the heaviest holders:

| artifact | lines |
|---|---|
| `rule.require.fifty-divergent-citations` | 14 |
| `term=source._.choice.reason.md` | 16 |
| `rule.require.research-to-briefs` | 9 |
| `rule.require.seven-distinct-citations` · `rule.require.accrue-research` | 8 each |
| `rule.require.bhrowser-citations` | 7 |
| `term=source._.choice._.md` | 6 |
| `rule.require.peer-gate-on-cited-claims` · `rule.require.excerpt-carries-the-qualifier` · `rule.require.source-inventory` · `rule.require.bhrowser-headful` | 5 each |

⇒ a word at 143 usages across 25 files, which already bears load as the boundary of a declared term,
and never itemized. **`rule.require.domain-term-itemization` grades that a blocker**, and it stood
for two days.

### the three phantom classes, each measured

| class | the measurement | date |
|---|---|---|
| phantom **claim** | a `.see also` asserted that `rule.require.fifty-divergent-citations` requires divergence **across publishers**. it does not — it has no publisher axis at all. the claim was **true and the citation was false**, which is the hardest shape to catch | 2026-09-07 |
| unmarked **foreign** | four bhrain-only rules cited in file **bodies** with no `(bhrain/learner)` marker, by an author who marked the same rules correctly in the same files' `.see also` blocks. ⇒ **the failure is positional, not conceptual** | 2026-09-07 |
| phantom **path** | two `.refs` at `probe.onlinecapacity.earliest.play.ts` and `probe.access.ownsites.play.ts`, in two declared term clusters. `globsafe --pattern 'src/**/probe*'` returns **zero**. the reads they claimed live at `review.requirements.play.ts:381` and `review.access.play.ts:110` | 2026-09-07 |

🔴 **the third class is why the read-date is a part of the record and not decoration.** the other two
were wrong the day they were authored. a phantom path was **right** the day it was authored, and a
re-read of the words will never reveal otherwise.

### the control — the case that must PASS

a citation whose named source holds the claim, whose path reaches the target today, and whose
excerpt carries the clause that bounds it. ⇒ the three classes above discriminate rather than merely
find fault, because this row is reachable and common.

## .invariants

- a citation is a **record inside** an artifact, never an artifact itself. it has no filename
- a citation's truth value **changes with time** — the only field in a term cluster with that
  property. ⇒ **a citation verified once is not verified**; a verification carries a date or it
  carries naught
- a **marked foreign** citation and an **unmarked** one grep identically. ⇒ the marker is the only
  mechanism by which a reader can tell a distant file from a lost one

## .see also

- `term=citation.excerpt._.choice._.md` · `.reason.md` — the part, and the attribution/scope split
- `term=source._.choice._.md` · `.reason.md` — the target, and the publisher distinction
- `rule.always.reuse-pavement-before-improvise` (bhrain/learner) — names the phantom-path failure and
  the marked-foreign repair
- `rule.require.enumerate-before-you-name` (bhrain/learner) — the rule that bounded this term
- `rule.require.boundary-qualified-terms` (bhrain/learner) — the rule the second dispute answers
