# rule.require.access-coverage-review

## .what

a provider roster's **appointment-access** dimension (contact + mechanism + availability) is NOT
"surveyed" or "complete" until a **deterministic, per-provider access-coverage review** proves,
for **every** provider in the exhaustive frame, that their appointment mechanism was actually read
on the provider's **own entrypoint** (a salespage / book page / portal) — not merely inferred from
a registry or directory.

the review is the engine `census.providers/review.access.play.ts`. it emits the reviewer-output
contract (`N blockers` / `N nitpicks`). the roster is access-exhaustive only when it returns
**0 blockers** on the exhaustive `providers.json`.

## .why a registry citation is NOT an access-mechanism proof

the two census frames answer different questions than the access dimension:

| frame | proves | does NOT prove |
|-------|--------|----------------|
| NPI registry | the provider exists + a registered phone | how a patient actually gets seen |
| MQA license | the license is Clear/Active | how a patient actually gets seen |
| crowd directory | the provider is listed somewhere | how a patient actually gets seen |
| **the provider's own salespage** | **the appointment mechanism** (phone / portal / self-schedule / app) | — |

a `mechanism: ["phone"]` recorded only from an NPI record is a **guess** — the registry phone may
be a bill-to line, and the provider may in fact expose a portal or online-book the registry never
shows. inferring "phone-only" from a registry is exactly the single-source trap the census frames
were built to escape, reappearing on the access axis. so the access dimension needs its own frame.

## .the three-part proof the review demands, per provider

for each provider the review records, deterministically, all three:

1. **which entrypoints were searched** — the salespage URLs read (homepage, book page, portal),
   classified by host (registry / directory / salespage); only a salespage counts as an
   access-mechanism search
2. **how it was proven** — the mechanism read, tied to the specific entrypoint(s) it was read on
3. **the verdict** — one of four:
   - `PROVEN` — mechanism read on ≥1 salespage entrypoint
   - `GAP` — a real own-site search RAN and found no own salespage (only a directory/aggregator, or
     no resolvable site); the sanctioned explicit-gap terminal — mechanism is NOT claimed proven,
     and the entrypoints tried are cited as proof-of-search = **nitpick**
   - `UNPROVEN` — mechanism recorded with NO salespage AND NO proof any own-site search ran (a bare
     registry inference) = **blocker**
   - `EXEMPT` — a do-not-refer provider intentionally not searched: an inactive license, OR an
     out-of-area provider = **nitpick**

the line between `GAP` and `UNPROVEN` is the guardrail: a `GAP` demands cited proof-of-search (a
directory citation on the practice record, or a row-level `ownSiteSearched` marker that names ≥1
entrypoint tried). absent that evidence, an unsearched provider stays a `UNPROVEN` **blocker** — the
gap tier cannot be used to silence a provider nobody actually searched.

## .deterministic, repeatable, reviewable

the review reads only the **on-disk db** (`db.access/*.json` + `providers.json`) — no network — so
the same db yields the same verdict, every run. it re-derives each provider's searched entrypoints
from the practice record's citations by host classification; it fabricates no field. a second
reviewer re-runs it and gets the identical `N blockers / N nitpicks`.

## .the verdict rules

- **blocker** = an `UNPROVEN` provider — appointment mechanism backed by NO salespage citation AND
  no proof any own-site search ran; the mechanism was inferred, the provider was never searched
- **nitpick** = any of: a `GAP` (searched, own-site not located), an `EXEMPT` do-not-refer provider
  (inactive license or out-of-area), OR a `PROVEN` provider read only at the homepage level (the
  live book/portal slot was not followed to a real next-open date)

## .done when

the access dimension is access-exhaustive when `review.access.play.ts` returns **0 blockers** on
the exhaustive `providers.json`. until then, the roster carries a named worklist: exactly which
providers still need a salespage entrypoint searched.

## .generic vs specific

- **generic**: this rule applies to ANY provider roster's access dimension — swap `providers.json`
  + `db.access/` for another census and the same review proves per-provider access coverage.
- **specific** (dermatologists-near-panama-city-beach, 2026-08-22): the review returns
  **0 blockers, 30 nitpicks** over 35 providers — **30 PROVEN, 2 GAP, 3 EXEMPT**. this roster IS
  access-exhaustive: every provider is deterministically accounted for.
  - the 2 GAP (own-site searched, no own salespage located — recorded as explicit gaps, not
    guesses): **[PROVIDER]** (only a directory-aggregator profile found) and
    **[PROVIDER]** (only aggregators + an obituary; also absent from the NPI Dermatology frame).
  - the 3 EXEMPT (do-not-refer): **[PROVIDER]** (license Retired), **[PROVIDER]** (license
    Null And Void), **[PROVIDER]** (out of area — a central-FL practice ~4hr away).
  - an earlier pass returned 7 blockers; a live bhrowser read of each formerly-unproven provider's
    own salespage (four practice salespages) proved four solo/practice providers, and reclassified
    one provider (out-of-area) — driving blockers to 0.

## .enforcement

- an access dimension asserted "complete" while `review.access.play.ts` returns > 0 blockers = **blocker**
- an appointment mechanism recorded from a registry/directory citation with no salespage read, not
  flagged as `UNPROVEN` = **blocker**
- a live book/portal surface counted as a proven next-open date without the slot actually followed
  = **nitpick**

## .see also

- `rule.require.census-peer-review.[rule].md` — the WHO+WHERE frames (NPI + license); this rule is
  the HOW-TO-GET-SEEN third frame that completes the census
- `howto.census-area-providers.[lesson].md` — the census method these frames mechanize
- `census.providers/review.access.play.ts` — the deterministic engine this rule governs
- `census.providers/db.access/readme.md` — the on-disk access db the review audits
