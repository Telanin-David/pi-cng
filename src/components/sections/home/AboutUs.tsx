import React from "react";
import Image from "next/image";
import clsx from "clsx";

type CardTone = "sand" | "mint";

type MediaCardProps = {
  imageSrc: string;
  imageAlt: string;
  tone?: CardTone;
  icon: React.ReactNode;
  title: string;
  body: string;
  className?: string;
};

function MediaCard({
  imageSrc,
  imageAlt,
  tone = "sand",
  icon,
  title,
  body,
  className = "",
}: MediaCardProps) {
  const panelBg = tone === "sand" ? "bg-[#FBF7E8]" : "bg-[#EAF7F0]";

  return (
    <div
      className={clsx(
        "rounded-[26px] overflow-hidden bg-white",
        "shadow-[0_12px_34px_rgba(0,0,0,0.08)]",
        className
      )}
    >
      {/* Image (reduced) */}
      <div className="relative h-[154px] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 480px, 100vw"
        />
      </div>

      {/* Panel (overlap preserved) */}
      <div
        className={clsx(
          "relative -mt-[32px]",
          "px-6 pt-5 pb-6",
          "rounded-t-[20px] rounded-b-[26px]",
          panelBg
        )}
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex h-7 w-7 items-center justify-center shrink-0">
            {icon}
          </span>

          <h3 className="text-[15px] font-semibold leading-[1.1] text-black">
            {title}
          </h3>
        </div>

        <p className="mt-2.5 text-[12.5px] leading-[1.6] text-black/80 max-w-[44ch]">
          {body}
        </p>
      </div>
    </div>
  );
}

export default function AboutUsSection() {
  const VisionIcon = () => (
    <Image
      src="/images/home/sections/about/icons/vision.png"
      alt=""
      width={22}
      height={22}
    />
  );

  const MissionIcon = () => (
    <Image
      src="/images/home/sections/about/icons/mission.png"
      alt=""
      width={22}
      height={22}
    />
  );

  return (
    <section className="ds-section bg-[#F6F6F2]">
        {/*  extra horizontal padding kept */}
        <div className="ds-container mx-auto px-2 md:px-4 lg:px-6">
            {/* mobile = stacked, desktop = two columns with auto middle space */}
            <div className="flex flex-col mx-5 md:mx-36 gap-y-8 lg:flex-row lg:items-start lg:justify-between">
                {/* LEFT */}
                <div className="w-full lg:w-auto md:mt-12">
                <div className="w-full max-w-[500px]">
                    <p className="text-[12px] uppercase tracking-[0.12em] text-brand">
                    ABOUT US
                    </p>

                    <h2 className="mt-4 text-[32px] sm:text-[32px] lg:text-[38px] leading-[1.05] font-extrabold tracking-[-0.03em] text-black">
                    Empowering a Cleaner,
                    <br />
                    Cheaper Future Together
                    </h2>

                    <p className="mt-3 text-[14px] leading-[1.6] text-black/80 max-w-[50ch]">
                    Driving affordability, environmental sustainability, and local
                    empowerment through a nationally-led CNG vehicle conversion and
                    deployment programme.
                    </p>

                    <div className="mt-6">
                    <div className="relative w-full max-w-[500px] aspect-[16/9] rounded-[20px] overflow-hidden">
                        <Image
                        src="/images/home/sections/about/images/empower.png"
                        alt="Pi-CNG vehicle"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 500px, 100vw"
                        />
                    </div>
                    </div>
                </div>
                </div>

                {/* RIGHT */}
                <div className="w-full lg:w-auto">
                <div className="w-full max-w-[400px]">
                  <div className="flex flex-col gap-6">
                    <MediaCard
                        imageSrc="/images/home/sections/about/images/vision.png"
                        imageAlt="Vision"
                        tone="sand"
                        icon={<VisionIcon />}
                        title="Vision"
                        body="To achieve universal access to affordable, reliable and sustainable gas and EV infrastructure, enabling cleaner, safer and more inclusive transportation for all."
                    />

                    <MediaCard
                        imageSrc="/images/home/sections/about/images/mission.png"
                        imageAlt="Mission"
                        tone="mint"
                        icon={<MissionIcon />}
                        title="Mission"
                        body="To drive gas and EV adoption rate for every Nigerian by 30% through ensuring acceptability, availability, and affordability through strategic partnerships, innovative financing, and sustained public awareness and capacity-building initiatives."
                    />
                    </div>
                </div>
                </div>
            </div>
        </div>


    </section>
  );
}
