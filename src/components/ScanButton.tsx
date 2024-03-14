"use client";

import { Badge } from "@/components/ui/badge";
import { LucideScan } from "lucide-react";
import { useRef } from "react";

export function ScanButton(props: { name: string }) {
  const scanRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={scanRef}
        id="qr-input-file"
        type="file"
        accept="image/*"
        className="hidden"
      />
      <Badge
        onClick={(evt) => {
          evt.preventDefault();
          scanRef.current?.click();
        }}
        className="rounded-md hover:bg-accent cursor-pointer"
        variant="outline"
      >
        <LucideScan className="w-4 h-4 mr-1" />
        {props.name}
      </Badge>
    </>
  );
}
