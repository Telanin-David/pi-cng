"use client";

import  { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";

type ImpactItem = {
  value: string;
  label: string;
  /** ✅ Next.js: path under /public */
  image: string;
};

const AUTOPLAY_MS = 5000;

/**
 * ✅ Put your images here:
 * /public/images/impact/im1.png ... im6.png
 */
const IMPACT_DATA: ImpactItem[] = [
  { value: "15,000+", label: "Vehicle Converted", image: "/images/home/sections/impact/impact1.png" },
  { value: "300+", label: "Conversion Centres", image: "/images/home/sections/impact/impact2.png" },
  { value: "6,000+", label: "Technicians Trained", image: "/images/home/sections/impact/impact3.png" },
  { value: "30,000+", label: "Jobs Projected", image: "/images/home/sections/impact/impact4.png" },
  { value: "40+", label: "Refuelling Station", image: "/images/home/sections/impact/impact5.png" },
  { value: "$2billion+", label: "Investment Mobilized", image: "/images/home/sections/impact/impact6.png" },
];

function wrapIndex(i: number, len: number) {
  if (i < 0) return len - 1;
  if (i >= len) return 0;
  return i;
}

export function ImpactSection() {
  const slides = useMemo(() => IMPACT_DATA, []);
  const [current, setCurrent] = useState(0);

  // autoplay
  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrent((prev) => wrapIndex(prev + 1, slides.length));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const next = () => setCurrent((p) => wrapIndex(p + 1, slides.length));
  const prev = () => setCurrent((p) => wrapIndex(p - 1, slides.length));

  const active = slides[current];

  return (
    <section className=" relative overflow-hidden bg-[#080808]">
      {/* height matches your original */}
      <div className="relative h-[500px] lg:h-[661px]">
        {/* Background layer */}
        <div className="absolute inset-0">
          {slides.map((item, idx) => (
            <div
              key={item.label}
              className={clsx(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                idx === current ? "opacity-100" : "opacity-0"
              )}
              aria-hidden={idx !== current}
            >
              {/*  Next.js Image using /public path */}
              <Image
                src={item.image}
                alt=""
                fill
                priority={idx === 0}
                className="object-cover scale-[1.05]"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[#080808]/75" />
            </div>
          ))}
        </div>

        {/* Foreground content */}
        <div className="relative z-10 h-full">
          {/* Header */}
          <div className="absolute top-12 lg:top-20 left-0 right-0">
            <div className="ds-container flex items-center justify-center gap-3 lg:gap-4 px-4">
              <h2 className="text-white text-2xl md:text-3xl lg:text-[40px] font-bold tracking-tight whitespace-nowrap">
                Impact So Far
              </h2>
              <div className="w-8 lg:w-[43px] h-px bg-white/80 translate-y-[2px] lg:translate-y-[10px]" />
            </div>
          </div>

          {/* Main */}
          <div className="ds-container h-full px-6 flex items-center justify-center">
            <div className="text-center max-w-[90vw]">
              <h3 className="text-white text-5xl md:text-5xl lg:text-[80px] font-bold leading-none tracking-tighter transition-all duration-500">
                {active.value}
              </h3>
              <p className="mt-2 md:mt-3 text-white text-lg md:text-2xl lg:text-[32px] font-medium opacity-90 transition-all duration-500">
                {active.label}
              </p>
            </div>

            {/* Arrows (tablet+) */}
            <button
              type="button"
              onClick={prev}
              className={clsx(
                "hidden md:flex absolute left-4 lg:left-20 top-1/2 -translate-y-1/2",
                "w-12 h-12 lg:w-16 lg:h-16 items-center justify-center",
                "rounded-full hover:bg-white/10 transition"
              )}
              aria-label="Previous"
            >
              <svg
                className="w-6 h-6 lg:w-[24px] lg:h-[24px] text-[#BBBBBB] rotate-180 group-hover:text-white"
                viewBox="0 0 30 55"
                fill="none"
              >
                <path
                  d="M5 5l20 22.5L5 50"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              className={clsx(
                "hidden md:flex absolute right-4 lg:right-20 top-1/2 -translate-y-1/2",
                "w-12 h-12 lg:w-16 lg:h-16 items-center justify-center",
                "rounded-full hover:bg-white/10 transition"
              )}
              aria-label="Next"
            >
              <svg
                className="w-6 h-6 lg:w-[24px] lg:h-[24px] text-[#BBBBBB] group-hover:text-white"
                viewBox="0 0 30 55"
                fill="none"
              >
                <path
                  d="M5 5l20 22.5L5 50"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-10 lg:bottom-16 left-0 right-0 flex items-center justify-center gap-3">
              {slides.map((item, idx) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setCurrent(idx)}
                  className={clsx(
                    "rounded-full transition-all duration-300",
                    idx === current
                      ? "w-3 h-3 bg-[#F9E745] ring-2 lg:ring-4 ring-[#F9E745]/20"
                      : "w-2 h-2 bg-[#6B6B6B] hover:bg-gray-400"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
