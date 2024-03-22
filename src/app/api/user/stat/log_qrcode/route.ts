import auth from "@/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { logQrcode } from "../service";

export async function POST(request: NextRequest) {
  const session = await getServerSession(auth);
  const req = await request.json();

  await logQrcode({
    user_id: session?.user.id,
    ...req,
  });
  return NextResponse.json({});
}
