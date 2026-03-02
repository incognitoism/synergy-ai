"use client";

import Link from "next/link";
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue, Variants } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    Zap,
    Shield,
    BarChart3,
    RefreshCcw,
    Smartphone,
    Crosshair,
    Link2,
    BrainCircuit,
    Activity,
    Lock,
    Clock,
    Workflow,
    ChevronRight,
    Check,
    Minus,
    X,
} from "lucide-react";

/* ════════════════════════════════════════════════════════
   § 0 · UTILITIES & SHARED COMPONENTS
   ════════════════════════════════════════════════════════ */

/* ── Scroll-triggered fade ── */
function Reveal({ children, delay = 0, className = "", y = 36 }: {
    children: React.ReactNode; delay?: number; className?: string; y?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-70px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y, filter: "blur(7px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ── Stagger wrapper ── */
function StaggerGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const staggerChild: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
    visible: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
    },
};

/* ── Animated counter ── */
function Counter({ target, suffix = "", prefix = "", decimals = 0 }: {
    target: number; suffix?: string; prefix?: string; decimals?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!inView) return;
        let frame: number;
        const dur = 2000;
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

/* ── Glowing gradient text ── */
function Glow({ children }: { children: React.ReactNode }) {
    return (
        <span className="glow-text bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent"
            style={{ backgroundSize: "200% 100%", animation: "textShimmer 4s ease-in-out infinite" }}>
            {children}
        </span>
    );
}

/* ── Section divider ── */
function Divider() {
    return (
        <div className="max-w-6xl mx-auto px-6">
            <div className="h-px w-full" style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
            }} />
        </div>
    );
}

/* ── Eyebrow label ── */
function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.28em] uppercase font-medium"
            style={{ color: "rgba(129,140,248,0.6)" }}>
            <span className="w-6 h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
            {children}
        </span>
    );
}

/* ── Inline SVG logos ── */
const LogoSlack = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A" />
        <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0" />
        <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.522 2.521 2.528 2.528 0 0 1-2.52-2.521V2.522A2.528 2.528 0 0 1 15.165 0a2.528 2.528 0 0 1 2.521 2.522v6.312z" fill="#2EB67D" />
        <path d="M15.165 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.522 2.527 2.527 0 0 1 2.52-2.52h6.313A2.528 2.528 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.521h-6.313z" fill="#ECB22E" />
    </svg>
);
const LogoNotion = () => (
    <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5 opacity-80">
        <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.29 2.15c-.42-.326-.98-.7-2.055-.607L3.01 2.71c-.467.047-.56.28-.374.466zM5.252 7.617v13.864c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.934-.56.934-1.166V6.824c0-.606-.233-.933-.747-.886l-15.177.887c-.56.047-.747.327-.747.793zm14.336.42c.094.42 0 .84-.42.887l-.7.14v10.264c-.607.327-1.167.514-1.634.514-.747 0-.934-.234-1.494-.934l-4.577-7.186v6.952l1.447.327s0 .84-1.167.84l-3.22.187c-.093-.187 0-.653.328-.747l.84-.213V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.454-.234 4.763 7.28V9.527l-1.214-.14c-.093-.514.28-.887.747-.933zM2.872 1.07l13.728-1.012c1.68-.14 2.101.094 2.8.607l3.874 2.705c.467.327.607.747.607 1.26v16.2c0 1.026-.373 1.632-1.68 1.726l-15.458.934c-.98.046-1.447-.094-1.96-.747l-3.127-4.057c-.56-.747-.793-1.307-.793-1.96V2.85c0-.84.373-1.54 1.447-1.633z" />
    </svg>
);
const LogoGmail = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335" />
    </svg>
);
const LogoSheets = () => (
    <svg viewBox="0 0 24 24" fill="#34A853" className="w-6 h-6">
        <path d="M19.385 2H4.615A2.615 2.615 0 0 0 2 4.615v14.77A2.615 2.615 0 0 0 4.615 22h14.77A2.615 2.615 0 0 0 22 19.385V4.615A2.615 2.615 0 0 0 19.385 2zM7 18V6h4v12H7zm6 0V6h4v12h-4z" />
    </svg>
);
const LogoHubspot = () => (
    <svg viewBox="0 0 24 24" fill="#FF7A59" className="w-6 h-6">
        <path d="M18.164 7.93V5.084a2.198 2.198 0 0 0 1.267-1.984v-.066a2.198 2.198 0 0 0-2.198-2.198h-.066a2.198 2.198 0 0 0-2.198 2.198v.066c0 .862.503 1.608 1.233 1.964v2.862a5.347 5.347 0 0 0-2.49 1.193l-6.588-5.12a2.16 2.16 0 0 0 .076-.543 2.198 2.198 0 1 0-2.198 2.198c.428 0 .82-.13 1.152-.348l6.46 5.024a5.397 5.397 0 0 0-.552 2.36 5.41 5.41 0 0 0 .596 2.467l-1.9 1.9a1.87 1.87 0 0 0-.558-.093 1.904 1.904 0 1 0 1.904 1.904c0-.199-.036-.39-.093-.572l1.866-1.866a5.378 5.378 0 1 0 4.289-11.428z" />
    </svg>
);
const LogoN8n = () => (
    <svg viewBox="0 0 40 40" className="w-7 h-7">
        <rect width="40" height="40" rx="8" fill="#EA4B71" />
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fill="white" fontFamily="sans-serif" fontWeight="700" fontSize="16">n8n</text>
    </svg>
);
const LogoZapier = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF4A00">
        <path d="M15.477 12.89l2.863-2.862h-4.066V5.965L11.41 8.829 8.55 5.965v4.063H4.48l2.866 2.862-2.866 2.863h4.07v4.063l2.86-2.863 2.864 2.863v-4.063h4.066z" />
    </svg>
);

/* ════════════════════════════════════════════════════════
   § 1 · CONVERGING STREAMS SVG ANIMATION
   ════════════════════════════════════════════════════════ */

function ConvergingStreams() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-120px" });

    const streams = [
        { label: "CRM", Icon: LogoHubspot, color: "#FF7A59", sx: 2, sy: 10 },
        { label: "Email", Icon: LogoGmail, color: "#EA4335", sx: 2, sy: 38 },
        { label: "Messaging", Icon: LogoSlack, color: "#36C5F0", sx: 2, sy: 66 },
        { label: "Knowledge", Icon: LogoNotion, color: "#ffffff", sx: 98, sy: 10 },
        { label: "Sheets", Icon: LogoSheets, color: "#34A853", sx: 98, sy: 38 },
        { label: "Automation", Icon: LogoZapier, color: "#FF4A00", sx: 98, sy: 66 },
    ];

    const cx = 50, cy = 38;

    return (
        <div ref={ref} className="relative w-full max-w-[880px] mx-auto" style={{ aspectRatio: "16 / 8" }}>
            <svg viewBox="0 0 100 76" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                    {streams.map((s, i) => (
                        <linearGradient key={`sg${i}`} id={`sg-${i}`}
                            x1={`${s.sx}%`} y1={`${s.sy}%`} x2={`${cx}%`} y2={`${cy}%`}>
                            <stop offset="0%" stopColor={s.color} stopOpacity="0.6" />
                            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
                        </linearGradient>
                    ))}
                    <radialGradient id="cg">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.45" />
                        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </radialGradient>
                    <filter id="gl"><feGaussianBlur stdDeviation="0.7" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    <filter id="gl2"><feGaussianBlur stdDeviation="2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>

                {/* Center glow */}
                <motion.circle cx={cx} cy={cy} r="14" fill="url(#cg)"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={inView ? { opacity: 1, scale: [0.8, 1.1, 1] } : {}}
                    transition={{ duration: 1.2, delay: 0.9 }} />

                {/* Streams */}
                {streams.map((s, i) => {
                    const isL = s.sx < 50;
                    const ctrlX = isL ? 28 : 72;
                    const path = `M ${s.sx} ${s.sy} Q ${ctrlX} ${s.sy} ${cx} ${cy}`;
                    return (
                        <g key={i}>
                            <motion.path d={path} stroke={s.color} strokeWidth="0.25" strokeOpacity="0.12" fill="none"
                                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.4, delay: i * 0.12, ease: "easeOut" }} />
                            <motion.path d={path} stroke={s.color} strokeWidth="0.55" strokeOpacity="0.7" fill="none" filter="url(#gl)"
                                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.6, delay: i * 0.12 + 0.08, ease: [0.22, 1, 0.36, 1] }} />
                            {inView && (
                                <circle r="0.9" fill={s.color} filter="url(#gl)">
                                    <animateMotion dur={`${2.2 + i * 0.25}s`} repeatCount="indefinite" path={path} />
                                    <animate attributeName="opacity" values="0.25;1;0.25" dur="1.6s" repeatCount="indefinite" />
                                    <animate attributeName="r" values="0.4;1.1;0.4" dur="1.6s" repeatCount="indefinite" />
                                </circle>
                            )}
                        </g>
                    );
                })}

                {/* Center node */}
                <motion.circle cx={cx} cy={cy} r="5" fill="#0B0B12" stroke="#6366f1" strokeWidth="0.45" filter="url(#gl2)"
                    initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.85, type: "spring", stiffness: 220 }} />
                <motion.text x={cx} y={cy + 0.6} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="3.4" fontWeight="700" fontFamily="sans-serif"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.15 }}>
                    n8n
                </motion.text>

                {/* Output river */}
                <motion.path d={`M ${cx} ${cy + 5.5} C ${cx} 55, ${cx - 6} 60, ${cx} 76`}
                    stroke="url(#out-river)" strokeWidth="0.9" fill="none" filter="url(#gl)"
                    initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.1, delay: 1.5 }} />
                <defs>
                    <linearGradient id="out-river" x1="50%" y1="42%" x2="50%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Logo labels */}
            {streams.map((s, i) => {
                const isL = s.sx < 50;
                return (
                    <motion.div key={`lb-${i}`}
                        initial={{ opacity: 0, x: isL ? -18 : 18 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.65, delay: i * 0.12 + 0.25 }}
                        className="absolute flex items-center gap-2"
                        style={{
                            left: `${s.sx}%`, top: `${(s.sy / 76) * 100}%`,
                            transform: `translate(${isL ? "-115%" : "15%"}, -50%)`,
                            flexDirection: isL ? "row" : "row-reverse",
                        }}>
                        <div className="p-2.5 rounded-xl border backdrop-blur-sm"
                            style={{ background: "rgba(255,255,255,0.03)", borderColor: `${s.color}18` }}>
                            <s.Icon />
                        </div>
                        <span className="text-xs font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.45)" }}>
                            {s.label}
                        </span>
                    </motion.div>
                );
            })}

            {/* Pulse rings */}
            {inView && (
                <div className="absolute pointer-events-none"
                    style={{ left: "50%", top: `${(cy / 76) * 100}%`, transform: "translate(-50%,-50%)" }}>
                    {[0, 1, 2].map(i => (
                        <motion.div key={i} className="absolute rounded-full border border-indigo-500/30"
                            style={{ inset: -(22 + i * 14) }}
                            animate={{ scale: [0.85, 1.6], opacity: [0.35, 0] }}
                            transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.9, ease: "easeOut" }} />
                    ))}
                </div>
            )}

            {/* Output label */}
            <motion.div className="absolute left-1/2 -translate-x-1/2"
                style={{ bottom: "-8%" }}
                initial={{ opacity: 0, y: -8 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.8 }}>
                <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: "rgba(99,102,241,0.5)" }}>
                    Your automated business
                </span>
            </motion.div>
        </div>
    );
}

/* ════════════════════════════════════════════════════════
   § 2 · LOGO TICKER
   ════════════════════════════════════════════════════════ */

function LogoTicker() {
    const items = [
        { name: "Slack", I: LogoSlack }, { name: "Gmail", I: LogoGmail },
        { name: "Notion", I: LogoNotion }, { name: "Sheets", I: LogoSheets },
        { name: "HubSpot", I: LogoHubspot }, { name: "n8n", I: LogoN8n },
        { name: "Zapier", I: LogoZapier },
    ];
    const doubled = [...items, ...items];
    return (
        <div className="relative overflow-hidden w-full">
            <div className="absolute inset-y-0 left-0 w-24 z-10" style={{ background: `linear-gradient(to right, #06060A, transparent)` }} />
            <div className="absolute inset-y-0 right-0 w-24 z-10" style={{ background: `linear-gradient(to left, #06060A, transparent)` }} />
            <motion.div className="flex gap-6 items-center w-max py-4"
                animate={{ x: [0, -items.length * 184] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
                {doubled.map((l, i) => (
                    <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-xl border shrink-0"
                        style={{
                            background: "rgba(255,255,255,0.015)", borderColor: "rgba(255,255,255,0.04)",
                            minWidth: 160,
                        }}>
                        <l.I />
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{l.name}</span>
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
        { feature: "Setup time", manual: "2–4 weeks", asphalt: "15 minutes" },
        { feature: "Technical skill required", manual: "Developer needed", asphalt: "None" },
        { feature: "Number of integrations", manual: "Build each one", asphalt: "200+ pre-built" },
        { feature: "Workflow optimization", manual: "Manual tuning", asphalt: "AI-driven" },
        { feature: "Error handling", manual: "Custom code", asphalt: "Auto-retry & alerts" },
        { feature: "Ongoing maintenance", manual: "Continuous", asphalt: "Self-healing" },
        { feature: "Cost", manual: "$$$$ (dev hours)", asphalt: "Flat monthly" },
    ];
    return (
        <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <table className="w-full text-left" style={{ minWidth: 580 }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <th className="px-6 py-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Feature</th>
                        <th className="px-6 py-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>Manual / DIY</th>
                        <th className="px-6 py-4 text-sm font-medium text-indigo-400">asphalt AI</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, i) => (
                        <motion.tr key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05, duration: 0.5 }}
                            style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                            <td className="px-6 py-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>{r.feature}</td>
                            <td className="px-6 py-4 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>{r.manual}</td>
                            <td className="px-6 py-4 text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>{r.asphalt}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ════════════════════════════════════════════════════════
   THE PAGE
   ════════════════════════════════════════════════════════ */

export default function AutomationPage() {
    return (
        <>
            {/* Global styles */}
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
                    33% { transform: translate(15px, -20px) scale(1.05); }
                    66% { transform: translate(-10px, 12px) scale(0.97); }
                }
                .font-display { font-family: 'Outfit', sans-serif; }
                .font-body { font-family: 'Figtree', sans-serif; }
            `}</style>

            <div className="font-body bg-[#06060A] text-white overflow-x-hidden">

                {/* ═══════════════════════════════════════════
                    SECTION 1 — PAGE HERO
                ═══════════════════════════════════════════ */}
                <section className="relative pt-36 pb-28 overflow-hidden">
                    {/* Ambient orbs */}
                    <div className="absolute -top-32 left-[8%] w-[620px] h-[620px] pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 60%)",
                            filter: "blur(80px)", animation: "floatOrb 16s ease-in-out infinite",
                        }} />
                    <div className="absolute top-20 right-[5%] w-[480px] h-[480px] pointer-events-none"
                        style={{
                            background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 60%)",
                            filter: "blur(80px)", animation: "floatOrb 20s ease-in-out infinite 4s",
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
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "pulseDot 2.4s ease-in-out infinite" }} />
                                <span className="text-[11px] tracking-[0.24em] uppercase text-white/40 font-medium font-body">
                                    asphalt AI × n8n Integration
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.12}>
                            <h1 className="font-display text-[clamp(38px,6.5vw,80px)] font-700 tracking-[-0.04em] leading-[1.02]">
                                <span className="text-white/95">Automation so seamless,</span>
                                <br />
                                <span className="text-white/95">you won't even need to </span>
                                <Glow>look twice</Glow>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.25}>
                            <p className="mt-8 text-lg md:text-xl text-white/40 max-w-[540px] mx-auto leading-relaxed font-light">
                                asphalt AI enables business owners like you to seamlessly integrate{" "}
                                <span className="text-white/75 font-medium">n8n into your business</span> — one click,
                                zero complexity, infinite possibility.
                            </p>
                        </Reveal>

                        <Reveal delay={0.38}>
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/book"
                                    className="group px-10 py-4 rounded-full bg-accent font-medium text-white text-sm tracking-wide flex items-center gap-2.5 transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.2)]">
                                    Start Automating
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                                <Link href="#how-it-works"
                                    className="px-10 py-4 rounded-full border border-white/[0.08] text-white/60 font-medium text-sm tracking-wide hover:border-white/[0.16] hover:text-white transition-all duration-300">
                                    See How It Works
                                </Link>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    SECTION 2 — TRUST / LOGOS
                ═══════════════════════════════════════════ */}
                <section className="py-12">
                    <Reveal>
                        <p className="text-center text-[11px] tracking-[0.22em] uppercase text-white/20 font-medium mb-6">
                            Connects with the tools you already use
                        </p>
                    </Reveal>
                    <LogoTicker />
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
                                    <h2 className="font-display text-[clamp(30px,4.5vw,52px)] font-700 tracking-[-0.03em] leading-[1.08] mt-5">
                                        <span className="text-white/95">Your tools don't </span>
                                        <Glow>talk to each other</Glow>
                                    </h2>
                                </Reveal>
                                <Reveal delay={0.16}>
                                    <div className="mt-7 space-y-5 text-[16px] text-white/40 leading-[1.8] font-light">
                                        <p>
                                            You're running your business across Slack, Gmail, Notion, spreadsheets, a CRM, a project
                                            tracker, maybe an invoicing tool — and every single one operates in its own silo.
                                            Data gets stuck. Context gets lost. You end up copy-pasting between tabs at midnight.
                                        </p>
                                        <p>
                                            Most automation platforms hand you a blank canvas and tell you to figure it out. You spend
                                            hours dragging nodes, reading documentation, debugging webhook payloads — and that's before
                                            anything actually runs.{" "}
                                            <span className="text-white/70 font-medium">That's not automation. That's a second job.</span>
                                        </p>
                                    </div>
                                </Reveal>
                            </div>

                            {/* Pain stats */}
                            <StaggerGroup className="space-y-4">
                                {[
                                    { stat: "73%", desc: "of business owners say manual data entry costs them 5+ hours per week", color: "#f43f5e" },
                                    { stat: "2.4×", desc: "more likely to miss leads when CRM isn't synced with email & chat tools", color: "#f97316" },
                                    { stat: "41%", desc: "of small business failures cite operational inefficiency as a key factor", color: "#eab308" },
                                ].map((item, i) => (
                                    <motion.div key={i} variants={staggerChild}
                                        className="flex gap-5 p-6 rounded-2xl border"
                                        style={{
                                            background: "linear-gradient(to right, rgba(255,255,255,0.02), transparent)",
                                            borderColor: "rgba(255,255,255,0.05)",
                                        }}>
                                        <span className="font-display text-3xl font-800 tracking-tight shrink-0"
                                            style={{ color: item.color }}>
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
                    SECTION 4 — STREAM ANIMATION
                ═══════════════════════════════════════════ */}
                <section id="how-it-works" className="py-28 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto px-6 text-center">
                        <Reveal><Eyebrow>One-click n8n integration</Eyebrow></Reveal>
                        <Reveal delay={0.08}>
                            <h2 className="font-display text-[clamp(30px,5vw,56px)] font-700 tracking-[-0.03em] leading-[1.08] mt-5">
                                <span className="text-white/95">Six streams converge. </span>
                                <Glow>One river flows.</Glow>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mt-6 text-lg text-white/38 max-w-[560px] mx-auto leading-relaxed font-light">
                                Every data source in your business — CRM, email, messaging, docs, sheets, existing automations — converges
                                into a single, intelligent n8n workflow. No fragmented tools. No manual handoffs.
                            </p>
                        </Reveal>
                    </div>
                    <div className="mt-16 px-6">
                        <ConvergingStreams />
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
                                The numbers speak for themselves
                            </p>
                        </Reveal>
                        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { val: 4, suf: "×", label: "Faster Workflows", desc: "Compared to manual task execution across siloed tools.", color: "#6366f1" },
                                { val: 18, suf: "%", label: "Higher Retention", desc: "Businesses using automation see measurably higher engagement.", color: "#34d399" },
                                { val: 15, suf: "min", label: "To First Workflow", desc: "Average onboarding time from signup to live automation.", color: "#a855f7" },
                                { val: 200, suf: "+", label: "Integrations", desc: "Pre-built connectors. An ecosystem as flexible as you.", color: "#f97316" },
                            ].map((s, i) => (
                                <motion.div key={i} variants={staggerChild}
                                    className="relative p-7 rounded-2xl border overflow-hidden group"
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
                                        <Counter target={s.val} suffix={s.suf} />
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
                    SECTION 6 — HOW IT WORKS (3 steps)
                ═══════════════════════════════════════════ */}
                <section className="py-28 relative">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>How it works</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(30px,4.5vw,50px)] font-700 tracking-[-0.03em] leading-[1.08] mt-5">
                                    <span className="text-white/95">Three steps to </span>
                                    <Glow>full automation</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-[17px] text-white/38 max-w-lg mx-auto leading-relaxed font-light">
                                    No code. No consultants. No 6-week implementation timeline. Just connect, generate, deploy.
                                </p>
                            </Reveal>
                        </div>

                        <StaggerGroup className="grid lg:grid-cols-3 gap-5">
                            {[
                                {
                                    n: "01", title: "Connect Your Stack",
                                    desc: "Link your existing tools — Slack, Gmail, Notion, HubSpot, Google Sheets, databases, and 200+ more — in under 60 seconds with pre-authenticated OAuth connectors. No API keys. No developer handoffs.",
                                    icon: <Link2 size={20} strokeWidth={1.5} />,
                                },
                                {
                                    n: "02", title: "AI Builds Your Flows",
                                    desc: "Describe what you need in plain English. asphalt AI analyzes your business processes and auto-generates production-ready n8n workflows — optimized for your exact operational logic. No drag-and-drop required.",
                                    icon: <BrainCircuit size={20} strokeWidth={1.5} />,
                                },
                                {
                                    n: "03", title: "Deploy & Monitor",
                                    desc: "One click to deploy. Real-time dashboards track every execution, flag anomalies, and self-optimize over time. Workflows auto-retry on failure and alert you only when human attention is actually needed.",
                                    icon: <Activity size={20} strokeWidth={1.5} />,
                                },
                            ].map((step, i) => (
                                <motion.div key={i} variants={staggerChild}
                                    className="relative p-8 rounded-2xl border overflow-hidden group"
                                    style={{
                                        background: "linear-gradient(to bottom, rgba(255,255,255,0.035), rgba(255,255,255,0.008))",
                                        borderColor: "rgba(255,255,255,0.06)",
                                    }}>
                                    {/* Watermark number */}
                                    <div className="absolute -top-4 -right-2 font-display text-[110px] font-800 leading-none pointer-events-none select-none"
                                        style={{ color: "rgba(255,255,255,0.015)" }}>
                                        {step.n}
                                    </div>

                                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6"
                                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.18)", color: "#818cf8" }}>
                                        {step.icon}
                                    </div>
                                    <h3 className="font-display text-xl font-600 text-white/90 mb-3 tracking-tight">{step.title}</h3>
                                    <p className="text-[14.5px] text-white/38 leading-[1.75] font-light">{step.desc}</p>
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
                    {/* Background accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.04), transparent 60%)", filter: "blur(100px)" }} />

                    <div className="max-w-3xl mx-auto px-6 relative z-10">
                        <Reveal>
                            <div className="p-10 md:p-14 rounded-3xl border relative overflow-hidden"
                                style={{
                                    background: "linear-gradient(to bottom, rgba(255,255,255,0.025), rgba(255,255,255,0.005))",
                                    borderColor: "rgba(255,255,255,0.06)",
                                }}>
                                {/* Corner glows */}
                                <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
                                    style={{ background: "radial-gradient(circle at top left, rgba(99,102,241,0.1), transparent 70%)" }} />
                                <div className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
                                    style={{ background: "radial-gradient(circle at bottom right, rgba(168,85,247,0.06), transparent 70%)" }} />

                                <Eyebrow>Why asphalt AI</Eyebrow>
                                <h2 className="font-display text-[clamp(24px,3.5vw,38px)] font-700 tracking-[-0.025em] leading-[1.15] mt-5 mb-8">
                                    <span className="text-white/95">The automation platform that </span>
                                    <Glow>actually understands</Glow>
                                    <span className="text-white/95"> your business</span>
                                </h2>

                                <div className="space-y-6 text-[15.5px] text-white/42 leading-[1.85] font-light">
                                    <p>
                                        n8n is the most powerful open-source workflow engine on the planet — 200+ integrations,
                                        conditional logic, webhooks, code nodes, sub-workflows. But raw power without intelligence
                                        means you're still doing the engineering work yourself.
                                    </p>
                                    <p>
                                        <span className="text-white/80 font-medium">asphalt AI wraps that power in purpose-built
                                            intelligence.</span> Our AI layer understands what a "lead nurturing sequence" means for
                                        <em> your</em> CRM setup, how <em>your</em> team communicates on Slack, how <em>your</em> invoicing
                                        process flows from quote to payment. It doesn't generate generic templates — it generates
                                        workflows fitted to your operational DNA.
                                    </p>
                                    <p>
                                        Whether you're synchronizing inventory across platforms, routing support tickets based on
                                        sentiment analysis, auto-generating reports from live data, or building customer onboarding
                                        sequences that adapt in real time — you describe the outcome, we build the pipeline.
                                    </p>
                                    <p>
                                        Our clients typically see their first automation running within{" "}
                                        <span className="relative text-indigo-300 font-medium">
                                            15 minutes of onboarding
                                            <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-indigo-400/40 via-indigo-400/20 to-transparent" />
                                        </span>.
                                        Not days. Not weeks. Fifteen minutes from "I want this" to "this is running."
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 8 — FEATURE GRID
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>Capabilities</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(28px,4vw,46px)] font-700 tracking-[-0.025em] leading-[1.1] mt-5">
                                    <span className="text-white/95">Built for </span>
                                    <Glow>real businesses</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-[17px] text-white/38 max-w-lg mx-auto leading-relaxed font-light">
                                    Every feature designed to remove friction between you and the outcomes you're after.
                                </p>
                            </Reveal>
                        </div>

                        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { Icon: Link2, title: "One-Click Connect", desc: "Pre-authenticated connectors for 200+ tools. OAuth handled behind the scenes — no API keys, no dev work." },
                                { Icon: BrainCircuit, title: "AI Workflow Builder", desc: "Describe what you need in plain English. The AI generates an optimized n8n workflow tailored to your stack." },
                                { Icon: BarChart3, title: "Live Monitoring", desc: "Real-time execution logs, error alerts, and performance dashboards. See every run, every data point, every result." },
                                { Icon: Lock, title: "Enterprise Security", desc: "SOC 2 Type II compliant. End-to-end encryption. Your data never leaves your environment. RBAC out of the box." },
                                { Icon: Zap, title: "Zero Downtime", desc: "Auto-scaling infrastructure with 99.99% uptime SLA, instant failover, and global edge deployment." },
                                { Icon: RefreshCcw, title: "Self-Optimizing", desc: "Workflows learn from execution patterns — bottlenecks get rerouted, redundant steps get pruned, automatically." },
                                { Icon: Smartphone, title: "Mobile Alerts", desc: "Push, SMS, Slack, email — get notified on any device when workflows complete, fail, or need human attention." },
                                { Icon: Crosshair, title: "Custom Triggers", desc: "Webhooks, cron schedules, email listeners, Slack commands, form submissions — start any flow from anywhere." },
                            ].map((f, i) => (
                                <motion.div key={i} variants={staggerChild}
                                    className="group p-6 rounded-2xl border transition-all duration-500 hover:border-white/[0.12]"
                                    style={{
                                        background: "rgba(255,255,255,0.015)",
                                        borderColor: "rgba(255,255,255,0.04)",
                                    }}>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300
                                        group-hover:bg-indigo-500/15 group-hover:border-indigo-500/25"
                                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                                        <f.Icon size={18} strokeWidth={1.5} className="group-hover:text-indigo-400 transition-colors duration-300" />
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
                    SECTION 9 — COMPARISON TABLE
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <Reveal><Eyebrow>Comparison</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(28px,4vw,44px)] font-700 tracking-[-0.025em] leading-[1.1] mt-5">
                                    <span className="text-white/95">DIY automation vs. </span>
                                    <Glow>asphalt AI</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-[17px] text-white/38 max-w-md mx-auto leading-relaxed font-light">
                                    See what changes when your automation platform actually thinks for you.
                                </p>
                            </Reveal>
                        </div>
                        <Reveal delay={0.2}>
                            <ComparisonTable />
                        </Reveal>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 10 — USE CASES
                ═══════════════════════════════════════════ */}
                <section className="py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>Use cases</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-display text-[clamp(28px,4vw,44px)] font-700 tracking-[-0.025em] leading-[1.1] mt-5">
                                    <Glow>Automation</Glow>
                                    <span className="text-white/95"> for every department</span>
                                </h2>
                            </Reveal>
                        </div>

                        <StaggerGroup className="grid md:grid-cols-2 gap-5">
                            {[
                                {
                                    title: "Sales & Revenue",
                                    items: [
                                        "Auto-enrich leads from form submissions with company data",
                                        "Sync HubSpot deals to Slack channels in real time",
                                        "Generate follow-up emails based on meeting transcript summaries",
                                        "Route high-intent leads directly to senior reps",
                                    ],
                                },
                                {
                                    title: "Customer Support",
                                    items: [
                                        "Auto-classify incoming tickets by sentiment and urgency",
                                        "Create Notion knowledge base entries from resolved tickets",
                                        "Escalate unresolved issues after SLA thresholds",
                                        "Send CSAT surveys triggered by ticket closure",
                                    ],
                                },
                                {
                                    title: "Operations & Finance",
                                    items: [
                                        "Sync invoices between Stripe, QuickBooks, and Google Sheets",
                                        "Auto-generate weekly P&L summaries and Slack them to founders",
                                        "Reconcile payments and flag discrepancies automatically",
                                        "Track vendor contract renewals with 30/60/90 day alerts",
                                    ],
                                },
                                {
                                    title: "Marketing & Growth",
                                    items: [
                                        "Distribute blog content across social channels on publish",
                                        "Sync Webflow form leads to email sequences in Mailchimp",
                                        "Track campaign UTMs end-to-end and report ROI to Sheets",
                                        "Auto-repurpose long-form content into social snippets",
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
                                        <Workflow size={18} strokeWidth={1.5} className="text-indigo-400/60" />
                                        {uc.title}
                                    </h3>
                                    <ul className="space-y-3">
                                        {uc.items.map((item, j) => (
                                            <li key={j} className="flex gap-3 text-[14px] text-white/40 leading-relaxed font-light">
                                                <ChevronRight size={14} className="text-indigo-400/40 shrink-0 mt-1" />
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
                    SECTION 11 — FAQ
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
                                    q: "Do I need any coding experience?",
                                    a: "None at all. asphalt AI generates production-ready n8n workflows from plain English descriptions. If you can explain what you want to happen, the AI builds it. For power users who want to fine-tune, the full n8n editor is always accessible.",
                                },
                                {
                                    q: "What happens if a workflow fails?",
                                    a: "Every workflow has built-in auto-retry logic, error branching, and dead-letter queues. If something fails beyond recovery, you get an instant notification with a plain-English error summary and a one-click fix suggestion. Most issues resolve without you lifting a finger.",
                                },
                                {
                                    q: "Is my data secure?",
                                    a: "SOC 2 Type II certified. End-to-end encryption at rest and in transit. Your data never passes through our servers unless you explicitly choose our managed hosting. Self-hosted and private cloud deployments are fully supported.",
                                },
                                {
                                    q: "Can I use my existing n8n workflows?",
                                    a: "Absolutely. Import any existing n8n workflow JSON and asphalt AI will analyze it, suggest optimizations, and integrate it into your managed dashboard. Nothing gets lost in migration.",
                                },
                                {
                                    q: "How is this different from Zapier or Make?",
                                    a: "Zapier and Make are great for simple, linear automations. asphalt AI is built for complex, branching business logic — conditional routing, error handling, sub-workflows, AI-powered decision nodes. And because it's built on n8n, there's no vendor lock-in. You own your workflows.",
                                },
                                {
                                    q: "What does pricing look like?",
                                    a: "Flat monthly pricing based on workflow executions, not per-step billing that punishes complexity. Start with a free 14-day trial — no credit card required. Most businesses find their ROI positive within the first week.",
                                },
                            ].map((faq, i) => (
                                <FAQItem key={i} q={faq.q} a={faq.a} />
                            ))}
                        </StaggerGroup>
                    </div>
                </section>

                <Divider />

                {/* ═══════════════════════════════════════════
                    SECTION 12 — FINAL CTA
                ═══════════════════════════════════════════ */}
                <section className="py-32 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.07), transparent 55%)", filter: "blur(100px)" }} />

                    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                        <Reveal><Eyebrow>Ready to automate?</Eyebrow></Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="font-display text-[clamp(32px,5.5vw,60px)] font-700 tracking-[-0.035em] leading-[1.06] mt-6">
                                <span className="text-white/95">Stop managing tools.</span>
                                <br />
                                <Glow>Start growing.</Glow>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="mt-7 text-lg text-white/38 max-w-md mx-auto leading-relaxed font-light">
                                Join hundreds of business owners who replaced 40+ hours of manual work per month
                                with intelligent, self-running n8n automation.
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/book"
                                    className="group px-12 py-4.5 rounded-full font-medium text-white text-sm tracking-wide flex items-center gap-2.5 transition-all duration-500 hover:shadow-[0_0_55px_rgba(99,102,241,0.22)]"
                                    style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}>
                                    Book a Demo
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                                <Link href="/contact"
                                    className="px-12 py-4.5 rounded-full border text-indigo-300 font-medium text-sm tracking-wide hover:text-white transition-all duration-300"
                                    style={{ borderColor: "rgba(99,102,241,0.2)" }}>
                                    Talk to Sales
                                </Link>
                            </div>
                        </Reveal>
                        <Reveal delay={0.4}>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-white/25">
                                {["No credit card required", "Free 14-day trial", "Cancel anytime"].map((t, i) => (
                                    <span key={i} className="flex items-center gap-1.5">
                                        <Check size={13} className="text-emerald-400/60" />
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

/* ── FAQ Accordion Item ── */
function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div variants={staggerChild}
            className="rounded-2xl border overflow-hidden transition-colors duration-300"
            style={{
                background: open ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.012)",
                borderColor: open ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)",
            }}>
            <button onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left">
                <span className="font-display text-[15px] font-600 text-white/85">{q}</span>
                <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                            className="text-white/30" />
                    </svg>
                </motion.div>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                        <div className="px-7 pb-6 text-[14px] text-white/40 leading-[1.75] font-light">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}