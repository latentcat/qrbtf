import {FormControl, FormItem, FormLabel} from "@/components/ui/form";
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


export function ParamNumberControl<P extends FieldValues>(props: ControlCommonProps<P> & ParamNumberControlProps) {

  return (
    <FormItem className="flex items-center py-1.5">
      <FormLabel className="w-48 flex items-center gap-2 grow">
        {props.config?.optional && (
          <FormControl>
            {props.config?.optional && (
              <Checkbox
                checked={props.field.value !== undefined}
                onCheckedChange={(value) => (
                  props.field.onChange(props.field.value !== undefined ? undefined : (props.config?.default || 0))
                )}
              />
            )}
          </FormControl>
        )}
        {props.label}
        <Badge variant="outline" className="px-1.5 py-0 leading-5 text-foreground/50 font-mono">{props.name}</Badge>
      </FormLabel>
      <div className="flex items-center gap-2">
        <FormControl>
          <Slider
            value={props.field.value ? [props.field.value] : undefined}
            min={props.config?.min || 0}
            max={props.config?.max || 100}
            step={props.config?.step || 1}
            className={cn("w-32")}
            onValueChange={(value) => props.field.onChange(value[0])}
          />
        </FormControl>
        <FormControl>
          <Input
            value={props.field.value ? props.field.value : undefined}
            className={cn("w-16")}
            onChange={(value) => props.field.onChange(value.target.value)}
          />
        </FormControl>
      </div>
    </FormItem>
  )
}



export function ParamBooleanControl<P extends FieldValues>(props: ControlCommonProps<P> & ParamBooleanControlProps) {
  return (
    <FormItem className="flex items-center py-1.5">
      <FormLabel className="w-48 grow flex items-center gap-2">
        {props.label}
        <Badge variant="outline" className="px-1.5 py-0 leading-5 text-foreground/50 font-mono">{props.name}</Badge>
      </FormLabel>
      <FormControl>
        <Switch
          checked={props.field.value}
          onCheckedChange={(value) => props.field.onChange(value)}
        />
      </FormControl>
    </FormItem>
  )
}