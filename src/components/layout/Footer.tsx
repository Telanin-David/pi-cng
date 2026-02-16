import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Youtube, Music2, X } from "lucide-react";

type FooterLink = { label: string; href: string };
type SocialLink = { label: string; href: string; icon: React.ReactNode };

const QUICK_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Conversion Centers", href: "/conversion-centres" },
  { label: "Testimonials", href: "/testimonials" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About Us", href: "/who-we-are" },
  { label: "Departments", href: "/departments" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS: SocialLink[] = [
  { label: "Facebook", href: "#", icon: <Facebook className="h-5 w-5" /> },
  { label: "Instagram", href: "#", icon: <Instagram className="h-5 w-5" /> },
  { label: "X", href: "#", icon: <X className="h-5 w-5" /> },
  { label: "TikTok", href: "#", icon: <Music2 className="h-5 w-5" /> },
  { label: "YouTube", href: "#", icon: <Youtube className="h-5 w-5" /> },
  { label: "LinkedIn", href: "#", icon: <Linkedin className="h-5 w-5" /> },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="ds-container">
        {/* Top grid */}
        <div className="py-14 md:py-20 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
         
          
           
          {/* Left: brand */}
          <div className="space-y-6">
            {/* Brand + message */}
            <div className="space-y-2">
              <Link href="/" className="inline-flex items-center gap-3 mb-10">
                {/* Replace src with your real logo file in /public */}
                <Image
                  src="/images/brand/picng-white-logo.png"
                  alt="Pi-CNG"
                  width={170}
                  height={58}
                  className="h-10 w-auto"
                  priority={false}
                />
              </Link>

              <p className="max-w-sm text-small text-white/80 leading-relaxed">
                Get updates delivered to your inbox. You can <br/>also reach us via the email address below.
              </p>

              <a
                href="mailto:info@pci.gov.ng"
                className="inline-flex text-small font-semibold text-brand hover:opacity-90 transition"
              >
                info@pci.gov.ng
              </a>

              {/* Optional phone line (add when you have official number) */}
              {/* <a href="tel:+234..." className="block text-small text-white/80 hover:text-white transition">+234 ...</a> */}
            </div>
          </div>

          {/* Right: the rest (pushed to end) */}
          <div className="grid gap-10 md:grid-cols-3 lg:gap-16 lg:justify-self-end">

            {/* Quick links */}     
           <FooterCol title="Quick Links" links={QUICK_LINKS} />

            {/* Company */}
            <FooterCol title="Company" links={COMPANY_LINKS} />

            {/* Socials */}
            <div className="space-y-6 lg:ml-10">
              <h3 className="text-h4 font-semibold">Socials</h3>

              <ul className="space-y-4">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 text-small text-white/85 hover:text-white transition"
                    >
                      <span className="text-white/85">{s.icon}</span>
                      <span>{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>
          
   
        </div>

        {/* Divider + bottom */}
        <div className="border-t border-white/20 py-6">
          <p className="text-caption text-white/75">
            © {new Date().getFullYear()} - Presidential Initiative on CNG (Pi-CNG)
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-h4 font-semibold">{title}</h3>

      <ul className="space-y-4">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-small text-white/85 hover:text-white transition"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
