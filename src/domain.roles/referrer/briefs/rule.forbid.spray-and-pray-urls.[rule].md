# rule.forbid.spray-and-pray-urls

## .what

when you need to find a page on a site (an insurance page, a contact page, a book
page), you must **discover the site's real URLs** — never guess. discovery is two
sources, used **together**:

1. **the sitemap** — reached via `robots.txt` (its `Sitemap:` lines) and the
   well-known `/sitemap.xml` / `/sitemap_index.xml`, with one level of
   sitemap-index follow. this is the author's own index of every real page.
2. **a crawl** — a depth-1 read of the homepage's same-origin anchor links. this is
   what a human would click.

it is **forbidden** to hit a fixed list of guessed path suffixes blind
(`/insurance/`, `/patients/`, `/faq/`, …) and hope one resolves. that is
spray-and-pray.

## .why

- **spray-and-pray fabricates URLs the site may not have** — every guess that 404s
  is a wasted request, and a 404 that soft-renders a homepage can be mis-read as a
  real page.
- **it misses the real pages whose paths you did not guess** — a practice may keep
  its carrier list at `/patient-resources/insurance-and-billing/`, a path no fixed
  suffix list would contain. the sitemap has it; the guess never will.
- **the site already tells you its truth two ways** — its sitemap (the author's
  index) and its own links (what it invites a human to click). honest discovery
  reads both; a guess ignores both.
- **both matter** — a sitemap can be stale or absent; a homepage crawl can miss deep
  pages a nav does not surface. used together they cover each other.

## .how

- reach for the shared discovery core (`crawl.discover` → `discoverSiteUrls`), which
  returns `{ viaSitemap, viaCrawl, all, sitemapsSeen }`.
- select your targets by a **filter over the discovered set** by path intent
  (e.g. `/insur|coverage|financ|patient|resource/`), not by a guessed suffix.
- if BOTH sitemap and crawl come back empty, that is a result to record (the site
  is unreachable or truly flat), not a licence to start a suffix guess.

## .the test

"did every URL i fetched come from the site's own sitemap or its own links?"

- yes → honest discovery
- no (a guessed suffix) → spray-and-pray; **blocker**

## .examples

### 👎 bad — a guessed suffix list, hit blind

```ts
const CANDIDATE_PATHS = ['/insurance/', '/patients/', '/faq/'];
for (const p of CANDIDATE_PATHS) await page.goto(origin + p); // fabricated urls
```

### 👍 good — discover, then filter

```ts
const d = await discoverSiteUrls({ page, base });         // sitemap + crawl
const targets = d.all.filter((u) => /insur|coverage|patient/.test(u));
for (const u of targets) await page.goto(u);              // only real pages
```

## .enforcement

- a fetch of a guessed path suffix, where the path did not come from the site's
  sitemap or a crawl of its own links = **blocker**
- a discovery that uses only ONE of sitemap / crawl when both were available =
  **nitpick** (use both)

## .see also

- `crawl.discover` — the shared discovery core (sitemap + homepage crawl)
- `rule.require.escalate-captcha-to-human` — the true-tell wall rule that pairs with
  honest reads (an empty discovery is recorded, never escalated)
