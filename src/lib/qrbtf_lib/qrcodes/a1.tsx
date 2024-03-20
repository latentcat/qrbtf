"use client";

import React, { useMemo } from "react";
import { QRPointType, encode } from "../encoder";
import { sq25 } from "@/lib/qrbtf_lib/constants";
import { QrbtfRendererPositioningProps } from "./param/position";
import { QrbtfModule, QrbtfRendererCommonProps, RendererProps } from "./param";
import { A1PresetKeys, A1Presets } from "./a1_config";

export interface RenderA1OwnProps {
  content_point_type: "square" | "circle";
  content_point_scale: number;
  content_point_opacity: number;
  content_point_color: string;
}

export type QrbtfRendererA1Props = RenderA1OwnProps &
  QrbtfRendererPositioningProps &
  QrbtfRendererCommonProps;

function QrbtfRendererA1(props: RendererProps<QrbtfRendererA1Props>) {
  const [table, typeTable] = useMemo(
    () => encode(props.url, { ecc: props.correct_level }),
    [props.url, props.correct_level],
  );
  const points = useMemo(() => {
    const points: React.ReactNode[] = [];

    const contentPointSize = props.content_point_scale * 1.01;
    const contentPointSizeHalf = contentPointSize / 2;
    const contentPointOffset = (1 - contentPointSize) / 2;

    const positioningPointSize = contentPointSize < 1 ? 1 : contentPointSize;

    let id = 0;
    const vw = [3, -3];
    const vh = [3, -3];

    for (let y = 0; y < table.length; y++) {
      for (let x = 0; x < table.length; x++) {
        if (!table[x][y]) continue;
        switch (typeTable[x][y]) {
          case QRPointType.POS_CENTER:
            if (props.positioning_point_type === "square") {
              points.push(
                <rect
                  key={id++}
                  fill={props.positioning_point_color}
                  x={x + 0.5 - 1.5}
                  y={y + 0.5 - 1.5}
                  width={3}
                  height={3}
                />,
              );
              points.push(
                <rect
                  key={id++}
                  fill="none"
                  strokeWidth="1"
                  stroke={props.positioning_point_color}
                  x={x + 0.5 - 3}
                  y={y + 0.5 - 3}
                  width={6}
                  height={6}
                />,
              );
            } else if (props.positioning_point_type === "circle") {
              points.push(
                <circle
                  key={id++}
                  fill={props.positioning_point_color}
                  cx={x + 0.5}
                  cy={y + 0.5}
                  r={1.5}
                />,
              );
              points.push(
                <circle
                  key={id++}
                  fill="none"
                  strokeWidth="1"
                  stroke={props.positioning_point_color}
                  cx={x + 0.5}
                  cy={y + 0.5}
                  r={3}
                />,
              );
            } else if (props.positioning_point_type === "planet") {
              points.push(
                <circle
                  key={id++}
                  fill={props.positioning_point_color}
                  cx={x + 0.5}
                  cy={y + 0.5}
                  r={1.5}
                />,
              );
              points.push(
                <circle
                  key={id++}
                  fill="none"
                  strokeWidth="0.15"
                  strokeDasharray="0.5,0.5"
                  stroke={props.positioning_point_color}
                  cx={x + 0.5}
                  cy={y + 0.5}
                  r={3}
                />,
              );
              for (let w = 0; w < vw.length; w++) {
                points.push(
                  <circle
                    key={id++}
                    fill={props.positioning_point_color}
                    cx={x + vw[w] + 0.5}
                    cy={y + 0.5}
                    r={0.5}
                  />,
                );
              }
              for (let h = 0; h < vh.length; h++) {
                points.push(
                  <circle
                    key={id++}
                    fill={props.positioning_point_color}
                    cx={x + 0.5}
                    cy={y + vh[h] + 0.5}
                    r={0.5}
                  />,
                );
              }
            } else if (props.positioning_point_type === "rounded") {
              points.push(
                <circle
                  key={id++}
                  fill={props.positioning_point_color}
                  cx={x + 0.5}
                  cy={y + 0.5}
                  r={1.5}
                />,
              );
              points.push(
                <path
                  key={id++}
                  d={sq25}
                  stroke={props.positioning_point_color}
                  strokeWidth={(100 / 6) * (1 - (1 - contentPointSize) * 0.75)}
                  fill="none"
                  transform={
                    "translate(" +
                    String(x - 2.5) +
                    "," +
                    String(y - 2.5) +
                    ") " +
                    "scale(" +
                    String(6 / 100) +
                    "," +
                    String(6 / 100) +
                    ")"
                  }
                />,
              );
            }
            break;
          case QRPointType.POS_OTHER:
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
                  key={id++}
                  fill={props.content_point_color}
                  x={x + contentPointOffset}
                  y={y + contentPointOffset}
                />,
              );
            } else {
              points.push(
                <circle
                  opacity={props.content_point_opacity}
                  r={contentPointSizeHalf}
                  key={id++}
                  fill={props.content_point_color}
                  cx={x + 0.5}
                  cy={y + 0.5}
                />,
              );
            }
        }
      }
    }
    return points;
  }, [
    props.content_point_scale,
    props.positioning_point_type,
    props.content_point_type,
    props.positioning_point_color,
    props.content_point_opacity,
    props.content_point_color,
    table,
    typeTable,
  ]);

  const viewBox = `${-table.length / 5} ${-table.length / 5} ${
    (7 * table.length) / 5
  } ${(7 * table.length) / 5}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={viewBox}
      {...props}
    >
      {points}
    </svg>
  );
}

export const qrbtfModuleA1: QrbtfModule<QrbtfRendererA1Props> = {
  type: "svg_renderer",
  presets: A1Presets,
  renderer: QrbtfRendererA1,
};
