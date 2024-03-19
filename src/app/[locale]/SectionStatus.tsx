import { useTranslations } from "next-intl";
import { Container } from "@/components/Containers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/components/Titles";
import { StatusCard } from "@/components/StatusCard";

import dynamic from "next/dynamic";

const DynamicStatus = dynamic(() => import("@/components/QrbtfStatus"), {
  loading: () => <Skeletons />,
});

function Skeletons() {
  const t = useTranslations("index.status");
  return (
    <>
      <StatusCard title={t("github_stars")} />
      <StatusCard title={t("generate_count")} />
      <StatusCard title={t("download_count")} />
      <StatusCard title={t("page_view")} />
    </>
  );
}

export function SectionStatus() {
  const t = useTranslations("index.status");

  return (
    <div className="">
      <SectionTitle title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-3">
          <DynamicStatus />
        </div>
      </div>
    </div>
  );
}
