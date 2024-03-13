
import React from "react";


export interface QrbtfRendererCommonProps {
  correct_level: "7" | "15" | "25" | "30"
}


type CommonParamsType = CommonControlProps<QrbtfRendererCommonProps> & ParamType

type GetCommonParamsProps = Record<keyof QrbtfRendererCommonProps, {
  label: string;
  desc: string
}>

export function getCommonParams(props: GetCommonParamsProps): CommonParamsType[] {
  return [
    {
      type: "number",
      name: "correct_level",
      label: props.correct_level.label,
      desc:  props.correct_level.desc,
      config: {
        min: 0,
        max: 100,
      }
    },
  ]
}


import {Path} from "react-hook-form";

export interface QrbtfModule<P> {
  renderer: (props: P) => React.ReactNode
}


export interface CommonControlProps<P> {
  type: ParamTypeLiteralAll
  name: Path<P>
  label: string
  desc?: string
}

export interface ParamNumberControlProps {
  type: 'number'
  config?: {
    default?: number
    optional?: boolean
    min?: number
    max?: number
    step?: number
  }
}

export interface ParamBooleanControlProps {
  type: 'boolean'
  config?: {
    status: string
    finished?: boolean
  }
}


export type ParamType = (ParamNumberControlProps | ParamBooleanControlProps) & {
  // uuid: string
};

export type ParamTypeLiteralAll = ParamType['type'];

export type ConfigType<P> = CommonControlProps<P> & ParamType