# inventory.of=correlations.for=feline.case=constipation.factor=robenacoxib-onsior

> ⚠️ **not veterinary advice — informational only.** a signal-rank correlation map compiled from
> public sources; it does **not** diagnose and is **not a substitute** for a licensed veterinarian.
> **straining in the box can be a urinary blockage — an emergency, especially in males.** if a cat
> strains and passes little/no urine, call an emergency vet now.

## .what

correlates the exposure **Onsior (robenacoxib, an NSAID)** against **each cause** in
`inventory.of=causes.for=feline.case=constipation/`.

> **naming note:** the user wrote "omnicor" — read here as **Onsior / robenacoxib**, the feline
> NSAID researched in `../../../prescriber/briefs/inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.*`.

## .the frame (per `define.causal-chain-frame`)

```
cause:exposure = Onsior (NSAID) ──▶ cause:mechanism ──▶ effect:mechanism ──▶ effect:symptom = constipation
```

**headline:** NSAIDs are **more classically associated with the *opposite*** — GI upset, soft
stool/diarrhea, vomiting — than with constipation. robenacoxib is **not** on Merck's list of
directly constipating drugs. so any Onsior→constipation link is **indirect**, via two of its
*documented* adverse effects: **appetite loss** and **dehydration/renal effects**. the correlation
is **weak-to-moderate and indirect**, and confounded.

## .the two indirect bridges (both from Onsior's own label/adverse profile)

1. **appetite loss → less stool bulk.** decreased appetite/anorexia is a listed Onsior adverse
   effect; eating less → less fecal bulk + slower transit.
2. **dehydration / renal effect → drier stool.** the label's post-approval signals include elevated
   BUN/creatinine and renal insufficiency; NSAID renal effects + reduced drinking → the dehydration
   cause (`p50.dehydration`), which dries stool.

## .the two-direction read (per `howto.disentangle-via-matrix`)

- **forward — P(constipation | Onsior):** **low.** Onsior's *own* trial data skews toward GI upset
  (vomiting, soft stool), not constipation.
- **backtrack — P(Onsior | constipation-on-Onsior):** **low–moderate, heavily confounded.** a cat
  on Onsior is usually **peri-operative or arthritic** — i.e. also fasted, stressed, opioid-co-medicated,
  dehydrated, and older. those co-exposures are stronger constipation drivers than the NSAID itself.

## .correlation to each cause

| cause (pNN) | correlation to Onsior | mechanism |
|-------------|-----------------------|-----------|
| `p50.dehydration` | **indirect, moderate** | NSAID renal effect + reduced drinking → drier stool |
| `p50.chronic-kidney-disease` | **modifier / caution** | Onsior's renal caution overlaps CKD; label flags CKD-risk cats |
| `p50.pain-arthritis-posture` | **indirect (the reason it's prescribed)** | the underlying arthritis is itself a constipation cause; Onsior treats the pain but the cat is already at risk |
| `p50.megacolon-idiopathic` | **modifier only** | no causal link; can co-occur in the same older cat |
| `p10.drug-induced` | **the node this maps to** | but NSAIDs act *indirectly* (appetite/dehydration), unlike opioids/anticholinergics which act directly |
| `p20.obesity-inactivity` | **indirect** | post-op reduced activity while on the drug |
| `p20.litterbox-stress-aversion` | **confound** | the peri-op stress, not the drug |
| `p20.intraluminal-obstruction` | **none** | unrelated |
| `p20.pelvic-outflow-narrowing` | **none** | unrelated |
| `p10.electrolyte-endocrine` | **none** | unrelated |
| `p10.neurologic-spinal` | **none** | unrelated |
| `p10.idiopathic` | **catch-all** | resolves off-drug → no cause named |

## .the evidence

**Onsior's documented adverse effects are the bridges** — from the
[FDA/DailyMed Onsior tablet label](https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=922d3235-085e-454f-9535-44ef4bca12f4) (Post-Approval Experience):
> "Anorexia, depression/ lethargy, vomiting, elevated BUN, elevated creatinine, renal insufficiency/ failure, diarrhea, weight loss, dehydration."

(note: the label lists **diarrhea**, *not* constipation — the direct GI effect runs the other way.
the constipation link rides on **anorexia + dehydration**, which are listed.)

**NSAIDs are not on the direct constipating-drug list** — from
[Merck Veterinary Manual](https://www.merckvetmanual.com/digestive-system/diseases-of-the-large-intestine-in-small-animals/constipation-obstipation-and-megacolon-in-small-animals):
> "Some drugs (eg, opioids, diuretics, antihistamines, anticholinergic agents, sucralfate, aluminum hydroxide, potassium bromide, and calcium channel blocking agents) promote constipation" — NSAIDs are **absent** from this list.

**the dehydration bridge** — from
[International Cat Care — Constipation in cats](https://icatcare.org/articles/constipation-in-cats):
> "if cats are dehydrated (or not drinking enough), they will try to reabsorb more fluid from the colon, resulting in dry and hard faeces."

**a lived-experience signal (hazard-tier, unverified)** — an owner report captured in the prescriber
social inventory describes exactly this indirect pattern (appetite loss + hard, dark stool on
Onsior, outlasting the course):
> "The Onsior had side effects. A lessening of appetite and very dry stool ... After the last dose of Onsior on December 1st, I expected the side effects to go away, but they haven't."
— [r/AskVet 1qj1kdb](https://old.reddit.com/r/AskVet/comments/1qj1kdb/onsior_side_effects_lingering_weeks_after_last/)
(see `../../../prescriber/briefs/inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.claims-social.md`).
**signal only** — one anecdote, heavily confounded (concurrent Solensia, prior Metacam, GI history).

## .the honest verdict

- **direct causation:** unlikely — Onsior's *direct* GI effect is diarrhea/soft stool, not constipation.
- **indirect correlation:** weak-to-moderate, via **appetite loss + dehydration** (both label-listed).
- **confounding is the dominant caveat:** cats on Onsior are peri-op/arthritic and thus co-exposed
  to fasting, opioids, stress, and age — stronger drivers than the NSAID. **do not attribute
  constipation to Onsior without ruling those out.**
- **watch item:** the label already says **stop Onsior if appetite decreases** — the same appetite
  drop that bridges to constipation is itself a stop-signal. and **"dark … stool"** needs the melena
  rule-out (possible GI bleed) — see the prescriber adverse-effects brief.

## .see also

- `inventory.of=causes.for=feline.case=constipation/readme.md` — esp. `p10.drug-induced.md`, `p50.dehydration.md`
- `../../../prescriber/briefs/inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.claims-official.adverse.md`
- `../../../prescriber/briefs/inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.claims-social.md`
- `../../howto.disentangle-via-matrix.[lesson].md` · `../../define.causal-chain-frame.[lesson].md`

## .sources

all read through the bhrowser (verbatim quotes above); 7 distinct sources:

1. FDA/DailyMed — Onsior (robenacoxib) tablet label — https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=922d3235-085e-454f-9535-44ef4bca12f4
2. Merck Veterinary Manual — Constipation, Obstipation, and Megacolon — https://www.merckvetmanual.com/digestive-system/diseases-of-the-large-intestine-in-small-animals/constipation-obstipation-and-megacolon-in-small-animals
3. International Cat Care — Constipation in cats — https://icatcare.org/articles/constipation-in-cats
4. Cornell Feline Health Center — Constipation — https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/constipation
5. VCA Animal Hospitals — Constipation in Cats — https://vcahospitals.com/know-your-pet/constipation-in-cats
6. Washabau & Day, Canine and Feline Gastroenterology (PMC7152016) — https://pmc.ncbi.nlm.nih.gov/articles/PMC7152016/
7. r/AskVet 1qj1kdb (owner anecdote — hazard-signal tier, unverified) — https://old.reddit.com/r/AskVet/comments/1qj1kdb/onsior_side_effects_lingering_weeks_after_last/
