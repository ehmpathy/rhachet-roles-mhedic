# accrue/ — reusable cited facts

this dir holds the **generic, case-neutral, cited facts** the research stone (`3.1.clinician.find`)
lifts out of its case yield, per `rule.require.accrue-research`.

## .the split

- the **case yield** keeps the applied, patient-specific route (which clinic, which wait, which cost)
- **`accrue/inventory.of=<topic>.md`** keeps the shareable fact (stated with no patient in it — e.g.
  the repeatable search method, a venue's general access profile, a teledermatology cost band)

## .what each entry carries

1. the generic fact, case-neutral ("telederm store-and-forward visits in FL average $X self-pay")
2. the citation — bhrowser source + verbatim quote + URL (never WebSearch/WebFetch)
3. the retrieval date
4. the topic scope (what class of case it serves)

## .promote

when the route completes, promote proven-generic entries to their most-common-denominator home (per
`rule.require.accrue-research`): a referrer-owned fact → the referrer role leaf
`src/domain.roles/referrer/briefs/inventory/`; a genuinely cross-role fact → the repo-shared
`.agent/repo=.this/role=any/briefs/inventory/`. `accrue/` is the cheap per-route hold; the promoted
inventory is the curated cross-case home.
