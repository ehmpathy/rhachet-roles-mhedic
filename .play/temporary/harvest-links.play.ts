import type { Browser, Page } from 'playwright';

const searchUrls: string[] = [
  'https://europepmc.org/search?query=feline%20injection-site%20sarcoma',
  'https://europepmc.org/search?query=feline%20vaccine%20adverse%20reactions%20cats',
  'https://europepmc.org/search?query=post-vaccinal%20lameness%20cats%20calicivirus',
];

export const action = async (input: { page: Page; browser: Browser }) => {
  const context = input.page.context();
  const out: Array<{ search: string; links: string[] }> = [];
  for (const url of searchUrls) {
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
      await page.waitForTimeout(4000);
      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a'))
          .map((a) => (a as HTMLAnchorElement).href)
          .filter((h) => /europepmc\.org\/(article|abstract)\//.test(h))
          .slice(0, 12),
      );
      out.push({ search: url, links: Array.from(new Set(links)) });
    } catch (e) {
      out.push({ search: url, links: [String(e).slice(0, 150)] });
    } finally {
      await page.close();
    }
  }
  return out;
};
