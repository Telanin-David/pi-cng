"use client";

import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  href: string;
  alt?: string;

  initialTopPx?: number;   // ✅ 660 on load
  edgeInsetPx?: number;    // ✅ 72 from screen walls

  sizeDesktopPx?: number;
  sizeMobilePx?: number;

  zIndexClassName?: string;
  storageKey?: string;
};

type XY = { x: number; y: number };

export default function FloatingMessageImage({
  src,
  href,
  alt = "Message",
  initialTopPx = 660,
  edgeInsetPx = 72,
  sizeDesktopPx = 56,
  sizeMobilePx = 48,
  zIndexClassName = "z-[60]",
  storageKey = "floating_message_xy_v6", // ✅ new key so old saved values don’t override
}: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const draggedRef = useRef(false);

  const [vp, setVp] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const size = isMobile ? sizeMobilePx : sizeDesktopPx;

  // ✅ measure viewport first
  useEffect(() => {
    setMounted(true);

    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setVp({ w, h });
      setIsMobile(w < 768);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // ✅ only compute bounds when viewport is real (not 0)
  const ready = mounted && vp.w > 0 && vp.h > 0;

  const leftBound = edgeInsetPx;
  const topBound = edgeInsetPx;
  const rightBound = ready ? Math.max(edgeInsetPx, vp.w - size - edgeInsetPx) : edgeInsetPx;
  const bottomBound = ready ? Math.max(edgeInsetPx, vp.h - size - edgeInsetPx) : edgeInsetPx;

  // ✅ set initial pos AFTER viewport is ready, and only then save
  useEffect(() => {
    if (!ready) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const p = JSON.parse(saved) as XY;
        x.set(clamp(p.x, leftBound, rightBound));
        y.set(clamp(p.y, topBound, bottomBound));
        return;
      } catch {}
    }

    const startX = rightBound; // right side
    const startY = clamp(initialTopPx, topBound, bottomBound); // ✅ 660 (clamped if needed)

    x.set(startX);
    y.set(startY);

    localStorage.setItem(storageKey, JSON.stringify({ x: startX, y: startY }));
  }, [
    ready,
    storageKey,
    initialTopPx,
    leftBound,
    rightBound,
    topBound,
    bottomBound,
    x,
    y,
  ]);

  const snapAndSave = () => {
    const curX = x.get();
    const curY = y.get();

    const mid = vp.w / 2;
    const snappedX = curX < mid ? leftBound : rightBound;
    const snappedY = clamp(curY, topBound, bottomBound);

    x.set(snappedX);
    y.set(snappedY);

    localStorage.setItem(storageKey, JSON.stringify({ x: snappedX, y: snappedY }));
  };

  if (!ready) return null;

  return (
    <motion.a
      href={href}
      aria-label={alt}
      className={`fixed ${zIndexClassName}`}
      style={{ x, y, touchAction: "none" }}
      drag
      dragMomentum={false}
      dragElastic={0.06}
      dragConstraints={{
        left: leftBound,
        right: rightBound,
        top: topBound,
        bottom: bottomBound,
      }}
      onDragStart={() => {
        draggedRef.current = false;
      }}
      onDragEnd={(_, info) => {
        const moved = Math.abs(info.offset.x) + Math.abs(info.offset.y);
        draggedRef.current = moved > 3; // ✅ treat as drag if moved
        snapAndSave();
      }}
      onClick={(e) => {
        if (draggedRef.current) e.preventDefault(); // ✅ dragging won’t click
      }}
    >
      <div
        className="rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-grab active:cursor-grabbing"
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
      </div>
    </motion.a>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}
