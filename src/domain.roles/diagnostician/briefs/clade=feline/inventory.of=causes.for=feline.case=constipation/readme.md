# inventory.of=causes.for=feline.case=constipation

> ⚠️ **not veterinary advice — informational only.** a differential inventory compiled from public
> veterinary sources; it does not diagnose and is **not a substitute** for a licensed veterinarian
> who has examined your cat. **straining in the litter box can be a urinary blockage — a true
> emergency, especially in males. if a cat strains repeatedly and passes little/no urine, call an
> emergency vet now.**

## .what

the **causes inventory** for the effect **feline constipation** — infrequent or difficult passage
of hard, dry feces. **one file per cause**, each fitted with its **probability bucket** (how
commonly that cause explains feline constipation) and its **mechanism** on the causal chain.

this is the `effect:symptom = constipation` node's cause-side map. it is the inventory the three
**correlation** briefs (vaccine / blood-draw / robenacoxib-onsior → constipation) attribute against.

## .the causal-chain frame (per `define.causal-chain-frame`)

```
cause:exposure ──▶ cause:mechanism ──▶ effect:mechanism ──▶ effect:symptom
   (the lever)      (how it acts)       (the colon state)     = constipation
```

most feline constipation converges on **one final effect:mechanism** — *the colon reabsorbs too
much water from feces held too long → dry, hard, hard-to-pass stool*. the many causes below are
different **entry points** into that same funnel. that convergence is why the correlation briefs
can share intermediate mechanisms (dehydration, reduced intake, reduced motility, reluctance).

## .the file-name scheme — `pNN.$slug.md`

each cause is its own file named **`pNN.$slug.md`**, where **`pNN` is an ordinal likelihood
bucket** (two-digit) for *how commonly this cause is behind feline constipation* — **not** a
measured rate:

| bucket | band | rough sense |
|--------|------|-------------|
| **p50** | common | a frequent, well-documented driver |
| **p20** | intermittent | a real but less-frequent driver |
| **p10** | uncommon | happens, but not the usual case |

**`pNN` is ordinal, not a measured frequency.** the literature calls most feline megacolon
**idiopathic** and rarely quantifies per-cause shares, so these buckets rank plausibility from the
sources' language ("most common," "at increased risk," "can predispose"), not epidemiology.

## .the causes (this dir)

| file | cause | causal-chain mechanism |
|------|-------|------------------------|
| `p50.dehydration.md` | dehydration / low water intake | colon over-reabsorbs water → dry hard stool |
| `p50.megacolon-idiopathic.md` | idiopathic megacolon (colonic hypomotility) | neuromuscular colon fails to propel |
| `p50.chronic-kidney-disease.md` | chronic kidney disease | polyuria → chronic mild dehydration |
| `p50.pain-arthritis-posture.md` | pain / arthritis / painful posture | reluctance to squat & defecate |
| `p20.intraluminal-obstruction.md` | hair, bone, litter, foreign material | firm indigestible matter impacts |
| `p20.litterbox-stress-aversion.md` | dirty box, stress, box competition | reluctance to defecate → retention |
| `p20.pelvic-outflow-narrowing.md` | healed pelvic fracture, mass, stricture, hernia | extraluminal narrowing blocks passage |
| `p20.obesity-inactivity.md` | obesity / lack of exercise / older | poor colonic muscle contraction |
| `p10.electrolyte-endocrine.md` | hypokalemia, hypercalcemia, hypothyroid, dysautonomia | disturbed neuromuscular colonic control |
| `p10.neurologic-spinal.md` | Manx sacral defect, spinal/pelvic-nerve lesion | lost colonic/rectal innervation |
| `p10.drug-induced.md` | opioids, diuretics, anticholinergics, antihistamines, etc. | drug-slowed motility / dehydration |
| `p10.idiopathic.md` | undetermined cause | cause not found after workup |

## .see also

- `../../define.causal-chain-frame.[lesson].md` — the four-node frame this instantiates
- `../../howto.disentangle-via-matrix.[lesson].md` — how the correlation briefs attribute exposures
- `../inventory.of=correlations.for=feline.case=constipation.factor=vaccination.md`
- `../inventory.of=correlations.for=feline.case=constipation.factor=blood-draw.md`
- `../inventory.of=correlations.for=feline.case=constipation.factor=robenacoxib-onsior.md`
- `../../../../../.agent/repo=.this/role=any/briefs/rule.require.bhrowser-citations.[rule].md`

## .sources

all read through the bhrowser on 2026-08-11/12 (verbatim quotes in the item files); 7 distinct sources:

1. Merck Veterinary Manual — Constipation, Obstipation, and Megacolon in Small Animals — https://www.merckvetmanual.com/digestive-system/diseases-of-the-large-intestine-in-small-animals/constipation-obstipation-and-megacolon-in-small-animals
2. Cornell Feline Health Center — Constipation — https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/constipation
3. International Cat Care — Constipation in cats — https://icatcare.org/articles/constipation-in-cats
4. VCA Animal Hospitals — Constipation in Cats — https://vcahospitals.com/know-your-pet/constipation-in-cats
5. MSPCA-Angell — Feline Megacolon and Deobstipation — https://www.mspca.org/clinical/feline-megacolon-and-deobstipation/
6. Catwatch Newsletter (Cornell) — From Constipation to Megacolon — https://www.catwatchnewsletter.com/health/medicine/from-constipation-to-megacolon/
7. Washabau & Day, *Canine and Feline Gastroenterology* (2012), Large Intestine — https://pmc.ncbi.nlm.nih.gov/articles/PMC7152016/
