interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const DEFAULT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const DEFAULT_MAX_REQUESTS = 5;

/**
 * Simple in-memory sliding-window rate limiter keyed by IP.
 * Returns `true` if the request is allowed, `false` if rate-limited.
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = DEFAULT_MAX_REQUESTS,
  windowMs: number = DEFAULT_WINDOW_MS
): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}

/**
 * Get remaining requests for logging/header purposes.
 */
export function getRemainingRequests(ip: string): number {
  const entry = store.get(ip);
  if (!entry) return DEFAULT_MAX_REQUESTS;
  return Math.max(0, DEFAULT_MAX_REQUESTS - entry.count);
}
