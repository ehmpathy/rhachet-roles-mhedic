# domain.term.choice.reason: census

## .etymology

`census` — from the Latin *cēnsus*, the Roman enumeration of the whole population, the count of
record. the word carries exactly the load-bearing sense the referrer needs: a **complete count
against an authoritative frame**, not a sample. a census is what officials are accountable to; that
accountability-to-a-frame is precisely what separates it from a casual list.

chosen because the referrer's "find me a clinician" work has two distinct output shapes that must
NOT share a word:

- a **recall** — "here are the practices i remember / a search surfaced" — asserts completeness with
  no frame behind it. it silently drops what it never saw.
- a **census** — enumerated from a population frame (NPI registry), reconciled against crowd
  directories, with its `.how coverage was proven` claim.

the whole lesson of this domain concept is that these are different in kind, so they need different
words. to call a recall a "list" and a census a "list" hides the exact distinction the concept
exists to draw.

## .disputes

### dispute: roster  —  raised 2026-08-15  —  status: RESOLVED (keep `census`)
- raised.by  = referrer (self)
- claim      = "roster" reads plainer than "census" and already means a named list of members
- counter    = a roster names *who is on it* but makes no claim about *who was left off* — it has no
               frame, no denominator, no proof of coverage. `census` carries the population-frame
               sense (count-of-record) that is the entire point of the concept. "roster" is the
               right word for the *output table*; "census" is the right word for the *proven whole*.
- resolution = keep `census`; record `roster` as a forbidden synonym for the concept (though a
               census may still contain a roster table).

### dispute: recall  —  raised 2026-08-15  —  status: RESOLVED (census and recall are ANTONYMS, not synonyms)
- raised.by  = referrer (self)
- claim      = both are "a list of providers", so maybe one word suffices
- counter    = they are opposites, not variants. a recall asserts completeness from memory; a census
               proves it against a frame. to merge them would erase the exact failure mode the
               concept was coined to name (a recall that *looks* exhaustive but is not). they must
               stay two words.
- resolution = keep both as distinct terms; `recall` is the named antonym of `census`, never a synonym.

## .evidence

- **the coinage was forced by a real failure**: a recall-listed roster of 6 dermatology practices
  *asserted* exhaustiveness and missed a 10+-provider group plus four solo doctors; a single-directory
  census then missed four more local practices that only the NPI frame surfaced. the term exists
  because the distinction between "asserted complete" and "frame-proven complete" was load-bearing
  and cost real coverage when blurred.
- **contract usage**: `census` is used as a contract word in `3.1.clinician.find.stone` ("run a
  directory census per `howto.census-area-providers`") and `howto.census-area-providers.[lesson].md`
  (the `.the census, not the recall` section), not merely in prose.
- **invariant**: a census MUST carry a `.how coverage was proven` section that names its frame, its
  capture-recapture diff, and its still-unproven edges; a roster of names without that section is a
  recall, not a census.
