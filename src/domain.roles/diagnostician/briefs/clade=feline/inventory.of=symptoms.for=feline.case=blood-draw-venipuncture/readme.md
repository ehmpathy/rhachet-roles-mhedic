# inventory.of=symptoms.for=feline.case=blood-draw-venipuncture

> ⚠️ **not veterinary advice — informational only.** a "what to expect" inventory compiled from
> public sources; it does not diagnose and is **not a substitute** for a licensed veterinarian who
> has examined your cat. **if this is an emergency (won't bear weight at all, a swollen leg that
> worsens, collapse) call an emergency vet now.**

## .what

the **symptoms inventory** for the exposure **a blood draw (venipuncture)** — blood pulled from a
vein, commonly the jugular (neck), cephalic (front leg), or medial saphenous (hind leg). **one file
per symptom**, each fitted with its **expectation**: a probability + a duration.

this is one half of a matched pair, per `rule.require.hazard-alerts`:

| inventory | the node | what we fit it with |
|-----------|----------|---------------------|
| **`inventory.of=symptoms`** (this dir) | a **symptom** (an anticipated observable sign) | an **expectation** = probability + duration |
| `inventory.of=hazards` (companion) | a **hazard** (a potential adverse outcome) | an **alert** = monitor + alarm + escalation |

a symptom that overstays or worsens **crosses into a hazard** — read the companion
`../inventory.of=hazards.for=feline.case=blood-draw-venipuncture.md` for its alarm + escalation tier.

## .the file-name scheme — `pNN.$slug.md`

each symptom is a file named **`pNN.$slug.md`**, where `pNN` is an ordinal likelihood bucket
(p50 common / p10 uncommon). full definition:
`../../../../../.agent/repo=.this/role=any/briefs/define.pNN-probability-token.[lesson].md`.

## .the symptoms (this dir)

| file | symptom | duration |
|------|---------|----------|
| `p50.site-soreness-limp.md` | sore leg / limp at the draw site (**bilateral if both legs drawn**) | ~1–2 days |
| `p50.bruise-hematoma.md` | small bruise / firm lump at the draw site | days–~2 weeks |
| `p10.off-feed-lethargy.md` | brief off-feed / shell-shocked / quiet | hours–~1 day |
| `p10.persistent-limp.md` | a limp that persists or begins days later | flags a hazard |

## .the key signal (why this exposure reads benign)

post-venipuncture soreness in cats is **minor and transient** — so minor it has generated **no
cat-specific formal literature** (a pubmed search returned no study of post-venipuncture lameness).
the *absence* of literature is itself the signal: a draw-site bruise or brief limp is an
anecdote-level, self-limited event, not a persistent one. a limp still worse at day 2+ points away
from the draw alone and toward a stacked cause (vaccine, restraint) — see the miki-case disentangle
`2.2.3.itemize-inventory.yield.md`.

## .see also

- `../inventory.of=hazards.for=feline.case=blood-draw-venipuncture.md` — the matched **hazards → alarms** half
- `../../../../../.agent/repo=.this/role=any/briefs/define.pNN-probability-token.[lesson].md` — the `pNN` token
- `../../../../../.agent/repo=.this/role=any/briefs/rule.require.hazard-alerts.[rule].md` — the rule this instantiates

## .sources

all read through the bhrowser on 2026-08-10 (verbatim quotes in the item files); distinct sources:

1. Dial A Vet — cat limping after a blood draw — https://www.dialavet.com/vet-answers/post/cat-limping-after-blood-draw-23205
2. dvm360 — minimizing venipuncture-induced hematomas — https://www.dvm360.com/view/minimizing-venipuncture-induced-hematomas
3. NaturalPetsHQ — cat leg swollen after a blood draw — https://naturalpetshq.com/cat-leg-swollen-after-blood-draw/
4. Clinician's Brief — feline phlebotomy: proceed with care — https://www.cliniciansbrief.com/article/feline-phlebotomy-proceed-care
