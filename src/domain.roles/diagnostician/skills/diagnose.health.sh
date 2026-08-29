#!/usr/bin/env bash
######################################################################
# .what = stamp the formal superposition-diagnosis route (stones + guards)
#
# .why  = turns the diagnosis method into a reusable, guarded route:
#         a 9-phase superposition workflow (intake -> scenario.enumeration
#         -> scenario.disentangle -> elimination.via.assay -> rerank.via.redteam
#         -> scenario.superposition -> acuity.via.envelope -> diagnosis.superposition
#         -> treatment.superposition). read the philosophy beside this skill:
#         diagnose.health/philosophy.diagnosis-superposition-route.[philosophy].md
#
# usage:
#   rhx diagnose.health init --at .demo/case=<slug>  # stamp + bind the route at a dir
#   rhx diagnose.health init                         # stamp at .route/v<DATE>.diagnose.health
#   rhx diagnose.health --help
#
# guarantee:
#   ✔ init: stamps only .stone.md + .guard files (no .sh copied into the route)
#   ✔ creates an accrue/ dir (per rule.require.accrue-research)
#   ✔ binds the route to the current branch
#   ✔ fail-fast on any error
######################################################################

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# shellcheck source=diagnose.health/output.sh
source "$SKILL_DIR/diagnose.health/output.sh"

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
      echo "usage: rhx diagnose.health <subcommand> [--at <dir>]"
      echo ""
      echo "subcommands:"
      echo "  init    stamp the superposition-diagnosis route and bind it"
      echo ""
      echo "options:"
      echo "  --at <dir>   where to stamp the route (default: .route/v<DATE>.diagnose.health)"
      echo ""
      echo "examples:"
      echo "  rhx diagnose.health init --at .demo/case=miki-vet-2026-08-07"
      echo "  rhx diagnose.health init"
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
        echo "   run \`rhx diagnose.health --help\` for usage" >&2
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
  echo "   run \`rhx diagnose.health --help\` for usage" >&2
  exit 2 # constraint: caller must fix the invocation (rule.require.exit-code-semantics)
fi

case "$SUBCOMMAND" in
  init)
    # shellcheck source=diagnose.health/init.sh
    source "$SKILL_DIR/diagnose.health/init.sh"
    ;;
  *)
    # all error context on stderr so a caller can capture it as one stream
    print_error "unknown subcommand: $SUBCOMMAND"
    echo "" >&2
    echo "   valid subcommands: init" >&2
    exit 2 # constraint: caller must fix the invocation (rule.require.exit-code-semantics)
    ;;
esac
