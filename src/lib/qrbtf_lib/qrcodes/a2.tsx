"use client";

import React, { useMemo } from "react";
import { QRPointType, encode } from "../encoder";
import { sq25 } from "@/lib/qrbtf_lib/constants";
import { QrbtfRendererPositioningProps } from "./param/position";
import { QrbtfModule, QrbtfRendererCommonProps, RendererProps } from "./param";
import { A2Presets } from "@/lib/qrbtf_lib/qrcodes/a2_config";
import { rand } from "@/lib/utils";

export interface RenderA2OwnProps {
  content_line_type:
    | "horizontal"
    | "vertical"
    | "interlock"
    | "radial"
    | "tl-br"
    | "tr-bl"
    | "cross";
  content_point_scale: number;
  content_point_opacity: number;
  content_point_color: string;
}

export type QrbtfRendererA2Props = RenderA2OwnProps &
  QrbtfRendererPositioningProps &
  QrbtfRendererCommonProps;

function QrbtfRendererA2(props: RendererProps<QrbtfRendererA2Props>) {
  const [table, typeTable] = useMemo(
    () => encode(props.url, { ecc: props.correct_level }),
    [props.url, props.correct_level],
  );
  const points = useMemo(() => {
    const points: React.ReactNode[] = [];

    const nCount = table.length;

    const contentPointSize = props.content_point_scale * 1.01;
    const contentPointSizeHalf = contentPointSize / 2;
    const contentPointOffset = (1 - contentPointSize) / 2;

    const positioningPointSize = contentPointSize < 1 ? 1 : contentPointSize;

    const opacity = props.content_point_opacity;
    const size = props.content_point_scale;
    const otherColor = props.content_point_color;

    let type = props.content_line_type;

    let available: boolean[][] = [];
    let ava2: boolean[][] = [];
    for (let x = 0; x < nCount; x++) {
      available[x] = [];
      ava2[x] = [];
      for (let y = 0; y < nCount; y++) {
        available[x][y] = true;
        ava2[x][y] = true;
      }
    }

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
            if (type === "horizontal") {
              if (x === 0 || (x > 0 && (!table[x - 1][y] || !ava2[x - 1][y]))) {
                let start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && x + end < nCount) {
                  if (table[x + end][y] && ava2[x + end][y]) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[x + i][y] = false;
                    available[x + i][y] = false;
                  }
                  points.push(
                    <line
                      opacity={opacity}
                      x1={x + 0.5}
                      y1={y + 0.5}
                      x2={x + end - start - 0.5}
                      y2={y + 0.5}
                      strokeWidth={size}
                      stroke={otherColor}
                      strokeLinecap="round"
                      key={id++}
                    />,
                  );
                }
              }
              if (available[x][y]) {
                points.push(
                  <circle
                    opacity={opacity}
                    r={size / 2}
                    key={id++}
                    fill={otherColor}
                    cx={x + 0.5}
                    cy={y + 0.5}
                  />,
                );
              }
            }

            if (type === "vertical") {
              if (y === 0 || (y > 0 && (!table[x][y - 1] || !ava2[x][y - 1]))) {
                let start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && y + end < nCount) {
                  if (table[x][y + end] && ava2[x][y + end]) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[x][y + i] = false;
                    available[x][y + i] = false;
                  }
                  points.push(
                    <line
                      opacity={opacity}
                      x1={x + 0.5}
                      y1={y + 0.5}
                      x2={x + 0.5}
                      y2={y + end - start - 1 + 0.5}
                      strokeWidth={size}
                      stroke={otherColor}
                      strokeLinecap="round"
                      key={id++}
                    />,
                  );
                }
              }
              if (available[x][y]) {
                points.push(
                  <circle
                    opacity={opacity}
                    r={size / 2}
                    key={id++}
                    fill={otherColor}
                    cx={x + 0.5}
                    cy={y + 0.5}
                  />,
                );
              }
            }
            if (type === "interlock") {
              if (y === 0 || (y > 0 && (!table[x][y - 1] || !ava2[x][y - 1]))) {
                let start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && y + end < nCount) {
                  if (
                    table[x][y + end] &&
                    ava2[x][y + end] &&
                    end - start <= 3
                  ) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[x][y + i] = false;
                    available[x][y + i] = false;
                  }
                  points.push(
                    <line
                      opacity={opacity}
                      x1={x + 0.5}
                      y1={y + 0.5}
                      x2={x + 0.5}
                      y2={y + end - start - 1 + 0.5}
                      strokeWidth={size}
                      stroke={otherColor}
                      strokeLinecap="round"
                      key={id++}
                    />,
                  );
                }
              }
              if (x === 0 || (x > 0 && (!table[x - 1][y] || !ava2[x - 1][y]))) {
                let start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && x + end < nCount) {
                  if (
                    table[x + end][y] &&
                    ava2[x + end][y] &&
                    end - start <= 3
                  ) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[x + i][y] = false;
                    available[x + i][y] = false;
                  }
                  points.push(
                    <line
                      opacity={opacity}
                      x1={x + 0.5}
                      y1={y + 0.5}
                      x2={x + end - start - 0.5}
                      y2={y + 0.5}
                      strokeWidth={size}
                      stroke={otherColor}
                      strokeLinecap="round"
                      key={id++}
                    />,
                  );
                }
              }
              if (available[x][y]) {
                points.push(
                  <circle
                    opacity={opacity}
                    r={size / 2}
                    key={id++}
                    fill={otherColor}
                    cx={x + 0.5}
                    cy={y + 0.5}
                  />,
                );
              }
            }

            if (type === "radial") {
              if (x > y !== x + y < nCount) {
                if (
                  y === 0 ||
                  (y > 0 && (!table[x][y - 1] || !ava2[x][y - 1]))
                ) {
                  let start = 0;
                  let end = 0;
                  let ctn = true;
                  while (ctn && y + end < nCount) {
                    if (
                      table[x][y + end] &&
                      ava2[x][y + end] &&
                      end - start <= 3
                    ) {
                      end++;
                    } else {
                      ctn = false;
                    }
                  }
                  if (end - start > 1) {
                    for (let i = start; i < end; i++) {
                      ava2[x][y + i] = false;
                      available[x][y + i] = false;
                    }
                    points.push(
                      <line
                        opacity={opacity}
                        x1={x + 0.5}
                        y1={y + 0.5}
                        x2={x + 0.5}
                        y2={y + end - start - 1 + 0.5}
                        strokeWidth={size}
                        stroke={otherColor}
                        strokeLinecap="round"
                        key={id++}
                      />,
                    );
                  }
                }
              } else {
                if (
                  x === 0 ||
                  (x > 0 && (!table[x - 1][y] || !ava2[x - 1][y]))
                ) {
                  let start = 0;
                  let end = 0;
                  let ctn = true;
                  while (ctn && x + end < nCount) {
                    if (
                      table[x + end][y] &&
                      ava2[x + end][y] &&
                      end - start <= 3
                    ) {
                      end++;
                    } else {
                      ctn = false;
                    }
                  }
                  if (end - start > 1) {
                    for (let i = start; i < end; i++) {
                      ava2[x + i][y] = false;
                      available[x + i][y] = false;
                    }
                    points.push(
                      <line
                        opacity={opacity}
                        x1={x + 0.5}
                        y1={y + 0.5}
                        x2={x + end - start - 0.5}
                        y2={y + 0.5}
                        strokeWidth={size}
                        stroke={otherColor}
                        strokeLinecap="round"
                        key={id++}
                      />,
                    );
                  }
                }
              }
              if (available[x][y]) {
                points.push(
                  <circle
                    opacity={opacity}
                    r={size / 2}
                    key={id++}
                    fill={otherColor}
                    cx={x + 0.5}
                    cy={y + 0.5}
                  />,
                );
              }
            }
            if (type === "tl-br") {
              if (
                y === 0 ||
                x === 0 ||
                (y > 0 &&
                  x > 0 &&
                  (!table[x - 1][y - 1] || !ava2[x - 1][y - 1]))
              ) {
                let start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && y + end < nCount && x + end < nCount) {
                  if (table[x + end][y + end] && ava2[x + end][y + end]) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[x + i][y + i] = false;
                    available[x + i][y + i] = false;
                  }
                  points.push(
                    <line
                      opacity={opacity}
                      x1={x + 0.5}
                      y1={y + 0.5}
                      x2={x + end - start - 1 + 0.5}
                      y2={y + end - start - 1 + 0.5}
                      strokeWidth={size}
                      stroke={otherColor}
                      strokeLinecap="round"
                      key={id++}
                    />,
                  );
                }
              }
              if (available[x][y]) {
                points.push(
                  <circle
                    opacity={opacity}
                    r={size / 2}
                    key={id++}
                    fill={otherColor}
                    cx={x + 0.5}
                    cy={y + 0.5}
                  />,
                );
              }
            }
            if (type === "tr-bl") {
              if (
                x === 0 ||
                y === nCount - 1 ||
                (x > 0 &&
                  y < nCount - 1 &&
                  (!table[x - 1][y + 1] || !ava2[x - 1][y + 1]))
              ) {
                let start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && x + end < nCount && y - end >= 0) {
                  if (table[x + end][y - end] && available[x + end][y - end]) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[x + i][y - i] = false;
                    available[x + i][y - i] = false;
                  }
                  points.push(
                    <line
                      opacity={opacity}
                      x1={x + 0.5}
                      y1={y + 0.5}
                      x2={x + (end - start - 1) + 0.5}
                      y2={y - (end - start - 1) + 0.5}
                      strokeWidth={size}
                      stroke={otherColor}
                      strokeLinecap="round"
                      key={id++}
                    />,
                  );
                }
              }
              if (available[x][y]) {
                points.push(
                  <circle
                    opacity={opacity}
                    r={size / 2}
                    key={id++}
                    fill={otherColor}
                    cx={x + 0.5}
                    cy={y + 0.5}
                  />,
                );
              }
            }
            if (type === "cross") {
              if (
                x === 0 ||
                y === nCount - 1 ||
                (x > 0 &&
                  y < nCount - 1 &&
                  (!table[x - 1][y + 1] || !ava2[x - 1][y + 1]))
              ) {
                let start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && x + end < nCount && y - end >= 0) {
                  if (table[x + end][y - end] && ava2[x + end][y - end]) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[x + i][y - i] = false;
                  }
                  points.push(
                    <line
                      opacity={opacity}
                      x1={x + 0.5}
                      y1={y + 0.5}
                      x2={x + (end - start - 1) + 0.5}
                      y2={y - (end - start - 1) + 0.5}
                      strokeWidth={(size / 2) * rand(0.3, 1)}
                      stroke={otherColor}
                      strokeLinecap="round"
                      key={id++}
                    />,
                  );
                }
              }
              if (
                y === 0 ||
                x === 0 ||
                (y > 0 &&
                  x > 0 &&
                  (!table[x - 1][y - 1] || !available[x - 1][y - 1]))
              ) {
                let start = 0;
                let end = 0;
                let ctn = true;
                while (ctn && y + end < nCount && x + end < nCount) {
                  if (table[x + end][y + end] && available[x + end][y + end]) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    available[x + i][y + i] = false;
                  }
                  points.push(
                    <line
                      opacity={opacity}
                      x1={x + 0.5}
                      y1={y + 0.5}
                      x2={x + end - start - 1 + 0.5}
                      y2={y + end - start - 1 + 0.5}
                      strokeWidth={(size / 2) * rand(0.3, 1)}
                      stroke={otherColor}
                      strokeLinecap="round"
                      key={id++}
                    />,
                  );
                }
              }
              points.push(
                <circle
                  opacity={opacity}
                  r={0.5 * rand(0.33, 0.9)}
                  key={id++}
                  fill={otherColor}
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
    props.positioning_point_color,
    props.content_line_type,
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

export const qrbtfModuleA2: QrbtfModule<QrbtfRendererA2Props> = {
  type: "svg_renderer",
  presets: A2Presets,
  renderer: QrbtfRendererA2,
};
