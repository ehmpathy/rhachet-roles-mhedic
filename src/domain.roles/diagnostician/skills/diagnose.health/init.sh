#!/usr/bin/env bash
######################################################################
# .what = init subcommand for the diagnose skill
#
# .why  = stamps the formal superposition-diagnosis route (stones + guards)
#         at a target dir, creates the accrue/ hold, and binds the route.
#         no .sh files are copied into the route.
#
# guarantee:
#   ✔ stamps only .stone.md + .guard files
#   ✔ creates accrue/ (per rule.require.accrue-research)
#   ✔ binds the route to the current branch
#   ✔ fail-fast on any error
######################################################################

# note: sourced by diagnose.sh — SKILL_DIR, output fns, PASSTHROUGH_ARGS available

######################################################################
# parse --at
######################################################################

ROUTE_PATH=""
i=0
while [[ $i -lt ${#PASSTHROUGH_ARGS[@]} ]]; do
  arg="${PASSTHROUGH_ARGS[$i]}"

  # --at <dir> is the only valid init option — collect it and advance past its value
  if [[ "$arg" == "--at" ]]; then
    i=$((i + 1))
    ROUTE_PATH="${PASSTHROUGH_ARGS[$i]:-}"
    # a valueless --at is a bad invocation — fail loud rather than silently fall back
    # to the dated default (the caller asked for a target and would lose it silently)
    if [[ -z "$ROUTE_PATH" ]]; then
      print_error "--at requires a directory value, e.g. --at .demo/case=<slug>"
      exit 2 # constraint: caller must supply the --at value (rule.require.exit-code-semantics)
    fi
    i=$((i + 1))
    continue
  fi

  # any other token is a bad invocation — fail fast rather than ignore it silently
  print_error "unknown option: $arg — the only init option is --at <dir>"
  exit 2 # constraint: caller must fix the invocation (rule.require.exit-code-semantics)
done

# default target: a dated route dir
if [[ -z "$ROUTE_PATH" ]]; then
  ISO_DATE=$(date +%Y_%m_%d)
  ROUTE_PATH=".route/v${ISO_DATE}.diagnose.health"
fi

TEMPLATES_DIR="$SKILL_DIR/diagnose.health/templates"

if [[ ! -d "$TEMPLATES_DIR" ]]; then
  print_error "templates dir not found: $TEMPLATES_DIR"
  exit 1
fi

######################################################################
# stamp the route
######################################################################

# findsert route + accrue dirs
mkdir -p "$ROUTE_PATH"
mkdir -p "$ROUTE_PATH/accrue"

# fail fast if the templates dir holds no stones — an unguarded glob would expand to a
# literal, copy zero stones, and still print success: a false green (rule.forbid.failhide)
shopt -s nullglob
stone_templates=("$TEMPLATES_DIR"/*.stone)
shopt -u nullglob
if [[ ${#stone_templates[@]} -eq 0 ]]; then
  print_error "no .stone templates found in $TEMPLATES_DIR — cannot stamp an empty route"
  exit 1 # malfunction: the skill's own templates are absent (rule.require.exit-code-semantics)
fi

# stamp only .stone and .guard files (no .sh).
# findsert, not overwrite: a re-stamp of an extant route must not clobber a .stone/.guard
# a person or agent edited between runs (idempotent stamp, same discipline as the accrue seed)
for file in "$TEMPLATES_DIR"/*.stone "$TEMPLATES_DIR"/*.guard "$TEMPLATES_DIR"/readme.md; do
  [[ -f "$file" ]] || continue
  target="$ROUTE_PATH/$(basename "$file")"
  [[ -f "$target" ]] && continue
  cp "$file" "$target"
done

# seed the accrue hold with a readme so the dir is legible + tracked.
# findsert, not overwrite: a re-stamp of an extant route must not clobber accrued
# research a person or agent appended to accrue/readme.md between runs (idempotent seed)
if [[ -f "$TEMPLATES_DIR/accrue.readme.md" && ! -f "$ROUTE_PATH/accrue/readme.md" ]]; then
  cp "$TEMPLATES_DIR/accrue.readme.md" "$ROUTE_PATH/accrue/readme.md"
fi

######################################################################
# bind the route to the current branch
######################################################################

# the footer states the bind outcome truthfully — git is read ONLY on the path where the bind
# actually ran (so the repo is a git repo and rev-parse is guaranteed). when the bind is
# skipped, no git is touched and no branch is fabricated (rule.forbid.failhide: never dress a
# skipped/failed read as a real value). the unbound message names the state in user terms and
# carries the one-line fix at footer prominence — no internal env-var name leaks to the human.
BIND_STATUS="route $ROUTE_PATH — stamped but NOT bound; bind it with: rhx route.bind.set --route $ROUTE_PATH"

# bind failure is surfaced loud AND fails the invocation (never swallowed to exit 0).
# the route is stamped and not lost — the error names the one-line fix to bind it later —
# but the non-zero exit tells any exit-code-driven caller the init did not fully complete.
if [[ "${SKIP_ROUTE_BIND:-}" != "1" ]]; then
  if ! rhx route.bind.set --route "$ROUTE_PATH" > /dev/null 2>&1; then
    print_error "route.bind.set failed — route stamped at $ROUTE_PATH but not bound; bind later with: rhx route.bind.set --route $ROUTE_PATH"
    exit 2 # constraint: caller must bind the stamped route later (rule.require.exit-code-semantics)
  fi
  # the bind succeeded, so this IS a git repo — a rev-parse failure now is a real inconsistency,
  # surfaced loud (git's error hits stderr) and failed, never masked by a placeholder
  if ! CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD); then
    print_error "route bound but the current branch could not be read — repo state is inconsistent"
    exit 1 # malfunction: bind claimed success yet git cannot name the branch (rule.forbid.failhide)
  fi
  BIND_STATUS="branch $CURRENT_BRANCH <-> route $ROUTE_PATH"
fi

######################################################################
# output
######################################################################

print_snake_header "radical — the way is paved"

print_tree_start "diagnose.health init"
print_tree_branch "route" "$ROUTE_PATH/ ✨"
print_tree_branch "accrue" "$ROUTE_PATH/accrue/ (reusable cited facts)"
print_tree_item "stamped"
for file in "$TEMPLATES_DIR"/*.stone; do
  [[ -f "$file" ]] || continue
  base="$(basename "$file")"
  print_created_leaf "$base"
done
print_created_leaf "(+ one .guard per stone)" "true"

print_caduceus "hang ten — we'll ride this in" "$BIND_STATUS"
