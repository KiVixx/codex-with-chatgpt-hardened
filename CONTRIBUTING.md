# Contributing

Thanks for helping improve the security-hardened fork of Codex with ChatGPT.

## Before opening an issue

- Search existing issues first.
- Do not include credentials, tokens, pairing codes, private keys, private
  repository contents, or other sensitive data.
- For a suspected vulnerability, follow [SECURITY.md](SECURITY.md) instead of
  opening a public issue.

## Development setup

Requirements: Node.js 20 or newer, Corepack, and git.

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm audit
```

## Pull requests

1. Keep each pull request focused on one change.
2. Add or update tests for behavior changes, especially security boundaries.
3. Run the full verification commands above.
4. Update the English and Chinese documentation when user-facing behavior
   changes.
5. Explain security impact, compatibility impact, and manual testing in the
   pull request description.

This repository is an unofficial community fork of
[XiaoDuoYa/codex-with-chatgpt](https://github.com/XiaoDuoYa/codex-with-chatgpt).
Contributions are accepted under the repository's [MIT License](LICENSE).
