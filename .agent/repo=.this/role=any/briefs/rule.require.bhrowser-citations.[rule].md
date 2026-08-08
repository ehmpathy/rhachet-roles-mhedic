# rule.require.bhrowser-citations

## .what

all factual claims must be backed by citations gathered through the **bhrowser** (from `rhachet-roles-bhrowser`).

**WebFetch and WebSearch are forbidden as citation sources.**

## .why

WebSearch and WebFetch are not trustworthy for ground truth:

- **WebSearch** returns summaries and snippets, not source text. results can be stale, misread, or fabricated by the search engine.
- **WebFetch** is an opaque API. we cannot verify what it actually retrieved, whether the page rendered, or whether content was silently truncated or summarized.

the **bhrowser** is trusted: it drives a real browser, so it renders the page as a human would see it and returns what is genuinely there. a claim traced through the bhrowser is verifiable ground truth.

in a medical registry, a wrong citation is not a cosmetic defect — it can carry into guidance a human acts on. the bar is absolute.

## .the rule

| source type | acceptable for citations? |
|-------------|--------------------------|
| WebSearch snippets | **NO** — forbidden outright |
| WebFetch content | **NO** — forbidden outright |
| bhrowser content | **YES** — quote verbatim |
| PDF reads | **YES** — quote verbatim |
| direct API responses | **YES** — include response data |

## .pattern

```
1. use the bhrowser to reach the source
2. quote verbatim from what the bhrowser returned
3. cite the URL + the specific claim it supports
```

## .examples

### bad — webfetch or websearch

```
aspirin is contraindicated in children due to Reye's syndrome.
source: websearch snippet
```

### good — bhrowser verified

```
the FDA states aspirin "should not be used in children and teenagers
for viral infections" due to Reye's syndrome risk.
source: bhrowser read of https://www.fda.gov/...
verbatim: "Children and teenagers should not use aspirin ..."
```

## .enforcement

- claim without bhrowser verification = blocker
- websearch-only or webfetch-only citation = blocker

## .exception

- well-known facts (e.g. "the FDA regulates drug approval in the US")
- definitions from authoritative sources already in context
- internal repo references

## .see also

- `rule.require.seven-distinct-citations.[rule].md` — the count bar (>= 7 distinct sources per doc)
- `rule.require.recommendation-disclaimer.[rule].md` — guidance must carry its disclaimer
