# Security Audit

## Baseline

- Upstream audit commit: `853c997c029921031789e9b259ce44d6ae7a245d`
- Fork: `https://github.com/KiVixx/codex-with-chatgpt-hardened`
- Hardening branch: `security/hardening-v1`
- Baseline commands: `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm test`, and `pnpm build`
- Baseline result: passed (115 tests before hardening changes)
- `pnpm audit`: passed — no known vulnerabilities found

This document records the security invariants, audit findings, and verification evidence for the hardened fork. Each logical fix is kept in a separate commit.

## Security invariants

- The remote MCP surface is read-only.
- Workspace paths are constrained to the configured workspace and sensitive files are denied.
- Remote clients cannot invoke a shell, write or delete files, commit changes, or execute arbitrary commands.
- Update checks are observational only; updates require an explicit user request and review.
- Secrets are redacted before free text leaves the bridge.

## Initial findings

The upstream baseline used a permissive proxy trust setting, exposed project command details through workspace discovery, had a narrow sensitive-file policy, and did not apply a single redaction pass to all MCP text responses. OAuth registration and public health responses also required explicit hardening and regression coverage. These findings are addressed on the hardening branch.

## Subprocess inventory

All subprocess calls are in `src/process/daemon.ts`, `src/cli/index.ts`, `src/tunnel/{detect,cloudflared,cloudflared-named,named-provision}.ts`, `src/workspace/{search,git}.ts`, and test helpers. Production calls use executable-plus-argument arrays, bounded timeouts, and validated paths/arguments. No remote input is interpolated into shell commands.

## Outbound network inventory

Expected destinations are localhost bridge requests, Cloudflare/cloudflared tunnel endpoints, GitHub update checks, and official ChatGPT connector URLs used by the documented workflow. No undisclosed telemetry found.

## Verification log

Final verification: `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm test`, `pnpm build`, and `pnpm audit` passed; 125 tests passed. Public health is service/status only. MCP tool inventory remains eight read-only tools: `workspace_info`, `read_file`, `list_directory`, `search_workspace`, `git_status`, `git_diff`, `execution_summary`, and `test_status`. OAuth registration is capped at 10/minute/IP and 128 clients/workspace with a 32 KiB body limit. Central redaction covers MCP responses and logs.

Residual risks: credential redaction is heuristic and cannot identify every custom encoding; the file-backed token store remains dependent on local filesystem permissions; Cloudflare quick-tunnel availability and URL rotation remain operational dependencies; dependency audit covers known advisories only.
