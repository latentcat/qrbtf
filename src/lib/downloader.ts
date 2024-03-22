import { trackEvent } from "@/components/TrackComponents";
import { http } from "./network";
import { QrbtfModule } from "./qrbtf_lib/qrcodes/param";
import { flattenObject } from "@/lib/utils";

function createDownloadTask(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.target = "download";
  a.download = filename;
  a.hidden = true;
  a.click();
}

function svgToSvg(name: string, el: SVGSVGElement) {
  const svgHead =
    '<?xml version="1.0" encoding="utf-8"?>\n ' +
    '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\n';
  let htmlContent = [svgHead + el.outerHTML];
  let bl = new Blob(htmlContent, { type: "image/svg+xml" });
  createDownloadTask(URL.createObjectURL(bl), `qrcode_${name}.svg`);
}

const MIME = { jpg: "image/jpeg", png: "image/png" };
interface SvgToImageOptions {
  type: keyof typeof MIME;
  width: number;
  height: number;
}

function svgToImage(
  name: string,
  el: SVGSVGElement,
  options?: Partial<SvgToImageOptions>,
) {
  const { type = "jpg", width = 1500, height = 1500 } = options || {};

  const $clone = el.cloneNode(true) as HTMLElement;
  $clone.setAttribute("width", width.toString());
  $clone.setAttribute("height", height.toString());
  const svgData = new XMLSerializer().serializeToString($clone);

  const canvas = document.createElement("canvas");
  canvas.setAttribute("width", width.toString());
  canvas.setAttribute("height", height.toString());

  const ctx = canvas.getContext("2d");
  const img = document.createElement("img");
  img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));

  img.onload = () => {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = "white";
    if (type === "jpg") ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    const data = canvas.toDataURL(MIME[type], 0.8);
    createDownloadTask(data, `QRcode_${name}.${type}`);
  };
}

async function srcToImage(name: string, src: string) {
  const parsedUrl = new URL(src);
  const pathname = parsedUrl.pathname;
  const suffix = pathname.split(".").pop() || "jpg";

  const image = await http(src);
  const blob = await image.blob();
  createDownloadTask(URL.createObjectURL(blob), `QRcode_${name}.${suffix}`);
}

type Downloader = (options: {
  name: string;
  wrapper: HTMLElement;
  params: any;
  userId?: string;
}) => void;

function withReport(
  downloaders: Record<string, Downloader>,
): Record<string, Downloader> {
  for (const type in downloaders) {
    const origin = downloaders[type];
    downloaders[type] = (options) => {
      const { name, wrapper, params, userId } = options;
      const dataToReport = {
        user_id: userId,
        type: name,
        ...params,
      };
      trackEvent("download_qrcode", dataToReport);
      // WebKit bug: https://bugs.webkit.org/show_bug.cgi?id=270102
      Promise.all([
        http("/api/update_count", {
          method: "POST",
          body: JSON.stringify({
            collection_name: "counter_style",
            name: name,
          }),
        }),
        http("/api/update_count", {
          method: "POST",
          body: JSON.stringify({
            collection_name: "counter_global",
            name: "download_count",
          }),
        }),
        http("/api/user/stat/inc_download_count", {
          method: "POST",
        }),
        http("/api/user/stat/log_qrcode", {
          method: "POST",
          body: JSON.stringify(dataToReport),
        }),
      ]).finally(() => origin(options));
    };
  }
  return downloaders;
}

const SvgQrcodeDownloaders: Record<string, Downloader> = withReport({
  svg: ({ name, wrapper }) =>
    svgToSvg(name, wrapper.firstChild as SVGSVGElement),
  jpg: ({ name, wrapper }) =>
    svgToImage(name, wrapper.firstChild as SVGSVGElement, { type: "jpg" }),
  png: ({ name, wrapper }) =>
    svgToImage(name, wrapper.firstChild as SVGSVGElement, { type: "png" }),
});
const ApiFetcherQrcodeDownloaders: Record<string, Downloader> = withReport({
  jpg: ({ name, wrapper }) =>
    srcToImage(name, wrapper.getElementsByTagName("img")[0].src),
});

const downloaderMaps: Record<
  QrbtfModule<void>["type"],
  Record<string, Downloader>
> = {
  svg_renderer: SvgQrcodeDownloaders,
  api_fetcher: ApiFetcherQrcodeDownloaders,
};

export { downloaderMaps };
