# Updating the hardened fork

Updates are never automatic. `c2c update-check` only compares the local SHA
with the configured remote and reports the old/new SHA; it does not modify the
checkout, install packages, build, or restart the bridge.

When an update is explicitly requested:

1. `git fetch upstream`
2. Review `git log`, `git diff`, and `git diff --stat` from the current SHA to
   the proposed upstream SHA.
3. Do not stash or overwrite uncommitted user changes.
4. Apply only the reviewed changes, then run:
   `corepack pnpm install --frozen-lockfile`
   `corepack pnpm typecheck`
   `corepack pnpm test`
   `corepack pnpm build`
5. Review the security tests and diff before merging to the fork.

Never use `git pull upstream main` as an unattended daily update mechanism.

