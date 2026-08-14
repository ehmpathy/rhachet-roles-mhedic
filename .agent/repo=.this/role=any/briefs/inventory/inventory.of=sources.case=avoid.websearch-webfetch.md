# inventory.of=sources.case=avoid.websearch-webfetch

- **source**: WebSearch results & WebFetch page reads (retrieval *methods*, not a domain)
- **id**: tool=WebSearch, tool=WebFetch
- **case**: **avoid** (as a citation source)
- **role allowed**: discovery only

## .why we can't trust them as citations

- **WebSearch** returns snippets/summaries, not verified source text — "results can be stale,
  misread, or fabricated by the search engine."
- **WebFetch** is opaque — we cannot confirm what rendered, whether content was truncated or
  summarized.
- forbidden outright as citations by `rule.require.bhrowser-citations` (blocker if cited).

## .the one legitimate use

**discovery of candidate URLs only.** a search may point us at a page; we then reach that page
through the **bhrowser** and quote it verbatim. the snippet itself is never the citation.

## .in this run

initial Onsior facts were gathered via WebSearch/WebFetch, then **discarded and re-gathered through
the bhrowser** before anything was written to a brief. that is the required pattern.

## .what to use instead

the **bhrowser** (real browser render) → `rule.require.bhrowser-citations`; then record the resulting
domain in this inventory as `trust`/`avoid`.
