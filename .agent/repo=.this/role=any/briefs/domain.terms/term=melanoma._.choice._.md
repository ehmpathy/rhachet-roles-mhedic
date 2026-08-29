# domain.term: melanoma

term.chosen   = melanoma
term.kind     = noun
term.synonyms.forbidden:
- skin cancer (too broad — melanoma is one malignancy; basal-cell and squamous-cell carcinoma are others)
- mole (a mole is a benign nevus; melanoma is the malignancy it must be distinguished from — the exact conflation the skill guards against)
- melanoma cancer (redundant — melanoma is already a cancer)

## .what

a malignant tumor of melanocytes (the pigment cells of the skin). the specific cutaneous cancer that
`diagnose.melanoma` assesses a pigmented lesion for — ranked against the benign candidates (nevus,
dysplastic nevus, seborrheic keratosis, solar lentigo) and the other skin malignancies.

## .refs

- src/domain.roles/diagnostician/skills/diagnose.melanoma.sh
- src/domain.roles/diagnostician/skills/diagnose.melanoma/ (the route)

## .reason

see the ref-level cluster beside this choice:
- `term=melanoma._.choice.reason.md` — etymology, the rejected `skin cancer` / `mole`, evidence
