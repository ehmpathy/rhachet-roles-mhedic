# domain.term: inventory

term.chosen   = inventory
term.kind     = noun
term.synonyms.forbidden:
- collection (makes no bound claim; an inventory declares what it is an inventory OF)
- catalog (implies a browse-index over items held elsewhere; an inventory holds the items)
- compilation (names the ACT of assembly, not the artifact that results)
- notes (carries no completeness posture at all)
- research (the activity that fills an inventory, never the inventory itself)
- dossier (a file ABOUT one subject; an inventory is a set OF a kind)

## .what

a **bounded, itemized set of one declared kind**, persisted as an artifact whose filename names the
kind it enumerates: `inventory.of=<kind>[.for=<clade>][.case=<slug>]`.

three properties, together:

1. **it names its kind** — the `.of=` slot is mandatory. an artifact that does not say what it is an
   inventory *of* is a pile, not an inventory
2. **it is bounded** — the `.for=` / `.case=` slots narrow the population it claims to cover
3. **it is itemized** — one row per member, so a member can be absent and the absence is visible

⚠️ **an inventory makes a COVERAGE posture, never automatically a coverage PROOF.** it says *"these
are the members I hold of this kind, within this bound."* whether that set is complete is a separate
claim, and most inventories do not make it.

## 🔴 .the relation to `census` — genus and species, never synonyms

> **a `census` IS an `inventory`. the reverse does not hold.**

| | `inventory` | `census` |
|---|---|---|
| bounded set of one kind | ✅ | ✅ |
| names its `.of=` kind | ✅ | ✅ |
| **declares a population FRAME** | ❌ not required | ✅ **required** |
| **proves its coverage against that frame** | ❌ not required | ✅ **required** |

⇒ `census` adds the **differentia**: an authoritative frame, a diff against it, and an explicit
`.how coverage was proven` claim. an inventory with none of those is still a valid inventory.

⚠️ **so a census filed as `inventory.of=…` is correct, not a drift** — the genus name is always
true of the species. what it costs is a reader's ability to tell, from the filename alone, which
inventories carry the proof claim.

## .refs

66 artifacts across three roles. the `.of=` kinds in use:

| `.of=` kind | where |
|---|---|
| `sources` | `role=any/briefs/inventory/` — 24 source appraisals |
| `causes` · `symptoms` · `effects` · `hazards` · `correlations` | `role=diagnostician/briefs/clade=feline/` |
| `prescriptions` | `role=prescriber/briefs/` |
| `dermatologists-near-<place>` | `role=referrer/briefs/inventory/` — **this one is a census** |
| `examples` | `role=any` + `role=diagnostician` |
| condition dossiers — `appendicitis`, `ectopic-pregnancy`, … | `role=diagnostician/briefs/clade=human/` |

also named by two rules: `rule.require.source-inventory`,
`rule.require.inventory-dimensional-decomposition`.

## .invariants

- an inventory **must** name its `.of=` kind. a filename without one is a violation
- an inventory is a set of **one** kind. two kinds in one file means two inventories
- an inventory that claims completeness **must** state its frame ⇒ at which point it is a `census`
- 🔴 **an inventory row may be empty, and an empty row is DATA** — that is the whole reason to
  itemize rather than to prose

## .reason

- `term=inventory._.choice.reason.md` — etymology, the `census` genus/species dispute, evidence

## .see also

- `term=census._.choice._.md` — the species this term is the genus of
- `term=coverage._.choice._.md` — the property a census proves and an inventory merely postures
- `rule.require.inventory-dimensional-decomposition` — how the rows are derived
