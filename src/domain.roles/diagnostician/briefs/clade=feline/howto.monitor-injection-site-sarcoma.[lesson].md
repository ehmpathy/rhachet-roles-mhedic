# howto.monitor-injection-site-sarcoma

> ⚠️ **not veterinary advice — informational only.** this is a guide to *observe, measure, and
> record* an injection site at home so you can catch an early sign. it does **not** diagnose
> — only a vet's biopsy can. FISS is **not** a same-day emergency, but a lump that meets the
> "3-2-1" rule below should be seen **promptly**, not waited out.

## .what

a clear, repeatable home routine to watch a cat's **injection sites** for **feline injection-site
sarcoma (FISS)** — the rare, serious tumour described in
`inventory.of=effects.for=feline.case=injection-site-sarcoma.md`. the whole method is one habit:
**feel each site, measure any lump, date it, and apply one decision rule.**

## .why monitor at all

FISS is rare but aggressive, and it appears **months to years** after a shot — long after everyone
has forgotten the vaccine. early, small tumours are far more treatable, and the *only* way to
catch one early is a deliberate site-check. the experts state this plainly.

From [Hartmann et al. 2023, *Viruses*, PMC10459272](https://europepmc.org/article/MED/37632050):
> "Post-vaccinal monitoring is essential."

From [Hartmann et al. 2015, ABCD guideline (*J Feline Med Surg*), PMC11148925](https://europepmc.org/article/MED/26101312):
> "Aggressive, radical excision is required to avoid tumour recurrence."

why early matters — it is aggressive. From the same source:
> "The rate of metastasis ranges from 10-28%."

## .why this cron watch is CRITICAL — the success-rate case

the site-check earns **critical-tier** status (a recurrent cron alarm, not a one-off glance) because
the treatment odds are dominated by **how early and how well the first surgery is done** — a lever
that a home site-check directly controls, since it catches the lump while small.

**even radical surgery fails often once a tumour is established.** From [Müller & Kessler 2018,
*J Feline Med Surg*, 131 cats, PMC11104078](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11104078/):
> "the RR [recurrence rate] in FISS ranges from **33–55%**, despite curative intent radical surgery."

**a botched first surgery roughly halves the odds** — primary vs already-recurrent:
> "cats in groups 3 and 4 [recurrent tumours] had a significantly higher chance of recurrence (**RR
> 55.5%; n = 15/27**) compared with patients with primary tumours (**RR 33.3%; n = 33/99**)."

**clean margins ≈ a year of extra life** (same study):
> "Cats without residual tumour cells in the tumour bed (n = 105) had a significantly longer median
> ST compared with those with the presence of tumour cells in the tumour bed (n = 21) (median ± SD
> ST **28 ± 26.19 months vs 16.0 ± 13.47 months**; P = 0.026)."

**who does the first cut matters as much as when.** From [Today's Veterinary Practice](https://todaysveterinarypractice.com/oncology/feline-injection-site-sarcomas):
> "Median time to first recurrence is significantly prolonged if surgery is performed by an
> experienced surgeon at a referral hospital compared with surgery performed at a nonreferral
> institution (**~9 months versus ~2 months**)… the best chance for a cat to have a good prognosis
> with an injection site sarcoma is a well-planned first [surgery]."

**the takeaway for the alarm:** a lump caught at the "3-2-1" line, sent straight to a specialist for
a wide first excision, is the single best-odds path. a lump found late (large, or after a
first-opinion "shave") drops into the 33–55%-recurrence, 16-month-survival tail. the cron watch is
critical precisely because it is the owner's one lever over which tail the cat lands in.

## .when to check — the schedule

FISS latency is long, so this is a slow, low-effort habit, not a one-time look.

From the [ABCD HTML guideline](https://www.abcdcatsvets.org/guideline-for-feline-injection-site-sarcoma/):
> "FISS can develop as early as four months and up to two to three years after an injection".

| window after a shot | how often to feel the site |
|---------------------|----------------------------|
| first 2 weeks | casually — a small soft lump here is usually the *ordinary* reaction |
| weeks 2–4 | once a week |
| months 1–3 | once a month |
| months 3–36 | any time you notice a lump; stay aware — the risk window runs to ~3 years |

## .where to check

feel **every** site the cat was injected — for the two-thigh case, that is **both hind legs**.
FISS favors the classic injection sites. From the [ABCD HTML guideline](https://www.abcdcatsvets.org/guideline-for-feline-injection-site-sarcoma/):
> "FISS occur at sites typically used for vaccination and injections, such as the interscapular region ... and in the area of the semimembranosus and semitendinosus muscles in the hindlimbs."

## .how to check one site — step by step

1. **pick a calm moment** — lap, treats, warm hands.
2. **palpate flat** — run flat fingers over the site; feel *under* the skin for a firm mass.
3. **compare left vs right** — the two legs are your control; a one-sided difference is the signal.
4. **if you feel a lump, capture five facts:**
   - **size** — measure the widest span with a ruler; write the **cm** (2 cm is the line).
   - **firmness** — soft vs hard.
   - **mobility** — does it slide, or feel fixed to deeper tissue?
   - **pain** — does she flinch?
   - **photo + date** — shoot it beside the ruler so next month compares cleanly.
5. **log it** (see the record template below).

## .the decision rule — "3-2-1"

this is the one rule that turns a site-check into a vet visit. From the
[ABCD HTML guideline](https://www.abcdcatsvets.org/guideline-for-feline-injection-site-sarcoma/):
> "Any lump at the site of injection that is still present three months after vaccination, or that is larger than 2 cm in diameter, or that is increasing in size one month after vaccination should be surgically removed and investigated through histopathology."

the owner version, from [International Cat Care](https://icatcare.org/articles/vaccinating-your-cat):
> "After your cat receives any vaccine, monitor the injection site and if swelling persists for more than 2-3 weeks or appears to be getting larger, get it checked immediately by your vet."

and from [AVMA](https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations):
> "a small, firm swelling under the skin could develop at the vaccination site soon after vaccination. This swelling should start to disappear within a couple of weeks. If it lasts more than three weeks, seems painful, or seems to be getting larger, contact your veterinarian."

## .benign vs worrisome — how to read a lump

| feature | usually the ordinary reaction | flag for the vet |
|---------|-------------------------------|------------------|
| time since shot | first ~2 weeks | still there at **3 months** |
| size | small, and shrinks | **> 2 cm**, or grows |
| trend | fades week over week | **grows at 1 month** |
| texture | soft, movable | hard, fixed to deeper tissue |

any single "flag" column hit = book the vet. you do not need all four.

## .what the vet does (so you know why the visit matters)

the vet confirms with a **biopsy / histopathology** (not a wait-and-see), images the extent, and if
it is FISS, treats with wide surgery. From [Hartmann et al. 2015, PMC11148925](https://europepmc.org/article/MED/26101312):
> "The prognosis improves if additional radiotherapy and/or immunotherapy (such as recombinant feline IL-2) are used."

## .keep it in proportion

FISS is **rare** — this habit is cheap insurance, not a reason to skip vaccines. From
[Kliczkowska et al. 2015, *Pol J Vet Sci*](https://europepmc.org/article/MED/26172181):
> "The prevalence is estimated between 1 in 1000 and 1 in 10 000 vaccinations in the United Kingdom."

From [Cornell — Feline Vaccines: Benefits and Risks](https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-vaccines-benefits-and-risks):
> "For the average cat, the benefits of an appropriate vaccination program (protection against serious/lethal diseases) far outweigh the potential risks associated with vaccination."

## .record template (paste into a note)

```
cat: __________    vaccine date: __________
site A (e.g. left thigh — FeLV):
  wk1 ____  wk2 ____  mo1 ____  mo2 ____  mo3 ____   (size cm / firm? / photo?)
site B (e.g. right thigh — FVRCP+rabies):
  wk1 ____  wk2 ____  mo1 ____  mo2 ____  mo3 ____
first noticed a lump on: __________  size: ____ cm  hard/soft: ____  moves? ____
3-2-1 triggered? (present@3mo / >2cm / grew@1mo): ____   → booked vet: __________
```

a dated log like this is exactly what a vet (or the diagnostician intake) needs to judge a trend.

## .see also

- `inventory.of=effects.for=feline.case=injection-site-sarcoma.md` — what FISS is, in depth
- `inventory.of=effects.for=feline.case=postvaccinal-reaction.md` — the ordinary short-lived reaction (so you can tell them apart)
- `../define.causal-chain-frame.[lesson].md` — the four-node frame these instantiate
- `../../../../.agent/repo=.this/role=any/briefs/motto.not-medical-advice.[motto].md`

## .sources

all read through the bhrowser on 2026-08-10 (verbatim quotes above); 8 distinct sources:

1. ABCD (Hartmann et al.) — Guideline for Feline Injection-Site Sarcoma (HTML) — https://www.abcdcatsvets.org/guideline-for-feline-injection-site-sarcoma/
2. Hartmann et al. 2015, *J Feline Med Surg* 17(7):606–613 — FISS: ABCD guidelines — https://europepmc.org/article/MED/26101312
3. Hartmann et al. 2023, *Viruses* 15(8):1708 — FISS and other adverse reactions to vaccination in cats — https://europepmc.org/article/MED/37632050
4. International Cat Care — Vaccinating your cat — https://icatcare.org/articles/vaccinating-your-cat
5. AVMA — Vaccinating your pet — https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations
6. Kliczkowska et al. 2015, *Pol J Vet Sci* 18(2):313–322 — epidemiology & morphology of FISS — https://europepmc.org/article/MED/26172181
7. Cornell Feline Health Center — Feline Vaccines: Benefits and Risks — https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-vaccines-benefits-and-risks
8. VCA Animal Hospitals — Vaccines for Cats — https://vcahospitals.com/know-your-pet/vaccines-for-cats
