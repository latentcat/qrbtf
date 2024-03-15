import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import {ConfigType, useCommonParams, usePositioningParams} from "@/lib/qrbtf_lib/qrcodes/common";
import { useTranslations } from "next-intl";
import {
  qrbtfModuleA1,
  QrbtfRendererA1Props,
} from "@/lib/qrbtf_lib/qrcodes/a1";

export default function Page() {
  const t = useTranslations("qrcodes.a1");
  const { commonParams, commonDefault } = useCommonParams()
  const { positioningParams, positioningDefault } = usePositioningParams()

  const params: ConfigType<QrbtfRendererA1Props>[] = [
    ...commonParams,
    ...positioningParams,
    {
      type: "select",
      name: "content_point_type",
      label: t("content_point_type.label"),
      desc: t("content_point_type.desc"),
      config: {
        values: [
          {
            value: "square",
            label: "Square",
          },
          {
            value: "circle",
            label: "Circle",
          },
        ],
      },
    },
    {
      type: "number",
      name: "content_point_scale",
      label: t("content_point_scale.label"),
      desc: t("content_point_scale.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "number",
      name: "content_point_opacity",
      label: t("content_point_opacity.label"),
      desc: t("content_point_opacity.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    // {
    //   type: "color",
    //   name: "content_point_color",
    //   label: t("contrast.label"),
    //   desc: t("contrast.desc"),
    //   config: {
    //     min: 0,
    //     max: 100,
    //   },
    // },
  ];

  const defaultValues: QrbtfRendererA1Props = {
    ...commonDefault,
    ...positioningDefault,
    content_point_type: "square",
    content_point_scale: 1,
    content_point_opacity: 1,
    content_point_color: "#000000",
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
