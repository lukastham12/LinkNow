#!/usr/bin/env bash
# Stop / SubagentStop hook.
# Before an agent is allowed to finish, verify the project is healthy: lint,
# build (typecheck + SSR), and unit tests must all pass. If not, BLOCK finishing
# (exit 2) and feed the failure back so it gets fixed before "moving on".
#
# Runs only when SOURCE files (src/**) have uncommitted changes, so doc-only or
# no-op stops finish instantly. Guards against infinite loops via stop_hook_active.
# Fails OPEN on internal/setup errors (never blocks for a reason unrelated to the code).
set -u

input=$(cat)
active=$(printf '%s' "$input" | jq -r '.stop_hook_active // false' 2>/dev/null) || active=false
[ "$active" = "true" ] && exit 0

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

# Skip unless source actually changed (keeps most stops fast).
changed=$(git status --porcelain -- src 2>/dev/null)
[ -z "$changed" ] && exit 0

# 1) Lint
if ! out=$(npm run -s lint 2>&1); then
  echo "BLOCKED before finishing: lint is failing. Fix it first:" >&2
  printf '%s\n' "$out" | tail -30 >&2
  exit 2
fi

# 2) Build (typecheck + SSR/prerender)
if ! out=$(npm run -s build 2>&1); then
  echo "BLOCKED before finishing: the build is failing. Fix it first:" >&2
  printf '%s\n' "$out" | tail -30 >&2
  exit 2
fi

# 3) Unit tests (need a Chrome/Chromium binary)
if [ -z "${CHROME_BIN:-}" ]; then
  cand=$(ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome 2>/dev/null | head -1)
  [ -n "$cand" ] && export CHROME_BIN="$cand"
fi
if [ -z "${CHROME_BIN:-}" ] && ! command -v google-chrome >/dev/null 2>&1 \
   && ! command -v chromium >/dev/null 2>&1 && ! command -v chromium-browser >/dev/null 2>&1; then
  echo "Note: no Chrome/Chromium found — skipped unit tests in the pre-finish gate (lint + build passed)." >&2
  exit 0
fi
if ! out=$(npm test -- --watch=false 2>&1); then
  echo "BLOCKED before finishing: unit tests are failing. Fix them first:" >&2
  printf '%s\n' "$out" | tail -30 >&2
  exit 2
fi

exit 0
