import { useTranslations } from "next-intl";
import React from "react";

export interface QrbtfRendererCommonProps extends React.ComponentPropsWithoutRef<'svg'> {
  correct_level: 'low' | 'medium' | 'quartile' | 'high'
}

export interface QrbtfRendererCommonPropsWithURL extends QrbtfRendererCommonProps {
  url: string
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
