"use client";

import { useAtom } from "jotai";

import { Input } from "@/components/ui/input";
import { urlAtom } from "@/lib/states";

export function UrlInput() {
  const [url, setUrl] = useAtom(urlAtom);
  return (
    <>
      <Input
        placeholder="https://qrbtf.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    </>
  );
}
