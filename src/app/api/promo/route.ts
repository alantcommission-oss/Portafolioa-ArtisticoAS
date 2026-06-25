import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");

  if (action === "leaderboard") {
    const top = await prisma.promoParticipant.findMany({
      orderBy: { points: "desc" },
      take: 20,
      select: { instagram: true, points: true, visits: true },
    });
    return NextResponse.json(top);
  }

  const instagram = req.nextUrl.searchParams.get("instagram");
  if (!instagram) return NextResponse.json({ error: "Missing instagram" }, { status: 400 });
  const p = await prisma.promoParticipant.findUnique({ where: { instagram } });
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ instagram: p.instagram, points: p.points, visits: p.visits });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, instagram } = body;

    if (!action || !instagram) {
      return NextResponse.json({ error: "Missing action or instagram" }, { status: 400 });
    }

    const clean = instagram.replace(/^@/, "").trim();

    if (action === "register") {
      const existing = await prisma.promoParticipant.findUnique({ where: { instagram: clean } });
      if (existing) {
        return NextResponse.json({ error: "Ya estás registrado" }, { status: 409 });
      }
      const p = await prisma.promoParticipant.create({
        data: { instagram: clean, points: 1, visits: 1 },
      });
      return NextResponse.json({ instagram: p.instagram, points: p.points, visits: p.visits });
    }

    if (action === "visit") {
      const p = await prisma.promoParticipant.upsert({
        where: { instagram: clean },
        update: { visits: { increment: 1 }, points: { increment: 1 } },
        create: { instagram: clean, points: 1, visits: 1 },
      });
      return NextResponse.json({ instagram: p.instagram, points: p.points, visits: p.visits });
    }

    if (action === "game-score") {
      const gamePoints = body.points;
      if (typeof gamePoints !== "number" || gamePoints < 0) {
        return NextResponse.json({ error: "Invalid points" }, { status: 400 });
      }
      const p = await prisma.promoParticipant.update({
        where: { instagram: clean },
        data: { points: { increment: gamePoints } },
      });
      return NextResponse.json({ instagram: p.instagram, points: p.points, visits: p.visits });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
