import { toast } from "sonner";

export const http: typeof fetch = async (input, init) => {
  const res = await fetch(input, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json();
    let msg = body["error"];
    if (res.status == 401 && !msg) {
      msg = "Unauthorized";
    }

    msg = msg ?? "Network Error";
    toast.error(msg);
    throw Error(msg);
  }
  return res;
};

export async function getGitHubStars() {
  const res = await fetch("https://api.github.com/repos/latentcat/qrbtf", {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  const data = await res.json();

  return data["stargazers_count"] as number;
}
