import Hero from "@/components/sections/home/Hero";
import AboutUsSection from "@/components/sections/home/AboutUs";
import FAQ from "@/components/sections/home/FAQ";
import {PageHero} from "@/components/ui/PageHero"

export default function Contact() {
  return (
    <div >
      <PageHero
        title="Contact Us"
        imageSrc="/images/pages/contact/hero/contact-hero.png"
        heightPx={600}
      />

     <FAQ />
    </div>
  );
}
