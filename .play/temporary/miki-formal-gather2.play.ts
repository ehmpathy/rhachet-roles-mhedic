import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const targets = [
    'https://pubmed.ncbi.nlm.nih.gov/?term=feline+vaccine+adverse+events+lethargy',
    'https://pubmed.ncbi.nlm.nih.gov/?term=cat+vaccination+adverse+reactions+prevalence',
    'https://pubmed.ncbi.nlm.nih.gov/?term=venipuncture+complications+hematoma+cat',
  ];
  const out: { url: string; title: string; text: string }[] = [];
  for (const url of targets) {
    await input.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await input.page.waitForTimeout(1800);
    const text = await input.page
      .locator('#search-results, main')
      .first()
      .innerText()
      .catch(() => '');
    out.push({ url, title: await input.page.title(), text: text.slice(0, 1700) });
  }
  return { gathered: out };
};
