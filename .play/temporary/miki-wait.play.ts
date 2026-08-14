import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  // let any cloudflare js challenge attempt to clear
  await input.page.waitForTimeout(8000);
  return { title: await input.page.title(), url: input.page.url() };
};
