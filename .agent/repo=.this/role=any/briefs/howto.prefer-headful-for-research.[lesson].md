# howto: prefer headful up-front for research-heavy gathers

## .what

when a task needs the bhrowser to read **many** pages (a citation gather, a multi-source
research brief), **start the browser in HEADFUL mode from the very first page** — do not wait for
a bot patrol to block you first.

```sh
rhx browser.start --mode HEADFUL         # the default for research-heavy work
```

this is the **proactive** companion to `howto.escalate-captcha-headful-then-human.[lesson].md`.
that brief is the *reactive* escalation (headless → hit a wall → switch to headful). this brief
says: for a known multi-page gather, **skip the reactive round-trip and open headful up-front.**

## .why

- a **headless / datacenter** browser is the worst-case fingerprint — reddit, google, cloudflare,
  and many publisher/CDN edges flag it on sight and serve a wall, a captcha, or a silent 404/empty
  render. every one of those is a wasted fetch.
- headful presents a real fingerprint, so **most bot patrols never trigger in the first place.**
- on a big gather, the cost of the reactive loop compounds: each blocked page is a fetch, a
  snapshot to diagnose the wall, an edit, and a re-fetch. the headful cost, paid once up-front,
  avoids all of that.

## .the rule of thumb

| situation | mode |
|-----------|------|
| one quick page you control | headless is fine |
| a citation gather / research brief (many pages, mixed domains) | **headful up-front** |
| already blocked in headless | escalate per the reactive brief |

## .companion tip — isolate your page in a shared session

the bhrowser session is shared; another actor (or a leftover background play) can navigate
**tab 0** between your calls, so your `goto` result gets overwritten by an unrelated page. make the
playbook open its **own** page and close it after, so the read is yours alone:

```ts
export const action = async (input: { page: Page; browser: Browser }) => {
  const context = input.page.context();
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(3000);
    return { url: page.url(), title: await page.title(),
             text: (await page.evaluate(() => document.body.innerText)).slice(0, 18000) };
  } finally {
    await page.close();
  }
};
```

## .caveat

- headful needs a display available to the process. with no display and no human reachable,
  headless is the only option — then the reactive escalation brief applies.

## .see also

- `howto.escalate-captcha-headful-then-human.[lesson].md` — the reactive escalation (after a wall)
- `howto.cite-via-bhrowser.[lesson].md` — the citation-gather loop this speeds up
- `rule.require.bhrowser-citations.[rule].md` — why a real render matters, never a fabricated quote
