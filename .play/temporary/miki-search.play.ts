import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  // round-2: restraint-alone cohort
  const query = 'cat limping after being restrained at vet';
  const url = `https://www.reddit.com/search/?q=${encodeURIComponent(query)}&sort=relevance`;
  await input.page.goto(url, { waitUntil: 'domcontentloaded' });
  await input.page.waitForTimeout(4000);
  return { t: await input.page.title(), u: input.page.url() };
};
