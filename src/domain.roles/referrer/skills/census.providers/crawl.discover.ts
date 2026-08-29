import type { Page } from 'playwright';

/**
 * .what = discover a site's real URLs the HONEST way — by BOTH (a) the site's own
 *         sitemap(s), reached via robots.txt + the well-known /sitemap.xml, and
 *         (b) a depth-1 crawl of the homepage's same-origin anchor links.
 *
 * .why  = the alternative — guess a fixed list of path suffixes and hit each blind
 *         (spray-and-pray) — fabricates URLs the site may never have, wastes
 *         requests on 404s, and misses the real pages whose paths you did not
 *         guess. a site tells you its true URL set two ways: its sitemap (the
 *         author's own index) and its own links (what a human would click). use
 *         both; never guess. see rule.forbid.spray-and-pray-urls.
 *
 * .the contract
 *   input  = { page, base } — an open page (for its browser context) + a site base url
 *   output = { origin, viaSitemap, viaCrawl, sitemapsSeen, all } — the discovered set
 *
 * .note = uses the context's APIRequestContext for robots.txt + sitemap fetches
 *         (raw http, no render), and a real page render only for the homepage crawl.
 */

const asOrigin = (base: string): string => {
  try {
    return new URL(base).origin;
  } catch {
    return base;
  }
};

export const discoverSiteUrls = async (input: {
  page: Page;
  base: string;
}): Promise<{
  origin: string;
  viaSitemap: string[];
  viaCrawl: string[];
  sitemapsSeen: string[];
  all: string[];
}> => {
  const origin = asOrigin(input.base);
  const req = input.page.context().request;

  // 1. robots.txt -> declared Sitemap: lines (the author's own pointer)
  const sitemapSeeds = new Set<string>();
  try {
    const robots = await req.get(origin + '/robots.txt', { timeout: 15000 });
    if (robots.ok()) {
      const txt = await robots.text();
      for (const line of txt.split(/\r?\n/)) {
        const m = line.match(/^\s*sitemap:\s*(\S+)/i);
        if (m?.[1]) sitemapSeeds.add(m[1].trim());
      }
    }
  } catch {
    // robots absent or unreachable — fall through to well-known locations
  }
  // well-known default locations, added regardless
  sitemapSeeds.add(origin + '/sitemap.xml');
  sitemapSeeds.add(origin + '/sitemap_index.xml');

  // 2. fetch each sitemap; follow ONE level of sitemap-index -> child sitemaps
  const viaSitemap = new Set<string>();
  const sitemapsSeen = new Set<string>();
  const queue = [...sitemapSeeds];
  let guard = 0;
  while (queue.length && guard < 30) {
    guard++;
    const sm = queue.shift();
    if (!sm || sitemapsSeen.has(sm)) continue;
    sitemapsSeen.add(sm);
    try {
      const res = await req.get(sm, { timeout: 15000 });
      if (!res.ok()) continue;
      const xml = await res.text();
      const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)]
        .map((m) => m[1])
        .filter((loc): loc is string => !!loc);
      const isIndex = /<sitemapindex/i.test(xml);
      for (const loc of locs) {
        if (isIndex && /\.xml(\?|$)/i.test(loc)) {
          if (!sitemapsSeen.has(loc)) queue.push(loc);
        } else if (loc.startsWith('http')) {
          viaSitemap.add(loc.split('#')[0] ?? loc);
        }
      }
    } catch {
      // a single bad sitemap does not abort the rest
    }
  }

  // 3. depth-1 crawl of the homepage's same-origin anchor links
  const viaCrawl = new Set<string>();
  try {
    const page = await input.page.context().newPage();
    await page.goto(input.base, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });
    await page.waitForTimeout(1500);
    const hrefs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href]')).map(
        (a) => (a as HTMLAnchorElement).href || '',
      ),
    );
    await page.close();
    for (const h of hrefs) {
      if (h.startsWith(origin)) viaCrawl.add(h.split('#')[0] ?? h);
    }
  } catch {
    // homepage unreachable — sitemap set still stands on its own
  }

  const all = [...new Set([...viaSitemap, ...viaCrawl])];
  return {
    origin,
    viaSitemap: [...viaSitemap],
    viaCrawl: [...viaCrawl],
    sitemapsSeen: [...sitemapsSeen],
    all,
  };
};
