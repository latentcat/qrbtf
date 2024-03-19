import QrcodeGeneratorWithProvider from "@/components/QrcodeGeneratorWithProvider";
import {
  ConfigType,
  useCommonParams,
  usePositioningParams,
} from "@/lib/qrbtf_lib/qrcodes/common";
import { useTranslations } from "next-intl";
import {
  qrbtfModuleSp1,
  QrbtfRendererSp1Props,
} from "@/lib/qrbtf_lib/qrcodes/sp1";

export default function Page() {
  const t = useTranslations("qrcodes.sp1");
  const { commonParams, commonDefault } = useCommonParams();
  const { positioningParams, positioningDefault } = usePositioningParams();

  const params: ConfigType<QrbtfRendererSp1Props>[] = [
    ...commonParams,
    {
      type: "number",
      name: "content_stroke_width",
      label: t("content_stroke_width.label"),
      desc: t("content_stroke_width.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "number",
      name: "content_x_stroke_width",
      label: t("content_x_stroke_width.label"),
      desc: t("content_x_stroke_width.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "number",
      name: "positioning_stroke_width",
      label: t("positioning_stroke_width.label"),
      desc: t("positioning_stroke_width.desc"),
      config: {
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    {
      type: "select",
      name: "positioning_point_type",
      label: t("positioning_point_type.label"),
      desc: t("positioning_point_type.desc"),
      config: {
        values: [
          {
            value: "dsj",
            label: t("dsj"),
          },
          {
            value: "square",
            label: t("square"),
          },
        ],
      },
    },
  ];

  const defaultValues: QrbtfRendererSp1Props = {
    ...commonDefault,
    content_stroke_width: 0.7,
    content_x_stroke_width: 0.7,
    positioning_stroke_width: 0.9,
    positioning_point_type: "dsj",
  };

  return (
    <QrcodeGeneratorWithProvider<QrbtfRendererSp1Props>
      title={t("title")}
      subtitle={t("subtitle")}
      qrcodeModule={qrbtfModuleSp1}
      params={params}
      defaultValues={defaultValues}
    />
  );
}
