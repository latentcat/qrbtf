import { z } from "zod";
import { safeParseJSON } from "@/lib/json_handler";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai/index";
import { urlAtom } from "@/lib/states";
import { trackEvent } from "@/components/TrackComponents";
import { ApiFetcher } from "./qrbtf_lib/qrcodes/param";
import { http } from "./network";

const schema = z.union([
  z.object({
    res_type: z.literal("queue"),
    task_id: z.number().int(),
    queue_id: z.number().int(),
    diff: z.number().int(),
  }),
  z.object({
    res_type: z.literal("progress"),
    value: z.number().optional(),
    status: z.string(),
  }),
  z.object({
    res_type: z.literal("result"),
    data: z.object({
      task_id: z.number(),
      create_ts: z.string(),
      params: z.any(),
      download_url: z.string(),
      nsfw_check: z.boolean().optional(),
      qr_check: z.boolean().optional(),
    }),
  }),
  z.object({
    res_type: z.literal("error"),
  }),
]);

export type ImageResponse = z.infer<typeof schema>;

export async function genImage(req: object, signal: AbortSignal) {
  const requestJson = JSON.stringify(req);
  const response = await http(`/api/gen_image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestJson,
    signal,
  });

  const reader = response.body!.getReader();
  const decoder = new TextDecoder("utf-8");

  return async function* () {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        break;
      }
      const textValue = decoder.decode(value, { stream: true });
      const dataBlocks = textValue.split(/\r?\n/);
      for (const block of dataBlocks) {
        console.log(textValue);
        const object = safeParseJSON(block);
        if (!object) continue;
        console.log(object);
        yield schema.parse(object);
      }
    }
  };
}

export function useImageService<P extends object>(
  fetcher: ApiFetcher<P> | null,
) {
  const [currentReq, setCurrentReq] = useState<P | null>(null);
  const [resData, setResData] = useState<any | null>(null);
  const url = useAtomValue(urlAtom);

  function onSubmit(values: P) {
    // trackEvent('gen_qrcode', { is_login: !isLogout, ...values });
    //
    // if (isLogout) {
    //   toast.warning("You need to be logged in to generate QR codes");
    //   return;
    // }
    console.log(values);

    // 开始时归零进度条
    setResData(null);

    // 设置当前的请求，交给 useEffect 去发请求
    setCurrentReq(values);

    // toast("Request created.", {
    //   position: "bottom-right",
    //   description: (
    //     <pre className="mt-2 rounded-md bg-slate-950 p-4 overflow-x-scroll whitespace-pre-wrap break-all">
    //       <code className="text-white">{JSON.stringify(values, null, 2)}</code>
    //     </pre>
    //   ),
    // })
  }

  // 当当前请求发生变化时执行，并取消执行上一次的请求
  useEffect(() => {
    // 没有请求时不执行
    if (fetcher === null) return;

    // 没有请求时不执行
    if (currentReq === null) return;

    // 定义请求方法
    const fetchData = async (signal: AbortSignal) => {
      console.log(currentReq);

      try {
        // 调用流式请求
        // const call = fetcher({url, ...currentReq}, signal);
        // if (!call) {
        //   //重置进度条
        //   setResData(null);
        //   return;
        // }

        const data = { url, ...currentReq };
        trackEvent("submit_fetcher", data);

        // 类似 Python 中的 async for，rep 返回格式为 zod 导出的 ImageResponse，都在 image_service.ts 中定义，必须严格校验返回格式类型，不通过会报错
        for await (const res of fetcher(data, signal)) {
          setResData(res);
        }
      } catch (error: any) {
        // 中断请求
        if (error.name !== "AbortError") {
          // Handle other errors if necessary
          console.error(error);
        }
      }
    };

    const abortController = new AbortController();
    fetchData(abortController.signal).then((r) => {
      setCurrentReq(null);
    });

    return () => {
      abortController.abort();
    };
  }, [currentReq, fetcher, url]);

  return {
    onSubmit,
    currentReq,
    resData,
  };
}
