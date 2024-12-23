"use client";

import React, { type ReactNode } from "react";
import mixpanel from "mixpanel-browser";
import { type LinkProps } from "next/link";

import { Link, usePathname } from "@/i18n/routing";

interface TrackLinkProps extends LinkProps {
  children?: ReactNode;
  trackValue: string | string[];
  className?: string;
  target?: string;
}

export const TrackLink: React.FC<TrackLinkProps> = ({
  trackValue,
  onClick,
  locale,
  ...props
}) => {
  const dataArray = Array.isArray(trackValue)
    ? trackValue
    : ["type", trackValue];
  const pathname = usePathname();

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    let type = dataArray[0];
    let properties: Record<string, string> = {};

    properties["current_path"] = pathname;
    properties["type"] = type;
    properties[type] = dataArray[1];

    mixpanel.track("link_clicked", properties);
  };

  return (
    <Link
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
        handleClick(e);
      }}
      {...props}
    >
      {props.children}
    </Link>
  );
};

export function trackEvent(name: string, properties?: Record<string, any>) {
  mixpanel.track(name, properties);
}
