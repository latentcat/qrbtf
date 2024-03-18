import { SectionHero } from "@/app/[locale]/SectionHero";
import { SectionStyles } from "@/app/[locale]/SectionStyles";
import { SectionParams } from "@/app/[locale]/SectionParams";
import { SectionRefs } from "@/app/[locale]/SectionRefs";
import { SectionQA } from "@/app/[locale]/SectionQA";
import { SectionTeam } from "@/app/[locale]/SectionTeam";
import { SectionChangelog } from "@/app/[locale]/SectionChangelog";
import { SectionSponsor } from "@/app/[locale]/SectionSponsor";
import {
  Container,
  SplitLeft,
  SplitRight,
  SplitView,
} from "@/components/Containers";
import { SectionStatus } from "@/app/[locale]/SectionStatus";

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div>
      <SectionHero />
      <SectionStyles />
      {children}
      <Container>
        <SplitView className="gap-x-9 gap-y-12 mt-12">
          <SplitLeft className="flex flex-col gap-12">
            <SectionStatus />
            <SectionQA />
            <SectionRefs />
            <SectionTeam />
            <SectionSponsor />
          </SplitLeft>
          <SplitRight>
            <SectionChangelog />
          </SplitRight>
        </SplitView>
      </Container>
    </div>
  );
}
