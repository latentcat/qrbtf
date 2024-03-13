import {useTranslations} from "next-intl";
import {Container} from "@/components/Containers";
import {SectionTitle} from "@/components/Titles";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import Link from "next/link";


interface ChangeStepProps {
  isEnd?: boolean
  title: string
  content: string
  link?: string
  url?: string
}

function ChangeStep(props: ChangeStepProps) {
  return (
    <div className="flex items-stretch relative">
      <div className="w-1.5 mr-4 flex flex-col items-center translate-y-2">
        <div className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0"/>
        {!props.isEnd && <div className="grow w-[1px] bg-foreground/30 my-2"/>}
      </div>
      <div className="grow">
        <h3 className="font-semibold">{props.title}</h3>
        <p className="mb-6 mt-1 text-muted-foreground">
          {props.content}{"  "}
          {props.url && (
            <Link
              href={props.url}
              target="_blank"
              className="text-foreground _underline font-medium"
            >
              {props.link} -&gt;
            </Link>
          )}
        </p>
      </div>
    </div>
  )
}


export function SectionChangelog() {
  const t = useTranslations('index.changelog');


  return (
    <div className="mt-12">
      <Container>
        <div className="md:pr-72 lg:pr-96">
          <SectionTitle title={t('title')} subtitle={t('subtitle')}/>

          <div className="mt-6">
            <ChangeStep
              title="2024.3"
              content="QRBTF v3 released. Remade from the ground up using Next.js."
            />
            <ChangeStep
              title="2023.7"
              content="QRBTF.AI released. Built on Nuxt.js."
            />
            <ChangeStep
              title="2023.6"
              content="Introducing the world's first AI generated QR code."
              link="Reddit"
              url="https://www.reddit.com/r/StableDiffusion/comments/141hg9x/controlnet_for_qr_code/"
            />
            <ChangeStep
              title="2020.6"
              content="Release of react-qrbtf component library."
              link="GitHub"
              url="https://github.com/CPunisher/react-qrbtf"
            />
            <ChangeStep
              isEnd
              title="2020.5"
              content="QRBTF v1 is open source."
              link="GitHub"
              url="https://github.com/latentcat/qrbtf"
            />
          </div>
        </div>
      </Container>
    </div>
  )
}