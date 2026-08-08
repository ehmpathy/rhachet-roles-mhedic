# domain.term: physician

term.chosen   = physician
term.kind     = noun
term.synonyms.forbidden:
- coordinator
- orchestrator
- generalist
- primary
- doctor

## .what

the role that holds the whole case and composes the other roles into one course of care.

## .refs

- `src/domain.roles/physician/getPhysicianRole.ts` — `slug: 'physician'`
- `src/domain.roles/physician/briefs/define.physician-scope.[lesson].md`
- `src/domain.roles/getRoleRegistry.ts` — `ROLE_PHYSICIAN`
- `rhachet.repo.yml`
- `readme.md`

## .reason

see the ref-level cluster beside this choice:
- `term=physician._.choice.reason.md` — etymology, disputes, evidence
