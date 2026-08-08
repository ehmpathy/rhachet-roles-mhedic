# domain.term.choice.reason: mhedic

## .etymology

a portmanteau, deliberately coined:

- **medic** — the person who tends the patient
- **medicine** — the substance and the discipline
- **mend** — the outcome all of it aims at

the `mh` at the front is not a typo. it marks the word as **coined**, not borrowed — the same
move `bhrain` and `bhuild` and `bhrowser` make across the org's registries. a coined slug
cannot collide with the ordinary english word, so `mhedic` names this registry and only this
registry.

## .the rejected alternatives

| word | why not |
|------|---------|
| `medic` | ambiguous — a battlefield medic, an army corpsman, a paramedic. names one role, not the discipline |
| `medico` | informal slang; also names a person, not a registry |
| `doctor` | names a credential and a person; the registry holds many roles, only some of which a doctor performs |
| `clinician` | same defect as `doctor` — a person, not the domain |
| `health` | too broad; would swallow fitness, wellness, insurance, and much else this registry does not hold |

each rejected word names a **person** or a **field**. `mhedic` names **this registry** — a
bounded set of roles that reason over medical facts.

## .the peer registries

the coinage sits in a family, which is itself evidence the shape is right:

- `bhrain` — the thought registry
- `bhuild` — the behavior registry
- `bhrowser` — the browser registry
- `rhight` — the legal registry
- `mhedic` — the medical registry

## .evidence

- discovery: domain-expert narrative — the human named it directly at repo bootstrap, and the
  readme records the gloss verbatim ("mhedic = medic + medicine + mend")
- the registry slug carries load: `rhx --repo mhedic`, `rhachet roles boot --repo mhedic`,
  and every role's `onBoot` hook all key off this exact word
- invariant: the registry slug, the package name suffix, and the `rhachet.repo.yml` slug must
  agree — a drift in any one breaks role boot
