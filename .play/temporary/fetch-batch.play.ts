import type { Browser, Page } from 'playwright';

const urls: string[] = [
  'https://europepmc.org/article/MED/33937377',
  'https://europepmc.org/article/MED/23966005',
  'https://europepmc.org/article/MED/19481376',
  'https://europepmc.org/article/MED/30947707',
  'https://europepmc.org/article/MED/41295545',
  'https://europepmc.org/article/MED/41372388',
  'https://europepmc.org/article/MED/41441643',
];

export const action = async (input: { page: Page; browser: Browser }) => {
  const context = input.page.context();
  const out: Array<{ url: string; title: string; ok: boolean; text: string }> = [];
  for (const url of urls) {
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
      await page.waitForTimeout(3500);
      const text = await page.evaluate(() => document.body.innerText);
      out.push({ url: page.url(), title: await page.title(), ok: true, text: text.slice(0, 3200) });
    } catch (e) {
      out.push({ url, title: '', ok: false, text: String(e).slice(0, 150) });
    } finally {
      await page.close();
    }
  }
  return out;
};
