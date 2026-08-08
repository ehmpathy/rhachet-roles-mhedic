# domain.term: prescriber

term.chosen   = prescriber
term.kind     = noun
term.synonyms.forbidden:
- treater
- medicator
- dispenser
- pharmacist

## .what

the role that maps a diagnosis to a course of treatment — drug, dose, duration, interactions.

## .refs

- `src/domain.roles/prescriber/getPrescriberRole.ts` — `slug: 'prescriber'`
- `src/domain.roles/getRoleRegistry.ts` — `ROLE_PRESCRIBER`
- `rhachet.repo.yml`
- `readme.md`

## .reason

see the ref-level cluster beside this choice:
- `term=prescriber._.choice.reason.md` — etymology, disputes, evidence
