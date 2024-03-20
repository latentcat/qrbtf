"use client";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import React, {
  ChangeEventHandler,
  CSSProperties,
  useMemo,
  useRef,
} from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  CommonControlProps,
  ParamBooleanControlProps,
  ParamColorControlProps,
  ParamImageControlProps,
  ParamNumberControlProps,
  ParamSelectControlProps,
  ParamTextControlProps,
} from "@/lib/qrbtf_lib/qrcodes/param";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { toBase64 } from "@/lib/image_utils";
import {
  Colorful,
  hexToHsva,
  HsvaColor,
  hsvaToHex,
  Hue,
  Saturation,
} from "@uiw/react-color";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BACKGROUND_IMG } from "@uiw/react-color-alpha";
import { LucideUpload } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { trackEvent } from "@/components/TrackComponents";

type ControlCommonProps<P extends FieldValues> = CommonControlProps<P> & {
  field: ControllerRenderProps<P, Path<P>>;
};

interface ParamItemProps {
  children: React.ReactNode;
}

function ParamItem(props: ParamItemProps) {
  return (
    <FormItem className="flex items-center py-1.5 space-y-0">
      {props.children}
    </FormItem>
  );
}

interface ParamLabelProps {
  label: string;
  desc?: string;
}

function ParamLabel(props: ParamLabelProps) {
  return (
    <div className="flex flex-col items-start gap-1 grow">
      <FormLabel>{props.label}</FormLabel>
      {props.desc && (
        <FormDescription className="text-xs">{props.desc}</FormDescription>
      )}
    </div>
  );
}

interface ParamValueProps {
  children: React.ReactNode;
}

function ParamValue(props: ParamValueProps) {
  return (
    <div className="relative flex justify-end items-center gap-2 w-48">
      {props.children}
    </div>
  );
}

export function ParamNumberControl<P extends FieldValues>(
  props: ControlCommonProps<P> & ParamNumberControlProps,
) {
  return (
    <ParamItem>
      <ParamLabel label={props.label} desc={props.desc} />
      <ParamValue>
        <FormControl>
          <Slider
            value={
              props.field.value !== undefined ? [props.field.value] : undefined
            }
            min={props.config?.min || 0}
            max={props.config?.max || 100}
            step={props.config?.step || 1}
            className="w-full shrink"
            onValueChange={(value) => props.field.onChange(value[0])}
          />
        </FormControl>
        <FormControl>
          <Input
            value={props.field.value}
            className="w-16 shrink-0"
            onChange={(value) =>
              props.field.onChange(parseInt(value.target.value))
            }
          />
        </FormControl>
      </ParamValue>
    </ParamItem>
  );
}

export function ParamTextControl<P extends FieldValues>(
  props: ControlCommonProps<P> & ParamTextControlProps,
) {
  return (
    <div className="flex flex-col py-4">
      <div>
        <ParamLabel label={props.label} />
        {/*{props.config?.actionSlot && props.config?.actionSlot(props.field)}*/}
      </div>
      <div className="h-3" />
      <FormControl className="w-full">
        <Textarea
          placeholder={props.config?.placeholder}
          value={props.field.value}
          className="resize-none w-full shrink-0"
          onChange={(value) => props.field.onChange(value.target.value)}
        />
      </FormControl>
      <div className="h-1.5" />
      <FormDescription>{props.desc}</FormDescription>
    </div>
  );
}

const Pointer = ({
  style,
  color,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { color: string }) => {
  const stylePointer = {
    "--colorful-pointer-background-color": "#fff",
    "--colorful-pointer-border": "2px solid #fff",
    height: 28,
    width: 28,
    position: "absolute",
    transform: "translate(-14px, -4px)",
    boxShadow: "0 2px 4px rgb(0 0 0 / 20%)",
    borderRadius: "50%",
    background: `url(${BACKGROUND_IMG})`,
    backgroundColor: "var(--colorful-pointer-background-color)",
    border: "var(--colorful-pointer-border)",
    zIndex: 1,
    ...style,
  } as CSSProperties;
  return (
    <div {...props} style={stylePointer}>
      <div
        style={{
          backgroundColor: color,
          borderRadius: "50%",
          height: " 100%",
          width: "100%",
        }}
      />
    </div>
  );
};

export function ParamColorControl<P extends FieldValues>(
  props: ControlCommonProps<P> & ParamColorControlProps,
) {
  const hsva = useMemo(() => {
    try {
      return hexToHsva(props.field.value);
    } catch {
      const newHsva: HsvaColor = {
        a: 0,
        h: 0,
        s: 0,
        v: 0,
      };
      return newHsva;
    }
  }, [props.field.value]);

  return (
    <ParamItem>
      <ParamLabel label={props.label} desc={props.desc} />
      <ParamValue>
        <FormControl>
          <Input
            value={props.field.value}
            className="w-full shrink-0 pl-10"
            onChange={(value) => props.field.onChange(value.target.value)}
          />
        </FormControl>
        <FormControl>
          <Popover>
            <PopoverTrigger className="absolute top-0 left-0">
              <div className="p-2">
                <div
                  className="w-6 h-6 rounded-sm border"
                  style={{ background: props.field.value }}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <AspectRatio ratio={1}>
                <Saturation
                  className="rounded-md"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  radius="4px 4px 4px 4px"
                  pointer={({ left, top, color }) => (
                    <Pointer
                      style={{
                        left,
                        top,
                        transform: "translate(-16px, -16px)",
                      }}
                      color={hsvaToHex(hsva)}
                    />
                  )}
                  hsva={hsva}
                  onChange={(newColor) => {
                    props.field.onChange(
                      hsvaToHex({ ...hsva, ...newColor, a: hsva.a }),
                    );
                  }}
                />
              </AspectRatio>
              <div className="h-2" />
              <Hue
                className="rounded-md"
                style={{
                  width: "100%",
                }}
                height={20}
                radius="4px 4px 4px 4px"
                pointer={({ left }) => (
                  <Pointer
                    style={{ left }}
                    color={`hsl(${hsva.h || 0}deg 100% 50%)`}
                  />
                )}
                hue={hsva.h}
                onChange={(newHue) => {
                  props.field.onChange(hsvaToHex({ ...hsva, ...newHue }));
                }}
              />
            </PopoverContent>
          </Popover>
        </FormControl>
      </ParamValue>
    </ParamItem>
  );
}

export function ParamBooleanControl<P extends FieldValues>(
  props: ControlCommonProps<P> & ParamBooleanControlProps,
) {
  return (
    <ParamItem>
      <ParamLabel label={props.label} desc={props.desc} />
      <ParamValue>
        <FormControl>
          <Switch
            checked={props.field.value}
            onCheckedChange={(value) => props.field.onChange(value)}
          />
        </FormControl>
      </ParamValue>
    </ParamItem>
  );
}

export function ParamSelectControl<P extends FieldValues>(
  props: ControlCommonProps<P> & ParamSelectControlProps,
) {
  return (
    <ParamItem>
      <ParamLabel label={props.label} desc={props.desc} />
      <ParamValue>
        <FormControl>
          <Select
            value={props.field.value}
            onValueChange={props.field.onChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              {props.config?.values.map((item, index) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormControl>
      </ParamValue>
    </ParamItem>
  );
}

export function ParamImageControl<P extends FieldValues>(
  props: ControlCommonProps<P> & ParamImageControlProps,
) {
  const onImageUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await toBase64(file, 1.0);
      props.field.onChange(base64);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ParamItem>
      <ParamLabel label={props.label} desc={props.desc} />
      <ParamValue>
        <FormControl>
          <>
            <Input
              ref={inputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={onImageUpload}
            />
            <Button
              onClick={(evt) => {
                evt.preventDefault();
                trackEvent("upload_image_button");
                inputRef.current?.click();
              }}
              className="w-full font-normal"
              variant="outline"
            >
              <LucideUpload className="w-4 h-4 mr-1.5" />
              {props.config?.buttonLabel || "Button"}
            </Button>
          </>
        </FormControl>
      </ParamValue>
    </ParamItem>
  );
}
