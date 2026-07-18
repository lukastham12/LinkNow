# Project hooks (self-healing quality gates)

These hooks are wired up in `.claude/settings.json` and run automatically during
Claude Code sessions on this project. They are the project's **hard guarantees** —
deterministic checks that fire whether or not anyone remembers to run them.

| Hook script | Fires on | What it does | Type |
|---|---|---|---|
| `guard-bash.sh` | **PreToolUse** — before every Bash command | Denies catastrophic commands outright (e.g. `rm -rf /`, `mkfs`, `dd` to a disk); **asks you to approve** merely-destructive ones (`rm -rf …`, `git reset --hard`, `git clean -f`, force-push, `chmod 777`, `sudo`, `curl … | sh`). Everything else passes through. | **Deterministic** |
| `post-edit-check.sh` | **PostToolUse** — after Edit/Write/MultiEdit | If a source file (`.ts`/`.html`) changed → runs **ESLint** on it and blocks on errors. If `package.json`/`package-lock.json` changed → runs **`npm audit`** and blocks on High/Critical vulns. | **Deterministic** |
| `dep-audit-bash.sh` | **PostToolUse** — after Bash | If the command installed/updated dependencies (`npm install`, `npm update`, `yarn add`, `pnpm add`, …) → runs **`npm audit`** and blocks if it introduced High/Critical vulns. | **Deterministic** |
| `verify-stop.sh` | **Stop / SubagentStop** — when an agent tries to finish | If `src/**` has uncommitted changes, runs **lint → build → unit tests**; blocks finishing until all pass. Skips instantly when no source changed. Guards against loops via `stop_hook_active`. | **Deterministic** |

## Deterministic vs judgment-based

**All four hooks are deterministic** — they run fixed commands (eslint, npm audit,
ng build, ng test) and block on a fixed condition (non-zero exit / High+Critical
count). They cannot hallucinate or be talked out of a failure. That is exactly why
they are trustworthy: a linter failing is a fact, not an opinion.

The *judgment-based* checking in this project lives in the **agents**, not the
hooks: the `reviewer` and `security-auditor` subagents (`.claude/agents/`) use
reasoning to weigh design, clarity, and risk. Use both layers together — hooks for
the hard guarantees, agents for the judgment calls.

## Design notes / honest caveats

- **"After every edit, run tests" is implemented as two tiers for practicality:**
  editing a file runs the fast **lint** gate immediately; the slower **build + tests**
  run at the *Stop* gate ("before moving on"), not after every keystroke — running
  the full suite on every character edit would make building unusable. The guarantee
  (tests must pass before work is considered done) is preserved.
- Audit/lint hooks **fail open** on internal errors (e.g. no network for `npm audit`)
  so a flaky environment can never permanently wedge a session. They only *block* on
  a genuine lint error or a genuine High/Critical vulnerability.
- Tests need a Chrome/Chromium binary. The verify hook auto-detects the bundled
  Chromium or honours `CHROME_BIN`; if none is found it skips tests (lint + build
  still gate) rather than false-blocking. See `CLAUDE.md`.
- **Portability:** the scripts are bash + `jq`. They work in this environment and in
  Git Bash/macOS/Linux with `jq` installed. If `jq` is missing, the hooks fail open.
