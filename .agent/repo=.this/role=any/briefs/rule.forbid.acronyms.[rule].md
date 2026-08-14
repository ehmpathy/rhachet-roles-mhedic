# rule.forbid.acronyms

## .what

do not use bare acronyms or initialisms in prose, output, briefs, or comms. spell the term
out in full words instead.

a *literal* never is impossible (some terms have no everyday long form), so the operative
rule is: **spell it out; expand on first use only when a full form genuinely does not exist.**

## .why

- an acronym forces the reader to decode or guess. in a medical registry a wrong guess can
  carry into an output a human acts on — the cost is not cosmetic.
- the full term reads exactly one way; the acronym often reads several (pairs with
  `rule.forbid.ambiguous-labels`).
- a reader new to the domain should never need a glossary to parse a sentence.

## .the rule

- write the full words: **"chronic kidney disease"**, not **"ckd"**.
- write **"non-steroidal anti-inflammatory drug"**, not **"nsaid"**.
- if a term has no real long form and is unavoidable, expand it on **first use**, then it may
  recur: *"the food and drug administration (fda) ... the fda label ..."*.

## .examples

| 👎 bare acronym | 👍 spelled out |
|-----------------|----------------|
| ckd | chronic kidney disease |
| flutd | feline lower urinary tract disease |
| fic | feline idiopathic cystitis |
| nsaid | non-steroidal anti-inflammatory drug |
| gi upset | gastrointestinal upset |

## .note on case

when an acronym is unavoidable (expanded on first use), keep it **lowercase** — no shouts.
see `rule.forbid.shouts` (the related rule on case).

## .enforcement

- a bare, undefined acronym in prose or output = nitpick
- a bare acronym in a recommendation a human reads, where a wrong read could mislead = blocker

## .see also

- `rule.forbid.shouts` — acronyms, when unavoidable, stay lowercase
- `rule.require.read-social-comments.[rule].md` — a related research/comms rule
- `motto.not-medical-advice.[motto].md` — clarity matters most where a human may act
