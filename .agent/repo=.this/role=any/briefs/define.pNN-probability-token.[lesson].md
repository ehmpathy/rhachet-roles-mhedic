# define.pNN-probability-token

## .what

`pNN` is the **probability token** that prefixes each symptom file in an
`inventory.of=symptoms.for=<clade>.case=<slug>/` directory, in the form **`pNN.$slug.md`** — e.g.
`p50.systemic-malaise.md`, `p10.site-lump.md`.

`NN` is a **two-digit ordinal likelihood bucket**, not a measured percentage. it ranks how likely a
symptom is to appear after the exposure, so the files sort by likelihood and a reader sees the
common symptoms first.

## .why an ordinal bucket, not a measured rate

for most exposures the per-symptom frequency is **not quantified** in the literature — mild,
self-limited symptoms go largely unreported, so no honest percentage exists. a bucket lets us state
*relative* likelihood ("common" vs "uncommon") without a false claim of precision.

where a **hard incidence number does exist**, it belongs on the matched **hazard** (in
`inventory.of=hazards...`), whose alarm carries the real rate — e.g. anaphylaxis or FISS. the `pNN`
token stays an ordinal rank; the measured numbers live on the hazard side.

## .the buckets

| token | band | rough sense |
|-------|------|-------------|
| `p90` | near-certain | almost every patient shows it |
| `p50` | common | a routine, expected symptom |
| `p10` | uncommon | happens, but not the usual case |
| `p01` | rare | a small fraction of patients |

the ladder is open — pick the two-digit bucket nearest the likelihood; `p50`/`p10` are the two most
used so far. treat the value as a **rank on a 0–99 scale**, read as "roughly this many in 100," and
keep it coarse (round to a bucket) so it never reads as a measured statistic.

## .why a file-name token (not a field)

- **sorts by likelihood** — a plain `ls` puts `p90…p50…p10…p01` high-to-low, so the reader meets
  the common symptoms first
- **one symptom, one file** — each `pNN.$slug.md` is a self-contained expectation (probability +
  duration + a cited anchor), easy to add/remove without a table edit
- **scannable** — the likelihood is legible in the file name before the file is opened

## .what pNN is NOT

- **not a measured percentage** — it is an ordinal bucket; do not read `p50` as "exactly 50%"
- **not a glossary term** — like `case=`, `for=`, and `clade=`, it is a **file-name device**, not a
  repo-declared domain object/operation, so it is not itemized in `domain.terms/`
- **not for hazards** — hazards are ranked by their **alarm** + escalation tier, not by `pNN`. the
  `pNN` token belongs only to the **symptoms** inventory (the `symptoms → expectations` half)

## .the pair this serves

per `rule.require.hazard-alerts`, an exposure gets two matched inventories:

| inventory | node | fitted with | the token |
|-----------|------|-------------|-----------|
| `inventory.of=symptoms` | a **symptom** | an **expectation** (probability + duration) | **`pNN`** |
| `inventory.of=hazards` | a **hazard** | an **alert** (monitor + alarm + escalation) | — |

## .see also

- `rule.require.hazard-alerts.[rule].md` — the rule that pairs symptoms→expectations with hazards→alarms
- `domain.terms/term=expectation._.choice._.md` — the term `pNN` helps express (probability + duration)
- `../../../src/domain.roles/diagnostician/briefs/clade=feline/inventory.of=symptoms.for=feline.case=vaccines-felv-fvrcp-rabies/` — the first worked instance
