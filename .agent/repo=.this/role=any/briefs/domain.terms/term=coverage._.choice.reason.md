# domain.term.choice.reason: coverage

## .etymology

`coverage` — from *cover*, "to extend over the whole of". the word carries the crucial sense
the referrer needs: not "how much do the two sets overlap?" but "of the authoritative whole, how
much do we hold, and what remains uncovered?". it is the natural partner of `census` and `frame`:
a frame is the population, a census enumerates it, and coverage is the proof that our records span
it — the map of covered ground and the gaps still exposed.

chosen because the census/frame pair needed a third word for the **result** of the diff between
them. the frame is the denominator; the census is the enumeration; coverage is the per-provider
answer to "is this frame member in our records or not?". without a distinct word, the diff and its
result blur — and the result (a verdict set a reviewer folds) is a distinct artifact from the
mechanism that produced it.

## .disputes

### dispute: insurance-coverage overload  —  raised 2026-08-22  —  status: RESOLVED (keep `coverage` for the frame-diff sense; forbid the insurance sense on this word)
- raised.by  = referrer (self)
- claim      = "coverage" already means "what a health plan pays for" in the medical domain — a
               provider census also cares which insurers a clinician accepts (the wish asks about
               Cigna) — so the word is dangerously overloaded.
- counter    = the two senses live in different code contracts and must never share this word.
               the frame-diff sense is `coverage.federal.json` / `readFederalCoverage`; the
               insurer-accepted sense is a provider FIELD (`insurances: [...]`), never called
               "coverage" in a contract. one word, one sense: `coverage` = the frame-vs-records
               diff; the insurer question stays `insurances` / `accepts`.
- resolution = keep `coverage` for the frame-diff verdict set; record `insurance-coverage` as a
               forbidden synonym so the plan-pays sense can never drift onto this word.

## .evidence

- **the coinage was forced by the exhaustiveness challenge**: a hand-built census *asserted*
  completeness; only a code-derived diff of the NPI frame against our records (the coverage) caught
  the two real misses ([PROVIDER], a Mohs derm; [PROVIDER], gated out by the derm-primary
  test). coverage is the artifact that turned "we think we found everyone" into "arithmetic proves
  we hold 27 of the 27 in-area derm-primary providers, 0 gaps".
- **contract usage**: `coverage` is a contract word — the file `coverage.federal.json`, the function
  `readFederalCoverage`, and the `federalCoverage` block of the review verdict — not merely prose.
- **invariant**: coverage is computed by set-diff on NPI, never by judgement; a `gapInArea` count > 0
  is a blocker (a real in-area provider we do not hold), an `outOfArea` count is a nitpick (correctly
  excluded, cited by county).
