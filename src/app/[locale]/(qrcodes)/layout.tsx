import {SectionHero} from "@/app/[locale]/SectionHero";
import {SectionStyles} from "@/app/[locale]/SectionStyles";
import {SectionParams} from "@/app/[locale]/SectionParams";
import {SectionRefs} from "@/app/[locale]/SectionRefs";
import {SectionQA} from "@/app/[locale]/SectionQA";
import {SectionTeam} from "@/app/[locale]/SectionTeam";
import {SectionChangelog} from "@/app/[locale]/SectionChangelog";
import {SectionSponsor} from "@/app/[locale]/SectionSponsor";


export default function RootLayout({
                                     children,
                                     params: {locale}
                                   }: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  return (
    <div>
      <SectionHero />
      <SectionStyles />
      {children}
      <SectionQA />
      <SectionRefs />
      <SectionTeam />
      <SectionSponsor />
      <SectionChangelog />
    </div>
  );
}
