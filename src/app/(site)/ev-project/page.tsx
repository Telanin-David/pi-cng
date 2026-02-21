import Hero from "@/components/sections/home/Hero";
import AboutUsSection from "@/components/sections/home/AboutUs";
import { ImpactSection } from "@/components/sections/home/ImpactStats";

import {PageHero} from "@/components/ui/PageHero"

export default function EvProject() {
  return (
    <div >
      <PageHero
        title="EV 40+: The Future of Mobility in Nigeria is Here.e"
        body="From electric buses to innovative charging solutions—we are ready for a cleaner transport future."
        imageSrc="/images/pages/ev-project/ev-hero.png"
        heightPx={600}
      />

   
    </div>
  );
}
