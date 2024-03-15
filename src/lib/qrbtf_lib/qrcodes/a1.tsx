"use client";

import {
  QrbtfRendererCommonProps,
  QrbtfModule, QrbtfRendererUrlProps, QrbtfRendererPositioningProps,
} from "@/lib/qrbtf_lib/qrcodes/common";
import React, { useMemo } from "react";
import { QRPointType, encode } from "../encoder";

interface RenderA1OwnProps {
  content_point_type: "square" | "circle";
  content_point_scale: number;
  content_point_opacity: number;
  content_point_color: string;
}

export type QrbtfRendererA1Props = RenderA1OwnProps & QrbtfRendererPositioningProps & QrbtfRendererCommonProps;


function QrbtfRendererA1(props: QrbtfRendererA1Props & QrbtfRendererUrlProps) {

  const [table, typeTable] = useMemo(
    () => encode(props.url, {ecc: props.correct_level}),
    [props.url, props.correct_level]
  )
  const points = useMemo(() => {
    const points: React.ReactNode[] = [];

    const contentPointSize = props.content_point_scale * 1.01;
    const contentPointSizeHalf = contentPointSize / 2;
    const contentPointOffset = (1 - contentPointSize) / 2;

    const positioningPointSize = contentPointSize < 1 ? 1 : contentPointSize

    for (let x = 0; x < table.length; x++) {
      for (let y = 0; y < table.length; y++) {
        switch (typeTable[x][y]) {
          case QRPointType.EMPTY:
            continue;
          case QRPointType.POS_CENTER:
            if (props.positioning_point_type === "square") {
              points.push(
                <rect
                  opacity={props.positioning_point_opacity}
                  width={1}
                  height={1}
                  key={points.length}
                  fill={props.positioning_point_color}
                  x={x}
                  y={y}
                />
              )
            } else if (props.positioning_point_type === "circle") {
              points.push(
                <circle
                  key={points.length}
                  fill={props.positioning_point_color}
                  cx={x + 0.5}
                  cy={y + 0.5}
                  r={1.5}
                />
              )
              points.push(
                <circle
                  key={points.length}
                  fill="none"
                  strokeWidth="1"
                  stroke={props.positioning_point_color}
                  cx={x + 0.5}
                  cy={y + 0.5}
                  r={3}
                />
              )
            }
            break;
          case QRPointType.POS_OTHER:
            if (props.positioning_point_type === "square") {
              points.push(
                <rect
                  opacity={props.positioning_point_opacity}
                  width={1}
                  height={1}
                  key={points.length}
                  fill={props.positioning_point_color}
                  x={x}
                  y={y}
                />
              )
            }
            break;
          case QRPointType.ALIGN_CENTER:
          case QRPointType.ALIGN_OTHER:
          case QRPointType.TIMING:
          default:
            if (props.content_point_type === "square") {
              points.push(
                <rect
                  opacity={props.content_point_opacity}
                  width={contentPointSize}
                  height={contentPointSize}
                  key={points.length}
                  fill={props.content_point_color}
                  x={x + contentPointOffset}
                  y={y + contentPointOffset}
                />,
              )
            } else {
              points.push(
                <circle
                  opacity={props.content_point_opacity}
                  r={contentPointSizeHalf}
                  key={points.length}
                  fill={props.content_point_color}
                  cx={x + 0.5}
                  cy={y + 0.5}
                />,
              )
            }
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
