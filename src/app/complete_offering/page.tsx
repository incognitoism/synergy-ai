"use client";

import Link from "next/link";
import {
    motion, useInView, useMotionValue, useSpring, AnimatePresence,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect, type MouseEvent } from "react";
import {
    ArrowRight, ArrowUpRight, Check, ChevronRight, ChevronDown,
    Brain, Workflow, BarChart3, Zap, Shield, Lock, Activity,
    BrainCircuit, Link2, Database, Target, TrendingUp, Users,
    RefreshCcw, Globe, Layers, Sparkles, Code2, Server,
    PieChart, LineChart, Cpu, Eye, AlertCircle, Clock,
    GitBranch, Network, Radar, ScanLine, BookOpen,
} from "lucide-react";

/* ════════════════════════════════════════
   SHARED PRIMITIVES
════════════════════════════════════════ */

function Reveal({ children, delay = 0, className = "", y = 30 }: {
    children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-55px" });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}>
            {children}
        </motion.div>
    );
}

const sc: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

function SG({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-45px" });
    return (
        <motion.div ref={ref} className={className}
            initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.085, delayChildren: 0.03 } } }}>
            {children}
        </motion.div>
    );
}

function Eyebrow({ children, color = "rgba(129,140,248,0.6)" }: { children: React.ReactNode; color?: string }) {
    return (
        <span className="inline-flex items-center gap-2.5 text-[10.5px] tracking-[0.3em] uppercase font-medium" style={{ color }}>
            <span className="w-5 h-px" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
            {children}
        </span>
    );
}

function Glow({ children }: { children: React.ReactNode }) {
    return (
        <span className="bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 50%, #f0abfc 100%)" }}>
            {children}
        </span>
    );
}

function Hr() {
    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.055) 30%, rgba(255,255,255,0.055) 70%, transparent)" }} />
        </div>
    );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [v, setV] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let f: number;
        const s = performance.now();
        const tick = (n: number) => {
            const t = Math.min((n - s) / 2200, 1);
            setV((1 - Math.pow(1 - t, 3.5)) * target);
            if (t < 1) f = requestAnimationFrame(tick);
        };
        f = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(f);
    }, [inView, target]);
    return <span ref={ref}>{Math.round(v)}{suffix}</span>;
}

function GlowCard({ children, className = "", rgb = "99,102,241", style = {} }: {
    children: React.ReactNode; className?: string; rgb?: string; style?: React.CSSProperties;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const mx = useMotionValue(0); const my = useMotionValue(0);
    const sx = useSpring(mx, { stiffness: 200, damping: 28 });
    const sy = useSpring(my, { stiffness: 200, damping: 28 });
    const [h, setH] = useState(false);
    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}
            onMouseMove={e => { const r = ref.current?.getBoundingClientRect(); if (r) { mx.set(e.clientX - r.left); my.set(e.clientY - r.top); } }}
            onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
            <motion.div className="pointer-events-none absolute inset-0"
                style={{ opacity: h ? 1 : 0, transition: "opacity 0.4s", background: `radial-gradient(340px circle at ${sx}px ${sy}px, rgba(${rgb},0.09), transparent 55%)` }} />
            <motion.div className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    opacity: h ? 1 : 0, transition: "opacity 0.4s", background: `radial-gradient(220px circle at ${sx}px ${sy}px, rgba(${rgb},0.22), transparent 50%)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "xor", WebkitMaskComposite: "xor", padding: "1px"
                }} />
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
                <motion.div className="h-full w-1/2"
                    style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.55), transparent)` }}
                    initial={{ x: "-120%" }} animate={h ? { x: "260%" } : { x: "-120%" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} />
            </div>
            {children}
        </div>
    );
}

/* ════════════════════════════════════════
   SVG ANIMATIONS
════════════════════════════════════════ */

/* — Neural network dots animation — */
function NeuralViz() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const nodes = [
        // Input layer
        { x: 12, y: 18, layer: 0 }, { x: 12, y: 36, layer: 0 }, { x: 12, y: 54, layer: 0 }, { x: 12, y: 72, layer: 0 },
        // Hidden 1
        { x: 35, y: 12, layer: 1 }, { x: 35, y: 28, layer: 1 }, { x: 35, y: 44, layer: 1 }, { x: 35, y: 60, layer: 1 }, { x: 35, y: 76, layer: 1 },
        // Hidden 2
        { x: 58, y: 20, layer: 2 }, { x: 58, y: 38, layer: 2 }, { x: 58, y: 56, layer: 2 }, { x: 58, y: 72, layer: 2 },
        // Output
        { x: 80, y: 30, layer: 3 }, { x: 80, y: 50, layer: 3 }, { x: 80, y: 68, layer: 3 },
    ];

    const connections = [
        // L0→L1
        ...[0, 1, 2, 3].flatMap(i => [4, 5, 6, 7, 8].map(j => ({ from: nodes[i], to: nodes[j] }))),
        // L1→L2
        ...[4, 5, 6, 7, 8].flatMap(i => [9, 10, 11, 12].map(j => ({ from: nodes[i], to: nodes[j] }))),
        // L2→L3
        ...[9, 10, 11, 12].flatMap(i => [13, 14, 15].map(j => ({ from: nodes[i], to: nodes[j] }))),
    ];

    return (
        <div ref={ref} className="relative w-full" style={{ aspectRatio: "16/8" }}>
            <svg viewBox="0 0 92 88" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <radialGradient id="ng0"><stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" /><stop offset="100%" stopColor="#6366f1" stopOpacity="0" /></radialGradient>
                    <filter id="nf"><feGaussianBlur stdDeviation="0.5" /></filter>
                </defs>
                {/* Connections */}
                {connections.map((c, i) => (
                    <motion.line key={i} x1={c.from.x} y1={c.from.y} x2={c.to.x} y2={c.to.y}
                        stroke="#6366f1" strokeOpacity="0.07" strokeWidth="0.3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                        transition={{ duration: 1.2, delay: i * 0.003 + 0.2 }} />
                ))}
                {/* Active pulses */}
                {inView && connections.slice(0, 12).map((c, i) => (
                    <motion.circle key={`p${i}`} r="0.8" fill="#818cf8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.8, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}>
                        <animateMotion dur={`${1.4 + i * 0.1}s`} repeatCount="indefinite"
                            path={`M ${c.from.x} ${c.from.y} L ${c.to.x} ${c.to.y}`} />
                    </motion.circle>
                ))}
                {/* Nodes */}
                {nodes.map((n, i) => (
                    <g key={i}>
                        <motion.circle cx={n.x} cy={n.y} r="2.8" fill="#0c0c18"
                            stroke={n.layer === 3 ? "#a78bfa" : "#6366f1"}
                            strokeWidth={n.layer === 3 ? "0.7" : "0.4"}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={inView ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: n.layer * 0.18 + i * 0.03 + 0.3, type: "spring", stiffness: 200 }} />
                        {inView && (
                            <motion.circle cx={n.x} cy={n.y} r="2.8"
                                fill="none" stroke={n.layer === 3 ? "#a78bfa40" : "#6366f140"}
                                strokeWidth="0.4"
                                animate={{ r: [2.8, 5, 2.8], opacity: [0.4, 0, 0.4] }}
                                transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }} />
                        )}
                    </g>
                ))}
                {/* Layer labels */}
                {[{ x: 12, label: "Input" }, { x: 35, label: "Hidden" }, { x: 58, label: "Hidden" }, { x: 80, label: "Output" }].map((l, i) => (
                    <motion.text key={i} x={l.x} y="85" textAnchor="middle" fill="rgba(255,255,255,0.2)"
                        fontSize="3.2" fontFamily="sans-serif"
                        initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: i * 0.15 + 1 }}>
                        {l.label}
                    </motion.text>
                ))}
            </svg>
        </div>
    );
}

/* — Data flow pipeline animation — */
function PipelineViz() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const stages = [
        { x: 8, label: "Raw Data", color: "#f59e0b" },
        { x: 28, label: "Cleanse", color: "#10b981" },
        { x: 48, label: "Transform", color: "#6366f1" },
        { x: 68, label: "Model", color: "#8b5cf6" },
        { x: 88, label: "Insight", color: "#ec4899" },
    ];

    return (
        <div ref={ref} className="relative w-full" style={{ aspectRatio: "20/7" }}>
            <svg viewBox="0 0 96 34" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                    {stages.map((s, i) => (
                        <linearGradient key={i} id={`pg${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={s.color} stopOpacity="0.8" />
                            <stop offset="100%" stopColor={stages[Math.min(i + 1, stages.length - 1)].color} stopOpacity="0.6" />
                        </linearGradient>
                    ))}
                    <filter id="pglow"><feGaussianBlur stdDeviation="0.6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>

                {/* Connecting pipes */}
                {stages.slice(0, -1).map((s, i) => (
                    <g key={i}>
                        <motion.line x1={s.x + 4.5} y1="17" x2={stages[i + 1].x - 4.5} y2="17"
                            stroke={`url(#pg${i})`} strokeWidth="2" strokeLinecap="round"
                            initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                            transition={{ duration: 0.6, delay: i * 0.15 + 0.5 }} />
                        {/* Flowing particles */}
                        {inView && (
                            <motion.circle r="1.2" fill={s.color} filter="url(#pglow)"
                                animate={{ opacity: [0, 1, 1, 0] }}
                                transition={{ duration: 1.5, delay: i * 0.15 + 0.8, repeat: Infinity, ease: "easeInOut" }}>
                                <animateMotion dur="1.4s" repeatCount="indefinite" begin={`${i * 0.3}s`}
                                    path={`M ${s.x + 4.5} 17 L ${stages[i + 1].x - 4.5} 17`} />
                            </motion.circle>
                        )}
                    </g>
                ))}

                {/* Stage nodes */}
                {stages.map((s, i) => (
                    <g key={i}>
                        <motion.circle cx={s.x} cy="17" r="4.5" fill="#0c0c18" stroke={s.color} strokeWidth="0.7"
                            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                            transition={{ type: "spring", stiffness: 220, delay: i * 0.15 + 0.3 }} />
                        {inView && (
                            <motion.circle cx={s.x} cy="17" r="4.5" fill="none" stroke={s.color} strokeOpacity="0.3"
                                animate={{ r: [4.5, 8, 4.5], opacity: [0.3, 0, 0.3] }}
                                transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }} />
                        )}
                        <motion.text x={s.x} y="28" textAnchor="middle" fill="rgba(255,255,255,0.35)"
                            fontSize="3" fontFamily="sans-serif"
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: i * 0.15 + 0.8 }}>
                            {s.label}
                        </motion.text>
                    </g>
                ))}
            </svg>
        </div>
    );
}

/* — Automation flow animation — */
function AutomationViz() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const nodes = [
        { x: 10, y: 25, label: "Trigger", icon: "⚡", color: "#f59e0b" },
        { x: 35, y: 15, label: "Filter", icon: "⊕", color: "#6366f1" },
        { x: 35, y: 40, label: "Transform", icon: "↺", color: "#8b5cf6" },
        { x: 60, y: 25, label: "n8n Core", icon: "⬡", color: "#ea4b71" },
        { x: 82, y: 12, label: "Slack", icon: "S", color: "#36C5F0" },
        { x: 82, y: 28, label: "CRM", icon: "C", color: "#FF7A59" },
        { x: 82, y: 44, label: "Notion", icon: "N", color: "#ffffff" },
    ];

    const edges = [
        [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [3, 6],
    ];

    return (
        <div ref={ref} className="relative w-full" style={{ aspectRatio: "20/7" }}>
            <svg viewBox="0 0 92 55" fill="none" className="absolute inset-0 w-full h-full">
                <defs>
                    <filter id="af"><feGaussianBlur stdDeviation="0.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                {edges.map(([fi, ti], i) => {
                    const f = nodes[fi]; const t = nodes[ti];
                    const path = `M ${f.x + 4} ${f.y} Q ${(f.x + t.x) / 2} ${f.y} ${t.x - 4} ${t.y}`;
                    return (
                        <g key={i}>
                            <motion.path d={path} stroke={f.color} strokeWidth="0.4" strokeOpacity="0.2" fill="none"
                                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                                transition={{ duration: 0.8, delay: i * 0.1 + 0.4 }} />
                            <motion.path d={path} stroke={f.color} strokeWidth="0.7" strokeOpacity="0.6" fill="none" filter="url(#af)"
                                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1, delay: i * 0.1 + 0.5 }} />
                            {inView && (
                                <circle r="1" fill={f.color} filter="url(#af)">
                                    <animateMotion dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.4}s`} path={path} />
                                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                            )}
                        </g>
                    );
                })}
                {nodes.map((n, i) => (
                    <g key={i}>
                        <motion.circle cx={n.x} cy={n.y} r="4.5" fill="#0b0b16" stroke={n.color} strokeWidth="0.6"
                            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                            transition={{ type: "spring", stiffness: 230, delay: i * 0.1 + 0.3 }} />
                        <motion.text x={n.x} y={n.y + 1.2} textAnchor="middle" dominantBaseline="middle"
                            fill={n.color} fontSize="3.5" fontFamily="sans-serif"
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: i * 0.1 + 0.7 }}>
                            {n.icon}
                        </motion.text>
                        <motion.text x={n.x} y={n.y + 8} textAnchor="middle" fill="rgba(255,255,255,0.3)"
                            fontSize="2.8" fontFamily="sans-serif"
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: i * 0.1 + 0.9 }}>
                            {n.label}
                        </motion.text>
                    </g>
                ))}
            </svg>
        </div>
    );
}

/* ════════════════════════════════════════
   SECTION COMPONENTS
════════════════════════════════════════ */

/* — Big stat card — */
function StatCard({ value, suffix, label, desc, color }: {
    value: number; suffix: string; label: string; desc: string; color: string;
}) {
    return (
        <motion.div variants={sc} className="relative p-7 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)" }}>
            <div className="absolute top-0 left-6 right-6 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }} />
            <div className="text-[46px] font-black leading-none tracking-tight mb-2"
                style={{ color }}>
                <Counter target={value} suffix={suffix} />
            </div>
            <div className="text-sm font-semibold text-white/80 mb-1.5">{label}</div>
            <div className="text-xs text-white/35 leading-relaxed">{desc}</div>
        </motion.div>
    );
}

/* — Feature row card — */
function FeatureRow({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
    return (
        <motion.div variants={sc} className="flex gap-4 p-5 rounded-xl group"
            style={{ background: "rgba(255,255,255,0.016)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-indigo-500/15 group-hover:border-indigo-500/25"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(165,180,252,0.7)" }}>
                <Icon size={16} strokeWidth={1.5} />
            </div>
            <div>
                <div className="text-sm font-semibold text-white/82 mb-1">{title}</div>
                <div className="text-xs text-white/38 leading-relaxed">{desc}</div>
            </div>
        </motion.div>
    );
}

/* — FAQ accordion — */
function FAQ({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div variants={sc} className="rounded-xl overflow-hidden transition-all duration-300 cursor-pointer"
            style={{
                background: open ? "rgba(99,102,241,0.05)" : "rgba(255,255,255,0.015)",
                border: open ? "1px solid rgba(99,102,241,0.18)" : "1px solid rgba(255,255,255,0.05)",
            }}
            onClick={() => setOpen(!open)}>
            <div className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="text-sm font-medium text-white/80">{q}</span>
                <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className="shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="rgba(129,140,248,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </motion.div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                        <p className="px-6 pb-5 text-sm text-white/40 leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ════════════════════════════════════════
   MAIN PAGE
════════════════════════════════════════ */

export default function ArchitecturePage() {
    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
                @keyframes shimText { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
                @keyframes floatOrb { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(18px,-22px) scale(1.04)} 70%{transform:translate(-12px,14px) scale(0.97)} }
                @keyframes pulseGlow { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.3)} }
                .font-head { font-family: 'Outfit', sans-serif; }
                .font-body { font-family: 'DM Sans', sans-serif; }
                .glow-text { background-size: 200% 100%; animation: shimText 5s ease-in-out infinite; }
            `}</style>

            <div className="font-body bg-[#060609] text-white overflow-x-hidden">

                {/* ══════════════════════════
                    HERO
                ══════════════════════════ */}
                <section className="relative pt-40 pb-32 overflow-hidden">
                    {/* Orbs */}
                    <div className="absolute -top-40 left-[10%] w-[700px] h-[700px] rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07), transparent 60%)", filter: "blur(90px)", animation: "floatOrb 18s ease-in-out infinite" }} />
                    <div className="absolute top-10 right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.05), transparent 60%)", filter: "blur(80px)", animation: "floatOrb 22s ease-in-out infinite 6s" }} />
                    {/* Grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.012]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 70% 55% at 50% 25%, black, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 25%, black, transparent 80%)" }} />

                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                        <Reveal>
                            <div className="inline-flex items-center gap-2.5 px-5 py-2 mb-10 rounded-full border border-white/[0.07] backdrop-blur-sm"
                                style={{ background: "rgba(255,255,255,0.02)" }}>
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ animation: "pulseGlow 2.4s ease-in-out infinite" }} />
                                <span className="text-[10.5px] tracking-[0.25em] uppercase text-white/40 font-medium font-head">
                                    Complete Service Architecture
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="font-head text-[clamp(40px,7vw,86px)] font-black tracking-[-0.045em] leading-[0.98]">
                                <span className="text-white/95">Everything we build,</span><br />
                                <span className="text-white/95"> & </span>
                                <span className="glow-text bg-clip-text text-transparent"
                                    style={{ backgroundImage: "linear-gradient(135deg, #a5b4fc, #c4b5fd, #f0abfc, #a5b4fc)" }}>
                                    everything we do.
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.22}>
                            <p className="mt-8 text-lg md:text-xl text-white/38 max-w-2xl mx-auto leading-relaxed font-light">
                                Three interconnected pillars — bespoke AI language models, intelligent workflow automation, and precision data analytics — engineered from scratch for your business.
                            </p>
                        </Reveal>

                        <Reveal delay={0.34}>
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/book"
                                    className="group px-10 py-4 rounded-full font-semibold text-white text-sm tracking-wide flex items-center gap-2.5 transition-all duration-400 hover:shadow-[0_0_50px_rgba(99,102,241,0.22)]"
                                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                                    Book a Strategy Call
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                                <a href="#llm"
                                    className="px-10 py-4 rounded-full border text-white/55 font-medium text-sm tracking-wide hover:border-white/[0.16] hover:text-white transition-all duration-300"
                                    style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                                    Explore Architecture ↓
                                </a>
                            </div>
                        </Reveal>

                        {/* Quick stats */}
                        <Reveal delay={0.46}>
                            <div className="mt-16 grid grid-cols-3 gap-4 max-w-xl mx-auto">
                                {[
                                    { val: "3", label: "Core Pillars" },
                                    { val: "200+", label: "Integrations" },
                                    { val: "48h", label: "To Go Live" },
                                ].map((s, i) => (
                                    <div key={i} className="py-4 rounded-xl text-center"
                                        style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                        <div className="font-head text-xl font-black text-white/90">{s.val}</div>
                                        <div className="text-[11px] text-white/30 mt-1 tracking-wide">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════════════
                    PILLAR NAV
                ══════════════════════════ */}
                <section className="py-16">
                    <div className="max-w-5xl mx-auto px-6">
                        <SG className="grid md:grid-cols-3 gap-4">
                            {[
                                { href: "#llm", icon: Brain, label: "01", title: "Bespoke AI LLMs", sub: "Custom language models trained on your data", color: "#6366f1" },
                                { href: "#automation", icon: Workflow, label: "02", title: "n8n Automation", sub: "Intelligent workflow orchestration", color: "#8b5cf6" },
                                { href: "#analytics", icon: BarChart3, label: "03", title: "Data & Analytics", sub: "Predictive intelligence for your customer base", color: "#a78bfa" },
                            ].map((p, i) => (
                                <motion.a key={i} variants={sc} href={p.href}
                                    className="group flex items-start gap-4 p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                                    style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                                        style={{ background: `rgba(99,102,241,0.1)`, border: `1px solid rgba(99,102,241,0.2)`, color: p.color }}>
                                        <p.icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[10px] tracking-[0.2em] uppercase font-medium mb-1" style={{ color: `${p.color}80` }}>{p.label}</div>
                                        <div className="font-head text-base font-700 text-white/88 mb-0.5 group-hover:text-white transition-colors">{p.title}</div>
                                        <div className="text-xs text-white/35">{p.sub}</div>
                                    </div>
                                    <ArrowUpRight size={14} className="shrink-0 text-white/20 group-hover:text-indigo-400 transition-colors mt-1" />
                                </motion.a>
                            ))}
                        </SG>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════════════
                    PILLAR 1 — LLM
                ══════════════════════════ */}
                <section id="llm" className="py-32 relative overflow-hidden">
                    <div className="absolute top-1/3 left-0 w-[500px] h-[500px] pointer-events-none"
                        style={{ background: "radial-gradient(circle at left, rgba(99,102,241,0.06), transparent 65%)", filter: "blur(80px)" }} />

                    <div className="relative z-10 max-w-6xl mx-auto px-6">

                        {/* Header */}
                        <div className="max-w-3xl mb-20">
                            <Reveal><Eyebrow>Pillar 01</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(32px,5vw,58px)] font-black tracking-[-0.04em] leading-[1.04] mt-5">
                                    <Glow>Bespoke AI</Glow>
                                    <span className="text-white/92"> Language Models</span>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-lg text-white/40 leading-relaxed max-w-2xl">
                                    Your business has a language — proprietary terminology, internal processes, customer patterns, brand voice. Generic AI doesn't speak it. We build language models that do.
                                </p>
                            </Reveal>
                        </div>

                        {/* Split layout */}
                        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start mb-20">
                            {/* Left — long-form explainer */}
                            <div className="space-y-6 text-[15.5px] text-white/42 leading-[1.85] font-light">
                                <Reveal>
                                    <p>
                                        A fine-tuned large language model isn't just a chatbot with your logo on it. It's a knowledge system
                                        trained on your SOPs, your customer interaction history, your internal documentation, your product
                                        catalogue, and the specific vocabulary your team and customers use every day.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.07}>
                                    <p>
                                        <span className="text-white/80 font-medium">We start with a foundation model</span> — typically
                                        GPT-4, Claude, or an open-source variant — and layer your proprietary data on top via RAG
                                        (Retrieval-Augmented Generation) and fine-tuning. The result is a model that answers questions
                                        about <em>your</em> products, routes <em>your</em> specific support queries, and generates content
                                        in <em>your</em> brand voice.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.14}>
                                    <p>
                                        Deployment is entirely flexible — embedded into your website as a customer-facing assistant,
                                        plugged into Slack as an internal knowledge tool, integrated into your CRM to surface
                                        contextual recommendations, or exposed via a private API for your engineering team to build on.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.21}>
                                    <p>
                                        Every model includes a continuous improvement loop. We monitor response quality, track where
                                        the model falls short, and retrain on new data regularly. Your AI gets smarter as your business
                                        evolves — not stale the moment it's deployed.
                                    </p>
                                </Reveal>
                            </div>

                            {/* Right — neural viz + capability grid */}
                            <div>
                                <Reveal>
                                    <GlowCard className="rounded-2xl p-6 mb-5"
                                        style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                        <p className="text-[10px] tracking-[0.22em] uppercase text-white/25 mb-4 font-medium">Live model topology</p>
                                        <NeuralViz />
                                    </GlowCard>
                                </Reveal>
                            </div>
                        </div>

                        {/* Stats row */}
                        <SG className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                            <StatCard value={40} suffix="%" label="Support Cost Reduction" desc="Average across deployed enterprise assistants" color="#6366f1" />
                            <StatCard value={15} suffix="min" label="To First Response" desc="From raw data to live model response" color="#8b5cf6" />
                            <StatCard value={94} suffix="%" label="Query Resolution Rate" desc="Without escalation to human agents" color="#a78bfa" />
                            <StatCard value={3} suffix="×" label="Faster Onboarding" desc="New staff trained by the AI knowledge base" color="#c4b5fd" />
                        </SG>

                        {/* Feature grid */}
                        <Reveal delay={0.1}>
                            <h3 className="font-head text-2xl font-700 text-white/85 mb-6 tracking-tight">What's included</h3>
                        </Reveal>
                        <SG className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
                            {[
                                { icon: BrainCircuit, title: "RAG Architecture", desc: "Retrieval-augmented generation connecting your live documents, databases, and knowledge bases in real time." },
                                { icon: BookOpen, title: "Fine-Tuning Pipeline", desc: "Custom training runs on your proprietary data with iterative evaluation, benchmarking, and quality gates." },
                                { icon: Globe, title: "Multi-Channel Deployment", desc: "Web widget, Slack bot, WhatsApp integration, REST API, or embedded directly in your existing product." },
                                { icon: Shield, title: "Private & Secure", desc: "Your data never trains public models. End-to-end encryption, optional on-premise deployment, full data sovereignty." },
                                { icon: RefreshCcw, title: "Continuous Retraining", desc: "Automated pipelines ingest new data, evaluate drift, and trigger retraining to keep the model current." },
                                { icon: Activity, title: "Response Monitoring", desc: "Real-time dashboards tracking accuracy, hallucination rate, latency, and user satisfaction per query type." },
                                { icon: Users, title: "Multi-Role Access", desc: "Different model configurations for different audiences — customer-facing, internal team, executive summaries." },
                                { icon: Code2, title: "Developer API", desc: "Clean REST and streaming APIs with full documentation, SDKs, and sandbox environments for your team." },
                                { icon: Lock, title: "RBAC & Audit Logs", desc: "Role-based access control, full audit trail of every query, response, and model update. SOC 2 aligned." },
                            ].map((f, i) => <FeatureRow key={i} icon={f.icon} title={f.title} desc={f.desc} />)}
                        </SG>

                        {/* Use cases */}
                        <Reveal>
                            <h3 className="font-head text-2xl font-700 text-white/85 mb-6 tracking-tight">Common deployments</h3>
                        </Reveal>
                        <SG className="grid md:grid-cols-2 gap-4 mb-14">
                            {[
                                { title: "Customer Support Assistant", items: ["Handle 70% of tier-1 queries without human intervention", "Escalate to agents with full context pre-loaded", "Learn from resolved tickets to improve over time", "Available 24/7 across web, mobile, and messaging"] },
                                { title: "Internal Knowledge Engine", items: ["Answer staff questions about policies, processes, and products", "Onboard new hires with an always-accurate AI guide", "Surface relevant documents from your entire knowledge base", "Integrate with Slack, Teams, or your intranet"] },
                                { title: "Sales Intelligence Layer", items: ["Generate personalised outreach based on prospect research", "Summarise CRM history before every sales call", "Recommend upsell/cross-sell based on account patterns", "Draft proposals and responses in your brand voice"] },
                                { title: "Content & Marketing AI", items: ["Generate on-brand content at scale from simple briefs", "Repurpose long-form content into multiple formats", "Maintain brand voice consistency across all channels", "SEO-aware output with keyword and intent alignment"] },
                            ].map((uc, i) => (
                                <motion.div key={i} variants={sc} className="p-7 rounded-2xl"
                                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div className="flex items-center gap-2.5 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" style={{ animation: "pulseGlow 2.5s ease-in-out infinite" }} />
                                        <h4 className="font-head text-base font-700 text-white/85 tracking-tight">{uc.title}</h4>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {uc.items.map((item, j) => (
                                            <li key={j} className="flex gap-2.5 text-[13.5px] text-white/38 font-light">
                                                <ChevronRight size={13} className="text-indigo-400/40 shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </SG>

                        {/* CTA */}
                        <Reveal>
                            <div className="flex items-center gap-4">
                                <Link href="Asphalt"
                                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]"
                                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                                    Explore AI LLM Services
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                                </Link>
                                <Link href="/book" className="text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                                    Book a demo <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════════════
                    PILLAR 2 — AUTOMATION
                ══════════════════════════ */}
                <section id="automation" className="py-32 relative overflow-hidden">
                    <div className="absolute top-1/3 right-0 w-[500px] h-[500px] pointer-events-none"
                        style={{ background: "radial-gradient(circle at right, rgba(139,92,246,0.06), transparent 65%)", filter: "blur(80px)" }} />

                    <div className="relative z-10 max-w-6xl mx-auto px-6">

                        <div className="max-w-3xl mb-20">
                            <Reveal><Eyebrow>Pillar 02</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(32px,5vw,58px)] font-black tracking-[-0.04em] leading-[1.04] mt-5">
                                    <span className="text-white/92">Intelligent Workflow</span><br />
                                    <Glow>Automation via n8n</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-lg text-white/40 leading-relaxed max-w-2xl">
                                    Manual processes are silent tax on your business. Every copy-paste, every status update email, every spreadsheet refresh is time your team isn't spending on work that matters. We eliminate that.
                                </p>
                            </Reveal>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start mb-20">
                            <div className="space-y-6 text-[15.5px] text-white/42 leading-[1.85] font-light">
                                <Reveal>
                                    <p>
                                        n8n is the most powerful open-source workflow automation platform available — 200+ integrations,
                                        conditional logic, webhooks, code execution nodes, sub-workflows, and full self-hosting capability.
                                        But raw power without someone who knows how to wield it means months of trial and error.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.07}>
                                    <p>
                                        <span className="text-white/80 font-medium">We do the engineering for you.</span> We sit down
                                        with your team, map every manual process in your business, identify the highest-leverage automation
                                        opportunities, and build production-ready workflows that integrate with your exact stack — not
                                        generic templates you'd need to reshape.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.14}>
                                    <p>
                                        Every automation we build includes error handling, retry logic, monitoring dashboards, and
                                        alerting. Workflows don't just run — they run reliably. When something breaks (and with complex
                                        systems, something occasionally will), you get a clear notification with a plain-English
                                        explanation and an immediate fix, not a silent failure.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.21}>
                                    <p>
                                        For businesses ready to move beyond simple if-this-then-that logic, we layer AI decision nodes
                                        into the workflows — sentiment analysis that routes support tickets, lead scoring that triggers
                                        different follow-up sequences, document classification that tags and files automatically. The
                                        automation thinks, not just executes.
                                    </p>
                                </Reveal>
                            </div>

                            <div>
                                <Reveal>
                                    <GlowCard className="rounded-2xl p-6 mb-5"
                                        style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                        <p className="text-[10px] tracking-[0.22em] uppercase text-white/25 mb-4 font-medium">Workflow execution map</p>
                                        <AutomationViz />
                                    </GlowCard>
                                </Reveal>
                                {/* Integration logos */}
                                <Reveal delay={0.1}>
                                    <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.016)", border: "1px solid rgba(255,255,255,0.04)" }}>
                                        <p className="text-[10px] tracking-[0.22em] uppercase text-white/25 mb-4 font-medium">Connected tools</p>
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                { name: "n8n", bg: "#EA4B71" },
                                                { name: "Slack", bg: "#36C5F0" },
                                                { name: "HubSpot", bg: "#FF7A59" },
                                                { name: "Notion", bg: "#ffffff" },
                                                { name: "Stripe", bg: "#635BFF" },
                                                { name: "Gmail", bg: "#EA4335" },
                                                { name: "Sheets", bg: "#34A853" },
                                                { name: "Zapier", bg: "#FF4A00" },
                                            ].map((t, i) => (
                                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                                                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}>
                                                    <div className="w-2 h-2 rounded-full" style={{ background: t.bg }} />
                                                    {t.name}
                                                </div>
                                            ))}
                                            <div className="flex items-center px-3 py-1.5 rounded-lg text-xs"
                                                style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", color: "rgba(165,180,252,0.7)" }}>
                                                +192 more
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            </div>
                        </div>

                        <SG className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                            <StatCard value={73} suffix="%" label="Less Manual Work" desc="Average time saved across automation clients" color="#8b5cf6" />
                            <StatCard value={200} suffix="+" label="Pre-Built Connectors" desc="Tools plugged in with zero API configuration" color="#a78bfa" />
                            <StatCard value={99} suffix="%" label="Workflow Uptime" desc="Self-healing with auto-retry and failover" color="#7c3aed" />
                            <StatCard value={48} suffix="h" label="First Automation Live" desc="From discovery call to production deployment" color="#6d28d9" />
                        </SG>

                        <Reveal>
                            <h3 className="font-head text-2xl font-700 text-white/85 mb-6 tracking-tight">Automation capabilities</h3>
                        </Reveal>
                        <SG className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
                            {[
                                { icon: Zap, title: "AI-Powered Decision Nodes", desc: "Embed Claude, GPT-4, or custom models as logic steps — classify, summarise, score, or generate content mid-workflow." },
                                { icon: Link2, title: "200+ OAuth Connectors", desc: "Pre-authenticated connections to every major SaaS tool — no API keys, no developer setup, no maintenance burden." },
                                { icon: GitBranch, title: "Complex Branching Logic", desc: "Multi-path conditional routing, parallel execution, merge nodes, and loops — as complex as your business requires." },
                                { icon: AlertCircle, title: "Error Handling & Retry", desc: "Every workflow has built-in fallbacks, auto-retry with exponential backoff, and dead-letter queues for failed payloads." },
                                { icon: Activity, title: "Real-Time Monitoring", desc: "Execution logs, success rates, processing time, error breakdown — full observability across every workflow." },
                                { icon: Clock, title: "Scheduled & Event-Driven", desc: "Cron schedules, webhook triggers, email listeners, Slack commands, form submissions — any trigger, any cadence." },
                                { icon: Server, title: "Self-Hosted Option", desc: "Deploy n8n on your own infrastructure for complete data sovereignty. We handle provisioning, hardening, and maintenance." },
                                { icon: RefreshCcw, title: "Version Control", desc: "Full workflow versioning with rollback capability. Every change is tracked, auditable, and reversible." },
                                { icon: Network, title: "Sub-Workflow Architecture", desc: "Modular, reusable workflow components — build once, call from anywhere. No duplication, easy maintenance." },
                            ].map((f, i) => <FeatureRow key={i} icon={f.icon} title={f.title} desc={f.desc} />)}
                        </SG>

                        <Reveal>
                            <h3 className="font-head text-2xl font-700 text-white/85 mb-6 tracking-tight">What we automate</h3>
                        </Reveal>
                        <SG className="grid md:grid-cols-2 gap-4 mb-14">
                            {[
                                { title: "Sales Pipeline Automation", items: ["Lead enrichment from form to CRM in under 2 seconds", "AI-powered lead scoring and routing to the right rep", "Automated follow-up sequences triggered by deal stage", "Contract generation and e-sign flow from CRM data"] },
                                { title: "Finance & Operations", items: ["Invoice sync across Stripe, QuickBooks, and Google Sheets", "Automatic P&L snapshots pushed to Slack every Monday", "Vendor renewal alerts at 30/60/90 day intervals", "Payment reconciliation with anomaly detection and alerts"] },
                                { title: "Customer Support", items: ["Ticket triage by sentiment, urgency, and topic", "Automatic knowledge base updates from resolved tickets", "SLA breach alerts with escalation logic", "CSAT survey dispatch and response aggregation"] },
                                { title: "Marketing & Content", items: ["Multi-channel content distribution on publish", "Lead sync from all forms to email platform and CRM", "UTM tracking end-to-end with ROI reporting to Sheets", "AI-powered content repurposing across formats"] },
                            ].map((uc, i) => (
                                <motion.div key={i} variants={sc} className="p-7 rounded-2xl"
                                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div className="flex items-center gap-2.5 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" style={{ animation: "pulseGlow 2.5s ease-in-out infinite" }} />
                                        <h4 className="font-head text-base font-700 text-white/85 tracking-tight">{uc.title}</h4>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {uc.items.map((item, j) => (
                                            <li key={j} className="flex gap-2.5 text-[13.5px] text-white/38 font-light">
                                                <ChevronRight size={13} className="text-purple-400/40 shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </SG>

                        <Reveal>
                            <div className="flex items-center gap-4">
                                <Link href="/automation"
                                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.18)]"
                                    style={{ background: "linear-gradient(135deg, #6d28d9, #8b5cf6)" }}>
                                    Explore Automation Services
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                                </Link>
                                <Link href="/book" className="text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                                    See a live demo <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════════════
                    PILLAR 3 — ANALYTICS
                ══════════════════════════ */}
                <section id="analytics" className="py-32 relative overflow-hidden">
                    <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.05), transparent 65%)", filter: "blur(80px)" }} />

                    <div className="relative z-10 max-w-6xl mx-auto px-6">

                        <div className="max-w-3xl mb-20">
                            <Reveal><Eyebrow>Pillar 03</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(32px,5vw,58px)] font-black tracking-[-0.04em] leading-[1.04] mt-5">
                                    <span className="text-white/92">Custom Analytics &amp;</span><br />
                                    <Glow>Predictive Intelligence</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-lg text-white/40 leading-relaxed max-w-2xl">
                                    Most businesses drown in data but starve for insight. We build prediction engines and analytics infrastructure that turn your customer and operational data into forward-looking intelligence.
                                </p>
                            </Reveal>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start mb-20">
                            <div className="space-y-6 text-[15.5px] text-white/42 leading-[1.85] font-light">
                                <Reveal>
                                    <p>
                                        There's a significant difference between reporting and intelligence. Reporting tells you what happened.
                                        Intelligence tells you what will happen — and what to do about it. We build the latter.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.07}>
                                    <p>
                                        Our analytics engagements start with a data audit — understanding what you're collecting, where it
                                        lives, how clean it is, and what questions you actually need answered. We then architect the
                                        pipeline: ingestion from your existing sources (CRM, payment processor, product analytics, support
                                        tool), transformation and storage in a cloud data warehouse, and a model layer that runs
                                        predictions on the unified dataset.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.14}>
                                    <p>
                                        <span className="text-white/80 font-medium">Prediction models we commonly build:</span> churn
                                        propensity (who is likely to leave in the next 30 days), lifetime value forecasting (expected
                                        revenue per customer segment), demand forecasting (inventory and capacity planning), anomaly
                                        detection (fraud, error, or unusual patterns in real time), and next-best-action models
                                        (what to offer each customer at each stage of the journey).
                                    </p>
                                </Reveal>
                                <Reveal delay={0.21}>
                                    <p>
                                        The output isn't a static report — it's a live dashboard your team can actually use, connected
                                        to alerting that fires when a prediction threshold is crossed, and integrated with your
                                        automation workflows so the business responds automatically, not just observes.
                                    </p>
                                </Reveal>
                            </div>

                            <div>
                                <Reveal>
                                    <GlowCard className="rounded-2xl p-6 mb-5"
                                        style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                        <p className="text-[10px] tracking-[0.22em] uppercase text-white/25 mb-4 font-medium">Data pipeline architecture</p>
                                        <PipelineViz />
                                    </GlowCard>
                                </Reveal>

                                {/* Mock metrics dashboard */}
                                <Reveal delay={0.1}>
                                    <GlowCard className="rounded-2xl p-5"
                                        style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                        <p className="text-[10px] tracking-[0.22em] uppercase text-white/25 mb-4 font-medium">Prediction outputs</p>
                                        <div className="space-y-3">
                                            {[
                                                { label: "Churn Risk — Next 30d", value: "12 customers", pct: 32, color: "#f59e0b" },
                                                { label: "Predicted LTV — Top Segment", value: "$4,200", pct: 78, color: "#10b981" },
                                                { label: "Demand Forecast Accuracy", value: "91.4%", pct: 91, color: "#6366f1" },
                                                { label: "Anomaly Detection Rate", value: "99.8%", pct: 99, color: "#8b5cf6" },
                                            ].map((m, i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="flex-1">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-[11px] text-white/45">{m.label}</span>
                                                            <span className="text-[11px] font-medium" style={{ color: m.color }}>{m.value}</span>
                                                        </div>
                                                        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                                                            <motion.div className="h-full rounded-full"
                                                                style={{ background: m.color }}
                                                                initial={{ width: 0 }}
                                                                whileInView={{ width: `${m.pct}%` }}
                                                                viewport={{ once: true }}
                                                                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </GlowCard>
                                </Reveal>
                            </div>
                        </div>

                        <SG className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                            <StatCard value={91} suffix="%" label="Forecast Accuracy" desc="Average across demand and churn prediction models" color="#a78bfa" />
                            <StatCard value={3} suffix="×" label="Faster Decisions" desc="With live dashboards vs. weekly spreadsheet reviews" color="#8b5cf6" />
                            <StatCard value={22} suffix="%" label="Revenue Uplift" desc="From proactive churn intervention on flagged accounts" color="#7c3aed" />
                            <StatCard value={100} suffix="%" label="Real-Time Pipelines" desc="All models update continuously, not in nightly batches" color="#6d28d9" />
                        </SG>

                        <Reveal>
                            <h3 className="font-head text-2xl font-700 text-white/85 mb-6 tracking-tight">Analytics capabilities</h3>
                        </Reveal>
                        <SG className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
                            {[
                                { icon: Database, title: "Data Warehouse Architecture", desc: "BigQuery, Snowflake, or Redshift — we design, build, and maintain your cloud data warehouse from raw ingestion to clean schema." },
                                { icon: TrendingUp, title: "Churn Prediction Models", desc: "ML models scoring every customer's 30/60/90-day churn probability, with SHAP explanations of the driving factors." },
                                { icon: PieChart, title: "LTV Forecasting", desc: "Segment-level and individual-level lifetime value predictions, updated in real time as behaviour changes." },
                                { icon: LineChart, title: "Demand Forecasting", desc: "Time-series models for inventory, staffing, and capacity planning — with confidence intervals and scenario analysis." },
                                { icon: ScanLine, title: "Anomaly Detection", desc: "Real-time monitoring of key metrics with statistical anomaly detection and instant alerting on meaningful deviations." },
                                { icon: Radar, title: "Customer Segmentation", desc: "Unsupervised clustering models that discover your true customer segments — not the ones you assumed existed." },
                                { icon: Target, title: "Next-Best-Action", desc: "Contextual recommendation models that surface the right offer, content, or action for each customer at each moment." },
                                { icon: Eye, title: "Executive Dashboards", desc: "Real-time Looker, Metabase, or custom dashboards built for the decision-makers who need clarity, not complexity." },
                                { icon: Layers, title: "Cross-Source Data Unification", desc: "Stitch together CRM, product, support, finance, and marketing data into a single, consistent analytical layer." },
                            ].map((f, i) => <FeatureRow key={i} icon={f.icon} title={f.title} desc={f.desc} />)}
                        </SG>

                        <Reveal>
                            <h3 className="font-head text-2xl font-700 text-white/85 mb-6 tracking-tight">Analytics by use case</h3>
                        </Reveal>
                        <SG className="grid md:grid-cols-2 gap-4 mb-14">
                            {[
                                { title: "Customer Retention Intelligence", items: ["Flag at-risk accounts 30 days before likely churn", "Surface reasons for risk using feature attribution", "Trigger automated retention workflows via n8n", "Track intervention success rate and revenue saved"] },
                                { title: "Revenue Forecasting", items: ["Pipeline-to-close probability by deal and segment", "MRR/ARR forecasting with confidence intervals", "Scenario planning for product and pricing changes", "Weekly forecast vs. actuals with automatic recalibration"] },
                                { title: "Product & Behavioural Analytics", items: ["Feature adoption funnels with drop-off attribution", "Session replay integration with quantitative models", "Cohort analysis across acquisition, activation, retention", "A/B test design with statistical power calculations"] },
                                { title: "Operational Intelligence", items: ["Real-time margin tracking by product and channel", "Capacity utilisation forecasting for operations teams", "Supply chain anomaly detection with alert routing", "Cross-department KPI consolidation in one dashboard"] },
                            ].map((uc, i) => (
                                <motion.div key={i} variants={sc} className="p-7 rounded-2xl"
                                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                    <div className="flex items-center gap-2.5 mb-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400" style={{ animation: "pulseGlow 2.5s ease-in-out infinite" }} />
                                        <h4 className="font-head text-base font-700 text-white/85 tracking-tight">{uc.title}</h4>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {uc.items.map((item, j) => (
                                            <li key={j} className="flex gap-2.5 text-[13.5px] text-white/38 font-light">
                                                <ChevronRight size={13} className="text-violet-400/40 shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </SG>

                        <Reveal>
                            <div className="flex items-center gap-4">
                                <Link href="/insights"
                                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_40px_rgba(167,139,250,0.18)]"
                                    style={{ background: "linear-gradient(135deg, #5b21b6, #8b5cf6)" }}>
                                    Explore Analytics Services
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                                </Link>
                                <Link href="/book" className="text-sm text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                                    Get a data audit <ArrowUpRight size={13} />
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════════════
                    HOW WE WORK
                ══════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>Engagement model</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(28px,4.5vw,50px)] font-black tracking-[-0.04em] leading-[1.06] mt-5">
                                    <span className="text-white/92">How we work with you</span>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-lg text-white/38 max-w-xl mx-auto leading-relaxed">
                                    A structured, low-friction process from first conversation to live production system.
                                </p>
                            </Reveal>
                        </div>

                        <SG className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { n: "01", icon: Users, title: "Discovery Call", desc: "30-minute strategy session. We map your current stack, identify the highest-leverage opportunities, and scope a realistic roadmap.", time: "Day 0" },
                                { n: "02", icon: BookOpen, title: "Architecture Proposal", desc: "Detailed technical proposal with system design, integration map, data flow diagram, timeline, and fixed-price quote.", time: "Day 3–5" },
                                { n: "03", icon: Code2, title: "Build & Integrate", desc: "We build in sprints with weekly check-ins. You see progress every 7 days, not just at the end.", time: "Week 2–6" },
                                { n: "04", icon: Activity, title: "Deploy & Optimise", desc: "Go-live with full monitoring, documentation handover, and a 90-day optimisation period included in every engagement.", time: "Week 6+" },
                            ].map((step, i) => (
                                <motion.div key={i} variants={sc} className="relative p-7 rounded-2xl overflow-hidden"
                                    style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <div className="absolute -top-3 -right-2 font-head text-[88px] font-900 leading-none pointer-events-none select-none"
                                        style={{ color: "rgba(255,255,255,0.018)" }}>{step.n}</div>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.18)", color: "#818cf8" }}>
                                        <step.icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2" style={{ color: "rgba(99,102,241,0.5)" }}>{step.time}</div>
                                    <h3 className="font-head text-base font-700 text-white/88 mb-2">{step.title}</h3>
                                    <p className="text-sm text-white/38 leading-relaxed">{step.desc}</p>
                                </motion.div>
                            ))}
                        </SG>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════════════
                    FAQ
                ══════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <Reveal><Eyebrow>Questions</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(28px,4vw,44px)] font-black tracking-[-0.035em] leading-[1.08] mt-5 text-white/92">
                                    Frequently asked
                                </h2>
                            </Reveal>
                        </div>
                        <SG className="space-y-3">
                            {[
                                { q: "Can I just get one pillar, or do I need all three?", a: "Absolutely. Each pillar is a standalone engagement. Most clients start with the one that addresses their most immediate pain point — typically automation — and add analytics or LLM capabilities as they grow. We design every system to integrate cleanly with the others if you choose to expand." },
                                { q: "How long does a typical engagement take?", a: "A focused automation project is typically live in 2–4 weeks. An LLM deployment including fine-tuning and integration takes 4–8 weeks. A full analytics stack from data warehouse to prediction models is typically 6–12 weeks depending on data complexity. All timelines include deployment and 90 days of post-launch optimisation." },
                                { q: "Do you work with businesses that have no existing technical infrastructure?", a: "Yes. A significant portion of our clients start with spreadsheets, a basic CRM, and disconnected SaaS tools. We build the infrastructure from scratch — selecting appropriate tools, provisioning cloud resources, and handling all technical setup so you don't need an internal engineering team." },
                                { q: "Who owns the models and workflows we build?", a: "You do. Everything we build — the n8n workflows, the trained models, the dashboards, the data pipelines — belongs entirely to you. There's no vendor lock-in, no dependency on our platform, and no recurring usage fees to us. You can take everything we build and run it independently." },
                                { q: "Is my data secure during the LLM training process?", a: "We treat data security as a hard requirement, not an option. Your data never touches third-party training infrastructure. Fine-tuning runs on isolated, encrypted compute. Data is purged after training unless you explicitly request otherwise. All engagements include a data processing agreement aligned to GDPR and standard enterprise security requirements." },
                                { q: "What does pricing look like?", a: "We price on a fixed-project basis — you get a detailed proposal with a clear number before we start. There are no hourly surprises. For ongoing maintenance and model improvement, we offer retainer arrangements with transparent monthly costs. Book a strategy call and we'll give you a realistic estimate within 24 hours." },
                            ].map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
                        </SG>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════════════
                    FINAL CTA
                ══════════════════════════ */}
                <section className="py-36 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 60% 45% at 50% 50%, rgba(99,102,241,0.07), transparent 70%)" }} />
                    <div className="absolute inset-0 pointer-events-none opacity-[0.012]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

                    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                        <Reveal><Eyebrow>Start building</Eyebrow></Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="font-head text-[clamp(34px,5.5vw,62px)] font-black tracking-[-0.04em] leading-[1.04] mt-6">
                                <span className="text-white/92">Your business, amplified</span><br />
                                <span className="glow-text bg-clip-text text-transparent"
                                    style={{ backgroundImage: "linear-gradient(135deg, #a5b4fc, #c4b5fd, #f0abfc, #a5b4fc)" }}>
                                    by genuine intelligence
                                </span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="mt-7 text-lg text-white/38 max-w-lg mx-auto leading-relaxed font-light">
                                One 30-minute call. We'll listen to what you're building, tell you exactly where AI can compound your results, and give you a clear plan — whether you work with us or not.
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/book"
                                    className="group px-12 py-4 rounded-full font-bold text-white text-sm tracking-wide flex items-center gap-2.5 transition-all duration-400 hover:shadow-[0_0_60px_rgba(99,102,241,0.25)]"
                                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7)" }}>
                                    Book Your Free Strategy Call
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                                <Link href="/contact"
                                    className="px-12 py-4 rounded-full border text-white/50 font-medium text-sm tracking-wide hover:text-white hover:border-white/[0.18] transition-all duration-300"
                                    style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                                    Talk to the Team
                                </Link>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[12.5px] text-white/22">
                                {["No credit card required", "30-minute call, no obligation", "Response within 24 hours", "Fixed-price proposals"].map((t, i) => (
                                    <span key={i} className="flex items-center gap-1.5">
                                        <Check size={12} className="text-emerald-400/50" />{t}
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