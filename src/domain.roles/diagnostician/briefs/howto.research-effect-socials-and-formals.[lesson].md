# howto.research-effect-socials-and-formals

## .what

the step-by-step to research an observed **effect** (a symptom + its candidate causes) through
**two complementary evidence streams** — lived social reports AND formal literature — then fuse
them into a single ranked hypothesis.

> ⚠️ **not medical / veterinary advice — informational only.** social reports are unverified
> anecdote; formal literature is not the patient in front of you. the fused rank is a hypothesis
> for a licensed clinician, never a verdict.

## .why two streams

each stream is strong exactly where the other is weak:

| stream | strength | weakness |
|--------|----------|----------|
| **social** (reddit, forums) | lived detail, exposure co-occurrence, the *shape* of a case, large messy n | selection bias (skews to problems), attribution bias, no denominator, unverified |
| **formal** (PubMed, PMC, official labels) | real incidence rates, mechanism, peer scrutiny, a denominator | sparse for rare/mundane events, slow, often silent on the exact combination a patient faced |

social tells you **what a case looks like and which exposures cluster with it**. formal tells you
**how often it truly happens and by what mechanism**. one without the other either invents a rate
from anecdote or misses a real-world signal the literature never studied.

## .the moves

### 1. fix the effect string first

write the symptom with a duration bar and the patient's key attributes, before any search. this
is the query seed AND the relevance filter for every hit.
> miki: ~1yr cat, hind-limb lameness, pain ≥2 days post-visit.

### 2. enumerate the exposures (the levers)

list every action that could be a lever, neutral about harm. each becomes a search axis.
> vaccine · blood draw · restraint · distress.

### 3. gather the SOCIAL stream — search, then read the comments

- craft forward queries (effect + each exposure) and backtrack queries (exposure + "how long").
- **read the comments, not just the post** — the vet's reply or the "mine did this too" is where
  the real attribution lives (`rule.require.read-social-comments`).
- record verbatim quote + url + the exposure tags you can read from the text — never inferred
  beyond the words (`rule.require.bhrowser-citations`: gather through the bhrowser, not
  WebSearch/WebFetch).
- itemize into a contingency table, one row per case, one column per exposure + effect + duration.

### 4. gather the FORMAL stream — incidence + mechanism

- for each top exposure→effect edge, search the literature for a real rate and a named pathway.
- capture the PMID + the verbatim rate/result.
- an edge with no literature is itself a signal — it down-weights that exposure (a mundane event
  the literature does not track as a persistent-harm cause is likely transient).
> miki: Moore 2007 (PMID 17605670) — 51.6 vaccine-adverse-events/10,000 cats, risk greatest
> ~1yr old; venipuncture→persistent-limp — no cat literature at all → down-weight the needle.

### 5. disentangle the social stream (both directions)

run `tactic.disentangle-exposure-causes` over the contingency table:
- **forward** P(effect ≥ duration | exposure alone) — the risk of each lever.
- **backtrack** P(exposure present | effect) — which lever is most implicated among the afflicted.
- seek "X alone" cohorts to break the confound when levers fired together. watch a backtrack
  signal that **collapses** once each case is re-attributed at the case level (miki's blood-draw:
  33% raw backtrack → ~0 needle-attributable once each persistent "post-draw" limp re-attributes
  to restraint / wrong-site / arthritis).

### 6. fuse — let formal calibrate social

- social gives the **rank and the shape**; formal gives the **magnitude and the mechanism**.
- where both point the same way, confidence compounds (miki: vaccine — social cohort is clean +
  persistent AND formal rate + mechanism exist → the lead).
- where formal is silent, keep the social signal but flag it un-studied (miki: restraint strain —
  vet-attested in the cases, no formal literature → plausible, bounded, not the driver).
- where formal contradicts a raw social number, formal wins on magnitude (miki: the needle).
- treat every social percentage as an **upper bound**; the true rate is the formal base rate.

### 7. carry the caveats, always

the fused rank is plausibility from biased anecdote + a small formal set — a hypothesis for the
clinician and the next investigative step, not a diagnosis. association is not causation even for
the lead. if a label-mandated safety trigger exists (e.g. a drug's own stop-and-call line), it
**overrides the rank** — act on it regardless of which cause leads.

## .the anti-patterns

- **social-only** → you invent a rate from a problem-skewed sample and mis-implicate the loud,
  visible exposure over the quiet, hidden one.
- **formal-only** → you miss the real-world case shape and the exposure that co-occurs but was
  never formally studied.
- **fuse without disentangle** → a confounded backtrack number (needle 33%) survives that a
  case-level re-attribution would have dissolved.

## .see also

- `howto.apply-causal-chain-frame` — the four-node frame this research feeds
- `tactic.disentangle-exposure-causes` — the two-direction disentangle used in move 5
- `rule.require.read-social-comments` — why the comments carry the attribution
- `rule.require.bhrowser-citations` — gather through the bhrowser, not WebSearch/WebFetch
- `rule.require.source-inventory` — trust/avoid split for sources
- `inventory.of=examples.causal-chain` — the miki case worked end to end
