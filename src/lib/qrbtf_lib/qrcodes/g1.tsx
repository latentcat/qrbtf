"use client";

import {
  QrbtfRendererCommonProps,
  QrbtfModule,
  QrbtfRendererUrlProps,
} from "@/lib/qrbtf_lib/qrcodes/common";
import React, { useEffect, useMemo, useState } from "react";
import { QRPointType, encode } from "../encoder";
import { gamma } from "@/lib/image_utils";

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

function* fetcher(props: QrbtfRendererG1Props & QrbtfRendererUrlProps) {
  yield 1;
}

function QrbtfVisualizerG1(props: { data: any }) {
  return <div>{props && JSON.stringify(props.data, null, 2)}</div>;
}

export const qrbtfModuleG1: QrbtfModule<QrbtfRendererG1Props> = {
  type: "api_fetcher",
  fetcher: fetcher,
  visualizer: QrbtfVisualizerG1,
};
