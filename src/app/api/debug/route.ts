import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  const dbUrl = process.env.DATABASE_URL || "NOT SET";
  const masked = dbUrl === "NOT SET" ? dbUrl : dbUrl.replace(/:[^:@]+@/, ":****@");
  return NextResponse.json({ db_url: masked });
}
