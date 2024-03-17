"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/Containers";
import { ConfigType, QrbtfModule } from "@/lib/qrbtf_lib/qrcodes/common";
import { Form, FormField } from "@/components/ui/form";
import { DefaultValues, useForm, useWatch } from "react-hook-form";
import {
  ParamBooleanControl,
  ParamColorControl,
  ParamImageControl,
  ParamNumberControl,
  ParamSelectControl,
  ParamTextControl,
} from "@/components/QrcodeControlParams";
import { HTMLAttributes, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, useCurrentQrcodeType } from "@/lib/utils";
import { LucideDownload } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { QrCodeIcon } from "@heroicons/react/24/outline";
import { StyleTitle } from "@/components/Titles";
import { useAtomValue } from "jotai";
import { urlAtom } from "@/lib/states";
import { download } from "@/lib/downloader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useImageService } from "@/lib/image_service";

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
  const url = useAtomValue(urlAtom);
  const { onSubmit, resData } = useImageService();

  const { children, className, params, defaultValues, ...restProps } = props;

  const form = useForm<P>({
    defaultValues: defaultValues,
  });
  const componentProps = useWatch({ control: form.control }) as P;

  // Download
  const qrcodeWrapperRef = useRef<HTMLDivElement | null>(null);
  const currentQrcodeType = useCurrentQrcodeType();

  const renderControls = (item: ConfigType<P>) => {
    return (
      <FormField
        control={form.control}
        name={item.name}
        render={({ field }) => {
          switch (item.type) {
            case "number":
              return <ParamNumberControl<P> field={field} {...item} />;
            case "text":
              return <ParamTextControl<P> field={field} {...item} />;
            case "color":
              return <ParamColorControl<P> field={field} {...item} />;
            case "boolean":
              return <ParamBooleanControl<P> field={field} {...item} />;
            case "select":
              return <ParamSelectControl<P> field={field} {...item} />;
            case "image":
              return <ParamImageControl<P> field={field} {...item} />;
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
            <div className="_sticky _top-9">
              <StyleTitle
                title={props.title}
                label={props.label}
                subtitle={props.subtitle}
              />

              <div>
                <Form {...form}>
                  <form className="not-prose _divide-y">
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
              {props.qrcodeModule.type === "api_fetcher" && (
                <Button
                  className="w-full mb-6"
                  onClick={() => onSubmit(form.getValues())}
                >
                  {t("generate")}
                </Button>
              )}
              <div className="">
                <Label
                  className="flex items-center justify-between mb-1.5"
                  htmlFor="output_image"
                >
                  {t("qrcode_output")}
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Badge
                        className={cn(
                          "rounded-md hover:bg-accent cursor-pointer",
                        )}
                        variant="outline"
                      >
                        <LucideDownload className="w-4 h-4 mr-1" />
                        {t("download")}
                      </Badge>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {(["svg", "jpg", "png"] as const).map((type) => (
                        <DropdownMenuItem
                          key={type}
                          onClick={() =>
                            qrcodeWrapperRef.current &&
                            download(
                              currentQrcodeType,
                              qrcodeWrapperRef.current,
                              type,
                            )
                          }
                        >
                          <span className="_font-mono">
                            {type.toLocaleUpperCase()}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Label>
                <div className="relative border rounded-xl bg-accent/30 w-full overflow-hidden">
                  <AspectRatio ratio={1} />
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                    <QrCodeIcon className="w-12 h-12 opacity-20" />
                  </div>
                  <div
                    ref={qrcodeWrapperRef}
                    className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-white"
                  >
                    {props.qrcodeModule.type === "svg_renderer" && (
                      <>
                        {props.qrcodeModule.renderer({
                          className: "w-full",
                          url: url || "https://qrbtf.com",
                          ...componentProps,
                        })}
                      </>
                    )}
                    {props.qrcodeModule.type === "api_fetcher" && (
                      <>{props.qrcodeModule.visualizer({ data: resData })}</>
                    )}
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
