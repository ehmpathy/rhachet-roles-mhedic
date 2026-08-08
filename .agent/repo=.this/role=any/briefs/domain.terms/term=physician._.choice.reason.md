# domain.term.choice.reason: physician

## .etymology

from greek *phusikos* — "of nature" — by way of old french *fisicien*. the original sense is
one who knows **the whole of nature's workings in the body**, as against a specialist of one
part. that breadth is precisely the role: the party who holds the entire case.

## .the rejected alternatives

| word | why not |
|------|---------|
| `coordinator` | names the mechanism (compose other roles), not the motive (own the whole patient). also a gerund-adjacent administrative word with no clinical weight |
| `orchestrator` | already spent — `ehmpathy/role=architect` uses `orchestrator` for a domain-operation grain. an overload across the org |
| `generalist` | defines the role by what it is **not** (not a specialist); a negative name is a weak name |
| `primary` | an adjective with no noun; "primary care physician" needs `physician` anyway |
| `doctor` | names a credential, not a function — a surgeon and a radiologist are both doctors and neither holds the whole case |

`orchestrator` is the sharpest rejection, and for the same reason `dispatcher` was rejected
for the referrer: the org has already spent that word on another concept.

## .why the compose-role needed a clinical name

the temptation was to name this role after its **mechanism** — it composes the other four, so
`coordinator` or `orchestrator` feels natural to an engineer. but per `howto.domain-discovery`,
the ground truth lives in the real-world domain, not in the software's shape. in the real
world, the party who holds the whole case is the **physician**. the composition is *how* they
do it, not *what* they are.

name from the motive; the motive outlives the mechanism.

## .the boundary this term draws

| role | scope |
|------|-------|
| `physician` | the whole case, over time |
| `diagnostician` | one question: what is the cause? |
| `prescriber` | one question: what is the order? |
| `referrer` | one question: who takes it next? |
| `preventer` | one question: what comes before harm? |

the four leaf roles each answer one question. the physician holds the case that asks them.

## .evidence

- discovery: domain-expert narrative — the human named this role the "coordinator" in the
  role table, and the coordination is real; the *name* was then drawn from the domain instead
- overload check: `orchestrator` is declared in `ehmpathy/role=architect` briefs, so its
  reuse here would break `rule.forbid.domain-term-ambiguity`
- invariant: exactly one role in `mhedic` holds the whole case. the other four are leaves and
  must not compose each other.
