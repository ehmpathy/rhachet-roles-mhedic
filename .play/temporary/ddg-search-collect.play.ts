import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const queries = [
    'cat limping after vaccine forum',
    'cat limping after blood draw',
    'cat sore leg after vet visit',
    'kitten limping after vaccination',
    'cat lethargic not eating after vaccine',
    'onsior cat side effects appetite',
  ];
  const out: { query: string; results: { title: string; url: string }[] }[] = [];
  for (const q of queries) {
    const url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(q);
    try {
      await input.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
    } catch {}
    await input.page.waitForTimeout(2000);
    let results: { title: string; url: string }[] = [];
    try {
      results = await input.page.evaluate(() => {
        const items: { title: string; url: string }[] = [];
        const anchors = document.querySelectorAll('a.result__a, a.result__url, h2 a');
        const seen = new Set<string>();
        anchors.forEach((a) => {
          let href = (a as HTMLAnchorElement).href || '';
          const dec = href.match(/uddg=([^&]+)/);
          if (dec) {
            try { href = decodeURIComponent(dec[1]); } catch {}
          }
          if (!/^https?:\/\//.test(href)) return;
          if (seen.has(href)) return;
          seen.add(href);
          const title = (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 160);
          if (title.length < 6) return;
          items.push({ title, url: href });
        });
        return items.slice(0, 12);
      });
    } catch {}
    out.push({ query: q, results });
  }
  return { out };
};
