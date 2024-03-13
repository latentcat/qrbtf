import {useTranslations} from "next-intl";
import {Container} from "@/components/Containers";
import {SectionTitle} from "@/components/Titles";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";


export function SectionTeam() {
  const t = useTranslations('index.team');


  return (
    <div className="mt-12">
      <Container>
        <div className="md:pr-72 lg:pr-96">
          <SectionTitle title={t('title')} subtitle={t('subtitle')}/>

          <div className="mt-3 flex gap-3">
            Latent Cat, @ciaochaos, @cpunisher, @chenbaiyujason, @zhaohan-wang
          </div>
        </div>
      </Container>
    </div>
  )
}