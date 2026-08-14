import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const url = 'https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feline-leukemia-virus';
  const context = input.page.context();
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(3000);
    const text = await page.evaluate(() => document.body.innerText);
    return {
      url: page.url(),
      title: await page.title(),
      text: text.slice(0, 18000),
    };
  } finally {
    await page.close();
  }
};
