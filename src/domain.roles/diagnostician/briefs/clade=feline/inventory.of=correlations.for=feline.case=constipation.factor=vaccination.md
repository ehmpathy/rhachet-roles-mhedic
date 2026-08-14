# inventory.of=correlations.for=feline.case=constipation.factor=vaccination

> ⚠️ **not veterinary advice — informational only.** a signal-rank correlation map compiled from
> public sources; it does **not** diagnose and is **not a substitute** for a licensed veterinarian.
> **straining in the box can be a urinary blockage — an emergency, especially in males.** if a cat
> strains and passes little/no urine, call an emergency vet now.

## .what

correlates the exposure **routine vaccination** (the 1-yr checkup shots) against **each cause** in
`inventory.of=causes.for=feline.case=constipation/`. it answers: *if a cat is constipated after
vaccines, which cause is plausibly implicated, and how strongly?*

## .the frame (per `define.causal-chain-frame`)

```
cause:exposure = vaccination ──▶ cause:mechanism ──▶ effect:mechanism ──▶ effect:symptom = constipation
```

**headline:** there is **no direct vaccine→constipation pathway** in the veterinary literature.
vaccines correlate with constipation only **indirectly**, through the transient post-vaccinal
malaise → **reduced food/water intake and reduced activity**, which feed the dehydration and
reduced-motility causes. the correlation is **weak** and, when present, **self-limited (24–48 h)**.

## .the two-direction read (per `howto.disentangle-via-matrix`)

- **forward — P(constipation | vaccine):** **low.** most vaccinated cats are not constipated; the
  common post-vaccinal signs are soreness, mild fever, lethargy, reduced appetite — not stool change.
- **backtrack — P(vaccine | constipation):** **low–moderate as a *trigger*, not a *root*.** if a
  senior cat with background risk (CKD, arthritis, megacolon tendency) gets constipated right after
  a visit, the vaccine's malaise may be the *tipping* input on top of that standing cause.

## .correlation to each cause

| cause (pNN) | correlation to vaccination | mechanism / note |
|-------------|----------------------------|------------------|
| `p50.dehydration` | **indirect, weak** | post-vaccinal reduced drinking → mild dehydration |
| `p50.chronic-kidney-disease` | **modifier** | vaccine malaise adds a transient hit on top of standing CKD dehydration |
| `p50.pain-arthritis-posture` | **indirect** | injection-site soreness / general achiness → less movement, reluctance |
| `p50.megacolon-idiopathic` | **modifier only** | no causal link; malaise can unmask an existing hypomotile colon |
| `p20.obesity-inactivity` | **indirect** | post-shot lethargy → transient drop in activity |
| `p20.litterbox-stress-aversion` | **indirect** | the *visit* (not the vaccine) is the stressor → withholding |
| `p20.intraluminal-obstruction` | **none** | unrelated |
| `p20.pelvic-outflow-narrowing` | **none** | unrelated (structural) |
| `p10.electrolyte-endocrine` | **none** | unrelated |
| `p10.neurologic-spinal` | **none** | unrelated |
| `p10.drug-induced` | **n/a** | a vaccine is not on the constipating-drug list |
| `p10.idiopathic` | **catch-all** | if malaise resolves and stool normalizes, no cause is named |

## .the evidence

vaccine reactions are real but **mild and self-limited**, dominated by lethargy + reduced appetite
— the inputs to the *indirect* path, not constipation itself.

From [PetMD — Cat Vaccines: Most Common Reactions](https://www.petmd.com/cat/general-health/cat-vaccines-most-common-reactions):
> "Because vaccines activate the immune system, cats may have fever, shivering, and lethargy as their immune system makes antibodies against the virus."

> "If your cat just seems a little more tired and is eating less than usual, the veterinarian will likely tell you to see if your cat is back to normal the following day."

> "Many cats are more tired following shots, especially if multiple injections are given, but this generally clears up within a day or two."

the eating-less + moving-less this produces is the **only** plausible bridge to constipation, via
the dehydration / reduced-motility causes above. constipation is **not** itself a listed vaccine
reaction. (cross-ref the companion post-vaccinal symptom inventory:
`inventory.of=symptoms.for=feline.case=vaccines-felv-fvrcp-rabies/p50.appetite-loss.md`.)

## .the honest verdict

- **direct causation:** none documented.
- **indirect correlation:** weak, transient, via appetite/activity drop.
- **when to worry it's *not* the vaccine:** constipation lasting **>48 h**, or in a cat with
  background risk (senior, CKD, arthritis, prior constipation) → attribute to the **standing cause**,
  not the shot, and see the vet. association here is a *trigger* hypothesis for a clinician, never a
  verdict.

## .see also

- `inventory.of=causes.for=feline.case=constipation/readme.md` — the cause inventory this maps
- `inventory.of=symptoms.for=feline.case=vaccines-felv-fvrcp-rabies/` — the post-vaccinal symptom set
- `inventory.of=correlations.for=feline.case=constipation.factor=blood-draw.md` — the shared vet-visit-stress path
- `../../howto.disentangle-via-matrix.[lesson].md` · `../../define.causal-chain-frame.[lesson].md`

## .sources

all read through the bhrowser on 2026-08-11/12 (verbatim quotes above + inherited from the cause
inventory item files); distinct sources anchoring this brief's claims:

1. PetMD — Cat Vaccines: Most Common Reactions — https://www.petmd.com/cat/general-health/cat-vaccines-most-common-reactions
2. Merck Veterinary Manual — Constipation, Obstipation, and Megacolon — https://www.merckvetmanual.com/digestive-system/diseases-of-the-large-intestine-in-small-animals/constipation-obstipation-and-megacolon-in-small-animals
3. International Cat Care — Constipation in cats — https://icatcare.org/articles/constipation-in-cats
4. Cornell Feline Health Center — Constipation — https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/constipation
5. VCA Animal Hospitals — Constipation in Cats — https://vcahospitals.com/know-your-pet/constipation-in-cats
6. Today's Veterinary Practice — Management of GI Hypomotility — https://todaysveterinarypractice.com/gastroenterology/management-of-gastrointestinal-hypomotility-in-the-hospitalized-patient/
7. Washabau & Day, Canine and Feline Gastroenterology (PMC7152016) — https://pmc.ncbi.nlm.nih.gov/articles/PMC7152016/
