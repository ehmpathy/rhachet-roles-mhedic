# howto: keyrack in CI

## .what

keyrack automatically forwards environment variables that match key names.

## .why

- in CI, secrets are injected as env vars (e.g., `MY_API_KEY`)
- keyrack detects matched env vars and returns them
- no code changes needed between local dev and CI

## .how it works

```
local dev:
  rhx keyrack unlock --owner ehmpath --env test
    → credentials stored in OS secure vault
  rhx keyrack get --key ehmpathy.test.MY_API_KEY
    → returns secret from vault

CI:
  env var: MY_API_KEY=<secret>
  rhx keyrack get --key ehmpathy.test.MY_API_KEY
    → detects env var, returns it directly
```

## .the pattern

always use keyrack:

```bash
# correct: always go through keyrack
keyrack_json=$(rhx keyrack get --key ehmpathy.test.MY_API_KEY --json)
```

never check env vars directly:

```bash
# wrong: bypasses keyrack
if [[ -n "$MY_API_KEY" ]]; then
  # use env var directly
fi
```

## .key match rules

keyrack matches env vars by key name suffix:

| keyrack key | matched env var |
|-------------|-----------------|
| `ehmpathy.test.MY_API_KEY` | `MY_API_KEY` |

## .ci setup

in GitHub workflows, inject secrets as env vars:

```yaml
env:
  MY_API_KEY: ${{ secrets.MY_API_KEY }}
```

keyrack will detect and return them automatically.

## .see also

- howto.keyrack.[lesson].md - local usage
