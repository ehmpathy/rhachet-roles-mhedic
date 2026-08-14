# rule.require.prescription-inventory

## .what

whenever you evaluate a prescription (a drug, for a human or a cat), itemize the evaluation
into a durable **inventory** — one file per facet, under a canonical name pattern.

do not leave a prescription evaluation as loose prose in a chat. capture it as inventory files
so the next traveler finds the full, provenance-split record.

## .the name pattern

```
inventory.of=prescriptions.for={species}.case={formalname}.{facet}.md
```

where:
- **of=prescriptions** — the inventory family (fixed)
- **for={species}** — one of: `human` | `feline` (add more species as the domain grows)
- **case={formalname}** — the prescription's formal name, kebab-case (e.g. `robenacoxib-onsior`)
- **{facet}** — one of the facets below (the set is extensible)

## .the facets (one file each, at minimum)

| facet | holds | source bar |
|-------|-------|-----------|
| `claims-official` | claims from trusted sources — the food and drug administration (fda) label, peer-reviewed literature, manufacturer data | bhrowser-verified (`rule.require.bhrowser-citations`) |
| `claims-social` | claims from crowd / social sources — forum posts **and their comments** | signal only, never citation-grade (`rule.require.read-social-comments`) |
| `mechanics` | how the drug works — class, target, pharmacokinetics, onset, clearance | bhrowser-verified |

more facets may be added later (e.g. `adverse`, `interactions`) with the same pattern. the
three above are the floor.

## .why

- one prescription, one predictable shelf: the next traveler finds official vs social vs
  mechanism at a glance, by filename alone.
- **provenance stays split** — trusted claims never blur into crowd anecdote. that separation
  is the exact discipline a medical registry needs.
- the inventory compounds: each prescription evaluated raises the floor for the next.
- a prescription evaluated but not itemized is a lesson lost.

## .example — the onsior evaluation

```
inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.claims-official.md
inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.claims-social.md
inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.mechanics.md
```

## .where

alongside the prescription's other briefs in the relevant role (e.g. the prescriber briefs),
or a dedicated `inventory/` subfolder.

## .enforcement

- a prescription evaluated with no inventory itemization = blocker
- official and social claims in one file (provenance blurred) = blocker
- an inventory file off the name pattern = nitpick

## .see also

- `rule.require.bhrowser-citations.[rule].md` — the source bar for `claims-official` + `mechanics`
- `rule.require.read-social-comments.[rule].md` — how `claims-social` is drawn (bhrowser, comments read)
- `rule.forbid.acronyms.[rule].md` — spell terms out in the inventory
- `motto.not-medical-advice.[motto].md`
