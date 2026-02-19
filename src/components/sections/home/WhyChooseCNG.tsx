"use client";


import Image from "next/image";

/**
 * ✅ Put these in /public (recommended) so we don't import from /assets
 * /public/images/home/sections/why/
 *   why.png
 *   slash.png
 *   cleaner.png
 *   safer.png
 * /public/images/home/sections/why/icons/
 *   slash.png (or .svg)
 *   cleaner.png
 *   safer.png
 *
 * If your paths differ, just change the strings below.
 */

function SectionTitle() {
  return (
    <div className="flex items-center justify-center gap-3">
      <h3 className="text-brand text-[26px] sm:text-[30px] lg:text-[32px] font-bold">
        Why Choose CNG
      </h3>
      <span className="w-8 lg:w-[43px] h-px bg-brand" />
    </div>
  );
}

export function WhyChooseHeader() {
  return (
    <section className="ds-section bg-[#F6F6F6] overflow-hidden">
      <div className="ds-container">
        <div className="pt-10 lg:pt-16">
          <SectionTitle />
        </div>

        <div className="mt-10 lg:mt-14 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10">
          {/* Left: Image */}
          <div className="w-full max-w-[481px]">
            <div className="relative aspect-[481/315] rounded-[2px] overflow-hidden bg-black shadow-[0_12px_34px_rgba(0,0,0,0.10)]">
              <Image
                src="/images/home/sections/choose/image/choose-main.png"
                alt="CNG Infrastructure"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 481px, 100vw"
                priority
              />
            </div>
          </div>

          {/* Right: Copy */}
          <div className="w-full max-w-[440px]">
            <p className="text-brand text-[14px] tracking-[0.08em] uppercase">
              Why Choose CNG
            </p>

            <h2 className="mt-3 text-black text-[30px] sm:text-[34px] lg:text-[40px] font-extrabold leading-[1.08] tracking-[-0.02em]">
              Reliable Renewable Energy
            </h2>

            <p className="mt-4 text-black/80 text-[15px] sm:text-[16px] leading-[1.7]">
              Nigeria’s fuel subsidy removal has sharply increased petrol prices,
              making CNG a strategic, cost-saving alternative. CNG offers a cleaner,
              domestically powered fuel source that reduces your transport costs by
              up to 60%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type Benefit = {
  title: string;
  description: string;
  iconSrc: string;
  imageSrc: string;
};

const BENEFITS: Benefit[] = [
  {
    title: "Slash Your Fuel Bill",
    description:
      "Save up to 60% on refueling costs compared to traditional petrol and diesel, providing significant economic relief for vehicle owners.",
    iconSrc: "/images/home/sections/choose/icon/slash.png",
    imageSrc: "/images/home/sections/choose/image/slash.png",
  },
  {
    title: "Cleaner Alternative",
    description:
      "CNG emits lower carbon and nitrogen oxides, contributing to improved air quality and environmental sustainability.",
    iconSrc: "/images/home/sections/choose/icon/cleaner.png",
    imageSrc: "/images/home/sections/choose/image/cleaner.png",
  },
  {
    title: "Safer Option",
    description:
      "It dissipates quickly if leaked and poses minimal explosion risk, making it a safer fuel alternative for vehicles.",
    iconSrc: "/images/home/sections/choose/icon/safer.png",
    imageSrc: "/images/home/sections/choose/image/safer.png",
  },
];

function BenefitCard({ item }: { item: Benefit }) {
  return (
    <div className="w-full max-w-[358px] mx-auto">
      <div className="rounded-[24px] overflow-hidden bg-white shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
        {/* Image */}
        <div className="relative h-[249px] bg-black">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            className="object-cover opacity-90 transition-transform duration-500 hover:scale-[1.04]"
            sizes="(min-width: 1024px) 358px, (min-width: 768px) 50vw, 100vw"
          />
        </div>

        {/* Panel overlap like your About cards */}
        <div className="relative -mt-[22px] rounded-t-[20px] bg-white px-7 pt-6 pb-7">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center shrink-0">
              <Image
                src={item.iconSrc}
                alt=""
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            </span>

            <h4 className="text-[15px] font-semibold text-black tracking-tight">
              {item.title}
            </h4>
          </div>

          <p className="mt-3 text-[13px] leading-[1.6] text-black/70">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function BenefitsGrid() {
  return (
    <section className="ds-section bg-[#F6F6F6] pt-8 pb-16 lg:pb-24">
      <div className="ds-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
          {BENEFITS.map((b) => (
            <BenefitCard key={b.title} item={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseSection() {
  return (
    <section>
      <WhyChooseHeader />
      <BenefitsGrid />
    </section>
  );
}
