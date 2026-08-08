# howto.cite-via-bhrowser

## .what

the concrete steps to gather a citation through the bhrowser, which is the **only** sanctioned source of citations in this repo.

see `rule.require.bhrowser-citations.[rule].md` for why WebFetch and WebSearch are forbidden.

## .prereqs

one-time, per machine:

```sh
npx rhachet roles link --repo bhrowser --role playwright
npx playwright install chromium
```

## .the loop

### 1. start the browser

```sh
rhx browser.start --mode HEADLESS
```

stays open across commands. stop it with `rhx browser.stop --session default`.

### 2. write a playbook

playbooks live in `.play/temporary/` (scratch) or `.play/permanent/` (reusable).

```ts
import type { Browser, Page } from 'playwright';

export const action = async (input: { page: Page; browser: Browser }) => {
  await input.page.goto('https://example.com', {
    waitUntil: 'domcontentloaded',
  });
  return { title: await input.page.title(), url: input.page.url() };
};
```

### 3. run it

```sh
rhx browser.action --play .play/temporary/my.play.ts
```

### 4. capture the page

```sh
rhx browser.describe                                   # find the tab url
rhx browser.snapshot.html --tab 0 --url '<url>'        # writes snapshot.html
```

### 5. quote verbatim

read the emitted `snapshot.html` and quote from it directly. cite the url plus the claim it supports.

## .two upstream defects (bhrowser@0.1.0)

| defect | symptom | status |
|--------|---------|--------|
| `--play` rejected any non-absolute path | `ERR_INVALID_MODULE_SPECIFIER` / "not a valid package name", surfaced as an `UnexpectedCodePathError` | patched locally in `node_modules`; reported as ehmpathy/rhachet-roles-bhrowser#5 |
| `--url` failed on a lone end slash | `URL verification failed` with `expected: "example.com"` vs `actual: "example.com/"` — strings that look like they match | patched locally in `node_modules`; reported as ehmpathy/rhachet-roles-bhrowser#5 |

⚠️ **the local patches live in `node_modules` and are wiped by any reinstall.** if either symptom returns after an `install`, the fix has not landed upstream yet — either re-apply, or fall back to the workarounds: pass an **absolute** `--play` path, and pass the `--url` exactly as `browser.describe` reports it.

error-message ergonomics tracked separately as ehmpathy/rhachet-roles-bhrowser#6.

## .see also

- `rule.require.bhrowser-citations.[rule].md` — the rule this enacts
- `rule.require.seven-distinct-citations.[rule].md` — >= 7 distinct sources per research doc
