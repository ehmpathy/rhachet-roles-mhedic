# inventory.of=examples.causal-chain

## .what

worked examples that exercise the four-node frame (`define.causal-chain-frame`), chosen to make
the **many-to-many** cause:mechanism ↔ effect:mechanism relationship concrete.

> ⚠️ **not medical / veterinary advice — informational only.** illustrative examples for the
> reason-frame, not case guidance. general physiology; a clinician judges any real patient.

## .how to read a row

```
cause:exposure → cause:mechanism → effect:mechanism → effect:symptom
   (lever)         (pathway)         (lesion/state)      (sign)
```

---

## .example 1 — one exposure fans out to many effect:mechanisms

**a single lever, several possible lesions** — why you cannot stop at the first guess.

| exposure | mechanism (pathway) | effect:mechanism (lesion) | symptom |
|----------|--------------------|--------------------------|---------|
| intramuscular vaccine | needle trauma | localized myositis | limp |
| ″ | immune adjuvant response | sterile injection-site abscess | a swell, limp |
| ″ | needle near a nerve | nerve irritation | limp, paresthesia |
| ″ | (rare) chronic inflammation | injection-site sarcoma (feline) | a persistent mass |

one exposure → four different lesions → symptoms that overlap. the frame forces the enumeration.

---

## .example 2 — one effect:mechanism fed by many exposures

**one lesion, several possible levers** — why attribution needs the disentangle stats.

| effect:mechanism (lesion) | ← cause:mechanism | ← cause:exposure |
|--------------------------|-------------------|------------------|
| hind-limb hematoma | vessel puncture | blood draw (saphenous) |
| ″ | blunt trauma | rough restraint |
| ″ | injection-site bleed | vaccine injection |

same lesion, three candidate levers. only forward/backtrack cohorts tell them apart.

---

## .example 3 — the full cross-wire (human, common)

**dehydration headache** — many exposures, many pathways, that converge and diverge.

```
exposure          mechanism               effect:mechanism        symptom
─────────         ─────────               ────────────────        ───────
low fluid intake ─┐  ┌ reduced plasma vol ─┐  ┌ cerebral traction ─┐  headache
heat / sweat    ──┼──┤ electrolyte shift  ─┼──┤ vasoconstriction  ─┼─ dizziness
alcohol         ──┘  └ diuresis           ─┘  └ reduced perfusion ─┘  fatigue
```

three exposures → three pathways → three lesion-states → three symptoms that overlap, fully
cross-wired. no single edge is "the" cause; the frame ranks the paths.

---

## .example 4 — same symptom, opposite chains (why anchor ≠ diagnosis)

**a limp** anchors two entirely different chains:

- `vaccine → immune myositis → inflamed muscle → limp` (inflammatory; eases on an anti-inflammatory)
- `restraint → joint hyperextension → sprain → limp` (mechanical; does not fully ease on an anti-inflammatory)

the **response to a lever** (does an anti-inflammatory relieve it?) is itself an edge-test that
separates the two chains — the logic behind miki's dose-locked pattern.

---

## .the lesson these examples teach

- never collapse cause:mechanism and effect:mechanism — examples 1 & 2 are the same lesion word
  reached by different pathways, or one pathway that reaches different lesions.
- the anchor (effect:symptom) is shared across chains — the diagnosis is the *path*, not the
  endpoint (example 4).
- attribution needs cohorts, not a single case (example 2) — hence the disentangle stats.

## .see also

- `define.causal-chain-frame` · `howto.apply-causal-chain-frame`
- `define.causal-chain` (`repo=.this/role=any`) — the ontology
- `tactic.disentangle-exposure-causes` — the attribution method these examples motivate
