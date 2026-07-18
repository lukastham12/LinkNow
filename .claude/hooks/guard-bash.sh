#!/usr/bin/env bash
# PreToolUse hook (matcher: Bash).
# Deterministic safety checkpoint for shell commands:
#   - CATASTROPHIC commands (could wipe the disk/system) -> denied outright.
#   - DESTRUCTIVE commands (delete/overwrite files, rewrite git history) -> the
#     user is asked to approve before they run.
# Everything else passes through to the normal permission flow.
# Fails OPEN (allows) on any internal/parse error so it can never brick a session.
set -u

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""' 2>/dev/null) || cmd=""
[ -z "$cmd" ] && exit 0

emit() { # $1 = decision (deny|ask), $2 = reason
  jq -cn --arg d "$1" --arg r "$2" \
    '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:$d,permissionDecisionReason:$r}}'
  exit 0
}

low=$(printf '%s' "$cmd" | tr '[:upper:]' '[:lower:]')

# --- Catastrophic: deny outright ---
case "$low" in
  *"rm -rf /"*|*"rm -rf /*"*|*"rm -rf ~"*|*"rm -fr /"*|*":(){"*|*"mkfs"*|*"> /dev/sd"*|*"of=/dev/sd"*)
    emit deny "Blocked outright: this looks catastrophic (could wipe the disk or system)." ;;
esac
case "$low" in
  *"dd if="*"/dev/"*) emit deny "Blocked outright: raw disk write (dd to /dev) is too dangerous to run." ;;
esac

# --- Destructive: ask the human to approve ---
if printf '%s' "$low" | grep -Eq '(^|[^a-z])rm[[:space:]]+-[a-z]*(r|f)' \
   || printf '%s' "$low" | grep -Eq 'git[[:space:]]+reset[[:space:]]+--hard' \
   || printf '%s' "$low" | grep -Eq 'git[[:space:]]+clean[[:space:]]+-[a-z]*f' \
   || printf '%s' "$low" | grep -Eq 'git[[:space:]]+push[[:space:]].*(--force([^-]|$)|-f([^a-z]|$))' \
   || printf '%s' "$low" | grep -Eq 'git[[:space:]]+checkout[[:space:]]+--[[:space:]]+\.' \
   || printf '%s' "$low" | grep -Eq 'chmod[[:space:]]+(-r[[:space:]]*)?777' \
   || printf '%s' "$low" | grep -Eq '(^|[^a-z])(shred|truncate)[[:space:]]' \
   || printf '%s' "$low" | grep -Eq '(^|[^a-z])sudo[[:space:]]' \
   || printf '%s' "$low" | grep -Eq '(curl|wget)[^|]*\|[[:space:]]*(sudo[[:space:]]+)?(ba)?sh'; then
  emit ask "Safety checkpoint: this command can delete/overwrite files or change the system. Review it and approve only if you're sure."
fi

exit 0
