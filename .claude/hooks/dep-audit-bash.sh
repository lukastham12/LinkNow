#!/usr/bin/env bash
# PostToolUse hook (matcher: Bash).
# When a shell command changes dependencies (npm/yarn/pnpm install/add/update/…),
# run a vulnerability audit and BLOCK if it introduced High/Critical issues.
# Fails OPEN on internal errors (e.g. no network) so it can't wedge work.
set -u

input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // ""' 2>/dev/null) || cmd=""
[ -z "$cmd" ] && exit 0
low=$(printf '%s' "$cmd" | tr '[:upper:]' '[:lower:]')

changed_deps=0
case "$low" in
  *"npm install"*|*"npm i "*|*"npm ci"*|*"npm add"*|*"npm update"*|*"npm uninstall"*|*"npm remove"*|*"npm rm "*) changed_deps=1 ;;
  *"yarn add"*|*"yarn install"*|*"yarn up"*|*"pnpm add"*|*"pnpm install"*|*"pnpm up"*) changed_deps=1 ;;
esac
[ "$changed_deps" -eq 0 ] && exit 0

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
json=$(npm audit --json 2>/dev/null)
count=$(printf '%s' "$json" | jq -r '((.metadata.vulnerabilities.high // 0) + (.metadata.vulnerabilities.critical // 0))' 2>/dev/null)
if [ -n "$count" ] && [ "$count" -gt 0 ] 2>/dev/null; then
  echo "BLOCKED: this dependency change introduced $count High/Critical vulnerability(ies) (npm audit)." >&2
  npm audit --audit-level=high 2>&1 | tail -25 >&2
  echo "Resolve them before continuing." >&2
  exit 2
fi
exit 0
