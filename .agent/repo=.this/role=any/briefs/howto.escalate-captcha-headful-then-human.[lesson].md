# howto: escalate a captcha — headful first, then the human

## .what

when the bhrowser hits a captcha or an antibot wall mid-research, do **not** declare the
stone blocked and do **not** fabricate citations. **escalate**, in this order:

1. **reopen in HEADFUL mode** — `rhx browser.start --mode HEADFUL`. a headful browser presents a
   real fingerprint, and **most of the time headful alone defeats the captcha**.
2. **if the wall persists — wait for the human at the terminal.** they will solve the captcha in
   the open window. once solved, continue the gather from where it stalled.

## .why

- a **headless / datacenter** browser is the worst-case fingerprint — reddit, google,
  duckduckgo, and cloudflare all flag it on sight. headful flips the most important signal.
- an image captcha ("select all squares with a duck") is **built to be human-only** — the
  bhrowser cannot solve it, but the human at the terminal can, in seconds.
- so the block is almost never a true dead end. it is a two-rung escalation: **headful**, then
  **human**. only after both fail is a genuine `--as blocked` warranted.

## .the walls this defeats

| wall | what it looks like | headful helps? |
|------|--------------------|----------------|
| reddit | "You've been blocked by network security" | often yes |
| google | redirect to `/sorry/index` | often yes |
| duckduckgo | "bots use DuckDuckGo too" + image captcha | headful, else human solves |
| cloudflare | "Just a moment…" JS challenge | usually clears headful |

## .how

```sh
# 1. headful — the first escalation
rhx browser.start --mode HEADFUL
rhx browser.action --session default --play <your-search>.play.ts
rhx browser.snapshot.screen --session default --focused   # confirm: results, or still a wall?

# 2. still walled? the human is the second escalation.
#    leave the headful window open, tell the human exactly which url needs a captcha solved,
#    and wait. once they solve it, re-run the play and continue the gather.
```

## .the rule this replaces

previously the reflex was: captcha → `--as blocked`. that surrenders too early. the new reflex:

> captcha → **headful** → (if needed) **human at the terminal** → only then `--as blocked`.

a headless block is not a wall — it is a prompt to escalate.

## .caveat

- headful needs a display available to the process. if there is genuinely no display **and** no
  human reachable, that is the rare true block.
- never fabricate a citation to pass a citation guard — the escalation exists precisely so you
  never have to (`rule.require.bhrowser-citations`).

## .see also

- `.agent/repo=bhrowser/role=playwright/briefs/stealth/ref.antibot-escalation.md` — the bhrowser
  role's escalation reference
- `rule.require.bhrowser-citations` — why a real render matters, never a fabricated quote
