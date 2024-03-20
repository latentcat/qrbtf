"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { QrStyleItemProps, qrStyleList } from "@/lib/qr_style_list";
import { motion } from "framer-motion";
import { transitionDampingMd } from "@/lib/animations";
import { cn, useCurrentQrcodeType } from "@/lib/utils";
import { Link } from "@/navigation";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Containers";
import React, { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import { TrackLink } from "@/components/TrackComponents";

export function SectionStylesClient() {
  const t = useTranslations("index.style");
  const currentQrcodeType = useCurrentQrcodeType();

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref, {
    applyRubberBandEffect: true, // activate rubber band effect
  });

  const render = (item: QrStyleItemProps, index: number) => {
    const itemPath = item.id === "g1" ? "/" : `/style/${item.id}`;
    const isActive = currentQrcodeType === item.id;
    return (
      <div
        key={"qrcode_style_" + index}
        className={cn(
          "snap-start pl-6 -ml-3 sm:pl-0 sm:ml-0 transition-opacity",
          isActive ? "" : "dark:opacity-70",
        )}
      >
        <TrackLink
          trackValue={["qrcode_style", item.id]}
          href={itemPath}
          scroll={false}
          prefetch={false}
        >
          <motion.div
            className={cn(
              "relative w-[calc((100vw-(12px)*5)/2)] sm:w-[195px] rounded-2xl bg-accent/30 overflow-hidden",
            )}
            whileTap={{
              scale: 0.95,
              opacity: 0.8,
            }}
            transition={transitionDampingMd}
          >
            <AspectRatio ratio={1} />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white">
              <QrCodeIcon className="w-8 h-8 opacity-20 text-black" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
              <img
                src={`/assets/qrcodes/${item.image}`}
                alt=""
                className="block w-full h-full bg-white"
              />
            </div>
            <div
              className={cn(
                "absolute top-0 left-0 w-full h-full rounded-2xl",
                isActive ? "ring-[5px] ring-background ring-inset" : "",
              )}
            ></div>
            <div
              className={cn(
                "absolute top-0 left-0 w-full h-full rounded-2xl ring ring-inset",
                isActive
                  ? "ring-2 ring-foreground"
                  : "ring-1 ring-border dark:hidden",
              )}
            ></div>
          </motion.div>
        </TrackLink>
      </div>
    );
  };

  return (
    <div className="mt-9">
      <Container>
        <Label className="flex justify-between text-sm font-medium mb-2">
          {t("title")}
          <span className="ml-3 font-normal text-foreground/50">
            {t("subtitle")}
          </span>
        </Label>
      </Container>

      <div
        className="overflow-x-auto no-scrollbar snap-x sm:snap-none snap-mandatory"
        {...events}
        ref={ref} // add reference and events to the wrapping div
      >
        <div className="flex flex-col">
          <div className="w-full flex flex-col items-center sm:px-6 lg:px-12">
            <div className="w-full max-w-5xl">
              <div className="flex sm:gap-3">
                <div className="w-3 shrink-0 sm:hidden" />

                {qrStyleList.map((item, index) => render(item, index))}

                <div className="w-6 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
