"use client";

import Image from "next/image";
import clsx from "clsx";

type PageHeroProps = {
  title: string;
  body?: string;           // ✅ optional (title-only if not provided)
  imageSrc: string;
  heightPx?: number;       // ✅ default 600
  priority?: boolean;
  className?: string;

  // Optional: tweak overlay strength if you want
  overlayClassName?: string;
};

export function PageHero({
  title,
  body,
  imageSrc,
  heightPx = 600,
  priority = true,
  className,
  overlayClassName,
}: PageHeroProps) {
  const hasBody = Boolean(body?.trim());

  return (
    <section
      className={clsx("relative overflow-hidden", className)}
      style={{ height: heightPx }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority={priority}
          className="object-cover"
          sizes="100vw"
        />

        {/* Dark overlay + slight blur (readability like screenshot) */}
        <div className={clsx("absolute inset-0 bg-black/60", overlayClassName)} />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6 lg:px-16">
        <div className="mx-auto max-w-[980px] text-center">
          <h1
            className={clsx(
              "text-white font-bold tracking-tight whitespace-pre-line",
              // If you want to use your design system heading class, swap in ds-h1 / ds-h2 here
              "text-[34px] leading-[1.12] md:text-[52px] md:leading-[1.08] lg:text-[50px] lg:leading-[1.06]"
            )}
          >
            {title}
          </h1>

          {/* Only show paragraph if provided */}
          {hasBody && (
            <p
              className={clsx(
                "mx-auto mt-4 text-white/85",
                "text-[14px] leading-[1.7] md:text-[16px] md:leading-[1.75]",
                "max-w-[860px]"
              )}
            >
              {body}
            </p>
          )}

          {/* Yellow underline (same look in both screenshots) */}
          <div className={clsx(hasBody ? "mt-6" : "mt-5")}>
            <div className="mx-auto h-[10px] w-[160px] rounded-full bg-accent" />
          </div>
        </div>
      </div>
    </section>
  );
}