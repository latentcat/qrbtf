import { useTranslations } from "next-intl";
import { Container } from "@/components/Containers";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/components/Titles";
import { trackEvent } from "@/components/TrackComponents";

const list = [
  {
    q: "0.q",
    a: "0.a",
  },
  {
    q: "1.q",
    a: "1.a",
  },
  {
    q: "2.q",
    a: "2.a",
  },
  {
    q: "3.q",
    a: "3.a",
  },
  // {
  //   q: "4.q",
  //   a: "4.a",
  // },
] as const;

export function SectionQA() {
  const t = useTranslations("index.qa");

  return (
    <div className="">
      <SectionTitle title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-6 _border-t">
        <Accordion type="single" collapsible>
          {list.map((item, index) => (
            <AccordionItem key={"qr_" + index} value={`item_${index}`}>
              <AccordionTrigger>{t(item.q)}</AccordionTrigger>
              <AccordionContent>{t(item.a)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
