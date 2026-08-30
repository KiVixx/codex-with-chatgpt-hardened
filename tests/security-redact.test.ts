import { describe, expect, it } from "vitest";
import { redactSensitiveText } from "../src/security/redact.js";

describe("central sensitive text redaction", () => {
  it("redacts common assignments while preserving labels", () => {
    const result = redactSensitiveText("OPENAI_API_KEY=sk-test-value-1234567890 TOKEN=ordinary-secret");
    expect(result).toContain("OPENAI_API_KEY=[REDACTED_C2C_SECRET]");
    expect(result).toContain("TOKEN=[REDACTED_C2C_SECRET]");
    expect(result).not.toContain("sk-test-value-1234567890");
  });

  it("redacts credentials embedded in ordinary source text", () => {
    const result = redactSensitiveText('const config = { apiKey: "ghp_abcdefghijklmnopqrstuvwxyz123456" };');
    expect(result).toContain("[REDACTED_C2C_SECRET]");
    expect(result).not.toContain("ghp_");
  });

  it("redacts private keys and bearer tokens", () => {
    const result = redactSensitiveText(
      "-----BEGIN PRIVATE KEY-----\nsecret\n-----END PRIVATE KEY----- Authorization: Bearer abcdefghijklmnop1234"
    );
    expect(result).not.toContain("BEGIN PRIVATE KEY");
    expect(result).not.toContain("abcdefghijklmnop1234");
  });
});

