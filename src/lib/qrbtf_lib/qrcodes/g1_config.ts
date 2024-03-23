import { useTranslations } from "next-intl";
import { CommonControlProps } from "./param";
import { QrbtfRendererG1Props } from "./g1";

export type G1PresetKeys = "g1";

export const G1Presets: Record<G1PresetKeys, QrbtfRendererG1Props> = {
  g1: {
    task_type: "qrcode",
    prompt: "",
    negative_prompt: "",
    seed: -1,
    control_strength: 1,
    prompt_tuning: true,
    image_restoration: false,
    restoration_rate: 0,
    size: "1152",
    padding_ratio: 0.2,
    correct_level: "15",
    anchor_style: "square",
  },
};

export function useG1Params() {
  const t = useTranslations("qrcodes.g1");

  const params: CommonControlProps<QrbtfRendererG1Props>[] = [
    {
      type: "text",
      name: "prompt",
      label: t("prompt.label"),
      desc: t("prompt.desc"),
      config: {
        placeholder: t("prompt.placeholder"),
      },
    },
    {
      type: "text",
      name: "negative_prompt",
      label: t("negative_prompt.label"),
      desc: t("negative_prompt.desc"),
      config: {
        placeholder: t("negative_prompt.placeholder"),
      },
    },
    {
      type: "number",
      name: "seed",
      label: t("seed.label"),
      desc: t("seed.desc"),
      config: {
        min: -1,
        max: 9999,
      },
    },
    {
      type: "number",
      name: "control_strength",
      label: t("control_strength.label"),
      desc: t("control_strength.desc"),
      config: {
        min: 0.5,
        max: 1.5,
        step: 0.01,
      },
    },
    {
      type: "boolean",
      name: "prompt_tuning",
      label: t("prompt_tuning.label"),
      desc: t("prompt_tuning.desc"),
    },
    {
      type: "number",
      name: "restoration_rate",
      label: t("restoration_rate.label"),
      desc: t("restoration_rate.desc"),
      config: {
        min: 0.0,
        max: 0.5,
        step: 0.01,
      },
    },
    {
      type: "select",
      name: "size",
      label: t("size.label"),
      desc: t("size.desc"),
      config: {
        values: [
          {
            value: "1152",
            label: "1152px",
          },
          {
            value: "1536",
            label: "1536px",
          },
        ],
      },
    },
    {
      type: "number",
      name: "padding_ratio",
      label: t("padding_ratio.label"),
      desc: t("padding_ratio.desc"),
      config: {
        min: 0.0,
        max: 0.5,
        step: 0.01,
      },
    },
    {
      type: "select",
      name: "correct_level",
      label: t("correct_level.label"),
      desc: t("correct_level.desc"),
      config: {
        values: [
          {
            value: "7",
            label: "7%",
          },
          {
            value: "15",
            label: "15%",
          },
          {
            value: "25",
            label: "25%",
          },
          {
            value: "30",
            label: "30%",
          },
        ],
      },
    },
    {
      type: "select",
      name: "anchor_style",
      label: t("anchor_style.label"),
      desc: t("anchor_style.desc"),
      config: {
        values: [
          {
            value: "square",
            label: t("anchor_style.square"),
          },
          {
            value: "circle",
            label: t("anchor_style.circle"),
          },
          {
            value: "minimal",
            label: t("anchor_style.minimal"),
          },
        ],
      },
    },
  ];

  return {
    params,
  };
}
