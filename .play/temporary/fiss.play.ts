import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  // PubMed: feline osteoarthritis / degenerative joint disease prevalence radiographic
  const url =
    'https://pubmed.ncbi.nlm.nih.gov/?term=feline+degenerative+joint+disease+prevalence+radiographic';
  await input.page.goto(url, { waitUntil: 'domcontentloaded' });

  await input.page.waitForTimeout(2500);

  return { title: await input.page.title(), url: input.page.url() };
};
