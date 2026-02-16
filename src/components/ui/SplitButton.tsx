"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import React from "react";

type Tone = "light" | "brand";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;

  /** light = white button, brand = green button */
  tone?: Tone;

  /** sizing (Figma) */
  heightPx?: number; // default 48
  iconBlockPx?: number; // default 52

  className?: string;
};

export default function SplitButton({
  children,
  href,
  onClick,
  tone = "brand",
  heightPx = 48,
  iconBlockPx = 52,
  className = "",
}: Props) {
  const isLight = tone === "light";

  // Root element: Link if href, else button
  const Root: any = href ? Link : "button";
  const rootProps = href ? { href } : { type: "button", onClick };

  // Base styling
  const leftBg = isLight ? "bg-white" : "bg-brand";
  const rightBg = isLight ? "bg-white" : "bg-brand";
  const text = isLight ? "text-black" : "text-brand-fg";

  // Circle behavior:
  // Idle:
  // - light: black circle + white arrow
  // - brand: white circle + BLACK arrow (changed)
  // Active (hover/click):
  // - light: accent circle + black arrow (same as before)
  // - brand: brand-essence circle + BLACK arrow (changed)
  const circleIdle = isLight ? "bg-black" : "bg-white";
  const circleActiveLight = "group-hover:bg-accent group-active:bg-accent";
  const circleActiveBrand = "group-hover:bg-accent group-active:bg-accent";

  const arrowClassLight = "text-white group-hover:text-black group-active:text-black";
  const arrowClassBrand = "text-black"; // always black

  return (
    <motion.div
      className={className}
      style={{ height: heightPx }}
      whileHover={{}}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.18 }}
    >
      <Root
        {...rootProps}
        className={[
          "group inline-flex h-full overflow-hidden ",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35",
        ].join(" ")}
      >
        {/* Left text block */}
        <div
          className={[
            "flex h-full items-center mr-1",
            leftBg,
            text,
            "pl-6 pr-8",
            "uppercase tracking-wide",
            "text-[18px] md:text-[18px]",
            "whitespace-nowrap",
          ].join(" ")}
          style={{ height: heightPx }}
        >
          {children}
        </div>

        {/* Right icon block (width=52px) */}
        <div
          className={[
            "flex h-full items-center justify-center",
            rightBg,
            "border-l border-black/10",
          ].join(" ")}
          style={{ width: iconBlockPx, height: heightPx }}
        >
          <motion.span
            className={[
              "inline-flex items-center justify-center rounded-full",
              circleIdle,
              "transition-colors duration-200",
              isLight ? circleActiveLight : circleActiveBrand,
            ].join(" ")}
            style={{ width: 24, height: 24 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18 }}
          >
            <ArrowRight
              className={[
                "h-3 w-3",
                "transition-colors duration-200",
                isLight ? arrowClassLight : arrowClassBrand,
              ].join(" ")}
            />
          </motion.span>
        </div>
      </Root>
    </motion.div>
  );
}
