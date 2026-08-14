# inventory.of=sources.case=trust.ema-europa

- **source**: European Medicines Agency — EPAR / Summary of Product Characteristics (SmPC)
- **domain**: www.ema.europa.eu
- **case**: **trust** — tier 1 (EU regulator, primary)
- **bhrowser retrieval**: nav-only for the landing HTML; **the product declaration is a PDF** (2026-08-08)

## .why we can trust it

the EU regulator's authoritative record: authorisation status plus the SmPC (the EU equivalent of
the FDA label) inside the EPAR.

> "Authorised — This medicine is authorised for use in the European Union — robenacoxib" with an "Onsior : EPAR - Product Information" document. — https://www.ema.europa.eu/en/medicines/veterinary/EPAR/onsior

## .caveats

- the **HTML landing page is a navigation shell** (nav-only) — it does not contain the label text.
  the real declaration is the **"EPAR - Product Information" PDF**; open/quote that, not the shell.
- EU indications can differ from US (e.g. Onsior EU allows chronic musculoskeletal use; US label is
  ≤3 days). do not cross-apply indications between jurisdictions.

## .use

EU authorisation status and SmPC; fetch the PDF for verbatim indication/dosing/warnings.
