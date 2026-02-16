"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import clsx from "clsx";

type Dir = "left" | "right";
type Tone = "accent" | "white";

type Props = {
  direction: Dir;
  tone?: Tone; // ✅ NEW: background option
  "aria-label": string;

  onClick?: () => void;
  disabled?: boolean;

  /** sizing */
  sizePx?: number;  // circle size
  iconPx?: number;  // icon size
  nudgePx?: number; // how far arrow moves on hover

  className?: string;
};

export default function IconCircleButton({
  direction,
  tone = "accent",
  onClick,
  disabled = false,
  sizePx = 92,
  iconPx = 28,
  nudgePx = 4,
  className,
  ...rest
}: Props) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  const hoverX = direction === "left" ? -nudgePx : nudgePx;

  const bgClass = tone === "accent" ? "bg-accent" : "bg-white";
  // Icon color: black reads well on both yellow + white
  const iconClass = "text-black";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center rounded-full",
        bgClass,
        iconClass,
        // subtle border only for white so it doesn’t disappear on white sections
        tone === "white" && "border border-border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{ width: sizePx, height: sizePx }}
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      transition={{ duration: 0.18 }}
      {...rest}
    >
      <motion.span
        className="inline-flex"
        initial={false}
        whileHover={!disabled ? { x: hoverX } : undefined}
        transition={{ duration: 0.18 }}
      >
        <Icon size={iconPx} strokeWidth={2.5} />
      </motion.span>
    </motion.button>
  );
}
