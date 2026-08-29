#!/usr/bin/env bash
######################################################################
# .what = stamp the care-referral route (stones + guards)
#
# .why  = turns the referral method into a reusable, guarded route:
#         a 6-phase workflow (intake.need -> venue.enumerate
#         -> clinician.find -> access.rank -> prepare
#         -> referral.yield). the referrer translates the
#         diagnostician's urgency into a venue and a walkable path
#         to real care — it does NOT re-judge acuity.
#
# usage:
#   rhx refer.care init --at .demo/case=<slug>  # stamp + bind the route at a dir
#   rhx refer.care init                         # stamp at .route/v<DATE>.refer.care
#   rhx refer.care --help
#
# guarantee:
#   ✔ init: stamps only .stone + .guard files (no .sh copied into the route)
#   ✔ creates an accrue/ dir (per rule.require.accrue-research)
#   ✔ binds the route to the current branch
#   ✔ fail-fast on any error
######################################################################

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# shellcheck source=refer.care/output.sh
source "$SKILL_DIR/refer.care/output.sh"

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
      echo "usage: rhx refer.care <subcommand> [--at <dir>] [--seed-from <path>]"
      echo ""
      echo "subcommands:"
      echo "  init    stamp the care-referral route and bind it"
      echo ""
      echo "options:"
      echo "  --at <dir>          where to stamp the route (default: .route/v<DATE>.refer.care)"
      echo "  --seed-from <path>  copy <path> into the route's 0.seed.md at stamp time"
      echo "                      (mechanizes the diagnose.melanoma -> refer.care hand-off)"
      echo ""
      echo "examples:"
      echo "  rhx refer.care init --at .demo/case=dermo-panama-2026-08-14"
      echo "  rhx refer.care init --at .demo/case=x --seed-from .demo/case=x-melanoma/4.1.acuity.yield.md"
      echo "  rhx refer.care init"
      echo ""
      echo "input:"
      echo "  seed this route's 0.seed.md from the companion 'rhx diagnose.melanoma'"
      echo "  route's 4.1.acuity.yield.md (the onward-care kind + urgency, as given)"
      echo "  — not the 5.1/5.2 reader layers. the referrer carries urgency, never re-grades it."
      echo "  pass --seed-from <path> to place it automatically, or hand-copy it yourself."
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
        echo "   run \`rhx refer.care --help\` for usage" >&2
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
  echo "   run \`rhx refer.care --help\` for usage" >&2
  exit 2 # constraint: caller must fix the invocation (rule.require.exit-code-semantics)
fi

case "$SUBCOMMAND" in
  init)
    # shellcheck source=refer.care/init.sh
    source "$SKILL_DIR/refer.care/init.sh"
    ;;
  *)
    # all error context on stderr so a caller can capture it as one stream
    print_error "unknown subcommand: $SUBCOMMAND"
    echo "" >&2
    echo "   valid subcommands: init" >&2
    exit 2 # constraint: caller must fix the invocation (rule.require.exit-code-semantics)
    ;;
esac
