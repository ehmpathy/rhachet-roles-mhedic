# inventory.of=hazards.for=feline.case=blood-draw-venipuncture

> ⚠️ **not veterinary advice — informational only.** an itemized watch-list compiled from public
> sources; it does not diagnose and is not a substitute for a licensed veterinarian. **if this is
> an emergency (won't bear weight at all, a swollen leg that worsens fast, collapse) call an
> emergency vet now.**

## .what

the **hazard × alert** table for the exposure **a blood draw (venipuncture)** — blood pulled from a
vein (jugular / cephalic / medial saphenous), per `rule.require.hazard-alerts`. each hazard carries
a **monitor** (what to watch + cadence) and an **alarm** (threshold + escalation tier).

this is one half of a matched pair: **hazards → alarms** (this brief); **symptoms → expectations**
(probability + duration) in the companion
`inventory.of=symptoms.for=feline.case=blood-draw-venipuncture/`. a symptom that overstays or
worsens **crosses into a hazard** on this table.

escalation tiers: **🔴 emergency-now** · **🟠 vet-soon (24–72 h)** · **🟡 scheduled re-check.**

## .the exposure

blood pulled from a vein. the common feline sites: **jugular** (neck), **cephalic** (front leg),
**medial saphenous** (hind leg). a "blown" vein or a hard struggle raises the odds of a hazard, and
a failed first stick means a **second site** — which is how a draw ends up in **both** legs.

## .the hazard × alert table

| # | hazard | likelihood | onset | monitor (cadence) | alarm threshold | escalation |
|---|--------|-----------|-------|-------------------|-----------------|------------|
| 1 | large hematoma / continued bleed | uncommon | hours | look at the draw site, daily × 2–3 days | a bruise that is large, hot, or gets bigger | 🟠 24–72 h (🔴 if fast) |
| 2 | infection at the draw site | rare | 1–3 days | site for heat / redness / discharge, daily | swelling with heat, pus, or fever | 🟠 24–72 h |
| 3 | severe / persistent lameness | uncommon | can be delayed 2–5 days | gait, daily; which leg(s) | won't bear weight at all, or a limp past ~2 days / gets worse | 🟠 (🔴 if no weight at all) |
| 4 | off-feed / no-drink that persists | uncommon | hours–day | appetite + water, daily | still off food/water past ~24 h, or flat/hides | 🟠 24–72 h |
| 5 | jugular-draw complication (pseudoaneurysm / airway) | **very rare** | hours–days | neck-draw only: the neck for a mass, the breath | a neck mass that grows, or any breath trouble | 🔴 now |

## .the detail (with sources)

### 1 — large hematoma / continued bleed 🟠

a hematoma is blood pooled under the skin from a leaked vein — usually minor, but a large or
enlarged one signals a bleed that has not sealed. From
[dvm360 — minimizing venipuncture-induced hematomas](https://www.dvm360.com/view/minimizing-venipuncture-induced-hematomas):
> "Formation of hematomas of varying size is an inherent risk associated with venipunctures … they
> become especially problematic in patients that require multiple diagnostic or therapeutic
> venipunctures."

**monitor:** eyeball the site daily × 2–3 days. **alarm:** large, hot, or gets bigger → 🟠 vet
(🔴 if it swells fast — could mean a clot-factor problem).

### 2 — infection at the draw site 🟠

any needle puncture can, rarely, admit bacteria. **monitor:** the site for heat, redness, discharge.
**alarm:** swelling with heat, pus, or fever → 🟠 vet-soon.

### 3 — severe / persistent lameness 🟠

a draw-site bruise or strain is normally gone in 1–2 days. a limp that **won't let the cat bear
weight**, or that **persists / begins days later**, is past what a draw alone explains — it points
to a stacked cause (vaccine, restraint, arthritis) or an unrelated issue. the informative
**absence** of any cat-specific post-venipuncture-lameness literature says the draw itself is a
minor, transient event (see the companion symptoms readme). **monitor:** gait daily. **alarm:** no
weight at all → 🔴; a limp past ~2 days / gets worse → 🟠.

### 4 — off-feed / no-drink that persists 🟠

the RVN flag from the field: the appetite/hydration matters more than the limp. From
[r/AskVet — cat limping and in pain after blood draw](https://old.reddit.com/r/AskVet/comments/1s56l2e/cat_limping_and_in_pain_after_blood_draw_emergency/)
(Registered Veterinary Nurse):
> "I would find the not eating and drinking and becoming not herself to be the bigger concern. If
> this persists it would definitely be advised to have her checked over."

**monitor:** appetite + water daily. **alarm:** still off past ~24 h, or flat/hides → 🟠 vet.

### 5 — jugular-draw complication 🔴 (very rare)

a documented but rare complication of a **neck** (jugular) draw. From
[Clinician's Brief — feline phlebotomy: proceed with care](https://www.cliniciansbrief.com/article/feline-phlebotomy-proceed-care):
> "A 4-month-old kitten had a pseudoaneurysm subsequent to jugular venipuncture … A large mass was
> subsequently noted at the venipuncture site." (commentary: "care should be taken to avoid
> venipuncture of the carotid artery … jugular venipuncture should never be attempted on an awake
> animal that is moving or in respiratory distress.")

**monitor (neck draws only):** the neck for a new mass; the breath. **alarm:** a neck mass that
grows, or any breath trouble → 🔴 emergency now.

## .the reassurance (keep it in proportion)

a post-venipuncture bruise + a day or two of soreness is **common but minor and self-limited**;
serious complications are **rare**. From [Clinician's Brief](https://www.cliniciansbrief.com/article/feline-phlebotomy-proceed-care):
> "Although complications are rare, care should be taken…"

a draw that ends in a bruise and a day or two of soreness is the expected, benign course — the
alarms above are the uncommon tail, not the likely outcome.

## .see also

- `inventory.of=symptoms.for=feline.case=blood-draw-venipuncture/` — the matched **symptoms → expectations** half
- `inventory.of=hazards.for=feline.case=vaccines-felv-fvrcp-rabies.md` — the vaccine exposure (often stacked in the same visit)
- `.demo/case=miki-vet-2026-08-07/2.2.3.itemize-inventory.yield.md` — the disentangle of stacked exposures
- `../../../../.agent/repo=.this/role=any/briefs/rule.require.hazard-alerts.[rule].md` — the rule this instantiates

## .sources

all read through the bhrowser on 2026-08-10 (verbatim quotes above); distinct sources:

1. dvm360 — minimizing venipuncture-induced hematomas — https://www.dvm360.com/view/minimizing-venipuncture-induced-hematomas
2. Clinician's Brief — feline phlebotomy: proceed with care — https://www.cliniciansbrief.com/article/feline-phlebotomy-proceed-care
3. Dial A Vet — cat limping after a blood draw — https://www.dialavet.com/vet-answers/post/cat-limping-after-blood-draw-23205
4. r/AskVet — cat limping and in pain after blood draw — https://old.reddit.com/r/AskVet/comments/1s56l2e/cat_limping_and_in_pain_after_blood_draw_emergency/
5. NaturalPetsHQ — cat leg swollen after a blood draw — https://naturalpetshq.com/cat-leg-swollen-after-blood-draw/
