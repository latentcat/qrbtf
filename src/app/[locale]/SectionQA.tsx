import { useTranslations } from "next-intl";
import { Container } from "@/components/Containers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/components/Titles";

export function SectionQA() {
  const t = useTranslations("index.qa");

  return (
    <div className="">
      <SectionTitle title={t("title")} subtitle={t("subtitle")} />
      <div className="_mt-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
