# domain.term: coverage

term.chosen   = coverage
term.kind     = noun
term.synonyms.forbidden:
- overlap (names only the intersection; coverage names the whole diff — covered PLUS the gaps)
- completeness (an adjective-shaped abstraction; coverage is the concrete per-provider verdict set)
- diff (the mechanism, not the result; a diff produces a coverage, coverage is what it yields)
- reconciliation (ledger jargon; says naught about the frame-vs-records population sense)
- insurance-coverage (a DIFFERENT concept — what a plan pays; never overload this word onto that)

## .what

the **code-derived diff of a frame against our records** — the per-provider verdict set that
answers "who on the authoritative frame do we hold, and who is absent?". each frame member is
classified by arithmetic, no brain in the loop: `covered` (its NPI is in our db.access records),
`gapInArea` (a PCB-area provider absent from our records — a real miss), or `outOfArea` (a
provider outside the drive-band — correctly excluded, cited by county). coverage is what proves a
census exhaustive: the census names the frame, coverage names the frame-minus-records remainder.

## .refs

- src/domain.roles/referrer/skills/census.providers/project.federal.coverage.play.ts (writes coverage.federal.json)
- src/domain.roles/referrer/skills/census.providers/review.requirements.play.ts (readFederalCoverage, folds coverage into the verdict)

## .reason

see the ref-level cluster beside this choice:
- `term=coverage._.choice.reason.md` — etymology, the insurance-coverage overload guard, evidence
