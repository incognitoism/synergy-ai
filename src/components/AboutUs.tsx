"use client";
import { motion } from "framer-motion";

export default function AboutUs() {
    return (
        <section className="py-28 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-20" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-5 gap-16 lg:gap-20">

                    {/* Left — story */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-3"
                    >
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 40 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="h-[2px] bg-gradient-to-r from-accent to-purple-500 mb-5 rounded-full"
                        />
                        <p className="text-[10px] tracking-[0.28em] uppercase text-accent-light font-mono mb-4">
                            About us
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10 leading-[1.1]">
                            Real people,{" "}
                            <span className="text-gradient">real work</span>
                        </h2>

                        <div className="space-y-5 text-[15px] leading-[1.7]">
                            <p className="text-slate-400 font-light">
                                We&apos;re a small studio. When you work with us, you talk to the people
                                who actually write your code — not an account manager who&apos;ll relay
                                messages to developers you&apos;ve never met.
                            </p>
                            <p className="text-slate-400 font-light">
                                We started this because we kept seeing startups get burned by agencies
                                that over-promise and under-deliver. We wanted to do the opposite:{" "}
                                <span className="text-white/80">say less, build more, and let the work speak for itself.</span>
                            </p>
                            <p className="text-slate-400 font-light">
                                Every project gets our full attention. We don&apos;t juggle 15 clients
                                at once. If we&apos;re at capacity, we&apos;ll tell you honestly rather
                                than stretching ourselves thin.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right — facts + currently building */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="lg:col-span-2 lg:pt-32"
                    >
                        <div className="space-y-8">
                            {[
                                { label: "How we work", value: "Weekly demos, async updates, no surprises." },
                                { label: "Our clients", value: "Mostly seed-to-Series A startups and small teams automating their ops." },
                                { label: "Our vibe", value: "Direct, low-ego, deadline-conscious. We don't do corporate theater." },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 12 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="border-l-2 border-white/[0.06] pl-5 hover:border-indigo-500/30 transition-colors duration-500"
                                >
                                    <h3 className="text-xs tracking-[0.15em] uppercase text-slate-500 mb-2">{item.label}</h3>
                                    <p className="text-sm text-slate-300 leading-relaxed font-light">{item.value}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Currently building — real human touch */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="mt-10 rounded-xl border border-white/[0.05] bg-white/[0.015] p-5"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                                </span>
                                <span className="text-[10px] tracking-[0.15em] uppercase text-emerald-400/70 font-mono">
                                    Currently building
                                </span>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed font-light">
                                An AI-powered document review tool for a legal tech startup. Auto-summarization, clause extraction, risk flagging.
                            </p>
                            <div className="flex gap-1.5 mt-3">
                                {["Next.js", "Claude API", "Supabase"].map(t => (
                                    <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/[0.06] text-slate-500 bg-white/[0.02]">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
