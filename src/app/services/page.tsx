"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, MouseEvent } from "react";

/* ─── Clean geometric SVG icons ─── */
const IconAssistant = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="11.5" y="2.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2.5" y="11.5" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M11.5 14.5h6M14.5 11.5v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);
const IconWorkflow = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="3.5" cy="10" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16.5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16.5" cy="15.5" r="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M5.5 10H10C12 10 12 4.5 14.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5.5 10H10C12 10 12 15.5 14.5 15.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);
const IconData = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 15.5L7.5 10L11 13L16 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="6.5" r="1.8" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 17.5h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
    </svg>
);
const IconWeb = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M2.5 10h15M10 2.5C8.2 5.2 7.2 7.5 7.2 10s1 4.8 2.8 7.5M10 2.5c1.8 2.7 2.8 5 2.8 7.5s-1 4.8-2.8 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
);

const services = [
    {
        Icon: IconAssistant,
        category: "Conversational AI",
        title: "Enterprise AI Assistants",
        description: "Private, context-aware agents trained on your internal knowledge — not hallucinated guesses.",
        capabilities: ["RAG architecture", "Custom LLM tuning", "CRM integration", "Multi-channel deploy"],
        impactShort: "−65% support costs",
        index: "01",
    },
    {
        Icon: IconWorkflow,
        category: "Process Automation",
        title: "Intelligent Orchestration",
        description: "AI-driven pipelines connecting every system you rely on — seamlessly and without breaking.",
        capabilities: ["API integrations", "Event-driven logic", "Agent routing", "Scaling automation"],
        impactShort: "10× ops velocity",
        index: "02",
    },
    {
        Icon: IconData,
        category: "Data Intelligence",
        title: "Real-Time Decision Layer",
        description: "Live analytics and predictive pipelines that give executives clarity, not noise.",
        capabilities: ["Data pipelines", "Predictive modeling", "KPI dashboards", "Forecast systems"],
        impactShort: "3× decision speed",
        index: "03",
    },
    {
        Icon: IconWeb,
        category: "Digital Infrastructure",
        title: "AI-Integrated Platforms",
        description: "Modern architecture with embedded AI logic, personalisation and conversion intelligence.",
        capabilities: ["Next.js architecture", "AI personalisation", "Conversion logic", "Perf engineering"],
        impactShort: "+220% qualified leads",
        index: "04",
    },
];

/* ─── Card ─── */
function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 200, damping: 28 });
    const sy = useSpring(my, { stiffness: 200, damping: 28 });
    const [hovered, setHovered] = useState(false);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative rounded-2xl overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
            }}
        >
            {/* Mouse-follow glow */}
            <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.45s ease",
                    background: `radial-gradient(380px circle at ${sx}px ${sy}px, rgba(99,102,241,0.1), transparent 55%)`,
                }}
            />

            {/* Shimmer border */}
            <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    opacity: hovered ? 1 : 0,
                    transition: "opacity 0.45s ease",
                    background: `radial-gradient(260px circle at ${sx}px ${sy}px, rgba(139,92,246,0.22), transparent 50%)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                }}
            />

            {/* Top edge sweep */}
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                <motion.div
                    className="h-full w-1/2"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.65), transparent)" }}
                    initial={{ x: "-120%" }}
                    animate={hovered ? { x: "260%" } : { x: "-120%" }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>

            <div className="relative z-10 p-7">

                {/* Icon + index */}
                <div className="flex items-start justify-between mb-6">
                    <motion.div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                            background: "rgba(99,102,241,0.08)",
                            border: "1px solid rgba(99,102,241,0.14)",
                            color: "rgba(165,180,252,0.8)",
                        }}
                        animate={hovered
                            ? { scale: 1.07, backgroundColor: "rgba(99,102,241,0.14)", borderColor: "rgba(99,102,241,0.32)" }
                            : { scale: 1, backgroundColor: "rgba(99,102,241,0.08)", borderColor: "rgba(99,102,241,0.14)" }
                        }
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <s.Icon />
                    </motion.div>

                    <motion.span
                        className="font-mono text-[11px] font-semibold tabular-nums"
                        animate={{ color: hovered ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.1)" }}
                        transition={{ duration: 0.3 }}
                    >
                        {s.index}
                    </motion.span>
                </div>

                {/* Category */}
                <motion.p
                    className="text-[10px] tracking-[0.24em] uppercase font-medium mb-2.5"
                    animate={{ color: hovered ? "rgba(165,180,252,0.65)" : "rgba(100,116,139,0.7)" }}
                    transition={{ duration: 0.3 }}
                >
                    {s.category}
                </motion.p>

                {/* Title */}
                <h3 className="text-[17px] font-semibold leading-snug tracking-tight mb-1 transition-colors duration-300"
                    style={{ color: hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.82)" }}>
                    {s.title}
                </h3>

                {/* Expanding accent line */}
                <motion.div
                    className="h-px rounded-full mb-4"
                    style={{ background: "linear-gradient(90deg, rgba(99,102,241,0.55), transparent)" }}
                    animate={{ width: hovered ? "44px" : "24px" }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Description */}
                <motion.p
                    className="text-sm leading-relaxed mb-5 font-light"
                    animate={{ color: hovered ? "rgba(148,163,184,1)" : "rgba(100,116,139,0.9)" }}
                    transition={{ duration: 0.3 }}
                >
                    {s.description}
                </motion.p>

                {/* Capabilities */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-6">
                    {s.capabilities.map((c, i) => (
                        <motion.div
                            key={i}
                            className="flex items-center gap-2 text-xs"
                            initial={{ opacity: 0, x: -4 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.09 + i * 0.05 + 0.3, duration: 0.4 }}
                            animate={{ color: hovered ? "rgba(148,163,184,0.8)" : "rgba(100,116,139,0.7)" }}
                        >
                            <motion.div
                                className="w-1 h-1 rounded-full flex-shrink-0"
                                animate={{ backgroundColor: hovered ? "rgba(139,92,246,0.7)" : "rgba(99,102,241,0.35)" }}
                                transition={{ duration: 0.3 }}
                            />
                            {c}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="pt-4 border-t flex items-center justify-between"
                    style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-2">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: "rgba(129,140,248,0.7)" }}
                            animate={{ opacity: [0.7, 0.3, 0.7] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="text-xs font-medium text-indigo-300/60">
                            {s.impactShort}
                        </span>
                    </div>
                    <motion.div
                        className="flex items-center gap-1 text-xs text-slate-600"
                        animate={{ x: hovered ? 3 : 0, color: hovered ? "rgba(148,163,184,0.8)" : "rgba(71,85,105,0.8)" }}
                        transition={{ duration: 0.2 }}
                    >
                        Explore <ArrowRight className="w-3 h-3" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Main export ─── */
export default function ServicesPreview() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">

            {/* Background — same as rest of site */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] opacity-[0.035]"
                    style={{ background: "radial-gradient(ellipse, rgba(99,102,241,1) 0%, rgba(139,92,246,0.5) 40%, transparent 70%)" }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
                >
                    <div>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 36 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="h-[1.5px] rounded-full mb-5"
                            style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }}
                        />
                        <p className="text-[10px] tracking-[0.28em] uppercase text-indigo-400/60 font-medium mb-4">
                            What we build
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-[1.06] tracking-tight">
                            AI Systems &amp; Infrastructure
                            <br />
                            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                                Built for Operational Leverage
                            </span>
                        </h2>
                    </div>

                    <div className="md:max-w-xs shrink-0">
                        <p className="text-slate-400 text-sm leading-relaxed mb-5">
                            We engineer intelligent systems that integrate directly into your workflows — driving measurable efficiency and strategic advantage.
                        </p>
                        <Link href="/services"
                            className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
                            View full architecture
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </Link>
                    </div>
                </motion.div>

                {/* Cards */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {services.map((s, i) => (
                        <ServiceCard key={s.title} s={s} index={i} />
                    ))}
                </div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/complete_offering"
                        className="group px-9 py-4 rounded-full bg-accent transition-all duration-300 font-medium text-white text-sm tracking-wide flex items-center gap-2 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]"
                    >
                        Explore Full Architecture
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>

                    <Link
                        href="/book"
                        className="px-9 py-4 rounded-full border border-accent/20 text-accent-light font-medium text-sm tracking-wide hover:border-accent/40 hover:text-white transition-all duration-300"
                    >
                        Book a strategy call
                    </Link>
                </motion.div>

                {/* Industry tag line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="mt-8 text-center text-[11px] text-slate-700 tracking-[0.2em] uppercase"
                >
                    Deployed across finance · logistics · healthcare · e-commerce
                </motion.p>
            </div>
        </section>
    );
}