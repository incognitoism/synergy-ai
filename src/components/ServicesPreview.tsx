"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect, MouseEvent } from "react";

/* ─── SVG Icons (not AI-generated — clean geometric primitives) ─── */
const IconAssistant = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 15.5h7M15.5 12v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const IconWorkflow = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="4.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6.5 11H11C13 11 13 5 15.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6.5 11H11C13 11 13 17 15.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);
const IconData = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17L8 11L12 14L17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="17" cy="7" r="2" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 19h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
);
const IconWeb = () => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 11h16M11 3C9 6 8 8.5 8 11s1 5 3 8M11 3c2 3 3 5.5 3 8s-1 5-3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const services = [
    {
        Icon: IconAssistant,
        category: "Conversational AI",
        title: "Enterprise\nAI Assistants",
        description: "Private, context-aware agents trained on your internal knowledge — not hallucinated guesses.",
        capabilities: ["RAG architecture", "Custom LLM tuning", "CRM integration", "Multi-channel deploy"],
        impact: "40–70% support load reduction",
        impactShort: "−65% support costs",
        accent: "#6366f1",
        accentRgb: "99,102,241",
        bg: "from-[#6366f1]/10 to-[#4f46e5]/5",
        index: "01",
    },
    {
        Icon: IconWorkflow,
        category: "Process Automation",
        title: "Intelligent\nOrchestration",
        description: "AI-driven pipelines connecting every system you rely on — seamlessly and without breaking.",
        capabilities: ["API integrations", "Event-driven logic", "Agent routing", "Scaling automation"],
        impact: "Zero manual bottlenecks",
        impactShort: "10× ops velocity",
        accent: "#f59e0b",
        accentRgb: "245,158,11",
        bg: "from-[#f59e0b]/10 to-[#d97706]/5",
        index: "02",
    },
    {
        Icon: IconData,
        category: "Data Intelligence",
        title: "Real-Time\nDecision Layer",
        description: "Live analytics and predictive pipelines that give executives clarity, not noise.",
        capabilities: ["Data pipelines", "Predictive modeling", "KPI dashboards", "Forecast systems"],
        impact: "Decisions in minutes, not days",
        impactShort: "3× decision speed",
        accent: "#10b981",
        accentRgb: "16,185,129",
        bg: "from-[#10b981]/10 to-[#059669]/5",
        index: "03",
    },
    {
        Icon: IconWeb,
        category: "Digital Infrastructure",
        title: "AI-Integrated\nWeb Platforms",
        description: "Modern architecture with embedded AI logic, personalisation and conversion intelligence.",
        capabilities: ["Next.js architecture", "AI personalisation", "Conversion logic", "Perf engineering"],
        impact: "Increase qualified inbound",
        impactShort: "+220% qualified leads",
        accent: "#ec4899",
        accentRgb: "236,72,153",
        bg: "from-[#ec4899]/10 to-[#db2777]/5",
        index: "04",
    },
];

/* ─── Infinite ticker ─── */
const tickerItems = [
    "Custom LLM Deployment", "RAG Systems", "Workflow Automation",
    "Predictive Analytics", "AI Web Platforms", "Agent Orchestration",
    "Vector Databases", "Real-Time Pipelines", "Enterprise AI", "Decision Intelligence",
];

function Ticker() {
    return (
        <div className="relative overflow-hidden py-4 border-y" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
            <div className="flex animate-ticker whitespace-nowrap">
                {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-3 px-6 text-xs tracking-[0.22em] uppercase text-slate-600 font-medium shrink-0">
                        <span className="w-1 h-1 rounded-full inline-block" style={{ background: i % 4 === 0 ? "#6366f1" : i % 4 === 1 ? "#f59e0b" : i % 4 === 2 ? "#10b981" : "#ec4899" }} />
                        {item}
                    </span>
                ))}
            </div>
            <style>{`
        @keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        .animate-ticker { animation: ticker 28s linear infinite; }
      `}</style>
        </div>
    );
}

/* ─── Shimmer border card ─── */
function ServiceCard({ s, index }: { s: typeof services[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 250, damping: 25 });
    const sy = useSpring(my, { stiffness: 250, damping: 25 });
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={onMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative rounded-2xl overflow-hidden cursor-default"
            style={{ background: "rgba(10,10,18,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
            {/* Mouse-follow glow */}
            <motion.div className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                style={{
                    opacity: hovered ? 1 : 0,
                    background: `radial-gradient(420px circle at ${sx}px ${sy}px, rgba(${s.accentRgb},0.1), transparent 50%)`,
                }} />

            {/* Shimmer border */}
            <motion.div className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
                style={{
                    opacity: hovered ? 1 : 0,
                    background: `radial-gradient(280px circle at ${sx}px ${sy}px, rgba(${s.accentRgb},0.22), transparent 50%)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                }} />

            {/* Top shimmer sweep line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
                <motion.div
                    className="h-full w-1/2"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
                    initial={{ x: "-100%" }}
                    animate={hovered ? { x: "200%" } : { x: "-100%" }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                />
            </div>

            <div className="relative z-10 p-7 md:p-8">

                {/* Header row */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        {/* Icon orb */}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 group-hover:scale-110"
                            style={{
                                background: `rgba(${s.accentRgb},0.1)`,
                                border: `1px solid rgba(${s.accentRgb},0.2)`,
                                color: s.accent,
                            }}>
                            <s.Icon />
                        </div>
                        <div>
                            <p className="text-[9px] tracking-[0.28em] uppercase font-medium mb-0.5" style={{ color: `rgba(${s.accentRgb},0.7)` }}>
                                {s.category}
                            </p>
                        </div>
                    </div>

                    {/* Index number */}
                    <span className="font-mono text-[11px] font-bold tabular-nums transition-colors duration-500"
                        style={{ color: hovered ? `rgba(${s.accentRgb},0.6)` : "rgba(255,255,255,0.1)" }}>
                        {s.index}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-[22px] md:text-2xl font-bold text-white leading-[1.15] tracking-tight mb-3 whitespace-pre-line">
                    {s.title}
                </h3>

                {/* Accent line */}
                <div className="h-[1.5px] w-8 rounded-full mb-4 transition-all duration-500 group-hover:w-14"
                    style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }} />

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light group-hover:text-slate-300 transition-colors duration-400">
                    {s.description}
                </p>

                {/* Capabilities */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                    {s.capabilities.map((c, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + i * 0.05 + 0.3, duration: 0.4 }}
                            className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300"
                        >
                            <div className="w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300 group-hover:scale-125"
                                style={{ background: s.accent }} />
                            {c}
                        </motion.div>
                    ))}
                </div>

                {/* Bottom impact bar */}
                <div className="pt-5 border-t flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.accent }} />
                        <span className="text-xs font-medium" style={{ color: `rgba(${s.accentRgb},0.8)` }}>
                            {s.impactShort}
                        </span>
                    </div>
                    <motion.div
                        className="flex items-center gap-1 text-xs text-slate-600 group-hover:text-slate-300 transition-colors duration-300"
                        animate={hovered ? { x: 3 } : { x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        Explore
                        <ArrowRight className="w-3 h-3" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

/* ─── Horizontal scrolling card carousel (mobile-style) ─── */
function StatsRow() {
    const stats = [
        { value: "40–70%", label: "Support cost reduction", accent: "#6366f1" },
        { value: "10×", label: "Operational velocity", accent: "#f59e0b" },
        { value: "< 48h", label: "Time to deployment", accent: "#10b981" },
        { value: "99.9%", label: "System uptime SLA", accent: "#ec4899" },
        { value: "3×", label: "Decision-making speed", accent: "#6366f1" },
        { value: "0", label: "Manual bottlenecks", accent: "#f59e0b" },
    ];

    return (
        <div className="relative overflow-hidden">
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex-shrink-0 snap-start rounded-xl px-6 py-4 min-w-[160px]"
                        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                        <div className="text-2xl font-bold text-white mb-1" style={{ color: s.accent }}>{s.value}</div>
                        <div className="text-[11px] text-slate-500 leading-snug">{s.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

/* ─── Main export ─── */
export default function ServicesPreview() {
    return (
        <section className="py-28 px-0 relative overflow-hidden bg-[#050508]">

            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[500px] opacity-[0.04]"
                    style={{ background: "radial-gradient(ellipse, #6366f1, transparent 70%)" }} />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] opacity-[0.03]"
                    style={{ background: "radial-gradient(ellipse, #f59e0b, transparent 70%)" }} />
                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.018]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "72px 72px",
                    }} />
            </div>

            {/* Section header */}
            <div className="px-6 max-w-7xl mx-auto mb-14">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: 32 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="h-[1.5px] rounded-full"
                                style={{ background: "linear-gradient(90deg, #6366f1, #f59e0b)" }}
                            />
                            <p className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-medium">What we build</p>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight">
                            AI Systems &amp; Infrastructure
                            <br />
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #6366f1 0%, #f59e0b 50%, #10b981 100%)" }}>
                                Built for Leverage
                            </span>
                        </h2>
                    </div>

                    <div className="md:max-w-xs">
                        <p className="text-slate-400 text-sm leading-relaxed mb-5">
                            We engineer intelligent systems that integrate directly into your workflows — driving measurable efficiency and strategic advantage.
                        </p>
                        <Link href="/services"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-white hover:text-slate-300 transition-colors duration-200">
                            View full architecture
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </Link>
                    </div>
                </motion.div>

                {/* Stats scroll row */}
                <StatsRow />
            </div>

            {/* Ticker */}
            <Ticker />

            {/* Cards grid */}
            <div className="px-6 max-w-7xl mx-auto mt-14">
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {services.map((s, i) => (
                        <ServiceCard key={s.title} s={s} index={i} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/services"
                        className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-white text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                    >
                        <span className="relative z-10">Explore Full Service Architecture</span>
                        <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>

                    <Link href="/book"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200"
                        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                        Book a strategy call
                    </Link>
                </motion.div>

                {/* Social proof line */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-8 text-center text-xs text-slate-700 tracking-widest uppercase"
                >
                    Deployed across finance · logistics · healthcare · e-commerce
                </motion.p>
            </div>
        </section>
    );
}