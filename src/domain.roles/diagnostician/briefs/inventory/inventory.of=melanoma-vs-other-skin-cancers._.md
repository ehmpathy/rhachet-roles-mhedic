# inventory.of=melanoma-vs-other-skin-cancers

- **topic**: how melanoma differs from the other skin cancers — the INDEX over the per-cancer cells, plus the shared facts that compare them (the taxonomy, the frequency-vs-lethality inversion, the comparison table)
- **scope**: HUMAN skin-cancer differentiation; case-neutral facts to complement the pigmented-lesion differential (which covers melanoma vs benign mimics; this covers melanoma vs the other malignancies)
- **disclaimer**: informational only; not medical advice. consult a licensed clinician for any skin lesion. if a lesion is bleeding, ulcerated, or changing fast, seek care promptly.
- **retrieval date**: 2026-08-18 (all facts below)
- **bhrowser**: confirmed operational (headful, session mhedic-skincancer)
- **decomposition**: this file is the thin INDEX; each cancer is a cell (axis = which cancer), per `rule.require.inventory-dimensional-decomposition`

## .cells (one per cancer)

- `inventory.of=melanoma-vs-other-skin-cancers.case=melanoma.md` — melanoma: ~112k US cases/yr, ~8,510 deaths; subtypes; survival >99% → 35%; ugly-duckling + amelanotic + hidden-site pitfalls
- `inventory.of=melanoma-vs-other-skin-cancers.case=bcc.md` — basal cell: ~80% of skin cancers, slow, rarely metastasizes; pearly/shiny bump
- `inventory.of=melanoma-vs-other-skin-cancers.case=scc.md` — squamous cell: ~20%, more likely than BCC to spread; rough/scaly patch or non-healing sore
- `inventory.of=melanoma-vs-other-skin-cancers.case=mcc.md` — Merkel cell: ~3k US cases/yr, very high danger; survival 79% → 31%; fast-growing firm painless lump

## .facts — the taxonomy: melanoma vs non-melanoma (shared)

### fact: melanoma is less common but more invasive than BCC/SCC

- **fact**: BCC and SCC are the most common skin cancers, together called "nonmelanoma skin cancer"; melanoma is less common but more likely to invade nearby tissue and spread to other parts of the body.
- **verbatim**: "Basal cell carcinoma and squamous cell carcinoma are the most common types of skin cancer. They are also called nonmelanoma skin cancer. Actinic keratosis is a skin condition that sometimes becomes squamous cell carcinoma. Melanoma is less common than basal cell carcinoma or squamous cell carcinoma. It is more likely to invade nearby tissues and spread to other parts of the body."
- **url**: https://www.cancer.gov/types/skin/patient/skin-treatment-pdq
- **tier**: regulator/government (NCI PDQ, patient version)

### fact: the three epidermal cell types map to the three common cancers

- **fact**: the epidermis holds squamous cells, basal cells, and melanocytes; cancers arising from each are squamous cell carcinoma, basal cell carcinoma, and melanoma respectively.
- **verbatim**: "Squamous cells: Thin, flat cells that form the top layer of the epidermis. Basal cells: Round cells under the squamous cells. Melanocytes: Cells that make melanin and are found in the lower part of the epidermis."
- **url**: https://www.cancer.gov/types/skin/patient/skin-treatment-pdq
- **tier**: regulator/government (NCI PDQ, patient version)

## .facts — the frequency-vs-lethality inversion (the key insight; shared)

### fact: melanoma is ~1% of skin cancers but causes the majority of skin-cancer deaths

- **fact**: melanoma accounts for only about 1% of skin cancers but causes a large majority of skin cancer deaths.
- **verbatim**: "Cancer of the skin is by far the most common of all cancers in the United States. Melanoma accounts for only about 1% of skin cancers but causes a large majority of skin cancer deaths."
- **url**: https://www.cancer.org/cancer/types/melanoma-skin-cancer/about/key-statistics.html
- **tier**: professional (American Cancer Society)

### fact: BCC/SCC incidence dwarfs melanoma but their deaths are far fewer

- **fact**: about 5.4 million BCC/SCC are diagnosed each year in the US (in about 3.3 million people, since some have more than one), about 8 of 10 being BCC; deaths from these are estimated at only about 2,000 to 8,000 per year, mostly from SCC.
- **verbatim**: "about 5.4 million basal and squamous cell skin cancers are diagnosed each year in the US (occurring in about 3.3 million people, as some people have more than one). About 8 out of 10 of these are basal cell cancers. ... Although basal and squamous cell skin cancers are common, deaths from these cancers are not. For the US, estimates have ranged from about 2,000 to about 8,000 people each year (mostly from squamous cell skin cancer)."
- **url**: https://www.cancer.org/cancer/types/basal-and-squamous-cell-skin-cancer/about/key-statistics.html
- **tier**: professional (American Cancer Society)

> the inversion in one line: BCC/SCC ≈ 5.4M cases/yr → ~2,000–8,000 deaths; melanoma ≈ 112k cases/yr → ~8,510 deaths. melanoma is ~50× rarer than nonmelanoma skin cancer yet causes comparable-or-greater absolute mortality — hence "1% of cases, majority of deaths."

## .the comparison table (synthesized from the cited facts in the cells above)

| cancer | share of skin cancers | US cases/yr | metastatic risk | typical look | 5-yr survival (localized → distant) | danger |
|--------|----------------------|-------------|-----------------|--------------|-------------------------------------|--------|
| basal cell (BCC) | ~80% (8 of 10) | ~4.3M (of 5.4M BCC+SCC) | very rare | pearly/shiny bump or scaly patch; scabs, bleeds | not registry-tracked; deaths very rare | low; local invasion if untreated |
| squamous cell (SCC) | ~20% (2 of 10) | ~1.1M (of 5.4M BCC+SCC) | more than BCC | rough scaly patch, dome growth, non-healing sore | not registry-tracked; most of the ~2–8k deaths | moderate; can spread |
| melanoma | ~1% | ~112k | high if not caught early | changing/new dark spot; ABCDE; ugly-duckling; some don't fit rules | >99% → 35% (95% all) | high; ~majority of skin-cancer deaths |
| Merkel cell (MCC) | rare (<1% grouping) | ~3k | very high | fast-growing firm pink/red/purple painless lump | 79% → 31% (69% all) | very high; one of the most dangerous |

> the survival column drives the whole tool's thesis home: melanoma caught **localized is >99% survivable but falls to 35% once distant** — a ~65-point swing that is exactly what early detection buys. MCC is worse at every stage (79% even localized), which is why a fast-growing painless lump is not a "watch" item.

## .gaps

- BCC/SCC 5-year survival is intentionally blank in the table: per the ACS BCC/SCC statistics source, these cancers are **not reported to cancer registries**, so SEER stage-survival figures do not exist for them (the ~2,000–8,000 annual deaths estimate is the only mortality anchor). this is a data-availability fact, not a research omission.
- the per-cancer case split (BCC ~4.3M / SCC ~1.1M) is derived from the ACS "~8 of 10 are BCC" ratio applied to the 5.4M total — a synthesis, not a directly-quoted figure.
- a dermoscopy-level feature comparison (BCC arborizing vessels vs melanoma pigment network vs SCC keratin) is out of scope here; see `inventory.of=dermoscopy-algorithms._.md` for the melanoma side.

## .sources (11 distinct, each bhrowser-read + quoted verbatim across the index + cells)

1. https://www.cancer.gov/types/skin/patient/skin-treatment-pdq — NCI PDQ, skin cancer treatment (patient)
2. https://www.cancer.org/cancer/types/basal-and-squamous-cell-skin-cancer/about/what-is-basal-and-squamous-cell.html — ACS, what are BCC/SCC
3. https://www.cancer.org/cancer/types/basal-and-squamous-cell-skin-cancer/about/key-statistics.html — ACS, BCC/SCC key statistics
4. https://www.cancer.org/cancer/types/merkel-cell-skin-cancer/about/what-is-merkel-cell-carcinoma.html — ACS (ASCO-reviewed), what is MCC
5. https://www.cancer.org/cancer/types/melanoma-skin-cancer/about/what-is-melanoma.html — ACS, what is melanoma
6. https://www.cancer.org/cancer/types/melanoma-skin-cancer/about/key-statistics.html — ACS, melanoma key statistics
7. https://www.aad.org/public/diseases/skin-cancer/types/common — AAD, types of skin cancer
8. https://www.cancer.org/cancer/types/merkel-cell-skin-cancer/about/key-statistics.html — ACS (ASCO-reviewed), MCC key statistics
9. https://www.cancer.org/cancer/types/melanoma-skin-cancer/detection-diagnosis-staging/survival-rates-for-melanoma-skin-cancer-by-stage.html — ACS, melanoma 5-yr survival by SEER stage
10. https://www.cancer.org/cancer/types/merkel-cell-skin-cancer/detection-diagnosis-staging/survival-rates.html — ACS (ASCO-reviewed), MCC 5-yr survival by SEER stage
11. https://www.cancer.org/cancer/types/melanoma-skin-cancer/detection-diagnosis-staging/signs-and-symptoms.html — ACS, melanoma signs (ugly-duckling, amelanotic, hidden)
