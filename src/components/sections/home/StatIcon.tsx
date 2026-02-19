import Image from "next/image";
import clsx from "clsx";

type Stat = {
  iconSrc: string;
  iconAlt: string;
  value: string;
  label: string;
};

const STATS: Stat[] = [
  {
    iconSrc: "/images/home/sections/impactStats/converted.png",
    iconAlt: "Vehicle Converted",
    value: "15,000+",
    label: "Vehicle Converted",
  },
  {
    iconSrc: "/images/home/sections/impactStats/centres.png",
    iconAlt: "Conversion Centres",
    value: "300+",
    label: "Conversion Centres",
  },
  {
    iconSrc: "/images/home/sections/impactStats/stations.png",
    iconAlt: "Refueling Station",
    value: "40+",
    label: "Refueling Station",
  },
  {
    iconSrc: "/images/home/sections/impactStats/converted2.png",
    iconAlt: "Vehicle Converted",
    value: "15,000+",
    label: "Vehicle Converted",
  },
];

function StatItem({ stat }: { stat: Stat }) {
  return (
    <div className="flex items-center gap-1">
      <span className="inline-flex h-10 w-10 lg:h-11 lg:w-11 shrink-0">
        <Image
          src={stat.iconSrc}
          alt={stat.iconAlt}
          width={44}
          height={44}
          className="h-full w-full object-contain"
        />
      </span>

      <div className="leading-tight">
        <div className="text-[14px] lg:text-[16px] font-semibold text-black">
          {stat.value}
        </div>
        <div className="mt-1 text-[10px] lg:text-[11px] text-black/70">
          {stat.label}
        </div>
      </div>
    </div>
  );
}

export function Stats() {
  return (
    // ✅ hidden on mobile, visible from md+
    <section className="hidden md:block py-8 bg-white">
      <div className="mx-auto px-4 md:px-6 lg:px-8">
        <div
          className={clsx(
            "mx-auto w-full max-w-[1200px]",
            "flex flex-wrap items-center justify-center",
            "gap-y-6 gap-x-16 md:gap-x-24",
            "lg:flex-nowrap lg:justify-around lg:gap-x-0"
          )}
        >
          {STATS.map((stat) => (
            <StatItem
              key={`${stat.value}-${stat.label}-${stat.iconSrc}`}
              stat={stat}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
