import { NextRequest, NextResponse } from "next/server";
import { getSignedUploadUrl } from "@/lib/r2";

export async function POST(req: NextRequest) {
  try {
    const { fileName, contentType } = await req.json();

    if (!fileName) {
      return NextResponse.json({ error: "fileName required" }, { status: 400 });
    }

    const key = `uploads/${Date.now()}-${fileName}`;
    const uploadUrl = await getSignedUploadUrl(key, contentType || "application/octet-stream");

    return NextResponse.json({ uploadUrl, key });
  } catch (error) {
    console.error("Upload URL error:", error);
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
  }
}
