import { useTranslations } from "next-intl";
import { CommonControlProps } from ".";

export interface QrbtfRendererPositioningProps {
  positioning_point_type: "square" | "circle" | "planet" | "rounded";
  positioning_point_color: string;
}

type PositioningParamsType = CommonControlProps<QrbtfRendererPositioningProps>;

export function usePositioningParams() {
  const t = useTranslations("qrcodes.positioning");
  const positioningParams: PositioningParamsType[] = [
    {
      type: "select",
      name: "positioning_point_type",
      label: t("positioning_point_type.label"),
      desc: t("positioning_point_type.desc"),
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
          {
            value: "planet",
            label: t("planet"),
          },
          {
            value: "rounded",
            label: t("rounded"),
          },
        ],
      },
    },
    {
      type: "color",
      name: "positioning_point_color",
      label: t("positioning_point_color.label"),
      desc: t("positioning_point_color.desc"),
      config: {},
    },
  ];
  return {
    positioningParams,
  };
}
