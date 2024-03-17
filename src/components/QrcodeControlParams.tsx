"use client"

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import React, { ChangeEvent, ChangeEventHandler, useRef } from "react";
import { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  CommonControlProps,
  ParamBooleanControlProps, ParamColorControlProps,
  ParamImageControlProps,
  ParamNumberControlProps,
  ParamSelectControlProps,
} from "@/lib/qrbtf_lib/qrcodes/common";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toBase64 } from "@/lib/image_utils";
import {HuePicker, SketchPicker} from 'react-color';

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
  return <div className="relative flex items-center gap-2 w-48">{props.children}</div>;
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
            value={props.field.value ? [props.field.value] : undefined}
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

export function ParamColorControl<P extends FieldValues>(
  props: ControlCommonProps<P> & ParamColorControlProps,
) {
  return (
    <ParamItem>
      <ParamLabel label={props.label} desc={props.desc} />
      <ParamValue>
        <FormControl>
          <Input
            value={props.field.value}
            className="w-full shrink-0 pl-10"
            onChange={(value) =>
              props.field.onChange(value.target.value)
            }
          />
        </FormControl>
        <FormControl>
          <Popover>
            <PopoverTrigger className="absolute top-2 left-2">
              <div className="w-6 h-6 rounded-sm border" style={{ background: props.field.value }} />
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <SketchPicker
                color={ props.field.value }
                onChange={(value) =>
                  props.field.onChange(value.hex)
                }
              />
              <HuePicker
                className="w-full"
                styles={{ default: { picker: { width: "100%" } } }}
                color={ props.field.value }
                onChange={(value) =>
                  props.field.onChange(value.hex)
                }
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
                inputRef.current?.click();
              }}
              className="w-full font-normal"
              variant="outline"
            >
              {props.config?.buttonLabel || "Button"}
            </Button>
          </>
        </FormControl>
      </ParamValue>
    </ParamItem>
  );
}
