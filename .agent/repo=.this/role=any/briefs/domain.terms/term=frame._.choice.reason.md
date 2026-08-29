# domain.term.choice.reason: frame

## .etymology

`frame` — from **survey statistics**, where the *sample frame* is the list of every unit in the
target population, against which a sample is drawn and completeness is judged. the term carries the
exact load-bearing idea the census method needs: not just "a place to get data" but "the registry
that, by construction, IS the whole population." that distinction is the hinge of the whole
exhaustiveness argument — you escape the infinite regress of "which directory is complete?" only
when you anchor on a frame whose membership is mandatory, not opt-in.

chosen over `registry` (the closest rival) because `registry` names the *artifact* (a filed list),
while `frame` names the *role it plays* — the population denominator. the NPI registry and the MQA
license registry are both registries; each is a `frame` only in the sense that its membership is
legally required, so it can serve as a completeness backstop. we needed a word for that role, and
`frame` already carries it in the statistics literature.

## .disputes

### dispute: registry  —  raised 2026-08-15  —  status: RESOLVED (keep `frame`, `registry` = the artifact)
- raised.by  = referrer (self)
- claim      = both sources ARE literally called "registries" (NPI registry, MQA registry), so
               "registry" is the honest word
- counter    = "registry" is the artifact word; it says naught about population-completeness. a
               loyalty-program registry is a registry too, and it is opt-in — useless as a frame.
               `frame` names the *role*: the complete-by-construction denominator. keep both words
               for their two senses — a `frame` is often built AS a `registry`, but not every
               registry is a frame.
- resolution = keep `frame` for the completeness-role; `registry` stays legitimate for the artifact.
               `registry` is a forbidden synonym only when used to mean the completeness-role.

### dispute: source  —  raised 2026-08-15  —  status: RESOLVED (keep `frame`)
- raised.by  = referrer (self)
- claim      = "source" is plainer and already used for cited reads
- counter    = "source" is any origin of data — a crowd directory, a practice website, a search
               result are all sources. a `frame` is the ONE source that is the population itself.
               to merge them would erase the whole point: a directory (source) is read *against*
               the frame, and the diff is the result. they are different roles.
- resolution = keep `frame`; `source` stays for general cited reads, forbidden only when it means
               the population-complete denominator.

## .evidence

- **the coinage was forced by the exhaustiveness regress**: a human pressed "how do you know it's
  exhaustive — did you gridsearch every directory?" the answer that escaped the regress was not
  "more directories" but "anchor on a frame complete by construction (NPI), then add a second frame
  (state license) whose blind spot differs." the word `frame` is what names that move.
- **two-frame invariant**: exhaustiveness requires 0 blockers on TWO independent frames because each
  frame has a blind spot — NPI is blind to cash-only providers; the license frame is blind to
  specialty. this is recorded in `rule.require.census-peer-review`.
- **contract usage**: `frame` is the head noun of the two engine filenames (`frame.npi.play.ts`,
  `frame.license.play.ts`) and the organizer concept of the readme's `.why two frames, not one`
  and the rule's `frame 1 / frame 2` — a contract word, not mere prose.
