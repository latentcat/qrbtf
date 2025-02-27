"use client";

import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/LogosBrand";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";
import { transitionLg } from "@/lib/animations";
import { getGitHubStars } from "@/lib/network";

export function GitHubButton() {
  const [starCount, setStarCount] = useState(0);

  useEffect(() => {
    getGitHubStars().then((star_count) => {
      setStarCount(star_count || 0);
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
