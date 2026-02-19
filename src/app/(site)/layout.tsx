import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingMessageImage from "@/components/ui/FloatingMessageImage";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      

      <main>{children}</main>

        <FloatingMessageImage
          src="/icons/chat/Bubble-chat.png"
          href="/contact"     // your link
          initialTopPx={120}
          edgeInsetPx={72}
        />


      <Footer />
    </>
  );
}

