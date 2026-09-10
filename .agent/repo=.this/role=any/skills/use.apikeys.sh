#!/usr/bin/env bash
######################################################################
# .what = export the api keys a peer-review brain needs, into this shell
#
# .why  = the review guards on this repo's routes invoke
#           `. use.apikeys.sh && rhx review ...`
#         so that `rhx review --brain <provider>/...` finds its provider
#         key in the environment. without it, every peer-review lane
#         halts as a `malfunction` rather than a verdict, and the stone
#         cannot pass on a review that never ran.
#
# .why sourced, never executed = it EXPORTS into the caller's shell.
#         run as a subprocess, the exports die with the subprocess and
#         the caller sees no keys — a silent no-op that looks like
#         success. the guard's own `. ` prefix carries real weight.
#
# usage:
#   . .agent/repo=.this/role=any/skills/use.apikeys.sh && rhx review ...
#   . .agent/repo=.this/role=any/skills/use.apikeys.sh --env test
#
# options:
#   --env <env>      target env  (default: test)
#   --owner <owner>  keyrack owner identity (default: ehmpath)
#
# guarantee:
#   - unlocks the keyrack for the env, then evals its export statements
#   - fails LOUD with the exact command a human must run, never silently
#   - safe to source twice; keyrack unlock is idempotent
######################################################################

# .note = no `set -e` here. this file is SOURCED, so `set -e` would arm
#         exit-on-error in the CALLER's shell and kill the guard on the
#         next unrelated non-zero. errors are checked explicitly instead.

__apikeys_env="test"
__apikeys_owner="ehmpath"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --env)   __apikeys_env="$2";   shift 2 ;;
    --owner) __apikeys_owner="$2"; shift 2 ;;
    --for)   __apikeys_owner="$2"; shift 2 ;;
    *)       shift ;;
  esac
done

# unlock is idempotent, and cheap when the daemon already holds the keys
if ! rhx keyrack unlock --owner "$__apikeys_owner" --env "$__apikeys_env" >/dev/null 2>&1; then
  echo "🛑 use.apikeys: could not unlock keyrack" >&2
  echo "   owner = $__apikeys_owner   env = $__apikeys_env" >&2
  echo "   fix: run this yourself, then retry —" >&2
  echo "     rhx keyrack unlock --owner $__apikeys_owner --env $__apikeys_env" >&2
  return 1 2>/dev/null || exit 1
fi

# `keyrack source` emits `export KEY=...` lines for shell eval.
# --lenient so one absent provider key does not deny every other one.
__apikeys_exports="$(rhx keyrack source --owner "$__apikeys_owner" --env "$__apikeys_env" --lenient 2>/dev/null)"

if [[ -z "$__apikeys_exports" ]]; then
  echo "🛑 use.apikeys: keyrack returned no export statements" >&2
  echo "   owner = $__apikeys_owner   env = $__apikeys_env" >&2
  echo "   why: the keys are configured but not granted to this host, or they expired" >&2
  echo "   fix: check what is held, then unlock —" >&2
  echo "     rhx keyrack status --owner $__apikeys_owner" >&2
  echo "     rhx keyrack unlock --owner $__apikeys_owner --env $__apikeys_env" >&2
  unset __apikeys_exports __apikeys_env __apikeys_owner
  return 1 2>/dev/null || exit 1
fi

eval "$__apikeys_exports"

unset __apikeys_exports __apikeys_env __apikeys_owner
