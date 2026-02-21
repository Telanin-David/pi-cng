import Hero from "@/components/sections/home/Hero";
import AboutUsSection from "@/components/sections/home/AboutUs";
import FAQ from "@/components/sections/home/FAQ";
import {PageHero} from "@/components/ui/PageHero"

export default function Mandate() {
  return (
    <div >
      <PageHero
        title="The Pi-CNG Mandate"
        body="The Presidential Initiative on Compressed Natural Gas and Electric vehicles (Pi-CNG & EV) is a flagship programme of the Federal Government of Nigeria launched in 2023. Its primary mandate is to fast-track Nigeria’s transition to cleaner, more affordable, and sustainable transportation energy sources following the removal of fuel subsidies."
        imageSrc="/images/pages/mandate/hero/mandate-hero.png"
        heightPx={600}
      />

    <FAQ />
    </div>
  );
}
