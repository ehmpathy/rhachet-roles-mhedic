# domain.term: protect

term.chosen   = protect
term.kind     = noun · adj · verb (one concept, three inflections — as `fullsun`)
term.glyph    = 🔒
term.synonyms.forbidden:
- secret (names a state of concealment. protect names WHOSE right is at stake, which is the whole point)
- confidential (near, and it names a legal category rather than the value axis this gradient uses)
- private (names the AUDIENCE. an artifact can be private and merely obscure)
- classified (borrows a state-security frame this repo does not have)
- forbidden (names the ACT barred, never the value guarded)
- deleted (a protect artifact is KEPT — in its owner's own space. deletion is a different act)

⚠️ **`prune` is NOT forbidden — it is the declared verdict alias.** the posture leads, the verdict rides.

## .what

**the posture of an artifact whose value is a RIGHT held by someone else** — a person's privacy, a
patient's health information, a client's privilege, an owner's moat.

protect is the most restrictive step of the light gradient declared in `term=fullsun._.choice._.md`.

## 🔴 .the differentia — irreversibility, and it is not a matter of degree

> **a leak of a protect artifact does not reverse. a waiver does not return.**

| | ☀️ fullsun | 🕶️ obscure | 🔒 **protect** |
|---|---|---|---|
| a leak costs | no loss | a lead | **a right** |
| can it be undone? | n/a | ✅ out-execute it | 🔴 **never** |
| does it graduate? | it is the destination | yes, on a trigger | 🔴 **no. there is no trigger** |

⇒ **the absence of a graduation trigger is the definition, not an omission.** an obscure artifact
that never graduates is a defect; a protect artifact that never graduates is correct.

⚠️ **this is why the gradient's steps are not evenly spaced.** fullsun → obscure trades value you can
rebuild. obscure → protect crosses into value you cannot. ⇒ *"when in doubt, take the more
restrictive posture"* is not caution for its own sake — it is an asymmetric bet on an irreversible
loss.

## .what earns the posture

| source of the right | example |
|---|---|
| **a person's privacy / health information** | any identifier that ties a record to a real person or animal — `rule.forbid.pii`, the repo's highest bar |
| **privilege** | a peer's privileged handoff. a leak can WAIVE the privilege, not merely disclose it |
| **an owner's moat** | the applied mechanic, the product architecture, the strategy — `rule.require.fullsun-facts-not-tactics` |

⚠️ **the three differ in whose right it is, and not at all in the disposition.** ⇒ that is what
justifies one word over three.

## .refs

- `rule.forbid.pii.[rule].md` — the privacy species; declares itself **blocker (critical)**
- `rule.require.publishability-triage.[rule].md` — the trio, the postures, the red-team
- `rule.require.fullsun-facts-not-tactics.[rule].md` — the moat species: decisions, never facts
- `howto.redact-completed-behavior-route.[lesson].md` — how a prune-approved route is handled

## .invariants

- 🔴 **a protect artifact has NO graduation trigger.** the absence is definitional
- **protect is KEPT, never destroyed** — it moves to its owner's own space. ⇒ a `prune` verdict is a
  RELOCATION, and to read it as a deletion loses the owner their own work
- ⚠️ **a protect artifact may be entirely true, well-cited, and generally useful, and still never
  ship.** ⇒ **quality is not the axis** — the axis is whose right the value belongs to
- **the red-team gate is asymmetric here.** a red-team that recovers a protect item from the fullsun
  set is a **blocker**, and one clean pass is not proof — each leak found is a re-run

## .reason

- `term=protect._.choice.reason.md`

## .see also

- `term=fullsun._.choice._.md` — the gradient and the posture/verdict relation
- `term=obscure._.choice._.md` — the step below; the reversible one, and the one with a trigger

## .publishability

☀️ **fullsun** (share) — a glossary entry for a generic publication-hygiene posture; carries no
subject identity and no client-specific mechanic.
