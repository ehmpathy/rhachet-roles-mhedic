# domain.term.choice.reason: salespage

## .etymology

a **salespage** is the page where the seller speaks for themselves — where a practice states its own
phone, its own book link, its own portal. the word was chosen to draw a hard line against the two
kinds of page that only speak *about* a provider:

- a **registry** (npiregistry.cms.hhs.gov, the FL MQA license search) proves identity + a registered
  phone, but a registry phone may be a bill-to line, and the registry never shows a portal or
  online-book the practice actually exposes.
- a **directory** (healthgrades, zocdoc, vitals, topdermatology's aggregator profile) proves the
  provider exists and is listed somewhere, but its "book" buttons route through the aggregator, not
  the practice's own entrypoint.

only the practice's own page — its salespage — states the real appointment mechanism. so the term
had to name *ownership of the entrypoint*, not merely *a web page*.

## .disputes

### dispute: website — raised 2026-08-22 — status: RESOLVED (keep `salespage`)
- raised.by  = referrer census work
- claim      = "website" is the plain word everyone uses for a practice's page
- counter    = "website" is host-agnostic: a registry and a directory are also websites. the whole
               access-review turns on WHICH website — the provider's own vs a third party's. "website"
               erases exactly the distinction that earns a PROVEN verdict. "salespage" keeps it.
- resolution = keep `salespage`; record `website`, `homepage`, `own-site` as forbidden synonyms.

## .evidence

- discovery: the access-coverage review (`review.access.play.ts`) classifies every citation host into
  REGISTRY / DIRECTORY / SALESPAGE; the verdict PROVEN requires ≥1 salespage citation. the term is the
  axis the review is built on.
- invariant: a `mechanism` recorded with no salespage citation is UNPROVEN (a blocker) unless a
  proof-of-search marks it a GAP — so a salespage read is the sole positive proof of the appointment
  dimension.
- precedent: mirrors the census frames' rule that a single-source registry inference is a guess, not a
  proof — the same trap, now on the access axis.
