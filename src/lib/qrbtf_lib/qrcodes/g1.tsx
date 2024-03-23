"use client";

import React, { useEffect, useState } from "react";
import { genImage, ImageResponse } from "@/lib/image_service";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { opacityAnimations, transitionMd } from "@/lib/animations";
import { Loader2 } from "lucide-react";
import { Progress } from "@/components/Progress";
import { toast } from "sonner";
import { trackEvent } from "@/components/TrackComponents";
import { flattenObject } from "@/lib/utils";
import { QrbtfModule } from "./param";
import { G1Presets } from "./g1_config";

interface RenderG1OwnProps {
  task_type: string;
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

async function* fetcher(req: QrbtfRendererG1Props, signal: AbortSignal) {
  //重置进度条
  yield {
    type: "progress",
    value: 0.0,
    status: `Starting`,
  };
  const call = await genImage(req, signal);
  // 类似 Python 中的 async for，rep 返回格式为 zod 导出的 ImageResponse，都在 image_service.ts 中定义，必须严格校验返回格式类型，不通过会报错
  for await (const rep of call()) {
    // 返回是 queue，排队中
    yield rep;
  }
}

interface ProgressType {
  value: number;
  status: string;
}

function QrbtfVisualizerG1(props: { data: any }) {
  const [progress, setProgress] = useState<ProgressType | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const rep: ImageResponse | null = props.data;

    if (rep === null) return;

    console.log("rep", rep);
    if (rep.res_type === "queue") {
      setProgress({
        value: 0.2,
        status: `Queued [${rep.diff + 1}]`,
      });
    }

    // 返回是 progress，开始生成的进度，目前 value 值是在前端定义的
    if (rep.res_type === "progress") {
      if (rep.status === "consumed") {
        setProgress({
          value: 0.4,
          status: "Consumed",
        });
      } else if (rep.status === "generate_start") {
        setProgress({
          value: 0.6,
          status: "Generate start",
        });
      } else if (rep.status === "inferencing") {
        setProgress({
          value: 0.6 + 0.4 * (rep.value || 0.0),
          status: "Inferencing",
        });
      } else if (rep.status === "generate_complete") {
        setProgress({
          value: 1,
          status: "Generate complete",
        });
      }
    }

    // 出现错误，弹出 toast
    if (rep.res_type === "error") {
      setProgress(null);
      toast.error("Server error", {
        description: "",
      });
    }

    // 得到结果，结束，设置图像 url
    if (rep.res_type === "result") {
      setImageUrl(rep.data.download_url);
      setProgress(null);
      trackEvent("submit_fetcher_result", flattenObject(rep.data));
    }
  }, [props.data]);

  return (
    <div>
      <div
        id="output_image"
        className="aspect-square flex flex-col items-center justify-center"
      >
        {!progress && <PhotoIcon className="w-12 h-12 opacity-10" />}
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
        <AnimatePresence>
          {progress && (
            <motion.div
              key="progress-and-status"
              className="w-full h-full flex flex-col items-center justify-center gap-2 bg-background"
              variants={opacityAnimations}
              transition={transitionMd}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <Progress value={progress.value} className="w-[60%] h-2" />
              <div className="opacity-30 text-sm">{progress.status}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        <AnimatePresence>
          {!progress && imageUrl && (
            <motion.div
              key="final-image"
              variants={opacityAnimations}
              transition={transitionMd}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative bg-background w-full h-full"
            >
              <img
                src={imageUrl}
                alt=""
                className="w-full h-full block select-auto"
              />
              <div className="absolute -z-10 top-0 left-0 w-full h-full flex items-center justify-center text-sm opacity-30">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <div>Downloading...</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const qrbtfModuleG1: QrbtfModule<QrbtfRendererG1Props> = {
  type: "api_fetcher",
  fetcher: fetcher,
  visualizer: QrbtfVisualizerG1,
  presets: G1Presets,
};
