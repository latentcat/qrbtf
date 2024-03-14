import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import { ConfigType, useCommonParams } from "@/lib/qrbtf_lib/qrcodes/common";
import { useTranslations } from "next-intl";
import {qrbtfModuleA1, QrbtfRendererA1Props} from "@/lib/qrbtf_lib/qrcodes/a1";

export default function Page() {
  const t = useTranslations("qrcodes.a1");
  const commonParams = useCommonParams();

  const params: ConfigType<QrbtfRendererA1Props>[] = [
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

  const defaultValues: QrbtfRendererA1Props = {
    brightness: 0,
    contrast: 1,
    correct_level: "7",
  };

  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererA1Props>
      title={t("title")}
      subtitle={t("subtitle")}
      qrcodeModule={qrbtfModuleA1}
      params={params}
      defaultValues={defaultValues}
    />
  );
}
