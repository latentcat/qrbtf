import { NEXT_PUBLIC_QRBTF_API_ENDPOINT } from "@/lib/env/client";
import { http } from "@/lib/network";
import { urlAtom } from "@/lib/states";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { z } from "zod";

const schema = z.union([
  z.object({
    task_id: z.string(),
    status: z.literal("pending"),
    create_ts: z.number(),
  }),
  z.object({
    task_id: z.string(),
    status: z.literal("processing"),
    create_ts: z.number(),
  }),
  z.object({
    task_id: z.string(),
    status: z.literal("completed"),
    create_ts: z.number(),
    cost: z.number(),
    download_url: z.string(),
    nsfw_check: z.boolean(),
    qr_check: z.boolean(),
  }),
  z.object({
    task_id: z.string(),
    status: z.literal("failed"),
    create_ts: z.number(),
    cost: z.number(),
    error: z.string(),
  }),
]);

export type ImageResponse = z.infer<typeof schema>;

export default function useGenAiImage() {
  const [generating, setGenerating] = useState(false);
  const [resData, setResData] = useState<ImageResponse | null>(null);

  const url = useAtomValue(urlAtom) || "https://qrbtf.com";

  async function onSubmit(values: any) {
    setGenerating(true);
    try {
      const response = await http(
        `${NEXT_PUBLIC_QRBTF_API_ENDPOINT}/qrcode/gen_image`,
        {
          method: "POST",
          body: JSON.stringify({
            url,
            ...values,
          }),
        },
      );
      const taskId = (await response.json())["task_id"];
      setResData({
        status: "pending",
        task_id: "",
        create_ts: Date.now(),
      });

      const timer = setInterval(async () => {
        const query = await http(
          `${NEXT_PUBLIC_QRBTF_API_ENDPOINT}/qrcode/query_image/${taskId}`,
        );
        const data = await query.json();
        const imageResponse = schema.parse(data);
        setResData(imageResponse);

        if (
          imageResponse.status === "completed" ||
          imageResponse.status === "failed"
        ) {
          setGenerating(false);
          if (timer) {
            clearInterval(timer);
          }
        }
      }, 1500);
    } catch {
      setGenerating(false);
    }
  }

  return {
    onSubmit,
    generating,
    resData,
  };
}
