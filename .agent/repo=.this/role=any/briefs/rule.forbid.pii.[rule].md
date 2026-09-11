# rule.forbid.pii

# tldr

## severity: blocker (critical)

**never** persist personally identifiable information (PII) or protected health information
(PHI) anywhere in this repo. strip every identifier that ties a record to a real person,
animal, household, or provider — **anonymize it** — before it lands in any file.

this is **critical**: a leaked identifier is durable, copyable, and — for a privacy right —
**irreversible** once it ships. no reversal, no waiver-back.

the two surfaces where raw source leaks in verbatim demand the sharpest care:

- **transcripts** — text lifted from source pdfs, images, or dictations
- **wishes** — `0.wish.md` and any plan artifact where we paste what the human handed over

PII maps to the 🔒 **protect** posture of `rule.require.publishability-triage`: value is a
privacy right, the loss is irreversible, never expose it.

---
---
---

# deets

## .what

PII / PHI must be **absent** from every persisted artifact: transcripts, wishes, briefs,
stones, yields, research docs, review artifacts, logs, commit messages, test fixtures, code
comments. the required practice is **anonymization** — replace each identifier with a stable
placeholder, keep the clinical facts, drop the identity.

**anonymize, do not delete.** the clinical signal (species, age, weight, the drug, the dose,
the diagnosis) is what we reason over; the identity is not. keep the first, strip the second,
so the record stays useful **and** safe.

## .why

- a medical record carries **PHI / PII**: a name, an address, a phone, a microchip, an MRN.
  once it lands in git it is durable and hard to recall.
- this repo reasons over medical facts and is built to be **shared, published, and demoed**.
  an identifier that serves no clinical purpose is pure liability the moment it ships.
- the harm is not a lawsuit — it is a person's or a household's privacy. a privacy leak does
  not reverse: unlike an obscured trade secret you can out-execute, a disclosed identity
  never returns to private. that is why PII sits at 🔒 **protect**, the most restrictive
  posture, and why this rule is critical.

## .what counts as pii

replace each with a **stable placeholder** (see `.how`), never the real value:

| identifier | example → placeholder |
|------------|------------------------|
| person / owner name | `Casey Brooks` → `[OWNER]` |
| animal / patient name | `Mishka` → `[PATIENT]` |
| provider / clinician name | `Dr. Jacob Knox` → `[VET]` |
| facility / clinic name | `Gulf Winds Animal Hospital` → `[CLINIC]` |
| street address | `600 Parkside Cir, ...` → `[ADDRESS]` |
| email | `casey...@gmail.com` → `[EMAIL]` |
| phone | `(317) 902-6683` → `[PHONE]` |
| microchip / MRN / SSN / member id | `981020061485` → `[MICROCHIP]` |
| license / certificate / tag number | `FL188852`, tag `63539` → `[LICENSE]`, `[TAG]` |
| precise date tied to a person | `08-06-2026` → `[DATE]` (keep only if clinically needed) |
| geolocation finer than region | city / zip → drop or coarsen to region |

when a field is not on this list but still points to one identifiable subject, treat it as
PII and strip it. the list is a floor, not the whole set.

## .what to keep

the clinical facts that name no subject — these are the point:

- species, breed, sex, spay / neuter status, age, weight, body condition
- the drug, formulation, strength, dose, route, frequency, duration
- the diagnosis, the observation, the vaccine type, the lot's *drug* (not its serial)
- generic manufacturer / product names (`Onsior`, `robenacoxib`, `Zoetis PUREVAX`) — a
  commercial product is not a person

## .how

- **stable placeholders** — the same subject is `[PATIENT]` everywhere in the artifact, not a
  fresh token each mention, so cross-references still hold.
- **anonymize on the way in** — strip identifiers at the moment of transcription. never paste
  raw PII into a wish or transcript "to clean up later"; the clean-up gets forgotten.
- **raw source stays out of git** — original pdfs / images that carry PII must not be
  committed. a demo that needs a source artifact uses an **anonymized derivative** (a redacted
  copy); the original stays outside the repo.
- **scrub before the commit** — the commit is the point of no easy return; the identifiers
  must be gone before it lands.

## .examples

### 👎 bad — raw identifiers in a wish

```md
the patient is Mishka, owner Casey Brooks, 600 Parkside Cir, microchip 981020061485,
vaccinated by Dr. Jacob Knox at Gulf Winds Animal Hospital.
```

### 👍 good — anonymized, clinical signal intact

```md
the patient is [PATIENT], a 1 yr 2 mo spayed female domestic long hair, 8.4 lbs.
rabies vaccine (Zoetis PUREVAX FVRCP/RABIES) administered by [VET] at [CLINIC].
```

## 🔴 .the verification duty — a clean grep is not a clean repo

the rule above says what to strip. this says how to **prove** it was stripped, because two
independent anonymization failures — both measured 2026-09-07 — each left a clean grep behind:

⚠️ **the word here is `anonymize`, never `scrub`.** `scrub` is the declared **verdict** for the 🕶️
obscure posture (`rule.require.publishability-triage`), and PII sits at 🔒 **protect**. the two acts
both remove identity, so the genus fits — but a PII strip reported as a *"scrub"* names the wrong
posture, and the posture is what carries the severity.

| the failure | what the grep saw | what it missed |
|---|---|---|
| **the wrong tree** | `.agent/` clean | `.agent/repo=<role>` is a **symlink into `dist/`** — a build artifact. the authored source is `src/domain.roles/*/briefs/`, and it held 30 leaked lines |
| **the wrong pattern** | the case slug clean | the case **spawned** other names — browser session labels, log dirs — that do not contain the slug at all |

⇒ three duties follow, and each closes one of those holes:

1. **audit the SOURCE tree, never a built view.** follow every symlink and check `.gitignore`
   before you call a tree audited. a grep over a build artifact proves only that the build is clean
2. **a leak pattern derived from one artifact's name does not cover the names that artifact
   spawned.** enumerate the spawned names FIRST — session labels, log directories, branch, worktree
   path — then grep for each. one pattern per name, never one pattern for all
3. 🔴 **an audit result carries a scope and a date, or it carries naught.** *"0 matches"* is true only
   of the tree searched, at the moment searched. **an audit result that outlives one re-lift is worse
   than no audit** — it reads as proof and is not

### 🔴 duty 4 — a REMOVAL by a safety-net tool is a MOVE, never a delete

`rmsafe`, `mvsafe`, and every tool with a trash or a backup are **recoverable by design**. ⇒ a
privacy claim that rests on one is false.

**measured 2026-09-09**: a route was removed with `rmsafe` and declared closed — in a brief that
said so in as many words. a blind red-team found the whole route, its seed, and its intake data
intact under the trash path.

⚠️ the same holds for `git rm` (history keeps it), a browser profile (cookies + history), and any
editor backup. **read the tool's own contract before you claim a deletion.**

### the surfaces outside the file tree

a repo interior may be spotless while the identity is still in the open. none of these is reachable
by a grep over the tree on disk:

| surface | why a tree grep misses it |
|---|---|
| **branch name** | not a file. it is in git refs, and it travels to the forge |
| **worktree / directory path** | not a file either — it is the path the files sit under |
| **PR title and description** | lives on the forge, never in the tree |
| **commit messages** | in git history, not in the tree on disk |
| **session labels, log directory names** | artifacts a run spawned, often outside the repo |

⚠️ **a name is PII when placed next to a condition, even where each half alone is benign.** a branch
`<person>/<condition>` discloses a diagnosis about a named individual, and it does so in every clone,
every `git branch` output, and every pull request that carries it.

## severity: blocker (critical)

a raw identifier in a persisted artifact is a live, irreversible privacy leak. the cost of a
placeholder is one token; the cost of a shipped identity is a right that never returns. this
is the highest bar in the repo — no exception for "just a demo", no "clean it up later".

## .where

applies to **every** persisted artifact: transcripts, wishes, briefs, stones, yields,
research docs, logs, commit messages, test fixtures, code comments — and any committed source
document.

it does not carve out "internal" or "temporary" files; a temp file that carries PII and gets
committed leaks all the same.

## .enforcement

- any PII / PHI in a persisted artifact (transcript, wish, brief, stone, yield, log, commit,
  fixture) = **blocker** (critical)
- a raw source document that carries PII committed to the repo = **blocker** (critical)
- an identifier in a **branch name, worktree path, PR title, or commit message** = **blocker**
  (critical) — the tree is not the whole repo
- an anonymization declared complete on the strength of a grep over a **symlinked or built** view = **blocker**
- a removal claimed as a **deletion** where the tool has a trash or a backup = **blocker (critical)**
- an artifact set published with **no blind red-team** = **blocker (critical)** (`rule.always.redteam-blind-before-publish`)
- an audit result cited with **no scope and no date** = **blocker** — it cannot be told from a stale one
- a PII strip reported as a *"scrub"* = **nitpick** — `scrub` is the 🕶️ obscure verdict; PII is 🔒 protect
- a placeholder that drifts (same subject, different tokens, so the record misleads) = **nitpick**

## .publishability

☀️ **fullsun** (share) — generic privacy-hygiene rule; carries no subject identity and no
client-specific mechanic. the `Mishka` / `Casey Brooks` values in the examples are the
anonymization targets themselves, shown here only to demonstrate the strip.

## .see also

- `rule.require.publishability-triage.[rule].md` — PII sits at the 🔒 protect posture
- `motto.not-medical-advice.[motto].md` — the humility discipline this guards
- `howto.redact-obscure-to-medical-facts.[lesson].md` — the step-by-step redaction move
- `rule.require.recommendation-disclaimer.[rule].md` — the recommendation-disclaimer companion
