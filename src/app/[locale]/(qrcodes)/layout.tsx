import {SectionHero} from "@/app/[locale]/SectionHero";
import {SectionStyles} from "@/app/[locale]/SectionStyles";
import {SectionParams} from "@/app/[locale]/SectionParams";
import {SectionRefs} from "@/app/[locale]/SectionRefs";
import {SectionQA} from "@/app/[locale]/SectionQA";
import {SectionTeam} from "@/app/[locale]/SectionTeam";
import {SectionChangelog} from "@/app/[locale]/SectionChangelog";
import {SectionSponsor} from "@/app/[locale]/SectionSponsor";
import {Container} from "@/components/Containers";


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
      <Container>
        <div className="flex flex-col md:flex-row gap-9 mt-12">
          <div className="grow flex flex-col gap-12">
            <SectionQA/>
            <SectionRefs/>
            <SectionTeam/>
            <SectionSponsor/>
          </div>
          <div className="shrink-0 w-full sm:w-[396px] md:w-72 lg:w-[396px]">
            <SectionChangelog/>
          </div>
        </div>
      </Container>
    </div>
  );
}
