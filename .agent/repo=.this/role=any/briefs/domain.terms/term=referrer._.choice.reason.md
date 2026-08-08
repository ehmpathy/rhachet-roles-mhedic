# domain.term.choice.reason: referrer

## .etymology

from latin *referre* — "to carry back" (*re-* back + *ferre* to carry). in medicine the word
has one settled sense: to **hand a patient to another clinician** better placed to help.
"a referral" is the artifact; "the referrer" is the party who makes it.

the word is adopted from the domain, not coined. every clinic already says it.

## .the rejected alternatives

| word | why not |
|------|---------|
| `router` | network jargon; also implies a mechanical lookup, when a referral is a clinical judgment |
| `dispatcher` | already taken — `bhuild/role=dispatcher` owns that word for radio task broadcast. an overload across registries |
| `escalator` | implies severity always rises; many referrals are lateral (a specialist with a different, not greater, reach) |
| `navigator` | a real us healthcare role (patient navigator) with a different job — insurance and logistics, not clinical hand-off |

`dispatcher` is the sharpest rejection: it is not merely a worse word, it is a word this org
has already spent on another concept.

## .the boundary this term draws

the referrer answers two questions and only two:

1. **is this beyond us?** — the reach test
2. **who takes it next?** — the destination

it does not diagnose (that is `diagnostician`), and it does not treat (that is `prescriber`).
it is the seam between them and the outside world.

## .evidence

- discovery: adopted term of art — "referral" and "referrer" are the words clinics use
- overload check: `dispatcher` is already declared in `bhuild`, so its reuse here would break
  `rule.forbid.domain-term-ambiguity` across the org's shared vocabulary
- invariant: a referral names a **destination**. a hand-off with no named recipient is an
  abandonment, not a referral.
