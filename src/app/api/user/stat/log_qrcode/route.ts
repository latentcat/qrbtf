import { NextRequest, NextResponse } from "next/server";
import { logQrcode } from "../service";
import { getServerSession } from "@/lib/latentcat-auth/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  const req = await request.json();

  await logQrcode({
    user_id: session?.id,
    ...req,
  });
  return NextResponse.json({});
}
