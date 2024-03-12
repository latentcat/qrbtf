import Image from "next/image";
import {useTranslations} from 'next-intl';
import {SectionHero} from "@/app/[locale]/SectionHero";

export default function Home() {
  const t = useTranslations('index');

  return (
    <div>
      <SectionHero />
    </div>
  );
}
