#!/usr/bin/env bash
######################################################################
# .what = stamp the melanoma compiled-diagnosis route (stones + guards)
#
# .why  = turns the melanoma / pigmented-lesion assessment into a reusable,
#         guarded route: a 5-phase compiled workflow (intake -> score ->
#         redteam -> acuity -> output.two-layer). melanoma is a closed domain,
#         so the route applies a pre-cited decision procedure rather than
#         re-discovers one per case. read the philosophy beside this skill:
#         diagnose.melanoma/philosophy.diagnosis-melanoma-route.[philosophy].md
#
# usage:
#   rhx diagnose.melanoma init --at .demo/case=<slug>  # stamp + bind the route at a dir
#   rhx diagnose.melanoma init                         # stamp at .route/v<DATE>.diagnose.melanoma
#   rhx diagnose.melanoma --help
#
# guarantee:
#   ✔ init: stamps only .stone + .guard files (no .sh copied into the route)
#   ✔ creates an accrue/ dir (per rule.require.accrue-research)
#   ✔ binds the route to the current branch
#   ✔ fail-fast on any error
######################################################################

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# shellcheck source=diagnose.melanoma/output.sh
source "$SKILL_DIR/diagnose.melanoma/output.sh"

######################################################################
# parse arguments
######################################################################

SUBCOMMAND=""
PASSTHROUGH_ARGS=()

while [[ $# -gt 0 ]]; do
  case $1 in
    # rhachet passes these - ignore them
    --skill|--repo|--role)
      # guard the value shift — a flag with no value must not `shift 2` past the
      # end (raw "shift count out of range" under set -u); shift the value only if present
      shift
      [[ $# -gt 0 ]] && shift
      ;;
    --help|-h)
      echo "usage: rhx diagnose.melanoma <subcommand> [--at <dir>]"
      echo ""
      echo "subcommands:"
      echo "  init    stamp the melanoma compiled-diagnosis route and bind it"
      echo ""
      echo "options:"
      echo "  --at <dir>   where to stamp the route (default: .route/v<DATE>.diagnose.melanoma)"
      echo ""
      echo "examples:"
      echo "  rhx diagnose.melanoma init --at .demo/case=shoulder-mole-2026-08-14"
      echo "  rhx diagnose.melanoma init"
      echo ""
      echo "next:"
      echo "  the route emits 4.1.acuity.yield.md (onward-care kind + urgency)."
      echo "  seed the companion 'rhx refer.care' route's 0.seed.md from THAT file"
      echo "  (not the 5.1/5.2 reader layers) to find who to see and where."
      exit 0
      ;;
    init)
      SUBCOMMAND="$1"
      shift
      ;;
    *)
      # unknown token before a subcommand is a bad invocation — fail fast, no else branch
      if [[ -z "$SUBCOMMAND" ]]; then
        # all error context on stderr so a caller can capture it as one stream
        print_error "unknown subcommand: $1"
        echo "" >&2
        echo "   valid subcommands: init" >&2
        echo "" >&2
        echo "   run \`rhx diagnose.melanoma --help\` for usage" >&2
        exit 2 # constraint: caller must fix the invocation (rule.require.exit-code-semantics)
      fi

      # otherwise it is an arg for the subcommand — collect it
      PASSTHROUGH_ARGS+=("$1")
      shift
      ;;
  esac
done

######################################################################
# route to subcommand handler
######################################################################

if [[ -z "$SUBCOMMAND" ]]; then
  # all error context on stderr so a caller can capture it as one stream
  print_error "no subcommand specified"
  echo "" >&2
  echo "   valid subcommands: init" >&2
  echo "" >&2
  echo "   run \`rhx diagnose.melanoma --help\` for usage" >&2
  exit 2 # constraint: caller must fix the invocation (rule.require.exit-code-semantics)
fi

case "$SUBCOMMAND" in
  init)
    # shellcheck source=diagnose.melanoma/init.sh
    source "$SKILL_DIR/diagnose.melanoma/init.sh"
    ;;
  *)
    # all error context on stderr so a caller can capture it as one stream
    print_error "unknown subcommand: $SUBCOMMAND"
    echo "" >&2
    echo "   valid subcommands: init" >&2
    exit 2 # constraint: caller must fix the invocation (rule.require.exit-code-semantics)
    ;;
esac
