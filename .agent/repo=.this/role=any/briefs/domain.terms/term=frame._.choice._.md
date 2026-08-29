# domain.term: frame

term.chosen   = frame
term.kind     = noun
term.synonyms.forbidden:
- source (a source is any place data comes from; a frame is specifically the complete-by-construction population)
- directory (a directory is an opt-in crowd sample read AGAINST a frame, not itself a frame)
- registry (close, but generic — a registry becomes a frame only when membership is mandatory-by-construction; use frame for the role, registry for the artifact)
- list (a list makes no completeness claim; a frame is the denominator)
- database (implementation word; says naught about population-completeness)

## .what

the authoritative **population frame** a census is enumerated and verified against — a registry
whose membership is **complete by construction** because it is legally mandatory, not opt-in. the
denominator that turns "did we find everyone?" into "did we query the registry that IS everyone?".
each frame has a blind spot, so exhaustiveness rests on **two independent frames** whose blind
spots differ: the CMS NPI frame (every insurance-billing provider) + the FL DOH/MQA license frame
(every legally-licensed physician). borrowed from survey statistics, where the sampling frame is
the list of every unit in the population.

## .refs

- src/domain.roles/referrer/skills/census.providers/frame.npi.play.ts (frame 1 — enumeration)
- src/domain.roles/referrer/skills/census.providers/frame.license.play.ts (frame 2 — license verify)
- src/domain.roles/referrer/skills/census.providers/readme.md (.why two frames)
- src/domain.roles/referrer/briefs/rule.require.census-peer-review.[rule].md (0 blockers on BOTH frames)

## .reason

see the ref-level cluster beside this choice:
- `term=frame._.choice.reason.md` — etymology, disputes, evidence
