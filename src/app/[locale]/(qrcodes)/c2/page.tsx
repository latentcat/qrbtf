import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import {
  qrbtfModuleC2,
  QrbtfRendererC2Props,
} from "@/lib/qrbtf_lib/qrcodes/c2";
import { ConfigType, useCommonParams } from "@/lib/qrbtf_lib/qrcodes/common";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("qrcodes.c2");
  const commonParams = useCommonParams();

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
  ];

  const defaultValues: QrbtfRendererC2Props = {
    brightness: 0,
    contrast: 1,
    correct_level: "7",
  };

  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererC2Props>
      title={t("title")}
      subtitle={t("subtitle")}
      qrcodeModule={qrbtfModuleC2}
      params={params}
      defaultValues={defaultValues}
    />
  );
}
