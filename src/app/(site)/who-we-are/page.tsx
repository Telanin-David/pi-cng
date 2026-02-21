import Hero from "@/components/sections/home/Hero";
import AboutUsSection from "@/components/sections/home/AboutUs";
import { ImpactSection } from "@/components/sections/home/ImpactStats";
import { Stats } from "@/components/sections/home/StatIcon";
import { WhyChooseSection } from "@/components/sections/home/WhyChooseCNG";
import {PageHero} from "@/components/ui/PageHero";
import FAQ from "@/components/sections/home/FAQ";

export default function WhoWEAre() {
  return (
    <div >
      <PageHero
        title="Who We Are"
        imageSrc="/images/pages/who-we-are/hero/who-hero.png"
        heightPx={600}
      />

    <FAQ />
    </div>
  );
}
