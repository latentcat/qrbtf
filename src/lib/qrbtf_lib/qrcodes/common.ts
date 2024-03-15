import { useTranslations } from "next-intl";
import React from "react";

export interface QrbtfRendererUrlProps {
  url: string
}

export interface QrbtfRendererCommonProps extends React.ComponentPropsWithoutRef<'svg'> {
  correct_level: 'low' | 'medium' | 'quartile' | 'high'
}


type CommonParamsType = CommonControlProps<QrbtfRendererCommonProps> &
  ParamType;

export function useCommonParams() {
  const tCommon = useTranslations("qrcodes.common");
  const commonParams: CommonParamsType[] = [
    {
      type: "select",
      name: "correct_level",
      label: tCommon("correct_level.label"),
      desc: tCommon("correct_level.desc"),
      config: {
        values: [
          {
            value: "low",
            label: "7%",
          },
          {
            value: "medium",
            label: "15%",
          },
          {
            value: "quartile",
            label: "25%",
          },
          {
            value: "high",
            label: "30%",
          },
        ],
      },
    },
  ];
  const commonDefault: QrbtfRendererCommonProps = {
    correct_level: "medium"
  }
  return {
    commonParams,
    commonDefault,
  };
}


export interface QrbtfRendererPositioningProps {
  positioning_point_type: "square" | "circle" | "planet" | "rounded";
  positioning_point_color: string;
}


type PositioningParamsType = CommonControlProps<QrbtfRendererPositioningProps> &
  ParamType;

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
    // {
    //   type: "color",
    //   name: "positioning_point_color",
    //   label: t("contrast.label"),
    //   desc: t("contrast.desc"),
    //   config: {
    //     min: 0,
    //     max: 100,
    //   },
    // },
  ];
  const positioningDefault: QrbtfRendererPositioningProps = {
    positioning_point_type: "square",
    positioning_point_color: "#000000",
  }
  return {
    positioningParams,
    positioningDefault,
  };
}

import { Path } from "react-hook-form";

export interface QrbtfModule<P> {
  renderer: (props: P & { url: string }) => React.ReactNode;
}

export interface CommonControlProps<P> {
  type: ParamTypeLiteralAll;
  name: Path<P>;
  label: string;
  desc?: string;
}

export interface ParamNumberControlProps {
  type: "number";
  config?: {
    default?: number;
    optional?: boolean;
    min?: number;
    max?: number;
    step?: number;
  };
}

export interface ParamBooleanControlProps {
  type: "boolean";
  config?: {
    status: string;
    finished?: boolean;
  };
}

interface SelectValue {
  label: string;
  value: string;
}

export interface ParamSelectControlProps {
  type: "select";
  config?: {
    values: SelectValue[];
  };
}

export type ParamType = (
  | ParamNumberControlProps
  | ParamBooleanControlProps
  | ParamSelectControlProps
) & {
  // uuid: string
};

export type ParamTypeLiteralAll = ParamType["type"];

export type ConfigType<P> = CommonControlProps<P> & ParamType;
