# rule.require.evolutionary-relation-to-human

## .what

for each biological mechanism you state, classify its evolutionary relationship to the human reference — and, where the mechanism differs, name the divergence point.

every mechanism gets exactly one tag:

| tag | sense | cross-species transfer |
|-----|-------|------------------------|
| **conancestral** (homologous) | same machinery inherited from the last common ancestor | high confidence |
| **divergent** | shared ancestry, but altered in one lineage since the split | caution — state what changed |
| **convergent** (analogous) | similar function arose independently, not from shared descent | low — do not assume transfer |

## .why

- a medicine acts on a **target mechanism** inside a **host**
- the target and the host have different evolutionary histories, and conflation of the two causes harm
- the target pathway is often deeply conserved (conancestral) — so mechanism of action transfers across species
- the host's drug-metabolism is often where the lineage diverged — so safety does *not* transfer
- canonical example: robenacoxib inhibits COX-2 the same way in every mammal (conancestral target), yet it is safe in cats for a feline-specific reason (divergent glucuronidation)
- an unclassified mechanism hides which of the two regimes applies

## .how

1. itemize every mechanism in the chain
2. tag each one: conancestral | divergent | convergent
3. for divergent, name the lineage that changed + roughly when and why
4. split the write-up into **conserved target biology** vs **divergent host pharmacology**

## .the test

for each mechanism, ask: "did the human and the subject inherit this from a shared ancestor, unchanged?"

- yes → conancestral
- shared ancestor, but one lineage altered it → divergent (name the point)
- no shared ancestral mechanism, the function arose twice → convergent

## .examples

### good

> **COX-2 induction** at inflammation sites — **conancestral**; the COX-1/COX-2 duplication predates the human/cat split, both species inherit both isoforms.
>
> **hepatic glucuronidation of xenobiotics** — **divergent**; UGT1A6 is a pseudogene in cats (a lineage-specific loss in Felidae after the split from the lineage that leads to humans), so feline clearance differs from human.

### bad

> COX-2 is inhibited and the drug is cleared by the liver.

(no evolutionary tag; the reader cannot tell which mechanism transfers across species and which does not)

## .enforcement

a biological mechanism stated without an evolutionary tag = blocker

## .see also

- `../define.mechanism-briefs-by-clade-depth.md` — where each tagged mechanism is filed
- `../biological.mechanisms/readme.md` — the library index
- the prescriber's `inventory.of=prescriptions.for=feline.case=robenacoxib-onsior.mechanics` — a worked reference of this rule
