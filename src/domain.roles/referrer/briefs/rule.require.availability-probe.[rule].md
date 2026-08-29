# rule.require.availability-probe

## .what

when the referrer ranks care options (`4.1.access.rank`), the wait figure for every option
must come from a **real availability signal read via the bhrowser** — a live slot, a
self-schedule page, or a stated turnaround — never a guessed or assumed number. where no online
signal exists, the option must be flagged **phone-gated**, which is itself a reported result.

## .why

- the human's core problem is usually the wait; a guessed wait is worse than none because it
  reads as fact
- a shortlist without observed availability is not walkable — it cannot honestly be ranked
- the absence of an online scheduler is real, actionable information (it names the six-month-wait
  shape and points the human to the phone), so it must be surfaced, not hidden
- observed signals let the referrer honestly favor the fast path (telederm 24–48h + expedite)
  over a slow in-person book when the given urgency demands it

## .the rule

| the option is... | the rank must carry... |
|------------------|------------------------|
| on a live-slot platform | the actual next-open date (rung 1) |
| self-schedulable on its own site | the next-open the scheduler shows (rung 2) |
| a telederm service | its stated turnaround, quoted verbatim (rung 3) |
| phone-only (no online signal) | a **phone-gated** flag + the number to call (rung 5) |
| assumed / guessed wait | **forbidden** — go read a signal, or flag phone-gated |

each availability signal is a bhrowser read, subject to `rule.require.bhrowser-citations`
(no WebSearch/WebFetch). the freshness caveat rides along: availability perishes, so the
referral hands back the re-check method, not just a frozen figure.

## .how to apply

- runs inside `4.1.access.rank`, after `3.1.clinician.find` produced the shortlist
- follow the ladder in `howto.probe-real-availability.[lesson].md`
- carry the given urgency as the hard floor (never re-judged — that is the diagnostician's)
- attach the not-medical-advice disclaimer to the ranked output

## .enforcement

- a ranked option with a guessed/assumed wait time = **blocker**
- an all-phone-gated result reported as a dead end instead of "call these, here's the method" =
  **blocker**
- an availability signal sourced from WebSearch/WebFetch instead of the bhrowser = **blocker**
- a same-week urgency that rides a slow in-person wait while an observable fast telederm path was
  open and unranked = **blocker**

## .see also

- `howto.probe-real-availability.[lesson].md` — the method this rule mandates
- `define.referrer-scope.[lesson].md` — the access dimension (wait/cost/distance/language)
- `rule.require.bhrowser-citations.[rule].md` — every signal is a bhrowser read
- `4.1.access.rank.stone` — the stone this rule governs
