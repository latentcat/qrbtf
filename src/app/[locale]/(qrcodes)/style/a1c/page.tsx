import { useTranslations } from "next-intl";

import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import {
  qrbtfModuleA1,
  type QrbtfRendererA1Props,
} from "@/lib/qrbtf_lib/qrcodes/a1";
import { useA1Params } from "@/lib/qrbtf_lib/qrcodes/a1_config";

export default function Page() {
  const t = useTranslations("qrcodes.a1");
  const { params } = useA1Params();

  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererA1Props>
      title={t("title")}
      label={"C"}
      subtitle={t("subtitle")}
      qrcodeModule={qrbtfModuleA1}
      params={params}
      defaultPreset="a1c"
    />
  );
}
