import { NextResponse } from "next/server";
import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";

export async function GET() {
  try {
    const client = new S3Client({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });

    await client.send(new PutBucketCorsCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      CORSConfiguration: {
        CORSRules: [
          {
            AllowedOrigins: ["*"],
            AllowedMethods: ["GET", "HEAD", "PUT"],
            AllowedHeaders: ["*"],
            MaxAgeSeconds: 3600,
          },
        ],
      },
    }));

    return NextResponse.json({ ok: true, message: "CORS configured with PUT" });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      hint: "Go to Cloudflare Dashboard → R2 → narayan-portfolio → CORS tab → Add rule: Origin: *, Methods: GET, HEAD, PUT, Headers: *, then Save",
    }, { status: 500 });
  }
}
