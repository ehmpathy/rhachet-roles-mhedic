import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const threads = [
    'https://www.reddit.com/r/AskVet/comments/189facn/limping_after_blood_draw_and_other_treatment/',
    'https://www.reddit.com/r/CATHELP/comments/1nxdp3o/my_cat_is_in_extreme_pain_after_blood_draws/',
    'https://www.reddit.com/r/CATHELP/comments/1pvgn1m/my_cat_started_limping_after_coming_back_this/',
  ];
  const out: { url: string; title: string; text: string }[] = [];
  for (const url of threads) {
    await input.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await input.page.waitForTimeout(3500);
    await input.page.evaluate(() => window.scrollBy(0, 3000));
    await input.page.waitForTimeout(1200);
    await input.page.evaluate(() => window.scrollBy(0, 3000));
    await input.page.waitForTimeout(1200);
    const text = await input.page.locator('main, shreddit-app').first().innerText().catch(() => '');
    out.push({ url, title: await input.page.title(), text: text.slice(0, 2400) });
  }
  return { threads: out };
};
