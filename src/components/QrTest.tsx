"use client"


import {getQrcodeObject, renderSvg} from "@/lib/qrbtf_lib";
import {useEffect} from "react";

export function QrTest() {

  return (
    <div
      className="w-full"
      dangerouslySetInnerHTML={{__html: renderSvg()}}
    >

    </div>
  )
}