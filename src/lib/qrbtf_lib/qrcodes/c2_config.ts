import { useTranslations } from "next-intl";
import { QrbtfRendererC2Props } from "./c2";
import DefaultBackground from "/public/assets/images/c2_background.inline.jpg";
import { CommonControlProps } from "./param";
import { useCommonParams } from "./param/common";

export type C2PresetKeys = "c2";

export const C2Presets: Record<C2PresetKeys, QrbtfRendererC2Props> = {
  c2: {
    correct_level: "high",
    brightness: 0,
    contrast: 0,
    background: DefaultBackground as unknown as string,
    align_type: "none",
    timing_type: "none",
  },
};

export function useC2Params() {
  const t = useTranslations("qrcodes.c2");
  const { commonParams } = useCommonParams();

  const params: CommonControlProps<QrbtfRendererC2Props>[] = [
    ...commonParams,
    {
      type: "number",
      name: "contrast",
      label: t("contrast.label"),
      desc: t("contrast.desc"),
      config: {
        min: -1,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "number",
      name: "brightness",
      label: t("brightness.label"),
      desc: t("brightness.desc"),
      config: {
        min: -1,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "image",
      name: "background",
      label: t("background.label"),
      desc: t("background.desc"),
      config: {
        buttonLabel: t("background.button_label"),
      },
    },
    {
      type: "select",
      name: "align_type",
      label: t("align_type.label"),
      desc: t("align_type.desc"),
      config: {
        values: [
          {
            label: "无",
            value: "none",
          },
          {
            label: "黑白",
            value: "black-white",
          },
        ],
      },
    },
    {
      type: "select",
      name: "timing_type",
      label: t("timing_type.label"),
      desc: t("timing_type.desc"),
      config: {
        values: [
          {
            label: "无",
            value: "none",
          },
          {
            label: "黑白",
            value: "black-white",
          },
        ],
      },
    },
  ];

  return {
    params,
  };
}
