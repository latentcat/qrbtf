"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import React, { Fragment, useState } from "react";
import {
  ChevronDownIcon,
  Cross1Icon,
  ArrowTopRightIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { transitionXl, transitionMd, transitionLg } from "@/lib/animations";
import { QrbtfLogo } from "@/components/Logos";
import { Container } from "@/components/Containers";
import { AuthButton } from "@/components/AuthButton";

const headerLinks = [
  // {
  //   name: "Docs",
  //   href: "/docs",
  // },
  // {
  //   name: "Components",
  //   href: "/docs/components",
  // },
  {
    name: "GitHub",
    href: "https://github.com/latentcat/qrbtf",
    target: "_blank",
  },
  {
    name: "Latent Cat",
    href: "https://latentcat.com",
    target: "_blank",
  },
];

interface HeaderLinkProps {
  name: string;
  href: string;
  target?: string;
  onClick?: () => void;
}

function MobileNavItem(props: HeaderLinkProps) {
  return (
    <li>
      <Link
        href={props.href}
        target={props.target}
        onClick={props.onClick}
        className="py-1 font-bold text-xl flex items-center"
      >
        {props.name}
        {props.target && <ArrowTopRightIcon className="w-5 h-5 ml-2" />}
      </Link>
    </li>
  );
}

function MobileNavigation(props: React.ComponentPropsWithoutRef<"div">) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div
        className={clsx(
          "fixed top-0 z-20 w-full bg-background h-14 flex md:hidden items-center justify-between px-6 _lg:px-12 break-words",
          props.className,
        )}
      >
        <Link href="/" className="p-2 -m-2" onClick={() => setMenuOpen(false)}>
          <QrbtfLogo className="h-7" />
        </Link>
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {!menuOpen ? (
              <Bars3Icon className="h-6 w-6 stroke-foreground" />
            ) : (
              <XMarkIcon className="h-6 w-6 text-foreground" />
            )}
          </Button>
          <div className="w-3"></div>
          <AuthButton />
        </div>
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-foreground/10 translate-y-[1px]" />
      </div>
      <div className="lg:hidden">
        <motion.div
          className={clsx(
            "fixed z-10 w-full top-0 left-0 bg-background overflow-hidden",
            menuOpen ? "block" : "hidden",
          )}
          animate={{
            height: menuOpen ? "100%" : 56,
            opacity: menuOpen ? 1 : 0,
          }}
          transition={transitionLg}
        >
          <div className={clsx("w-full h-screen top-0 left-0 flex flex-col")}>
            <HeaderPadding />
            <motion.div
              className="grow relative"
              animate={{
                y: menuOpen ? 0 : -20,
                // opacity: menuOpen ? 1 : 0,
              }}
              transition={transitionLg}
            >
              <div className="absolute w-full h-full top-0 left-0 overflow-y-auto px-6 lg:px-12 py-6">
                <nav className="">
                  <ul className="_-my-2 text-base text-zinc-800 dark:text-zinc-200">
                    {headerLinks.map((item, index) => (
                      <MobileNavItem
                        key={index}
                        {...item}
                        onClick={() => setMenuOpen(false)}
                      ></MobileNavItem>
                    ))}
                  </ul>
                </nav>
                <div className="h-6" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

function NavItem(props: HeaderLinkProps) {
  let isActive = usePathname() === props.href;

  return (
    <li>
      <Link
        href={props.href}
        target={props.target}
        className={clsx(
          "relative flex items-center px-3 py-2 transition",
          isActive
            ? "text-black dark:text-white"
            : "text-zinc-600 dark:text-zinc-400",
        )}
      >
        {props.name}
        {props.target && <ArrowTopRightIcon className="w-4 h-4 ml-1" />}
      </Link>
    </li>
  );
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<"nav">) {
  return (
    <div
      className={clsx(
        "fixed top-0 z-20 w-full bg-background hidden md:flex break-words",
        props.className,
      )}
    >
      <Container>
        <div className="h-14 flex items-center justify-between">
          <Link href="/" className="p-2 -m-2">
            <QrbtfLogo className="h-7" />
          </Link>
          <div className="flex items-center">
            <nav>
              <ul className="flex text-sm _font-medium text-zinc-800 dark:text-zinc-200 items-center">
                {headerLinks.map((item, index) => (
                  <NavItem key={index} {...item}></NavItem>
                ))}
              </ul>
            </nav>
            <div className="w-3"></div>
            <AuthButton />
          </div>
          <div className="absolute bottom-0 left-0 h-[1px] w-full bg-foreground/10 translate-y-[1px]" />
        </div>
      </Container>
    </div>
  );
}

export function Header() {
  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  );
}

export function HeaderPadding() {
  return <div className="h-14" />;
}
