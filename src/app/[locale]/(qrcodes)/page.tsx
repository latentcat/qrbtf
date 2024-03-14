import { useTranslations } from "next-intl";
import { SectionParams } from "@/app/[locale]/SectionParams";

export default function Home() {
  const t = useTranslations("index");

  return (
    <>
      <SectionParams />
    </>
  );
}
