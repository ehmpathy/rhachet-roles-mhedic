# census.providers — systemic exhaustive provider search + peer review

## .what

four runnable engines that make a provider roster **exhaustive by proof**, not by assertion — anchored on **two independent authoritative frames** (NPI + state license) for WHO+WHERE, plus a **third review** for HOW-TO-GET-SEEN (the appointment-access dimension), so neither a frame's blind spot nor an inferred access-mechanism is trusted alone:

| engine | file | role |
|--------|------|------|
| **search** | `frame.npi.play.ts` | build the census from the CMS NPI frame, ZIP-partitioned across the drive-radius |
| **review (frame 1)** | `review.census.play.ts` | INDEPENDENTLY re-pull the NPI frame over a wider ZIP net and diff it against the claimed roster — emit a `N blockers / N nitpicks` verdict |
| **review (frame 2)** | `frame.license.play.ts` | cross-check the roster against the FL DOH / MQA **medical-license** frame — verify every provider's license is `Clear/Active`, and catch the cash-only providers NPI misses |
| **review (access)** | `review.access.play.ts` | deterministically audit `db.access/` against the exhaustive `providers.json` — prove PER PROVIDER their appointment mechanism was read on a real **salespage** entrypoint, not inferred from a registry — emit a `N blockers / N nitpicks` verdict |

search proves; the three reviews disprove. a census is "who-exhaustive" once frames 1+2 return **0 blockers**, and "access-exhaustive" once the access review returns **0 blockers** on `providers.json`.

## .why two frames, not one

each authoritative frame has a blind spot the other covers:

| frame | complete by construction for... | blind to... |
|-------|--------------------------------|-------------|
| **CMS NPI** | every provider who submits insurance claims | cash-only / concierge providers (no claims → no NPI required) |
| **FL DOH / MQA license** | every legally-licensed FL physician (a license is mandatory, insurance or not) | specialty (no "dermatology" filter — only MD/DO), so it verifies + confirms, it does not enumerate derms |

so the NPI frame **enumerates** the roster; the license frame **verifies** each is currently licensed AND is the backstop for the cash-only gap (via a candidate name check). a provider absent from NPI but present + active in the license registry is exactly the cash-only case single-frame misses.

## .why systemic, repeatable, reviewable

- **systemic** — enumerates from the CMS NPI registry, the population frame every US clinician who submits insurance claims must be in. not a crowd sample (Healthgrades), which is opt-in and misses whole practices.
- **repeatable** — deterministic: same ZIP set + same registry → same roster. every row carries the exact query URL that produced it, so any claim is re-checkable.
- **reviewable** — the geo-filter is an *explicit ZIP allowlist*, not a hidden constant. the review engine re-pulls with its OWN (deliberately wider) ZIP set, so it challenges both the roster AND the search's coverage.

## .how to run

```
# 1. SEARCH — build the census
rhx browser.start --mode HEADFUL --session census --refresh
rhx browser.action --play <abs>/frame.npi.play.ts --session census
#   -> { frameSize, inRadiusCount, mohsCount, inRadius: [ {npi, name, org, mohs, address, phone, sourceUrl} ] }

# 2. REVIEW frame 1 — disprove exhaustiveness (NPI capture-recapture)
rhx browser.action --play <abs>/review.census.play.ts --session census
#   -> { verdict: { blockers, nitpicks, summary }, blockers_missed_in_radius_derm: [...] }

# 3. REVIEW frame 2 — verify every license is Clear/Active (FL DOH / MQA)
rhx browser.action --play <abs>/frame.license.play.ts --session census
#   -> { verdict: { blockers, nitpicks, summary }, inactive_blockers: [ {name, license, field} ] }

# 4. REVIEW access — prove each provider's appointment mechanism was salespage-searched
rhx browser.action --play <abs>/review.access.play.ts --session census
#   -> { verdict: { blockers, nitpicks, summary }, unprovenBlockers: [ {name, howProven} ],
#        detail: [ {name, verdict, entrypointsSearched, salespagesRead, howProven} ] }
rhx browser.stop --session census
```

## .the access dimension (third review)

frames 1+2 answer WHO + WHERE. they do NOT answer HOW a patient gets seen — a registry proves a
provider exists and holds a phone, never that anyone read that provider's own site for the
appointment mechanism. so `review.access.play.ts` is the third review: it deterministically audits
the on-disk `db.access/` records against the exhaustive `providers.json` and, per provider,
classifies each citation's host — **registry** (identity/phone) vs **directory** (existence) vs
**salespage** (the provider's own entrypoint). only a salespage read proves an appointment-mechanism
search. it reads no network, so the same db → the same verdict.

- **PROVEN** = mechanism read on ≥1 salespage entrypoint (the URLs are listed per provider)
- **UNPROVEN** (blocker) = mechanism inferred from a registry only — never salespage-searched
- **EXEMPT** (nitpick) = a do-not-refer provider (inactive license) intentionally not searched

governed by `../../briefs/rule.require.access-coverage-review.[rule].md`. the access dimension is
access-exhaustive only at **0 blockers** — until then the verdict names exactly which providers
still need a salespage searched.

the license engine verifies **by license number** (harvested from the NPI frame's
`taxonomy.license`), not by name — a number returns a single unambiguous MQA detail record,
which sidesteps namesake collisions, result pagination, and the MD-vs-DO split (a DO holds an
`OS` license a "Medical Doctor" name search never surfaces). it reads the exact **License Status**
field (`Clear/Active` / `Retired` / `Null And Void`), never a whole-page keyword scan.

`<abs>` MUST be the absolute path (the bhrowser resolves `--play` relative to its own install dir, not cwd).

## .the contract (verdict)

the review's `verdict.summary` conforms to the reviewer-output contract — two numeric lines a route guard can parse:

```
N blockers
N nitpicks
```

| severity | what it flags |
|----------|---------------|
| **blocker** | an in-radius dermatology provider in the reproduced frame but ABSENT from the claimed roster (a missed provider = census was not exhaustive), or a non-derm taxonomy wrongly claimed |
| **nitpick** | a claimed NPI the review could not reproduce (stale/unverifiable), or a non-derm taxonomy the frame returned (exclude, do not claim) |

**0 blockers = exhaustive (for the declared ZIP set + taxonomy).** any blocker means fold the missed provider in and re-review until it clears.

## .the reviewable seams (what a human challenges)

1. **`RADIUS_ZIPS`** (search) / **`REVIEW_ZIPS`** (review) — the geo-filter. the review's set is a superset by design; extend either to widen the radius. a ZIP the review sweeps but the search does not is a coverage gap.
2. **`TAXONOMY`** — set to `Dermatology`; swap for any NPI taxonomy to reuse the method for other specialties.
3. **`CLAIMED_NPIS`** (review) — the roster the census commits to. seed it from the written inventory; the diff is the result.

## .known limits (stated, not hidden)

- **postal geo-filter, not true radius**: the ZIP allowlist approximates a drive-radius; a stricter form geocodes every LOCATION address and filters by haversine distance. the ZIP set is the auditable stand-in.
- **NPI registered-location caveat**: the registry lists a provider's registered LOCATION address, which may be a bill-to/HQ address — so a local provider registered elsewhere can be missed, and a group's shared phone can pull an out-of-area record in. the review's strict `postal ∈ ZIP set` filter drops the out-of-area ones; the miss-the-local case is the residual gap.
- **taxonomy edge**: a provider with a secondary dermatology taxonomy but a non-derm primary (e.g. an ophthalmologist) can surface; the review flags these for exclusion.
- **not a second human**: the review engine is an independent *reproduction*, which catches omission and staleness. it is not a substitute for a second person's judgment on capability or fit.

## .see also

- `../../briefs/howto.census-area-providers.[lesson].md` — the method these engines mechanize
- `../../briefs/rule.require.census-peer-review.[rule].md` — the rule that mandates a 0-blocker review before "exhaustive"
- `../../briefs/rule.require.access-coverage-review.[rule].md` — the rule that mandates a 0-blocker access review before the appointment dimension is "surveyed"
- `../refer.care/templates/3.1.clinician.find.stone` — the stone that calls the census
- `../../../../.agent/repo=.this/role=any/briefs/rule.require.bhrowser-citations.[rule].md` — every registry read is a bhrowser read
