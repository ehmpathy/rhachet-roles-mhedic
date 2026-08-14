import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const targets = [
    // known abstract: calicivirus polyarthritis (limping)
    'https://pubmed.ncbi.nlm.nih.gov/35511315/',
    // the canonical post-vaccinal lameness mechanism in cats
    'https://pubmed.ncbi.nlm.nih.gov/?term=feline+calicivirus+limping+syndrome',
    // injection-site / post-vaccinal adverse reactions in cats
    'https://pubmed.ncbi.nlm.nih.gov/?term=cat+vaccine+injection+site+reaction+lameness',
  ];
  const out: { url: string; title: string; text: string }[] = [];
  for (const url of targets) {
    await input.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await input.page.waitForTimeout(1800);
    // pull the main abstract or the results list text
    const text = await input.page
      .locator('#abstract, #search-results, main')
      .first()
      .innerText()
      .catch(() => '');
    out.push({ url, title: await input.page.title(), text: text.slice(0, 1800) });
  }
  return { gathered: out };
};
