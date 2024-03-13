import {FormControl, FormDescription, FormItem, FormLabel} from "@/components/ui/form";
import {Slider} from "@/components/ui/slider";
import {cn} from "@/lib/utils";
import React from "react";
import {ControllerRenderProps, FieldValues, Path} from "react-hook-form";
import { Switch } from "@/components/ui/switch"


import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {Badge} from "@/components/ui/badge";
import {CommonControlProps, ParamBooleanControlProps, ParamNumberControlProps} from "@/lib/qrbtf_lib/qrcodes/common";


type ControlCommonProps<P extends FieldValues> = CommonControlProps<P> & { field: ControllerRenderProps<P, Path<P>> }

interface ParamItemProps {
  children: React.ReactNode
}

function ParamItem(props: ParamItemProps) {
  return (
    <FormItem className="flex items-center py-1.5">
      {props.children}
    </FormItem>
  )
}

interface ParamLabelProps {
  label: string
  desc?: string
}

function ParamLabel(props: ParamLabelProps) {
  return (
    <div className="flex flex-col items-start gap-1 grow">
      <FormLabel>
        {props.label}
      </FormLabel>
      {props.desc && (
        <FormDescription>
          {props.desc}
        </FormDescription>
      )}
    </div>
  )
}

interface ParamValueProps {
  children: React.ReactNode
}

function ParamValue(props: ParamValueProps) {
  return (
    <div className="flex items-center gap-2 w-48">
      {props.children}
    </div>
  )
}


export function ParamNumberControl<P extends FieldValues>(props: ControlCommonProps<P> & ParamNumberControlProps) {

  return (
    <ParamItem>
      <ParamLabel label={props.label} desc={props.desc}/>
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
            value={props.field.value ? props.field.value : undefined}
            className="w-16 shrink-0"
            onChange={(value) => props.field.onChange(value.target.value)}
          />
        </FormControl>
      </ParamValue>
    </ParamItem>
  )
}



export function ParamBooleanControl<P extends FieldValues>(props: ControlCommonProps<P> & ParamBooleanControlProps) {
  return (
    <ParamItem>
      <ParamLabel label={props.label} desc={props.desc}/>
      <ParamValue>
        <FormControl>
          <Switch
            checked={props.field.value}
            onCheckedChange={(value) => props.field.onChange(value)}
          />
        </FormControl>
      </ParamValue>
    </ParamItem>
  )
}