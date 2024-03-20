import { ControllerRenderProps, DefaultValues, Path } from "react-hook-form";

export type QrbtfModule<P, PresetKeys extends string = string> = (
  | QrbtfModuleSvgRenderer<P>
  | QrbtfModuleApiFetcher<P>
) & { presets: Record<PresetKeys, DefaultValues<P>> };

export interface QrbtfModuleSvgRenderer<P> {
  type: "svg_renderer";
  renderer: (props: P & { url: string }) => React.ReactNode;
}

export type ApiFetcher<P> = (
  props: P & { url: string },
  signal: AbortSignal,
) => AsyncGenerator<any, any, any>;

export interface QrbtfModuleApiFetcher<P> {
  type: "api_fetcher";
  fetcher: ApiFetcher<P>;
  visualizer: (props: { data: any }) => React.ReactNode;
}

export type CommonControlProps<P> = {
  name: Path<P>;
  label: string;
  desc?: string;
} & ParamType;

export interface ParamNumberControlProps {
  type: "number";
  config?: {
    min?: number;
    max?: number;
    step?: number;
  };
}

type ActionSlotProps = ControllerRenderProps<any, Path<any>>;

export interface ParamTextControlProps {
  type: "text";
  config?: {
    placeholder?: string;
    maxLength?: number;
    actionSlot?: (props: ActionSlotProps) => React.ReactNode;
  };
}

export interface ParamColorControlProps {
  type: "color";
  config?: {};
}

export interface ParamBooleanControlProps {
  type: "boolean";
  config?: {
    status: string;
    finished?: boolean;
  };
}

interface SelectValue {
  label: string;
  value: string;
}

export interface ParamSelectControlProps {
  type: "select";
  config?: {
    values: SelectValue[];
  };
}

export interface ParamImageControlProps {
  type: "image";
  config?: {
    buttonLabel?: string;
  };
}

export type ParamType = (
  | ParamNumberControlProps
  | ParamTextControlProps
  | ParamColorControlProps
  | ParamBooleanControlProps
  | ParamSelectControlProps
  | ParamImageControlProps
) & {
  // uuid: string
};

export type ParamTypeLiteralAll = ParamType["type"];

export interface QrbtfRendererCommonProps {
  correct_level: "low" | "medium" | "quartile" | "high";
}

export type RendererProps<P = unknown> = P & {
  url: string;
} & React.ComponentPropsWithoutRef<"svg">;
