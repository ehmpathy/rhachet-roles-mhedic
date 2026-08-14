# ref.trusted-sources.medical

rollup index of the source inventory — *who we trust and who we avoid* for medical/drug research.
this is a **navigation artifact**: it makes no independent factual claim and inherits its citations
from the per-source inventory files it links (see `rule.require.seven-distinct-citations` exception).

governed by `rule.require.source-inventory` — add an entry here whenever you add an inventory file.

## trust

| source | domain | tier | note |
|--------|--------|------|------|
| FDA / DailyMed SPL | dailymed.nlm.nih.gov | 1 · official label | [entry](./inventory/inventory.of=sources.case=trust.fda-dailymed.md) — in-use label; cross-check Drugs@FDA |
| U.S. FDA | www.fda.gov | 1 · regulator | [entry](./inventory/inventory.of=sources.case=trust.fda-gov.md) — approvals, SPL/guidance |
| EMA EPAR / SmPC | www.ema.europa.eu | 1 · EU regulator | [entry](./inventory/inventory.of=sources.case=trust.ema-europa.md) — declaration is a PDF; landing is nav-only |
| PubMed Central | pmc.ncbi.nlm.nih.gov | 2 · peer-reviewed | [entry](./inventory/inventory.of=sources.case=trust.ncbi-pmc.md) — full-text studies/reviews |
| VCA Animal Hospitals | vcahospitals.com | 3 · client-ed | [entry](./inventory/inventory.of=sources.case=trust.vca-hospitals.md) — caution: self-declared non-primary |
| Elanco (manufacturer) | my.elanco.com | 3 · manufacturer | [entry](./inventory/inventory.of=sources.case=trust.elanco.md) — caution: promotional |

## avoid

| source | id | why | entry |
|--------|----|----|-------|
| Drugs.com | www.drugs.com | region/network **blocked**; derivative of the label | [entry](./inventory/inventory.of=sources.case=avoid.drugs-com.md) |
| WebSearch / WebFetch | tool | unverifiable; forbidden as citation (discovery only) | [entry](./inventory/inventory.of=sources.case=avoid.websearch-webfetch.md) |

## .see also

- `rule.require.source-inventory.[rule].md` — the rule that mandates this ledger
- `rule.require.bhrowser-citations.[rule].md` — retrieval-method trust
- `../../../src/domain.roles/prescriber/briefs/howto.identify-official-drug-label.[lesson].md` — how to rank a drug source
