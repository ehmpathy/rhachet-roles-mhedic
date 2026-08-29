# howto.census-area-providers

## .what

the repeatable method to build an **exhaustive, proof-backed roster** of every clinician of a
given specialty within a drive-radius — with phone, distance, and patient-review score for each.
this is the census that feeds `3.1.clinician.find`, and it is the antidote to a **recall-listed**
shortlist that only *asserts* it is complete.

## .why

a referral that lists "the clinicians i remember" is not exhaustive — it is a recall, and recall
silently drops the practices you never saw. the melanoma case makes the cost concrete: a missed
group of ten dermatologists is ten access options the patient never learns exist. exhaustiveness
is not a claim you make — it is a **method you can show**, so the human can audit the coverage.

> the failure mode this kills: "here are 6 practices, that's all of them" — when a directory sweep
> would have found four more addresses and a ten-provider group.

## .the regress, and the one escape

exhaustiveness has an infinite regress: to prove you found every *provider* you must prove you
found every *directory*; to prove that you need a *meta-index of directories*; and so on. you do
**not** win this with a stack of more crowd directories — each is itself an unproven sample, and a
single crowd directory (Healthgrades alone) demonstrably misses whole practices.

the only escape is to anchor on a **population frame that is complete by construction** — a
registry every provider is *required* to be in, not one they opt into. for US clinicians that
frame exists: the **NPI registry (CMS)**. every clinician who submits insurance claims must hold
an NPI, and the registry is queryable by taxonomy + city
(`npiregistry.cms.hhs.gov/api/?version=2.1&taxonomy_description=Dermatology&state=FL&city=<town>`).
so the NPI registry is the **frame**; crowd directories become **capture-recapture** cross-checks
against it. a provider/org in the frame but absent from a crowd directory is exactly the gap
single-source hides — that diff is the proof the method exists to produce.

## .the enumeration backbone

enumerate frame-first, then cross-check.

| rung | source | what it yields | role |
|------|--------|----------------|------|
| 0 | **NPI registry (CMS)** | the population by construction — every registered provider of a taxonomy, by city, with address + phone | **the frame** — the denominator you reconcile against |
| 1 | a per-town crowd directory (Healthgrades) | patient-side star score + review count + distance the frame lacks | capture-recapture check + review signal |
| 2 | a practice-group's own locations page | the group's satellite offices + phone + capability | confirms affiliation + skill |
| 3 | a practice's own service page | the specialty capability (Mohs, melanoma) verbatim | capability, not sentiment |
| 4 | an ad-hoc search (DuckDuckGo et al.) | leads to sites rungs 0–3 missed | leads only, confirm on rung 0–3 |

reconcile rung 1 against rung 0: **the diff is the result.** a name in the crowd directory but
not the frame is likely mis-tagged or out-of-area; an org in the frame but not the crowd directory
is a real practice the crowd sample dropped.

## .the frame's own limits (state them, do not hide them)

the frame is authoritative, not perfect:

- it filters on a provider's *registered location address*, which may be a bill-to / HQ address —
  so a local doctor registered out-of-town is missed by a city query, and an out-of-area doctor
  can appear via a group's shared phone. the stricter form is a **statewide taxonomy pull + a
  per-address radius geo-filter**, not a per-city string match.
- a solo frame query by one agent is **not peer-reviewed**. a real review is a second pass that
  reproduces the query and challenges the geo-filter. name whether that happened.

## .the method, step by step

```
1. list the anchor towns whose N-mile radii tile the drive-radius
   (overlap is fine — dedupe later; gaps are the enemy, not overlap)
2. for each anchor town, read its rung-1 directory page — take EVERY provider of the
   specialty it returns, with score + review-count + address + distance
3. union the rosters; collapse a provider who appears in two towns to one row,
   keep all their office addresses
4. drop the non-specialty results (a vascular or ENT doc who dabbles) — note them as excluded
5. for each distinct practice-group, read its rung-2 locations page (phone, satellites)
   and rung-3 service page (capability verbatim)
6. state the coverage claim HONESTLY: "exhaustive of directory X for towns A–E,
   cross-checked against M practice sites" — never a bare "these are all of them"
```

## .the census, not the recall — the coverage claim

every provider census MUST carry a `.how coverage was proven` section that names:

- the **frame** queried (NPI registry) and the towns/taxonomy queried — the population denominator
- the **crowd cross-checks** reconciled against the frame, and what the diff surfaced
- the **cross-checks**: which practice sites confirmed capability
- the **still-unproven**, stated plainly: whether a peer reviewed the frame query, whether the
  geo-filter was city-string or radius, and which index space was never swept
- the **irreducible gap**: a provider in no registry and with no site cannot be proven to
  exist or not from a desk — say so; do not let silence read as completeness

a census that asserts completeness without naming its frame and its unproven edges is a recall
wearing a census's clothes.

## .the two columns that are not what they seem

- **distance** is from the *town centroid the directory searched*, not from the patient's exact
  address — carry it as an estimate, and prefer the anchor town nearest the patient.
- **review score** is bedside-manner **sentiment** from often-tiny samples (n=1–6), **not**
  clinical skill and **never** a skin-cancer outcome. label it so a human cannot misread a 5.0/1
  as "best cancer surgeon." capability (rung 3) is the skill signal; score is the manner signal.

## .the disclaimer + freshness caveat

a roster perishes — providers move, practices merge, scores drift. so the census hands back **the
method AND the snapshot** (teach-to-search): the human re-runs the sweep, they do not trust a
frozen list. and every census carries the not-medical-advice disclaimer, plus the reminder that a
review score is sentiment, not competence.

## .see also

- `howto.probe-real-availability.[lesson].md` — the availability sibling; the census finds WHO,
  the probe finds WHEN they are open
- `rule.require.availability-probe.[rule].md` — pairs with this: a censused option still needs an
  observed availability signal before it is ranked
- `define.referrer-scope.[lesson].md` — the access dimension (wait/cost/distance/language)
- `3.1.clinician.find.stone` — the stone this method feeds
- `rule.require.bhrowser-citations.[rule].md` — every directory read is a bhrowser read
