# howto.disentangle-via-matrix

## .what

the reusable procedure to **disentangle which exposure drove an effect** via a contingency matrix
computed in two directions, with a rewind loop that gathers more when the sample is thin.

this is the how-to for the `2.2.differential.disentangle` stage; the demo route
(`case=miki-vet-2026-08-07/2.2.1..2.2.5`) is one run of it.

> ⚠️ **not medical / veterinary advice — informational only.** a signal-rank method; its
> output is a hypothesis for a clinician, never a verdict.

## .the frame it serves

the four-node causal chain (`define.causal-chain-frame`):

```
cause:exposure ──▶ cause:mechanism ──▶ effect:mechanism ──▶ effect:symptom
```

disentangle attributes the **cause:exposure** node — the lever — against the observed
**effect:symptom**. it does not need the middle nodes settled; that is the point (attribute the
action before the lesion is known).

## .the contingency matrix (per exposure, both directions)

for each exposure X, tally cases into a 2×2:

```
                effect: yes    effect: no
exposure X: yes      a              b
exposure X: no       c              d
```

- **forward** (cohort) = **P(effect | X)** = a / (a + b) — the *risk* of the action
- **backtrack** (case-control) = **P(X | effect)** = a / (a + c) — how *implicated* the action is

the two are different quantities (bayes); compute **both**. the deconfound comes from a preference
for **"X alone" cases** in the forward cell — X without the other exposures — so a is not inflated
by a co-present lever.

## .the loop

```
2.2.1 craft ─▶ 2.2.2 gather ─▶ 2.2.3 itemize ─▶ 2.2.4 compute
                  ▲                                   │
                  └────────── n too thin ────────────┘   (rewind: craft more queries / sources)
                                                      │
                                               n sufficient
                                                      ▼
                                               2.2.5 attribute
```

| stage | does | emits |
|-------|------|-------|
| craft | effect string, exposure set, query set (both directions), multi-source list | the search recipe |
| gather | bhrowser run, read comments, prefer "X alone" | raw cases + verbatim quotes |
| itemize | one row per case, tagged by each exposure + effect | the tagged table |
| compute | the 2×2 per exposure, both directions, + the convergence gate | the matrix + verdict |
| attribute | rank exposures by combined weight → re-rank the effect:mechanisms | the result |

## .the convergence gate (why the loop exists)

at **compute**, check each exposure has enough "X alone" cases to attribute independently:

- rule of thumb: >= 3 "X alone" cases per exposure, with >= 1 effect-yes and >= 1 effect-no (a
  cell that is all-yes or all-no tells you little).
- **thin** → rewind to **craft**: add queries, add sources (do not lean on one subreddit —
  r/AskVet auto-strips anecdotes; spread across r/cats, r/CatAdvice, r/Pets, vet forums). re-run
  gather → itemize → compute. record the round count.
- **sufficient** → proceed to attribute.

## .the caveats (always carried)

- social skews to problems → the forward risk is an **upper bound**, not a base rate.
- small n → the rank is plausibility, not epidemiology.
- association across exposures is not causation → the output feeds the clinician + the assay
  stage, never replaces them.

## .see also

- `define.causal-chain-frame` — the four-node frame
- `tactic.disentangle-exposure-causes` — the tactic this how-to operationalizes
- `rule.require.bhrowser-citations` · `rule.require.read-social-comments`
- the demo run: `case=miki-vet-2026-08-07/2.2.1..2.2.5`
