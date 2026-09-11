# inventory.of=appendicitis.human

> ⚠️ **not medical advice — informational only.** consult a licensed clinician.
> **if this is an emergency, call your local emergency number now.**

> .note = the -ing tokens below sit inside NHS verbatim quotes. a citation must stay verbatim.

## .what

case-neutral facts about appendicitis, held here so any route reuses them rather than re-derives
them (`rule.require.accrue-research`). every line is bhrowser-verified against **S2 — NHS, Appendicitis**,
`https://www.nhs.uk/conditions/appendicitis/` (page last reviewed 09 Aug 2024), read 2026-09-05.

## 🔴 .the timeline — periumbilical first, then migration, over hours

> *"Symptoms of appendicitis usually start with pain in the middle of your abdomen (tummy),
> **around your belly button**. After a few hours the pain usually **moves to the lower right side**
> of your abdomen, and **gets worse**."*

⇒ **the migration is the discriminator, and it is FREE to ask for.** a pain still central is
either not appendicitis, or appendicitis **early** — and the page puts the move at *"a few
hours"*, which is often the window in which a case first presents.

⚠️ so a report of no migration is **weak evidence** at 2 hours and **strong evidence** at 24. the
same answer means different things at different clock positions, and the clock is what a gap list
must capture.

## .the other symptoms — and the one that surprises

> *"Other symptoms of appendicitis can include: feeling or being sick, or loss of appetite / a
> high temperature / **constipation or diarrhoea** / peeing more than usual / sudden confusion (in
> older people)"*

🔴 **diarrhoea is a listed appendicitis symptom.** an argument that a GI picture points away from
appendicitis is refuted by the source. carry this — it is a common and confident error.

## .the palpation sign

> *"The pain may feel worse when you move, cough or **press on the area**. It may feel slightly
> better when you pull your knees up to your chest."*

⚠️ and the atypical presentation is explicitly acknowledged:

> *"Some people with appendicitis do not have the usual pain symptoms. For example, you might have
> pain that's less severe, develops more slowly, or in a different place. This can be more likely
> if you're **pregnant** and in young children and older people."*

⇒ 🔴 **pregnancy is named as a cause of atypical presentation.** in a case where pregnancy is
possible, the absence of a textbook picture is worth **less** than it would otherwise be.

## 🔴 .the inversion — rupture presents as RELIEF

> *"If appendicitis is not treated quickly, your appendix can burst. If this happens **your pain
> may suddenly get better for a short time.** You'll then usually have severe pain that spreads to
> the whole of your abdomen. It may be very painful to move."*

⇒ carry this as a trap on permanent record. **a pain that eases is not evidence the danger
passed** — it can be the announcement that the wall gave way.

## .the escalation tiers

| tier | criterion, verbatim |
|---|---|
| **urgent — GP or 111** | *"pain in your abdomen (tummy) that: is gradually getting worse or does not go away / moves to the lower right side of your abdomen"* |
| 🔴 **999 or A&E** | *"severe pain in your abdomen (tummy) / confusion, blotchy or paler than usual skin … or difficulty breathing – these could be signs of sepsis"* |

## .the workup

> *"a GP or hospital doctor will feel your abdomen (tummy) to check for pain and swelling. You'll
> need to go to hospital for tests and treatment. Tests you may have include: **blood tests** /
> testing a sample of your pee / **scans such as an ultrasound scan or CT scan** to check for
> swelling in your appendix / **a pregnancy test if there's a chance you could be pregnant**"*

🔴 **a pregnancy test is part of the standard appendicitis workup.** so the test is owed by the
appendicitis pathway itself, independent of any gynaecologic suspicion.

> *"**There's no test that can always show if you have appendicitis.** It can be hard to diagnose
> because the symptoms can be similar to other conditions. Sometimes doctors will try waiting a
> few hours to see how your symptoms develop in hospital."*

⚠️ **no single assay eliminates it.** an assay plan that expects one will mis-rank every test it
lists — the pathway is serial observation, never a decisive result.

## 🔴 .the base rate — ⚠️ **NOT ACCRUED. what follows is an ADJECTIVE, and no rate at all.**

> *"Appendicitis is common. It can happen at any age, but it's most common in **children over 10
> years old and young adults**. It's rare in babies under 12 months old."*

🔴🔴 **read the quote, never the header.** it holds three adjectives — *"common"*, *"most common"*,
*"rare"* — plus an age band. **there is no denominator anywhere in it, so no line here can weight a
scenario.** this is the same patient-tier limit `inventory.of=ectopic-pregnancy.human.md` records:
NHS prose publishes adjectives, and *an adjective cannot be weighted*.

⚠️ 🔴 **the header itself was the hazard.** a grep of the research dir for `base rate` hits this
header and can stop there, satisfied. **a header is a claim to verify, never evidence the fact is
held** — and a grep cannot tell the two apart, because a header that promises a rate and a paragraph
that states one match the same pattern.

⇒ **the repair was to accrue a professional-tier lifetime incidence with an honest denominator.**
✅ **closed — see the professional-tier block below.**

---

# 🔢 the formal base rates — professional tier

> **source** · MSD Manual **Professional** Edition, *Appendicitis*, full review Jul 2024, last
> updated Jul 2024, by Parswa Ansari MD · read via bhrowser 2026-09-06 ·
> `https://www.msdmanuals.com/professional/gastrointestinal-disorders/acute-abdomen-and-surgical-gastroenterology/appendicitis`

⚠️ **every block below is verbatim.** the -ing tokens inside them are the source's words, quoted
under `rule.require.bhrowser-citations`, never names this file authors.

## 🔴🔴 .the base rate, with its denominator

> *"In the United States, acute appendicitis is **the most common cause of acute abdominal pain
> requiring surgery**. **Over 5% of the population develops appendicitis at some point** (1). It most
> commonly occurs in adolescence and in the 20s but may occur at any age."*
> — cited there to Addiss DG, Shaffer N, Fowler BS, Tauxe RV, *Am J Epidemiol* 1990;132(5):910–925

🔴 **the denominator is `the population`** — not *"diagnosed pregnancies"*, not *"hospital
admissions"*. that is the broadest honest denominator in this corpus, and it applies with **no
further datum needed**.

⚠️ **hold it against ectopic's `~2/100 diagnosed pregnancies`.** the two are NOT comparable as
printed, and the difference is the denominator, never the numerator:

| condition | rate | denominator | when does it apply? |
|---|---|---|---|
| appendicitis | **> 5%** lifetime | **the population** | ✅ **unconditionally** |
| ectopic pregnancy | ~2/100 | **diagnosed pregnancies** | 🔴 **undefined until pregnancy is established** |
| acute mesenteric ischaemia | ~1/1000 | **hospital admissions** | ⚠️ only once presented to hospital |

⇒ 🔴 **a conditional rate may not be ranked against an unconditional one.** the appendicitis rate is
the rare one that needs no gate — most published rates in this domain are conditional, and the
condition is usually invisible in the number itself.

## 🔴🔴 .the symptom timeline — and the trap it sets for an early observer

> *"The classic acute appendicitis symptoms are: **Epigastric or periumbilical pain** followed by
> brief nausea, vomiting, and anorexia. **After a few hours, the pain shifts to the right lower
> quadrant.** Pain increases with cough and motion."*

🔴 **`periumbilical` first, and the shift comes only after a few hours.**

⚠️ **so the absence of a right-lower-quadrant shift is NOT reassurance in the first hours.** the
source places the shift *after* a few hours — a presentation observed inside that window has not yet
reached the point where the shift's absence would carry information.

⇒ **the generalizable trap: an early observation of a staged illness looks like a mild one.** a
timeline read as a checklist scores an early presentation as *"the classic sign is absent"*, when the
truth is that the clock has not yet run.

## 🔴🔴 .DIARRHOEA does not argue against it — it localizes the appendix

> *"Many variations of appendicitis symptoms and signs occur in **> 50% of patients**. Pain may not
> be localized, particularly in infants and children. Tenderness may be diffuse or, in rare
> instances, absent. **Bowel movements are usually less frequent or absent; if diarrhea is a sign, a
> retrocecal appendix should be suspected.** Red or white blood cells may be present in the urine."*

🔴🔴 **this is the most consequential line in the block.** the naive read — *"appendicitis
constipates, so diarrhoea points elsewhere"* — **is refuted by the source itself**: diarrhoea is not
an argument against appendicitis, it is a pointer to a **retrocecal** appendix.

⇒ **the generalizable shape: a symptom that seems to exclude a condition may instead LOCALIZE it.**
before a datum is used to eliminate, check whether the source treats it as an anatomical variant.

⚠️ **and `> 50% of patients` is a quantified atypicality rate.** the *"classic"* presentation is a
**minority** presentation. ⇒ **a match against the classic profile is a weak test, and a mismatch
against it is a weaker one.**

## 🔴 .pregnancy makes it QUIETER, not less likely

> *"**Atypical symptoms are common among older patients and pregnant women**; in particular, **pain
> is less severe and local tenderness is less marked**."*

⇒ 🔴 **a pregnancy test cuts BOTH ways, and a reasoner usually carries only one.** a positive result
does not merely raise the obstetric rows — **it also tells you the severity signal of appendicitis is
DAMPED**, so a moderate presentation in a pregnant patient carries more weight than the same
presentation otherwise.

⇒ **the transferable rule: a test that raises one hypothesis often re-scales the EVIDENCE for
another.** ask of every result not only *what does it raise*, but *what does it re-interpret*.

## 🔴🔴 .the FIVE free at-home manoeuvres — the class a research pass reliably drops

⚠️ **a research pass reliably lifts FACTS and reliably drops ACTS.** these five sat on the page and
cost naught, and none was carried until the class itself was named:

> *"Classic signs of appendicitis are **right lower quadrant direct and rebound tenderness located at
> the McBurney point** (junction of the middle and outer thirds of the line joining the umbilicus to
> the anterior superior iliac spine)"*

> *"Additional appendicitis signs are **pain felt in the right lower quadrant with palpation of the
> LEFT lower quadrant (Rovsing sign)**, **an increase in pain caused by passive extension of the
> right hip joint that stretches the iliopsoas muscle (psoas sign)**, or **pain caused by passive
> internal rotation of the flexed thigh (obturator sign)**."*

> *"After a few hours, the pain shifts to the right lower quadrant. **Pain increases with cough and
> motion.**"*

> *"**Low-grade fever (rectal temperature 37.7 to 38.3 °C [100 to 101 °F]) is common.**"*

| the act | what it asks someone to do | cost |
|---|---|---|
| **McBurney point** | locate ⅔ along a line from navel to the right hip bone; press there | free |
| **Rovsing** | press the **LEFT** lower belly — does the **RIGHT** hurt? | free |
| **psoas** | straighten the right hip / extend the right leg backward — worse? | free |
| **obturator** | bend the right knee up and rotate the thigh inward — worse? | free |
| **cough / motion** | cough, or walk a few steps — does the pain jump? | free, instant |
| **temperature** | a thermometer, against a **stated band** | free |

🔴 **each of these is `provoked`, not `spontaneous`** — per `term=effect.symptom.provoked`, *"an
UNCAPTURED provoked symptom is an unperformed manoeuvre, and no question can close it."* ⇒ **a gap
list owes an ACT entry for each**, and they are the cheapest evidence available in the whole
differential.

⚠️ **the fever band matters as much as the manoeuvres** — it is the one place in the corpus where a
vital sign is given a **number** rather than an adjective.

## .the test characteristics — two negatives that do not exclude

> *"Laboratory studies typically show leukocytosis (12,000 to 15,000/mcL), but this finding is
> **highly variable; a normal white blood cell count should not be used to exclude appendicitis**."*

> *"When classic appendicitis symptoms and signs are present, the appendicitis diagnosis is
> **clinical**. In such patients, **delaying appendicitis surgery to do imaging tests only increases
> the likelihood of perforation** and subsequent complications."*

## 🔴 .the accepted false-positive rate — a stated risk posture

> *"Because **treatment delay increases mortality, a negative appendectomy rate of 15% is considered
> acceptable**."*

⇒ **the field accepts operating on a normal appendix roughly 1 time in 7 rather than wait.** this is
a published, quantified statement that **the cost of a late appendicitis exceeds the cost of a false
alarm** — which is exactly the kind of asymmetry an acuity tier needs, and it is rare to find one
stated as a number rather than left to judgment.

## .the outcome rates

> *"Without surgery or antibiotics, the mortality rate for appendicitis is **high**."*
> *"With early surgery, the mortality rate is **< 1%** in high-resource areas (1), and convalescence
> is normally rapid and complete."*
> *"With complications (rupture and development of an abscess or peritonitis) and/or advanced age,
> the prognosis is worse."*
> — cited there to Bhangu A, Søreide K, Di Saverio S, et al, *Lancet* 2015;386(10000):1278–1287

⚠️ 🔴 **the whole of appendicitis's severity sits in the gap between those two lines**, and the
variable that moves a case from one to the other is **time**. ⇒ **it is a row whose rank must be read
together with the clock, never on base rate alone** — a differential sorted by likelihood alone
mis-ranks every condition of this shape.

## .the complications

> *"If untreated, necrosis, gangrene, and perforation occur. If the perforation is contained by the
> omentum, an appendiceal abscess results."*

## .the complications of rupture

> *"an infection of the inner lining of your abdomen (**peritonitis**) / a life-threatening
> reaction to infection (**sepsis**) / a painful build-up of pus (abscess) / a blockage in your
> bowel / problems in pregnancy"*

## .the outlook

> *"Most people recover from appendicitis in 1 to 2 weeks. It may take longer if you had
> complications such as a burst appendix."*
