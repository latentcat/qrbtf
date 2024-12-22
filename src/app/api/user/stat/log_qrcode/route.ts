import { getServerSession } from "next-auth";
import { type NextRequest, NextResponse } from "next/server";

import { logQrcode } from "../service";

import auth from "@/auth";

export async function POST(request: NextRequest) {
  const session = await getServerSession(auth);
  const req = await request.json();

  await logQrcode({
    user_id: session?.user.id,
    ...req,
  });
  return NextResponse.json({});
}
