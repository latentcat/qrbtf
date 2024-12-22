"use client";

import { useEffect } from "react";

import { encode } from "@/lib/qrbtf_lib/encoder";

export function QrTest() {
  return (
    <div className="w-full">
      <div
        onClick={() => {
          const arr = encode("qrbtf");
          console.log(arr);
        }}
      >
        Test
      </div>
    </div>
  );
}
