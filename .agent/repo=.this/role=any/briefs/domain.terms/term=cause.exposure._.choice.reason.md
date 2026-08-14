# domain.term.choice.reason: cause.exposure

## .etymology

**exposure** is the standard epidemiology term for the action-variable in a cohort or
case-control study — exactly the two-direction correlation the disentangle stone runs:

- forward (cohort) = P(effect | **exposure**)
- backtrack (case-control) = P(**exposure** | effect)

it is neutral about outcome — "what the subject was exposed to", regardless of whether harm
followed — which is precisely the "regardless of the culprit" property wanted.

## .disputes

### dispute: catalyst — raised 2026-08-08 — status: RESOLVED (keep `cause:exposure`)
- raised.by  = owner
- claim      = "catalyst" names the action that set the harm in motion
- counter    = a catalyst *accelerates a reaction and is not consumed* — it speeds something that
               would happen anyway. a vaccine or a blood draw is the *initiating action itself*,
               not an accelerant of a prior process. wrong connotation.
- resolution = keep `cause:exposure`; record `catalyst` as a forbidden synonym.

### dispute: trigger / precipitant / insult — raised 2026-08-08 — status: RESOLVED (keep `cause:exposure`)
- claim      = these name "the event that set it off"
- counter    = each implies harm *did* result; `exposure` stays neutral about outcome, which the
               method requires (an exposure counts even when no harm followed).
- resolution = keep `cause:exposure`; record all three as forbidden synonyms.

## .evidence

- epidemiology exposure/outcome framing (cohort + case-control), applied in
  `tactic.disentangle-exposure-causes`
- the four-node model in `define.causal-chain`
