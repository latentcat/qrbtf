import { useTranslations } from "next-intl";
import { CommonControlProps } from "./param";
import { useCommonParams } from "./param/common";
import { QrbtfRendererSp1Props } from "./sp1";

export type Sp1PresetKeys = "sp1";

export const Sp1Presets: Record<Sp1PresetKeys, QrbtfRendererSp1Props> = {
  sp1: {
    correct_level: "medium",
    content_stroke_width: 0.7,
    content_x_stroke_width: 0.7,
    positioning_stroke_width: 0.9,
    positioning_point_type: "dsj",
  },
};

export function useSp1Params() {
  const t = useTranslations("qrcodes.sp1");
  const { commonParams } = useCommonParams();

  const params: CommonControlProps<QrbtfRendererSp1Props>[] = [
    ...commonParams,
    {
      type: "number",
      name: "content_stroke_width",
      label: t("content_stroke_width.label"),
      desc: t("content_stroke_width.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "number",
      name: "content_x_stroke_width",
      label: t("content_x_stroke_width.label"),
      desc: t("content_x_stroke_width.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "number",
      name: "positioning_stroke_width",
      label: t("positioning_stroke_width.label"),
      desc: t("positioning_stroke_width.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "select",
      name: "positioning_point_type",
      label: t("positioning_point_type.label"),
      desc: t("positioning_point_type.desc"),
      config: {
        values: [
          {
            value: "dsj",
            label: t("dsj"),
          },
          {
            value: "square",
            label: t("square"),
          },
        ],
      },
    },
  ];

  return {
    params,
  };
}
