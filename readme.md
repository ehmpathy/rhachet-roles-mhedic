# 🐍 rhachet-roles-mhedic

medical and health roles and skills, via [rhachet](https://github.com/ehmpathy/rhachet)

## purpose

mhedic = medic + medicine + mend

this repo provides roles for health research, analysis, and guidance:
- symptoms — what the body signals
- causes — the mechanism beneath the signal
- care — the sound course of action

health is systems. bodies, medicines, and protocols interact by rules. these roles help navigate that system.

## disclaimer

> ⚠️ **this tool is for informational purposes only and does not constitute medical advice.** search results and analyses are not exhaustive and must not be relied upon for medical decisions. consult a licensed clinician for any health matter — diagnosis, treatment, medication, or emergency care.

## install

```sh
npm install rhachet-roles-mhedic
```

## roles

### 🩺 diagnostician

- **scale**: patient-level, clinical assessment
- **focus**: intake, differential diagnosis, what to test, urgency
- **maximizes**: accurate causes traced from the symptoms observed

used to take the history, narrow the differential, decide which tests to order, and judge acuity — is this an emergency now, or can it wait?

### 💊 prescriber

- **scale**: condition-level, treatment
- **focus**: treatment options, care plans, what to do next
- **maximizes**: sound courses of action matched to the diagnosis

used to turn a cause into a concrete plan — medications, procedures, and the care that follows.

### 🧭 referrer

- **scale**: system-level, logistics
- **focus**: which specialist, where to go, where to get the tests
- **maximizes**: the shortest path to the right care

used to route a patient to the right place. the diagnostician decides *what* to test; the referrer decides *where* to get it done and *who* to see.

### 🛡️ preventer

- **scale**: lifetime-level, preventative care
- **focus**: screen tests, vaccines, risk factors, lifestyle
- **maximizes**: illness avoided before it starts

used to stay ahead of disease — what to screen for, when, and which risks to reduce.

### 🧬 phylogeneticist

- **scale**: tree-of-life, cross-species
- **focus**: clades, ancestral-state reconstruction, homology vs analogy
- **maximizes**: correct cross-species transfer of a mechanism

used to reconstruct where a biological mechanism arose on the tree of life and who inherits it — the clade library that tells the other roles whether a mechanism transfers across species (conancestral) or diverged in one lineage. the prescriber references it when a drug's safety hinges on a divergence, like the feline UGT1A6 loss.

### ⚕️ physician

- **scale**: whole-person, coordination
- **focus**: holistic review across diagnosis, treatment, and referral
- **maximizes**: balanced care across the full picture

used to compose diagnostician, prescriber, and referrer into one coherent view — the generalist who sees the whole patient.

## skills

<!-- TODO: add mhedic skills once the roles are built out. -->

## mascot

this repo houses the snake 🐍 — the ancient and literal symbol of medicine.

why the snake? it is the **Rod of Asclepius**: a single serpent coiled around a staff, carried by Asclepius, the Greek god of medicine and cures. it has marked the medical arts for millennia, and still marks hospitals, ambulances, and the WHO today.

> **note**: the true medical symbol is the *single*-snake Rod of Asclepius — **not** the winged, two-snake **caduceus**, which belongs to Hermes, god of commerce and messengers. a common mix-up worth a correction.

the serpent embodies the principles of good medical work:

1. 🐍 shed & renew — the snake sloughs its worn skin; care restores what illness took
2. ⚕️ the dose makes the cure — the same substance poisons or cures by the measure alone (the root of *pharmakon*, and of pharmacology)
3. 👁️ watchful & precise — strikes only where needed, with exact aim
4. 🌿 temple-tender — live serpents roamed the ancient sanctuaries of care (asclepieia), woven into the rituals of the sick

<!-- TODO: map an instrument to each mhedic role, once the roles have skills to wield one -->

## consumed roles

mhedic consumes these roles from other registries rather than re-implements them:

| role | from | why |
|------|------|-----|
| 🔎 transcriber | [`rhachet-roles-rhight`](https://github.com/ehmpathy/rhachet-roles-rhight) | OCR / scanned-doc extraction — useful for scanned medical records |
| 🌐 bhrowser | [`rhachet-roles-bhrowser`](https://github.com/ehmpathy/rhachet-roles-bhrowser) | trusted source reads — every citation goes through it |

## citations

all factual claims in this repo must be traced through the **bhrowser** — never WebFetch or WebSearch.

those APIs return summaries and snippets we cannot verify; the bhrowser drives a real browser and returns what is genuinely on the page. in a medical registry, a wrong citation can carry into guidance a human acts on, so the bar is absolute.

see `rule.require.bhrowser-citations` and `rule.require.seven-distinct-citations` (>= 7 distinct sources per research doc).

## why open source

to help folks navigate health systems more effectively, mutually. we all gain from transparent and open source health exploration.

**for clinicians**: contribute upstream to help communities and advertise your expertise. fork and specialize to leverage your own curated robots. (want help to deploy your own specialized robot clones into your practice? let us know, we consult)

**for normies**: leverage open source health exploration. although it is certainly **not medical advice** and you should always **consult a clinician** before you make any decision, this gives you a robot clone to discuss with and explore ideas with.

let's raise the floor. mutually.
