import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProject, deleteProject } from "@/lib/data";

export async function GET() {
  return NextResponse.json(await getProjects());
}

export async function POST(req: NextRequest) {
  const project = await req.json();
  await saveProject(project);
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await deleteProject(id);
  return NextResponse.json({ ok: true });
}
