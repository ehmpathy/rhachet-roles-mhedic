import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  const pmids = [
    // vaccine adverse events
    '37632050', '11446100', '39965621', '20471524', '34789596', '33485645',
    // calicivirus limp / polyarthritis
    '37889723', '35511315', '9228680', '8191001', '1328120', '17296159',
    // robenacoxib
    '38587872', '21736587', '19161453', '35460083', '34196973', '38235901', '37494365', '39540680',
    // injection-site sarcoma
    '28005492', '26101312', '20510635',
    // hepatic lipidosis / anorexia
    '29478399', '28978714', '25146662', '10668812',
    // meloxicam
    '18440263', '22942440', '32594827', '16267058', '30033841',
    // lameness in kittens after vaccination (independent reports)
    '2609493', '2309425', '2154073', '2309398',
    // NSAID postop
    '11072912', '9762758', '26457818',
    // musculoskeletal lameness differential
    '22247324',
  ];
  const out: { pmid: string; title: string; abstract: string }[] = [];
  for (const pmid of pmids) {
    const url = 'https://pubmed.ncbi.nlm.nih.gov/' + pmid + '/';
    try {
      await input.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 40000 });
    } catch {}
    await input.page.waitForTimeout(1200);
    let rec = { title: '', abstract: '' };
    try {
      rec = await input.page.evaluate(() => {
        const t = document.querySelector('h1.heading-title');
        const a = document.querySelector('#abstract, .abstract-content');
        return {
          title: (t?.textContent || '').trim().replace(/\s+/g, ' '),
          abstract: (a?.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 900),
        };
      });
    } catch {}
    out.push({ pmid, title: rec.title, abstract: rec.abstract });
  }
  return { out };
};
