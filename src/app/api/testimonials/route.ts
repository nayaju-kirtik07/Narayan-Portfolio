import { NextRequest, NextResponse } from "next/server";
import { getTestimonials, saveTestimonial, deleteTestimonial } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getTestimonials());
}

export async function POST(req: NextRequest) {
  const testimonial = await req.json();
  await saveTestimonial(testimonial);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await deleteTestimonial(id);
  return NextResponse.json({ ok: true });
}
