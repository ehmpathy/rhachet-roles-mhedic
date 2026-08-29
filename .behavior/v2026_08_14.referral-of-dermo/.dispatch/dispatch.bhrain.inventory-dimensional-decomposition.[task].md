# feat(librarian): teach dimensional-decomposition of inventories (inventory.of=$topic.case=$subcase)

## .what

the **bhrain librarian** (the learner role that tends the glossary + inventories) should own and
enforce a convention it does not yet name: an inventory whose topic spans **multiple distinct,
enumerable members** must be **decomposed dimensionally** into one `inventory.of=$topic.case=$subcase.md`
file per cell — never lumped into a single flat `inventory.of=$topic.md` bundle.

the `.for=$axis` / `.case=$subcase` filename segments are the **coordinate system of a dimensional
decomposition** (architect: `howto.dimensional-decomposition`, `rule.require.dimensional-decomposition`,
`def.dimensional-decomposition.history.morphological-analysis`). each segment names a dimension; each
file is a cell in the product. a flat bundle discards the exact structure the schema exists to carry.

## .why this belongs to the librarian

the learner already owns the itemization disciplines — `rule.require.domain-term-itemization`,
`im_an.obsessive_learner.for.domain.terms`, and the nudge to tend inventories. inventory **structure**
is the same family of concern: *at what grain is knowledge stored so it can be cited, promoted, and
reused?* the librarian is where this rule should live and be taught, so every downstream repo
inherits it rather than a re-derivation from scratch.

it pairs with the consumer-side rule already written in rhachet-roles-mhedic
(`rule.require.inventory-dimensional-decomposition.[rule].md`) — this dispatch lifts that lesson
upstream to the librarian that governs all inventories.

## .the failure that motivated it

in rhachet-roles-mhedic, a melanoma diagnostician inventory `inventory.of=dermoscopy-algorithms.md`
bundled **six peer algorithms** (ABCD-rule, 7-point checklist, 3-point checklist, Menzies, 7FFM, plus
the visual-inspection baseline) as a flat list of `### fact:` blocks. the natural axis is *which
algorithm*; each is a cell that should be its own file:

```
inventory.of=dermoscopy-algorithms._.md                      # the INDEX (catalog root)
inventory.of=dermoscopy-algorithms.case=abcd-rule.md         # a cell
inventory.of=dermoscopy-algorithms.case=7-point-checklist.md
inventory.of=dermoscopy-algorithms.case=3-point-checklist.md
inventory.of=dermoscopy-algorithms.case=menzies.md
inventory.of=dermoscopy-algorithms.case=7ffm.md
```

the bundle could not be cited at grain (a score stone wants one cutoff, not the whole file), could
not be promoted per-cell (`rule.require.accrue-research` lifts one cell, not all-or-none), and hid
its own decomposition axis.

## .what the librarian should teach + enforce

1. **the test**: does a topic hold 2+ distinct enumerable members along a natural axis? → decompose
   into `.case=` cells. is it a single atomic subject? → one file is correct.
2. **the method**: run the architect's dimensional decomposition before an inventory is written —
   name the axis/axes, enumerate cells, note forbidden combinations.
3. **the name shape**: one axis → `inventory.of=$topic.case=$subcase.md`; two axes →
   `inventory.of=$topic.for=$axisA.case=$axisB.md`. a decomposed cluster's thin index is optional and
   holds only pointers + shared facts that compare cells (never a cell's own facts).
4. **the catalog-root marker `._`**: when a cluster has cells, its index is named
   `inventory.of=$topic._.md` — **not** the bare `inventory.of=$topic.md`. the `._` marks it as the
   **catalog root**, a mirror of the librarian's own domain-term cluster convention
   (`term=<x>._.choice._.md`). it disambiguates the root from its `.case=` members in a flat directory
   view, and reserves the bare `.md` for the atomic (no-cells) case — so the name alone tells you
   whether cells exist.
5. **enforcement**: a flat bundle of 2+ peer members = blocker; an arbitrary `.case=` suffix that
   names no real dimension = blocker; a decomposed cluster's index named bare `inventory.of=$topic.md`
   instead of `inventory.of=$topic._.md` = blocker; a genuinely atomic single-file inventory = correct.

## .done when

- the librarian carries a brief/rule naming the `inventory.of=$topic.case=$subcase` decomposition
  convention, grounded in the architect's dimensional-decomposition canon
- that rule also names the `inventory.of=$topic._.md` catalog-root marker for a decomposed cluster's
  index (mirroring the `term=<x>._.` cluster convention the librarian already owns)
- the obsessive-learner inventory nudge checks decomposition grain, not just existence
- a downstream repo that boots the librarian inherits the rule (no per-repo rework)

## .see also

- consumer-side rule (rhachet-roles-mhedic): `rule.require.inventory-dimensional-decomposition.[rule].md`
- architect canon: `howto.dimensional-decomposition`, `rule.require.dimensional-decomposition`,
  `def.dimensional-decomposition.history.morphological-analysis`
- `rule.require.source-inventory` (the `case=trust`/`case=avoid` decomposition already in practice)
- `rule.require.accrue-research` (per-cell promotion, which a bundle blocks)
