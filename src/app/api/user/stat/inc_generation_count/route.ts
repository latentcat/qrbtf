import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { type NextRequest, NextResponse } from "next/server";

import { incGenerationCount } from "../service";

import auth from "@/auth";

export async function POST(request: NextRequest) {
  const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";
  const t = await getTranslations({ locale, namespace: "api.gen_image" });
  const session = await getServerSession(auth);

  if (!session || !session.user) {
    return NextResponse.json({ error: t("unauthorized") }, { status: 401 });
  }

  const user = session.user.id || "";
  const generationCount = (await incGenerationCount(user)) ?? 0;
  return NextResponse.json({
    generation_count: generationCount,
  });
}
