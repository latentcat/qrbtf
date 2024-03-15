"use client";

import {
  QrbtfRendererCommonProps,
  QrbtfModule, QrbtfRendererCommonPropsWithURL,
} from "@/lib/qrbtf_lib/qrcodes/common";
import React, { useMemo } from "react";
import { QRPointType, encode } from "../encoder";

interface RenderA1OwnProps {
  content_point_type: "square" | "circle"
  content_point_scale: number
  content_point_opacity: number
  content_point_color: string
}

export type QrbtfRendererA1Props = RenderA1OwnProps & QrbtfRendererCommonPropsWithURL;

function QrbtfRendererA1(props: QrbtfRendererA1Props) {

  const [table, typeTable] = useMemo(
    () => encode(props.url, {ecc: props.correct_level}),
    [props.url, props.correct_level]
  )
  const points = useMemo(() => {
    const points: React.ReactNode[] = [];

    const contentPointSize = props.content_point_scale
    const contentPointOffset = (1 - props.content_point_scale) / 2

    for (let x = 0; x < table.length; x++) {
      for (let y = 0; y < table.length; y++) {
        switch (typeTable[x][y]) {
          case QRPointType.EMPTY:
            continue;
          case QRPointType.POS_CENTER:
            points.push(
              <rect
                width={1}
                height={1}
                key={points.length}
                fill="#00FF00"
                x={x}
                y={y}
              />
            );
            break;
          case QRPointType.POS_OTHER:
            points.push(
              <rect
                width={1}
                height={1}
                key={points.length}
                fill="#FF0000"
                x={x}
                y={y}
              />
            );
            break;
          case QRPointType.ALIGN_CENTER:
          case QRPointType.ALIGN_OTHER:
          case QRPointType.TIMING:
          default:
            points.push(
              <rect
                opacity={props.content_point_opacity}
                width={contentPointSize}
                height={contentPointSize}
                key={points.length}
                fill={props.content_point_color}
                x={x + contentPointOffset}
                y={y + contentPointOffset}
              />
            );
        }
      }
    }
    return points;
  }, [table.length, typeTable, props]);

  const viewBox = `${-table.length / 5} ${-table.length / 5} ${
    (7 * table.length) / 5
  } ${(7 * table.length) / 5}`;

  return (
    <svg viewBox={viewBox} {...props}>
      {points}
    </svg>
  );
}

export const qrbtfModuleA1: QrbtfModule<QrbtfRendererA1Props> = {
  renderer: QrbtfRendererA1,
};
