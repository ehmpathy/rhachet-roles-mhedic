import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const queries = [
    'feline vaccine associated adverse events lameness',
    'feline calicivirus limping syndrome',
    'robenacoxib cat safety NSAID',
    'feline injection site sarcoma vaccine',
    'cat post vaccinal fever lethargy',
    'feline hepatic lipidosis anorexia',
    'meloxicam cat renal safety',
    'vaccine injection site reaction cat myositis',
  ];
  const out: { query: string; results: { title: string; url: string }[] }[] = [];
  for (const q of queries) {
    const url = 'https://pmc.ncbi.nlm.nih.gov/?term=' + encodeURIComponent(q);
    try {
      await input.page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    } catch {
      // ignore navigation churn
    }
    await input.page.waitForTimeout(4000);
    let results: { title: string; url: string }[] = [];
    try {
      results = await input.page.evaluate(() => {
        const items: { title: string; url: string }[] = [];
        const anchors = document.querySelectorAll('a[href*="/articles/PMC"]');
        const seen = new Set<string>();
        anchors.forEach((a) => {
          const href = (a as HTMLAnchorElement).href;
          const m = href.match(/PMC\d+/);
          if (!m) return;
          if (seen.has(m[0])) return;
          seen.add(m[0]);
          const title = (a.textContent || '').trim().slice(0, 200);
          if (title.length < 8) return;
          items.push({ title, url: 'https://pmc.ncbi.nlm.nih.gov/articles/' + m[0] + '/' });
        });
        return items.slice(0, 8);
      });
    } catch {
      results = [];
    }
    out.push({ query: q, results });
  }
  return { out };
};
