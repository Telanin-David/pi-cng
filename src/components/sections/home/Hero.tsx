"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";
import SplitButton from "@/components/ui/SplitButton";

type Slide = {
  id: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
};

const AUTOPLAY_MS = 7000;

export default function Hero() {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "s1",
        title: "Fuels That Works For\nNigerians",
        body:
          "CNG is affordable, reliable, and made for today’s Nigeria. It helps drivers and businesses reduce fuel costs without sacrificing performance",
        ctaLabel: "WHO WE ARE",
        ctaHref: "/who-we-are",
        imageSrc: "/images/home/hero/hero-1.png",
      },
      {
        id: "s2",
        title: "Affordable. Cleaner.\nSafer.",
        body:
          "CNG helps you spend less on fuel, protect the environment, and move people and goods more sustainably across Nigeria.",
        ctaLabel: "WHO WE ARE",
        ctaHref: "/who-we-are",
        imageSrc: "/images/home/hero/hero-2.png",
      },
      {
        id: "s3",
        title: "A Smarter Fuel\nChoice",
        body:
          "CNG is a cost-effective alternative to petrol and diesel. It reduces transport expenses and supports Nigeria’s move towards cleaner energy.",
        ctaLabel: "WHO WE ARE",
        ctaHref: "/who-we-are",
        imageSrc: "/images/home/hero/hero-3.png",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, slides.length]);

  const active = slides[index];

  return (
    <section className="">
      <div className="">
        <div
          className={clsx("relative overflow-hidden shadow-lift", "h-[657px] lg:h-[740px]")}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={active.imageSrc}
                alt=""
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1200px"
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10 backdrop-blur-[1px]" />

          <div className="relative z-10 h-full">
            {/* Desktop fixed placement */}
            <div className="hidden lg:block">
              {/* ✅ replaced */}
              <div className="absolute left-[180px] top-[232px] w-[520px]">
                <h1
                  className={clsx(
                    "ds-h1 text-white whitespace-pre-line",
                    "text-[32px] leading-[1.05] lg:text-[52px] lg:leading-[1.05]",
                    "min-h-[120px]"
                  )}
                >
                  {active.title}
                </h1>

                {/* ✅ 3-line feel */}
                <p
                  className={clsx("mt-4 text-[18px] leading-[1.75] text-white/85")}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: 96,
                  }}
                >
                  {active.body}
                </p>

                <div className="mt-8">
                  <SplitButton href={active.ctaHref} tone="light" heightPx={48} iconBlockPx={48}>
                    {active.ctaLabel}
                  </SplitButton>
                </div>
              </div>

              {/* ✅ replaced */}
              <div className="absolute left-[180px] bottom-[110px] flex items-center gap-5">
                <div className="flex items-center gap-3">
                  <ArrowButton dir="left" onClick={prev} />
                  <ArrowButton dir="right" onClick={next} />
                </div>

                <ProgressLine count={slides.length} activeIndex={index} />
              </div>
            </div>

            {/* Mobile layout */}
            <div className="lg:hidden h-full w-full px-6 pt-[170px] text-center flex flex-col items-center">
              <div className="max-w-[420px]">
                <h1
                  className={clsx(
                    "ds-display text-white whitespace-pre-line",
                    "text-[40px] leading-[1.06]",
                    "min-h-[120px]"
                  )}
                >
                  {active.title}
                </h1>

                {/* ✅ 3-line feel */}
                <p
                  className={clsx("mt-4 text-[17px] leading-[1.75] text-white/85")}
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: 90,
                  }}
                >
                  {active.body}
                </p>

                <div className="mt-8 flex justify-center">
                  <SplitButton href={active.ctaHref} tone="light" heightPx={48} iconBlockPx={48}>
                    {active.ctaLabel}
                  </SplitButton>
                </div>

                <div className="mt-10 flex justify-center">
                  <PillPager count={slides.length} activeIndex={index} onPick={setIndex} />
                </div>
              </div>
            </div>
          </div>
          {/* end content */}
        </div>
      </div>
    </section>
  );
}

function ArrowButton({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous slide" : "Next slide"}
      className={clsx(
        "h-11 w-11 rounded-full grid place-items-center",
        "bg-accent text-black",
        "transition-transform duration-200",
        "hover:scale-[1.03] active:scale-[0.98]"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function ProgressLine({ count, activeIndex }: { count: number; activeIndex: number }) {
  const pct = ((activeIndex + 1) / count) * 100;

  return (
    <div className="relative h-[5px] w-[600px] bg-white/70 overflow-hidden rounded-r-full rounded-l-none">
      <motion.div
        className="absolute left-0 top-0 h-full bg-accent rounded-r-full rounded-l-none"
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </div>
  );
}

function PillPager({
  count,
  activeIndex,
  onPick,
}: {
  count: number;
  activeIndex: number;
  onPick: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onPick(i)}
          aria-label={`Go to slide ${i + 1}`}
          className={clsx(
            "h-[6px] rounded-full transition-all",
            i === activeIndex ? "w-14 bg-accent" : "w-7 bg-white/35 hover:bg-white/55"
          )}
        />
      ))}
    </div>
  );
}
