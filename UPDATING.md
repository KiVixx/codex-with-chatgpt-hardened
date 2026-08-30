# Updating the hardened fork

Updates are never automatic. `c2c update-check` only compares the local SHA
with the configured remote and reports the old/new SHA; it does not modify the
checkout, install packages, build, or restart the bridge.

The supported release source is always:

`https://github.com/KiVixx/codex-with-chatgpt-hardened`

When an update is explicitly requested:

1. Verify `git remote get-url origin` exactly matches the hardened fork URL.
2. `git fetch origin main`
3. Review `git log`, `git diff`, and `git diff --stat` from the current SHA to
   the proposed `origin/main` SHA.
4. Do not stash or overwrite uncommitted user changes.
5. Apply only the reviewed changes, then run:
   `corepack pnpm install --frozen-lockfile`
   `corepack pnpm typecheck`
   `corepack pnpm test`
   `corepack pnpm build`
6. Review the security tests and diff before using the new build locally.

The optional `upstream` remote may be inspected only when the user explicitly
asks to audit upstream changes. Never automatically pull, merge, rebase,
install, build, or execute code from `XiaoDuoYa/codex-with-chatgpt`.
