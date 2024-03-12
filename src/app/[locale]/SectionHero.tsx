import {useTranslations} from "next-intl";
import {Container} from "@/components/Containers";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDiscord} from "@fortawesome/free-brands-svg-icons";
import {cn} from "@/lib/utils";
import {GitHubButton} from "@/components/GitHubButton";
import {Badge} from "@/components/ui/badge";
import {LucideScan} from "lucide-react";
import {ScanButton} from "@/components/ScanButton";


export function SectionHero() {
  const t = useTranslations('index.hero');


  return (
    <div className="mt-24 lg:mt-36">
      <Container>
        <div>

          <h1 className="text-4xl lg:text-5xl font-bold">
            {t('title')}
          </h1>

          <p className="text-lg mt-6 opacity-70">
            {t('subtitle')}
          </p>

          <div className="mt-6 flex gap-3">
            <Link href="https://discord.gg/V9CNuqYfte" target="_blank">
              <Button size="sm" variant="secondary">
                <FontAwesomeIcon icon={faDiscord} className={cn("h-5 w-5 block mr-2")} />
                Join our server
              </Button>
            </Link>
            <Link href="https://github.com/latentcat/qrbtf" target="_blank">
              <GitHubButton />
            </Link>
          </div>

          <div className="mt-6 w-full sm:max-w-lg">
            <div className="flex justify-between text-sm font-semibold mb-1">
              <h3>URL</h3>
              <div className="flex items-center gap-3">
                <div className="text-sm">
                  10
                  <span className="opacity-50">/255</span>
                </div>
                <ScanButton />
              </div>
            </div>
            <Input
              placeholder="https://qrbtf.com"
            />
          </div>

        </div>
      </Container>
    </div>
  )
}