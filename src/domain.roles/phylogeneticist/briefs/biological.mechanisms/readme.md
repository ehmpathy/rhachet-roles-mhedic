# biological.mechanisms

## .what

a library of biological mechanisms, each filed at its **clade depth** — the branch of the tree of life where the mechanism arose and stayed conserved.

## .what is a clade

a **clade** is a group that includes **one ancestor and *all* of its descendants** — a single complete branch of the tree of life.

- **is a clade:** all mammals (one ancestral mammal + all that descended from it)
- **is NOT a clade:** "all animals except birds" — a descendant was excluded, so the branch is broken

because a clade = an ancestor + all descendants, a mechanism's clade is a precise claim about **who inherits it**.

## .why file by clade

- the **deeper** the clade (higher in the tree), the **more descendants inherit** the mechanism → the more reusable the brief
- a mechanism at `clade=metazoa` is inherited by cats, dogs, humans, all animals → broadly reusable
- a mechanism at `clade=felidae` is inherited by cats only → a divergence, do-not-transfer-to-humans
- see `../define.mechanism-briefs-by-clade-depth` for the placement rule

### the human reference

the human↔cat last common ancestor is a mammal, so:

- mechanism at **mammalia or deeper** → the human clade sits inside it → **shared with humans (conancestral)**
- mechanism at **felidae** → humans branched off before it → **not shared (divergent)**

## .tree of collected mechanisms

```
metazoa      (animals)              ← COX enzyme lives here → every animal inherits it
  └─ bilateria                      ← PLA2 lives here
       └─ vertebrata                ← PGE2 nociceptor sensitization
            └─ mammalia             ← COX-1/COX-2 isoform split, fever, spinal sensitization
                 └─ ... carnivora
                      └─ felidae    ← UGT1A6 loss lives here → ONLY cats inherit it
```

## .inventory

| clade | mechanism | relation-to-human | brief |
|-------|-----------|-------------------|-------|
| metazoa | COX → prostaglandin synthesis | conancestral | `clade=metazoa/mechanism.cox.prostaglandin-synthesis` |
| bilateria | PLA2 → arachidonic acid liberation | conancestral | `clade=bilateria/mechanism.pla2.arachidonic-acid-liberation` |
| vertebrata | PGE2 → nociceptor sensitization | conancestral | `clade=vertebrata/mechanism.pge2.nociceptor-sensitization` |
| vertebrata | inflammation → vascular response | conancestral | `clade=vertebrata/mechanism.inflammation.vascular-response` |
| mammalia | COX-1 vs COX-2 isoform split | conancestral | `clade=mammalia/mechanism.cox.isoform-split` |
| mammalia | PGE2 → hypothalamic fever | conancestral | `clade=mammalia/mechanism.pge2.hypothalamic-fever` |
| mammalia | spinal COX-2 → central sensitization | conancestral | `clade=mammalia/mechanism.cox2.spinal-sensitization` |
| felidae | UGT1A6 → glucuronidation loss | **divergent** | `clade=felidae/mechanism.ugt1a6.glucuronidation-loss` |

## .how to add a mechanism

1. identify the deepest clade where the mechanism stays conserved
2. place it at `clade={name}/mechanism.{topic}.md`
3. tag its relation-to-human per `../practices/rule.require.evolutionary-relation-to-human`
4. add a row to the inventory above and, if it names a new depth, a node to the tree

## .see also

- `../define.mechanism-briefs-by-clade-depth` — the placement rule
- `../practices/rule.require.evolutionary-relation-to-human` — the tag every mechanism carries
