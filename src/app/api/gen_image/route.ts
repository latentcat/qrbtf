// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
import { getServerSession } from "next-auth";
import auth from "@/auth";
import { NextRequest, NextResponse } from "next/server";

import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { getTranslations } from "next-intl/server";
import { http } from "@/lib/network";

function iteratorToStream(iterator: AsyncGenerator<any>) {
  if (!iterator) return;
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
}

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const encoder = new TextEncoder();

const ENDPOINT = process.env.INTERNAL_API_ENDPOINT || "";
const KEY = process.env.INTERNAL_API_KEY || "";

async function genImage(req: object) {
  const requestJson = JSON.stringify(req);
  const response = await http(`${ENDPOINT}/image/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: requestJson,
  });

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
  daily: new Ratelimit({
    redis: kv,
    analytics: true,
    prefix: "ratelimit:daily",
    limiter: Ratelimit.tokenBucket(20, "1 d", 20),
    timeout: 1000, // 1 second
  }),
};

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const locale = searchParams.get("locale") || "en";

  const t = await getTranslations({ locale, namespace: "api.gen_image" });

  const session = await getServerSession(auth);
  if (!session || !session.user) {
    return NextResponse.json({ error: t("unauthorized") }, { status: 401 });
  }

  const user = session.user.id || "";
  const rlBasic = await ratelimit.basic.limit(user);

  if (!rlBasic.success) {
    return NextResponse.json({ error: t("rate_limit_basic") }, { status: 429 });
  }

  const rlDaily = await ratelimit.daily.limit(user);

  if (!rlDaily.success) {
    return NextResponse.json(
      {
        error: t("rate_limit_daily"),
      },
      { status: 429 },
    );
  }

  const iterator = await genImage(await request.json());
  const stream = iteratorToStream(iterator());

  return new Response(stream);
}
