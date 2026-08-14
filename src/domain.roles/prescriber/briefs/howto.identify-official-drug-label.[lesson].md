# howto.identify-official-drug-label

> **recommendation disclaimer.** this howto is offered to the best of our knowledge from the
> sources found; it carries **no guarantee** and must be checked by a licensed professional
> (here, a veterinarian/pharmacist and, for regulatory questions, the FDA/EMA source itself)
> against the real product and current approval before reliance. it is groundwork, not a sign-off.
> ⚠️ **not veterinary/medical advice — informational only.**

## .what

how to find, recognize, and rank the **official product declaration** for a drug — the primary
source that a drug-safety brief should rest on — and how to tell it apart from secondary and
tertiary sources.

the "product declaration" is the **regulator-approved label** (a.k.a. package insert / prescribing
information). in the US this is the **FDA Structured Product Labeling (SPL)**; in the EU it is the
**Summary of Product Characteristics (SmPC)** inside the EMA EPAR.

## .the trust hierarchy (most → least authoritative)

### tier 1 — official regulator-approved label (the product declaration)

**US — FDA SPL, published on DailyMed.** From
[DailyMed – About](https://dailymed.nlm.nih.gov/dailymed/about-dailymed.cfm):
> "The DailyMed database contains labeling, submitted to the Food and Drug Administration (FDA) by companies ... Prescription and nonprescription drugs for animal use ... The labeling on DailyMed is the most recent submitted labeling to the FDA by companies and currently in use".

What SPL *is* — from [FDA – Structured Product Labeling Resources](https://www.fda.gov/industry/fda-data-standards-advisory-board/structured-product-labeling-resources):
> "The Structured Product Labeling (SPL) is a document markup standard approved by Health Level Seven (HL7) and adopted by FDA as a mechanism for exchanging product and facility information."

How to recognize the real label — it names the **regulatory application number, sponsor/labeler,
and Rx restriction**. From the [cached Onsior tablet label](./citations/onsior-tablets.fda-dailymed.2026-08-08.txt) (source: [DailyMed SPL](https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=922d3235-085e-454f-9535-44ef4bca12f4)):
> "Marketing Category ... NADA ... NADA141320 ... Labeler - Elanco US Inc." and "Federal law restricts this drug to use by or on the order of a licensed veterinarian."

**EU — EMA SmPC / EPAR.** From [EMA – Onsior](https://www.ema.europa.eu/en/medicines/veterinary/EPAR/onsior):
> "Authorised — This medicine is authorised for use in the European Union — robenacoxib" with an "Onsior : EPAR - Product Information" document.

> ⚠️ **critical caveat.** DailyMed hosts the *in-use* label, not necessarily the *latest
> FDA-approved* one. From [DailyMed – About](https://dailymed.nlm.nih.gov/dailymed/about-dailymed.cfm):
> > "The 'in use' labeling on DailyMed may not be identical to the most recent FDA-approved labeling available at Drugs@FDA ... The contents of the 'in use' labeling on DailyMed may not have been verified by FDA. Note: NLM does not review any SPL content prior to publication."
>
> so DailyMed is the *accessible, quotable* declaration; for the **authoritative record of
> approval**, cross-check **Drugs@FDA** (human) / **Animal Drugs @ FDA** (veterinary).

### tier 2 — regulatory approval records & peer-reviewed evidence

Approval history / bioequivalence — from
[FDA CVM Update (Jan 2026)](https://www.fda.gov/animal-veterinary/cvm-updates/fda-approves-first-generic-robenacoxib-tablet-postoperative-pain-inflammation-cats):
> "Robenacoxib tablets contain the same active ingredient (robenacoxib) as the approved brand name drug product, Onsior, which was first approved in 2011. The FDA determined that Robencoxib tablets are bioequivalent to the brand name product."

Peer-reviewed literature (mechanism, efficacy, safety) — e.g.
[Lees et al. 2022, *J Vet Pharmacol Ther* (PMC9541287)](https://pmc.ncbi.nlm.nih.gov/articles/PMC9541287/):
> "Robenacoxib is a veterinary‐approved non‐steroidal anti‐inflammatory drug (NSAID) of the coxib group."

### tier 3 — manufacturer & professional/client-education pages

Useful for orientation, **not** a primary citation. Manufacturer (promotional) — from
[Elanco Onsior page](https://my.elanco.com/us/onsior):
> "The No.1 prescribed feline NSAID".

Client-education (secondary/tertiary) — from [VCA Animal Hospitals](https://vcahospitals.com/know-your-pet/robenacoxib), which states its own non-primary status:
> "This content ... has not been reviewed by the FDA's Center for Veterinary Medicine ... This content is not a substitute for medical advice".

## .procedure

1. **discover** the candidate label URL (a search may discover; a snippet is never a citation).
2. reach it through the **bhrowser** (never WebFetch/WebSearch) — per `rule.require.bhrowser-citations`.
3. **confirm it is the declaration**: look for regulator (FDA/EMA), application number
   (NADA/ANADA/NDA/ANDA/EMEA-V), sponsor/labeler, and the Rx-restriction statement.
4. **cross-check approval** at Drugs@FDA / Animal Drugs @ FDA (DailyMed is in-use, not verified).
5. **cache** the source next to the brief (see `./citations/`) so the quote survives URL decay.
6. **inventory** the source in the trusted-source ledger — per `rule.require.source-inventory`.
7. quote **verbatim**; rank the claim by its tier; prefer tier 1 for any safety-critical statement.

## .see also

- [inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.claims-official.safety](./inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.claims-official.safety.md) — worked example resting on the tier-1 label
- [./citations/readme.md](./citations/readme.md) — the cached primary source, as a demo
- `../../../.agent/repo=.this/role=any/briefs/rule.require.source-inventory.[rule].md` — inventory rule
- `../../../.agent/repo=.this/role=any/briefs/ref.trusted-sources.medical.[ref].md` — the trust/avoid ledger
- `../../../.agent/repo=.this/role=any/briefs/rule.require.bhrowser-citations.[rule].md`

## .sources

all read through the bhrowser on 2026-08-08 (verbatim quotes above); each illustrates a distinct tier:

1. DailyMed – About (defines the in-use/official distinction) — https://dailymed.nlm.nih.gov/dailymed/about-dailymed.cfm
2. FDA – Structured Product Labeling Resources (defines SPL) — https://www.fda.gov/industry/fda-data-standards-advisory-board/structured-product-labeling-resources
3. FDA/DailyMed Onsior tablet label (the declaration itself) — https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=922d3235-085e-454f-9535-44ef4bca12f4
4. EMA – Onsior EPAR (EU SmPC declaration) — https://www.ema.europa.eu/en/medicines/veterinary/EPAR/onsior
5. FDA CVM Update, first generic robenacoxib (approval record) — https://www.fda.gov/animal-veterinary/cvm-updates/fda-approves-first-generic-robenacoxib-tablet-postoperative-pain-inflammation-cats
6. Lees et al. 2022, peer-reviewed review, PMC9541287 — https://pmc.ncbi.nlm.nih.gov/articles/PMC9541287/
7. Elanco Onsior product page (manufacturer tier) — https://my.elanco.com/us/onsior
8. VCA Animal Hospitals (client-education tier) — https://vcahospitals.com/know-your-pet/robenacoxib
