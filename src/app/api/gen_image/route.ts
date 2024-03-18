// https://developer.mozilla.org/docs/Web/API/ReadableStream#convert_async_iterator_to_stream
import { toast } from "sonner";
import { safeParseJSON } from "@/lib/json_handler";
import { addCount } from "@/lib/server/count";

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

async function* makeIterator() {
  yield encoder.encode("<p>One</p>");
  await sleep(200);
  yield encoder.encode("<p>Two</p>");
  await sleep(200);
  yield encoder.encode("<p>Three</p>");
}

const ENDPOINT = process.env.INTERNAL_API_ENDPOINT || "";
const KEY = process.env.INTERNAL_API_KEY || "";

async function genImage(req: object) {
  const requestJson = JSON.stringify(req);
  console.log(req);
  const response = await fetch(`${ENDPOINT}/image/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KEY}`,
    },
    body: requestJson,
  });

  if (!response.ok) {
    if (response.status === 429) {
      // toast.error("Too many requests, please try again later");
    }
    console.log(234);
    throw new Error("Failed to fetch");
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder("utf-8");

  const result = addCount("counter_global", "generate_count");

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

export async function POST(request: Request) {
  const iterator = await genImage(await request.json());
  const stream = iteratorToStream(iterator());

  return new Response(stream);
}
