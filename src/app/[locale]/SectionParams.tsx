import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Container } from "@/components/Containers";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { LucideDownload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { QrTest } from "@/components/QrTest";

export function SectionParams() {
  const t = useTranslations("index.params");

  return (
    <div className="">
      <Container>
        <div className="mt-9 flex flex-col _md:flex-row gap-9">
          <div className="grow">
            <h2 className="mb-4 text-2xl font-bold">A1</h2>
            <div className="flex items-center w-full justify-between">
              <Label>{t("param_name")}</Label>
              <div className="w-48">
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
            <Button className="w-full">{t("generate")}</Button>
            <div className="mt-6">
              <Label
                className="flex items-center justify-between mb-1.5"
                htmlFor="output_image"
              >
                {t("qrcode_output")}
                <Badge
                  // onClick={() => downloadImage()}
                  className={cn(
                    "rounded-md hover:bg-accent cursor-pointer",
                    false ? "" : "opacity-50 pointer-events-none",
                  )}
                  variant="outline"
                >
                  <LucideDownload className="w-4 h-4 mr-1" />
                  {t("download")}
                </Badge>
              </Label>
              <div className="relative border rounded-xl bg-accent/30 w-full overflow-hidden">
                <AspectRatio ratio={1} />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                  <QrCodeIcon className="w-12 h-12 opacity-20" />
                </div>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                  <QrTest />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
