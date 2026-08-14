# case=miki-vet-2026-08-07 — a diagnostician demo route

a worked diagnostician case, declared as a route of milestones. each milestone is a **stone**
(the instruction — what the step must do) that emits a **yield** (the produced artifact).

> ⚠️ **not veterinary advice — informational only.** a demo of the diagnostician's method; the
> patient was not examined. "miki" is a persona handle, not a real identifier (`rule.forbid.pii`).

## .the shape

| file | role |
|------|------|
| `N.name.stone.md` | the milestone instruction — inputs, what to do, where to emit, done-when |
| `N.name.yield.md` | the artifact that stone produces |
| `N.name.guard` | the gate on that stone — self + peer reviews, judges (optional) |
| `0.seed.md` | the input seed + event ledger (the wish; not a stone/yield pair) |

## .the route

```
0.seed                        the verbatim input + timeline ledger
1.intake               →      structure the history
2.1.differential.enumerate    →   the candidate causes — the suspect lineup (clinical logic)
2.2.1.craft-queries    →      the search recipe (both directions, multi-source)
2.2.2.gather-experiences →    run the bhrowser, read comments, save verbatim        [guard]
2.2.3.itemize-inventory  →    one tagged row per case
2.2.4.compute-correlations →  the 2x2 per exposure + convergence gate (rewind if thin)
2.2.5.attribute-rerank →      rank exposures, re-rank the effect:mechanisms                   [guard]
3.assay                →      which tests tell the top candidates apart
4.triage               →      acuity — emergency now vs. same-day vs. wait           [guard]
5.diagnosis            →      the single most-likely cause (provisional)             [guard]
```

the `2.2.*` substones form the **disentangle loop**: craft → gather → itemize → compute,
which rewinds to craft when the sample is thin, then proceeds to attribute once it converges
(`howto.disentangle-via-matrix`). there is no top-level `2.2` stone — only the substones.

## .the guards

peer-review gates on the highest-consequence stones (modeled on rhachet-roles-rhight behavior
guards). each `.guard` carries `self:` prompts for the driver + `peer:` reviewers (a bhrain
rule-review and, where the stakes warrant, an enrolled peer brain) + `judges:` that block on
unresolved reviews:

| stone | guards for | why it gates |
|-------|-----------|--------------|
| `2.2.2.gather-experiences` | bhrowser citations, comments read, source spread, bias recorded | a wrong citation poisons the disentangle downstream |
| `2.2.5.attribute-rerank` | gate passed, both directions, edges cross-checked, caveats carried | the conclusion the diagnosis rests on |
| `4.triage` | every emergency sign assessed, escalation carve-out present | an under-call can cost a life |
| `5.diagnosis` | disclaimer present, no overreach, claims cited, facts in full sun | the output a human may act on |

## .status

- `1` → `5` yields: **produced** (provisional; miki's live case), incl. the full `2.2.*`
  disentangle loop (`2.2.1` → `2.2.5`) plus the extra formal-gather substones
  (`2.2.2b` formals, `2.2.2c` FISS ladder, `2.2.2d` follow-up conversation).
- the route is **bound and driven**: the guards on `2.2.2`, `2.2.5`, `4.triage`, `5.diagnosis`
  actively gate passage (self + peer reviews + judges), not merely document the gates.
- `2.2.5` and `4.triage`: **passed**. `3.assay`: passed (unguarded).
- `5.diagnosis`: at the **human-approval gate** — both peer reviewers terminal (one approved,
  one earned-exhaustion with a cited record under `.reviews/peer/`), 0 blockers stand; the
  `approved?` judge is human-only and awaits sign-off.
- the reusable research METHOD is a separate brief in `diagnostician/briefs/`, not a demo yield.
