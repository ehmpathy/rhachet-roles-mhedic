# rule.require.source-inventory

## .what

as you collect sources during research, **inventory each one** as either **trust** or **avoid**,
with a stated reason. the inventory is a growing ledger of *who we can trust and who we must avoid*.

one file per source:

```
inventory.of=sources.case=trust.$slug.md
inventory.of=sources.case=avoid.$slug.md
```

kept in `.agent/repo=.this/role=any/briefs/inventory/`. each file **declares why** the source can
or cannot be trusted.

## .why

- research breadth compounds across sessions; a trust judgment made once should never be re-derived
- we repeatedly hit the same sources (FDA, DailyMed, PMC, manufacturer pages, aggregators) — the
  verdict on each is reusable institutional memory
- some sources are **structurally untrustworthy or unusable**: region/network-blocked aggregators,
  promotional manufacturer pages, nav-only shells, or forbidden retrieval methods
  (WebSearch/WebFetch). recording *why* stops the next session from wasting tokens rediscovering it
- pairs with `rule.require.bhrowser-citations` (quality) and `rule.require.seven-distinct-citations`
  (count): this rule governs **provenance trust** — which sources those citations may come from

## .the rule

| requirement | detail |
|-------------|--------|
| when | the moment a source is encountered in research (discovery or read), before it is cited |
| verdict | classify as **trust** or **avoid** — no unclassified sources in a finished doc |
| reason | every entry states *why* (tier + evidence + retrieval outcome), not just a label |
| retrieval note | record the bhrowser outcome: `ok` / `blocked` / `nav-only` / `pdf-only` |
| location | `.agent/repo=.this/role=any/briefs/inventory/inventory.of=sources.case={trust,avoid}.$slug.md` |
| reuse | before citing a source, check the inventory; prefer `trust`, never cite an `avoid` |

## .trust tiers (guide for the verdict)

| tier | example | default verdict |
|------|---------|-----------------|
| regulator-approved label / regulator site | FDA SPL/DailyMed, EMA EPAR, fda.gov | **trust** (primary) |
| peer-reviewed literature | PMC / journal full text | **trust** |
| professional/clinical reference | VCA, Merck Vet Manual | **trust (caution)** — secondary, note bias/currency |
| manufacturer page | Elanco/brand site | **trust (caution)** — promotional; confirm claims vs label |
| consumer aggregator | Drugs.com, WebMD | **avoid/caution** — derivative; may be region-blocked |
| search/fetch tool output | WebSearch, WebFetch | **avoid** — forbidden as citation by `rule.require.bhrowser-citations` |

## .how

on each new source:

1. slugify the source (domain or method), pick `case=trust` or `case=avoid`
2. create/update `inventory.of=sources.case=$case.$slug.md`
3. state the tier, the reason, the bhrowser retrieval outcome, and a verbatim snippet if useful
4. cross-link it from the research doc's `## .sources` when it matters

## .enforcement

- research doc citing a source with **no inventory entry** = nitpick (add it)
- citing a source recorded as **avoid** = blocker
- an `avoid` entry with **no stated reason** = blocker (the reason is the point)

## .see also

- `rule.require.bhrowser-citations.[rule].md` — retrieval-method trust
- `rule.require.seven-distinct-citations.[rule].md` — citation count
- `ref.trusted-sources.medical.[ref].md` — index/rollup of the inventory
- `../../../../src/domain.roles/prescriber/briefs/howto.identify-official-drug-label.[lesson].md` — how to rank a drug source
