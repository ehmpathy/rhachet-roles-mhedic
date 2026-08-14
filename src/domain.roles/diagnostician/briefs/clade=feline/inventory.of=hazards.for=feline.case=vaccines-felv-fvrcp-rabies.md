# inventory.of=hazards.for=feline.case=vaccines-felv-fvrcp-rabies

> ⚠️ **not veterinary advice — informational only.** an itemized watch-list compiled from public
> sources; it does not diagnose and is not a substitute for a licensed veterinarian. **if this is
> an emergency (collapse, trouble to breathe, a swollen face) call an emergency vet now.**

## .what

the full **hazard × alert** table for the exposure **three feline vaccines** — FeLV (left thigh),
FVRCP (right thigh), rabies (right thigh) — per `rule.require.hazard-alerts`. each hazard carries a
**monitor** (what to watch + cadence) and an **alarm** (threshold + escalation tier).

this is one half of a matched pair: **hazards → alarms** (this brief); **symptoms → expectations**
(probability + duration) in the companion `inventory.of=symptoms.for=feline.case=vaccines-felv-fvrcp-rabies/`.
a symptom that overstays or worsens **crosses into a hazard** on this table.

escalation tiers: **🔴 emergency-now** · **🟠 vet-soon (24–72 h)** · **🟡 scheduled cron re-check.**

## .the exposure

| slot | vaccine | note |
|------|---------|------|
| left thigh | FeLV (feline leukemia) | historically adjuvanted; a FISS-linked vaccine |
| right thigh | FVRCP ("feline distemper" — panleukopenia + herpesvirus + calicivirus) | the calicivirus part can cause transient lameness |
| right thigh | rabies | historically adjuvanted; the other FISS-linked vaccine |

## .the hazard × alert table

| # | hazard | likelihood | onset | monitor (cadence) | alarm threshold | escalation |
|---|--------|-----------|-------|-------------------|-----------------|------------|
| 1 | anaphylaxis / severe allergic reaction | very rare | minutes–hours | watch closely the first few hours | collapse, hard breath, face/neck swell, hives, repeated vomit/diarrhea | 🔴 now |
| 2 | systemic malaise (lethargy, mild fever, appetite dip) | common, mild | hours–48 h | energy/appetite, once daily × 3 days | lasts **> 2–3 days**, or very flat | 🟠 24–72 h |
| 3 | injection-site soreness / limp | common, mild | hours–3 days | gait: jumps, sits, limp, daily × 3 days | severe pain, or **> 2–3 days** | 🟠 24–72 h |
| 4 | GI upset (vomit / diarrhea) | uncommon | hours–2 days | stool + vomit, as seen | persistent or with lethargy/no appetite | 🟠 (🔴 if severe) |
| 5 | transient lameness (calicivirus component) | uncommon | 1–7 days | which legs, gait, daily early | does not ease in a few days | 🟠 24–72 h |
| 6 | respiratory signs (sneeze, mild cough) | uncommon | 2–5 days | breath, nose/eyes | labored breath, or persistent | 🟠 (🔴 if labored) |
| 7 | injection-site sarcoma (FISS) | **rare** (~<1 in 20,000) | **months–years** | **feel both thighs — weekly × 1 mo, then monthly (cron)** | "3-2-1": lump at 3 mo / >2 cm / grows at 1 mo | 🟡 scheduled — **critical** |

## .the detail (with sources)

### 1 — anaphylaxis 🔴 (the one true emergency)

From [AVMA — Vaccinating your pet](https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations):
> "Fainting or collapse / Persistent vomiting or diarrhea / Persistent and severe coughing / Difficulty breathing / Red, itchy bumps all over the body ('hives') / Swelling or puffiness in or around the face, nose, eyes, or neck"

From [VCA — Vaccines for Cats](https://vcahospitals.com/know-your-pet/vaccines-for-cats):
> "Very few cats may be allergic to one or more components of the vaccine and have more serious side effects, such as vomiting, diarrhea, or difficulty breathing. If these signs occur, contact your veterinarian immediately."

**monitor:** watch the first few hours after the shot. **alarm → 🔴 emergency vet at once.**

### 2 — systemic malaise 🟠

From [VCA](https://vcahospitals.com/know-your-pet/vaccines-for-cats):
> "You may notice your cat has a temporary loss of appetite or is less lively a day or two after a vaccination, but this should resolve within 24–48 hours."

From [PDSA — Cat and Kitten Vaccinations](https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/other-veterinary-advice/cat-and-kitten-vaccinations):
> "they are likely to be mild (high temperature, low energy, and a reduced appetite), and pass within 24-48 hours."

**monitor:** energy + appetite, daily × 3 days. **alarm:** past ~48 h, or very flat → 🟠 vet.

### 3 — injection-site soreness / limp 🟠

From [AVMA](https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations):
> "Tenderness and swelling at the vaccination site / Tiredness / Mild fever / Decreased appetite ... These minor side effects usually go away on their own within 24 hours. If they last for more than a day or two ... contact your veterinarian."

**monitor:** gait — jumps, sits, limp — daily early (both thighs were injected, so a bilateral
sore-leg pattern is expected). **alarm:** severe pain, or past 2–3 days → 🟠 vet.

### 4 — GI upset 🟠

From [International Cat Care — Vaccinating your cat](https://icatcare.org/articles/vaccinating-your-cat):
> "More noticeable side effects may include vomiting, diarrhoea, lameness (limping), high temperature, signs of a respiratory tract infection, or lumps at the site of injection".

**monitor:** stool + vomit as seen. **alarm:** persistent, or with lethargy/no appetite → 🟠 vet
(🔴 if severe or nonstop).

### 5 — transient lameness (calicivirus) 🟠

the FVRCP calicivirus component is a known cause of a passing limp, so a limp here can be either
the injection soreness or a mild vaccine-strain effect. iCatCare lists **"lameness (limping)"**
among side effects (quote above). **monitor:** which legs, gait, daily early. **alarm:** no ease in
a few days → 🟠 vet.

### 6 — respiratory signs 🟠

From [AVMA](https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations):
> "For vaccines given in the nose ('intranasal' vaccines), sneezing, mild coughing, or other respiratory signs also may occur 2-5 days after vaccination."

**monitor:** breath, nose/eyes for a few days. **alarm:** labored breath → 🔴; persistent → 🟠.

### 7 — injection-site sarcoma (FISS) 🟡 **critical** (the delayed, cron-watched hazard)

this is the one hazard that needs a **scheduled re-check over months** (a cron watch), not just a few
days. it is low-likelihood but **critical-severity**: the outcome is dominated by how early the lump
is caught, so the cheap monthly site-check is the owner's single biggest lever. full method in
`howto.monitor-injection-site-sarcoma.[lesson].md`.

From [International Cat Care](https://icatcare.org/articles/vaccinating-your-cat):
> "In very rare cases (around less than 1 in 20,000 vaccines given), a feline injection site sarcoma (FISS) could develop ... if swelling persists for more than 2-3 weeks or appears to be getting larger, get it checked immediately by your vet."

the "3-2-1" rule, from the [ABCD/Hartmann guideline](https://www.abcdcatsvets.org/guideline-for-feline-injection-site-sarcoma/):
> "Any lump at the site of injection that is still present three months after vaccination, or that is larger than 2 cm in diameter, or that is increasing in size one month after vaccination should be surgically removed and investigated through histopathology."

and why the watch is worth the effort — from [Hartmann et al. 2023, *Viruses*, PMC10459272](https://europepmc.org/article/MED/37632050):
> "Post-vaccinal monitoring is essential."

**why it rates critical, not routine** — even radical surgery recurs 33–55%, and early/expert first
surgery dominates the odds. From [Müller & Kessler 2018, 131 cats, PMC11104078](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11104078/):
> "the RR [recurrence rate] in FISS ranges from 33–55%, despite curative intent radical surgery."

From [Today's Veterinary Practice](https://todaysveterinarypractice.com/oncology/feline-injection-site-sarcomas):
> "Median time to first recurrence is significantly prolonged if surgery is performed by an experienced surgeon at a referral hospital compared with surgery performed at a nonreferral institution (~9 months versus ~2 months)."

**monitor (cron):** feel **both thighs**, weekly × 1 month then monthly for ~3+ months (the risk
window runs to ~3 years). **alarm:** any "3-2-1" hit → 🟡 book vet + biopsy **promptly**, and ask
for referral to a surgical/oncology specialist for the first excision.

## .a non-hazard worth stating (reassurance)

the FeLV vaccine does **not** make her later FeLV blood tests read falsely positive. From
[Cornell — Feline Leukemia Virus](https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-leukemia-virus):
> "FeLV vaccines will not cause false positive FeLV results on ELISA, IFA, or any other available FeLV tests."

and the overall balance — from [Cornell — Feline Vaccines: Benefits and Risks](https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-vaccines-benefits-and-risks):
> "For the average cat, the benefits of an appropriate vaccination program ... far outweigh the potential risks associated with vaccination."

## .see also

- `inventory.of=symptoms.for=feline.case=vaccines-felv-fvrcp-rabies/` — the matched **symptoms → expectations** half (probability + duration per symptom)
- `inventory.of=effects.for=feline.case=postvaccinal-reaction.md` — how long / why, the common case
- `inventory.of=effects.for=feline.case=injection-site-sarcoma.md` — the FISS hazard in depth
- `howto.monitor-injection-site-sarcoma.[lesson].md` — the cron watch method for hazard #7
- `../../../../.agent/repo=.this/role=any/briefs/rule.require.hazard-alerts.[rule].md` — the rule this instantiates

## .sources

all read through the bhrowser on 2026-08-10 (verbatim quotes above); 9 distinct sources:

1. AVMA — Vaccinating your pet — https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations
2. VCA Animal Hospitals — Vaccines for Cats — https://vcahospitals.com/know-your-pet/vaccines-for-cats
3. International Cat Care — Vaccinating your cat — https://icatcare.org/articles/vaccinating-your-cat
4. PDSA — Cat and Kitten Vaccinations — https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/other-veterinary-advice/cat-and-kitten-vaccinations
5. ABCD (Hartmann et al.) — Guideline for Feline Injection-Site Sarcoma — https://www.abcdcatsvets.org/guideline-for-feline-injection-site-sarcoma/
6. Hartmann et al. 2023, *Viruses* 15(8):1708 — FISS and other adverse reactions to vaccination in cats — https://europepmc.org/article/MED/37632050
7. Cornell Feline Health Center — Feline Leukemia Virus — https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-leukemia-virus
8. Cornell Feline Health Center — Feline Vaccines: Benefits and Risks — https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-vaccines-benefits-and-risks
9. Kliczkowska et al. 2015, *Pol J Vet Sci* 18(2):313–322 — epidemiology & morphology of FISS — https://europepmc.org/article/MED/26172181
10. Müller & Kessler 2018, *J Feline Med Surg* 20(6):509–519 — radical en bloc resection, 131 cats (recurrence 33–55%) — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11104078/
11. Today's Veterinary Practice — FISS risk/diagnosis/treatment algorithm (referral ~9 mo vs ~2 mo) — https://todaysveterinarypractice.com/oncology/feline-injection-site-sarcomas
