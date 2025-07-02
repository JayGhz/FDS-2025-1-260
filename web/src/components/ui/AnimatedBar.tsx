"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

export function AnimatedBar({
  index = 0,
  children,
  style,
}: {
  index?: number;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      initial={{ transform: "translateX(-100%)" }}
      animate={{ transform: "translateX(0)" }}
      className="absolute inset-0"
      style={{ pointerEvents: "none", ...style }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: index * 0.075,
      }}
    >
      {children}
    </motion.div>
  );
}
