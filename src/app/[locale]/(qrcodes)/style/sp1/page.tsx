import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import { useTranslations } from "next-intl";
import {
  qrbtfModuleSp1,
  QrbtfRendererSp1Props,
} from "@/lib/qrbtf_lib/qrcodes/sp1";
import { useSp1Params } from "@/lib/qrbtf_lib/qrcodes/sp1_config";

export default function Page() {
  const t = useTranslations("qrcodes.sp1");
  const { params } = useSp1Params();
  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererSp1Props>
      title={t("title")}
      subtitle={t("subtitle")}
      qrcodeModule={qrbtfModuleSp1}
      params={params}
      defaultPreset="sp1"
    />
  );
}
