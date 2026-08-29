# inventory.of=dermoscopy-algorithms

- **topic**: validated dermoscopy algorithms for melanoma — the INDEX over the per-algorithm cells, plus the shared facts that compare them
- **scope**: HUMAN pigmented-lesion diagnosis; case-neutral facts for a pre-compiled route
- **disclaimer**: informational only; not medical advice
- **retrieval date**: 2026-08-14 (all facts below)
- **bhrowser**: confirmed operational (headful, session mhedic-dermo)
- **primary source**: cochrane systematic review (Dinnes 2018), PMC6517096, 103 cohorts, 42,788 lesions, 5700 cases
- **decomposition**: this file is the thin INDEX; each algorithm is a cell (axis = which algorithm), per `rule.require.inventory-dimensional-decomposition`

## .cells (one per algorithm)

- `inventory.of=dermoscopy-algorithms.case=abcd-rule.md` — ABCD-rule-of-dermoscopy (Stolz): > 4.75 → 0.81/0.72 (image); > 5.45 → 0.78/0.93 (in-person)
- `inventory.of=dermoscopy-algorithms.case=7-point-checklist.md` — 7PCL at >= 3 → 0.80/0.67 (image)
- `inventory.of=dermoscopy-algorithms.case=3-point-checklist.md` — 3PCL at >= 2 → 0.74/0.60 (image)
- `inventory.of=dermoscopy-algorithms.case=menzies.md` — Menzies original criteria → 0.78/0.63
- `inventory.of=dermoscopy-algorithms.case=7ffm.md` — seven-features-for-melanoma → 0.89/0.84

## .facts (shared — these compare the cells and belong to no single algorithm)

### fact: dermoscopy plus visual inspection beats visual inspection alone

- **fact**: for in-person evaluation, at a fixed specificity of 80% the predicted sensitivity was 92% for dermoscopy + visual inspection versus 76% for visual inspection alone (a 16% gain); dermoscopy was more accurate than visual inspection alone (RDOR 4.7).
- **verbatim**: "the predicted difference in sensitivity at a fixed specificity of 80% was 16% (95% CI 8% to 23%; 92% for dermoscopy + visual inspection versus 76% for visual inspection)"
- **url**: https://pmc.ncbi.nlm.nih.gov/articles/PMC6517096/
- **tier**: peer-reviewed (cochrane systematic review)

### fact: no single named algorithm proved superior; expertise matters more

- **fact**: use of a named or published algorithm (versus no algorithm or pattern analysis) had no significant impact on accuracy for in-person or image-based reads; higher accuracy tied to observer experience.
- **verbatim**: "The use of a named or published algorithm to assist dermoscopy interpretation ... had no significant impact on accuracy either for in‐person (RDOR 1.4, 95% CI 0.34 to 5.6; P = 0.17), or image‐based (RDOR 1.4, 95% CI 0.60 to 3.3; P = 0.22), evaluations."
- **url**: https://pmc.ncbi.nlm.nih.gov/articles/PMC6517096/
- **tier**: peer-reviewed (cochrane systematic review)

### fact: authors' conclusion on the role of dermoscopy and algorithms

- **fact**: dermoscopy is a valuable adjunct to visual inspection, especially in referred populations and experienced hands; formal algorithms may be of most use as a training aid and for less-expert observers.
- **verbatim**: "dermoscopy is a valuable tool to support the visual inspection of a suspicious skin lesion ... Formal algorithms may be of most use for dermoscopy training purposes and for less expert observers"
- **url**: https://pmc.ncbi.nlm.nih.gov/articles/PMC6517096/
- **tier**: peer-reviewed (cochrane systematic review)
