import { useTranslations } from "next-intl";
import { QrbtfRendererA1Props } from "./a1";
import { CommonControlProps } from "./param";
import { useCommonParams } from "./param/common";
import { usePositioningParams } from "./param/position";
import { QrbtfRendererA2Props } from "@/lib/qrbtf_lib/qrcodes/a2";

export type A2PresetKeys = "a2" | "a2c";

export const A2Presets: Record<A2PresetKeys, QrbtfRendererA2Props> = {
  a2: {
    correct_level: "medium",
    positioning_point_type: "rounded",
    positioning_point_color: "#000000",
    content_line_type: "interlock",
    content_point_scale: 0.6,
    content_point_opacity: 1,
    content_point_color: "#000000",
  },
  a2c: {
    correct_level: "medium",
    content_line_type: "cross",
    positioning_point_type: "square",
    positioning_point_color: "#000000",
    content_point_scale: 0.6,
    content_point_opacity: 1,
    content_point_color: "#000000",
  },
};

export function useA2Params() {
  const t = useTranslations("qrcodes.a2");
  const { commonParams } = useCommonParams();
  const { positioningParams } = usePositioningParams();

  const params: CommonControlProps<QrbtfRendererA2Props>[] = [
    ...commonParams,
    ...positioningParams,
    {
      type: "select",
      name: "content_line_type",
      label: t("content_line_type.label"),
      desc: t("content_line_type.desc"),
      config: {
        values: [
          {
            value: "horizontal",
            label: t("horizontal"),
          },
          {
            value: "vertical",
            label: t("vertical"),
          },
          {
            value: "interlock",
            label: t("interlock"),
          },
          {
            value: "radial",
            label: t("radial"),
          },
          {
            value: "tl-br",
            label: t("tl-br"),
          },
          {
            value: "tr-bl",
            label: t("tr-bl"),
          },
          {
            value: "cross",
            label: t("cross"),
          },
        ],
      },
    },
    {
      type: "number",
      name: "content_point_scale",
      label: t("content_point_scale.label"),
      desc: t("content_point_scale.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "number",
      name: "content_point_opacity",
      label: t("content_point_opacity.label"),
      desc: t("content_point_opacity.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "color",
      name: "content_point_color",
      label: t("content_point_color.label"),
      desc: t("content_point_color.desc"),
      config: {},
    },
  ];

  return {
    params,
  };
}
