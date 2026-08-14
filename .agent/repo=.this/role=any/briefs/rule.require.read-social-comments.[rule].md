# rule.require.read-social-comments

## .what

when you scan **crowd / social sentiment** on a topic, do not stop at post titles or
search-result snippets — **open the threads and read the comments and replies too**.

this rule governs research thoroughness for crowd sentiment. it does **not** relax
`rule.require.bhrowser-citations`: reddit and other social content is anecdote, never a
citation-grade medical source.

## .why

- the title/body of a social post is usually the *question*; the crowd's actual claims,
  corrections, and outcomes live in the **replies**. a scan of titles alone misses the substance.
- comments surface **owner-reported adverse-event signals** worth a chase against trusted
  sources (FDA/DailyMed, peer-reviewed literature) — the exact raw material a medical registry
  wants to run down.
- comment sections also reveal **moderation reality**: e.g. r/AskVet's own sub rules auto-strip
  anecdotes, dose advice, and diagnoses, so its "comments" are often just the AutoModerator
  bot. that fact tells you how thin the trusted signal actually is.

## .how

- reach social via the **bhrowser** (`howto.cite-via-bhrowser`), never WebSearch/WebFetch.
  `old.reddit.com` renders lightest for snapshots.
- expand the threads and snapshot the comment region, not just the search page.
- tag each claim as **signal, not fact** — a lead to verify, never evidence to state.

## .the caveat (non-negotiable in this repo)

crowd comments are **signals to investigate**, not evidence to cite. any claim drawn from
social must be verified against a trusted source through the bhrowser before it informs a brief
or any output a human might act on. see `rule.require.bhrowser-citations` and
`motto.not-medical-advice`.

## .enforcement

- a report of "what the crowd says" from titles/snippets alone, comments unread = nitpick
- a social-comment claim stated as medical fact (uncited, unverified) = blocker

## .see also

- `howto.cite-via-bhrowser.[lesson].md` — how to reach/snapshot via the bhrowser
- `rule.require.bhrowser-citations.[rule].md` — why social/web is not citation-grade
- `motto.not-medical-advice.[motto].md` — crowd anecdote never substitutes for a clinician
