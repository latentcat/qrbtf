"use client";

import React, { useMemo } from "react";
import { QRPointType, encode } from "../encoder";
import { QrbtfModule, QrbtfRendererCommonProps, RendererProps } from "./param";
import { Sp1Presets } from "./sp1_config";

interface RenderSp1OwnProps {
  content_stroke_width: number;
  content_x_stroke_width: number;
  positioning_stroke_width: number;
  positioning_point_type: "dsj" | "square";
}

export type QrbtfRendererSp1Props = RenderSp1OwnProps &
  QrbtfRendererCommonProps;

function QrbtfRendererSp1(props: RendererProps<QrbtfRendererSp1Props>) {
  const [table, typeTable] = useMemo(
    () => encode(props.url, { ecc: props.correct_level }),
    [props.url, props.correct_level],
  );
  const points = useMemo(() => {
    const points: React.ReactNode[] = [];

    const nCount = table.length;

    const posColor = "#0B2D97";
    const posW = props.positioning_stroke_width;

    const xmarkColor = "#0B2D97";
    const xmarkW = props.content_x_stroke_width;

    const contentColor = "#E02020";
    const contentW = props.content_stroke_width;

    const importantColor = "#F6B506";

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

    const g1 = [];
    const g2 = [];

    for (let y = 0; y < nCount; y++) {
      for (let x = 0; x < nCount; x++) {
        if (!table[x][y]) continue;
        switch (typeTable[x][y]) {
          case QRPointType.POS_CENTER:
            if (props.positioning_point_type === "square") {
              points.push(
                <rect
                  key={id++}
                  fill={posColor}
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
                  stroke={posColor}
                  x={x + 0.5 - 3}
                  y={y + 0.5 - 3}
                  width={6}
                  height={6}
                />,
              );
            } else if (props.positioning_point_type === "dsj") {
              points.push(
                <rect
                  width={3 - (1 - posW)}
                  height={3 - (1 - posW)}
                  key={id++}
                  fill={posColor}
                  x={x - 1 + (1 - posW) / 2}
                  y={y - 1 + (1 - posW) / 2}
                />,
              );
              points.push(
                <rect
                  width={posW}
                  height={3 - (1 - posW)}
                  key={id++}
                  fill={posColor}
                  x={x - 3 + (1 - posW) / 2}
                  y={y - 1 + (1 - posW) / 2}
                />,
              );
              points.push(
                <rect
                  width={posW}
                  height={3 - (1 - posW)}
                  key={id++}
                  fill={posColor}
                  x={x + 3 + (1 - posW) / 2}
                  y={y - 1 + (1 - posW) / 2}
                />,
              );
              points.push(
                <rect
                  width={3 - (1 - posW)}
                  height={posW}
                  key={id++}
                  fill={posColor}
                  x={x - 1 + (1 - posW) / 2}
                  y={y - 3 + (1 - posW) / 2}
                />,
              );
              points.push(
                <rect
                  width={3 - (1 - posW)}
                  height={posW}
                  key={id++}
                  fill={posColor}
                  x={x - 1 + (1 - posW) / 2}
                  y={y + 3 + (1 - posW) / 2}
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
            if (
              available[x][y] &&
              ava2[x][y] &&
              x < nCount - 2 &&
              y < nCount - 2
            ) {
              let ctn = true;
              for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                  if (ava2[x + i][y + j] === false) {
                    ctn = false;
                  }
                }
              }
              if (
                ctn &&
                table[x + 2][y] &&
                table[x + 1][y + 1] &&
                table[x][y + 2] &&
                table[x + 2][y + 2]
              ) {
                g1.push(
                  <line
                    key={id++}
                    x1={x + xmarkW / Math.sqrt(8)}
                    y1={y + xmarkW / Math.sqrt(8)}
                    x2={x + 3 - xmarkW / Math.sqrt(8)}
                    y2={y + 3 - xmarkW / Math.sqrt(8)}
                    fill="none"
                    stroke={xmarkColor}
                    strokeWidth={xmarkW}
                  />,
                );
                g1.push(
                  <line
                    key={id++}
                    x1={x + 3 - xmarkW / Math.sqrt(8)}
                    y1={y + xmarkW / Math.sqrt(8)}
                    x2={x + xmarkW / Math.sqrt(8)}
                    y2={y + 3 - xmarkW / Math.sqrt(8)}
                    fill="none"
                    stroke={xmarkColor}
                    strokeWidth={xmarkW}
                  />,
                );
                available[x][y] = false;
                available[x + 2][y] = false;
                available[x][y + 2] = false;
                available[x + 2][y + 2] = false;
                available[x + 1][y + 1] = false;
                for (let i = 0; i < 3; i++) {
                  for (let j = 0; j < 3; j++) {
                    ava2[x + i][y + j] = false;
                  }
                }
              }
            }
            if (
              available[x][y] &&
              ava2[x][y] &&
              x < nCount - 1 &&
              y < nCount - 1
            ) {
              let ctn = true;
              for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                  if (ava2[x + i][y + j] === false) {
                    ctn = false;
                  }
                }
              }
              if (
                ctn &&
                table[x + 1][y] &&
                table[x][y + 1] &&
                table[x + 1][y + 1]
              ) {
                g1.push(
                  <line
                    key={id++}
                    x1={x + xmarkW / Math.sqrt(8)}
                    y1={y + xmarkW / Math.sqrt(8)}
                    x2={x + 2 - xmarkW / Math.sqrt(8)}
                    y2={y + 2 - xmarkW / Math.sqrt(8)}
                    fill="none"
                    stroke={xmarkColor}
                    strokeWidth={xmarkW}
                  />,
                );
                g1.push(
                  <line
                    key={id++}
                    x1={x + 2 - xmarkW / Math.sqrt(8)}
                    y1={y + xmarkW / Math.sqrt(8)}
                    x2={x + xmarkW / Math.sqrt(8)}
                    y2={y + 2 - xmarkW / Math.sqrt(8)}
                    fill="none"
                    stroke={xmarkColor}
                    strokeWidth={xmarkW}
                  />,
                );
                for (let i = 0; i < 2; i++) {
                  for (let j = 0; j < 2; j++) {
                    available[x + i][y + j] = false;
                    ava2[x + i][y + j] = false;
                  }
                }
              }
            }
            if (available[x][y] && ava2[x][y]) {
              if (y === 0 || (y > 0 && (!table[x][y - 1] || !ava2[x][y - 1]))) {
                let start = y;
                let end = y;
                let ctn = true;
                while (ctn && end < nCount) {
                  if (table[x][end] && ava2[x][end]) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 2) {
                  for (let i = start; i < end; i++) {
                    ava2[x][i] = false;
                    available[x][i] = false;
                  }
                  g2.push(
                    <rect
                      width={contentW}
                      height={end - start - 1 - (1 - contentW)}
                      key={id++}
                      fill={contentColor}
                      x={x + (1 - contentW) / 2}
                      y={y + (1 - contentW) / 2}
                    />,
                  );
                  g2.push(
                    <rect
                      width={contentW}
                      height={contentW}
                      key={id++}
                      fill={contentColor}
                      x={x + (1 - contentW) / 2}
                      y={end - 1 + (1 - contentW) / 2}
                    />,
                  );
                }
              }
            }
            if (available[x][y] && ava2[x][y]) {
              if (x === 0 || (x > 0 && (!table[x - 1][y] || !ava2[x - 1][y]))) {
                let start = x;
                let end = x;
                let ctn = true;
                while (ctn && end < nCount) {
                  if (table[end][y] && ava2[end][y]) {
                    end++;
                  } else {
                    ctn = false;
                  }
                }
                if (end - start > 1) {
                  for (let i = start; i < end; i++) {
                    ava2[i][y] = false;
                    available[i][y] = false;
                  }
                  g2.push(
                    <rect
                      width={end - start - (1 - contentW)}
                      height={contentW}
                      key={id++}
                      fill={importantColor}
                      x={x + (1 - contentW) / 2}
                      y={y + (1 - contentW) / 2}
                    />,
                  );
                }
              }
            }
            if (available[x][y]) {
              points.push(
                <rect
                  width={contentW}
                  height={contentW}
                  key={id++}
                  fill={importantColor}
                  x={x + (1 - contentW) / 2}
                  y={y + (1 - contentW) / 2}
                />,
              );
            }
        }
      }
    }
    return [...points, ...g1, ...g2];
  }, [
    props.content_stroke_width,
    props.content_x_stroke_width,
    props.positioning_point_type,
    props.positioning_stroke_width,
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

export const qrbtfModuleSp1: QrbtfModule<QrbtfRendererSp1Props> = {
  type: "svg_renderer",
  presets: Sp1Presets,
  renderer: QrbtfRendererSp1,
};
