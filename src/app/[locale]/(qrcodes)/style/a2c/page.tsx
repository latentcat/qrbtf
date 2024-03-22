import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import { useTranslations } from "next-intl";
import {
  qrbtfModuleA1,
  QrbtfRendererA1Props,
} from "@/lib/qrbtf_lib/qrcodes/a1";
import { useA1Params } from "@/lib/qrbtf_lib/qrcodes/a1_config";
import {
  qrbtfModuleA2,
  QrbtfRendererA2Props,
} from "@/lib/qrbtf_lib/qrcodes/a2";
import { useA2Params } from "@/lib/qrbtf_lib/qrcodes/a2_config";

export default function Page() {
  const t = useTranslations("qrcodes.a2");
  const { params } = useA2Params();

  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererA2Props>
      title={t("title")}
      label={"C"}
      subtitle={t("subtitle")}
      qrcodeModule={qrbtfModuleA2}
      params={params}
      defaultPreset="a2c"
    />
  );
}
