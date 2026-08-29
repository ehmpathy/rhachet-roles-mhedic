# chore(repo-hygiene): auto-gitignore scratch dirs (.play/temporary, .plan/temporary) on repo boot

## .what

a repo boot / repo-hygiene step (owned by **rhachet-roles-ghlitch**) should ensure a repo's
`.gitignore` covers the **scratch/temporary** dirs the rhachet toolchain writes, so throwaway
artifacts never leak into a commit or a PR. at minimum:

```
.plan/temporary
.play/temporary
```

the step is **idempotent** (findsert): if the line is already present, no-op; if absent, add it. it
should not disturb the rest of the `.gitignore` (append into a stable, sorted-ish region, or a
clearly-labeled `# rhachet scratch` block).

## .why

these dirs are **scratch by construction**:

- `.play/temporary/` — one-off bhrowser playbooks a role writes to drive/probe a live surface during
  a session (search sweeps, page probes, calendar reads). they are the *scaffolding* of a research
  pass, not a durable artifact.
- `.plan/temporary/` — the planning-scratch analogue.

today no rule stops these from being `git add`-ed and shipped. in a real PR this session, **10
scratch playbooks were staged by accident** and had to be hand-removed, and the fix was a manual
`.gitignore` edit. that manual step is exactly the kind of repeatable hygiene a boot step should own
— every repo that uses the toolchain has the same need, so the rule belongs upstream, not
re-solved per-repo.

this mirrors how the toolchain already gitignores `.cache`, `.artifact`, `.rhachet`, `.temp` — the
scratch-dir list simply has two gaps.

## .the mechanism (proposed)

- a ghlitch boot/hygiene skill (e.g. `repo.hygiene.gitignore` or a step of an extant boot init)
  that **findserts** each scratch line into `.gitignore`.
- driven by a **canonical list** of toolchain scratch dirs, so a new scratch dir added to the
  toolchain propagates by updating one list, not N repos.
- idempotent + fail-fast; safe to run on every boot.

## .done when

- a fresh repo boot leaves `.gitignore` covering `.plan/temporary` and `.play/temporary`
- re-running the step is a no-op (findsert, not append-duplicate)
- the scratch-dir list is centralized so a future scratch dir is one edit away from every repo
- a brief documents the scratch-dir list + how to extend it

## .see also

- the manual fix that motivated this: `.gitignore` gained `.plan/temporary` + `.play/temporary` by
  hand in rhachet-roles-mhedic (the referral-of-dermo PR)
- the toolchain's current scratch ignores: `.cache`, `.artifact`, `.rhachet`, `.temp`, `.serverless`
