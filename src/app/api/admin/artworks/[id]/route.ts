import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, description, imageUrl, tags, position } = body;

    const existing = await prisma.artwork.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Artwork not found" },
        { status: 404 }
      );
    }

    const artwork = await prisma.artwork.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(tags !== undefined && { tags }),
        ...(position !== undefined && { position }),
      },
    });

    return NextResponse.json(artwork);
  } catch {
    return NextResponse.json(
      { error: "Failed to update artwork" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.artwork.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Artwork not found" },
        { status: 404 }
      );
    }

    await prisma.artwork.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete artwork" },
      { status: 500 }
    );
  }
}
