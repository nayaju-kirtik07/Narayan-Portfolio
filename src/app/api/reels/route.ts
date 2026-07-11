import { NextRequest, NextResponse } from "next/server";
import { getReels, saveReel, deleteReel } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getReels());
}

export async function POST(req: NextRequest) {
  const reel = await req.json();
  await saveReel(reel);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await deleteReel(id);
  return NextResponse.json({ ok: true });
}
