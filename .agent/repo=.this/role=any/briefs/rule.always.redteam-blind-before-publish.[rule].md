# rule.always.redteam-blind-before-publish

# tldr

## severity: blocker (critical)

before any artifact set leaves this machine — a push, a PR, a publish, a demo — run a **blind
red-team** against it. two agents, in parallel, each given **no context**:

| lane | scope | hunts |
|---|---|---|
| **A — contents** | an explicit file list, and no other file | identifiers, case data, and what the SET reconstructs |
| **B — surfaces** | branch · path · commits · refs · file NAMES · caches · trash · forge | identity joined to a condition anywhere a grep over file contents cannot reach |

**the author cannot run this test.** an author who scrubbed a set knows what was removed and reads
the residue as innocuous. only a reader with no context can report what the set actually says.

⇒ this is phase 2 of `rule.require.publishability-triage`. **a `☀️ fullsun` tag with no red-team
behind it is a hypothesis, never a verdict.**

---
---
---

# deets

## .what

a **blind red-team** is an adversarial reconstruction run by an agent that has been given the
artifact set and **no other context** — no route, no history, no account of what was scrubbed, no
statement of what the set is supposed to be about.

it is blind in a specific sense: **the reviewer must not be able to part a clean set from a leaky one
by anything except a read of the set.**

## .why the author cannot do it

the author holds the case in memory. every de-identified sentence still reads, to them, as the fact
it replaced — so a phrase that reconstructs the case looks like ordinary prose.

🔴 **and worse, the author's own audit becomes a false clean.** an author reports *"I checked the
file contents"*, and both the author and the reader take that as *"the set is clean."* those are not
the same claim, and the difference is exactly where the leaks live.

⇒ the blind reviewer is not a second opinion. **it is the only opinion that can be evidence.**

## .the two lanes, and why BOTH are required

a single lane misses by construction. the two lanes fail differently:

| | lane A — contents | lane B — surfaces |
|---|---|---|
| reads | file bodies, from an explicit list | names, metadata, refs, caches, forge |
| catches | a case datum in a quote · a symptom pair · a filename set that narrows | a branch that joins a name to a condition · a "deleted" artifact still on disk · a forge record already public |
| misses | whatever sits outside a file body | whatever a name does not encode |

⚠️ **lane B is the one authors skip**, because a working-tree grep feels exhaustive and reaches none
of its surfaces.

### lane B's mandatory surface list

- **branch names**, local and remote · **the worktree/directory path** · parent dir names
- **commit messages**, all of history, all authors, all trailers
- **refs and tags**
- 🔴 **file and directory NAMES**, tracked AND untracked, at every level
- 🔴 **trash, cache, and log dirs a tool spawned** — an `rmsafe` trash, a browser profile, a session
  label, a `.log/` dir
- **the forge** — PR titles, bodies, and **head-ref names**, which survive a branch delete
- **config** that may carry an identity

## 🔴 .the two claims a red-team most often refutes, and they are the author's own

measured 2026-09-09, on a set the author had declared clean twice:

| the author's claim | what the blind lane found |
|---|---|
| *"the route was deleted"* | 🔴 **`rmsafe` MOVES TO TRASH; it does not delete.** the whole route — its seed and its intake data — sat intact under the trash path. the author had **written a brief that declared the deletion closed the exposure** |
| *"the lifted facts are case-neutral"* | 🔴 **~15 case data survived** in editorial commentary, across five classes. each is defensible alone; together they reconstruct a vignette. ⚠️ **the classes are not named here** — to enumerate them is to publish the residue a second time |

⇒ **both claims were made in good faith, by an author who had checked.** that is the point.

## ⚠️ .an "undo" tool is not a delete tool

`rmsafe`, `mvsafe`, and any tool with a trash or a backup are **recoverable by design** — that is
their value and it is also the hazard. ⇒ **a removal performed with a safety net is a MOVE**, and a
privacy claim that rests on it is false.

**check the tool's own contract before you claim a deletion.** the same holds for `git rm` (history),
a browser profile (cookies + history), and any editor backup.

## .the reconstruction questions lane A must be asked

1. is a real person, animal, provider, or facility identifiable — name, initials, location, date, ID?
2. was this written for a **specific case**, or is it general reference? what is the evidence?
3. if specific: infer age, sex, symptoms, timeline, body region, outcome. **push hard**
4. what can be inferred about the **author** — their situation, relation to the subject, their fear?
5. any dates or temporal markers that correlate to a real event?
6. 🔴 **does the SET narrow more than any file alone — including the filenames?**
7. anything that reads as written **about a person** rather than about the domain?

each answer rated CERTAIN / LIKELY / GUESS / UNKNOWN, with **the top leaking lines quoted and ranked**.

## .how to run it

```
Agent(subagent_type: general-purpose) ×2, in ONE message so they run in parallel
```

the prompt must:
- state that the reviewer has **no context and must not ask for any** — the absence is the test
- give lane A an **explicit file list** and forbid reads outside it (history, caches, routes)
- give lane B the **surface list** above, and restrict it to **read-only** commands
- demand confidence ratings and **quoted** leaking lines
- state that **false positives are cheap and a miss is not**

## .the verdict, and what each outcome obliges

| the red-team recovered | verdict |
|---|---|
| only generic domain facts | ✅ the set holds. publish |
| a **specific case**, even with no name | 🔴 **blocker.** the residue is inferential — rewrite each leaking line into the general rule it evidences, then **re-run** |
| an identity on **any** surface, joined to a condition | 🔴 **blocker.** remediate the surface. a branch rename is cheap **before** a push and impossible after |
| an artifact the author believed deleted | 🔴 **blocker**, and the author's prior claim is now known false — **correct every brief that repeats it** |
| an already-public item | ⚠️ record it, state it is **irreversible**, and spend the effort on what is still preventable |

⇒ **one clean pass is not proof.** each leak found is a remediation and a **re-run**.

## .the timing — before the push, never after

| moment | what a rename or a strip costs |
|---|---|
| before a push | one command |
| after a push | 🔴 **a forge head-ref survives a branch delete.** it cannot be recalled |

⇒ run it at the last moment the work is still local, and **never treat "it is only local" as safety**
— a worktree path leaks through every log, trace, and pasted transcript.

## .enforcement

- an artifact set pushed, published, or demoed with **no blind red-team** = **blocker (critical)**
- a red-team run by the **author's own read** rather than a context-free reviewer = **blocker** (it is
  not blind; it is a self-report)
- **one lane only** — contents without surfaces, or surfaces without contents = **blocker**
- a red-team that recovers a specific case or an identity, and the set published anyway = **blocker**
- a privacy claim that rests on a **removal by a tool with a trash or a backup**, unverified against
  that tool's contract = **blocker**
- a red-team result cited with **no date and no scope** = **blocker** (`rule.forbid.pii`, the
  verification duty)
- a leak found and remediated, with **no re-run** = **nitpick**

## .publishability

☀️ **fullsun** (share) — a generic privacy and publication-hygiene procedure. it carries no subject
identity and no client-specific mechanic; the measured failures above are the author's own.

## .see also

- `rule.require.publishability-triage.[rule].md` — this rule IS its phase 2, stated as a standing duty
- `rule.forbid.pii.[rule].md` — what counts as an identifier, and the verification duty
- `rule.require.fullsun-facts-not-tactics.[rule].md` — the fact/decision line a red-team tests
- `howto.test-obscurity-via-blind-convergence.[lesson].md` — the peer probe: do blind readers converge on one design?
- `term=fullsun._.choice._.md` — 🔴 the invariant this rule enforces: **a tag is a hypothesis until a red-team fails to break it**
- `term=protect._.choice._.md` — the irreversible posture this rule exists to guard
