import { useTranslations } from "next-intl";
import React from "react";

export interface QrbtfRendererCommonProps extends React.ComponentPropsWithoutRef<'svg'> {
  correct_level: "7" | "15" | "25" | "30";
}

type CommonParamsType = CommonControlProps<QrbtfRendererCommonProps> &
  ParamType;

export function useCommonParams(): CommonParamsType[] {
  const tCommon = useTranslations("qrcodes.common");
  return [
    {
      type: "number",
      name: "correct_level",
      label: tCommon("correct_level.label"),
      desc: tCommon("correct_level.desc"),
      config: {
        min: 0,
        max: 100,
      },
    },
  ];
}

import { Path } from "react-hook-form";

export interface QrbtfModule<P> {
  renderer: (props: P) => React.ReactNode;
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

export type ParamType = (ParamNumberControlProps | ParamBooleanControlProps) & {
  // uuid: string
};

export type ParamTypeLiteralAll = ParamType["type"];

export type ConfigType<P> = CommonControlProps<P> & ParamType;
