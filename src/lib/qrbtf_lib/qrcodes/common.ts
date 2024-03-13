
import React from "react";


export interface QrbtfRendererCommonProps {
  correctLevel: "7" | "15" | "25" | "30"
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