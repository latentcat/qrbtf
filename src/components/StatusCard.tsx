import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface StatusCardProps {
  title: string;
  children?: React.ReactNode;
}

export function StatusCard(props: StatusCardProps) {
  return (
    <div className="border rounded-xl p-3 _gap-3 flex flex-col justify-between">
      <div className="text-xs text-foreground/50">{props.title}</div>
      <div className="h-8 flex items-end">
        {props.children ? (
          <div className="text-xl font-bold">{props.children}</div>
        ) : (
          <div className="w-full h-full">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
}
