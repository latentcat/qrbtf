"use client";

import {
  QrbtfRendererCommonProps,
  QrbtfModule,
  QrbtfRendererUrlProps,
} from "@/lib/qrbtf_lib/qrcodes/common";
import React, { useEffect, useMemo, useState } from "react";
import { QRPointType, encode } from "../encoder";
import { gamma } from "@/lib/image_utils";
import { genImage } from "@/lib/image_service";

interface RenderG1OwnProps {
  task_type: string;
  url: string;
  prompt: string;
  negative_prompt: string;
  seed: number;
  control_strength: number;
  prompt_tuning: boolean;
  image_restoration: boolean;
  restoration_rate: number;
  size: string;
  padding_ratio: number;
  correct_level: string;
  anchor_style: string;
}

export type QrbtfRendererG1Props = RenderG1OwnProps;

async function* fetcher(
  req: QrbtfRendererG1Props & QrbtfRendererUrlProps,
  signal: AbortSignal,
) {
  // 调用流式请求
  const call = await genImage(req, signal);
  if (!call) {
    //重置进度条
    yield null;
  }
  // 类似 Python 中的 async for，rep 返回格式为 zod 导出的 ImageResponse，都在 image_service.ts 中定义，必须严格校验返回格式类型，不通过会报错
  for await (const rep of call()) {
    // 返回是 queue，排队中
    if (rep.res_type === "queue") {
      yield {
        value: 0.2,
        status: `Queued [${rep.diff + 1}]`,
      };
    }

    // 返回是 progress，开始生成的进度，目前 value 值是在前端定义的
    if (rep.res_type === "progress") {
      if (rep.status === "consumed") {
        yield {
          value: 0.4,
          status: "Consumed",
        };
      } else if (rep.status === "generate_start") {
        yield {
          value: 0.6,
          status: "Generate start",
        };
      } else if (rep.status === "inferencing") {
        yield {
          value: 0.6 + 0.4 * (rep.value || 0.0),
          status: "Inferencing",
        };
      } else if (rep.status === "generate_complete") {
        yield {
          value: 1,
          status: "Generate complete",
        };
      }
    }

    // 出现错误，弹出 toast
    if (rep.res_type === "error") {
      yield null;
      // toast.error("Server error", {
      //   description: "",
      // })
    }

    // 得到结果，结束，设置图像 url
    if (rep.res_type === "result") {
      // setImageUrl(rep.data.download_url)
      yield null;
      // setCurrentReq(null)
    }
  }
}

function QrbtfVisualizerG1(props: { data: any }) {
  return <div>{props && JSON.stringify(props.data, null, 2)}</div>;
}

export const qrbtfModuleG1: QrbtfModule<QrbtfRendererG1Props> = {
  type: "api_fetcher",
  fetcher: fetcher,
  visualizer: QrbtfVisualizerG1,
};
