# domain.term.choice.reason: melanoma

## .etymology

from greek *melas* (black) + *-oma* (tumor) — the black tumor, named for the dark pigment melanocytes
produce. the standard medical term for the malignancy of the pigment cell; a domain expert recognizes
it with no gloss.

## .disputes

### dispute: skin cancer — raised 2026-08-14 — status: RESOLVED (keep `melanoma`)
- raised.by  = mechanic
- claim      = "skin cancer" is the lay phrase the patient would say.
- counter    = "skin cancer" is the *category* — it also covers basal-cell and squamous-cell carcinoma,
               which the route enumerates as *distinct* candidates. to name the skill's target "skin
               cancer" would blur the one malignancy it is tuned for (melanoma) with the others. the
               patient-read output layer may say "skin cancer" in prose; the contract term is
               `melanoma`.
- resolution = keep `melanoma`; record `skin cancer` as a forbidden synonym.

### dispute: mole — raised 2026-08-14 — status: RESOLVED (keep `melanoma`)
- raised.by  = mechanic
- claim      = the wish itself says "moles vs melanoma", so "mole" is the human's word.
- counter    = that phrase is precisely the *contrast* — a mole (benign nevus) is what melanoma is
               distinguished FROM. to use `mole` for the malignancy would collapse the benign/malignant
               distinction the whole skill exists to draw. `mole`/`nevus` names the benign candidate;
               `melanoma` names the malignancy.
- resolution = keep `melanoma`; record `mole` as a forbidden synonym (for the malignancy sense).

## .evidence

- discovery: the pigmented-lesion differential (melanoma vs benign nevus vs dysplastic nevus vs
  seborrheic keratosis vs solar lentigo vs basal-cell / squamous-cell carcinoma) is a closed, textbook
  candidate set — melanoma is one named member, not the category. cited inventory accrues under
  `.agent/repo=.this/role=any/briefs/inventory/`.
- the skill's binary acuity (emergency-now vs see-a-clinician-soon) and can't-miss discipline exist
  because melanoma is the malignant member whose miss is the asymmetric cost.
