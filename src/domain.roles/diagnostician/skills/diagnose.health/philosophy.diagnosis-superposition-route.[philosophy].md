# philosophy: the superposition-diagnosis route

## .what

this brief teaches **why** the `diagnose` route is shaped the way it is — for the humans and robots
who will consume it (drive it) and maintain it (change it). the skill beside this file stamps the
route; this file explains the design so nobody flattens it back into a naive "guess the one cause"
pipeline.

## .the core idea — a diagnosis is a superposition, not a point

a diagnosis from history — before every test that separates the scenarios is run — is **not one
charge**. it is a **probability-ranked set of live scenarios**, each with its own consequence package
(best-case, worst-case, prevention, recurrence, supportive-care). the route is built to construct,
refine, and present that superposition — not to collapse to a single guess. see
`define.diagnosis-superposition` + `rule.require.superposition-until-elimination`.

## .the nine phases and why each exists

```
1. intake                         capture · structure · gaps
2. scenario.enumeration           from.imagination · from.literature · blend
3. scenario.disentangle           correlation.literature · correlation.anecdotes · correlation.blend
4. scenario.elimination.via.assay enumerate · rank · plan
5. scenario.rerank.via.redteam    steelman · attack · refine
6. scenario.superposition         bounds · prevention · care   (deep research — survivors only)
7. acuity.via.envelope            emergency · sameday · watch
8. diagnosis.superposition        ranked · eliminated · envelope
9. treatment.superposition        noregret · conditional · veto   (prescriber)
```

## .the design principles baked into that order

### 1. two streams, everywhere evidence is gathered

both **enumeration** (phase 2) and **disentangle** (phase 3) split by *source*, because a single
stream silently biases the result:

- **imagination** (first-principles logic) catches the rare branch literature under-reports
- **literature / anecdotes** (bhrowser ground truth) catches the branch that logic blind-spots
- the **blend** reconciles them, and their *disagreement is itself signal*

note the asymmetry: enumeration has an imagination stream; disentangle does not. imagination can
*propose* a scenario but cannot *weight* one — only evidence yields a correlation. so an
imagination-only scenario enters disentangle with **zero correlation weight** and survives on
**severity alone** (the can't-miss floor) — exactly the safety property at work.

### 2. bracket, don't pool

phase 3 keeps formal base rates (`correlation.literature`) and biased anecdote signals
(`correlation.anecdotes`) in **separate stones**, blended only by a **bracket** — the anecdote is an
upper bound, the formal is the base rate; they are never averaged into a false midpoint. the split
into separate stones makes this discipline unskippable.

### 3. eliminate before you deep-research

the expensive per-scenario consequence package (phase 6) comes **after** elimination (phase 4) and
redteam (phase 5) — so deep research is spent only on the **survivor, reranked** scenarios, never
wasted on branches a test rules out. mechanism stays early (needed to design the assay); the costly
best/worst/prevention/care research waits for the survivors.

### 4. severity vetoes, probability ranks

the two roles are separate and never conflated:

- **probability** orders the scenarios (the rank)
- **severity** vetoes actions (the safety gate)

a 5% catastrophic branch cannot dominate the plan for the likely 95%, but it **can** forbid a
treatment that would detonate it — until a test eliminates it. this is why the **assay stage earns
its keep**: it shrinks the superposition enough to act safely.

### 5. the plan is an envelope, and itself a superposition

phase 9 does not emit a point-plan. it emits a **treatment superposition**: the **no-regret** actions
that hold across every live state, plus **conditional** branches keyed to assay outcomes ("if the
test clears $landmine → $stomp; else route around"), with a **veto** pass that confirms no action is
a landmine-step against any live scenario. the plan collapses branch-by-branch as assays eliminate
states. phase 9 is the **prescriber's** domain (the diagnostician defers treatment — the
prescriber-boundary).

### 6. research compounds — accrue + promote

every research stone lifts its generic, cited facts into `$route/accrue/inventory.of=<topic>.md`
(fullsun, reusable), separate from the case yield (obscure, per-case) — per
`rule.require.accrue-research`. a later **promote** step graduates the proven-generic facts to the
repo-shared `inventory/`. so each case is a *deposit* into a grown cited base, not a dead end.

### 7. every phase is a group, not a lone stone

a phase with a single stone hides un-decomposed reasoning that cannot be reviewed or guarded at
grain. each phase is split into stones by its **kind of act** — fuse (source·source·blend),
generate→choose (enumerate·rank·plan), dialectic (steelman·attack·refine), tier (now·soon·watch),
present (ranked·eliminated·envelope), plan (noregret·conditional·veto). the split is what lets each
sub-step carry its own guard.

## .the grounds

the frame unifies established decision-theory + clinical canon — cited (bhrowser-verified) in
`ref.decision-theory-and-cant-miss.[ref].md`: expected-utility (von Neumann–Morgenstern), minimax /
precautionary principle (Wald), primum non nocere, can't-miss / rule-out reasoning, and
absence-of-evidence-is-not-evidence-of-absence.

## .for maintainers — what NOT to do

- **do not** collapse a phase to one stone "for speed" — you lose the guard grain (principle 7)
- **do not** pool formal + anecdote signals into one correlation (principle 2)
- **do not** drop a scenario by low probability alone — only a test drops it (superposition-until-elimination)
- **do not** move the deep consequence research (phase 6) before elimination (principle 3)
- **do not** let a research stone write facts only into the yield — accrue them (principle 6)
- **do not** let the diagnostician prescribe treatment — phase 9 is the prescriber's (the boundary)

## .see also

- `define.diagnosis-superposition.[lesson].md` — the frame
- `rule.require.superposition-until-elimination.[rule].md` — the safety veto
- `rule.require.accrue-research.[rule].md` — the compound-research discipline
- `ref.decision-theory-and-cant-miss.[ref].md` — the cited backbones
- `howto.research-effect-socials-and-formals.[lesson].md` — the two-stream method
- `define.causal-chain-frame.[lesson].md` — the mechanism each scenario is built on
