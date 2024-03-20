"use client";

import { Badge } from "@/components/ui/badge";
import { LucideScan } from "lucide-react";
import { useEffect, useRef } from "react";
import { useAtom } from "jotai/index";
import { urlAtom } from "@/lib/states";
import { toast } from "sonner";
import { trackEvent } from "@/components/TrackComponents";

export function ScanButton(props: { name: string }) {
  const scanRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useAtom(urlAtom);

  // 准备扫描库、挂上监听函数，返回取消监听的方法
  const prepareScan = async () => {
    // 这样做的目的是，在页面加载完后加载扫描模块，因为不是每个人都会用到这个功能，延迟加载
    const Html5Qrcode = await import("html5-qrcode").then(
      (module) => module.Html5Qrcode,
    );
    const html5QrCode = new Html5Qrcode(/* element id */ "qr-input-file");

    // 挂在按钮上的监听函数
    const onFileChange = () => {
      // react 相关的非空判定
      if (!scanRef.current) return;
      if (!scanRef.current?.files) return;
      if (scanRef.current?.files?.length == 0) return;

      // 获取文件
      const imageFile = scanRef.current.files[0];

      // 执行扫描
      html5QrCode
        .scanFile(imageFile, true)
        .then((decodedText) => {
          // 成功后设置 url，蹦出 success toast
          setUrl(decodedText);
          toast.success("Scan succeeded");
        })
        .catch((err) => {
          // 失败时蹦出 error toast
          console.log(`Scan error: ${err}`);
          toast.error("Scan error");
        });
    };

    // 按钮变化时执行监听
    scanRef.current?.addEventListener("change", onFileChange);

    // 返回取消监听的函数，注意，是一个封装在 () => (() => void) 里的函数
    return () => scanRef.current?.removeEventListener("change", onFileChange);
  };

  // 在 useEffect 的生命周期中挂上监听和取消监听
  useEffect(() => {
    let removeListener: () => void = () => {};
    prepareScan().then((f) => (removeListener = f));
    return () => {
      removeListener();
    };
  }, []);

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
          trackEvent("upload_qrcode_button");
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
