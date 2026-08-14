# define.diagnosis-superposition

## .what

a diagnosis from history — or from any incomplete evidence, before every test that separates the
scenarios is run — is **not a single charge**. it is a **superposition**: a probability-ranked set
of **live scenarios**, where each scenario carries its own full **consequence package**:

- **mechanism** — the causal chain that would produce the observed effect (per `define.causal-chain-frame`)
- **best-case** — the benign bound: how mild this scenario runs if it resolves well
- **worst-case** — the catastrophic bound: the most harmful outcome this scenario can reach
- **prevention** — how a recurrence of this scenario is forestalled
- **recurrence** — the odds and pattern of a recurrence
- **supportive-care** — the care path that helps the patient heal under this scenario

the diagnosis is the whole ranked set held together, **not** the top pick with the rest discarded.

## .why a superposition, not a point

- **you cannot choose an action without the payoff of each state.** a treatment plan is a decision
  under uncertainty; the consequence of each scenario is an **input** to that decision, not an
  output of it. so every live scenario's consequences must be worked up **before** the plan is set,
  not after the charge collapses.
- **the plan is chosen to the outer bounds.** the prescribed treatment covers the **worst-case** of
  the live set (so a landmine is never stepped on) and does not over-treat past the **best-case**
  (so a benign course is not harmed by aggressive care it never needed). the plan is the **envelope**
  of the superposition, plus the **no-regret** actions that hold no matter which state is true.
- **a point-collapse discards the information the plan needs.** the moment you name one charge and
  drop the rest, you have thrown away the worst-case bounds that should have constrained the plan.

## .the two probability passes

probability runs **twice**, because you cannot enumerate an infinite scenario set:

1. **coarse rank first** — a rough order to bound *which* scenarios are worth a full workup (the
   `disentangle` loop does this). this gates the enumeration, so the set stays finite.
2. **red-team refine last** — after every scenario above the floor has its full consequence package,
   red-team each **fully-worked** scenario to settle its refined probability. only a scenario with
   its whole package in hand can be honestly ranked, because a scenario's severity is part of why it
   ranks where it does.

## .which scenarios earn a full workup — the (probability × severity) floor

triage the depth by **(probability × severity)** — but weight severity heavily:

- a **low-probability / high-severity** branch (a can't-miss landmine — e.g. injection-site
  sarcoma / FISS) **still earns a full workup**, because its worst-case bound drives the plan even
  when it is improbable (per `rule.require.superposition-until-elimination`).
- only the **vanishingly-trivial** branches — low probability **and** low severity — are worked up
  lightly or held as a noted possibility.

the rule: **full workup for every scenario above a (probability × severity) floor.**

## .the shape of a superposition diagnosis

| element | what it holds |
|---------|---------------|
| the ranked set | every live scenario, ordered by refined probability |
| per-scenario package | mechanism · best-case · worst-case · prevention · recurrence · supportive-care |
| the eliminated set | scenarios a test explicitly ruled out, kept visible with *what* eliminated them |
| the plan envelope | the treatment plan that is safe to the worst-case and not wasteful past the best-case |
| the no-regret actions | steps that hold across every live scenario |

## .grounding

this frame is the union of established decision-theory and clinical-reasoning canon — the citations
are gathered (bhrowser-verified) in `ref.decision-theory-and-cant-miss.[ref].md`:

- **expected-utility & statistical decision theory** — a choice under uncertainty weighs each
  state's payoff by its probability (von Neumann–Morgenstern; Wald)
- **minimax / maximin & the precautionary principle** — under catastrophic, irreversible outcomes,
  bound the worst case rather than the average
- **primum non nocere** — first, do no harm: the plan must not be a landmine-step in any live state
- **can't-miss / rule-out reasoning** — clinicians rank by *what kills the patient*, not by *what
  is most likely*, and work up the lethal branch even when it is improbable
- **absence of evidence is not evidence of absence** — low probability is not elimination

## .see also

- `rule.require.superposition-until-elimination.[rule].md` — the safety veto: a scenario stays live
  until a test eliminates it, and the plan must be safe against every live scenario
- `ref.decision-theory-and-cant-miss.[ref].md` — the cited backbones this frame unifies
- `define.causal-chain-frame.[lesson].md` — the mechanism each scenario is built on
- `tactic.disentangle-exposure-causes.[lesson].md` — the coarse-rank pass that bounds the set
