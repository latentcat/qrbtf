import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import { useTranslations } from "next-intl";
import {
  qrbtfModuleA1,
  QrbtfRendererA1Props,
} from "@/lib/qrbtf_lib/qrcodes/a1";
import { useA1Params } from "@/lib/qrbtf_lib/qrcodes/a1_config";

export default function Page() {
  const t = useTranslations("qrcodes.a1");
  const { params, defaultValues } = useA1Params("a1");

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
