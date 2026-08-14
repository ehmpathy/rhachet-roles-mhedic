import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  // PubMed abstract: gabapentin for feline musculoskeletal disease and trauma
  const url = 'https://pubmed.ncbi.nlm.nih.gov/23253881/';
  await input.page.goto(url, { waitUntil: 'domcontentloaded' });

  await input.page.waitForTimeout(2500);

  return { title: await input.page.title(), url: input.page.url() };
};
