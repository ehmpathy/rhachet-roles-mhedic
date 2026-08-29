# domain.term.choice.reason: dispatch

## .etymology

`dispatch` — from the sense "to send off to a destination with promptness". the word carries exactly
the load-bearing meaning: a thing **sent to a target**, not the work itself and not the target's
record of it. a courier dispatches a parcel; the parcel is not the errand (the task) and not the
recipient's log (the issue). the referrer/dispatcher domain needed one word for the *sent artifact*,
distinct from both the *task-to-do* and the *channel record*.

chosen because the radio-push work has three easily-confused things that must NOT share a word:

- the **task** — the work someone should do (the payload)
- the **dispatch** — the local `.[task].md` source we send over the radio to a target repo
- the **issue** — the channel's durable form of that dispatch (a GitHub issue)

to call the local source a "task" blurs it with the work; to call it an "issue" blurs it with the
channel record. `dispatch` names the *act-of-having-sent* frozen as an artifact — the third, distinct
thing.

## .disputes

### dispute: task  —  raised 2026-08-27  —  status: RESOLVED (keep `dispatch` for the sent artifact)
- raised.by  = referrer (self)
- claim      = the file is literally named `*.[task].md`, so "task" is the natural word for it
- counter    = the `.[task].md` suffix names the *payload kind* the artifact carries (a task, vs a
               review or a wish); the artifact itself is the *sent* thing. a dispatch CONTAINS a task
               the way an envelope contains a letter — the envelope is not the letter. to keep them
               one word erases the send/route-scope semantics that are the whole point of
               `$route/.dispatch/`.
- resolution = keep `dispatch` for the sent, route-scoped artifact; `task` is the payload it carries,
               a forbidden synonym for the artifact itself.

### dispute: `.radio/` as the home dir  —  raised 2026-08-27  —  status: RESOLVED (keep `$route/.dispatch/`)
- raised.by  = human (wisher)
- claim      = the dispatcher role already uses `.radio/` as its local dir (`radio.task.pull`
               auto-caches received tasks there), so route-scoped *pushed* dispatches could share the
               one radio-channel namespace `$route/.radio/`.
- counter    = `.radio/` (per the dispatcher skill) holds *pulled* tasks — a machine-managed CACHE of
               someone else's work received over the radio. a dispatch is the opposite polarity: a
               *hand-authored, outbound* source artifact we push. to co-locate them conflates authored
               source with pull-cache in one dir. `.dispatch/` names the artifact-kind and holds the
               two polarities apart.
- resolution = keep `$route/.dispatch/` as the home for authored outbound dispatches; `.radio/` stays
               the dispatcher's pulled-task cache. a future traveler who re-raises `.radio` should read
               this: the push/pull polarity is why they stay separate dirs.

## .evidence

- **the coinage was forced by a real misplacement**: dispatches were repeatedly written into the
  permanent shared briefs (`.agent/repo=.this/role=any/briefs/`) instead of the route that produced
  them — because no term named them as *route-scoped, ephemeral* artifacts distinct from durable
  briefs. to name the concept `dispatch` and give it a home (`$route/.dispatch/`) is what draws that
  boundary. the fix + the upstream bhuild dispatch (#342) both turn on this distinction.
- **contract usage**: `dispatch` is a contract word — the `.dispatch/` dir, the
  `dispatch.$target.$slug.[task].md` filename shape, and the `radio.task.push` target semantics — not
  merely prose.
- **invariant**: a dispatch lives in `$route/.dispatch/`, never in a `briefs/` dir; its durable
  source of truth is the channel issue, not the local file (the local file is the *sent copy*).
