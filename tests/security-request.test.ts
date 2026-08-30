import { describe, expect, it } from "vitest";
import { getTrustedClientIp } from "../src/security/request.js";

function request(peer: string, headers: Record<string, string>): any {
  return {
    socket: { remoteAddress: peer },
    get(name: string): string | undefined {
      return headers[name.toLowerCase()];
    },
  };
}

describe("trusted client IP", () => {
  it("ignores forged X-Forwarded-For", () => {
    const req = request("203.0.113.10", { "x-forwarded-for": "127.0.0.1" });
    expect(getTrustedClientIp(req)).toBe("203.0.113.10");
  });

  it("uses Cloudflare client IP only through the local tunnel hop", () => {
    const req = request("127.0.0.1", { "cf-connecting-ip": "198.51.100.7" });
    expect(getTrustedClientIp(req)).toBe("198.51.100.7");
  });
});

