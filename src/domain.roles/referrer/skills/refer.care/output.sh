#!/usr/bin/env bash
######################################################################
# .what = snake vibes output for the refer skill
#
# .why  = consistent output format for route instantiation
#
# usage:
#   source output.sh
#   print_snake_header "let's route it"
#   print_tree_start "refer init"
#   print_tree_branch "route" ".demo/case=x/ ✨"
#   print_caduceus "the way is paved" "branch main <-> route .demo/case=x"
######################################################################

# print snake emoji + phrase (this repo's mascot = the Rod of Asclepius snake)
# usage: print_snake_header "let's route it"
print_snake_header() {
  local phrase="$1"
  echo "🐍 $phrase"
  echo ""
}

# print tree root
# usage: print_tree_start "refer init"
print_tree_start() {
  local command="$1"
  echo "⚕️ $command"
}

# print tree branch (has children)
# usage: print_tree_branch "route" ".demo/case=x/ ✨" [is_last]
print_tree_branch() {
  local key="$1"
  local value="$2"
  local is_last="${3:-false}"
  # last item closes the branch (└─); early-return keeps the flow linear (no else)
  [[ "$is_last" == "true" ]] && { echo "   └─ $key: $value"; return; }
  echo "   ├─ $key: $value"
}

# print a simple tree item (label only)
# usage: print_tree_item "created" [is_last]
print_tree_item() {
  local label="$1"
  local is_last="${2:-false}"
  # last item closes the branch (└─); early-return keeps the flow linear (no else)
  [[ "$is_last" == "true" ]] && { echo "   └─ $label"; return; }
  echo "   ├─ $label"
}

# print a nested leaf under "created"
# usage: print_created_leaf "1.1.intake.need.stone" [is_last]
print_created_leaf() {
  local name="$1"
  local is_last="${2:-false}"
  # last item closes the branch (└─); early-return keeps the flow linear (no else)
  [[ "$is_last" == "true" ]] && { echo "      └─ $name"; return; }
  echo "      ├─ $name"
}

# print caduceus footer with message + optional dimmed bound info
# usage: print_caduceus "the way is paved" "branch main <-> route .demo/case=x"
print_caduceus() {
  local message="$1"
  local bound="${2:-}"
  echo ""
  echo "☤ $message"
  if [[ -n "$bound" ]]; then
    echo -e "   └─ \033[2m$bound\033[0m"
  fi
}

# print error message
# usage: print_error "no --at dir given"
print_error() {
  local message="$1"
  # errors go to stderr so callers can separate failure from normal stdout (rule.forbid.failhide)
  echo "🐍 sssnag" >&2
  echo "" >&2
  echo "   └─ error: $message" >&2
}
