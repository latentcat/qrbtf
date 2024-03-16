import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusCard } from "@/components/StatusCard";
import { useTranslations } from "next-intl";

interface QrbtfStatusProps {
  children?: React.ReactNode;
}

const sleep = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

export default async function QrbtfStatus(props: QrbtfStatusProps) {
  const t = useTranslations("index.status");
  await sleep(0.1);
  return (
    <>
      <StatusCard title={t("github_stars")}>
        <div>5701</div>
      </StatusCard>
      <StatusCard title={t("generate_count")}>
        <div>448K</div>
      </StatusCard>
      <StatusCard title={t("download_count")}>
        <div>1.1M</div>
      </StatusCard>
      <StatusCard title={t("page_view")}>
        <div>2.4M</div>
      </StatusCard>
    </>
  );
}
