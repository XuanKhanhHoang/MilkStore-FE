import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("PRODUCT_LOGO_IMAGE") as unknown as File;
  const fileName: string | null = data.get("PRODUCT_NAME") as unknown as string;
  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "public", fileName);
  let isSuccess;
  isSuccess = (await writeFile(filePath, buffer)) == null;

  return NextResponse.json({ success: isSuccess });
}
