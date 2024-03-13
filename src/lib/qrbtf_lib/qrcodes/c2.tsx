"use client"

import {QrbtfRendererCommonProps, QrbtfModule} from "@/lib/qrbtf_lib/qrcodes/common";


interface RenderC2OwnProps {
  contrast: number
  brightness: number
}

export type QrbtfRendererC2Props = RenderC2OwnProps & QrbtfRendererCommonProps

function qrbtfRendererC2(props: QrbtfRendererC2Props) {
  return (
    <div>C2: {props.contrast}</div>
  )
}

export const qrbtfModuleC2: QrbtfModule<QrbtfRendererC2Props> = {
  renderer: qrbtfRendererC2
}