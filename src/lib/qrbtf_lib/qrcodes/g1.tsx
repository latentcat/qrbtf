"use client";

import React, { useEffect, useState } from "react";
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
import PixelCard from "@/components/vfx/pixel-grid";
import { ImageResponse } from "./hooks/use_gen_ai_image";

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

interface ProgressType {
  value: number;
  status: string;
}

function QrbtfVisualizerG1(props: { data: any }) {
  const [progress, setProgress] = useState<ProgressType | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const resp: ImageResponse | null = props.data;

    if (resp === null) return;

    switch (resp.status) {
      case "pending":
        if (!resp.task_id) {
          setProgress({
            value: 0,
            status: "Requesting",
          });
        } else {
          setProgress({
            value: 0.4,
            status: "Consumed",
          });
        }
        break;
      case "processing":
        setProgress({
          value: 0.6,
          status: "Generate start",
        });
        break;
      case "completed":
        setProgress({
          value: 1,
          status: "Generate complete",
        });
        break;
      case "failed":
        setProgress(null);
        toast.error("Server error", {
          description: "",
        });
        break;
    }

    // 得到结果，结束，设置图像 url
    if (resp.status === "completed") {
      setImageUrl(resp.download_url);
      setProgress(null);
      trackEvent("submit_fetcher_result", flattenObject(resp));
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
            <>
              <div className="absolute w-full h-full top-0 left-0">
                <PixelCard isActive={!!progress} className="w-full h-full">
                  {""}
                </PixelCard>
              </div>
              <motion.div
                key="progress-and-status"
                className="w-full h-full flex flex-col items-center justify-center gap-2 bg-background"
                variants={opacityAnimations}
                transition={transitionMd}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Progress value={progress.value} className="w-[30%] h-2" />
                <div className="opacity-30 text-sm hidden">
                  {progress.status}
                </div>
              </motion.div>
            </>
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
              <div className="absolute -z-10 top-0 left-0 w-full h-full flex items-center justify-center text-sm opacity-30 hidden">
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
  visualizer: QrbtfVisualizerG1,
  presets: G1Presets,
};
