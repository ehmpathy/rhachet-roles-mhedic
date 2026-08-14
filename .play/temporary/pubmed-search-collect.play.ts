import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const queries = [
    'feline vaccine adverse events',
    'feline calicivirus limping syndrome',
    'robenacoxib cat',
    'feline injection site sarcoma',
    'cat post vaccinal fever',
    'feline hepatic lipidosis anorexia',
    'meloxicam cat safety',
    'cat vaccination lameness',
    'feline polyarthritis calicivirus',
    'NSAID cat analgesia postoperative',
  ];
  const out: { query: string; results: { title: string; pmid: string }[] }[] = [];
  for (const q of queries) {
    const url = 'https://pubmed.ncbi.nlm.nih.gov/?term=' + encodeURIComponent(q);
    try {
      await input.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    } catch {}
    await input.page.waitForTimeout(2500);
    let results: { title: string; pmid: string }[] = [];
    try {
      results = await input.page.evaluate(() => {
        const items: { title: string; pmid: string }[] = [];
        const anchors = document.querySelectorAll('a.docsum-title');
        anchors.forEach((a) => {
          const href = (a as HTMLAnchorElement).getAttribute('href') || '';
          const m = href.match(/\/(\d{6,9})\/?/);
          if (!m) return;
          const title = (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 220);
          items.push({ title, pmid: m[1] });
        });
        return items.slice(0, 10);
      });
    } catch {}
    out.push({ query: q, results });
  }
  return { out };
};
