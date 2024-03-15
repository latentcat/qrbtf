import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toBase64(file: File, aspectRatio: number = 1) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  let img = document.createElement("img");
  img.setAttribute("src", URL.createObjectURL(file));

  return new Promise((resolve) => {
    img.onload = () => {
      let width, height;
      if (img.width < img.height) {
        width = img.width;
        height = width / aspectRatio;
      } else {
        height = img.height;
        width = height * aspectRatio;
      }

      canvas.setAttribute("width", width.toString());
      canvas.setAttribute("height", height.toString());

      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(
          img,
          (img.width - width) / 2,
          (img.height - height) / 2,
          width,
          height,
          0,
          0,
          width,
          height,
        );
      }
      resolve(canvas.toDataURL(file.type, 0.9));
    };
  });
}
