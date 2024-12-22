"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { type ChangeEvent, type ReactNode, useTransition } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { usePathname, useRouter } from "@/navigation";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    console.log(nextLocale);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <label
      className={clsx(
        "relative flex items-center",
        isPending && "transition-opacity [&:disabled]:opacity-30",
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex appearance-none bg-transparent"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <div>
        <ChevronUpDownIcon className="w-4 h-4" />
      </div>
    </label>
  );
}
