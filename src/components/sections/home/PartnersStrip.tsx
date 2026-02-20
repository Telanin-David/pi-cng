"use client";

import Image from "next/image";
import clsx from "clsx";
import React, { useEffect, useMemo, useRef, useState } from "react";

type Partner = { src: string; alt: string };
type Dir = "left" | "right";

export function PartnerSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const isJumpingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const AUTOPLAY_DIR: Dir = "right";
  const AUTOPLAY_MS = 5000; // ✅ 5 seconds (use 300000 for 5 minutes)

  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false); // ✅ gate autoplay until measured + centered

  const base: Partner[] = useMemo(
    () => [
      { src: "/images/brand/partner-logos/bolt-logo.png", alt: "Bolt" },
      { src: "/images/brand/partner-logos/bovas-logo.png", alt: "Bovas" },
      { src: "/images/brand/partner-logos/femdac group-logo.png", alt: "Femdac" },
      { src: "/images/brand/partner-logos/gacn-logo.png", alt: "Gacn" },
      { src: "/images/brand/partner-logos/mofi-logo.png", alt: "Mofi" },
      { src: "/images/brand/partner-logos/nactomoras-logo.png", alt: "Nactomoras" },
      { src: "/images/brand/partner-logos/naddc-logo.png", alt: "Naddc" },
      { src: "/images/brand/partner-logos/narto-logo.png", alt: "Narto" },
      { src: "/images/brand/partner-logos/ngtsl-logo.png", alt: "Ngtsl" },
      { src: "/images/brand/partner-logos/nipcoplc-logo.png", alt: "Nipcopic" },
      { src: "/images/brand/partner-logos/nmdpra-logo.png", alt: "Nmdpra" },
      { src: "/images/brand/partner-logos/nnpc-logo.png", alt: "Nnpc" },
      { src: "/images/brand/partner-logos/rolling energy-logo.png", alt: "Rolling" },
      { src: "/images/brand/partner-logos/rtean-logo.png", alt: "Rtean" },
      { src: "/images/brand/partner-logos/Son-logo.png", alt: "Son" },
    ],
    []
  );

  const items = useMemo(() => [...base, ...base, ...base], [base]);
  const baseLen = base.length;

  // responsive sizing
  const cssVars = {
    "--card-w": "120px",
    "--card-h": "92px",
    "--gap": "12px",

    "--card-w-md": "150px",
    "--card-h-md": "110px",
    "--gap-md": "14px",

    "--card-w-lg": "170px",
    "--card-h-lg": "120px",
    "--gap-lg": "16px",
  } as React.CSSProperties;

  const BTN = 36;

  // measured layout (robust on mobile)
  const unitRef = useRef<{ unit: number; oneSet: number; cardW: number }>({
    unit: 186,
    oneSet: baseLen * 186,
    cardW: 170,
  });

  const measureUnit = () => {
    const el = trackRef.current;
    if (!el) return;

    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards.length < 2) return;

    const r0 = cards[0].getBoundingClientRect();
    const r1 = cards[1].getBoundingClientRect();

    const unit = Math.max(1, r1.left - r0.left);
    const cardW = Math.max(1, r0.width);
    const oneSet = baseLen * unit;

    unitRef.current = { unit, oneSet, cardW };
  };

  const setScrollNoAnim = (left: number) => {
    const el = trackRef.current;
    if (!el) return;

    isJumpingRef.current = true;
    el.style.scrollBehavior = "auto";
    el.scrollLeft = left;

    requestAnimationFrame(() => {
      el.style.scrollBehavior = "smooth";
      isJumpingRef.current = false;
    });
  };

  const normalizeIfNeeded = () => {
    const el = trackRef.current;
    if (!el || isJumpingRef.current) return;

    const { oneSet } = unitRef.current;

    const min = oneSet * 0.6;
    const max = oneSet * 2.4;

    if (el.scrollLeft < min) setScrollNoAnim(el.scrollLeft + oneSet);
    else if (el.scrollLeft > max) setScrollNoAnim(el.scrollLeft - oneSet);
  };

  const updateActiveFromCenter = () => {
    const el = trackRef.current;
    if (!el) return;

    const { unit, cardW } = unitRef.current;
    const centerX = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.round((centerX - cardW / 2) / unit);

    const baseIdx = ((idx % baseLen) + baseLen) % baseLen;
    setActive(baseIdx);
  };

  const step = (dir: Dir, cards = 1) => {
    const el = trackRef.current;
    if (!el) return;

    const { unit } = unitRef.current;
    const dx = cards * unit * (dir === "left" ? -1 : 1);

    normalizeIfNeeded();
    el.scrollBy({ left: dx, behavior: "smooth" });
    window.setTimeout(() => normalizeIfNeeded(), 220);
  };

  // ✅ initial: measure + jump into middle copy + mark ready
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      measureUnit();
      const { oneSet } = unitRef.current;

      setScrollNoAnim(oneSet); // start on middle copy
      updateActiveFromCenter();
      setReady(true); // ✅ autoplay can start now
    });

    const ro = new ResizeObserver(() => {
      measureUnit();
      normalizeIfNeeded();
      updateActiveFromCenter();
    });
    ro.observe(el);

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseLen]);

  // scroll listener: normalize + active tracking
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const onScroll = () => {
      normalizeIfNeeded();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActiveFromCenter);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseLen]);

  // ✅ AUTOPLAY (fixed): starts only when ready
  useEffect(() => {
    if (!ready) return;

    const id = window.setInterval(() => {
      // ensure measurements stay correct on mobile before each tick
      measureUnit();
      step(AUTOPLAY_DIR, 1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // drag-to-scroll + normalize during drag
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let isDown = false;
    let startX = 0;
    let startLeft = 0;

    const down = (e: PointerEvent) => {
      isDown = true;
      el.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.classList.add("cursor-grabbing");
      normalizeIfNeeded();
    };

    const move = (e: PointerEvent) => {
      if (!isDown) return;
      const dx = e.clientX - startX;
      el.scrollLeft = startLeft - dx;
      normalizeIfNeeded();
    };

    const up = (e: PointerEvent) => {
      isDown = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {}
      el.classList.remove("cursor-grabbing");
      normalizeIfNeeded();
    };

    el.addEventListener("pointerdown", down, { passive: true });
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerup", up, { passive: true });
    el.addEventListener("pointercancel", up, { passive: true });
    el.addEventListener("pointerleave", up, { passive: true });

    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("pointerleave", up);
    };
  }, [baseLen]);

  return (
    <section className="bg-[#F6F6F2] py-7 md:py-9">
      <div className="ds-container">
        <div className="mx-auto flex items-center justify-center gap-3 md:gap-4">
          {/* Controls hidden on mobile */}
          <button
            type="button"
            onClick={() => step("left", 1)}
            aria-label="Scroll left"
            className={clsx(
              "hidden md:flex shrink-0 rounded-full bg-[#F9E745]",
              "items-center justify-center",
              "shadow-[0_10px_18px_rgba(0,0,0,0.10)]",
              "transition-transform active:scale-95 hover:scale-[1.03]"
            )}
            style={{ width: BTN, height: BTN }}
          >
            <svg className="h-3.5 w-3.5 rotate-180" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7 4l6 6-6 6" stroke="#080808" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div
            ref={trackRef}
            className={clsx(
              "relative w-full",
              "max-w-[420px] md:max-w-[860px] lg:max-w-[1180px]",
              "overflow-x-auto scroll-smooth",
              "cursor-grab select-none py-2"
            )}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              ...cssVars,
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
              .inner {
                --cw: var(--card-w);
                --ch: var(--card-h);
                --cg: var(--gap);
              }
              @media (min-width: 768px) {
                .inner {
                  --cw: var(--card-w-md);
                  --ch: var(--card-h-md);
                  --cg: var(--gap-md);
                }
              }
              @media (min-width: 1024px) {
                .inner {
                  --cw: var(--card-w-lg);
                  --ch: var(--card-h-lg);
                  --cg: var(--gap-lg);
                }
              }
            `}</style>

            <div className="inner flex items-center" style={{ gap: "var(--cg)", paddingInline: 2 }}>
              {items.map((p, i) => {
                const baseIdx = i % baseLen;
                const isActive = baseIdx === active;

                return (
                  <div
                    key={`${p.alt}-${i}`}
                    data-card
                    className={clsx(
                      "flex-shrink-0 bg-white",
                      "rounded-[22px] md:rounded-[24px] lg:rounded-[26px]",
                      "shadow-[0_10px_26px_rgba(0,0,0,0.04)]",
                      "flex items-center justify-center",
                      "px-6 md:px-8",
                      "transition-transform duration-300",
                      isActive ? "scale-[1.04]" : "scale-100"
                    )}
                    style={{ width: "var(--cw)", height: "var(--ch)" }}
                  >
                    <div className="relative w-full h-full">
                      <Image src={p.src} alt={p.alt} fill className="object-contain" sizes="200px" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={() => step("right", 1)}
            aria-label="Scroll right"
            className={clsx(
              "hidden md:flex shrink-0 rounded-full bg-[#F9E745]",
              "items-center justify-center",
              "shadow-[0_10px_18px_rgba(0,0,0,0.10)]",
              "transition-transform active:scale-95 hover:scale-[1.03]"
            )}
            style={{ width: BTN, height: BTN }}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7 4l6 6-6 6" stroke="#080808" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}