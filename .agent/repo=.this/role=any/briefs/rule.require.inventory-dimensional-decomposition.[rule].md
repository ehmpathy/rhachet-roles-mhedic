# rule.require.inventory-dimensional-decomposition

## .what

an inventory whose topic spans **multiple distinct, enumerable members** must be **decomposed
dimensionally** — one `inventory.of=$topic.case=$subcase.md` file per cell — NOT lumped into a single
flat `inventory.of=$topic.md` bundle.

the `.for=$axis` / `.case=$subcase` segments in the filename are not decoration. they are the
**coordinate system of a dimensional decomposition** (architect: `howto.dimensional-decomposition`,
`rule.require.dimensional-decomposition`). each segment names a dimension; each file is a **cell** in
the product of those dimensions. a flat bundle throws away the exact structure the schema exists to
carry.

## .why

- **a bundle cannot be cited at grain.** a stone wants *the ABCD-rule cutoff*, not *the algorithms
  file*. when six algorithms share one file, every citation drags in five irrelevant ones, and the
  clamp that maps stones to inventories can only prove the bundle exists, not the specific fact.
- **a bundle cannot be promoted or reused at grain.** most-common-denominator promotion
  (`rule.require.accrue-research`) needs to lift *one cell* to the role/repo home; a lump forces
  all-or-none.
- **decomposition surfaces the dimension + the forbidden cells (invariants).** to walk the axes is
  how you discover the topic's true shape — which subcases exist, which combinations are impossible
  (morphological analysis). a flat list hides the axis and can silently omit a cell.
- **the filename coordinates ARE the decomposition.** `case=trust` / `case=avoid` decomposes
  *sources* along a trust axis; `for=feline.case=robenacoxib-onsior` decomposes *prescriptions*
  along species × drug. to write `inventory.of=$topic.md` with N members inside is to name a
  coordinate system and then refuse to use it.

## .the test — decompose, or stay atomic?

ask: **does this topic contain two or more distinct, enumerable members along a natural axis?**

| answer | shape |
|--------|-------|
| yes — N named members (algorithms, sources, drugs, subtypes) | decompose: one `.case=$subcase.md` per member |
| no — a single atomic fact-cluster about one subject | one `inventory.of=$topic.md` is correct |

the smell of a violation: a single `inventory.of=$topic.md` whose body is a list of `### fact:
<member-A>` … `### fact: <member-N>` where each member is a peer of the others along one axis. that
list IS the decomposition, written inline instead of as files.

## .the worked example — `dermoscopy-algorithms`

`inventory.of=dermoscopy-algorithms.md` bundled six peer algorithms (ABCD-rule, 7-point checklist,
3-point checklist, Menzies, 7FFM, plus the visual-inspection baseline) in one file. the natural axis
is **which algorithm**; each is a cell, and the thin index carries the `._` catalog-root marker:

```
inventory.of=dermoscopy-algorithms._.md                      # the INDEX (catalog root)
inventory.of=dermoscopy-algorithms.case=abcd-rule.md         # a cell
inventory.of=dermoscopy-algorithms.case=7-point-checklist.md
inventory.of=dermoscopy-algorithms.case=3-point-checklist.md
inventory.of=dermoscopy-algorithms.case=menzies.md
inventory.of=dermoscopy-algorithms.case=7ffm.md
```

now a score stone cites `…case=abcd-rule.md` for exactly the cutoff it applies, and a new algorithm
is a new file, not an edit that churns the bundle.

## .the index carries `._` (the catalog-root marker)

when a cluster has cells, its index/rollup is named `inventory.of=$topic._.md` — **not** the bare
`inventory.of=$topic.md`. the `._` marks it as the **catalog root**, a mirror of the domain-term
cluster convention (`term=<x>._.choice._.md`):

- **it disambiguates root from member.** in a flat directory view the root `…$topic._.md` sorts
  distinctly from its `…$topic.case=$sub.md` members, so a reader spots the index at a glance instead
  of a read where a cell looks like the whole.
- **it reserves the bare `.md` for the atomic case.** an atomic single-subject inventory (no cells)
  stays `inventory.of=$topic.md`; only a decomposed cluster's index earns `._`. so the name alone tells
  you whether cells exist.

## .how

1. before you write an inventory, run the dimensional decomposition (architect
   `howto.dimensional-decomposition`): name the axis/axes, enumerate the cells, note forbidden
   combinations.
2. if one axis with 2+ members → one `inventory.of=$topic.case=$subcase.md` per member.
3. if two axes → `inventory.of=$topic.for=$axisA.case=$axisB.md` per cell (skip forbidden cells).
4. keep a thin `inventory.of=$topic._.md` **index** (the catalog root; `._` marks it) only if a
   rollup helps — it points at the cells and holds shared cross-cutting facts, but not the cells' own
   facts.

## .enforcement

- a flat `inventory.of=$topic.md` whose body enumerates 2+ peer members along a natural axis, where
  each member has its own thresholds/citations = **blocker** (decompose into `.case=` cells)
- a genuinely atomic single-subject inventory kept as one file = **correct** (no false positive)
- a `.case=`/`.for=` filename segment that does NOT correspond to a decomposition dimension
  (arbitrary suffix) = **blocker**
- a decomposed cluster's index/rollup named `inventory.of=$topic.md` (bare) instead of
  `inventory.of=$topic._.md` (catalog root) = **blocker** (the `._` disambiguates the root from its
  `.case=` cells)

## .see also

- `howto.dimensional-decomposition` (architect) — the method that produces the cells
- `rule.require.dimensional-decomposition` (architect) — the mandate to walk the axes
- `def.dimensional-decomposition.history.morphological-analysis` (architect) — the precedent
- `rule.require.source-inventory.[rule].md` — the `case=trust`/`case=avoid` decomposition in practice
- `rule.require.accrue-research.[rule].md` — promotion works per-cell, which a bundle blocks
