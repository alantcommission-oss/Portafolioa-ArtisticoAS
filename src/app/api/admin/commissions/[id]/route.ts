import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, clientName, clientEmail } = body;

    const existing = await prisma.commissionSlot.findUnique({
      where: { id },
    });
    if (!existing) {
      return NextResponse.json(
        { error: "Slot not found" },
        { status: 404 }
      );
    }

    const slot = await prisma.commissionSlot.update({
      where: { id },
      data: {
        ...(status !== undefined && { status }),
        ...(clientName !== undefined && { clientName }),
        ...(clientEmail !== undefined && { clientEmail }),
      },
    });

    return NextResponse.json(slot);
  } catch {
    return NextResponse.json(
      { error: "Failed to update slot" },
      { status: 500 }
    );
  }
}
