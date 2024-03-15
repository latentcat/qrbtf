"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { locales } from "@/navigation";
import { useTranslations } from "next-intl";

type Theme = "light" | "dark" | "system";
const themes: Theme[] = ["light", "dark", "system"];

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("ModeToggle");

  return (
    <label
      className={clsx(
        "relative flex items-center",
        // isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only" suppressHydrationWarning>
        {theme}
      </p>
      <select
        className="inline-flex appearance-none bg-transparent"
        value={theme}
        // disabled={isPending}
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes.map((item) => (
          <option key={item} value={item}>
            {t(item)}
          </option>
        ))}
      </select>
      <div>
        <ChevronUpDownIcon className="w-4 h-4" />
      </div>
    </label>
  );
}
