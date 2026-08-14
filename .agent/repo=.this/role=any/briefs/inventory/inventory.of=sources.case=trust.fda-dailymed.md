# inventory.of=sources.case=trust.fda-dailymed

- **source**: DailyMed (NIH/NLM) — FDA Structured Product Labeling (SPL)
- **domain**: dailymed.nlm.nih.gov
- **case**: **trust** — tier 1 (primary / official product declaration)
- **bhrowser retrieval**: ok (2026-08-08)

## .why we can trust it

DailyMed publishes the drug **labeling submitted to the FDA by companies** — the official package
insert / prescribing information. It is the accessible, quotable form of the regulator-approved
declaration.

> "The DailyMed database contains labeling, submitted to the Food and Drug Administration (FDA) by companies ... Prescription and nonprescription drugs for animal use" — https://dailymed.nlm.nih.gov/dailymed/about-dailymed.cfm

## .caveats

- it is the **"in use"** label, which "may not be identical to the most recent FDA-approved
  labeling available at **Drugs@FDA**" and "may not have been verified by FDA. Note: NLM does not
  review any SPL content prior to publication." → for the authoritative approval record, cross-check
  **Drugs@FDA / Animal Drugs @ FDA**.
- confirm you're on the label, not a search shell: look for application number (NADA/ANADA/NDA/ANDA),
  sponsor/labeler, and the Rx-restriction line.

## .use

primary citation for indication, dosing, contraindications, warnings, adverse reactions.
cache the page next to the brief (citations decay).
