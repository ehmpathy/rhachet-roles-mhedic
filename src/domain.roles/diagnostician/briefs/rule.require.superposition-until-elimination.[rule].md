# rule.require.superposition-until-elimination

## severity: blocker

a scenario stays in the diagnostic superposition until an **assay explicitly eliminates it**. low
probability never removes it; only a **test that separates it out** does. therefore the treatment
plan must be **safe against every live scenario** — a treatment contraindicated by *any*
un-eliminated catastrophic branch is **vetoed** until that branch is ruled out. to unlock the
treatment, **eliminate the branch, do not discount it.**

---
---
---

# deets

## .what

when a diagnosis is a superposition of ranked scenarios (per `define.diagnosis-superposition`), a
scenario is **live** until a test rules it out. three things do **not** remove a scenario from the
live set:

- **low probability** — a 5% branch is still live at 5%
- **absence of a positive finding** — absence of evidence is not evidence of absence
- **the top scenario looks clean** — a strong front-runner does not eliminate the ones behind it

only an **assay that distinguishes the scenario out** removes it. until then, the treatment plan
must be **safe against it**.

## .the veto

the plan is the **envelope** of the live set. so:

> a treatment that would be a **landmine-step** — catastrophic or irreversible harm — under **any**
> live scenario is **vetoed from the plan**, even if that scenario is improbable, until that
> scenario is eliminated by a test.

**severity drives the veto; probability drives the rank.** a low-probability branch cannot dominate
the plan for the likely case, but it **can** forbid a treatment that would detonate it. the two
roles are separate: rank orders the scenarios; severity vetoes the actions.

## .the worked example

- there is a **5% chance** the true scenario is `$landmine` (a branch where a specific treatment
  causes catastrophic harm).
- `$stomp` is a treatment that helps in the other 95% but is **catastrophic if `$landmine` is true**.
- the naive move: "it's only 5%, prescribe `$stomp`." **forbidden.** `$landmine` is un-eliminated, so
  it is live, so `$stomp` is a landmine-step, so `$stomp` is **vetoed**.
- the correct move: **order the test that eliminates `$landmine`.** if it clears, `$stomp` unlocks.
  if it does not, `$stomp` stays vetoed and the plan routes around it. you never argue the landmine
  away by its low odds — you **test it out or plan around it.**

this is the productive pressure the rule creates: the veto is what makes the **assay stage earn its
keep** — the assay exists precisely to shrink the superposition enough to act safely.

## .why

- **primum non nocere** — first, do no harm. a plan that steps on an un-eliminated landmine has done
  harm the moment it is prescribed, regardless of the odds.
- **asymmetric cost** — the cost of a missed catastrophic branch is not symmetric with the cost of a
  test. you buy the test to avoid the catastrophe, exactly as emergency medicine works up the
  can't-miss branch (the heart attack behind the probable reflux) before it acts.
- **the veto is cheap to honor** — most vetoes are lifted by one distinguishing test. the rule does
  not forbid the treatment forever; it forbids it **until the branch is cleared.**

## .how

1. **enumerate** each live scenario's full consequence package (`scenario.enumeration`).
2. **assay to eliminate** — order the tests whose job is to remove scenarios from the superposition
   (`scenario.elimination.via.assay`). name, for each live scenario, the test that would rule it out.
3. **hold the un-eliminated** — any scenario no test cleared stays live and constrains the plan.
4. **veto the landmine-steps** — no treatment that is catastrophic under any live scenario enters the
   plan until that scenario is eliminated.
5. **plan the envelope** — the plan is safe to the worst-case of the live set, not wasteful past the
   best-case, and takes the no-regret actions first.

## .the boundary — this is not "treat every scenario"

the rule does **not** demand you treat every branch, or route around every trivial risk. it demands:

- you do not **drop** a scenario by probability alone (only a test drops it), and
- you do not **prescribe an action** that is catastrophic under a live scenario.

a low-severity live scenario constrains no action that matters; it is the **catastrophic** live
scenarios that veto. severity is the gate on the veto, exactly as `(probability × severity)` is the
gate on the workup depth.

## .enforcement

- a treatment plan that includes an action **contraindicated by a live (un-eliminated) catastrophic
  scenario** = **blocker**
- a scenario **dropped from the superposition by probability alone** — no test eliminated it =
  **blocker**
- a live catastrophic scenario with **no named test** that would eliminate it, where one exists =
  **blocker** (the assay stage must name the eliminating test)
- a plan built only against the **top-ranked** scenario, blind to the worst-case of the live set =
  **blocker**

## .see also

- `define.diagnosis-superposition.[lesson].md` — the frame this rule protects
- `ref.decision-theory-and-cant-miss.[ref].md` — the cited grounding (primum non nocere, minimax,
  can't-miss reasoning, absence-of-evidence)
- `rule.require.hazard-alerts.[rule].md` — the per-exposure hazard/alert discipline this composes with
- `motto.not-medical-advice.[motto].md` — the plan is informational; a licensed clinician acts on it
