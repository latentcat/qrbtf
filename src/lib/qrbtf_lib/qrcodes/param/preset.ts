import { useTranslations } from "next-intl";
import { CommonControlProps } from ".";

export interface QrbtfRendererPresetProps<K extends string> {
  presetKey: K;
}

type PresetParamsType<K extends string> = CommonControlProps<
  QrbtfRendererPresetProps<K>
>;

interface UsePresetParamsProps<K extends string, V> {
  presets: Record<K, V>;
  default: K;
}

export default function usePresetParams<K extends string, V>(
  props: UsePresetParamsProps<K, V>,
) {
  const t = useTranslations("qrcodes.preset");
  const presetParams: PresetParamsType<K>[] = [
    {
      type: "select",
      name: "presetKey" as any,
      label: t("label"),
      desc: t("desc"),
      config: {
        values: Object.keys(props.presets).map((k) => ({
          label: k.toLocaleUpperCase(),
          value: k,
        })),
      },
    },
  ];

  const presetDefault: QrbtfRendererPresetProps<K> = {
    presetKey: props.default,
  };

  return {
    presetParams,
    presetDefault,
  };
}
