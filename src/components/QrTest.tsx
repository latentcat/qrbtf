"use client";

import { encode } from "@/lib/qrbtf_lib/encoder";
import { useEffect } from "react";

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
