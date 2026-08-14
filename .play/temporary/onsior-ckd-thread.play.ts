import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const url =
    'https://old.reddit.com/r/AskVet/comments/1sbhqey/is_onsior_safe_for_ckd_cats/';
  await input.page.goto(url, { waitUntil: 'domcontentloaded' });
  await input.page.waitForTimeout(2500);
  return { title: await input.page.title(), url: input.page.url() };
};
