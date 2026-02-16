"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { NAV_DROPDOWNS, NavItem } from "@/config/nav";
import SplitButton from "@/components/ui/SplitButton";

type DropdownKey = "home" | "departments" | "news" | null;

const dropdownVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.98 },
};

export default function Navbar() {
  const pathname = usePathname();
  const [openMobile, setOpenMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);

  useEffect(() => {
    setOpenDropdown(null);
    setOpenMobile(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="ds-container">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/brand/picng-black-logo.png"
              alt="PI-CNG black logo"
              width={128}
              height={45}
              priority
            />
          </Link>

         <div className="flex h-20 items-center justify-between " >
            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Home dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("home")}
                onMouseLeave={() => setOpenDropdown((k) => (k === "home" ? null : k))}
              >
                <NavButton active={openDropdown === "home" || isActive("/")}>Home</NavButton>

                <DesktopDropdown
                  open={openDropdown === "home"}
                  items={NAV_DROPDOWNS.home}
                  align="center"
                />
              </div>

              {/* Who We Are (normal link) */}
              <NavLink href="/who-we-are" active={isActive("/who-we-are")}>
                Who We Are
              </NavLink>

              {/* Departments dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("departments")}
                onMouseLeave={() => setOpenDropdown((k) => (k === "departments" ? null : k))}
              >
                <NavButton active={openDropdown === "departments" || isActive("/departments")}>
                  Departments
                </NavButton>

                <DesktopDropdown
                  open={openDropdown === "departments"}
                  items={NAV_DROPDOWNS.departments}
                  align="center"
                />
              </div>

              {/* News dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setOpenDropdown("news")}
                onMouseLeave={() => setOpenDropdown((k) => (k === "news" ? null : k))}
              >
                <NavButton active={openDropdown === "news" || isActive("/news")}>News</NavButton>

                <DesktopDropdown
                  open={openDropdown === "news"}
                  items={NAV_DROPDOWNS.news}
                  align="center"
                />
              </div>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center ml-12">
              <SplitButton href="/contact">CONTACT US</SplitButton>
            </div>

            {/* Mobile hamburger (brand green) */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpenMobile(true)}
                aria-label="Open menu"
                className={clsx(
                  "inline-flex items-center justify-center rounded-full",
                  "h-11 w-11",
                  "bg-brand text-brand-fg",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
                )}
              >
                <Menu />
              </button>
            </div>

         </div>


        </div>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>{openMobile && <MobileMenu onClose={() => setOpenMobile(false)} />}</AnimatePresence>
    </header>
  );
}

/* -------------------- Desktop dropdown -------------------- */

function DesktopDropdown({
  open,
  items,
  align = "center",
}: {
  open: boolean;
  items: NavItem[];
  align?: "left" | "center" | "right";
}) {
  const alignClass =
    align === "left" ? "left-0" : align === "right" ? "right-0" : "left-1/2 -translate-x-1/2";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="exit"
          variants={dropdownVariants}
          transition={{ duration: 0.18 }}
          className={clsx(
            "absolute top-full mt-3",
            alignClass,
            "w-[220px] rounded-2xl",
            "bg-muted/60 backdrop-blur-md",
            "shadow-lift border border-border",
            "p-8"
          )}
        >
          <ul className="space-y-5">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className="text-[14px] leading-tight text-black hover:opacity-80 transition"
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------- Mobile menu -------------------- */

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openGroup, setOpenGroup] = useState<DropdownKey>(null);
  const toggle = (key: DropdownKey) => setOpenGroup((k) => (k === key ? null : key));

  return (
    <motion.div
      className="fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <button aria-label="Close menu backdrop" className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <motion.aside
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="absolute right-0 top-0 h-full w-[88%] max-w-[420px] bg-white shadow-lift"
      >
        <div className="p-6 flex items-center justify-between">
          <span className="text-[18px] font-semibold">Menu</span>

          {/* Close (accent) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className={clsx(
              "inline-flex items-center justify-center rounded-full",
              "h-11 w-11",
              "bg-accent text-black",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/35"
            )}
          >
            <X />
          </button>
        </div>

        <div className="px-6 pb-8 space-y-4">
          <MobileLink href="/" onClick={onClose}>
            Home
          </MobileLink>

          <MobileLink href="/who-we-are" onClick={onClose}>
            Who We Are
          </MobileLink>

          <MobileGroup title="Home" open={openGroup === "home"} onToggle={() => toggle("home")} items={NAV_DROPDOWNS.home} onPick={onClose} />

          <MobileGroup
            title="Departments"
            open={openGroup === "departments"}
            onToggle={() => toggle("departments")}
            items={NAV_DROPDOWNS.departments}
            onPick={onClose}
          />

          <MobileGroup title="News" open={openGroup === "news"} onToggle={() => toggle("news")} items={NAV_DROPDOWNS.news} onPick={onClose} />

          <div className="pt-4">
            <SplitButton href="/contact">CONTACT US</SplitButton>
          </div>
        </div>
      </motion.aside>
    </motion.div>
  );
}

function MobileLink({ href, onClick, children }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-2xl border border-border px-5 py-4 text-[14px] hover:bg-muted transition"
    >
      {children}
    </Link>
  );
}

function MobileGroup({
  title,
  open,
  onToggle,
  items,
  onPick,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  items: NavItem[];
  onPick: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-[14px] bg-white hover:bg-muted transition">
        <span>{title}</span>
        <span className="text-brand">{open ? "—" : "+"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-muted/60"
          >
            <div className="px-5 py-4 space-y-3">
              {items.map((it) => (
                <Link key={it.href} href={it.href} onClick={onPick} className="block text-[14px] py-2 hover:opacity-80 transition">
                  {it.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------- Helpers (simple pill effect) -------------------- */

function NavLink({ href, active, children }: { href: string; active?: boolean; children: any }) {
  return (
    <Link
      href={href}
      className={clsx(
        "px-6 py-3 rounded-full text-[14px] tracking-wide transition-colors duration-200",
        "hover:bg-accent-100 hover:text-brand",
        active ? "bg-accent-100 text-brand " : "text-black/80"
      )}
    >
      {children}
    </Link>
  );
}

function NavButton({ active, children }: { active?: boolean; children: any }) {
  return (
    <span
      className={clsx(
        "px-6 py-3 rounded-full text-[14px] tracking-wide transition-colors duration-200",
        "hover:bg-accent-100 hover:text-brand",
        active ? "bg-accent-100 text-brand " : "text-black/80",
        "cursor-default select-none"
      )}
    >
      {children}
    </span>
  );
}
