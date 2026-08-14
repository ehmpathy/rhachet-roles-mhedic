import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const targets = [
    'https://pubmed.ncbi.nlm.nih.gov/17605670/',
    'https://pubmed.ncbi.nlm.nih.gov/37889723/',
  ];
  const out: { url: string; title: string; text: string }[] = [];
  for (const url of targets) {
    await input.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await input.page.waitForTimeout(1800);
    const text = await input.page.locator('#abstract, main').first().innerText().catch(() => '');
    out.push({ url, title: await input.page.title(), text: text.slice(0, 2200) });
  }
  return { gathered: out };
};
