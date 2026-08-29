# todos: enrouted-skill consistency

## .what

a durable home for the follow-ups deferred out of the `v2026_08_14.referral-of-dermo`
behavior (the `diagnose.melanoma` + `refer.care` build). each was flagged by the
`enroll-impl-arch-defects` peer reviewer as out-of-scope-for-that-behavior but worth a later
pass, so they are recorded here rather than lost inside the review thread.

## .why

three enrouted skills now exist — `diagnose.health`, `diagnose.melanoma`, `refer.care` — and
the pattern will recur. the items below are the shared-consistency debt that pattern carries.

## .the follow-ups

1. **extract a shared skill-runtime lib.** `output.sh` (the snake-vibe tree-print stack) and
   the `init.sh` stamp-and-bind sequence (nullglob stone guard → copy `.stone`/`.guard`/
   `readme.md` → seed `accrue/readme.md` → `route.bind.set`) are byte-identical across all
   three skills — past the rule-of-three (`rule.prefer.wet-over-dry`). the common ancestor is
   `src/domain.roles/` (per `rule.prefer.most-common-denominator`); a
   `src/domain.roles/.shared/skill-runtime/` sourced by every skill collapses 3 copies → 1,
   and the next enrouted skill inherits the hardened contract for free.

   the **integration-test harness** is triplicated the same way: `runSkill`, `sanitize`,
   `copySkill`, and all nine given-cases (help, bogus subcommand, init snapshot, bind-failure
   via PATH stub, unknown option, absent templates dir, zero stones, no subcommand, default
   dated path) are byte-identical across `diagnose.melanoma.integration.test.ts` and
   `refer.care.integration.test.ts`. a shared test-harness beside the runtime lib (a
   `genSkillHarness({ entry, slug })` that returns the case-suite) collapses the two copies and
   makes every future skill's test-suite a one-liner. fold into this same pass.

2. **~~backport `diagnose.health` onto the hardened contract.~~ DONE (2026-08-15).** the
   backport landed inside the `referral-of-dermo` behavior after the reviewer brains were
   upgraded: `diagnose.health.sh` now uses exit-2 + stderr + guard-clauses (no else),
   `diagnose.health/init.sh` fails loud on bind failure (exit 2) and on a no-stones templates
   dir (exit 1) with a nullglob guard + an unknown-option fail-fast, and
   `diagnose.health/output.sh`'s `print_error` writes to stderr. crucially, a full
   `diagnose.health.integration.test.ts` (9 cases, a mirror of the two new skills) was added at
   the same time, so the once-untested skill is now clamped. all three skills now share one
   exit-code + stream contract. what remains is only the DRY extraction (#1) — the divergence
   itself is closed.

3. **named args for the `output.sh` tree-print operations.** the print utils take positional
   args; convert to the `(input)` object shape (`rule.forbid.positional-args`) as part of #1.

4. **~~ergonomic hand-off flag `refer.care init --seed-from <path>`.~~ DONE (2026-08-15).** the
   `--seed-from <path>` flag landed inside the `referral-of-dermo` behavior: `refer.care init`
   copies the acuity yield into `0.seed.md` at stamp time (findsert-safe, fail-loud on an absent
   source), documented in `refer.care.sh --help` and `refer.care/templates/readme.md`, and clamped
   by `refer.care.integration.test.ts` `[case12]`–`[case14]` plus a real back-to-back round-trip
   in `handoff.diagnose-melanoma-to-refer-care.integration.test.ts` `[case4]`. the manual `cp` is
   now mechanized (flagged by `enroll-impl-behavior-intent` at i014).

## .status — #1 is NEXT-UP

item #1 (shared skill-runtime lib + `genSkillHarness` harness rework + #3 named args) is the
**next scoped behavior after `referral-of-dermo`**, not a someday item. the `enroll-impl-arch-defects`
reviewer escalated the triplication to a blocker at i014; it is held there only because the
extraction is an infrastructure fulcrum — the shared lib sits outside the hermetic `copySkill`
temp-isolation boundary, so it needs a harness rework (an env-override `SKILL_RUNTIME_DIR` that
lets the copied skill point at a copied shared lib) plus a snapshot re-check. every
drift-prone spot is clamped in the interim, in **all three** suites: `[case10]` valueless `--at`,
`[case11]` idempotent re-stamp, consistent early-return `output.sh`, and — added after the i018
fail-loud bind fix — the exit-1 "repo state inconsistent" branch (`[case16]`/`[case12]`) plus the
happy-path bind footer (`[case17]`/`[case13]`). so the maintenance hazard is test-guarded until
the extraction lands. (the i018→i019 drift, where the exit-1 clamp first landed only in
`refer.care`, was itself caught by peer review and backported to both diagnose suites at i020 —
the exact cost this extraction repays.)

these are **deferred, not dropped.** the in-scope fixes (exit-code semantics, stderr,
fail-loud bind, nullglob, unknown-arg fail-fast, judge-gates on the safety-critical stones,
clamp tests for the fail-fast branches, and the `--seed-from` hand-off flag) all landed inside
the behavior itself. what remains here is the cross-skill DRY extraction (#1 + #3) — one pass.
