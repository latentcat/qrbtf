import { usePathname } from "@/navigation";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useCurrentQrcodeType() {
  const pathname = usePathname();
  const type = pathname.split("/")[2] || "g1";
  return type;
}
