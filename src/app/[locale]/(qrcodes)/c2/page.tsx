import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import {
  qrbtfModuleC2,
  QrbtfRendererC2Props,
} from "@/lib/qrbtf_lib/qrcodes/c2";
import { ConfigType, useCommonParams } from "@/lib/qrbtf_lib/qrcodes/common";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("qrcodes.c2");
  const { commonParams, commonDefault } = useCommonParams();

  const params: ConfigType<QrbtfRendererC2Props>[] = [
    ...commonParams,
    {
      type: "number",
      name: "contrast",
      label: t("contrast.label"),
      desc: t("contrast.desc"),
      config: {
        min: 0,
        max: 100,
      },
    },
    {
      type: "number",
      name: "brightness",
      label: t("brightness.label"),
      desc: t("brightness.desc"),
      config: {
        min: 0,
        max: 100,
      },
    },
    {
      type: "image",
      name: "background",
      label: t("background.label"),
      desc: t("background.desc"),
    },
    {
      type: "select",
      name: "align_type",
      label: t("align_type.label"),
      desc: t("align_type.desc"),
      config: {
        values: [
          {
            label: "无",
            value: "none",
          },
          {
            label: "黑白",
            value: "black-white",
          },
        ],
      },
    },
    {
      type: "select",
      name: "timing_type",
      label: t("timing_type.label"),
      desc: t("timing_type.desc"),
      config: {
        values: [
          {
            label: "无",
            value: "none",
          },
          {
            label: "黑白",
            value: "black-white",
          },
        ],
      },
    },
  ];

  const defaultValues: QrbtfRendererC2Props = {
    ...commonDefault,
    brightness: 0,
    contrast: 1,
    background: "",
    align_type: "none",
    timing_type: "none",
  };

  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererC2Props>
      title={t("title")}
      label={"R"}
      subtitle={t("subtitle")}
      qrcodeModule={qrbtfModuleC2}
      params={params}
      defaultValues={defaultValues}
    />
  );
}
