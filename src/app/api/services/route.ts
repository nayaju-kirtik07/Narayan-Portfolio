import { NextRequest, NextResponse } from "next/server";
import { getServices, saveService, deleteService } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getServices());
}

export async function POST(req: NextRequest) {
  const service = await req.json();
  await saveService(service);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await deleteService(id);
  return NextResponse.json({ ok: true });
}
