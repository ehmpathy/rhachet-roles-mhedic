## liftup: honest site-URL discovery (sitemap + crawl) as a shared bhrowser skill

### .what

lift a small, proven capability into the playwright role so **every** bhrowser
consumer inherits it: discover a site's real URLs the honest way — from BOTH the
site's own sitemap(s) AND a depth-1 crawl of the homepage's same-origin links —
instead of a blind guess at path suffixes (spray-and-pray).

it is two artifacts: a **rule** (forbid spray-and-pray; require sitemap + crawl) and
a **skill** (the reusable discovery core + a standalone playbook).

### .why

built and battle-tested in `rhachet-roles-mhedic` (referrer census: find each
dermatology practice's accepted-insurance page). the first cut guessed a fixed
suffix list (`/insurance/`, `/patients/`, …) and hit each blind — it fabricated
404s and MISSED the real page (`/patient-resources/insurance-and-billing/`, a path
no guess list held). the sitemap had it. the rewrite reads sitemap + crawl and finds
the truth every time. this is a general browser concern, not a census one — hence
the liftup ask.

### .the rule (forbid spray-and-pray)

- forbid: a fetch of a guessed path suffix that did not come from the site's own
  sitemap or a crawl of its own links = **blocker**.
- require: discovery from BOTH sources together (sitemap can be stale/absent; a crawl
  can miss deep pages — together they cover each other). one-source-only = nitpick.
- the test: "did every URL i fetched come from the site's sitemap or its own links?"

### .the skill (discovery core)

signature: `discoverSiteUrls({ page, base }) -> { origin, viaSitemap, viaCrawl, sitemapsSeen, all }`

1. read `robots.txt` -> its `Sitemap:` lines; add the well-known `/sitemap.xml` +
   `/sitemap_index.xml`.
2. fetch each sitemap via the context's APIRequestContext (raw http, no render);
   follow ONE level of sitemap-index -> child sitemaps; collect every `<loc>`.
3. render the homepage; harvest same-origin anchor hrefs (depth-1 crawl).
4. return the deduped union. a consumer then selects targets by a FILTER over the
   discovered set, never by a guessed suffix.

reference source (mhedic, ready to port):
- `src/domain.roles/referrer/skills/census.providers/crawl.discover.ts` (core — the reusable
  `discoverSiteUrls`; this is the whole port target)
- `src/domain.roles/referrer/briefs/rule.forbid.spray-and-pray-urls.[rule].md` (rule)
- a demo playbook that drove it over a hardcoded roster lived at `crawl.site.play.ts`, since demoted
  to gitignored scratch (`.play/temporary/census-probes/`) because it baked in a use-case roster; the
  port should ship a GENERIC demo that takes `base` as an input param, not a hardcoded list

### .the ask

1. port `discoverSiteUrls` into the playwright role as a shared skill (its natural
   home; in bhrowser it takes `base` as a real input param, not an inline list).
2. add the rule brief under the playwright role's briefs (a `discovery/` cluster
   alongside the extant diagnosis/spa briefs).
3. once lifted, mhedic imports it from the package and drops its local copy.

### .acceptance

- a playwright-role skill exposes `discoverSiteUrls` (or equivalent) that returns
  sitemap + crawl union.
- a `rule.forbid.spray-and-pray-urls` brief lives under the playwright role.
- a smoke run over any real site returns a non-empty `viaSitemap` OR `viaCrawl`.

### .origin

authored in `ehmpathy/rhachet-roles-mhedic`, branch `vlad/referral-of-dermo`.
