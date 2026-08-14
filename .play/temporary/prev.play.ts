import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  // PubMed abstract: prevention of FISS - vaccine recommendations (Kass 2018)
  const url = 'https://pubmed.ncbi.nlm.nih.gov/29217316/';
  await input.page.goto(url, { waitUntil: 'domcontentloaded' });

  await input.page.waitForTimeout(2500);

  return { title: await input.page.title(), url: input.page.url() };
};
