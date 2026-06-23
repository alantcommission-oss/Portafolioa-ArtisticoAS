import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession, hashPassword } from "@/lib/auth";

const ADMIN_EMAIL = "admin@alantart.dev";
const ADMIN_PASSWORD = "5369dos";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    let admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin && email === ADMIN_EMAIL) {
      const hash = await hashPassword(ADMIN_PASSWORD);
      admin = await prisma.admin.create({
        data: { email: ADMIN_EMAIL, passwordHash: hash },
      });
    }

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const valid = await verifyPassword(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    await createSession(admin.id);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Login error:", e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
