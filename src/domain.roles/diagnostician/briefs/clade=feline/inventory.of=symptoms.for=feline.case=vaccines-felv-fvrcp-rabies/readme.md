# inventory.of=symptoms.for=feline.case=vaccines-felv-fvrcp-rabies

> ⚠️ **not veterinary advice — informational only.** a "what to expect" inventory compiled from
> public sources; it does not diagnose and is **not a substitute** for a licensed veterinarian who
> has examined your cat. **if this is an emergency (collapse, trouble to breathe, a swollen face,
> repeated vomit) call an emergency vet now.**

## .what

the **symptoms inventory** for the exposure **three feline vaccines** — FeLV (left thigh), FVRCP
(right thigh), rabies (right thigh). **one file per symptom**, each fitted with its
**expectation**: a probability + a duration.

this is one half of a matched pair, per `rule.require.hazard-alerts`:

| inventory | the node | what we fit it with |
|-----------|----------|---------------------|
| **`inventory.of=symptoms`** (this dir) | a **symptom** (an anticipated observable sign) | an **expectation** = probability + duration |
| `inventory.of=hazards` (companion) | a **hazard** (a potential adverse outcome) | an **alert** = monitor + alarm + escalation |

- **symptoms → expectations.** we project how likely a symptom is and how long it lasts.
- **hazards → alarms.** we set a threshold that fires and demands escalation.

a symptom that overstays or worsens **crosses into a hazard** — at that point read the companion
`inventory.of=hazards.for=feline.case=vaccines-felv-fvrcp-rabies.md` for its alarm + escalation tier.

## .the file-name scheme — `pNN.$slug.md`

each symptom is its own file named **`pNN.$slug.md`**, where **`pNN` is the probability** as an
**ordinal likelihood bucket** (two-digit) and `$slug` is the symptom — `p50` = common, `p10` =
uncommon. the full convention is defined once, repo-wide, in
`../../../../../.agent/repo=.this/role=any/briefs/define.pNN-probability-token.[lesson].md`.

**`pNN` is an ordinal bucket, not a measured rate.** feline post-vaccinal symptoms are
**under-quantified** in the literature — mild, self-limited symptoms go largely unreported, so no
per-symptom percentage exists. the buckets rank likelihood; they do not claim a measured frequency.
the few **hard** incidence numbers apply to the rare adverse **hazards** (anaphylaxis, FISS) and
live in the companion hazards brief.

## .the symptoms (this dir)

| file | symptom | duration |
|------|---------|----------|
| `p50.systemic-malaise.md` | tiredness / more sleep / less play | 24–48 h |
| `p50.appetite-loss.md` | reduced appetite | 24–48 h |
| `p50.mild-fever.md` | mild fever | 24–48 h |
| `p50.injection-site-soreness.md` | sore leg / limp (**bilateral** here) | ~1–3 days |
| `p10.site-lump.md` | small firm lump at a site | ~1–2 weeks |
| `p10.gi-upset.md` | vomit / diarrhea | 1–2 days |
| `p10.transient-lameness.md` | limp from the calicivirus component | a few days |
| `p10.respiratory-signs.md` | sneeze / mild cough | a few days |

## .see also

- `../inventory.of=hazards.for=feline.case=vaccines-felv-fvrcp-rabies.md` — the matched **hazards → alarms** half
- `../inventory.of=effects.for=feline.case=postvaccinal-reaction.md` — the how-long / why detail, causal chain
- `../inventory.of=effects.for=feline.case=injection-site-sarcoma.md` — the FISS hazard in depth
- `../howto.monitor-injection-site-sarcoma.[lesson].md` — the cron watch method for the FISS hazard
- `../../../../../.agent/repo=.this/role=any/briefs/rule.require.hazard-alerts.[rule].md` — the rule this instantiates

## .sources

all read through the bhrowser on 2026-08-10 (verbatim quotes in the item files); 5 distinct sources:

1. VCA Animal Hospitals — Vaccines for Cats — https://vcahospitals.com/know-your-pet/vaccines-for-cats
2. PDSA — Cat and Kitten Vaccinations — https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/other-veterinary-advice/cat-and-kitten-vaccinations
3. International Cat Care — Vaccinating your cat — https://icatcare.org/articles/vaccinating-your-cat
4. American Veterinary Medical Association (AVMA) — Vaccinating your pet — https://www.avma.org/resources-tools/pet-owners/petcare/vaccinations
5. Cornell Feline Health Center — Feline Vaccines: Benefits and Risks — https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-vaccines-benefits-and-risks
