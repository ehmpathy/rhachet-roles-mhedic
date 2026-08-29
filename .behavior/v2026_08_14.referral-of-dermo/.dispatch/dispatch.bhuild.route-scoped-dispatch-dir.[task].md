# feat(dispatcher+behaver): enqueue radio dispatches into $route/.dispatch/, not the shared briefs

## .what

when an agent authors a **dispatch** (the source `.[task].md` for a task pushed over the radio via
`radio.task.push`), that file must land in the **route's own** `$route/.dispatch/` dir — bound to the
behavior route that produced it — NOT in the permanent shared briefs dir
(`.agent/repo=.this/role=any/briefs/`).

bhuild owns both halves of this: the **dispatcher** role (`radio.task.push`, the radio channel) and
the **behaver** role (the `$route` / behavior-route structure). so the convention that ties a dispatch
to the route that produced it belongs upstream in bhuild, taught + enforced once for every downstream
repo.

## .why

a dispatch is **ephemeral and route-scoped**, not durable domain knowledge:

- its **durable** record is the GitHub issue the radio push created (the channel is the source of
  truth); the local `.[task].md` is merely the text we sent.
- it is a **byproduct of work done on a route** — it should be born, held, and cleaned up **with**
  that route, so a completed route carries its own dispatch trail and the shared briefs stay clean.
- `.agent/repo=.this/role=any/briefs/` is for **durable, reusable domain knowledge** (rules, howtos,
  definitions, inventories) that boots into every session's context. a one-shot dispatch pollutes
  that space and drifts from the route that motivated it.

this mirrors how a route already holds its own `accrue/`, `review/`, `.route/`, `.reviews/` — the
dispatch trail is the same kind of route-local artifact.

## .the failure that motivated it

in rhachet-roles-mhedic, three dispatches (`dispatch.bhrowser.*`, `dispatch.ghlitch.*`,
`dispatch.bhrain.*`) were written into `.agent/repo=.this/role=any/briefs/` — the first by an earlier
session, the next two by a copy of that bad precedent. they were later moved by hand to
`$route/.dispatch/`. that manual correction is exactly the convention bhuild should own so the mistake
cannot recur.

## .what bhuild should teach + enforce

1. **the home**: an authored dispatch `.[task].md` lives at `$route/.dispatch/dispatch.$target.$slug.[task].md`,
   where `$route` is the bound behavior route.
2. **the mechanism**: ideally `radio.task.push` (or a behaver dispatch skill) **writes the source
   into `$route/.dispatch/` as part of the push**, so the local artifact and the radio issue are
   created together and stay in sync — the agent never hand-places it.
3. **the boundary**: a dispatch is NEVER a `briefs/` entry. if a dispatch encodes a durable lesson,
   that lesson is separately distilled into a real brief; the dispatch itself stays route-local.
4. **enforcement**: a `dispatch.*.[task].md` found under `.agent/**/briefs/` = blocker (move to
   `$route/.dispatch/`); a dispatch with no known route = flag (which route produced it?).

## .done when

- an authored dispatch lands in `$route/.dispatch/`, created alongside the radio push
- `radio.task.push` (or the behaver dispatch skill) documents + defaults to this home
- a lint/rule flags a `dispatch.*.[task].md` that leaks into a `briefs/` dir
- a downstream repo that boots bhuild inherits the convention (no per-repo rework)

## .see also

- the manual fix that motivated this: three dispatches moved from `briefs/` to `$route/.dispatch/`
  in rhachet-roles-mhedic (the referral-of-dermo route)
- dispatcher: `radio.task.push` (the radio channel these dispatches ride)
- behaver: the `$route` / behavior-route structure that already holds `accrue/`, `review/`, `.route/`
