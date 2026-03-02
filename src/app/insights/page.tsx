"use client";

import Link from "next/link";
import { motion, useInView, Variants, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
    ArrowRight,
    Brain,
    FileBarChart,
    ChevronRight,
    Check,
    Sparkles,
    LineChart,
    Users,
    ScanSearch,
    Gauge,
    AlertTriangle,
    UserCheck,
    ShoppingCart,
    Megaphone,
    Wallet,
    Layers,
} from "lucide-react";

/* ════════════════════════════════════════════════════════
   § 0 · SHARED UTILITIES
   ════════════════════════════════════════════════════════ */

function Reveal({ children, delay = 0, className = "", y = 36 }: {
    children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-70px" });
    return (
        <motion.div ref={ref}
            initial={{ opacity: 0, y, filter: "blur(7px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay }}
            className={className}>
            {children}
        </motion.div>
    );
}

function StaggerGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
            className={className}>
            {children}
        </motion.div>
    );
}

const staggerChild: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

function Counter({ target, suffix = "", prefix = "", decimals = 0 }: {
    target: number; suffix?: string; prefix?: string; decimals?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let frame: number;
        const dur = 2200;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            setVal(eased * target);
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, target]);
    return <span ref={ref}>{prefix}{decimals ? val.toFixed(decimals) : Math.round(val)}{suffix}</span>;
}

function Glow({ children }: { children: React.ReactNode }) {
    return (
        <span className="glow-text bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 100%", animation: "textShimmer 4s ease-in-out infinite" }}>
            {children}
        </span>
    );
}

function Divider() {
    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className="h-px w-full" style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
            }} />
        </div>
    );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.28em] uppercase font-medium"
            style={{ color: "rgba(34,211,238,0.55)" }}>
            <span className="w-6 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
            {children}
        </span>
    );
}

/* ════════════════════════════════════════════════════════
   § 1 · NEURAL NETWORK ANIMATION
   ════════════════════════════════════════════════════════ */

function NeuralNetwork() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const layers = [
        { label: "Raw Data", nodes: [12, 24, 36, 48, 60], color: "#22d3ee" },
        { label: "Feature Extraction", nodes: [18, 32, 46, 58], color: "#6366f1" },
        { label: "ML Models", nodes: [22, 38, 54], color: "#a855f7" },
        { label: "Predictions", nodes: [30, 46], color: "#34d399" },
    ];

    const layerX = [10, 36, 64, 90];
    const vbW = 100;
    const vbH = 70;

    const connections: { x1: number; y1: number; x2: number; y2: number; color1: string; color2: string; idx: number }[] = [];
    let connIdx = 0;
    for (let l = 0; l < layers.length - 1; l++) {
        for (const n1 of layers[l].nodes) {
            for (const n2 of layers[l + 1].nodes) {
                connections.push({
                    x1: layerX[l], y1: n1, x2: layerX[l + 1], y2: n2,
                    color1: layers[l].color, color2: layers[l + 1].color,
                    idx: connIdx++,
                });
            }
        }
    }

    return (
        <div ref={ref} className="relative w-full max-w-[920px] mx-auto" style={{ aspectRatio: "16 / 8" }}>
            <svg viewBox={`0 0 ${vbW} ${vbH}`} fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                    {layers.map((_, i) => i < layers.length - 1 && (
                        <linearGradient key={`cg${i}`} id={`conn-${i}`}
                            x1={`${layerX[i]}%`} y1="50%" x2={`${layerX[i + 1]}%`} y2="50%">
                            <stop offset="0%" stopColor={layers[i].color} stopOpacity="0.25" />
                            <stop offset="100%" stopColor={layers[i + 1].color} stopOpacity="0.25" />
                        </linearGradient>
                    ))}
                    {/* Blurs kept ONLY for static glowing, removed from animating elements below */}
                    <filter id="ngl"><feGaussianBlur stdDeviation="0.6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    <filter id="ngl2"><feGaussianBlur stdDeviation="1.8" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>

                {/* Connections */}
                {connections.map((c, i) => (
                    <motion.line key={`c${i}`}
                        x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
                        stroke={`url(#conn-${layers.findIndex(l => l.color === c.color1)})`}
                        strokeWidth="0.15"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: [0, 0.6, 0.3] } : {}}
                        transition={{ duration: 1.5, delay: 0.3 + (i % 20) * 0.03, ease: "easeOut" }}
                    />
                ))}

                {/* Travelling data pulses - FILTER REMOVED FOR PERFORMANCE */}
                {inView && connections.filter((_, i) => i % 7 === 0).map((c, i) => (
                    <motion.circle key={`p${i}`} r="0.5" fill={c.color2}
                        initial={{ cx: c.x1, cy: c.y1, opacity: 0 }}
                        animate={{ cx: [c.x1, c.x2], cy: [c.y1, c.y2], opacity: [0, 0.9, 0] }}
                        transition={{ duration: 1.8 + i * 0.2, repeat: Infinity, delay: i * 0.5 + 1.5, ease: "easeInOut" }}
                    />
                ))}

                {/* Nodes - FILTERS REMOVED FROM ANIMATING ELEMENTS */}
                {layers.map((layer, l) =>
                    layer.nodes.map((ny, n) => (
                        <g key={`n${l}-${n}`}>
                            {/* Outer glow */}
                            <motion.circle cx={layerX[l]} cy={ny} r="2.5"
                                fill={layer.color} fillOpacity="0.06"
                                initial={{ scale: 0 }}
                                animate={inView ? { scale: 1 } : {}} // <-- Set to a single target value
                                transition={{ duration: 0.8, delay: 0.5 + l * 0.2 + n * 0.06, type: "spring", stiffness: 180 }}
                            />
                            {/* Core node */}
                            <motion.circle cx={layerX[l]} cy={ny} r="1.2"
                                fill="#0B0B12" stroke={layer.color} strokeWidth="0.35"
                                initial={{ scale: 0 }}
                                animate={inView ? { scale: 1 } : {}}
                                transition={{ duration: 0.5, delay: 0.5 + l * 0.2 + n * 0.06, type: "spring", stiffness: 250 }}
                            />
                            {/* Inner pulse */}
                            {inView && (
                                <motion.circle cx={layerX[l]} cy={ny} r="0.5"
                                    fill={layer.color}
                                    animate={{ opacity: [0.3, 0.8, 0.3], r: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2 + n * 0.3, repeat: Infinity, ease: "easeInOut", delay: l * 0.4 + n * 0.15 }}
                                />
                            )}
                        </g>
                    ))
                )}
            </svg>

            {/* Layer labels */}
            {layers.map((layer, l) => (
                <motion.div key={`lbl${l}`}
                    className="absolute text-center"
                    style={{ left: `${layerX[l]}%`, bottom: "-6%", transform: "translateX(-50%)" }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + l * 0.15 }}>
                    <span className="text-[10px] tracking-[0.15em] uppercase font-medium block"
                        style={{ color: `${layer.color}88` }}>
                        {layer.label}
                    </span>
                </motion.div>
            ))}

            {/* Center pulse aura */}
            {inView && (
                <div className="absolute pointer-events-none" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                    {[0, 1].map(i => (
                        <motion.div key={i} className="absolute rounded-full"
                            style={{ inset: -(40 + i * 30), border: "1px solid rgba(99,102,241,0.12)" }}
                            animate={{ scale: [0.9, 1.4], opacity: [0.25, 0] }}
                            transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.4, ease: "easeOut" }} />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ════════════════════════════════════════════════════════
   § 2 · LIVE PREDICTION TICKER
   ════════════════════════════════════════════════════════ */

function PredictionTicker() {
    const predictions = [
        { label: "Churn Risk: User #4821", value: "87% likely", color: "#f43f5e" },
        { label: "LTV Forecast: Cohort Q1", value: "+$42.3K", color: "#34d399" },
        { label: "Purchase Intent: Segment A", value: "High (0.92)", color: "#22d3ee" },
        { label: "Engagement Drop: Feature X", value: "-23% next 14d", color: "#f97316" },
        { label: "Upsell Opportunity: Tier 2", value: "340 accounts", color: "#a855f7" },
        { label: "Support Volume Forecast", value: "+18% Thu-Fri", color: "#6366f1" },
        { label: "Revenue Prediction: March", value: "$128.4K ± 3.2%", color: "#34d399" },
    ];
    const doubled = [...predictions, ...predictions];

    return (
        <div className="relative overflow-hidden w-full">
            <div className="absolute inset-y-0 left-0 w-28 z-10" style={{ background: "linear-gradient(to right, #06060A, transparent)" }} />
            <div className="absolute inset-y-0 right-0 w-28 z-10" style={{ background: "linear-gradient(to left, #06060A, transparent)" }} />
            {/* Added willChange transform here for smooth scrolling performance */}
            <motion.div className="flex gap-5 items-center w-max py-4"
                style={{ willChange: "transform" }}
                animate={{ x: [0, -predictions.length * 260] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}>
                {doubled.map((p, i) => (
                    <div key={i} className="flex items-center gap-3 px-5 py-3 rounded-xl border shrink-0"
                        style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.04)", minWidth: 240 }}>
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}55` }} />
                        <div className="flex flex-col">
                            <span className="text-[11px] text-white/35 font-medium">{p.label}</span>
                            <span className="text-sm font-semibold" style={{ color: p.color }}>{p.value}</span>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

/* ════════════════════════════════════════════════════════
   § 3 · COMPARISON TABLE
   ════════════════════════════════════════════════════════ */

function ComparisonTable() {
    const rows = [
        { feature: "Decision basis", without: "Gut feeling & spreadsheets", with: "ML-backed probability scores" },
        { feature: "Churn detection", without: "After the customer leaves", with: "30–90 days before churn" },
        { feature: "Revenue forecasting", without: "Quarterly estimates ± 25%", with: "Weekly forecasts ± 3%" },
        { feature: "Customer segmentation", without: "Static demographic groups", with: "Dynamic behavioral clusters" },
        { feature: "Campaign targeting", without: "Broad audience blasts", with: "Individual propensity scoring" },
        { feature: "Time to insight", without: "Days to weeks (analyst backlog)", with: "Real-time dashboards" },
        { feature: "Data sources", without: "One tool at a time", with: "Unified cross-platform model" },
    ];
    return (
        <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <table className="w-full text-left" style={{ minWidth: 600 }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <th className="px-6 py-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Capability</th>
                        <th className="px-6 py-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>Without Asphal AI</th>
                        <th className="px-6 py-4 text-sm font-medium text-cyan-400">With Asphal AI</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <motion.tr key={i}
                            initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.04, duration: 0.5 }}
                            style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                            <td className="px-6 py-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>{r.feature}</td>
                            <td className="px-6 py-4 text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>{r.without}</td>
                            <td className="px-6 py-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{r.with}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ════════════════════════════════════════════════════════
   § 4 · REPORT PREVIEW CARDS
   ════════════════════════════════════════════════════════ */

function ReportCard({ title, desc, metrics, accent }: {
    title: string; desc: string; metrics: { label: string; value: string }[]; accent: string;
}) {
    return (
        <motion.div variants={staggerChild}
            className="group p-7 rounded-2xl border relative overflow-hidden transition-all duration-500 hover:border-opacity-20"
            style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0.008))",
                borderColor: "rgba(255,255,255,0.05)",
            }}>
            <div className="absolute top-0 left-6 right-6 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${accent}35, transparent)` }} />
            <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(400px circle at 50% 0%, ${accent}08, transparent 70%)` }} />

            <div className="flex items-center gap-3 mb-4">
                <FileBarChart size={18} strokeWidth={1.5} style={{ color: accent }} />
                <h4 className="font-display text-[16px] font-600 text-white/88">{title}</h4>
            </div>
            <p className="text-[13.5px] text-white/35 leading-[1.7] font-light mb-5">{desc}</p>
            <div className="flex flex-wrap gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="flex flex-col">
                        <span className="text-[11px] text-white/25 uppercase tracking-wider">{m.label}</span>
                        <span className="text-lg font-display font-700 tracking-tight" style={{ color: accent }}>{m.value}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

/* ════════════════════════════════════════════════════════
   § 5 · FAQ ACCORDION
   ════════════════════════════════════════════════════════ */

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div variants={staggerChild}
            className="rounded-2xl border overflow-hidden transition-colors duration-300"
            style={{
                background: open ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.012)",
                borderColor: open ? "rgba(34,211,238,0.15)" : "rgba(255,255,255,0.05)",
            }}>
            <button onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left">
                <span className="font-display text-[15px] font-600 text-white/85">{q}</span>
                <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-white/30" />
                    </svg>
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                        <div className="px-7 pb-6 text-[14px] text-white/40 leading-[1.75] font-light">{a}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ════════════════════════════════════════════════════════
   THE PAGE
   ════════════════════════════════════════════════════════ */

export default function PredictiveAnalysisPage() {
    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Figtree:wght@300;400;500;600;700&display=swap');
                @keyframes textShimmer {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes pulseDot {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.4); }
                }
                @keyframes floatOrb {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(20px, -18px) scale(1.06); }
                    66% { transform: translate(-12px, 14px) scale(0.96); }
                }
                .font-display { font-family: 'Outfit', sans-serif; }
                .font-body { font-family: 'Figtree', sans-serif; }
            `}</style>

            <div className="font-body bg-[#06060A] text-white overflow-x-hidden">

                {/* ═══════════════════════════════════════════
                    SECTION 1 — PAGE HERO
                ═══════════════════════════════════════════ */}
                <section className="relative pt-36 pb-28 overflow-hidden">
                    {/* OPTIMIZED: CSS blurs removed, willChange added to prevent GPU exhaustion */}
                    <div className="absolute -top-28 left-[12%] w-[580px] h-[580px] pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(34,211,238,0.07) 0%, transparent 60%)",
                            animation: "floatOrb 18s ease-in-out infinite",
                            willChange: "transform",
                        }} />
                    <div className="absolute top-16 right-[8%] w-[440px] h-[440px] pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 60%)",
                            animation: "floatOrb 22s ease-in-out infinite 5s",
                            willChange: "transform",
                        }} />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse, rgba(168,85,247,0.04) 0%, transparent 65%)",
                            willChange: "transform",
                        }} />

                    {/* Grid */}
                    <div className="absolute inset-0 pointer-events-none" style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                        maskImage: "radial-gradient(ellipse 55% 50% at 50% 30%, black 10%, transparent 80%)",
                        WebkitMaskImage: "radial-gradient(ellipse 55% 50% at 50% 30%, black 10%, transparent 80%)",
                    }} />

                    {/* Noise */}
                    <div className="absolute inset-0 opacity-[0.018] pointer-events-none" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat", backgroundSize: "180px 180px",
                    }} />

                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                        <Reveal>
                            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm mb-10">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: "pulseDot 2.4s ease-in-out infinite" }} />
                                <span className="text-[11px] tracking-[0.24em] uppercase text-white/40 font-medium font-body">
                                    Asphalt AI · Predictive Analysis
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.12}>
                            <h1 className="font-display text-[clamp(36px,6.5vw,78px)] font-700 tracking-[-0.04em] leading-[1.04]">
                                <span className="text-white/95">Know what your customers</span>
                                <br />
                                <span className="text-white/95">will do </span>
                                <Glow>before they do it</Glow>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <p className="mt-8 text-lg md:text-xl text-white/40 max-w-[580px] mx-auto leading-relaxed font-light">
                                We monitor customer behavior through purpose-built ML models and deliver
                                actionable prediction reports — so you{" "}
                                <span className="text-white/75 font-medium">stop reacting and start anticipating</span>.
                            </p>
                        </Reveal>

                        <Reveal delay={0.38}>
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/book"
                                    className="group px-10 py-4 rounded-full bg-cyan-500 font-medium text-white text-sm tracking-wide flex items-center gap-2.5 transition-all duration-500 hover:bg-cyan-400 hover:shadow-[0_0_50px_rgba(34,211,238,0.2)]">
                                    See Your Predictions
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                                <Link href="#how-it-works"
                                    className="px-10 py-4 rounded-full border border-white/[0.08] text-white/60 font-medium text-sm tracking-wide hover:border-white/[0.16] hover:text-white transition-all duration-300">
                                    How It Works
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 2 — LIVE PREDICTION TICKER
                ═══════════════════════════════════════════ */}
                <section className="py-12">
                    <Reveal>
                        <p className="text-center text-[11px] tracking-[0.22em] uppercase text-white/20 font-medium mb-6">
                            Predictions generated in real time, 24/7
                        </p>
                    </Reveal>
                    <PredictionTicker />
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 3 — THE PROBLEM
                ═══════════════════════════════════════════ */}
                <section className="py-28 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <Reveal><Eyebrow>The problem</Eyebrow></Reveal>
                                <Reveal delay={0.08}>
                                    <h2 className="font-display text-[clamp(28px,4.5vw,50px)] font-700 tracking-[-0.03em] leading-[1.08] mt-5">
                                        <span className="text-white/95">You're making decisions </span>
                                        <Glow>in the dark</Glow>
                                    </h2>
                                </Reveal>
                                <Reveal delay={0.16}>
                                    <div className="mt-7 space-y-5 text-[16px] text-white/40 leading-[1.8] font-light">
                                        <p>
                                            Your customers are sending you signals every single day — clicks, purchases,
                                            support tickets, abandoned carts, feature usage patterns, login frequency.
                                            But unless you have a dedicated data science team, those signals just become
                                            rows in a database nobody reads.
                                        </p>
                                        <p>
                                            By the time you notice a customer is unhappy, they've already left. By the
                                            time you spot a revenue trend, the quarter's over. You're always reacting,
                                            never anticipating.{" "}
                                            <span className="text-white/70 font-medium">
                                                That gap between data and decision is where businesses lose money.
                                            </span>
                                        </p>
                                    </div>
                                </Reveal>
                            </div>

                            <StaggerGroup className="space-y-4">
                                {[
                                    { stat: "68%", desc: "of businesses say they can't act on customer data fast enough to prevent churn", color: "#f43f5e" },
                                    { stat: "$1.6T", desc: "lost annually by U.S. companies due to customers switching after poor experiences", color: "#f97316" },
                                    { stat: "5×", desc: "cheaper to retain an existing customer than acquire a new one — yet most can't predict who's leaving", color: "#eab308" },
                                ].map((item, i) => (
                                    <motion.div key={i} variants={staggerChild}
                                        className="flex gap-5 p-6 rounded-2xl border"
                                        style={{
                                            background: "linear-gradient(to right, rgba(255,255,255,0.02), transparent)",
                                            borderColor: "rgba(255,255,255,0.05)",
                                        }}>
                                        <span className="font-display text-3xl font-800 tracking-tight shrink-0" style={{ color: item.color }}>
                                            {item.stat}
                                        </span>
                                        <p className="text-sm text-white/40 leading-relaxed font-light pt-1">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </StaggerGroup>
                        </div>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 4 — NEURAL NETWORK ANIMATION
                ═══════════════════════════════════════════ */}
                <section id="how-it-works" className="py-28 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <Reveal><Eyebrow>Under the hood</Eyebrow></Reveal>
                        <Reveal delay={0.08}>
                            <h2 className="font-display text-[clamp(28px,5vw,54px)] font-700 tracking-[-0.03em] leading-[1.08] mt-5">
                                <span className="text-white/95">Raw data in. </span>
                                <Glow>Predictions out.</Glow>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mt-6 text-lg text-white/38 max-w-[580px] mx-auto leading-relaxed font-light">
                                Your customer data flows through four processing stages — from raw behavioral signals
                                to actionable, probability-scored predictions delivered straight to your dashboard.
                            </p>
                        </Reveal>
                    </div>
                    <div className="mt-16 px-6">
                        <NeuralNetwork />
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 5 — METRICS
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <Reveal>
                            <p className="text-center text-[11px] tracking-[0.22em] uppercase text-white/20 font-medium mb-14">
                                Results across our client base
                            </p>
                        </Reveal>
                        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { val: 94, suf: "%", label: "Prediction Accuracy", desc: "Average accuracy across churn, LTV, and intent models on live data.", color: "#22d3ee" },
                                { val: 31, suf: "%", label: "Less Churn", desc: "Average reduction in customer churn within 90 days of deployment.", color: "#34d399" },
                                { val: 2.7, suf: "×", label: "ROI Multiplier", desc: "Average return on investment in the first 6 months of usage.", color: "#a855f7", dec: 1 },
                                { val: 48, suf: "hrs", label: "Time Saved / Week", desc: "Hours saved in manual reporting and ad-hoc data analysis.", color: "#6366f1" },
                            ].map((s, i) => (
                                <motion.div key={i} variants={staggerChild}
                                    className="relative p-7 rounded-2xl border overflow-hidden"
                                    style={{
                                        background: "linear-gradient(to bottom, rgba(255,255,255,0.03), rgba(255,255,255,0.008))",
                                        borderColor: "rgba(255,255,255,0.05)",
                                    }}>
                                    <div className="absolute top-0 left-6 right-6 h-px"
                                        style={{ background: `linear-gradient(90deg, transparent, ${s.color}40, transparent)` }} />
                                    <div className="font-display text-[48px] font-800 tracking-[-0.04em] leading-none"
                                        style={{
                                            background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                            filter: `drop-shadow(0 0 20px ${s.color}30)`,
                                        }}>
                                        <Counter target={s.val} suffix={s.suf} decimals={s.dec || 0} />
                                    </div>
                                    <h3 className="font-display text-[16px] font-600 text-white/85 mt-3 mb-2">{s.label}</h3>
                                    <p className="text-[13px] text-white/35 leading-relaxed font-light">{s.desc}</p>
                                </motion.div>
                            ))}
                        </StaggerGroup>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 6 — HOW IT WORKS (4 steps)
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>The process</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(28px,4.5vw,48px)] font-700 tracking-[-0.03em] leading-[1.08] mt-5">
                                    <span className="text-white/95">From raw data to </span>
                                    <Glow>actionable foresight</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-[17px] text-white/38 max-w-lg mx-auto leading-relaxed font-light">
                                    Four stages. Fully automated. You connect once — we handle the rest, forever.
                                </p>
                            </Reveal>
                        </div>

                        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                {
                                    n: "01", title: "Connect Data Sources",
                                    desc: "We ingest behavioral data from your CRM, analytics, support tools, payment systems, and product databases — unified into a single customer timeline.",
                                    icon: <Layers size={20} strokeWidth={1.5} />,
                                },
                                {
                                    n: "02", title: "Train Custom Models",
                                    desc: "Our ML pipeline trains models specific to your business — churn prediction, LTV estimation, purchase intent, engagement scoring — calibrated on your actual customer data.",
                                    icon: <Brain size={20} strokeWidth={1.5} />,
                                },
                                {
                                    n: "03", title: "Generate Predictions",
                                    desc: "Models run continuously on live data, producing probability-scored predictions for every customer. Not batch — real-time. Updated with every new signal.",
                                    icon: <Sparkles size={20} strokeWidth={1.5} />,
                                },
                                {
                                    n: "04", title: "Deliver Reports",
                                    desc: "Predictions are synthesized into clear, visual reports delivered to your dashboard, Slack, or email — with recommended actions and confidence intervals.",
                                    icon: <FileBarChart size={20} strokeWidth={1.5} />,
                                },
                            ].map((step, i) => (
                                <motion.div key={i} variants={staggerChild}
                                    className="relative p-7 rounded-2xl border overflow-hidden"
                                    style={{
                                        background: "linear-gradient(to bottom, rgba(255,255,255,0.035), rgba(255,255,255,0.008))",
                                        borderColor: "rgba(255,255,255,0.06)",
                                    }}>
                                    <div className="absolute -top-4 -right-1 font-display text-[100px] font-800 leading-none pointer-events-none select-none"
                                        style={{ color: "rgba(255,255,255,0.015)" }}>
                                        {step.n}
                                    </div>
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                                        style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.18)", color: "#22d3ee" }}>
                                        {step.icon}
                                    </div>
                                    <h3 className="font-display text-lg font-600 text-white/90 mb-3 tracking-tight">{step.title}</h3>
                                    <p className="text-[14px] text-white/38 leading-[1.75] font-light">{step.desc}</p>
                                </motion.div>
                            ))}
                        </StaggerGroup>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 7 — DEEP EXPLAINER
                ═══════════════════════════════════════════ */}
                <section className="py-28 relative overflow-hidden">
                    {/* OPTIMIZED: Removed CSS blur on background element */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.03), transparent 60%)" }} />

                    <div className="max-w-3xl mx-auto px-6 relative z-10">
                        <Reveal>
                            <div className="p-10 md:p-14 rounded-3xl border relative overflow-hidden"
                                style={{
                                    background: "linear-gradient(to bottom, rgba(255,255,255,0.025), rgba(255,255,255,0.005))",
                                    borderColor: "rgba(255,255,255,0.06)",
                                }}>
                                <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
                                    style={{ background: "radial-gradient(circle at top left, rgba(34,211,238,0.08), transparent 70%)" }} />
                                <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
                                    style={{ background: "radial-gradient(circle at bottom right, rgba(99,102,241,0.05), transparent 70%)" }} />

                                <Eyebrow>Why Asphal AI</Eyebrow>
                                <h2 className="font-display text-[clamp(24px,3.5vw,36px)] font-700 tracking-[-0.025em] leading-[1.15] mt-5 mb-8">
                                    <span className="text-white/95">Prediction isn't a feature. </span>
                                    <Glow>It's our entire product.</Glow>
                                </h2>

                                <div className="space-y-6 text-[15.5px] text-white/42 leading-[1.85] font-light">
                                    <p>
                                        Most analytics tools tell you what happened. Dashboards full of historical
                                        charts, trailing KPIs, and lag indicators. By the time the data shows up
                                        in a report, the opportunity — or the problem — has already passed.
                                    </p>
                                    <p>
                                        <span className="text-white/80 font-medium">Asphal AI is different by design.</span>{" "}
                                        We don't build dashboards that look backward. We build ML models that look
                                        forward. Our system ingests every customer touchpoint — transactions, support
                                        interactions, product usage, engagement patterns, even external market signals
                                        — and continuously generates forward-looking predictions about what each
                                        customer is likely to do next.
                                    </p>
                                    <p>
                                        That means you know which customers are about to churn{" "}
                                        <span className="relative text-cyan-300 font-medium">
                                            30 to 90 days before they leave
                                            <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-cyan-400/40 via-cyan-400/20 to-transparent" />
                                        </span>.
                                        You know which leads have the highest conversion probability. You know what
                                        revenue looks like next month — not as a guess, but as a statistical forecast
                                        with confidence intervals.
                                    </p>
                                    <p>
                                        Every prediction comes with plain-English explanations — not just "this
                                        customer will churn" but <em>why</em> the model thinks so and <em>what</em>{" "}
                                        you should do about it. Data science, translated into business decisions.
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 8 — REPORTS YOU'LL RECEIVE
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>Deliverables</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(28px,4vw,46px)] font-700 tracking-[-0.025em] leading-[1.1] mt-5">
                                    <span className="text-white/95">Reports that </span>
                                    <Glow>drive decisions</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-[17px] text-white/38 max-w-lg mx-auto leading-relaxed font-light">
                                    Every report is designed for action — not decoration. Here's what lands in your dashboard.
                                </p>
                            </Reveal>
                        </div>

                        <StaggerGroup className="grid md:grid-cols-2 gap-5">
                            <ReportCard
                                title="Churn Risk Report"
                                desc="Every customer scored 0–100 on churn probability, updated daily. Includes top risk factors per customer and AI-recommended retention actions. Filter by segment, tier, or revenue impact."
                                metrics={[{ label: "Avg. Accuracy", value: "94.2%" }, { label: "Lead time", value: "45 days" }]}
                                accent="#f43f5e"
                            />
                            <ReportCard
                                title="Lifetime Value Forecast"
                                desc="12-month LTV projections for every customer and cohort. Identifies which segments are growing, which are plateauing, and which need re-engagement — with confidence bands."
                                metrics={[{ label: "Forecast window", value: "12 months" }, { label: "Deviation", value: "± 4.1%" }]}
                                accent="#34d399"
                            />
                            <ReportCard
                                title="Purchase Intent Scoring"
                                desc="Real-time propensity scores for every user based on behavioral signals. Know who's ready to buy, who's window-shopping, and who needs a nudge — before they decide."
                                metrics={[{ label: "Signals tracked", value: "140+" }, { label: "Refresh rate", value: "Real-time" }]}
                                accent="#22d3ee"
                            />
                            <ReportCard
                                title="Revenue Prediction"
                                desc="Weekly and monthly revenue forecasts with scenario modeling. See base case, best case, and worst case — plus which levers move the needle most."
                                metrics={[{ label: "Accuracy", value: "± 3.2%" }, { label: "Updated", value: "Weekly" }]}
                                accent="#a855f7"
                            />
                        </StaggerGroup>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 9 — FEATURE GRID
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>Capabilities</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(28px,4vw,44px)] font-700 tracking-[-0.025em] leading-[1.1] mt-5">
                                    <span className="text-white/95">Everything under the hood</span>
                                </h2>
                            </Reveal>
                        </div>

                        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { Icon: ScanSearch, title: "Behavioral Tracking", desc: "Every click, session, purchase, and support interaction mapped into a unified customer timeline." },
                                { Icon: Brain, title: "Custom ML Models", desc: "Models trained on your data — not generic benchmarks. Churn, LTV, intent, engagement, all calibrated to your business." },
                                { Icon: Gauge, title: "Real-Time Scoring", desc: "Predictions update continuously as new data arrives. Not daily batches — live, streaming inference." },
                                { Icon: AlertTriangle, title: "Anomaly Detection", desc: "Automatic alerts when customer behavior deviates from predicted patterns. Catch issues before they escalate." },
                                { Icon: UserCheck, title: "Cohort Analysis", desc: "Dynamic customer segments that evolve based on predicted behavior, not static demographics." },
                                { Icon: LineChart, title: "Trend Forecasting", desc: "Forward-looking trend lines for engagement, revenue, support volume, and any metric you care about." },
                                { Icon: Gauge, title: "Data Privacy", desc: "SOC 2 Type II compliant. Data encrypted at rest and in transit. GDPR-ready with built-in anonymization." },
                                { Icon: Gauge, title: "Model Retraining", desc: "Models automatically retrain on fresh data weekly. No drift, no staleness, no manual intervention." },
                            ].map((f, i) => (
                                <motion.div key={i} variants={staggerChild}
                                    className="group p-6 rounded-2xl border transition-all duration-500 hover:border-white/[0.12]"
                                    style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.04)" }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300
                                        group-hover:bg-cyan-500/15 group-hover:border-cyan-500/25"
                                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                                        <f.Icon size={18} strokeWidth={1.5} className="group-hover:text-cyan-400 transition-colors duration-300" />
                                    </div>
                                    <h4 className="font-display text-[15px] font-600 text-white/85 mb-2">{f.title}</h4>
                                    <p className="text-[13px] text-white/32 leading-[1.65] font-light">{f.desc}</p>
                                </motion.div>
                            ))}
                        </StaggerGroup>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 10 — COMPARISON TABLE
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <Reveal><Eyebrow>Comparison</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(28px,4vw,44px)] font-700 tracking-[-0.025em] leading-[1.1] mt-5">
                                    <span className="text-white/95">Guesswork vs. </span>
                                    <Glow>precision</Glow>
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.15}>
                            <ComparisonTable />
                        </Reveal>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 11 — USE CASES
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>Use cases</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(28px,4vw,44px)] font-700 tracking-[-0.025em] leading-[1.1] mt-5">
                                    <Glow>Predictions</Glow>
                                    <span className="text-white/95"> that move every team</span>
                                </h2>
                            </Reveal>
                        </div>

                        <StaggerGroup className="grid md:grid-cols-2 gap-5">
                            {[
                                {
                                    icon: <ShoppingCart size={18} strokeWidth={1.5} className="text-cyan-400/60" />,
                                    title: "E-Commerce & Retail",
                                    items: [
                                        "Predict which customers will purchase again within 30 days",
                                        "Identify cart abandoners most likely to convert with a discount",
                                        "Forecast inventory demand per SKU based on behavioral trends",
                                        "Score customers for upsell and cross-sell readiness",
                                    ],
                                },
                                {
                                    icon: <Users size={18} strokeWidth={1.5} className="text-cyan-400/60" />,
                                    title: "SaaS & Subscriptions",
                                    items: [
                                        "Detect churn risk 60 days before renewal with 94% accuracy",
                                        "Predict trial-to-paid conversion probability per user",
                                        "Identify power users likely to become advocates or referrers",
                                        "Forecast MRR growth with weekly confidence-banded projections",
                                    ],
                                },
                                {
                                    icon: <Megaphone size={18} strokeWidth={1.5} className="text-cyan-400/60" />,
                                    title: "Marketing & Growth",
                                    items: [
                                        "Score every lead's conversion probability before sales touches them",
                                        "Predict which channels will yield highest ROI next quarter",
                                        "Identify audience segments most responsive to specific campaigns",
                                        "Forecast email open rates and optimal send times per cohort",
                                    ],
                                },
                                {
                                    icon: <Wallet size={18} strokeWidth={1.5} className="text-cyan-400/60" />,
                                    title: "Finance & Revenue",
                                    items: [
                                        "Weekly revenue forecasts with ± 3% accuracy and scenario models",
                                        "Predict late payments and flag high-risk invoices before due dates",
                                        "Customer LTV projections for M&A due diligence and investor reporting",
                                        "Cash flow predictions incorporating seasonal and behavioral patterns",
                                    ],
                                },
                            ].map((uc, i) => (
                                <motion.div key={i} variants={staggerChild}
                                    className="p-8 rounded-2xl border"
                                    style={{
                                        background: "linear-gradient(to bottom, rgba(255,255,255,0.025), rgba(255,255,255,0.005))",
                                        borderColor: "rgba(255,255,255,0.05)",
                                    }}>
                                    <h3 className="font-display text-lg font-600 text-white/90 mb-5 tracking-tight flex items-center gap-2.5">
                                        {uc.icon}
                                        {uc.title}
                                    </h3>
                                    <ul className="space-y-3">
                                        {uc.items.map((item, j) => (
                                            <li key={j} className="flex gap-3 text-[14px] text-white/40 leading-relaxed font-light">
                                                <ChevronRight size={14} className="text-cyan-400/40 shrink-0 mt-1" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </StaggerGroup>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 12 — FAQ
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <Reveal><Eyebrow>Questions</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(28px,4vw,42px)] font-700 tracking-[-0.025em] leading-[1.1] mt-5 text-white/95">
                                    Frequently asked
                                </h2>
                            </Reveal>
                        </div>

                        <StaggerGroup className="space-y-3">
                            {[
                                {
                                    q: "How much data do you need to start making predictions?",
                                    a: "We can begin generating useful predictions with as little as 3 months of historical customer data and a few thousand records. The models improve continuously as more data flows in — but you don't need to wait for perfection to get value. Most clients see actionable insights within the first week.",
                                },
                                {
                                    q: "What data sources do you connect to?",
                                    a: "We connect to CRMs (HubSpot, Salesforce), analytics (Mixpanel, Amplitude, GA4), payment systems (Stripe, Braintree), support tools (Zendesk, Intercom), product databases, and any system with an API or data export. If you have data, we can ingest it.",
                                },
                                {
                                    q: "How accurate are the predictions?",
                                    a: "Across our client base, our churn models average 94% accuracy, LTV forecasts stay within ± 4% deviation, and purchase intent scores achieve 0.91 AUC. Every prediction comes with a confidence score so you know exactly how much weight to give it.",
                                },
                                {
                                    q: "Do I need a data science team to use this?",
                                    a: "No. That's the entire point. Asphal AI handles model training, feature engineering, inference, monitoring, and retraining — all automatically. You get reports and recommendations in plain language. If you do have a data team, they'll love the API access and model transparency.",
                                },
                                {
                                    q: "Is my customer data safe?",
                                    a: "SOC 2 Type II certified, end-to-end encryption, GDPR-compliant with built-in anonymization options. Your data is processed in isolated environments and never shared across clients. Self-hosted deployment available for enterprise clients.",
                                },
                                {
                                    q: "How long does setup take?",
                                    a: "Most clients are live within 48 hours. That includes data source connection, initial model training, and first prediction delivery. Complex enterprise deployments with custom model requirements typically take 1–2 weeks.",
                                },
                            ].map((faq, i) => (
                                <FAQItem key={i} q={faq.q} a={faq.a} />
                            ))}
                        </StaggerGroup>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 13 — FINAL CTA
                ═══════════════════════════════════════════ */}
                <section className="py-32 relative overflow-hidden">
                    {/* OPTIMIZED: Removed CSS blur on background element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(34,211,238,0.06), transparent 55%)" }} />

                    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                        <Reveal><Eyebrow>Get started</Eyebrow></Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="font-display text-[clamp(32px,5.5vw,58px)] font-700 tracking-[-0.035em] leading-[1.06] mt-6">
                                <span className="text-white/95">Stop guessing.</span>
                                <br />
                                <Glow>Start predicting.</Glow>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="mt-7 text-lg text-white/38 max-w-md mx-auto leading-relaxed font-light">
                                Your customers are already telling you what they'll do next.
                                Let Asphal AI translate those signals into revenue.
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/book"
                                    className="group px-12 py-4 rounded-full font-medium text-white text-sm tracking-wide flex items-center gap-2.5 transition-all duration-500 hover:shadow-[0_0_55px_rgba(34,211,238,0.2)]"
                                    style={{ background: "linear-gradient(135deg, #22d3ee, #6366f1)" }}>
                                    Book a Demo
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                                <Link href="/contact"
                                    className="px-12 py-4 rounded-full border font-medium text-sm tracking-wide hover:text-white transition-all duration-300"
                                    style={{ borderColor: "rgba(34,211,238,0.2)", color: "rgba(34,211,238,0.7)" }}>
                                    Talk to Sales
                                </Link>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-white/25">
                                {["Free pilot program", "Results in 48 hours", "No data science team needed"].map((t, i) => (
                                    <span key={i} className="flex items-center gap-1.5">
                                        <Check size={13} className="text-cyan-400/60" />
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>
            </div>
        </>
    );
}