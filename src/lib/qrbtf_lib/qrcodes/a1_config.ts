import { useTranslations } from "next-intl";
import { QrbtfRendererA1Props, RenderA1OwnProps } from "./a1";
import { CommonControlProps } from "./param";
import { useCommonParams } from "./param/common";
import { usePositioningParams } from "./param/position";
import usePresetParams from "./param/preset";

export type A1PresetKeys = "a1" | "a1c" | "a1p";

const A1Presets: Record<A1PresetKeys, RenderA1OwnProps> = {
  a1: {
    content_point_type: "square",
    content_point_scale: 1,
    content_point_opacity: 1,
    content_point_color: "#000000",
  },
  a1c: {
    content_point_type: "circle",
    content_point_scale: 0.5,
    content_point_opacity: 0.3,
    content_point_color: "#000000",
  },
  a1p: {
    content_point_type: "circle",
    content_point_scale: 0.8,
    content_point_opacity: 1,
    content_point_color: "#000000",
  },
};

export function useA1Params(defaultPresetKey: A1PresetKeys) {
  const t = useTranslations("qrcodes.a1");
  const { commonParams, commonDefault } = useCommonParams();
  const { positioningParams, positioningDefault } = usePositioningParams();
  const { presetParams, presetDefault } = usePresetParams({
    presets: A1Presets,
    default: defaultPresetKey,
  });

  const params: CommonControlProps<QrbtfRendererA1Props>[] = [
    ...presetParams,
    ...commonParams,
    ...positioningParams,
    {
      type: "select",
      name: "content_point_type",
      label: t("content_point_type.label"),
      desc: t("content_point_type.desc"),
      config: {
        values: [
          {
            value: "square",
            label: t("square"),
          },
          {
            value: "circle",
            label: t("circle"),
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
    defaultValues: {
      ...presetDefault,
      ...commonDefault,
      ...positioningDefault,
      ...A1Presets[defaultPresetKey],
    },
  };
}
