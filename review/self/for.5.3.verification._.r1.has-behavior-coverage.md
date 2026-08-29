# self-review r1 — has-behavior-coverage

## the question
does every behavior promised in `0.wish.md` and `1.vision.md` have a test i can point to?

## what i checked, behavior by behavior

**wish deliverables (0.wish.md):**

| wish item | delivered | test i can point to |
|-----------|-----------|---------------------|
| upgrade the referrer with an enrouted skill to find who to go to | `refer.care` skill + route | `referrer/skills/refer.care.integration.test.ts` (17 cases) |
| upgrade the diagnostician with a melanoma skill | `diagnose.melanoma` skill + route | `diagnostician/skills/diagnose.melanoma.integration.test.ts` (13 cases) |
| citations on virtual-diagnostic success + phone-classification | accrued inventories, referenced by stones | `inventory-wiring.integration.test.ts` (proves the `inventory.of=*` refs map to real files, no dangled citation) |

**vision commitments (1.vision.md):**

| commitment | delivered | test |
|------------|-----------|------|
| two role-operated skills that compose in order | both skills stamp guarded routes | the two integration suites above |
| diagnostician urgency → referrer input hand-off | `4.1.acuity.yield.md` → `0.seed.md` via `--seed-from` | `handoff...integration.test.ts` `[case4]` runs BOTH skills for real and flows the seam file |
| binary acuity, two-layer output, teach-to-search, disclaimer | authored in stones, guard-enforced | per-stone `.guard` self+peer reviews (not jest — see below) |

## the one honest tension i interrogated

the wish's three literal questions (self-scan feasibility, PCB clinician availability,
virtual-vs-physical stats) and the reason-level commitments (disclaimer text, binary-acuity prose,
teach-to-search output) do **not** have jest assertions. i pushed hard on whether that is a
coverage gap i must close now.

**why it holds, not a gap:** these are LLM-generated prose produced when the route is *run*, not
when the skill is *built*. the skill is a shell contract that stamps the route + its guards; the
answers are produced by an operator who runs that route against live bhrowser data. a jest test
cannot assert LLM prose, and a `.demo/case=*` fixture would have to fabricate clinician/citation
data — which directly breaches `rule.require.bhrowser-citations`, the pivotal safety rule. so the
reason content is covered by the mechanism built for exactly this — per-stone `.guard` self+peer
review at route-run time — not by jest. this build-vs-run boundary was independently interrogated
and settled by both l3 reviewers across 21 review iterations; it is a reasoned architecture, not an
omission.

**what IS jest-covered, exhaustively:** every skill's blackbox *contract* — it runs, stamps the
right stones, honors exit-code semantics (0/1/2), fails loud on bind failure and repo
inconsistency, mechanizes the hand-off, and rejects malformed invocations. 135 integration tests,
0 skipped.

## verdict
no behavior that CAN be jest-tested is left untested. the reason-content layer is architecturally
guard-covered (not jest-able) and that boundary is settled + documented. i can point to a test file
for every buildable behavior. holds.
