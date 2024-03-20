import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import {
  qrbtfModuleC2,
  QrbtfRendererC2Props,
} from "@/lib/qrbtf_lib/qrcodes/c2";
import { useTranslations } from "next-intl";
import { useC2Params } from "@/lib/qrbtf_lib/qrcodes/c2_config";

export default function Page() {
  const t = useTranslations("qrcodes.c2");
  const { params } = useC2Params();

  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererC2Props>
      title={t("title")}
      label={"R"}
      subtitle={t("subtitle")}
      qrcodeModule={qrbtfModuleC2}
      params={params}
      defaultPreset="c2"
    />
  );
}
