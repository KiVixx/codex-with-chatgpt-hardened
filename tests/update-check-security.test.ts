import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("side-effect-free update check", () => {
  it("does not pull, install, build, or alter the checkout", () => {
    const before = spawnSync("git", ["status", "--porcelain"], { cwd: repo, encoding: "utf8" }).stdout;
    const source = fs.readFileSync(path.join(repo, "src/cli/index.ts"), "utf8");
    expect(source).not.toMatch(/git\s+pull/);
    expect(source).toContain('runGit(["rev-parse", "HEAD"])');
    expect(source).toContain('runGit(["ls-remote", "origin", "HEAD"])');
    const result = spawnSync("node", [path.join(repo, "bin/c2c.js"), "update-check", "--force", "--json"], {
      cwd: repo,
      encoding: "utf8",
      timeout: 15_000,
      env: { ...process.env, C2C_STATE_DIR: path.join(repo, ".tooling", "test-tmp", "update-check-state") },
    });
    expect(result.status).toBe(0);
    const after = spawnSync("git", ["status", "--porcelain"], { cwd: repo, encoding: "utf8" }).stdout;
    expect(after).toBe(before);
  });
});

