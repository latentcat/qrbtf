// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
import { NextRequest, NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { getTranslations } from "next-intl/server";
import { http } from "@/lib/network";
import {
  getUserQrcodeStat,
  incGenerationCount,
  updateLastGenerate,
} from "@/lib/server/stat_service";
import { addCount } from "@/lib/server/count_service";
import { getServerSession } from "@/lib/latentcat-auth/server";
import { UserTier } from "@/lib/latentcat-auth/common";
import { INTERNAL_API_ENDPOINT, INTERNAL_API_KEY } from "@/lib/env/server";
import { validateBlacklist } from "@/lib/server/url_filters_service";

function iteratorToStream(iterator: AsyncGenerator<any>, userId: string) {
  if (!iterator) return;
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        updateLastGenerate(userId);
        incGenerationCount(userId);
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

async function genImage(req: object) {
  const requestJson = JSON.stringify(req);
  const response = await http(`${INTERNAL_API_ENDPOINT}/image/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${INTERNAL_API_KEY}`,
    },
    body: requestJson,
  });
  addCount("counter_global", "generate_count");

  const reader = response.body!.getReader();

  return async function* () {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  };
}

const ratelimit = {
  basic: new Ratelimit({
    redis: kv,
    analytics: true,
    prefix: "ratelimit:basic",
    limiter: Ratelimit.slidingWindow(5, "60s"),
    timeout: 1000, // 1 second
  }),
};

export async function POST(request: NextRequest) {
  const data = await request.json();
  const url = data.url;

  // I18n
  const locale = request.cookies.get("NEXT_LOCALE")?.value || "en";
  const t = await getTranslations({ locale, namespace: "api.gen_image" });

  // Url blacklist
  if (!(await validateBlacklist(url))) {
    return NextResponse.json({ error: t("url_filter") }, { status: 400 });
  }

  // Authorization
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: t("unauthorized") }, { status: 401 });
  }

  // Basic rate limit
  const user = session.id || "";
  const rlBasic = await ratelimit.basic.limit(user);
  if (!rlBasic.success) {
    return NextResponse.json({ error: t("rate_limit_basic") }, { status: 429 });
  }

  // Usage count limit
  const { usage_count: usageCount = 0 } = (await getUserQrcodeStat(user)) || {};
  if (session.tier != UserTier.Pro && usageCount >= 10) {
    return NextResponse.json({ error: t("rate_limit_free") }, { status: 429 });
  }

  const iterator = await genImage({
    ...data,
    user_id: session.id,
  });
  const stream = iteratorToStream(iterator(), user);
  return new Response(stream);
}
