# citations cache

local, committed copies of the **primary sources** the neighboring briefs cite.

## .why

citations decay — URLs change, pages get revised, labels get superseded. the
`rule.require.research-to-briefs` brief calls this out directly ("citations decay (URLs change,
pages disappear)"). caching the source **as read** makes every quote reproducible and auditable
even after the live page moves.

this folder is a **demo** of that discipline: cache the source you cited, next to the brief that
cites it, in a committed (non-`.cache`, non-gitignored) path.

## .how it was captured

each file was read through the **bhrowser** (a real browser), never WebFetch/WebSearch, per
`rule.require.bhrowser-citations`. the `.html` is the rendered page source; the `.txt` is the
readable text extraction.

## .contents

| file | source | what it is | retrieved |
|------|--------|-----------|-----------|
| `onsior-tablets.fda-dailymed.2026-08-08.{html,txt}` | https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=922d3235-085e-454f-9535-44ef4bca12f4 | **official FDA-approved label (SPL / package insert)** for ONSIOR (robenacoxib) 6 mg Tablets for Cats, sponsor Elanco US Inc., application NADA 141-320, label revised 5/2026 | 2026-08-08 |

## .naming

`<product>.<source>.<YYYY-MM-DD>.<ext>` — product slug, source slug, retrieval date, extension.

## .note

a cached copy is a **snapshot in time**. for anything a human will act on, re-verify against the
live source — the label can be revised. this cache proves *what the source said when quoted*, not
*what it says now*.
