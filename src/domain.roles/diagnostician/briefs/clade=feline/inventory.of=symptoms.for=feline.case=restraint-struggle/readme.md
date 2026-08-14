# inventory.of=symptoms.for=feline.case=restraint-struggle

> ⚠️ **not veterinary advice — informational only.** a "what to expect" inventory compiled from
> public sources; it does not diagnose and is **not a substitute** for a licensed veterinarian who
> has examined your cat. **if this is an emergency (won't bear weight at all, a limb at a wrong
> angle, collapse) call an emergency vet now.**

## .what

the **symptoms inventory** for the exposure **physical restraint / struggle** — a cat held firmly
for a procedure (draw, shot, x-ray, nail trim) who wrenches, kicks, and twists against the hold.
the strain comes from the **fight**, not the needle. **one file per symptom**, each fitted with its
**expectation**: a probability + a duration.

this is one half of a matched pair, per `rule.require.hazard-alerts`:

| inventory | the node | what we fit it with |
|-----------|----------|---------------------|
| **`inventory.of=symptoms`** (this dir) | a **symptom** (an anticipated observable sign) | an **expectation** = probability + duration |
| `inventory.of=hazards` (companion) | a **hazard** (a potential adverse outcome) | an **alert** = monitor + alarm + escalation |

a symptom that overstays or worsens **crosses into a hazard** — read the companion
`../inventory.of=hazards.for=feline.case=restraint-struggle.md` for its alarm + escalation tier.

## .the file-name scheme — `pNN.$slug.md`

each symptom is a file named **`pNN.$slug.md`**, where `pNN` is an ordinal likelihood bucket
(p50 common / p10 uncommon). full definition:
`../../../../../.agent/repo=.this/role=any/briefs/define.pNN-probability-token.[lesson].md`.

## .the symptoms (this dir)

| file | symptom | duration |
|------|---------|----------|
| `p50.muscle-soreness-stiffness.md` | sore / stiff muscles, careful movement | ~1–3 days |
| `p10.strain-limp.md` | a limp from a soft-tissue strain/sprain | a few days |
| `p10.stress-hides-off-food.md` | stress: hides, quiet, off food after the visit | hours–~1 day |

## .the key note (a hazard-signal, under-quantified)

"lameness from restraint" has **no peer-reviewed feline literature** — it is an anecdote-level
hypothesis, so these buckets rank *relative* likelihood, not measured rates. but the owner + vet
signal is consistent: a hard struggle can strain muscles or flare prior arthritis, and that
soreness is usually transient. see the miki-case disentangle `2.2.3.itemize-inventory.yield.md` —
the restraint-alone cohort is "real but mostly transient."

## .see also

- `../inventory.of=hazards.for=feline.case=restraint-struggle.md` — the matched **hazards → alarms** half
- `../inventory.of=symptoms.for=feline.case=blood-draw-venipuncture/` — the draw exposure (restraint usually accompanies it)
- `../../../../../.agent/repo=.this/role=any/briefs/define.pNN-probability-token.[lesson].md` — the `pNN` token
- `../../../../../.agent/repo=.this/role=any/briefs/rule.require.hazard-alerts.[rule].md` — the rule this instantiates

## .sources

all read through the bhrowser on 2026-08-10 (verbatim quotes in the item files); distinct sources:

1. r/CATHELP — cat in extreme pain after blood draws (vet: sprain from restraint) — https://old.reddit.com/r/CATHELP/comments/1nxdp3o/my_cat_is_in_extreme_pain_after_blood_draws/
2. r/AskVet — cat in extreme pain after blood draws (vet: sprained muscles from fighting) — https://old.reddit.com/r/AskVet/comments/1ny0t5t/cat_in_extreme_pain_after_blood_draws/
