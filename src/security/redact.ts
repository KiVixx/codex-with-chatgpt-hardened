/** Redact credential-like values before text is returned to a remote client. */
export const REDACTED_SECRET = "[REDACTED_C2C_SECRET]";
const PEM = /-----BEGIN [A-Z0-9 ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z0-9 ]*PRIVATE KEY-----/gi;
const ASSIGNMENT = /((?:OPENAI_API_KEY|API_KEY|API_TOKEN|ACCESS_TOKEN|REFRESH_TOKEN|PASSWORD|PASS|SECRET|TOKEN|PRIVATE_KEY|api[_-]?key|client[_-]?secret|aws_secret_access_key|aws_session_token)\s*[=:]\s*)(?:"[^"]*"|'[^']*'|[^\s,}]+)/gi;
const BEARER = /(Bearer\s+)[A-Za-z0-9._~+\/-]{16,}/gi;
const TOKEN = /(AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|eyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,})/g;
export function redactSensitiveText(input: string): string {
  return input.replace(PEM, REDACTED_SECRET)
    .replace(ASSIGNMENT, (_m, prefix: string) => `${prefix}${REDACTED_SECRET}`)
    .replace(BEARER, (_m, prefix: string) => `${prefix}${REDACTED_SECRET}`)
    .replace(TOKEN, REDACTED_SECRET);
}
