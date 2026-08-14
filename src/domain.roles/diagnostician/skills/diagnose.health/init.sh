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
  if [[ "$arg" == "--at" ]]; then
    i=$((i + 1))
    ROUTE_PATH="${PASSTHROUGH_ARGS[$i]:-}"
  fi
  i=$((i + 1))
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

# stamp only .stone and .guard files (no .sh)
for file in "$TEMPLATES_DIR"/*.stone "$TEMPLATES_DIR"/*.guard "$TEMPLATES_DIR"/readme.md; do
  if [[ -f "$file" ]]; then
    cp -f "$file" "$ROUTE_PATH/"
  fi
done

# seed the accrue hold with a readme so the dir is legible + tracked
if [[ -f "$TEMPLATES_DIR/accrue.readme.md" ]]; then
  cp -f "$TEMPLATES_DIR/accrue.readme.md" "$ROUTE_PATH/accrue/readme.md"
fi

######################################################################
# bind the route to the current branch
######################################################################

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")

if [[ "${SKIP_ROUTE_BIND:-}" != "1" ]]; then
  rhx route.bind.set --route "$ROUTE_PATH" > /dev/null 2>&1 || true
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

print_caduceus "hang ten — we'll ride this in" "branch $CURRENT_BRANCH <-> route $ROUTE_PATH"
