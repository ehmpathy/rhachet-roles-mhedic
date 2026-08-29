# $route — a compiled melanoma-diagnosis route

a worked melanoma / pigmented-lesion assessment, declared as a route of milestones. each milestone is
a **stone** (the instruction) that emits a **yield** (the artifact). the route is **compiled**: the
pigmented-lesion differential and the score instruments are known constants, cited once into
`accrue/`, so the runtime route **applies** them rather than re-discovers them per case.

> ⚠️ **not medical advice — informational only.** this route is a method demo; the patient was not
> examined and no lesion was biopsied. a licensed clinician confirms. **if this is a medical
> emergency, call your local emergency number now.**

## .the shape

| file | role |
|------|------|
| `N.M.phase.step.stone` | the milestone instruction — inputs, do, emit, done-when |
| `N.M.phase.step.yield.md` | the artifact that stone produces (case application — obscure tier) |
| `N.M.phase.step.guard` | the gate — self + peer reviews, judges |
| `accrue/inventory.of=<topic>.md` | reusable, cited, case-neutral facts (fullsun — promotable) |

## .the route (5 phases)

```
1. intake        capture the lesion history + ABCDE observations + red-flag symptoms
2. score         apply the fixed ABCDE instrument + a validated dermoscopy checklist (pre-cited thresholds)
3. redteam       the can't-miss guard — the closed set of asymmetric-miss presentations
4. acuity        collapse to a binary: emergency-now vs. see-a-clinician-soon
5. output        two-layer: plain patient summary on top, cited clinical detail beneath
```

this is **not** the general open-differential engine (`diagnose.health`). melanoma is a **closed**
domain, so there is no per-case enumeration or disentangle phase — the differential is a known
constant, referenced from `accrue/`, not rebuilt per lesion.

the acuity is **binary** by design (emergency-now vs. see-a-clinician-soon) — there is no
self-managed "watch" tier for a melanoma-flagged lesion. the output is **two-layered**: a plain
patient summary on top, the cited clinical read beneath.

read the design rationale in the skill's
`philosophy.diagnosis-melanoma-route.[philosophy].md`, the compile principle in
`rule.require.amortize-known-domain-research`, and the guardrails it enforces:
`motto.not-medical-advice`, `rule.require.bhrowser-citations`, `rule.require.accrue-research`,
`rule.forbid.pii`.

## .the promote step

when the route completes, **promote** the genuinely generic facts from `accrue/` into the repo-shared
`.agent/repo=.this/role=any/briefs/inventory/` (per `rule.require.source-inventory`), so future
routes inherit them.
