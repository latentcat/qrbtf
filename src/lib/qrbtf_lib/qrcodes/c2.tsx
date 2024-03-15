"use client";

import {
  QrbtfRendererCommonProps,
  QrbtfModule,
} from "@/lib/qrbtf_lib/qrcodes/common";
import React, { useMemo } from "react";
import { QRPointType, encode } from "../encoder";

interface RenderC2OwnProps {
  contrast: number;
  brightness: number;
  background: string;
}

export type QrbtfRendererC2Props = RenderC2OwnProps & QrbtfRendererCommonProps;

function QrbtfRendererC2(props: QrbtfRendererC2Props) {
  const [table, typeTable] = useMemo(() => encode("qrbtf"), []);
  const points = useMemo(() => {
    const points: React.ReactNode[] = [];
    for (let x = 0; x < table.length; x++) {
      for (let y = 0; y < table.length; y++) {
        switch (typeTable[x][y]) {
          case QRPointType.EMPTY:
            continue;
          case QRPointType.ALIGN_CENTER:
          case QRPointType.ALIGN_OTHER:
          case QRPointType.TIMING:
            points.push(
              <rect
                opacity={1}
                width={1}
                height={1}
                key={points.length}
                fill="#0000FF"
                x={x}
                y={y}
              />,
            );
            break;
          case QRPointType.POS_CENTER:
            points.push(
              <rect
                width={1}
                height={1}
                key={points.length}
                fill="#00FF00"
                x={x}
                y={y}
              />,
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
              />,
            );
            break;
          default:
            points.push(
              <rect
                opacity={1}
                width={1}
                height={1}
                key={points.length}
                fill="#00FFFF"
                x={x}
                y={y}
              />,
            );
        }
      }
    }
    return points;
  }, [table.length, typeTable]);

  const viewBox = `${-table.length / 5} ${-table.length / 5} ${
    (7 * table.length) / 5
  } ${(7 * table.length) / 5}`;

  return (
    <svg viewBox={viewBox} {...props}>
      {points}
    </svg>
  );
}

export const qrbtfModuleC2: QrbtfModule<QrbtfRendererC2Props> = {
  renderer: QrbtfRendererC2,
};
