import Image from "next/image";
import {useTranslations} from 'next-intl';
import {SectionHero} from "@/app/[locale]/SectionHero";
import {SectionStyles} from "@/app/[locale]/SectionStyles";
import {SectionParams} from "@/app/[locale]/SectionParams";

export default function Home() {
  const t = useTranslations('index');

  return (
    <div>
      <SectionHero />
      <SectionStyles />
      <SectionParams />
    </div>
  );
}
