import { describe, expect, it } from "vitest";
import { AuthStore, MAX_CLIENT_REGISTRATIONS } from "../src/auth/store.js";
import { makeTmpDir, cleanup } from "./helpers.js";
import path from "node:path";

describe("AuthStore client registration bounds", () => {
  it("evicts inactive registrations instead of permanently locking registration", () => {
    const dir = makeTmpDir("auth-cap");
    try {
      const store = new AuthStore("workspace", { file: path.join(dir, "auth.json") });
      for (let i = 0; i < MAX_CLIENT_REGISTRATIONS; i++) {
        expect(store.registerClient({ redirectUris: ["http://localhost/callback"] })).toBeTruthy();
      }
      expect(store.clientCount()).toBe(MAX_CLIENT_REGISTRATIONS);
      expect(store.registerClient({ redirectUris: ["http://localhost/callback"] })).toBeTruthy();
      expect(store.clientCount()).toBe(MAX_CLIENT_REGISTRATIONS);
    } finally {
      cleanup(dir);
    }
  });
});
