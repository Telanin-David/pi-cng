"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

type Item = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  items?: Item[];
  allowMultiple?: boolean;
  className?: string;
};

export default function Accordion({
  items = [],
  allowMultiple = false,
  className,
}: Props) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  function toggle(id: string) {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  }

  function isOpen(id: string) {
    return openItems.includes(id);
  }

  return (
    <div className={clsx("space-y-4", className)}>
      {items.map((item) => {
        const open = isOpen(item.id);

        return (
          <div
            key={item.id}
            className={clsx(
              "group rounded-xl overflow-hidden transition-all duration-200",
              !open && "bg-card shadow-none hover:bg-brand/10",
              open && "bg-white shadow-lg"
            )}
          >
            {/* HEADER */}
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className={clsx(
                "w-full flex items-center justify-between gap-4",
                "px-6 md:px-8 py-5 md:py-6",
                "text-left transition-colors",
                "outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              )}
            >
              <span
                className={clsx(
                  // ✅ reduced heading font a bit more
                  "ds-h4 text-[16px] md:text-[16px] leading-tight transition-colors font-normal",
                  !open && "text-black group-hover:text-brand/80 group-hover:font-light",
                  open && "text-brand font-extrabold"
                )}
              >
                {item.question}
              </span>

              {/* ICON */}
              <motion.span
                initial={false}
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className={clsx(
                  "flex items-center justify-center shrink-0",
                  "rounded-full transition-colors",
                  // ✅ smaller circle
                  "w-5.5 h-5.5", // if Tailwind doesn't support 5.5, change to w-5 h-5 or w-6 h-6
                  !open &&
                    "bg-transparent text-black border border-black/20 group-hover:bg-brand/10 group-hover:text-brand group-hover:border-brand/30",
                  open && "bg-white text-brand border border-brand/30"
                )}
              >
                {/* ✅ smaller icon */}
                {open ? <Minus size={13} /> : <Plus size={13} />}
              </motion.span>
            </button>

            {/* BODY */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div
                    className={clsx(
                      "px-6 md:px-8 pb-6 max-w-3xl",
                      // ✅ reduced answer font more
                      "ds-body text-[14px] md:text-[15px] leading-relaxed text-black/80"
                    )}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
