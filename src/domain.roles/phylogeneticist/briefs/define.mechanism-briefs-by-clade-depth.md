# define.mechanism-briefs-by-clade-depth

## .what

each biological mechanism gets its own brief, filed at the **clade depth of its common ancestor**. this accumulates a reusable library of mechanisms per organism at common evolutionary depths.

## .why

- decompose for recomposition: a mechanism filed once is reused by every case that touches it
- a mechanism filed at its common-ancestor depth is inherited by every descendant clade → any drug or disease case at or below that depth can reference it instead of re-describe it
- push a mechanism to its deepest common ancestor; when a lower clade diverges, that divergence gets its own brief at the clade where it arose
- conancestral mechanisms accumulate at deep, shared clades → broadly reusable
- divergent mechanisms accumulate at the specific clade where the lineage changed → narrowly scoped, safety-critical

## .structure

```
briefs/biological.mechanisms/
  clade=metazoa/     ← deepest, most reusable
  clade=bilateria/
  clade=vertebrata/
  clade=mammalia/
  clade=felidae/     ← shallow, lineage-specific divergences
```

## .where to file

- **conancestral** mechanism → file at the deepest clade where it stays conserved
- **divergent** mechanism → file at the clade where the divergence arose
- when you learn a mechanism sits deeper than filed, lift it to the deeper clade

## .the human reference

the phylogeneticist compares each mechanism to the **human lineage**. the human↔cat last common ancestor is a boreoeutherian mammal. so:

- a mechanism filed at **mammalia or deeper** is shared with humans → conancestral
- a mechanism filed at **felidae** (or carnivora, feliformia) diverged after the split → not shared with humans

## .see also

- `practices/rule.require.evolutionary-relation-to-human.md` — the tag every mechanism carries
- `biological.mechanisms/readme.md` — the library index
