import Hero from "@/components/sections/home/Hero";
import AboutUsSection from "@/components/sections/home/AboutUs";
import { ImpactSection } from "@/components/sections/home/ImpactStats";
import FAQ from "@/components/sections/home/FAQ";
export default function HomePage() {
  return (
    <div >
       <Hero />
       <AboutUsSection />
       <ImpactSection />
       <FAQ />
       
    </div>
  );
}
