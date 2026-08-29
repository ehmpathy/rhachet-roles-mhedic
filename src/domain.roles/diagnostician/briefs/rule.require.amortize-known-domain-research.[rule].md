# rule.require.amortize-known-domain-research

## .what

when you enroute a diagnosis for a **known, closed domain** — one whose differential is a small, near-constant set and whose method is already validated in the literature — **amortize the research up front**. proactively accrue the cited facts, bake the fixed differential + validated instruments + published thresholds into the route's structure, and let the runtime route **apply** a compiled procedure rather than **re-discover** one.

a narrow domain implies a **short, rapid route**. it must not be a clone of the general open-differential engine.

## .why

the general diagnosis engine (e.g. `diagnose.health`) is heavy for a reason: a general symptom has an **open, unknown differential**, so it must discover the candidate set at runtime — enumerate-from-imagination, mine-literature, blend. that ceremony is the cost of an open hypothesis space.

a closed domain has already paid that cost — in the literature. the candidate set is a textbook constant; the disentangle method is a validated, published instrument with known sensitivity/specificity and thresholds. to re-run open-ended discovery on it at runtime is pure waste: it re-derives what is already settled, on every single case, and it bloats the route into a near-clone of the general engine.

three payoffs from amortization:

- **speed** — the route collapses to the few stones that actually vary per case (intake, apply-the-instrument, the acuity read), not the phases that are constant across all cases.
- **safety through citation** — the fixed facts are cited **once**, verified, and reused, instead of re-fetched (and re-risked) each run.
- **less drift** — a thin, distilled route is a *different kind of artifact* from the general engine (a compiled procedure, not a discovery engine), so it does not drift toward the general engine's shape the way a clone does.

## .the test — is the differential open or closed?

ask, before you choose the route depth:

- **is the candidate set a known constant?** (can you list it from a textbook?) → closed → compile it; drop the enumeration ceremony.
- **is the disentangle method a validated, published instrument?** → closed → bake the instrument + its thresholds in, cite once; drop the method-discovery ceremony.
- **is the set genuinely open — must be found per case?** → open → the general engine's depth earns its place.

the one phase that survives compilation even in a closed domain is the **red-team / can't-miss** stone, wherever the cost of a false-negative is asymmetric (a missed melanoma). depth is justified by *consequence*, not by *habit*.

## .how

1. **accrue first, proactively** — before you shape the route, gather the closed-domain facts into cited inventory (`rule.require.accrue-research`, `rule.require.bhrowser-citations`): the fixed differential + base rates, the validated instruments + their accuracy, the published decision thresholds.
2. **bake the constants into the route** — the differential becomes a fixed list the route carries, not a phase it enumerates; the instrument becomes a score stone, not a method-discovery phase.
3. **reference, do not re-derive** — the runtime stones cite the accrued facts; they apply the procedure, they do not rebuild it.
4. **keep only the per-case stones** — intake (open per case), apply-the-instrument (the per-lesion score), the acuity read, the output. plus red-team where the miss is asymmetric.

## .the distinction to hold

| | discover a method | apply a known method |
|---|---|---|
| domain | open differential | closed differential |
| when | runtime, per case | compiled once, up front |
| cost | high (enumerate ×, mine ×, blend) | low (score, threshold) |
| the artifact | a discovery engine | a compiled decision procedure |

a narrow-domain route that runs the left column is the anti-pattern this rule forbids.

## .enforcement

- a narrow-domain diagnosis route that runs a runtime enumeration phase over a **known-constant** differential = **blocker** (compile the set, cite it, drop the phase)
- a narrow-domain route that re-derives a **validated published instrument** at runtime instead of a cited apply from inventory = **blocker**
- a narrow-domain route whose depth mirrors the general engine with no consequence-based justification per retained phase = **nitpick** (right-size it)

## .see also

- `rule.require.accrue-research` — the accrual mechanism this rule front-loads
- `rule.require.bhrowser-citations` — the citations the accrued facts must carry
- `define.diagnostician-scope` — the diagnosis stages a route composes
- `philosophy.domain-as-a-garden` (architect) — decompose for recomposition; a compiled procedure is a reusable distilled block
