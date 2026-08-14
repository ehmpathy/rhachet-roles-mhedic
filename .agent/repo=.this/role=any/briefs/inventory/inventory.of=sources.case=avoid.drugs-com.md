# inventory.of=sources.case=avoid.drugs-com

- **source**: Drugs.com — consumer/vet drug aggregator
- **domain**: www.drugs.com
- **case**: **avoid** (as a citation)
- **bhrowser retrieval**: **blocked** (2026-08-08)

## .why we can't trust / use it

1. **region/network blocked** — the bhrowser was denied outright, so we cannot verify page content
   as read:
   > "Access Denied — Access to Drugs.com is not available from your region or network." — https://www.drugs.com/vet/onsior-tablets-for-cats.html
   an unverifiable page cannot back a citation (`rule.require.bhrowser-citations`).
2. **derivative** — even when reachable, it republishes the FDA label / manufacturer data. cite the
   **primary** source (DailyMed SPL) it derives from instead.

## .what to use instead

- FDA/DailyMed SPL (`inventory.of=sources.case=trust.fda-dailymed.md`)
- the manufacturer insert (`inventory.of=sources.case=trust.elanco.md`)

## .note

not "untrustworthy" in content per se — but **unusable for us** (blocked) and **non-primary**. do
not spend tokens retrying it from this environment.
