"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
});

interface EnterprisePageProps {
  title: string;
  subtitle: string;
  sections: {
    title: string;
    content: string;
  }[];
}

export default function EnterprisePage({
  title,
  subtitle,
  sections,
}: EnterprisePageProps) {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-8 md:px-16 pt-24 pb-20">
          <motion.h1 {...fadeUp()} className="text-4xl md:text-5xl font-semibold">
            {title}
          </motion.h1>
          <motion.p
            {...fadeUp(0.1)}
            className="mt-6 text-slate-400 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-8 md:px-16 pt-10 pb-24 space-y-14 text-slate-400 leading-relaxed">
        {sections.map((section, i) => (
          <motion.div key={i} {...fadeUp(i * 0.1)}>
            <h2 className="text-xl text-white font-semibold mb-4">
              {section.title}
            </h2>
            <p>{section.content}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}