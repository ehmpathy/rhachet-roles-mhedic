# domain.term: dispatch

term.chosen   = dispatch
term.kind     = noun
term.synonyms.forbidden:
- task (the payload a dispatch carries; a dispatch is the SENT task, not the task-to-do itself)
- issue (the channel's form of a dispatch — a GitHub issue — not the local source artifact)
- request (too generic; a dispatch is a specific push-to-a-target, not any ask)
- ticket (helpdesk jargon; the channel already has its own noun, `issue`)
- broadcast (implies many recipients; a dispatch is aimed at one target repo/role)

## .what

a **route-scoped task artifact sent to another repo over the radio** — the local `.[task].md` source
that `radio.task.push` pushes to a target repo's channel (its durable record is the GitHub issue the
push creates). a dispatch is a byproduct of work done on a behavior route: it is born, held, and
cleaned up in that route's `$route/.dispatch/` dir, NEVER in the permanent shared briefs. the artifact
is ephemeral (the channel issue is the source of truth); a durable lesson it encodes is separately
distilled into a real brief.

## .refs

- .behavior/v2026_08_14.referral-of-dermo/.dispatch/ (the route-scoped home of a dispatch)
- .behavior/v2026_08_14.referral-of-dermo/.dispatch/dispatch.bhuild.route-scoped-dispatch-dir.[task].md (the dispatch that settles the home convention)

## .reason

see the ref-level cluster beside this choice:
- `term=dispatch._.choice.reason.md` — etymology, the task/issue contrast, the route-scope evidence
