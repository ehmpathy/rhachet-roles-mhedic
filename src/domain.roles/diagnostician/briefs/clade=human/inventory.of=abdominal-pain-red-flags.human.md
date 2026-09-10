# inventory.of=abdominal-pain-red-flags.human

> ⚠️ **not medical advice — informational only.** thresholds published for the public by a
> national health service; a licensed clinician judges whether a given presentation meets them.

> .note = the -ing tokens below sit inside NHS verbatim quotes. a citation must stay verbatim.

## .what

the **case-neutral** escalation thresholds for adult abdominal pain, as the NHS publishes them.
held here so any route reuses them rather than re-derives them
(`rule.require.accrue-research`).

⚠️ **these are UK thresholds.** the tiers (`111` for urgent advice, `999`/A&E for emergency) are
the NHS's own. another health system's numbers and tiers differ; the **criteria** largely do not.

## .the emergency tier — call 999 or go to A&E

| criterion, verbatim | source |
|---|---|
| *"a stomach ache came on very suddenly or is severe"* | S1 |
| 🔴 *"it hurts when you touch your stomach"* | S1 |
| 🔴 *"it's painful to touch your tummy"* | S9 |
| 🔴 *"pelvic pain that's severe, getting worse, or hurts when you move or touch the area"* | S5 |
| *"you're vomiting blood or your vomit looks like ground coffee"* | S1, S9 |
| *"your poo is bloody or black and sticky and extremely smelly"* | S1, S9 |
| *"you cannot pee"* / *"you cannot poo or fart"* | S1 |
| *"severe tummy pain and is either vomiting, has a swollen tummy, or cannot poo or fart"* | S6 |
| *"a sudden, severe tummy ache"* (in the diarrhoea context) | S4 |
| *"confusion, blotchy or paler than usual skin … or difficulty breathing – these could be signs of sepsis"* | S2, S6 |
| *"you have diabetes and you're vomiting"* | S1 |

🔴 **tenderness to palpation appears on THREE independent pages** — general stomach ache, stomach
ulcer, and pelvic inflammatory disease. it is the most-repeated emergency criterion in this
corpus.

## .the urgent tier — GP or 111

| criterion, verbatim | source |
|---|---|
| *"it gets much worse"* / *"tummy pain that's getting worse or does not go away"* | S1, S6, S9 |
| *"pain in your abdomen that is gradually getting worse or does not go away"* | S2 |
| *"moves to the lower right side of your abdomen"* | S2 |
| *"you have diarrhoea that does not go away after a few days"* | S1 |
| *"you or your child have diarrhoea for more than 7 days or vomiting for more than 2 days"* | S4, S6 |
| *"you're pregnant"* | S1 |
| *"you have unusual bleeding or abnormal discharge from your vagina"* | S1 |
| *"you bleed from your bottom"* / *"there is blood or slime (mucus) in your poo"* | S1, S6 |
| *"you suddenly pee more often or less often"* / *"peeing is suddenly painful"* | S1 |
| *"you're losing weight without trying to"* | S1 |
| *"you have a high temperature, or you feel hot, cold or shivery"* | S6 |

## 🔴 .the two inversions — signs that read as reassurance and are not

| the sign | why it misleads | source |
|---|---|---|
| **the pain suddenly eases** | *"If appendicitis is not treated quickly, your appendix can burst. If this happens **your pain may suddenly get better for a short time.** You'll then usually have severe pain that spreads to the whole of your abdomen."* | S2 |
| **a negative pregnancy test** | *"Contact your GP or call NHS 111 if you have a combination of any of the above symptoms and you might be pregnant – **even if you haven't had a positive pregnancy test.**"* | S3 |

⇒ both are **traps of the same shape**: an absence read as a negative. the first is
`absence-of-evidence` applied to pain, the second to a test result.

## .the normal-course baselines — the numbers that bound a wait

| effect | expected course | source |
|---|---|---|
| diarrhoea, adults and children | *"usually stops within 5 to 7 days"* | S4 |
| vomiting | *"usually stops in 1 or 2 days"* | S4 |
| appendicitis pain migration | *"After a few hours the pain usually moves to the lower right side"* | S2 |
| ectopic symptom onset | *"tend to develop between the 4th and 12th week of pregnancy"* | S3 |
| ovarian cyst | *"Most ovarian cysts occur naturally and go away in a few months"* | S7 |

⚠️ **carry these as the SYMMETRY check.** a differential annotated only with what is rare will
de-rank the rare rows by adjective alone; a baseline that says *"this is within the normal
window"* is the counterweight, and it is as cited as the other half.

## .the four conditions in S1's first symptom table — the calibration floor

per S1, in the **symptom → possible condition** table it leads with:

> ⚠️ **this table is organised by SYMPTOM, never by FREQUENCY.** S1 does not rank these four and
> does not call them the commonest. an earlier version of this title said *"the four commonest
> causes"* — that frequency claim was never in the source, and is withdrawn. what the table
> supports is that these four are the conditions the NHS puts **first** for this effect, which is
> enough to make them a calibration floor without any claim about rank.

| type | possible condition |
|---|---|
| *"Feeling bloated, farting a lot"* | trapped wind (flatulence) |
| *"Feeling full and bloated after eating, heartburn, feeling sick"* | indigestion |
| *"Cannot poo"* | constipation |
| *"Watery poo, feeling sick, vomiting"* | stomach bug or food poisoning |

🔴 **a differential that omits these cannot be calibrated.** the mass that belongs to the benign
rows has nowhere to sit, so every posterior is displaced upward. carry this table as the check
against a lineup built under a can't-miss mandate.

## .sources — all bhrowser-verified, 2026-09-05

| # | source | landed url |
|---|---|---|
| S1 | NHS — Stomach ache | `https://www.nhs.uk/symptoms/stomach-ache/` |
| S2 | NHS — Appendicitis | `https://www.nhs.uk/conditions/appendicitis/` |
| S3 | NHS — Ectopic pregnancy | `https://www.nhs.uk/conditions/ectopic-pregnancy/` |
| S4 | NHS — Diarrhoea and vomiting | `https://www.nhs.uk/symptoms/diarrhoea-and-vomiting/` |
| S5 | NHS — Pelvic inflammatory disease | `https://www.nhs.uk/conditions/pelvic-inflammatory-disease-pid/` |
| S6 | NHS — Diverticular disease and diverticulitis | `https://www.nhs.uk/conditions/diverticular-disease-and-diverticulitis/` |
| S7 | NHS — Ovarian cyst | `https://www.nhs.uk/conditions/ovarian-cyst/` |
| S9 | NHS — Stomach ulcer | `https://www.nhs.uk/conditions/stomach-ulcer/` |

⚠️ **one publisher.** patient-side, so strong on thresholds and thin on rare mechanisms. a
formal-literature pass is owed before this inventory is treated as complete.

✅ **that pass was run — see below.** the publisher count is now two, and the second is professional
tier.

---

# 🔢 the professional tier — mechanism, examination, and the tests

> **source** · MSD Manual **Professional** Edition, *Acute Abdominal Pain*, full review Jul 2024,
> last updated Jul 2024, by Parswa Ansari MD · read via bhrowser 2026-09-06 ·
> `https://www.msdmanuals.com/professional/gastrointestinal-disorders/acute-abdomen-and-surgical-gastroenterology/acute-abdominal-pain`

⚠️ **the professional tier was added because a patient-tier-only inventory publishes thresholds and
no mechanism** — and mechanism is what a differential is weighted on. every block below is verbatim;
the -ing tokens inside them are the source's words.

## 🔴🔴 .the localization rule — pain position assigns a VISCERA SET

> *"Visceral pain comes from the abdominal viscera … and respond mainly to the sensations of
> distention and muscular contraction … **Visceral pain is typically vague, dull, and nauseating. It
> is poorly localized** and tends to be referred to areas corresponding to the embryonic origin of
> the affected structure. **Foregut structures (stomach, duodenum, liver, and pancreas) cause upper
> abdominal pain. Midgut structures (small bowel, proximal colon, and appendix) cause periumbilical
> pain. Hindgut structures (distal colon and genitourinary tract) cause lower abdominal pain.**"*

🔴 **this is the strongest anatomical constraint a bare pain location supplies**, and it is
mechanical: map the pain's territory to the embryological zone, and the zone names the organ set.

| pain zone | implicated structures |
|---|---|
| upper abdomen | **foregut** — stomach, duodenum, liver, pancreas |
| periumbilical | **midgut** — small bowel, proximal colon, appendix |
| lower abdomen | **hindgut** — distal colon, genitourinary tract |

⚠️ **a pain that spans two zones implicates the UNION of both sets, not the intersection** — and a
reasoner who picks the zone the pain is *worst* in discards the other half of the constraint. ⇒ **a
migratory or elongated pain is more informative than a point pain, not less.**

## 🔴🔴 .the sharpen — DULL→SHARP is a mechanism change, not merely a severity change

> *"**Somatic pain comes from the parietal peritoneum**, which is innervated by somatic nerves,
> which respond to irritation from infectious, chemical, or other inflammatory processes. **Somatic
> pain is sharp and well localized.**"*

🔴🔴 **read this against the visceral description above and a DULL→SHARP report acquires a
mechanism.** per this source, **vague/dull = visceral** and **sharp/localized = somatic** — so a pain
that sharpens over hours is a pain that has **moved from the viscera to the parietal peritoneum**,
which is what inflammation does as it reaches the abdominal wall.

⚠️ **this is the same transition the appendicitis page describes as the periumbilical→RLQ shift.**
two independent MSD pages describe one process.

⇒ 🔴 **the transferable rule: a DULL→SHARP report is a MECHANISM observation, never a mere intensity
report.** an intake that records it as *"pain worsened"* has thrown away the mechanism and kept only
the volume knob — and the two carry entirely different weight.

## 🔴🔴 .the URINE PREGNANCY TEST — stated three more times, on a page that is not about ectopic

under **the tests**:
> *"Tests are selected based on clinical suspicion: **Urine pregnancy test for all female patients of
> childbearing age**"*

> *"**A bedside urine pregnancy test should be done for all women of childbearing age** because a
> negative result effectively excludes ruptured ectopic pregnancy."*

under **Key Points**:
> *"Look for life-threatening causes first. **Rule out pregnancy in women of childbearing age.**
> Seek signs of peritonitis, shock, and obstruction. **Blood tests are of minimal value.**"*

🔴🔴 **the pregnancy test is demanded by three separate documents across five separate sentences** —
NHS ectopic, MSD ectopic (twice), and MSD acute-abdominal-pain (three times). ⚠️ **the last is the
strongest of all, because that page is NOT about ectopic pregnancy.** it is the general approach to
any acute abdomen, and it puts the pregnancy test in the *first* tier for **every** female patient of
childbearing age — with **no** symptom precondition whatever.

⇒ **no read of this corpus makes the test optional for a female patient of childbearing age with
abdominal pain.**

⚠️ **the general lesson about how to read a corpus**: the strongest demand for a test came from the
page *least* about the condition it rules out. ⇒ **a general-approach page outranks a
condition-specific one for the question "is this step optional?"**, because a condition-specific page
can always be dismissed as out of scope.

## 🔴🔴 .the two peritoneal signs — the operational definitions a physical exam is owed

> *"**Palpation begins gently, away from the area of greatest pain**, detecting areas of particular
> tenderness, as well as the presence of guarding, rigidity, and rebound (**all suggesting peritoneal
> irritation**) and any masses. **Guarding is an involuntary contraction of the abdominal muscles**
> that is slightly slower and more sustained than the rapid, voluntary flinch exhibited by sensitive
> or anxious patients. **Rebound is a distinct flinch upon brisk withdrawal of the examiner's hand.**"*

🔴🔴 **the usual bound on a remote tenderness report reads *"the intake does not distinguish
tenderness from guarding from rebound, and the degree cannot be judged remotely."* the FIRST half of
that bound is closable.** MSD supplies criteria a non-clinician can apply:

| sign | the criterion, verbatim | who can check it |
|---|---|---|
| tenderness | pain on gentle palpation | a layperson |
| **guarding** | *"involuntary contraction … slower and more sustained than the rapid, voluntary flinch"* | a layperson, with care |
| **rebound** | *"a distinct flinch upon **brisk withdrawal**"* | a layperson, with care |

⚠️ **this converts the open item from an ASK into an ACT** — and per `term=effect.symptom.provoked`,
*"UNCAPTURED on a provoked symptom is an unperformed manoeuvre, and no question can close it."*
⇒ **a gap list owes an ACT entry for the rebound check**, and it is a free, at-home manoeuvre.

🔴 **and all three signs point one way**: *"all suggesting peritoneal irritation."*

## .the red flags — professional tier

> *"Certain findings raise suspicion of a more serious etiology: **Severe pain / Signs of shock (eg,
> tachycardia, hypotension, diaphoresis, confusion) / Signs of peritonitis / Abdominal distention**"*

⇒ 🔴 **`tachycardia` and `hypotension` are VITAL SIGNS**, so a red-flag list that names them is
implicitly demanding a pulse and a blood pressure — both free, both routinely absent from an intake
that asked only about the pain.

## 🔴 .the 6-hour bound

> *"Acute and severe abdominal pain … may be the sole indicator of the need for surgery and must be
> attended to swiftly: **Gangrene and perforation of the gut can occur < 6 hours from onset of
> symptoms in certain conditions** (eg, interruption of the intestinal blood supply due to a
> strangulating obstruction or an arterial embolus)."*

⚠️ 🔴 **under 6 hours is the shortest catastrophe window the corpus publishes anywhere**, and it is
the clock any acuity tier must respect. ⇒ **a presentation a few hours into a sharpen is INSIDE this
window, not approaching it** — which is why a short duration argues **for** urgency rather than
against it, for the conditions this sentence names.

## 🔴🔴 .the posture discriminators — two more FREE observations no gap asks

> *"**Severe pain in a patient with a silent abdomen who is lying as still as possible suggests
> peritonitis**; location of tenderness suggests etiology … but may not be diagnostic."*

> *"**A patient who is writhing around trying to get comfortable is more likely to have an
> obstructive mechanism** (eg, renal or biliary colic)."*

> *"Mild to moderate pain in the presence of **active peristalsis of normal pitch** suggests a
> nonsurgical disease (eg, gastroenteritis) **but may also be the early manifestations of a more
> serious disorder**."*

🔴 **three zero-cost observations — still vs writhes, quiet belly vs active gut sounds — and each
parts a different family of the differential.** ⚠️ **a posture question is the kind an intake almost
never asks**, because posture reads as comfort behaviour rather than as a sign. it is not.

⚠️ **and note the third quote's own hedge** — *"but may also be the early manifestations of a more
serious disorder."* the calm read is explicitly bounded by the source that offers it.

## 🔴 .a mask effect — what a medication question actually gates

> *"**Prednisone or immunosuppressants may inhibit the inflammatory response to perforation or
> peritonitis and result in less pain, tenderness, or leukocytosis than might otherwise be
> expected.** Anticoagulants can increase the chances of bleeding and hematoma formation. Alcohol
> predisposes to pancreatitis."*

⇒ 🔴 **a medication question is not merely a hunt for a causal exposure — it gates whether the
SEVERITY SIGNAL ITSELF is trustworthy.** a steroid on board means a quiet abdomen is uninformative.

⚠️ **that is why the question belongs in the FIRST tier, not among the follow-ups.** a gap list that
files it as *"a possible cause"* under-states it by a wide margin: it is a precondition on how every
other observation may be read.

## .the imaging and lab characteristics

> *"Standard tests (eg, complete blood count, chemistries, urinalysis) are often done but are **of
> little value due to poor specificity**; patients with significant disease may have normal results.
> … An exception is **serum lipase**, which strongly suggests a diagnosis of acute pancreatitis."*

> *"**CT with oral and IV contrast is diagnostic in approximately ≥ 95%** of patients with
> significant abdominal pain and has markedly lowered the negative laparotomy rate. **However,
> advanced imaging must not be allowed to delay surgery** in patients with definitive symptoms and
> signs."*

> *"**Ultrasound** should be done for suspected biliary tract disease or **ectopic pregnancy
> (transvaginal probe)** and for suspected appendicitis in children."*

## .the immediately-life-threatening set — the source's own shortlist

> *"Many intra-abdominal disorders cause abdominal pain … some are trivial, but some are
> **immediately life threatening, requiring rapid diagnosis and surgery. These include ruptured
> abdominal aortic aneurysm (AAA), perforated viscus, mesenteric ischemia, and ruptured ectopic
> pregnancy.** Others (eg, **intestinal obstruction, appendicitis, severe acute pancreatitis**) are
> also serious and nearly as urgent."*

⚠️ 🔴 **this is a published can't-miss list from a professional source, and any hand-built
can't-miss set should be diffed against it — in BOTH directions.** a row here that your set lacks is
a gap; a row in your set absent here is not thereby wrong, but owes its own citation.

⇒ **the one-way diff is the common error**: a reasoner checks that the source's rows are covered and
never checks what they added beyond it. the second direction is where invented rows hide.

## .the pain-relief position — bears on any wait advice

> *"Some clinicians feel that providing pain relief before a diagnosis is made interferes with their
> ability to evaluate. However, **moderate doses of IV analgesics … do not mask peritoneal signs**
> and, by diminishing anxiety and discomfort, often make examination easier (1)."*
> — cited there to Manterola C, Vial M, Moraga J, Astudillo P, *Cochrane Database Syst Rev* 2011;(1):CD005660

⚠️ **this is about IV analgesia under clinical supervision and does NOT license self-medication at
home.** carried because any treatment pass will eventually weigh whether pain relief before
assessment is harmful — and **the answer in the literature is narrower than it first reads.**

⇒ 🔴 **the trap: the quote refutes a clinical folk-belief, and it is one sentence away from reading
as permission for a patient to take painkillers and wait.** the scope of a finding travels with it
or the finding is unsafe (`rule.require.excerpt-carries-the-qualifier`).
