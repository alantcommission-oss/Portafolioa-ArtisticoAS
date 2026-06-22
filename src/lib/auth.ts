import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

const SESSION_COOKIE = "session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24; // 24 hours
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-dev-secret-change-in-production"
);

export interface SessionPayload extends JWTPayload {
  adminId: string;
  token: string;
}

/**
 * Hash a plaintext password with bcrypt.
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verify a plaintext password against a bcrypt hash.
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a session for the given admin. Inserts a DB row and sets a JWT cookie.
 */
export async function createSession(adminId: string): Promise<string> {
  // Generate a random token
  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.session.create({
    data: { adminId, token, expiresAt },
  });

  // Sign JWT
  const jwt = await new SignJWT({ adminId, token } as SessionPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return jwt;
}

/**
 * Validate the current session from cookies. Returns the admin ID if valid.
 */
export async function validateSession(): Promise<string | null> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(SESSION_COOKIE)?.value;
  if (!jwt) return null;

  try {
    const { payload } = await jwtVerify(jwt, JWT_SECRET);
    const { adminId, token } = payload as unknown as SessionPayload;

    // Verify session exists in DB and hasn't expired
    const session = await prisma.session.findUnique({
      where: { token },
      include: { admin: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return null;
    }

    return adminId;
  } catch {
    return null;
  }
}

/**
 * Destroy the current session from cookies.
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get(SESSION_COOKIE)?.value;
  if (jwt) {
    try {
      const { payload } = await jwtVerify(jwt, JWT_SECRET);
      const { token } = payload as unknown as SessionPayload;
      await prisma.session.deleteMany({ where: { token } });
    } catch {
      // Token invalid or expired — just clear cookie
    }
  }
  cookieStore.delete(SESSION_COOKIE);
}
