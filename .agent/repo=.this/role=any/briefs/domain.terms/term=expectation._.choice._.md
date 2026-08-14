# domain.term: expectation

term.chosen   = expectation
term.kind     = noun
term.synonyms.forbidden:
- prediction
- forecast
- projection
- outlook

## .what

what we fit a **symptom** with: a **probability** (how likely) + a **duration** (how long). the
symptom-side counterpart to the **alert** (which is what we fit a **hazard** with). where a hazard
earns a monitor + alarm, a symptom earns an expectation. see `rule.require.hazard-alerts`.

## .refs

- `.agent/repo=.this/role=any/briefs/rule.require.hazard-alerts.[rule].md`
- `src/domain.roles/diagnostician/briefs/clade=feline/inventory.of=symptoms.for=feline.case=vaccines-felv-fvrcp-rabies/` — the first symptoms inventory, each symptom fitted with an expectation

## .reason

see the ref-level cluster beside this choice:
- `term=expectation._.choice.reason.md` — etymology, the symmetry with alert, evidence
