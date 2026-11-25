"use client";

import React, { useEffect, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { opacityAnimations, transitionMd } from "@/lib/animations";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { trackEvent } from "@/components/TrackComponents";
import { flattenObject } from "@/lib/utils";
import type { QrbtfModule, QrbtfVisualizerProps } from "./param";
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

function GenerationWait({
  startedAt,
  status,
}: {
  startedAt: number;
  status: "submitting" | "pending" | "processing";
}) {
  const t = useTranslations("qrcodes.g1.wait");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const updateElapsed = () => {
      setElapsedSeconds(
        Math.max(0, Math.floor((Date.now() - startedAt) / 1000)),
      );
    };
    updateElapsed();
    const timer = window.setInterval(updateElapsed, 1000);
    return () => window.clearInterval(timer);
  }, [startedAt]);

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return (
    <>
      <Loader2
        className="h-5 w-5 motion-safe:animate-spin"
        aria-hidden="true"
      />
      <p role="status" className="text-sm font-medium">
        {t(status)}
      </p>
      <p role="timer" className="text-sm tabular-nums text-muted-foreground">
        {minutes > 0
          ? t("elapsed_minutes", { minutes, seconds })
          : t("elapsed_seconds", { seconds })}
      </p>
      {status !== "submitting" && elapsedSeconds >= 20 && (
        <p
          role="status"
          className="max-w-[18rem] text-sm text-muted-foreground"
        >
          {t("long_wait")}
        </p>
      )}
    </>
  );
}

function QrbtfVisualizerG1({ data, startedAt }: QrbtfVisualizerProps) {
  const t = useTranslations("qrcodes.g1.wait");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const waiting = startedAt !== null;
  const status =
    data?.status === "pending" || data?.status === "processing"
      ? data.status
      : "submitting";

  useEffect(() => {
    if (data?.status === "completed") {
      setImageUrl(data.download_url);
      trackEvent("submit_fetcher_result", flattenObject(data));
    } else if (data?.status === "failed") {
      toast.error(t("failed"));
    }
  }, [data, t]);

  return (
    <div>
      <div
        id="output_image"
        className="aspect-square flex flex-col items-center justify-center"
      >
        {!waiting && <PhotoIcon className="w-12 h-12 opacity-10" />}
      </div>
      <AnimatePresence>
        {startedAt !== null && (
          <motion.div
            key="generation-wait"
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background px-4 text-center"
            variants={opacityAnimations}
            transition={transitionMd}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <GenerationWait
              key={startedAt}
              startedAt={startedAt}
              status={status}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute top-0 left-0 w-full h-full">
        <AnimatePresence>
          {!waiting && imageUrl && (
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
