import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  // use old.reddit search — lighter dom, easier to read verbatim
  const url =
    'https://old.reddit.com/search?q=onsior+cat&sort=relevance&t=all';
  await input.page.goto(url, { waitUntil: 'domcontentloaded' });

  // give results a beat to render
  await input.page.waitForTimeout(2500);

  return { title: await input.page.title(), url: input.page.url() };
};
