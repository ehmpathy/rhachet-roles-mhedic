# todos.offroad-route-templatize

## .what

the diagnostician case route at
`src/domain.roles/diagnostician/briefs/.demo/case=miki-vet-2026-08-07/` is an **offroad,
adhoc route** — a sequence of `.stone.md` (instruction) + `.yield.md` (artifact) milestones
paved by **demonstration**, not by a formal skill-stamped template.

this brief records that we eventually want to **templatize it formally**.

## .the two ways a route is born

| way | how | when |
|-----|-----|------|
| **offroad (now)** | hand-authored stones, paved by a walk through one real case | discover the shape of a new route |
| **paved (later)** | a skill stamps the stones from a template | the shape has proven itself across cases |

offroad comes first on purpose: you cannot template a route whose shape you have not yet
discovered. you walk one real case, let the milestones reveal themselves, then extract the
template once the pattern holds.

## .what this route already demonstrates

the causal-diagnosis flow, as walked once for miki:

```
0.seed → 1.intake → 2.1.differential.enumerate → 2.2.{1..5} disentangle → 3.assay → 4.triage → 5.diagnosis
```

- the four-node causal frame (`define.causal-chain-frame`)
- the enumerate/disentangle differential split
- the disentangle loop with a rewind gate (`howto.disentangle-via-matrix`)
- the stone/yield milestone convention

## .what a formal template would add

- a **skill** that stamps the stones for any new case (`case=$slug`), the way
  `init.behavior` / `declapract.upgrade init` stamp their routes
- a **bind** so the route drives via hooks (`rhx route.bind.set`)
- **guards** per stone (peer + self reviews, judges) carried by the template, not hand-added
- a stable number + name contract, so every case reads the same

## .the trigger to formalize

templatize once the shape has proven itself across **2+ real cases** — the same rule of three
that governs any abstraction (`rule.prefer.wet-over-dry`). one case is a demonstration; the
second confirms the shape; the template pays off from the third on.

do not templatize from one case. let the second case stress the shape first.

## .see also

- `howto.create-routes.[guide]` (enroller) — the route/stone/guard/bind mechanics
- `howto.disentangle-via-matrix.[lesson]` — the reusable method this route exercises
- `rule.prefer.wet-over-dry` (mechanic) — why we wait for the pattern before we abstract
