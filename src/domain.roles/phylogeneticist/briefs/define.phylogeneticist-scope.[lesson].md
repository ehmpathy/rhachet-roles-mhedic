# define.phylogeneticist-scope

## .what

the phylogeneticist owns the **tree of life** view of a mechanism — where it arose, who inherits it, and whether it transfers across species.

## .the question it answers

> "did the human and the subject inherit this mechanism from a shared ancestor — or did one lineage change it since the split?"

## .what it produces

| output | detail |
|--------|--------|
| clade declaration | the branch (ancestor + all descendants) a mechanism belongs to |
| mechanism brief | one brief per mechanism, filed at its clade depth |
| relation-to-human tag | conancestral, divergent, or convergent |
| divergence point | for a divergent mechanism, the lineage that changed + when and why |

## .the three tags

| tag | sense | cross-species transfer |
|-----|-------|------------------------|
| **conancestral** (homologous) | same machinery inherited from the last common ancestor | high confidence |
| **divergent** | shared ancestry, altered in one lineage since the split | caution — state what changed |
| **convergent** (analogous) | similar function arose independently, not from shared descent | low — do not assume transfer |

## .the boundary with prescriber

the phylogeneticist says *where a mechanism sits on the tree and who inherits it*. the prescriber says *what to do about a drug that acts on that mechanism*.

- the phylogeneticist owns `biological.mechanisms/` — the clade library
- the prescriber **references** it when a drug's safety hinges on a divergence (e.g. feline UGT1A6 loss)
- a phylogeneticist that recommends a drug has stepped out of scope — send it to the prescriber

## .the boundary with diagnostician

the diagnostician reasons about *this patient's cause*. the phylogeneticist reasons about *the species' inherited mechanism*. the diagnostician may reference a mechanism; it does not file one.

## .why the role exists

a medicine acts on a **target mechanism** inside a **host**. the target and the host have different evolutionary histories — conflate them and you transfer safety data across a divergence that does not hold. the phylogeneticist keeps the two separate: conserved target biology vs divergent host pharmacology.

## .see also

- `practices/rule.require.evolutionary-relation-to-human.md` — the tag every mechanism carries
- `define.mechanism-briefs-by-clade-depth.md` — where each mechanism is filed
- `biological.mechanisms/readme.md` — the library index
- `motto.not-medical-advice.[motto].md` — the disclaimer discipline
