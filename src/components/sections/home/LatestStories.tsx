"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

type NewsItem = {
  image: string; // ✅ /public path
  title: string;
  href: string;
  tag?: string;
  date?: string;
  excerpt?: string;
  readTime?: string;
};

const NEWS: NewsItem[] = [
  {
    image: "/images/home/sections/news/image/news1.png",
    tag: "Recent",
    date: "Feb 02, 2026  |  8:45PM",
    title: "PRESS RELEASE: Pi-CNG signs Mou with YJT of China",
    href: "/news/press-release-pi-cng-yjt",
  },
  {
    image: "/images/home/sections/news/image/news2.png",
    title: "Pi-CNG Inspects Bajaj’s Two- and Three-Wheeler Manufacturing Plant",
    excerpt:
      "The Executive Chairman of Pi-CNG & EVs, Barr. Ismaeel Ahmed, recently conducted an inspection visit to the newly commissioned state-of-the-art Bajaj three...",
    readTime: "6 min. read",
    href: "/news/pi-cng-inspects-bajaj",
  },
  {
    image: "/images/home/sections/news/image/news3.png",
    title: "EV Fair: Electrifying Mobility",
    excerpt:
      "The Pi-CNG & EVs hosted an EV Fair: Electrifying Mobility at Eagle Square, Abuja — bringing together innovators, policymakers, OEMs, and clean energy...",
    readTime: "2 min. read",
    href: "/news/ev-fair-electrifying-mobility",
  },
  {
    image: "/images/home/sections/news/image/news4.png",
    title: "AKK Project - 2026 Unveiling",
    excerpt:
      "The Presidential Initiative on Compressed Natural Gas (Pi-CNG) and Electric Vehicles participated in the AKK Business Development Roadshow that took place...",
    readTime: "4 min. read",
    href: "/news/akk-project-2026-unveiling",
  },
];

function HeaderIcon() {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center shrink-0">
      <Image
        src="/images/home/sections/news/icon/newspaper.png"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 object-contain"
        priority
      />
    </span>
  );
}

function ViewAll({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/news"
      className={clsx(
        "group inline-flex items-center gap-3 text-brand text-[14px] font-medium",
        className
      )}
    >
      <span>View all articles</span>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-[1px]" />
      </span>
    </Link>
  );
}

function FeaturedMeta({ tag, date }: { tag?: string; date?: string }) {
  return (
    <div className="mt-7 flex items-center gap-4">
      {tag ? (
        <span className="inline-flex rounded-full bg-[#F83446] px-4 py-2 text-[13px] font-semibold text-white">
          {tag}
        </span>
      ) : null}
      {date ? <span className="text-[14px] text-black/70">{date}</span> : null}
    </div>
  );
}

function NewsRow({ item }: { item: NewsItem }) {
  return (
    <article className="py-6">
      <div className="flex items-start justify-between gap-8">
        <div className="min-w-0 flex-1">
          <Link href={item.href} className="block">
            <h4 className="text-[18px] font-semibold leading-snug text-black hover:text-brand transition-colors">
              {item.title}
            </h4>
          </Link>

          {item.excerpt ? (
            <p className="mt-2 text-[14px] leading-relaxed text-black/70 line-clamp-3">
              {item.excerpt}
            </p>
          ) : null}

          <div className="mt-4 flex items-center gap-3 text-[13px]">
            <span className="text-[#EDA833]">Recent</span>
            <span className="text-black/20">|</span>
            <span className="text-black/60">{item.readTime}</span>
          </div>
        </div>

        <Link href={item.href} className="group shrink-0 hidden md:block">
          <div className="relative overflow-hidden bg-black/5 rounded-[18px] w-[240px] h-[135px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              sizes="240px"
            />
          </div>
        </Link>
      </div>
    </article>
  );
}

export function NewsSection() {
  const featured = NEWS[0];
  const list = NEWS.slice(1);

  return (
    <section className="ds-section bg-white">
      <div className="ds-container">
        {/* ✅ Header: centered on mobile, view-all only on desktop */}
        <div className="flex items-center justify-center md:justify-between">
          <div className="flex items-center gap-3 justify-center">
            <HeaderIcon />
            <h2 className="text-[20px] sm:text-[22px] font-bold text-black text-center">
              Latest Insights &amp; Stories
            </h2>
          </div>

          {/* ✅ This wrapper ensures it is NOT rendered/visible on mobile */}
          <div className="hidden md:block">
            <ViewAll />
          </div>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.08fr_1fr] gap-12">
          <article>
            <Link href={featured.href} className="block group">
              <div className="relative overflow-hidden rounded-[26px] bg-black/5 aspect-[16/11]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  sizes="(min-width: 1024px) 720px, 100vw"
                  priority
                />
              </div>
            </Link>

            <FeaturedMeta tag={featured.tag} date={featured.date} />

            <Link href={featured.href} className="block">
              <h3 className="mt-6 text-[34px] sm:text-[38px] leading-[1.15] tracking-[-0.02em] text-black font-medium">
                {featured.title}
              </h3>
            </Link>
          </article>

          <div>
            <div className="divide-y divide-black/10">
              {list.map((item) => (
                <NewsRow key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* ✅ mobile-only bottom CTA */}
        <div className="mt-10 flex justify-center md:hidden">
          <ViewAll />
        </div>
      </div>
    </section>
  );
}