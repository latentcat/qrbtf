import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="w-full flex flex-col items-center px-6 lg:px-12">
      <div className="w-full max-w-5xl">{props.children}</div>
    </div>
  );
}

export function SplitView(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col md:flex-row gap-9", props.className)}>
      {props.children}
    </div>
  );
}

export function SplitLeft(props: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grow", props.className)}>{props.children}</div>;
}

export function SplitRight(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "shrink-0 w-full sm:w-[402px] md:w-72 lg:w-[402px]",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
