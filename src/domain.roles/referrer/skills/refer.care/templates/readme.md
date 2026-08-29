# $route — a care-referral route

a worked referral, declared as a route of milestones. each milestone is a **stone** (the instruction)
that emits a **yield** (the artifact). the research stone also **accrues** reusable cited facts into
`accrue/`.

> ⚠️ **not medical advice — informational only.** this route routes a patient to care; it does not
> examine, diagnose, or judge urgency. a licensed clinician confirms. **if this is an emergency, call
> an emergency hospital (or your local emergency number) now.**

## .the shape

| file | role |
|------|------|
| `N.M.phase.step.stone` | the milestone instruction — inputs, do, emit, done-when |
| `N.M.phase.step.yield.md` | the artifact that stone produces (case application) |
| `N.M.phase.step.guard` | the gate — self (+ peer, where the claim is independently rule-checkable) reviews, judges |
| `accrue/inventory.of=<topic>.md` | reusable, cited, case-neutral facts (promotable) |

## .the boundary

the diagnostician sets **urgency**; the referrer translates that urgency into a **venue** and a
walkable path to real care. the referrer does **not** re-judge acuity — it carries the urgency as
GIVEN. a referrer that re-grades severity has stepped out of scope (see
`define.referrer-scope.[lesson].md`).

the **canonical hand-off** is the diagnostician's `4.1.acuity.yield.md` — it names the onward-care
kind + the urgency read and stops short of the venue, which is exactly this route's input and no
more. seed `0.seed.md` from it — either hand-copy it, or let the skill place it at stamp time with
`rhx refer.care init --seed-from <path-to-4.1.acuity.yield.md>` (the mechanized hand-off). the
diagnostician's `5.1`/`5.2` output layers are for the human reader, not this engine, so a referral
is never seeded from them.

## .the route (6 phases)

```
1. intake.need        capture the specialty implied + urgency (as given) + access constraints
2. venue.enumerate    ER / urgent / primary / specialist / telehealth — which fit the urgency
3. clinician.find     teach-to-search: real options via bhrowser + the repeatable method
4. access.rank        sort by the path the patient can actually walk (wait × cost × distance × language)
5. prepare            what to carry, what to ask, what to expect
6. referral.yield     6.1 clinical detail · 6.2 plain-language patient summary + disclaimer
```

the clinician options come from a **live bhrowser search**, not a sanctioned directory (wisher's
call). so the durable deliverable is the **method** as much as the list — the human is taught to
re-run the search. read the rules it enforces: `define.referrer-scope`,
`rule.require.bhrowser-citations`, `rule.require.accrue-research`, `motto.not-medical-advice`.

## .the two-layer output

the final yield is two-layered — the raw clinical detail (venue options, ranked clinician options,
citations, method) is the **engine**; the plain-language patient summary is the **interface**. a
layperson reads the top layer ("here's who to see and how to get seen"), which always carries the
not-medical-advice disclaimer and the emergency carve-out.

## .the promote step

when the route completes, **promote** the genuinely generic facts from `accrue/` to their
most-common-denominator home (per `rule.require.accrue-research`): a referrer-owned fact → the
referrer role leaf `src/domain.roles/referrer/briefs/inventory/`; a genuinely cross-role fact → the
repo-shared `.agent/repo=.this/role=any/briefs/inventory/`, so future routes inherit them.
