"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useEffect } from "react";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

function Progress({ value, className }: ProgressProps) {
  const x = useSpring(0, {
    damping: 12,
    mass: 1,
    stiffness: 36,
  });

  useEffect(() => {
    x.set(value);
  }, [value, x]);

  return (
    <div
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-primary/10",
        className,
      )}
    >
      <motion.div
        className="h-full w-full flex-1 bg-primary origin-left"
        style={{ scaleX: x }}
      />
    </div>
  );
}

export { Progress };
