# domain.term.choice.reason: inventory

## .etymology

**inventory** — latin *inventarium*, "a list of what is found," from *invenire*, "to come upon."
the word carries **a set of what was FOUND**, which is exactly the posture wanted: an inventory
reports what the search turned up, and makes no claim that the search was exhaustive.

⇒ that is the precise gap between it and `census`. a census asserts *"this is all of them, and here
is the frame that proves it."* an inventory asserts *"this is what I found, of this kind, within
this bound."*

chosen over the rejected set for one reason each:

| rejected | why |
|---|---|
| `collection` | makes **no bound claim**. an inventory's `.of=` and `.for=` slots are the point; a collection has neither |
| `catalog` | implies a **browse-index** over items held elsewhere. an inventory holds its items |
| `compilation` | names the **act** of assembly, not the artifact. we already have the act — it is the research pass |
| `notes` | carries **no completeness posture at all**, so a reader cannot tell a thorough file from a scrap |
| `research` | 🔴 the **activity** that fills an inventory. to overload it would collide an act and an artifact — `rule.forbid.domain-term-ambiguity` (bhrain/learner) |
| `dossier` | a file **about one subject**; an inventory is a set **of a kind**. the two invert the part-whole relation |

## .disputes

### dispute: is `inventory` merely a synonym of `census`? — raised 2026-09-07 — status: RESOLVED (genus/species)

- raised.by = a terms round that found `census` declared and `inventory` undeclared, while
  **`census`'s own `.refs` point at a file named `inventory.of=dermatologists-near-…`**
- claim = one concept wears two words. `census` forbids five near-synonyms (`list`, `roster`,
  `recall`, `shortlist`, `directory`) and `inventory` is plainly in that neighbourhood — so it was
  either an oversight in the forbid list, or a live drift
- counter = 🔴 **the enumeration settles it, and it is not close.** the corpus holds **66**
  `inventory.of=` artifacts across three roles and ten `.of=` kinds — sources, causes, symptoms,
  effects, hazards, correlations, prescriptions, examples, algorithm families, condition dossiers.
  **`census` fits exactly ONE of the 66.** a word that covers one row of sixty-six is not a synonym
  of the word that covers all of them; it is a **species of it**
- resolution = **genus and species.** `inventory` is the genus; `census` adds the differentia — a
  declared population frame plus a proven diff against it. neither is forbidden to the other, and a
  census filed under the genus name is correct rather than a drift

⚠️ **the `.of=` slot is what made this decidable.** without it the two words would compete on vibes;
with it, the question becomes *"how many distinct `.of=` kinds does each word cover?"* — which is a
count, and a count can be checked.

### dispute: should it be boundary-qualified as `artifact.inventory`? — raised 2026-09-07 — status: OPEN

- raised.by = the same round, against `rule.require.boundary-qualified-terms` (bhrain/learner)
- claim = `inventory` is a **document kind**, so its boundary is `artifact` — the same shape bhrain
  uses for `term=artifact.dream`. a flat `term=inventory` names no boundary, which that rule grades
  a blocker
- counter = 🔴 **`artifact` is declared nowhere in this repo**, and the rule *also* grades *"a
  boundary naming no declared term"* a blocker. ⇒ both forms violate it, so the qualifier buys no
  improvement until `artifact` is declared. and **`census` sits flat**, so a qualified `inventory`
  beside a flat `census` would part a genus from its own species in the filename ordering
- resolution = **OPEN.** contracts keep the flat `inventory` meanwhile, matched to `census`. ⚠️ **the
  real prerequisite is to declare `artifact`, and then to move the PAIR together** — never one alone

⇒ this is the **fourth** term in three days blocked on an undeclared boundary (`order`, `intake` ×2,
now `artifact`). the pattern is no longer incidental: **the repo mints leaf terms faster than it
mints the boundaries they hang from.**

## .evidence

### the enumeration that decided the genus/species split — 2026-09-07

| `.of=` kind | count | does `census` fit? |
|---|---|---|
| `sources` | 24 | 🔴 no — a source appraisal declares no population frame |
| `causes` · `symptoms` · `effects` · `hazards` · `correlations` | 13 | 🔴 no — open-ended sets, no frame exists to prove against |
| `prescriptions` | 5 | 🔴 no |
| algorithm + condition dossiers | 22 | 🔴 no |
| `dermatologists-near-<place>` | **1** | ✅ **yes** — NPI registry as the frame, diffed, coverage stated |

⇒ **1 of 66.** the control that makes this a real result rather than a convenient one: the row that
DOES fit is a genuine census by its own definition, so the instrument discriminates rather than
merely rejects.

### 🔴 the defect the split exposes, and it is live

`census`'s worked example is filed as `inventory.of=dermatologists-near-panama-city-beach.md`.

under the genus/species read that filename is **correct** — but it means **no reader can tell from a
filename which inventories carry a proof-of-coverage claim.** the strongest artifact in the corpus
is indistinguishable from the weakest.

⚠️ **the repair is NOT a rename.** `rule.require.cite-the-adjacency-not-the-item` records the general
form of this error: *"DECLARE, do not renumber"* — a re-sort invents a different unsourced order and
breaks every extant reference. the same holds here: to rename 66 files so one reads `census.of=`
breaks every citation to buy one bit of information.

⇒ **the cheap repair is a stated field inside the file** — a census already declares its frame in its
body. what is owed is that an inventory **without** a frame say so explicitly, so the absence is
visible rather than merely unmentioned. ⚠️ **that is the same move `term=effect.symptom.spontaneous`
records**: an unmarked default lets a row pass unclassified, and the fix is to name both values.

## .invariants

- an inventory is **strictly a set of one kind**. its `.of=` slot is the kind, and there is exactly one
- ⚠️ **an inventory may be bounded, itemized, well-named, and still prove naught** — completeness is
  a separate claim. ⇒ **itemized is not exhaustive**, and that is the invariant this term exists to carry
- a census is an inventory that additionally proves coverage ⇒ **every census invariant is an
  inventory invariant, and not the reverse**

## .see also

- `term=census._.choice._.md` · `.reason.md` — the species, and the `recall` antonym it turns on
- `term=coverage._.choice._.md` — the property that parts the two
- `rule.require.enumerate-before-you-name` (bhrain/learner) — the rule that decided this cluster
- `rule.require.boundary-qualified-terms` (bhrain/learner) — the open dispute above
