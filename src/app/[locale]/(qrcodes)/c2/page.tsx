import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import {qrbtfModuleC2, QrbtfRendererC2Props} from "@/lib/qrbtf_lib/qrcodes/c2";
import {ConfigType} from "@/lib/qrbtf_lib/qrcodes/common";
import {useTranslations} from "next-intl";


export default function Page() {
  const t = useTranslations("qrcodes.c2");

  const params: ConfigType<QrbtfRendererC2Props>[] = [
    {
      type: "number",
      name: "contrast",
      label: t('contrast.label'),
      config: {
        min: 0,
        max: 100,
      }
    },
  ]

  const defaultValues: QrbtfRendererC2Props = {
    brightness: 0,
    contrast: 1,
    correctLevel: "7"
  }

  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererC2Props>
      namespace="qrcodes.c2"
      qrcodeModule={qrbtfModuleC2}
      params={params}
      defaultValues={defaultValues}
    />
  );
}