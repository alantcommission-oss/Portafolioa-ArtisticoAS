import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const artworks = await prisma.artwork.findMany({
      orderBy: { position: "asc" },
    });
    return NextResponse.json(artworks);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch artworks" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, imageUrl, tags } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Title and imageUrl are required" },
        { status: 400 }
      );
    }

    // Check capacity limit (max 60)
    const count = await prisma.artwork.count();
    if (count >= 60) {
      return NextResponse.json(
        { error: "Gallery capacity reached (max 60 artworks)" },
        { status: 400 }
      );
    }

    // Get next position
    const last = await prisma.artwork.findFirst({
      orderBy: { position: "desc" },
    });
    const position = (last?.position ?? -1) + 1;

    const artwork = await prisma.artwork.create({
      data: {
        title,
        description: description ?? null,
        imageUrl,
        tags: tags ?? [],
        position,
      },
    });

    return NextResponse.json(artwork, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create artwork" },
      { status: 500 }
    );
  }
}
