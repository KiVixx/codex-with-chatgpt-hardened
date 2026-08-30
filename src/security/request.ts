import type { Request } from "express";

function isLoopback(address: string | undefined): boolean {
  return address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
}

/**
 * Return the client address only from a trusted local tunnel hop.
 * X-Forwarded-For is intentionally never trusted because it is client supplied.
 */
export function getTrustedClientIp(req: Request): string {
  const peer = req.socket.remoteAddress ?? "unknown";
  const cfIp = req.get("cf-connecting-ip")?.trim();
  if (isLoopback(peer) && cfIp) return cfIp;
  return peer;
}

export { isLoopback };

