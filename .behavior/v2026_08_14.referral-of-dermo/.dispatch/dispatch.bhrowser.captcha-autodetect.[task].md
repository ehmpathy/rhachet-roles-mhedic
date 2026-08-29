# feat(snapshot): autodetect captcha/bot-wall + send up a deterministic detection signal

## .what

the bhrowser should **autodetect** captcha / bot-wall / challenge states, and **send up** a
structured, deterministic detection signal on every `browser.snapshot` and `browser.action` result
— so any consumer can branch on "this read was walled" without a bespoke heuristic.

proposed shape (a new field on the snapshot/action output):

```jsonc
"blocked": {
  "walled": true,
  "kind": "captcha" | "botwall" | "challenge" | "ratelimit",
  "tell": "cloudflare browser-check interstitial",   // the exact evidence
  "url": "https://example.com/cdn-cgi/challenge-platform/...",
  "detectors": ["dom.iframe.hcaptcha", "text.verify-you-are-human"]  // which rules fired
}
```

when not walled: `"blocked": { "walled": false }`.

## .why

consumers of the bhrowser (research + census skills) need a **deterministic** way to tell "walled"
apart from "genuinely empty". today each consumer re-invents a fragile heuristic — e.g. "the search
results page returned only the engine's own link" — which is non-deterministic, duplicated, and
silently wrong when the wall shape shifts. a walled read that reads as "empty" makes a skill record
a guess (an inferred value) instead of a human escalation. centralize detection in the bhrowser,
expose one signal, and every consumer branches the same way.

this is the browser-side partner of the consumer-side rule
`rule.require.escalate-captcha-to-human` (in rhachet-roles-mhedic): on `walled: true`, the consumer
pauses and asks the human to answer the challenge in the headful session, then resumes — never falls
back to WebSearch/WebFetch, never saves a guess.

## .the detection mechanisms to send up (maximize determinism)

detect via a union of deterministic rules, and report WHICH fired (so a human can audit + extend):

- **known challenge hosts / paths**: `/cdn-cgi/challenge-platform/`, `/sorry/`, `/challenge/`,
  `hcaptcha.com`, `recaptcha`, `perimeterx`, `datadome`, `arkoselabs`
- **interstitial text markers** (exact): "verify you are human", "unusual traffic",
  "are you a robot", cloudflare browser-check, "enable javascript and cookies to continue"
- **widget DOM presence**: `iframe[src*=recaptcha]`, `iframe[src*=hcaptcha]`, `#challenge-form`,
  `.cf-challenge`, `#px-captcha`, `[data-sitekey]`
- **HTTP status**: 403 / 429, especially after prior reads on the same host succeeded
- **empty-results heuristic** (lowest confidence, flagged as such): a search-results page whose
  only anchors are the engine's own chrome — report as `kind: "botwall"` with low confidence

each detector is a named, pure predicate over (url, status, dom, text), so detection is
reproducible: same page -> same `blocked` verdict, every run.

## .keep the walled tab OPEN (paired discipline)

on `walled: true`, the bhrowser must **not auto-close** the tab (nor let a playbook's `finally`
close it) — the human answers the challenge on that exact open tab. a closed tab is an impossible
handoff. so: when the `blocked` signal fires, the tab that holds the challenge stays open until the
human resolves it. a helper like `browser.action --keep-open-on-wall` (or a documented convention
that walled tabs are never reaped) makes this deterministic on the browser side.

## .done when

- `browser.snapshot` + `browser.action` results carry the `blocked` field on every call
- the field names the `kind`, the exact `tell`, the `url`, and the `detectors[]` that fired
- a walled tab is **left open** for the human, never auto-closed
- a headful human can read the signal, answer the challenge, and re-run to get `walled: false`
- a brief documents the detector set + how to add a new detector

## .see also

- consumer-side rule (rhachet-roles-mhedic): `rule.require.escalate-captcha-to-human.[rule].md`
- `howto.escalate-captcha-headful-then-human.[lesson].md`
- `rule.require.bhrowser-headful.[rule].md`
