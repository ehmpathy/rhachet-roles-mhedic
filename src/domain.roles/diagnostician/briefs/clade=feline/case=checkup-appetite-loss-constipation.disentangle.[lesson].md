# case=checkup-appetite-loss-constipation.disentangle

> ⚠️ **not veterinary advice — informational only.** a worked disentanglement of a presented case,
> to exercise the diagnostician frame. it does **not** diagnose and is **not a substitute** for a
> licensed veterinarian who has examined the cat. **straining in the box can be a urinary blockage —
> an emergency, especially in males. if the cat strains and passes little/no urine, call an emergency
> vet now.**

## .what

a worked application of `howto.disentangle-via-matrix` + `define.causal-chain-frame` to a real
presented case: **constipation after a routine 1-yr checkup, with confirmed appetite loss.** it
shows how the confirmed appetite-loss datum re-ranks the exposures.

## .the intake (the case)

| field | value |
|-------|-------|
| effect:symptom | constipation (hard, infrequent stool) |
| timing | after a routine annual checkup |
| cause:exposures present | **vaccination**, **blood draw / vet-visit stack**, possibly **Onsior** (if sent home on it) |
| **key confirmed datum** | **appetite loss occurred** |
| **follow-up datum** | **appetite has since returned** (self-resolved within the expected window) |
| background (unknown/partial) | age, arthritis, CKD, prior constipation — not confirmed |

## .the frame

```
cause:exposure ──▶ cause:mechanism ──▶ effect:mechanism ──▶ effect:symptom = constipation
```

the three candidate exposures each have a correlation brief already:
- `inventory.of=correlations.for=feline.case=constipation.factor=vaccination.md`
- `inventory.of=correlations.for=feline.case=constipation.factor=blood-draw.md`
- `inventory.of=correlations.for=feline.case=constipation.factor=robenacoxib-onsior.md`

## .the pivot — appetite loss is the shared node

the confirmed datum is decisive because **appetite loss is the common bridge** all three exposures
constipate *through*:

```
                       ┌── vaccination (malaise) ──┐
                       │                            │
                       ├── blood-draw stack ────────┼──▶  APPETITE LOSS  ──▶  reduced food + water intake
                       │   (stress + fasting)       │      (CONFIRMED)         │
                       └── Onsior (anorexia AE) ─────┘                         ▼
                                                                       mild dehydration
                                                                              │
                                                                              ▼
                                                          colon over-reabsorbs water from held stool
                                                                              │
                                                                              ▼
                                                                    dry, hard stool → constipation
```

so we do **not** need to pick a single exposure to explain the mechanism — the mechanism is settled:
**reduced intake → dehydration → dry stool** (`p50.dehydration`). the exposures compete only for *how
much each contributed to the appetite loss.*

## .the disentangle (both directions)

**forward — P(constipation | exposure):** low for each alone; but the case already sits *past* that
gate because the intermediate node (appetite loss) is **observed**, not hypothesized.

**backtrack — P(exposure | this constipation), given appetite loss confirmed:**

| exposure | weight | why |
|----------|--------|-----|
| **blood-draw / visit stack** | **highest** | stress + fasting is the strongest documented driver of appetite loss *and* dehydration; it *produced* the confirmed datum |
| **vaccination** | **moderate** | post-vaccinal malaise commonly causes exactly this transient appetite drop |
| **Onsior** (if on board) | **moderate, compounding** | shares the same anorexia+dehydration bridges — *adds to* rather than competes with the visit effect |
| standing cause (age/arthritis/CKD) | **amplifier** | lowers the threshold; doesn't start it |

note the three exposures are **not mutually exclusive** — they **stack**. the honest output is not
"which one" but "a **convergent reduced-intake hit**, led by the visit, with vaccine + any Onsior
compounding."

## .the verdict (most likely, for this case)

> **most likely: transient reduced-intake / dehydration constipation**, driven by the confirmed
> appetite loss from the checkup stack (visit-stress + fasting lead; vaccine malaise and — if
> present — Onsior compound it). the standing-risk factors, if any, amplify it.

**why this ranks first:** fewest assumptions, every link documented, and the pivotal node (appetite
loss) is **confirmed**, not inferred.

### .confirmed by resolution (appetite returned)

the appetite has since **come back on its own** — this is a strong confirmatory signal, not a
neutral update. it does two things:

- **confirms the transient-malaise mechanism.** a self-limited appetite dip that resolves in the
  expected window (24–48 h band) is exactly the signature of the visit/vaccine reduced-intake path,
  **not** of a standing pathology (CKD, megacolon, obstruction) which would persist or worsen.
- **retires the escalation branch.** the "appetite not back by ~48 h → escalate / suspect standing
  cause" row below is **not triggered** — the case followed the benign trajectory.

**revised verdict:** a **resolved, transient reduced-intake constipation** — the appetite loss was
the driver, and its resolution should let hydration and stool normalize. remaining watch: confirm
the **stool** itself normalizes over the next day or two; the hard flags (urinary straining, dark
stool, or a *relapse* of appetite loss) still stand as the only reasons to escalate.

## .what would change the verdict

| new datum | re-rank |
|-----------|---------|
| cat is on **Onsior** | raise Onsior to co-lead; also apply its **"stop if appetite decreases"** label rule |
| appetite **not back by ~48 h** | leave the "transient malaise" band → escalate to vet; a standing cause (CKD, megacolon) likely |
| **male + straining, little urine** | abandon this chain — **urinary-blockage emergency**, go now |
| known **arthritis** | add the pain→reluctance loop (`p50.pain-arthritis-posture`) as a parallel driver |
| **dark/tarry** stool | melena rule-out (possible GI bleed), esp. if on an NSAID |

## .the action it implies (not advice — the direction a clinician would weigh)

restore the broken node: **intake + hydration + calm** (wet food, encourage water, quiet routine).
because the driver (appetite loss) is typically self-limited (24–48 h), the constipation it caused
is usually transient too — but the **>48 h** and **urinary** flags above are the hard stops.

## .see also

- `inventory.of=causes.for=feline.case=constipation/readme.md` — the cause inventory (esp. `p50.dehydration`, `p50.pain-arthritis-posture`, `p10.drug-induced`)
- the three `inventory.of=correlations.for=feline.case=constipation.factor=*.md` briefs
- `../howto.disentangle-via-matrix.[lesson].md` · `../define.causal-chain-frame.[lesson].md`
- `../../../prescriber/briefs/inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.claims-official.adverse.md` — Onsior's appetite-loss AE + "stop if appetite decreases"

## .sources

this brief makes **no new factual claims** — it composes the already-cited cause and correlation
briefs (each carrying its own bhrowser citations). the load-bearing anchors it inherits:

1. International Cat Care — Constipation in cats (dehydration → dry stool) — https://icatcare.org/articles/constipation-in-cats
2. Today's Veterinary Practice — GI Hypomotility (stress-of-visit → hypomotility) — https://todaysveterinarypractice.com/gastroenterology/management-of-gastrointestinal-hypomotility-in-the-hospitalized-patient/
3. Veterinary Practice News — Pre-anesthetic fasting (fasting → reduced intake) — https://www.veterinarypracticenews.com/fasting-may-2021/
4. PetMD — Cat Vaccines: Most Common Reactions (post-vaccinal appetite loss) — https://www.petmd.com/cat/general-health/cat-vaccines-most-common-reactions
5. FDA/DailyMed — Onsior label (anorexia AE; stop if appetite decreases) — https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=922d3235-085e-454f-9535-44ef4bca12f4
