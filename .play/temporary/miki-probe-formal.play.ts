import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  // probe reachability of trusted formal sources from this egress
  const targets = [
    'https://www.ncbi.nlm.nih.gov/pmc/?term=cat+lameness+vaccination',
    'https://vcahospitals.com/know-your-pet/vaccine-reactions-in-cats',
    'https://pubmed.ncbi.nlm.nih.gov/?term=feline+post-vaccinal+lameness',
  ];
  const out: { url: string; title: string; finalUrl: string }[] = [];
  for (const url of targets) {
    try {
      await input.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await input.page.waitForTimeout(2000);
      out.push({ url, title: await input.page.title(), finalUrl: input.page.url() });
    } catch (e) {
      out.push({ url, title: `ERROR: ${(e as Error).message}`, finalUrl: input.page.url() });
    }
  }
  return { probes: out };
};
