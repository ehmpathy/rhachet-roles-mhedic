# rule.require.cite-the-adjacency-not-the-item

## .what

for every **ordered** artifact — a ranked differential, a priority list of tests, a triage tier, a
list of asks — you must be able to cite the source of each **ADJACENCY**, not merely of each item.

> **if you cannot cite why A precedes B, then A and B belong in the same tier.**

an order over items no evidence separates is a **magnitude in disguise**. it asserts a precision
the corpus does not supply, and it carries **no digit for a numeric audit to catch**.

## .why

- **a rank is a claim the reader will EXECUTE.** no one works top-down through a stray integer. a
  priority list is built to be worked top-down, so a wrong order does not merely misinform — **it
  misdirects the next act.**
- **a rank reads as ORGANIZATION, not as assertion.** a table has to be in *some* order, so the
  order looks like a format decision. that is exactly why it survives audits that catch percentages.
- **the fine rank multiplies the claim.** an order over `n` items asserts `n(n-1)/2` pairwise
  judgments. a 12-place list claims 120. a corpus rarely supplies more than a handful.
- **in a medical artifact the cost is direct.** the item at the top is the act that gets done first.

## .the test

for each **pair** in the order, ask: *what source ranks A above B?*

| the answer | the verdict |
|---|---|
| a cited gate — *"B is meaningless until A is answered"* | ✅ **a real adjacency.** keep it |
| a cited uniqueness — *"A is the only act that reaches X"* | ✅ **stronger than a rank, and falsifiable** |
| a mechanism or clock the source states | ✅ keep |
| *"it felt more important"* | 🔴 **same tier** |
| *"that is the order I typed them in"* | 🔴 **same tier** |
| 🔴 a claim in the artifact that **contradicts** the position | 🔴🔴 **a blocker, never a nitpick** |

## .the three disguises

| disguise | why it survives an audit |
|---|---|
| a **count** (`58 rows`) | reads as clerical |
| 🔴 a **rank** (`1, 2, 3 … 11`) | reads as organization — and the reader **acts on it** |
| 🔴 a **superlative** (`the highest-value`, `the likeliest`) | **carries no digit**, so no numeric sweep reaches it |

⚠️ **a superlative over an empty comparison class is the sharpest case** — *"the likeliest reason"*
where no other reason was ever recorded ranks one hypothesis against zero.

## .how to repair — DECLARE, do not renumber

🔴 **a re-sort is the wrong fix twice**: it invents a *different* unsourced order, **and** it breaks
every reference that addresses the rows by number — a join break, which is the defect class hardest
to see (a drop leaves both documents clean on a solo read).

⇒ **keep the numerals as stable labels and withdraw the rank claim in words**, then group into
coarse tiers with a **stated, mechanical membership test** — one a reader can apply and falsify,
never a judgment of worth. state explicitly that within a tier there is **no order**.

## .the corollary — run a new test on EVERY artifact in scope

when a review coins this test, the artifact that provoked it is **the one case you already know the
answer for**, so it is the least informative place to spend it. enumerate every ordered artifact on
the page — **and the sentences you reach for as the RULER** — then run it on each before you write
the section.

⚠️ **a rank hides best inside the sentence that condemns another rank.** an authority cited in a
repair reads as a fact precisely because it performs the work of an authority.

## .enforcement

- an ordered artifact with an adjacency that no source supports = **blocker**
- an order contradicted by a claim inside the artifact itself = **blocker**
- a superlative with an empty or unstated comparison class = **blocker**
- a repair by **renumber** where references address the items by position = **blocker**
- a coarse tier with no stated membership test = **nitpick**

## ⚠️ .this is a SPECIALIZATION, and its parent is not written yet

the claim is domain-agnostic; **the teeth here are medical.** the `.why` turns on *"the item at the
top is the act that gets done first"*, and the enforcement targets differentials and test-priority
lists. ⇒ the general form belongs to 🦉 **bhrain**, alongside the review guide (*"ordinal (rank),
not false-precision magnitudes"*) whose target this rule names.

🔴 **it does not exist**, so this specialization cites no parent — a gap
`rule.require.specialize-a-rule-its-readers-look-past` would grade. **caught, with the term it
needs** (`order.adjacency`, whose boundary no repo declares today):

- `.dream/v2026-09-06.reseed.order-adjacency-and-its-parent-rule.md`

⇒ until then, **read this rule as complete on its own** — the medical half is enforceable as it
stands, and the reseed owes the general half rather than any part of this one.

## .see also

- ⚠️ **the worked example lived in a private case route and was removed** (`rule.forbid.pii`).
  what it measured: **six instances in one review, not one with a numeral** — two ordered tables, two
  superlatives, a bare *"likeliest"* over an empty comparison class, and a universal **inside the
  repair itself**. two of the six were the sentences used to audit the others. ✅ the **control**: the
  probability brackets passed the same instrument, because each bound was one-sided and separately
  sourced, so no adjacency was asserted.
- `rule.require.superposition-until-elimination` — a low position is a workup order, never an
  elimination; this rule guards the position itself.
- `define.pNN-probability-token.[lesson]` — where a magnitude IS supportable, and how it is labelled.
