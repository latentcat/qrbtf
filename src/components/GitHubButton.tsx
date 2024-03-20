"use client";

import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/LogosBrand";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { transitionLg, transitionMd, transitionXl } from "@/lib/animations";
import { http } from "@/lib/network";

export function GitHubButton() {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    http("/api/stars").then(async (res) => {
      const data = await res.json();
      if (data.hasOwnProperty("star_count")) {
        setStarCount(data["star_count"]);
      } else {
        console.log("[API Error]");
      }
    });
  }, []);

  return (
    <Button variant="secondary" size="sm" className="overflow-hidden">
      <motion.div className="flex items-center" layout layoutRoot>
        <GitHubIcon className="h-4 mr-2" />
        <span>GitHub</span>

        <AnimatePresence>
          {!!starCount && (
            <motion.div
              key="stars"
              className="flex items-center"
              layout="position"
              initial={{
                opacity: 0,
                width: 0,
              }}
              animate={{
                opacity: 1,
                width: "auto",
              }}
              transition={transitionLg}
            >
              <div className="flex items-center pl-2 opacity-50">
                <StarIcon className="w-4 h-4 _mr-0.5" />
                {starCount}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Button>
  );
}
