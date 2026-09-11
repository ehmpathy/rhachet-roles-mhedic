# domain.term: salespage

term.chosen   = salespage
term.kind     = noun
term.synonyms.forbidden:
- website (too generic — any host is a website; salespage names the provider's OWN one)
- homepage (a location on the salespage, not the concept; a salespage spans homepage + book page + portal)
- own-site (a description, not the canonical noun; drifts across records)
- directory (the OPPOSITE — a third-party aggregator that proves existence, never the appointment mechanism)

## .what

a provider's OWN appointment entrypoint — their practice website, book page, or patient portal —
the only citation host that proves an appointment-mechanism search. the linchpin of the
access-coverage review: a citation is classified REGISTRY (identity/phone), DIRECTORY (existence),
or SALESPAGE, and only a salespage read earns a PROVEN verdict.

## .refs

- src/domain.roles/referrer/skills/census.providers/review.access.play.ts (`isSalespage` L60 — the host classifier; `salespageCites` L110 — reads each provider's salespage)
- src/domain.roles/referrer/briefs/rule.require.access-coverage-review.[rule].md

⚠️ **a ref named `probe.access.ownsites.play.ts` was cited here and no such file exists** — verified
2026-09-07, a glob of `src/**/probe*` returns zero. the read it claimed lives at
`review.access.play.ts:110` above. ⇒ **phantom path removed.**

## .reason

see the ref-level cluster beside this choice:
- `term=salespage._.choice.reason.md` — etymology, the registry/directory contrast, evidence
