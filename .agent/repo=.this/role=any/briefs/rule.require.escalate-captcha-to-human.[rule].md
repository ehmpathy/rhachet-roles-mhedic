# rule.require.escalate-captcha-to-human

## .what

when the bhrowser hits a **captcha, bot-wall, or gated results page** amid a research read, do NOT
silently fail, guess, or fall back to WebSearch/WebFetch. **pause and ask the human to answer the
challenge** in the live headful session, then resume the read once they hand control back.

## .why

- a captcha means the source is **reachable but gated** — the data is there; only a human check
  stands between us and a real cited read
- the easy fallbacks are all forbidden or harmful:
  - WebSearch / WebFetch as a substitute violates `rule.require.bhrowser-citations`
  - an inference from a registry, saved as if the own-site was searched, produces the exact
    registry-only **UNPROVEN blocker** the access-coverage review exists to catch
  - a silent empty result quietly drops a provider from proof
- the bhrowser runs **headful** (`rule.require.bhrowser-headful`), so a human at the session can
  answer the captcha in seconds and let the automation continue — the cheapest possible unblock

## .only escalate on a TRUE POSITIVE — never on absence

escalation pulls the human, so it demands a **positive, deterministic tell that a challenge is
actually on the page**. absence of results is NOT such a tell. a page can be empty for many benign
reasons (a slow render, a genuinely thin result set, a selector that missed) unrelated to any wall.
to escalate on absence is to cry wolf — it pulls the human for a captcha that never surfaced.
**do not escalate on a low-confidence signal.**

### the true tells (a challenge IS present)

each is a positive observation of the challenge itself:

- an **interstitial text marker**: "verify you are human", "unusual traffic", "are you a robot",
  a Cloudflare browser-check, "enable javascript and cookies to continue"
- a **challenge widget in the DOM**: an hCaptcha / reCAPTCHA iframe, `#challenge-form`,
  `.cf-challenge`, `#px-captcha`, a `[data-sitekey]` element
- a **challenge host / path**: a redirect to `/sorry/`, `/challenge/`, `/cdn-cgi/challenge-platform/`
- a **hard block status**: a 403 / 429, especially after prior reads on the same host succeeded

### NOT a tell (do not escalate)

- a search page with **no result links** — this is low-confidence; re-read, widen the selector, or
  try another engine BEFORE you ever consider a human. treat empty as *empty*, not *walled*.
- a slow or blank first paint — wait and re-read
- a single missing field on an otherwise-rendered page — that is a gap, not a wall

if you cannot point to a **true tell** above, you were not walled. do not surface a captcha ask.

## .the escalation (what to do)

1. **stop** — do not re-loop the same walled query, and do not switch to WebSearch/WebFetch
2. **KEEP THE WALLED TAB OPEN** — never `page.close()` a tab that may show a captcha/challenge. a
   probe that opens then closes the tab in a `finally` block leaves the human no surface to answer
   on. the human can only solve a challenge on a tab still open, so the handoff IS the open tab.
3. **surface it to the human**, state: the exact URL/query that is gated, the session name, and
   the **true tell** you saw (name the widget, interstitial text, host/path, or status code — an
   empty result is not a valid tell to cite here)
4. **ask the human to answer the captcha** in the open headful tab, then say "done"
5. **resume** the read from where it stalled once they hand control back
6. if the human declines or cannot, record the field as an explicit **gap** (never a guess), and
   move on to sources that are not walled

## .the tab-open discipline (a real defect to avoid)

the common probe shape opens a work-tab and closes it in `finally { await page.close() }` so tabs
do not pile up. that is correct for a read that SUCCEEDS. but on a wall it is a bug: it destroys the
exact surface the human needs. so:

- a probe that may hit a wall must **leave the tab open** when the wall is detected (or leave every
  work-tab open and let the human close them after)
- pair the open tab with the surfaced ask, so the human sees both the tab and why it is there
- a separate "open-tabs" probe that navigates each gated query into its own tab and returns without
  a close on any is the clean handoff pattern

## .forbidden responses to a wall

- ❌ fall back to WebSearch / WebFetch to get the fact anyway
- ❌ infer the fact from a registry/directory and record it as if the own-site was searched
- ❌ mark a provider/claim PROVEN without the real read the wall blocked
- ❌ silently retry the same engine in a loop until budget is gone

## .enforcement

- a WebSearch/WebFetch fact substituted after a bhrowser wall = **blocker**
- a registry-inferred value recorded as a salespage read after a wall = **blocker**
- a walled read abandoned silently (no human escalation, no explicit gap) = **blocker**
- a human escalation raised with **no true tell** (an empty-results guess, a slow paint) = **blocker** —
  this cries wolf and burns the human's trust; re-read or try another route instead

## .see also

- `howto.escalate-captcha-headful-then-human.[lesson].md` — the step-by-step unblock flow
- `howto.prefer-headful-for-research.[lesson].md` — why research runs headful
- `rule.require.bhrowser-headful.[rule].md` — the headful mandate this leans on
- `rule.require.bhrowser-citations.[rule].md` — why WebSearch/WebFetch is never the fallback
- `rule.require.access-coverage-review.[rule].md` — the review that fails a registry-only inference
