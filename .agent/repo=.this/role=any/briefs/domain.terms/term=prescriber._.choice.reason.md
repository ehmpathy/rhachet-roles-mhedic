# domain.term.choice.reason: prescriber

## .etymology

from latin *praescribere* — "to write before" (*prae-* before + *scribere* to write). the
sense is an order **written in advance** of the act: the clinician writes, the pharmacy
fills, the patient takes. the word carries the authority and the sequence together.

`prescriber` is the domain expert's own word — the us regulatory term of art is literally
"prescriber" (the one who holds prescriptive authority), so the term is adopted, not coined.

## .the rejected alternatives

| word | why not |
|------|---------|
| `treater` | too broad — surgery, physical therapy, and counsel are all treatment; this role writes orders |
| `medicator` | names the act of dose, not the judgment behind it; also not a word any clinician says |
| `dispenser` | that is the pharmacy's act, downstream. to prescribe and to dispense are deliberately separate in law |
| `pharmacist` | a distinct role the readme defers to a later phase; conflation would erase the prescribe/dispense split |

## .the boundary this term draws

`prescriber` **writes the order**. `pharmacist` (deferred) **fills it**. the split is not
cosmetic — it is the safety check the whole system rests on, since a second party reads the
order before the patient takes it.

## .evidence

- discovery: adopted term of art — "prescriber" is the word us regulation uses for the party
  with prescriptive authority
- the role's declared purpose in `readme.md` names drug, dose, duration, and interactions —
  the four fields a written order carries
- invariant: `mhedic` never lets one role both write and fill an order. `pharmacist`, once
  declared, must be a distinct role.
