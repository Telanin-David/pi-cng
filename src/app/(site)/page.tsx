import Hero from "@/components/sections/home/Hero";
import AboutUsSection from "@/components/sections/home/AboutUs";
import { ImpactSection } from "@/components/sections/home/ImpactStats";
import { Stats } from "@/components/sections/home/StatIcon";
import { WhyChooseSection } from "@/components/sections/home/WhyChooseCNG";
import { NewsSection } from "@/components/sections/home/LatestStories";
import {PartnerSlider} from "@/components/sections/home/PartnersStrip";
import FAQ from "@/components/sections/home/FAQ";
export default function HomePage() {
  return (
    <div >
       <Hero />
       <AboutUsSection />
       <ImpactSection />
       <Stats />
       <WhyChooseSection />
       <NewsSection />
       <PartnerSlider />
       <FAQ />
       
    </div>
  );
}
