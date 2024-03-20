"use client";

import React, { useEffect, useMemo, useState } from "react";
import { QRPointType, encode } from "../encoder";
import { gamma } from "@/lib/image_utils";
import { QrbtfModule, QrbtfRendererCommonProps, RendererProps } from "./param";
import { C2Presets } from "./c2_config";

interface RenderC2OwnProps {
  contrast: number;
  brightness: number;
  background: string;
  align_type: "none" | "black-white";
  timing_type: "none" | "black-white";
}

export type QrbtfRendererC2Props = RenderC2OwnProps & QrbtfRendererCommonProps;

function QrbtfRendererC2(props: RendererProps<QrbtfRendererC2Props>) {
  const { align_type, timing_type, contrast, brightness, background } = props;
  const [table, typeTable] = useMemo(
    () => encode(props.url, { ecc: props.correct_level }),
    [props.url, props.correct_level],
  );

  const points = useMemo(() => {
    const points: React.ReactNode[] = [];
    for (let y = 0; y < table.length; y++) {
      for (let x = 0; x < table.length; x++) {
        const posX = 3 * x;
        const posY = 3 * y;
        switch (typeTable[x][y]) {
          case QRPointType.ALIGN_CENTER:
          case QRPointType.ALIGN_OTHER:
            if (table[x][y]) {
              if (align_type === "black-white") {
                points.push(
                  <use
                    key={points.length}
                    xlinkHref="#B-black"
                    x={posX - 0.03}
                    y={posY - 0.03}
                  />,
                );
              } else {
                points.push(
                  <use
                    key={points.length}
                    xlinkHref="#S-black"
                    x={posX + 1 - 0.01}
                    y={posY + 1 - 0.01}
                  />,
                );
              }
            } else {
              if (align_type === "none") {
                points.push(
                  <use
                    key={points.length}
                    xlinkHref="#S-white"
                    x={posX + 1}
                    y={posY + 1}
                  />,
                );
              } else {
                points.push(
                  <use
                    key={points.length}
                    xlinkHref="#B-white"
                    x={posX - 0.03}
                    y={posY - 0.03}
                  />,
                );
              }
            }
            break;
          case QRPointType.TIMING:
            if (table[x][y]) {
              if (timing_type === "black-white") {
                points.push(
                  <use
                    key={points.length}
                    xlinkHref="#B-black"
                    x={posX - 0.03}
                    y={posY - 0.03}
                  />,
                );
              } else {
                points.push(
                  <use
                    key={points.length}
                    xlinkHref="#S-black"
                    x={posX + 1}
                    y={posY + 1}
                  />,
                );
              }
            } else {
              if (timing_type === "none") {
                points.push(
                  <use
                    key={points.length}
                    xlinkHref="#S-white"
                    x={posX + 1}
                    y={posY + 1}
                  />,
                );
              } else {
                points.push(
                  <use
                    key={points.length}
                    xlinkHref="#B-white"
                    x={posX - 0.03}
                    y={posY - 0.03}
                  />,
                );
              }
            }
            break;
          case QRPointType.POS_CENTER:
            if (table[x][y]) {
              points.push(
                <use
                  key={points.length}
                  fill="black"
                  xlinkHref="#B"
                  x={posX - 0.03}
                  y={posY - 0.03}
                />,
              );
            }
            break;
          case QRPointType.POS_OTHER:
            if (table[x][y]) {
              points.push(
                <use
                  key={points.length}
                  fill="black"
                  xlinkHref="#B"
                  x={posX - 0.03}
                  y={posY - 0.03}
                />,
              );
            } else {
              points.push(
                <use
                  key={points.length}
                  xlinkHref="#B-white"
                  x={posX - 0.03}
                  y={posY - 0.03}
                />,
              );
            }
            break;
          default:
            if (table[x][y]) {
              points.push(
                <use
                  key={points.length}
                  xlinkHref="#S-black"
                  x={posX + 1}
                  y={posY + 1}
                />,
              );
            }
        }
      }
    }
    return points;
  }, [align_type, table, timing_type, typeTable]);

  const [grayPoints, setGrayPoints] = useState<React.ReactNode[]>([]);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = document.createElement("img");
    const gpl: React.ReactNode[] = [];

    canvas.style.imageRendering = "pixelated";
    const size = table.length * 3;

    img.src = background;
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;

      if (!ctx) {
        return;
      }

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, size, size);

      for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
          const imageData = ctx.getImageData(x, y, 1, 1);
          const data = imageData.data;
          const gray = gamma(data[0], data[1], data[2]);
          if (
            Math.random() >
              (gray / 255 + brightness - 0.5) * (contrast + 1) + 0.5 &&
            (x % 3 !== 1 || y % 3 !== 1)
          )
            gpl.push(
              <use key={"g_" + x + "_" + y} x={x} y={y} xlinkHref="#S-black" />,
            );
        }
      }
      setGrayPoints(gpl);
    };
  }, [background, brightness, contrast, table.length]);

  const viewBox = `${(-table.length * 3) / 5} ${(-table.length * 3) / 5} ${
    (21 * table.length) / 5
  } ${(21 * table.length) / 5}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={viewBox}
      {...props}
    >
      <defs>
        <rect id="B-black" fill="black" width={3.08} height={3.08} />
        <rect id="B-white" fill="white" width={3.08} height={3.08} />
        <rect id="S-black" fill="black" width={1.02} height={1.02} />
        <rect id="S-white" fill="white" width={1.02} height={1.02} />
        <rect id="B" width={3.08} height={3.08} />
        <rect id="S" width={1.02} height={1.02} />
      </defs>
      {[...grayPoints, ...points]}
    </svg>
  );
}

export const qrbtfModuleC2: QrbtfModule<QrbtfRendererC2Props> = {
  type: "svg_renderer",
  presets: C2Presets,
  renderer: QrbtfRendererC2,
};
