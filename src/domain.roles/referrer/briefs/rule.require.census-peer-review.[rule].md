# rule.require.census-peer-review

## .what

no provider roster may be called **exhaustive** until an **independent peer-review reproduction**
of its population frame returns **0 blockers**. the search that builds the census and the review
that disproves it are two separate passes — a census is not exhaustive on the author's word, only
on a reproduced diff that finds no missed provider.

this pairs with `howto.census-area-providers`: that brief is the method; this rule is the gate.

## .why

- "exhaustive" asserted by the author is a **recall** wearing a census's clothes — it has been
  wrong every time it was not reproduced (draft-1 recall missed a 10-provider group; draft-2
  single-directory census missed 4 more practices the NPI frame caught).
- an independent reproduction with a **wider** frame is the only thing that can *disprove*
  exhaustiveness. a diff that surfaces one in-radius provider the census dropped is proof, not
  opinion.
- the review must be **reproducible by a third party**: same frame source + same declared filter
  → same verdict. a review no one can re-run is not a review.

## .the rule

exhaustiveness rests on **two independent authoritative frames**, because each has a blind spot
the other covers:

- **frame 1 — enumeration (CMS NPI)**: complete for every provider who submits insurance claims;
  blind to cash-only providers. the review re-pulls it over a **wider** ZIP net and diffs.
- **frame 2 — license (FL DOH / MQA)**: complete for every legally-licensed FL physician (a
  license is mandatory, insurance or not); blind to specialty. it **verifies** every roster
  provider's license reads `Clear/Active` and is the **cash-only backstop** (a provider absent
  from NPI but active in the license registry is the cash-only case NPI misses).

| the reviews return... | the census is... |
|-----------------------|------------------|
| 0 blockers on BOTH frames | exhaustive **for the declared frame + filter** — may be labeled so |
| ≥1 blocker on either | NOT exhaustive/clean — fold the missed provider in (frame 1) or flag the inactive-license provider (frame 2), then re-review until both clear |
| an unreproducible verdict (no frame source, no query URLs) | a `💥 malfunction` — treat as a hard block |

the enumeration review's frame set MUST be a **superset** of the search's (a wider ZIP/geo net),
so it challenges the search's coverage, not merely its transcription. the license review verifies
**by license number** (harvested from the NPI frame) and reads the exact `License Status` field —
never a name search (namesake/pagination/MD-vs-DO unsafe) nor a whole-page keyword scan.

## .how to apply

- runs after `3.1.clinician.find` has produced a census via `frame.npi.play.ts`
- reproduce via `review.census.play.ts` (or an equivalent independent pull), which emits the
  reviewer-output contract (`N blockers` / `N nitpicks`)
- carry the verdict INTO the census's `.how coverage was proven` section — the blocker count, the
  reproduced frame size, and the ZIP set both passes used
- a census labeled "exhaustive" with no recorded 0-blocker review is a blocker itself

## .the honesty clause

"exhaustive" is always **bounded by the declared frame + filter**, never absolute. the label must
name its bound (e.g. "exhaustive of the NPI Dermatology frame for ZIPs 324xx within ~1hr of PCB,
0-blocker reviewed"). a bare "these are all of them" — even after a clean review — is forbidden;
the frame's own limits (registered-location caveat, postal-vs-radius, taxonomy edges) ride along.

## .enforcement

- a roster labeled "exhaustive" with no independent 0-blocker review on BOTH frames = **blocker**
- a review whose enumeration frame set is NOT a superset of the search's = **blocker** (it cannot challenge coverage)
- a roster provider whose license does NOT read `Clear/Active` (retired, void, revoked), carried without a flag = **blocker**
- a license verified by NAME (not by license number) = **blocker** (namesake/pagination/MD-vs-DO unsafe)
- a review with no reproducible frame source / query URLs = **blocker** (`💥 malfunction`)
- a bare "these are all of them" with no named frame + filter bound = **blocker**

## .see also

- `howto.census-area-providers.[lesson].md` — the method (search proves, review disproves)
- `../skills/census.providers/readme.md` — the two runnable engines + the verdict contract
- `../skills/census.providers/review.census.play.ts` — the reproduction that issues the verdict
- `rule.require.availability-probe.[rule].md` — the sibling gate (a censused option still needs an observed availability signal)
- `rule.require.bhrowser-citations.[rule].md` — every frame read is a bhrowser read
