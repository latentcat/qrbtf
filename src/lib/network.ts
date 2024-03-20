import { toast } from "sonner";

export const http: typeof fetch = async (input, init) => {
  const res = await fetch(input, init);
  if (!res.ok) {
    const body = await res.json();
    const msg = body["error"] || "Network Error";
    toast.error(msg);
    throw Error(msg);
  }
  return res;
};
