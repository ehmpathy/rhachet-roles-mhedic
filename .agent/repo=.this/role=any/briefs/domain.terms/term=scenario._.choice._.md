# domain.term: scenario

term.chosen   = scenario
term.kind     = noun
term.synonyms.forbidden:
- hypothesis
- possibility
- candidate
- differential (the *set*; a scenario is one member)

## .what

one **basis state** in a diagnosis superposition — a single possible explanation of the observed
effect. each scenario holds its own causal chain (`define.causal-chain-frame`) and its own
consequence package (best-case, worst-case, prevention, recurrence, supportive-care). the diagnostic
superposition is a probability-ranked **set of scenarios**; each scenario is one member of that set.

## .refs

- `src/domain.roles/diagnostician/briefs/define.diagnosis-superposition.[lesson].md`
- `.agent/repo=.this/role=any/briefs/rule.require.superposition-until-elimination.[rule].md`
- `src/domain.roles/diagnostician/skills/diagnose.health/` (the route: `scenario.enumeration`,
  `scenario.disentangle`, `scenario.elimination`, `scenario.rerank`, `scenario.superposition`)

## .reason

see the ref-level cluster beside this choice:
- `term=scenario._.choice.reason.md` — etymology, the rejected `hypothesis`, evidence
