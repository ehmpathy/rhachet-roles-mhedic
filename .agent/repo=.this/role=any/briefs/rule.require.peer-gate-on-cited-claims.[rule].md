# rule.require.peer-gate-on-cited-claims

## .what

any **stone** whose yield carries a **cited factual claim** — a number, threshold, or statement
that traces to an `inventory.of=*.md` source, or any medical guidance a human may act on — must
carry a **`peer:` block** in its `.guard`, not self-review alone.

a self-review is the author who checks their own work. a cited medical claim is exactly the place
where an independent rule-check earns its keep: a wrong threshold or a dropped citation reaches
guidance the human trusts. so the highest-stakes stones do not pass on self-assessment alone.

## .why

this convention was, before this rule existed, **tribal knowledge** — re-derived reactively by
each review pass. it was patched into individual guards at least five times across the
`referral-of-dermo` build (`4.1.acuity`, `6.1.referral.yield.clinical`, `1.1.intake.need`,
`3.1.redteam`, `3.1.clinician.find`, `2.1.venue.enumerate`), each time as a fresh "this guard is
self-only" catch. a rule turns "a reviewer eventually notices" into "the author knows up front."

it also anchors the two guardrails that make this repo trustworthy:

- `rule.require.bhrowser-citations` — a citation claim must trace to a bhrowser source; a peer gate
  is where that trace is independently verified.
- `motto.not-medical-advice` — guidance output must carry its disclaimer; a peer gate is where a
  second reader confirms it.

## .the rule

a stone's `.guard` MUST include a `peer:` block when the stone's yield does any of:

| the yield... | example |
|--------------|---------|
| inlines a number/threshold cited from an inventory | "telederm sensitivity ~94.9% (PMC6517019)" |
| makes a medical/clinical claim a human may act on | an acuity read, a differential, a referral |
| carries the not-medical-advice disclaimer | any patient-side or clinician-side output |
| asserts a citation-integrity guarantee | "every option carries its bhrowser citation" |

the peer block should target the rule the claim leans on — typically
`rule.require.bhrowser-citations` and/or `motto.not-medical-advice` (or `rule.forbid.pii` for an
intake stone). a pure-mechanics stone (no cited claim, no guidance) needs only self-review.

## .the test

for each stone, ask: "does this yield carry a cited number, a medical claim, or the disclaimer?"

- yes → its `.guard` needs a `peer:` block
- no → self-review suffices

## .how to detect

a stone whose `.inputs` names an `inventory.of=*.md` file, or whose `.do`/`.emit` mentions the
disclaimer or a clinical read, is a candidate. cross-check its `.guard`: if it has no `peer:` block,
that is the violation.

## .enforcement

- a stone that inlines a cited inventory claim or carries medical guidance, whose `.guard` has no
  `peer:` block = **blocker**
- a pure-mechanics stone flagged for an absent peer block = **false positive** (self-review suffices)

## .see also

- `rule.require.bhrowser-citations.[rule].md` — the citation-trace rule a peer gate verifies
- `motto.not-medical-advice.[motto].md` — the disclaimer a peer gate confirms
- `rule.require.accrue-research.[rule].md` — the inventory sources these claims trace to
- `rule.forbid.pii.[rule].md` — the intake-stone peer gate's usual target
