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
  items: Item[];
  allowMultiple?: boolean;
  className?: string;
};

export default function Accordion({
  items,
  allowMultiple = false,
  className,
}: Props) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  function toggle(id: string) {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id)
          ? prev.filter((i) => i !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems((prev) =>
        prev.includes(id) ? [] : [id]
      );
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
              "rounded-xl overflow-hidden transition-colors duration-200",
              open
                ? "bg-card"
                : "bg-card hover:bg-muted"
            )}
          >
            {/* HEADER */}
            <button
              onClick={() => toggle(item.id)}
              className={clsx(
                "w-full flex items-center justify-between",
                "px-6 md:px-8 py-5 md:py-6",
                "text-left",
                "transition-colors"
              )}
            >
              <span
                className={clsx(
                  "ds-h4 transition-colors",
                  open
                    ? "text-brand font-semibold"
                    : "text-brand hover:text-brand"
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
                  "flex items-center justify-center",
                  "w-8 h-8 rounded-full",
                  "border-2",
                  open
                    ? "border-brand text-brand"
                    : "border-brand text-brand"
                )}
              >
                {open ? (
                  <Minus size={18} />
                ) : (
                  <Plus size={18} />
                )}
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
                  <div className="px-6 md:px-8 pb-6 ds-body text-fg max-w-3xl">
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
