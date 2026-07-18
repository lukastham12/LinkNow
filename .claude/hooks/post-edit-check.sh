#!/usr/bin/env bash
# PostToolUse hook (matcher: Edit|Write|MultiEdit).
# Deterministic quality gate that runs after a file is edited:
#   - If a dependency manifest changed (package.json / package-lock.json), run a
#     vulnerability audit and BLOCK if it introduced High/Critical issues.
#   - If a source file changed (.ts / .html), run the linter on it and BLOCK on
#     lint errors, feeding them back so they get fixed before moving on.
# Blocking = exit code 2 with an explanation on stderr (Claude reads it).
# Fails OPEN on internal errors (e.g. no network for audit) so it can't wedge work.
set -u

input=$(cat)
file=$(printf '%s' "$input" | jq -r '.tool_input.file_path // .tool_input.filePath // ""' 2>/dev/null) || file=""
[ -z "$file" ] && exit 0
base=$(basename "$file")

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0

# --- Dependency change -> vulnerability audit ---
case "$base" in
  package.json|package-lock.json)
    json=$(npm audit --json 2>/dev/null)
    count=$(printf '%s' "$json" | jq -r '((.metadata.vulnerabilities.high // 0) + (.metadata.vulnerabilities.critical // 0))' 2>/dev/null)
    if [ -n "$count" ] && [ "$count" -gt 0 ] 2>/dev/null; then
      echo "BLOCKED: editing $base leaves $count High/Critical dependency vulnerability(ies)." >&2
      npm audit --audit-level=high 2>&1 | tail -25 >&2
      echo "Fix with 'npm audit fix', pin a safe version, or justify before continuing." >&2
      exit 2
    fi
    exit 0 ;;
esac

# --- Source file -> lint ---
case "$file" in
  *.ts|*.html)
    out=$(npx eslint "$file" 2>&1)
    if [ $? -ne 0 ]; then
      echo "BLOCKED: lint failed for $file. Fix these before moving on:" >&2
      printf '%s\n' "$out" | tail -40 >&2
      exit 2
    fi ;;
esac

exit 0
