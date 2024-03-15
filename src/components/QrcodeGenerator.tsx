"use client";

import { NamespaceKeys, NestedKeyOf, useTranslations } from "next-intl";
import { Container } from "@/components/Containers";
import { ConfigType, QrbtfModule } from "@/lib/qrbtf_lib/qrcodes/common";
import { Form, FormField } from "@/components/ui/form";
import { DefaultValues, useForm, useWatch } from "react-hook-form";
import {
  ParamBooleanControl,
  ParamNumberControl,
  ParamSelectControl,
} from "@/components/QrcodeControlParams";
import { HTMLAttributes } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LucideDownload } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { QrTest } from "@/components/QrTest";
import { SectionTitle, StyleTitle } from "@/components/Titles";
import {useAtomValue} from "jotai";
import {urlAtom} from "@/lib/states";

export interface QrcodeGeneratorProps<P extends {}>
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  label?: string;
  subtitle: string;
  qrcodeModule: QrbtfModule<P>;
  params: ConfigType<P>[];
  defaultValues: DefaultValues<P>;
}

export function QrcodeGenerator<P extends {}>(props: QrcodeGeneratorProps<P>) {
  const t = useTranslations("index.params");
  const url = useAtomValue(urlAtom)

  const { children, className, params, defaultValues, ...restProps } = props;

  const form = useForm<P>({
    defaultValues: defaultValues,
  });
  const componentProps = useWatch({ control: form.control }) as P;

  const renderControls = (item: ConfigType<P>) => {
    return (
      <FormField
        control={form.control}
        name={item.name}
        render={({ field }) => {
          switch (item.type) {
            case "number":
              return <ParamNumberControl<P> field={field} {...item} />;
            case "boolean":
              return <ParamBooleanControl<P> field={field} {...item} />;
            case "select":
              return <ParamSelectControl<P> field={field} {...item} />;
          }
        }}
      />
    );
  };

  return (
    <div>
      <Container>
        <div className="mt-9 flex flex-col md:flex-row gap-9">
          <div className="grow">
            <div className="sticky top-9">
              <StyleTitle
                title={props.title}
                label={props.label}
                subtitle={props.subtitle}
              />

              <div>
                <Form {...form}>
                  <form className="not-prose divide-y">
                    {params.map((param) => (
                      <div
                        key={param.name}
                        className="py-1 flex flex-col items-stretch justify-center min-h-[60px]"
                      >
                        {renderControls(param)}
                      </div>
                    ))}
                  </form>
                </Form>
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full sm:w-[396px] md:w-72 lg:w-[396px]">
            <div className="sticky top-9">
              <Button className="w-full mb-6 hidden">{t("generate")}</Button>
              <div className="">
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
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white">
                    {props.qrcodeModule.renderer({
                      className: "w-full",
                      url: url || "https://qrbtf.com",
                      ...componentProps
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
