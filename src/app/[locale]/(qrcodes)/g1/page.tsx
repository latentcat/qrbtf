import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import {
  qrbtfModuleC2,
  QrbtfRendererC2Props,
} from "@/lib/qrbtf_lib/qrcodes/c2";
import { ConfigType, useCommonParams } from "@/lib/qrbtf_lib/qrcodes/common";
import { useTranslations } from "next-intl";
import DefaultBackground from "/public/assets/images/c2_background.inline.png";
import {qrbtfModuleG1, QrbtfRendererG1Props} from "@/lib/qrbtf_lib/qrcodes/g1";

export default function Page() {
  const t = useTranslations("qrcodes.g1");

  const params: ConfigType<QrbtfRendererG1Props>[] = [
  ];

  const defaultValues: QrbtfRendererG1Props = {
    task_type: "qrcode",
    url: "https://midreal.ai/qrcode",
    prompt: "",
    negative_prompt: "",
    seed: -1,
    control_strength: 1,
    prompt_tuning: true,
    image_restoration: false,
    restoration_rate: 0,
    size: "1152",
    padding_ratio: 0.2,
    correct_level: "15",
    anchor_style: "square",
  }

  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererG1Props>
      title={t("title")}
      subtitle={t("subtitle")}
      qrcodeModule={qrbtfModuleG1}
      params={params}
      defaultValues={defaultValues}
    />
  );
}
