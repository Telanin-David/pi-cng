import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Accordion from "@/components/ui/Accordion";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is Pi-CNG, and how does it work?",
    answer:
      "Pi-CNG is a national initiative designed to accelerate the adoption of Compressed Natural Gas (CNG) as a cleaner, cheaper transportation fuel. It supports vehicle conversion, infrastructure expansion, and capacity building.",
  },
  {
    id: "faq-2",
    question: "Which vehicles can use CNG under the Pi-CNG initiative?",
    answer:
      "Most petrol or diesel vehicles can be converted to run on CNG, while some vehicles are designed to use it directly from the factory. The programme focuses on buses, trucks, taxis, and private cars—especially public transport vehicles.",
  },
  {
    id: "faq-3",
    question: "How safe is CNG compared to petrol or diesel for transportation?",
    answer:
      "CNG is widely used globally and is considered safe when installed and maintained properly. It disperses quickly in open air and is stored in high-strength cylinders designed to strict standards.",
  },
  {
    id: "faq-4",
    question: "What are the cost benefits of using CNG for personal or commercial vehicles?",
    answer:
      "CNG generally reduces fuel cost per km compared to petrol/diesel. For commercial fleets, savings can be significant over time, especially with high mileage use cases such as buses, taxis, and logistics vehicles.",
  },
];

export default function FAQ() {
  return (
    <section className="ds-section bg-white">
      <div className="ds-container">
        <div className="ds-grid items-start">
          {/* Left column */}
          <div className="col-span-12 lg:col-span-4">
            <div className="max-w-[360px]">
              <div className="mb-6">
                <Image
                  src="/images/home/sections/faq/faq 1.png"
                  alt="FAQ"
                  width={64}
                  height={64}
                  className="h-12 w-12 object-contain"
                />
              </div>

              <h2 className="text-[38px] leading-[1.05] font-semibold tracking-[-0.02em] text-black">
                Frequently Asked <br /> Questions
              </h2>

              <div className="mt-16">
                <p className="text-[18px] text-black">Have other questions?</p>

                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center gap-3 text-[16px] text-brand hover:opacity-90 transition"
                >
                  <span>Contact us</span>

                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand">
                    <ArrowRight className="h-2 w-2 text-brand-fg" />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-8">
            <div className="lg:pl-10">
              {/* ✅ removed the divider line */}
              {/* <div className="h-px w-full bg-black/10" /> */}

              <Accordion
                items={FAQ_ITEMS.map((x) => ({
                  id: x.id,
                  question: x.question,
                  answer: x.answer,
                }))}
                className="divide-y-0" // ✅ remove any internal divider lines too
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
