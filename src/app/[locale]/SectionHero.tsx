import {useTranslations} from "next-intl";
import {Container} from "@/components/Components";
import {Input} from "@/components/ui/input";


export function SectionHero() {
  const t = useTranslations('index.hero');
  return (
    <div className="mt-24 lg:mt-36">
      <Container>
        <div>
          <h1 className="text-4xl lg:text-6xl font-bold">
            {t('title')}
          </h1>
          <p className="text-lg mt-6 opacity-70">
            {t('subtitle')}
          </p>
          <div className="mt-6 max-w-lg">
            <Input
              placeholder="https://qrbtf.com"
            />
          </div>
        </div>
      </Container>
    </div>
  )
}