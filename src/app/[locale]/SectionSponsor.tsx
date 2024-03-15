import { useTranslations } from "next-intl";
import { Container } from "@/components/Containers";
import { SectionTitle } from "@/components/Titles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MidRealLogoFull } from "@/components/Logos";
import Link from "next/link";

export function SectionSponsor() {
  const t = useTranslations("index.sponsor");

  return (
    <div className="">
      <SectionTitle title={t("title")} subtitle={t("subtitle")} />

      <div className="mt-9 flex gap-3">
        <Link href="https://midreal.ai" target="_blank">
          <MidRealLogoFull className="h-12" />
        </Link>
        <span className="hidden">MidReal.ai</span>
      </div>
    </div>
  );
}
