import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Container} from "@/components/Containers";
import {Slider} from "@/components/ui/slider";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";


export function SectionParams() {
  const t = useTranslations('index.params');

  return (
    <div className="">
      <Container>
        <div className="mt-9 flex flex-col _md:flex-row gap-9">

          <div className="grow">
            <h2 className="mb-4 text-2xl font-bold">A1</h2>
            <div className="flex items-center w-full justify-between">
              <div>Parameter name</div>
              <div
                className="w-48"
              >
                <Slider
                  defaultValue={[50]}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-[396px] _md:w-72 lg:w-[396px]">
            <Button className="w-full">
              {t('generate')}
            </Button>
            <div className="mt-6">
              <div className="border rounded-xl bg-accent/30 w-full">
                <AspectRatio ratio={1}/>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  )
}