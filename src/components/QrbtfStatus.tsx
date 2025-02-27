import React from "react";
import { StatusCard } from "@/components/StatusCard";
import { useTranslations } from "next-intl";
import { getGitHubStars } from "@/lib/network";
import { NEXT_PUBLIC_QRBTF_API_ENDPOINT } from "@/lib/env/client";

export default async function QrbtfStatus() {
  const t = useTranslations("index.status");

  let results = [];

  const names = [
    "github_stars",
    "generate_count",
    "download_count",
    "page_view",
  ] as const;

  try {
    let promises = names.map(async (name, index) => {
      if (index === 0) {
        return getGitHubStars();
      } else {
        const res = await fetch(
          `${NEXT_PUBLIC_QRBTF_API_ENDPOINT}/count/get_count`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              collection_name: "counter_global",
              name,
            }),
          },
        );
        const data = await res.json();
        return data["count"];
      }
    });
    results = (await Promise.all(promises)).map((number) => {
      return number ? number.toLocaleString() : "N/A";
    });
  } catch (error) {
    results = names.map(() => "N/A");
  }
  return (
    <>
      {names.map((name, index) => (
        <StatusCard title={t(name)} key={name}>
          <div>{results[index] || "N/A"}</div>
        </StatusCard>
      ))}
    </>
  );
}
