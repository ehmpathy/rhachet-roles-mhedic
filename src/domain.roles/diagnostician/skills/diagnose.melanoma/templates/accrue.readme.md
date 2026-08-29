# accrue/ — reusable cited facts

this dir holds **generic, case-neutral, cited facts**, per `rule.require.accrue-research`.

## .the compiled-route model

`diagnose.melanoma` is a **compiled** route (`rule.require.amortize-known-domain-research`): its core
thresholds — ABCDE sensitivity/specificity, dermoscopy cutoffs (ABCD-rule > 4.75, 7-point-checklist ≥ 3),
the biopsy rule-out, the classifier limits — are researched **once at build time** and live in the
diagnostician role-leaf inventory `src/domain.roles/diagnostician/briefs/inventory/inventory.of=melanoma-*.md`
(single-role facts, per `rule.require.accrue-research`). the runtime route **applies** those pre-cited
thresholds; it does not re-discover them per case.

so this per-route `accrue/` holds only **case-incidental** citations the route gathers at runtime — a
source consulted for this specific lesion that is not already in the build-time inventory.

## .the split

- the **case yield** keeps the applied, patient-specific interpretation (obscure tier)
- **`accrue/inventory.of=<topic>.md`** keeps a shareable fact (fullsun tier), stated with no patient in it

## .what each entry carries

1. the generic fact, case-neutral ("melanoma-specific ABCDE sensitivity ~X% per <study>")
2. the citation — bhrowser source + verbatim quote + URL/PMID
3. the retrieval date
4. the topic scope (what class of case it serves)

## .the build-time inventory this route stands on

- ABCDE rule sensitivity/specificity for melanoma detection
- dermoscopy algorithm accuracy + cutoffs (ABCD-rule, seven-point checklist)
- biopsy / excision / referral thresholds (excisional biopsy for any suspicious lesion; the outlier sign)
- phone / AI melanoma-classifier accuracy + regulatory status (change-detector, not a classifier to trust)
- teledermatology diagnostic concordance for pigmented lesions (the hard case)
- pigmented-lesion base rates by candidate (nevus, dysplastic nevus, seborrheic keratosis, lentigo, carcinoma)

## .promote

when the route completes, promote any proven-generic per-route entry to its most-common-denominator
home (per `rule.require.accrue-research`): a diagnostician-owned fact → the diagnostician role leaf
`src/domain.roles/diagnostician/briefs/inventory/`; a genuinely cross-role fact → the repo-shared
`.agent/repo=.this/role=any/briefs/inventory/`. `accrue/` is the cheap per-route hold; the promoted
inventory is the curated cross-case home.
