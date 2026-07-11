import { NextRequest, NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getSiteData());
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  await saveSiteData(data);
  return NextResponse.json({ ok: true });
}
