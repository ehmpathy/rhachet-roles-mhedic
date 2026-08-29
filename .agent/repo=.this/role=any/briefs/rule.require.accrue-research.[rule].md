# rule.require.accrue-research

## severity: blocker

any stone that gathers cited ground truth MUST lift the **generic, reusable facts** into
`$route/accrue/inventory.of=<topic>.md`, separate from the case yield. research that lives **only**
in the case yield — trapped in one case's applied conclusion — is a **blocker**. the case yield
keeps the applied *interpretation*; `accrue/` keeps the shareable *fact*.

---
---
---

# deets

## .what

when a stone does research — reads sources through the bhrowser, gathers citations, computes a base
rate — its findings split into two kinds, and each has a different home:

| kind | example | home | tier |
|------|---------|------|------|
| **generic fact** | "feline VAAE incidence ~52/10,000 (Moore 2007, PMID 17605670)" | `$route/accrue/inventory.of=<topic>.md` | fullsun, reusable |
| **case application** | "Miki's limp is most-plausibly vaccine-associated" | `$route/N.stone.yield.md` | obscure, per-case |

the stone MUST emit **both**. the generic fact is lifted — **accrued** — into the route's `accrue/`
area so it is not trapped in one case's private conclusion.

## .why — research must compound, not die in a yield

- **a fact gathered once should serve every future case.** without `accrue/`, the next case
  re-gathers the same VAAE incidence, the same FISS recurrence rate, the same label dose — pure
  waste. the `accrue/` dir turns each case into a **deposit** into a growing, cited, reusable base.
- **it operationalizes `rule.require.fullsun-facts-not-tactics`.** that rule says facts are
  shareable and case-decisions are private, but never named *where the shareable facts go*.
  `accrue/inventory.of=<topic>` is that destination — the split is enforced at the stone, at the
  moment of research, not reconstructed later.
- **it feeds the promotion path.** `accrue/` is the **route-scoped hold**; genuinely generic facts
  are later **promoted** to the repo-shared `inventory/` (per the promote step +
  `rule.require.source-inventory`), so a fact proven reusable across cases graduates to a home every
  future route can see.

## .the two-tier flow

```
stone researches
   ├─ case application  → $route/N.stone.yield.md            (obscure, per-case)
   └─ generic facts     → $route/accrue/inventory.of=<topic>.md   (fullsun, route-held)
                              └─ promote (deliberate) → the MOST-COMMON-DENOMINATOR home:
                                 ├─ used by ONE role  → src/domain.roles/<role>/briefs/inventory/   (role-scoped, cross-case)
                                 └─ used by 2+ roles  → .agent/repo=.this/role=any/briefs/inventory/  (repo-shared, cross-case)
```

- **`accrue/` is cheap** — no ceremony, held per-route, high-recall (accrue liberally).
- **promotion is deliberate** — a curated lift of a fact proven generic enough to serve every future
  route, so the inventory home stays clean, not flooded. this mirrors
  `rule.prefer.most-common-denominator` (push to the leaf; lift when reused), applied to research.

## .the promotion destination — most-common-denominator by ROLE

promotion has **two** scope axes, and both obey most-common-denominator. it is not enough to lift a
fact from route-held to cross-case; it must also land at the **least-common role ancestor** that
actually consumes it:

| the fact is NATIVE to… | its promoted home |
|------------------------|-------------------|
| exactly ONE role's expertise (a melanoma dermoscopy fact, a telederm-accuracy fact → diagnostician; a provider census → referrer) | `src/domain.roles/<role>/briefs/inventory/` |
| the shared expertise of TWO OR MORE roles (a fact each role would author on its own) | `.agent/repo=.this/role=any/briefs/inventory/` |

`role=any` is the **repo-wide common ancestor** — the home for a fact genuinely shared across roles.
to promote a single-role fact there is a **premature lift**: it pollutes every role's namespace with
knowledge only one role owns, exactly the anti-pattern `rule.prefer.most-common-denominator` forbids
(push to the outermost leaf; lift to the ancestor only when a second owner proves the reuse).

## .native-to, NOT cited-by — the trap

the axis is **ownership**, not usage. a fact is native to the role whose *domain expertise* it
belongs to — not every role that happens to reference it. one role frequently **cites** another's
knowledge across the role boundary; that citation does NOT make the fact shared.

worked example — `teledermatology-concordance` (telederm sensitivity/specificity vs in-person):

- the referrer's venue stone **cites** it to weigh "virtual now vs in-person later"
- but the fact — *can a photo-based read diagnose a melanoma as accurately as an in-person exam?* —
  is a **diagnostic-accuracy** fact. only the **diagnostician** would author, update, or vouch for
  it. the referrer consumes a diagnostician output; it does not co-own the evidence.
- verdict: **diagnostician role leaf**, cited across the boundary by the referrer — NOT `role=any`.

the test, before you promote: **"which role's expertise would AUTHOR this fact?"** — not "who reads
it". one role owns it → that role's `briefs/inventory/`. genuinely two+ roles would each author it
independently → `role=any`. a cross-role citation is normal and expected; it never, on its own,
earns `role=any`. when unsure, prefer the role leaf; a later lift is cheap, the reverse is churn.

## .what an accrued entry must carry

each `accrue/inventory.of=<topic>.md` entry is a **fact-brief**, not a case note:

1. **the generic fact** — stated case-neutrally ("feline VAAE incidence ~52/10,000"), no patient in it
2. **the citation** — bhrowser-verified source + verbatim quote + URL/PMID (per
   `rule.require.bhrowser-citations`)
3. **the retrieval date** — a cached capture proves what the source said *when quoted*
4. **the topic scope** — what class of case this fact serves (so promotion can judge reusability)

if a "fact" cannot be stated without the specific patient in it, it is a case application, not an
accrual — it stays in the yield.

## .how a stone honors this

1. do the research (bhrowser gather).
2. write the case application into the stone's `yield.md`.
3. **lift** every generic, case-neutral, cited fact into `$route/accrue/inventory.of=<topic>.md`.
4. leave the yield pointing to the accrued fact (the yield *uses* the fact; the fact *lives* in
   `accrue/`).

## .the boundary — this is not "duplicate everything"

the rule does **not** demand the yield restate every accrued fact, nor that trivial observations be
accrued. it demands:

- a **load-bearing, reusable, cited fact** is accrued (not trapped in the yield), and
- an **applied, patient-specific decision** stays in the yield (not leaked into `accrue/`, which is
  fullsun — this is the same boundary `rule.require.fullsun-facts-not-tactics` draws).

## .enforcement

- a stone that gathers cited ground truth but writes it **only** into the case yield, with no
  `accrue/inventory.of=<topic>` entry = **blocker**
- an accrued entry with **no citation** (bhrowser source + quote + date) = **blocker**
- a **patient-specific decision** written into `accrue/` (fullsun) instead of the yield (obscure) =
  **blocker** (a fullsun leak, per `rule.require.fullsun-facts-not-tactics`)
- a route with a research phase but **no `accrue/` dir** = **blocker**
- a promoted inventory placed at repo-wide `role=any` when **only one role's expertise owns it** =
  **blocker** (premature lift; it belongs at `src/domain.roles/<role>/briefs/inventory/` — a
  cross-role *citation* does not earn `role=any`, only shared *authorship* does)

## .see also

- `rule.require.fullsun-facts-not-tactics.[rule].md` — the fact/decision split this operationalizes
- `rule.require.source-inventory.[rule].md` — the repo-shared home promotion lifts into
- `rule.require.bhrowser-citations.[rule].md` — how each accrued fact must be cited
- `rule.prefer.most-common-denominator` (architect) — hold at the leaf, lift when reused
