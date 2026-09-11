# domain.term.choice.reason: fullsun

## .etymology

**fullsun** — from horticulture. a plant tag reads *full sun · partial shade · full shade*, and it
names **how much light the plant can take**. that is the exact shape wanted, and it is why the trio
coheres rather than merely rhymes:

| the tag | the posture | what it says |
|---|---|---|
| full sun | ☀️ **fullsun** | thrives in the open. put it out |
| partial shade | 🕶️ **obscure** | tolerates light, but not yet, and not all of it |
| full shade | 🔒 **protect** | direct light kills it |

⇒ **the metaphor carries the ORDER for free.** a reader who has ever bought a plant already knows
which end is which, and knows the scale is continuous rather than three unrelated buckets. that is
what a bare `share / scrub / prune` cannot do — those three words share no scale at all.

it also inherits a second, older sense. brandeis: *"sunlight is said to be the best of
disinfectants."* ⇒ fullsun does not merely permit exposure; it claims exposure **improves** the
artifact. that is a stronger claim than any permission word can make, and it is the whole reason the
word beats `publishable`.

chosen over the rejected set for one reason each:

| rejected | why |
|---|---|
| `public` | names the **audience**. an obscure brief may sit in a public repo, held by an unfired trigger — so `public` and `fullsun` are orthogonal, never synonyms |
| `open` / `open-source` | names a **license**. a license grants a permission; it makes no claim about where the value lives |
| `publishable` | names the **permission** — *"you may."* fullsun claims *"you should, and you gain."* to swap it down to permission drops the upside the graduation trigger exists to protect |
| `safe` | 🔴 the **outcome**, not the posture. and in a medical repo `safe` already means clinically safe — a live overload (`rule.forbid.domain-term-ambiguity`, bhrain/learner) |
| `cleared` | names the **approval**, never the reason ⇒ **the same error `prune` makes against `removed`**, judged earlier in this corpus: a word that names who signed off gives a later reader no reason |
| `daylight` / `sunlight` | the metaphor's raw material. useful in a sentence, wrong as the tag — and `daylight` names the medium while `fullsun` names the **dose** |

## .disputes

### dispute: is `share` a forbidden synonym? — raised 2026-09-08 — status: RESOLVED (co-term, never forbidden)

- raised.by = the reflex to fill a forbid-list. `share` and `fullsun` name the same call, and
  `rule.forbid.domain-term-synonyms` forbids two words for one concept
- claim = one concept, two words ⇒ forbid the weaker one
- counter = 🔴 **they name two different FACETS of one call, and the rule that coined them says so
  outright**: the verdict is the **action**, the posture is the **rationale**. a reader who must *act*
  wants `share`; a reader who must *judge* wants `fullsun`. to forbid either would break
  `rule.require.publishability-triage`, which uses both in one line by design: `☀️ fullsun (share)`
- resolution = **co-terms, with a declared precedence.** the posture is canonical and leads; the
  verdict rides in parentheses. ⚠️ **the real defect is neither word — it is a report that carries the
  verdict ALONE**, which drops the severity signal. that is already a nitpick in the rule's enforcement

⇒ this is the same shape as `census`/`inventory`: two words that survive the synonym rule because a
**declared relation** parts them. there, genus and species; here, action and rationale.

### dispute: is the PII strip a `scrub`? — raised 2026-09-08 — status: RESOLVED (genus/species; say `anonymize`)

- raised.by = `rule.forbid.pii` used `scrub` for the PII strip while `rule.require.publishability-triage`
  declares `scrub` the **verdict for the 🕶️ obscure posture**. one word, two acts, in one corpus
- claim = a plain overload ⇒ `rule.forbid.domain-term-ambiguity` (bhrain/learner), a blocker
- counter = 🔴 **not an overload — a genus and a species.** both acts remove identity to make an
  artifact shippable. the triage `scrub` is the genus; a PII anonymization is one species of it, and
  `rule.forbid.pii` already declares its own canonical verb: *"the required practice is
  **anonymization**"*
- 🔴 **but the imprecision still costs, and it costs at the POSTURE.** a scrub verdict rides the 🕶️
  obscure posture; PII rides 🔒 **protect** — the irreversible one. ⇒ a PII strip reported as a
  *"scrub"* under-reports its own severity by one full step of the gradient
- resolution = **`anonymize` for the PII act; `scrub` reserved for the obscure verdict.** graded a
  **nitpick**, not a blocker — the genus is not wrong, only imprecise. ⚠️ **the severity is the reason
  precision matters here**, which is the same argument the `.reporting` section makes for the posture

⇒ third pair in this corpus settled by a **declared relation** rather than a forbid: `census`/`inventory`
(genus/species), `fullsun`/`share` (rationale/action), now `scrub`/`anonymize` (genus/species).

### dispute: does the VERB sense carry a duty to promote? — raised 2026-09-08 — status: RESOLVED 2026-09-09 (largely covered; a narrow residue remains, and it is bhrain's)

- raised.by = a human asked, of a finished round, *"did you promote everything that could be
  fullsunned?"* — a use of the word as a **transitive verb of obligation**
- claim, as first written = the corpus has no rule that owes the act. `publishability-triage` triages
  what is already checked in; `fullsun-facts-not-tactics` bounds **what** may be fullsunned;
  `accrue-research` and `externalize.lessons.into_briefs` (bhrain/learner) *"are about the WRITE, and
  neither is about the MOVE"*
- 🔴 **counter — the last clause is FALSE, and it was authored in the same breath as the citation.**
  `rule.require.accrue-research` carries **20 lines about the move**: a named `promote` step, a
  two-axis most-common-denominator destination rule, a *native-to not cited-by* test, and a
  **blocker** for a premature promote to `role=any`. ⇒ **the duty was declared, and the dispute
  mis-read the rule it cited**
- 🔴 **the shape of the error, which outlives the conclusion**: a rule **characterized wrongly while
  cited** — verbatim the **phantom-claim** class declared in `term=citation._.choice._.md` the round
  before. ⚠️ **the round that declared the class committed the class**
- resolution = **RESOLVED, largely covered.** the promote ladder exists and is enforced —
  `term=promote._.choice._.md` now declares the verb

⇒ ⚠️ **the residue is real and much narrower than the claim**: `accrue-research`'s ladder starts at a
route's `accrue/` dir. it says naught about a fact in a **gitignored or untracked** artifact — no
route, no `accrue/`, **no bottom rung to stand on**. the measured instance is `.agent/.cache/`.
⇒ **bhrain-scoped** (the cache is the learner's), so it is queued there, never adopted here.

## .evidence

### the enumeration that bounded the term — 2026-09-08

`grepsafe --pattern 'fullsun'` → **145 lines**, and a whole rule named for the word:

| artifact | lines |
|---|---|
| `rule.require.publishability-triage` | 33 |
| `howto.redact-obscure-to-medical-facts` | 8 |
| `rule.require.accrue-research` | 7 |
| `rule.forbid.aggregation-index-build-narrative` | 5 |
| `rule.require.fullsun-facts-not-tactics` | the rule's own NAME |

⇒ 🔴 **a repo-born coinage, in a rule title, never itemized.** `rule.require.domain-term-itemization`
grades that a blocker — and the word is not even ordinary english, so a new traveler has no fallback
sense to lean on.

### the instances the word had to cover

| instance | covered? |
|---|---|
| an adjective on one artifact — *"a fullsun brief"* | ✅ |
| a noun for the collection — *"the fullsun set"* | ✅ |
| a verb of the act — *"fullsun the facts"* | ✅ |
| a tag in a `## .publishability` section | ✅ |
| a **transition target** — *"🕶️ obscure → ☀️ fullsun on trigger"* | ✅ — and this row is why the word must name a **position on a scale**, never a bucket |
| a set-level property the voice test fires on | ✅ — and 🔴 this row is why `publishable` fails: permission is granted per file, and this verdict is not |

⇒ the last two rows are the discriminating ones. a bucket word covers the first four and breaks on
row five; a per-file permission word covers five and breaks on six.

### the control

an artifact that is **NOT** fullsun and must be told apart: a research yield that cites only public
law but is written in advisory voice, so the set reconstructs a chosen design. it passes the
fingerprint test, passes the optionality test, and is **still 🕶️ obscure**. ⇒ the term discriminates
rather than merely approves.

## .invariants

- fullsun is a **position on a gradient**, never a bucket — which is what makes
  *"🕶️ obscure → ☀️ fullsun on trigger"* a coherent sentence
- the posture is **canonical**; the verdict is its alias. a report leads with the posture and its glyph
- 🔴 a fullsun verdict on a **set** is not the conjunction of fullsun verdicts on its members. the
  voice test is a set-level test, so a per-file pass proves naught about the set

## .see also

- `rule.require.publishability-triage.[rule].md` — the trio, the four tests, the red-team
- `rule.require.fullsun-facts-not-tactics.[rule].md` — the fact/decision line inside the posture
- `term=citation._.choice._.md` — the record a fullsun claim rests on
- `rule.require.enumerate-before-you-name` (bhrain/learner) — the rule that bounded this term
- `rule.forbid.domain-term-synonyms` (bhrain/learner) — the rule the `share` dispute answers

## .publishability

☀️ **fullsun** (share) — a glossary entry for a generic publication-hygiene posture; carries no
subject identity and no client-specific mechanic.
