const svgHead =
  '<?xml version="1.0" encoding="utf-8"?>\n ' +
  '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">\n';

const MIME = { jpg: "image/jpeg", png: "image/png" };

function saveSvg(name: string, content: string) {
  let htmlContent = [svgHead + content];
  let bl = new Blob(htmlContent, { type: "image/svg+xml" });
  let a = document.createElement("a");
  let filename = "QRcode_" + name + ".svg";

  a.href = URL.createObjectURL(bl);
  a.download = filename;
  a.hidden = true;
  a.click();
}

function saveImg(
  name: string,
  content: string,
  type: "jpg" | "png",
  width = 1500,
  height = 1500,
) {
  if (!MIME[type]) throw "Error image type";

  let filename = "QRcode_" + name + "." + type;
  const wrap = document.createElement("div");
  wrap.innerHTML = content;

  const $svg = wrap.firstChild!;
  const $clone = $svg.cloneNode(true) as HTMLElement;

  $clone.setAttribute("width", width.toString());
  $clone.setAttribute("height", height.toString());

  const svgData = new XMLSerializer().serializeToString($clone);

  let canvas = document.createElement("canvas");

  canvas.setAttribute("width", width.toString());
  canvas.setAttribute("height", height.toString());

  let ctx = canvas.getContext("2d");
  let img = document.createElement("img");
  img.setAttribute("src", "data:image/svg+xml;base64," + btoa(svgData));

  img.onload = () => {
    if (!ctx) {
      return;
    }

    ctx.fillStyle = "white";
    if (type === "jpg") ctx.fillRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    let a = document.createElement("a");
    let data = canvas.toDataURL(MIME[type], 0.8);
    a.setAttribute("href", data);
    a.setAttribute("target", "download");
    a.setAttribute("download", filename);
    a.click();
  };
}

export function download(
  name: string,
  content: HTMLElement,
  type: "svg" | "jpg" | "png",
) {
  if (type === "svg") {
    saveSvg(name, content.innerHTML);
  } else {
    saveImg(name, content.innerHTML, type);
  }
}
