"use client";
import { motion } from "framer-motion";

const categories = [
    {
        label: "Frontend",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    },
    {
        label: "Backend",
        tech: ["Node.js", "Python", "PostgreSQL", "Supabase"],
    },
    {
        label: "AI / APIs",
        tech: ["OpenAI API", "Claude API", "LangChain", "Pinecone"],
    },
    {
        label: "Infrastructure",
        tech: ["AWS", "Vercel", "Docker", "GitHub Actions"],
    },
];

export default function OurStack() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#070b14] via-dark-900 to-dark-900" />
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-14"
                >
                    <p className="text-[10px] tracking-[0.28em] uppercase text-accent-light font-mono mb-4">
                        Tech
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
                        Our <span className="text-gradient">stack</span>
                    </h2>
                    <p className="text-slate-500 text-sm font-light">
                        Tools we use daily. No hype — just what works.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat, ci) => (
                        <motion.div
                            key={cat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: ci * 0.1 + 0.2, duration: 0.5 }}
                            className="text-center"
                        >
                            <p className="text-[10px] tracking-[0.25em] uppercase text-slate-600 font-mono mb-4">
                                {cat.label}
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {cat.tech.map((t, ti) => (
                                    <motion.span
                                        key={t}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: ci * 0.1 + ti * 0.05 + 0.3, duration: 0.3 }}
                                        className="px-3.5 py-1.5 rounded-full text-[13px] text-slate-400 border border-white/[0.05] bg-white/[0.02] hover:border-white/[0.12] hover:text-white/80 transition-all duration-300 cursor-default"
                                    >
                                        {t}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
