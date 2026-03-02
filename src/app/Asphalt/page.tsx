"use client";

import Link from "next/link";
import {
    motion, useInView, useMotionValue, useSpring, AnimatePresence,
} from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
    ArrowRight, ArrowUpRight, Check, ChevronRight,
    MessageCircle, Zap, Shield, Lock, Activity,
    Brain, Users, Globe, Sparkles, Clock,
    BarChart3, RefreshCcw, Cpu, Eye, Star,
    PhoneCall, HeartHandshake, TrendingUp, Inbox,
} from "lucide-react";

/* ═══════════════════════════
   SHARED PRIMITIVES
═══════════════════════════ */

function Reveal({ children, delay = 0, y = 28, className = "" }: {
    children: React.ReactNode; delay?: number; y?: number; className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-55px" });
    return (
        <motion.div ref={ref} className={className}
            initial={{ opacity: 0, y, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1], delay }}>
            {children}
        </motion.div>
    );
}

const sc: Variants = {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

function SG({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    return (
        <motion.div ref={ref} className={className}
            initial="hidden" animate={inView ? "visible" : "hidden"}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.075, delayChildren: 0.02 } } }}>
            {children}
        </motion.div>
    );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2.5 text-[10.5px] tracking-[0.3em] uppercase font-medium"
            style={{ color: "rgba(129,140,248,0.6)" }}>
            <span className="w-5 h-px bg-gradient-to-r from-indigo-500/50 to-transparent" />
            {children}
        </span>
    );
}

function Glow({ children }: { children: React.ReactNode }) {
    return (
        <span className="glow-text bg-clip-text text-transparent"
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
            const t = Math.min((n - s) / 2000, 1);
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
    const sx = useSpring(mx, { stiffness: 180, damping: 26 });
    const sy = useSpring(my, { stiffness: 180, damping: 26 });
    const [h, setH] = useState(false);
    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`} style={style}
            onMouseMove={e => { const r = ref.current?.getBoundingClientRect(); if (r) { mx.set(e.clientX - r.left); my.set(e.clientY - r.top); } }}
            onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
            <motion.div className="pointer-events-none absolute inset-0"
                style={{ opacity: h ? 1 : 0, transition: "opacity 0.4s", background: `radial-gradient(320px circle at ${sx}px ${sy}px, rgba(${rgb},0.1), transparent 55%)` }} />
            <motion.div className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                    opacity: h ? 1 : 0, transition: "opacity 0.4s", background: `radial-gradient(200px circle at ${sx}px ${sy}px, rgba(${rgb},0.22), transparent 50%)`,
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

/* ═══════════════════════════
   LIVE CHAT MOCK ANIMATION
═══════════════════════════ */
const conversations = [
    {
        channel: "Website",
        color: "#6366f1",
        messages: [
            { from: "customer", text: "Hi, I need to upgrade my plan but I'm confused about the pricing." },
            { from: "asphalt", text: "Happy to help! Based on your current usage, the Growth plan at $149/mo would give you 3× your current limits and save you $40/mo vs. buying add-ons." },
            { from: "customer", text: "That sounds perfect. Can I start a trial?" },
            { from: "asphalt", text: "Absolutely — I've just activated a 14-day trial on Growth for you. You'll also get a 20% first-month discount as a loyalty reward. Enjoy! 🎉" },
        ],
    },
    {
        channel: "WhatsApp",
        color: "#25d366",
        messages: [
            { from: "customer", text: "My order #4821 hasn't arrived yet, it's been 6 days." },
            { from: "asphalt", text: "I can see order #4821 — it's been delayed at the distribution centre due to high volume. New estimated delivery: tomorrow by 6pm. I've added £10 store credit for the wait." },
            { from: "customer", text: "Oh great, thank you!" },
            { from: "asphalt", text: "Of course! I'll send you a text when it's out for delivery. Anything else I can help with?" },
        ],
    },
    {
        channel: "Slack",
        color: "#4a154b",
        messages: [
            { from: "customer", text: "Can someone explain how the API rate limits work?" },
            { from: "asphalt", text: "Sure! Your plan allows 1,000 requests/min. You're currently at ~340 avg. For burst traffic, we auto-scale up to 5× for 60s intervals. Want me to pull your usage report?" },
            { from: "customer", text: "Yes please, and can you flag if we're approaching limits?" },
            { from: "asphalt", text: "Done — I've set up a Slack alert that fires at 80% of your limit. You'll get 15 minutes' notice before any throttling could occur." },
        ],
    },
];

function LiveChatMock() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [convIdx, setConvIdx] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [typing, setTyping] = useState(false);

    const conv = conversations[convIdx];
    const visibleMessages = conv.messages.slice(0, msgIdx);

    useEffect(() => {
        if (!inView) return;
        setMsgIdx(0);
        setTyping(false);
    }, [convIdx, inView]);

    useEffect(() => {
        if (!inView) return;
        if (msgIdx >= conv.messages.length) {
            const t = setTimeout(() => {
                setConvIdx(c => (c + 1) % conversations.length);
                setMsgIdx(0);
            }, 3000);
            return () => clearTimeout(t);
        }
        const next = conv.messages[msgIdx];
        const isasphalt = next.from === "asphalt";
        if (isasphalt) {
            setTyping(true);
            const t = setTimeout(() => {
                setTyping(false);
                setMsgIdx(m => m + 1);
            }, 1800);
            return () => clearTimeout(t);
        } else {
            const t = setTimeout(() => setMsgIdx(m => m + 1), 900);
            return () => clearTimeout(t);
        }
    }, [msgIdx, inView, conv]);

    return (
        <div ref={ref} className="relative">
            {/* Channel tab bar */}
            <div className="flex items-center gap-1 px-4 pt-4 pb-3 border-b"
                style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                {conversations.map((c, i) => (
                    <button key={i} onClick={() => { setConvIdx(i); setMsgIdx(0); }}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-medium tracking-wide transition-all duration-200"
                        style={{
                            background: convIdx === i ? `rgba(${c.color === "#6366f1" ? "99,102,241" : c.color === "#25d366" ? "37,211,102" : "74,21,75"},0.15)` : "transparent",
                            color: convIdx === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.3)",
                            border: convIdx === i ? `1px solid rgba(255,255,255,0.1)` : "1px solid transparent",
                        }}>
                        {c.channel}
                    </button>
                ))}
                <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "pulseDot 2s infinite" }} />
                    <span className="text-[10px] text-white/25 tracking-wide">Live</span>
                </div>
            </div>

            {/* Messages */}
            <div className="p-5 space-y-3 min-h-[260px] flex flex-col justify-end">
                <AnimatePresence mode="popLayout">
                    {visibleMessages.map((msg, i) => (
                        <motion.div key={`${convIdx}-${i}`}
                            initial={{ opacity: 0, y: 10, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                            className={`flex ${msg.from === "asphalt" ? "justify-start" : "justify-end"}`}>
                            {msg.from === "asphalt" && (
                                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mr-2 mt-0.5 text-[9px] font-black"
                                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}>A</div>
                            )}
                            <div className="max-w-[78%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                                style={{
                                    background: msg.from === "asphalt" ? "rgba(99,102,241,0.12)" : "rgba(255,255,255,0.06)",
                                    border: msg.from === "asphalt" ? "1px solid rgba(99,102,241,0.2)" : "1px solid rgba(255,255,255,0.07)",
                                    color: msg.from === "asphalt" ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.65)",
                                    borderBottomLeftRadius: msg.from === "asphalt" ? "4px" : "16px",
                                    borderBottomRightRadius: msg.from === "customer" ? "4px" : "16px",
                                }}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                <AnimatePresence>
                    {typing && (
                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                            className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black shrink-0"
                                style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}>A</div>
                            <div className="flex items-center gap-1 px-4 py-3 rounded-2xl"
                                style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.18)", borderBottomLeftRadius: "4px" }}>
                                {[0, 1, 2].map(i => (
                                    <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400"
                                        animate={{ y: [0, -4, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input bar */}
            <div className="px-5 pb-5">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <span className="text-sm text-white/20 flex-1">asphalt is handling this conversation…</span>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                        <ArrowRight size={12} className="text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════
   CONNECTION TOPOLOGY SVG
═══════════════════════════ */
function ConnectionViz() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    const channels = [
        { x: 8, y: 20, label: "Website", color: "#6366f1" },
        { x: 8, y: 40, label: "WhatsApp", color: "#25d366" },
        { x: 8, y: 60, label: "Email", color: "#EA4335" },
        { x: 8, y: 80, label: "Slack", color: "#4A154B" },
    ];
    const outputs = [
        { x: 92, y: 20, label: "CRM Update", color: "#f59e0b" },
        { x: 92, y: 38, label: "Ticket Created", color: "#10b981" },
        { x: 92, y: 56, label: "Order Actioned", color: "#6366f1" },
        { x: 92, y: 74, label: "Escalation", color: "#ec4899" },
    ];
    const cx = 50, cy = 50;

    return (
        <div ref={ref} className="relative w-full" style={{ aspectRatio: "16/8" }}>
            <svg viewBox="0 0 100 100" fill="none" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <filter id="gf"><feGaussianBlur stdDeviation="0.6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    <radialGradient id="cg"><stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" /><stop offset="100%" stopColor="#6366f1" stopOpacity="0" /></radialGradient>
                </defs>
                {/* Center glow */}
                <motion.circle cx={cx} cy={cy} r="18" fill="url(#cg)"
                    initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }} />
                {/* Input lines */}
                {channels.map((c, i) => {
                    const path = `M ${c.x + 3} ${c.y} Q 28 ${c.y} ${cx - 8} ${cy}`;
                    return (
                        <g key={i}>
                            <motion.path d={path} stroke={c.color} strokeWidth="0.35" strokeOpacity="0.15" fill="none"
                                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1, delay: i * 0.1 + 0.3 }} />
                            <motion.path d={path} stroke={c.color} strokeWidth="0.6" strokeOpacity="0.55" fill="none" filter="url(#gf)"
                                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.2, delay: i * 0.1 + 0.4 }} />
                            {inView && (
                                <circle r="0.9" fill={c.color} filter="url(#gf)">
                                    <animateMotion dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.45}s`} path={path} />
                                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                            )}
                        </g>
                    );
                })}
                {/* Output lines */}
                {outputs.map((o, i) => {
                    const path = `M ${cx + 8} ${cy} Q 72 ${o.y} ${o.x - 3} ${o.y}`;
                    return (
                        <g key={i}>
                            <motion.path d={path} stroke={o.color} strokeWidth="0.35" strokeOpacity="0.15" fill="none"
                                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1, delay: i * 0.1 + 0.8 }} />
                            <motion.path d={path} stroke={o.color} strokeWidth="0.6" strokeOpacity="0.5" fill="none" filter="url(#gf)"
                                initial={{ pathLength: 0 }} animate={inView ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.2, delay: i * 0.1 + 0.9 }} />
                            {inView && (
                                <circle r="0.9" fill={o.color} filter="url(#gf)">
                                    <animateMotion dur={`${2 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35 + 1}s`} path={path} />
                                </circle>
                            )}
                        </g>
                    );
                })}
                {/* Center node */}
                <motion.circle cx={cx} cy={cy} r="7" fill="#09090f" stroke="#6366f1" strokeWidth="0.6" filter="url(#gf)"
                    initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                    transition={{ type: "spring", stiffness: 200, delay: 0.7 }} />
                <motion.text x={cx} y={cy + 0.8} textAnchor="middle" dominantBaseline="middle"
                    fill="white" fontSize="4" fontWeight="800" fontFamily="sans-serif"
                    initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}>
                    asphalt
                </motion.text>
                {/* Pulse rings */}
                {inView && [0, 1, 2].map(i => (
                    <motion.circle key={i} cx={cx} cy={cy} r="7" fill="none" stroke="#6366f1" strokeOpacity="0.25"
                        animate={{ r: [7, 22, 7], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeOut" }} />
                ))}
                {/* Channel labels */}
                {channels.map((c, i) => (
                    <g key={i}>
                        <motion.circle cx={c.x} cy={c.y} r="3.2" fill="#09090f" stroke={c.color} strokeWidth="0.5"
                            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                            transition={{ type: "spring", stiffness: 220, delay: i * 0.1 + 0.2 }} />
                        <motion.text x={c.x - 5} y={c.y + 0.6} textAnchor="end" dominantBaseline="middle"
                            fill="rgba(255,255,255,0.35)" fontSize="2.8" fontFamily="sans-serif"
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: i * 0.1 + 0.6 }}>
                            {c.label}
                        </motion.text>
                    </g>
                ))}
                {outputs.map((o, i) => (
                    <g key={i}>
                        <motion.circle cx={o.x} cy={o.y} r="3.2" fill="#09090f" stroke={o.color} strokeWidth="0.5"
                            initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}}
                            transition={{ type: "spring", stiffness: 220, delay: i * 0.1 + 0.9 }} />
                        <motion.text x={o.x + 5} y={o.y + 0.6} textAnchor="start" dominantBaseline="middle"
                            fill="rgba(255,255,255,0.35)" fontSize="2.8" fontFamily="sans-serif"
                            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: i * 0.1 + 1.2 }}>
                            {o.label}
                        </motion.text>
                    </g>
                ))}
            </svg>
        </div>
    );
}

/* ═══════════════════════════
   FAQ
═══════════════════════════ */
function FAQ({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div variants={sc}
            className="rounded-xl overflow-hidden cursor-pointer transition-all duration-250"
            style={{
                background: open ? "rgba(99,102,241,0.05)" : "rgba(255,255,255,0.015)",
                border: open ? "1px solid rgba(99,102,241,0.18)" : "1px solid rgba(255,255,255,0.05)",
            }}
            onClick={() => setOpen(!open)}>
            <div className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="text-sm font-medium text-white/80">{q}</span>
                <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }} className="shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="rgba(129,140,248,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </motion.div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                        <p className="px-6 pb-5 text-sm text-white/40 leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ═══════════════════════════
   FEATURE ROW
═══════════════════════════ */
function FeatureRow({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
    return (
        <motion.div variants={sc} className="flex gap-4 p-5 rounded-xl group transition-all duration-250"
            style={{ background: "rgba(255,255,255,0.016)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-500/15 transition-all duration-250"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(165,180,252,0.7)" }}>
                <Icon size={15} strokeWidth={1.5} />
            </div>
            <div>
                <div className="text-[13.5px] font-semibold text-white/82 mb-1">{title}</div>
                <div className="text-[12.5px] text-white/35 leading-relaxed">{desc}</div>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════
   STAT CARD
═══════════════════════════ */
function StatCard({ value, suffix, label, desc, color }: {
    value: number; suffix: string; label: string; desc: string; color: string;
}) {
    return (
        <motion.div variants={sc} className="relative p-6 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)" }}>
            <div className="absolute top-0 left-6 right-6 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${color}55, transparent)` }} />
            <div className="text-[42px] font-black leading-none tracking-tight mb-2" style={{ color }}>
                <Counter target={value} suffix={suffix} />
            </div>
            <div className="text-[13px] font-semibold text-white/78 mb-1">{label}</div>
            <div className="text-[12px] text-white/32 leading-relaxed">{desc}</div>
        </motion.div>
    );
}

/* ═══════════════════════════
   TESTIMONIAL CARD
═══════════════════════════ */
function TestimonialCard({ quote, name, role, company, stars }: {
    quote: string; name: string; role: string; company: string; stars: number;
}) {
    return (
        <motion.div variants={sc} className="p-7 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.055)" }}>
            <div className="flex gap-0.5 mb-4">
                {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={13} fill="#f59e0b" stroke="none" />
                ))}
            </div>
            <p className="text-[14px] text-white/55 leading-relaxed mb-5 italic">"{quote}"</p>
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "white" }}>
                    {name[0]}
                </div>
                <div>
                    <div className="text-sm font-semibold text-white/80">{name}</div>
                    <div className="text-xs text-white/35">{role} · {company}</div>
                </div>
            </div>
        </motion.div>
    );
}

/* ═══════════════════════════
   MAIN PAGE
═══════════════════════════ */
export default function asphaltAIPage() {
    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
                @keyframes shimText { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
                @keyframes floatOrb { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(16px,-20px) scale(1.05)} 70%{transform:translate(-10px,12px) scale(0.96)} }
                @keyframes pulseDot { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.4)} }
                @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                .font-head { font-family: 'Outfit', sans-serif; }
                .font-body { font-family: 'DM Sans', sans-serif; }
                .glow-text { background-size: 200% 100%; animation: shimText 5s ease-in-out infinite; }
            `}</style>

            <div className="font-body bg-[#060609] text-white overflow-x-hidden">

                {/* ══════════════════
                    HERO
                ══════════════════ */}
                <section className="relative pt-40 pb-32 overflow-hidden">
                    {/* Atmosphere */}
                    <div className="absolute -top-48 left-[8%] w-[700px] h-[700px] rounded-full pointer-events-none opacity-70"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 60%)", filter: "blur(100px)", animation: "floatOrb 18s ease-in-out infinite" }} />
                    <div className="absolute top-20 right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.05), transparent 60%)", filter: "blur(80px)", animation: "floatOrb 22s ease-in-out infinite 6s" }} />
                    {/* Grid */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.013]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "80px 80px", maskImage: "radial-gradient(ellipse 70% 60% at 50% 25%, black, transparent 80%)", WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 25%, black, transparent 80%)" }} />
                    {/* Rotating ring */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ width: "600px", height: "600px", animation: "rotateSlow 40s linear infinite", opacity: 0.03 }}>
                        <svg viewBox="0 0 600 600" fill="none">
                            <circle cx="300" cy="300" r="280" stroke="rgba(99,102,241,1)" strokeWidth="1" strokeDasharray="6 12" />
                            <circle cx="300" cy="300" r="200" stroke="rgba(139,92,246,1)" strokeWidth="1" strokeDasharray="4 16" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                        {/* Badge */}
                        <Reveal>
                            <div className="inline-flex items-center gap-3 px-5 py-2 mb-10 rounded-full border border-white/[0.07] backdrop-blur-sm"
                                style={{ background: "rgba(255,255,255,0.02)" }}>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "pulseDot 2.2s ease-in-out infinite" }} />
                                    <span className="text-[10.5px] tracking-[0.25em] uppercase text-white/40 font-head font-medium">
                                        asphalt AI™
                                    </span>
                                </div>
                                <div className="w-px h-3.5" style={{ background: "rgba(255,255,255,0.1)" }} />
                                <span className="text-[10.5px] tracking-[0.2em] uppercase text-white/28 font-medium">
                                    Built on Anthropic 18B
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="font-head text-[clamp(40px,7.5vw,88px)] font-black tracking-[-0.048em] leading-[0.96]">
                                <span className="text-white/95">One AI that connects</span><br />
                                <span className="text-white/95">your </span>
                                <span className="glow-text bg-clip-text text-transparent"
                                    style={{ backgroundImage: "linear-gradient(135deg, #a5b4fc, #c4b5fd, #f0abfc, #a5b4fc)" }}>
                                    customers to you
                                </span>
                            </h1>
                        </Reveal>

                        <Reveal delay={0.22}>
                            <p className="mt-8 text-lg md:text-xl text-white/38 max-w-2xl mx-auto leading-relaxed font-light">
                                asphalt AI™ is a proprietary customer intelligence layer — trained on Anthropic's 18B model and fine-tuned on your business — that handles every inbound conversation, resolves issues instantly, and turns every interaction into a relationship.
                            </p>
                        </Reveal>

                        {/* Tech badge */}
                        <Reveal delay={0.3}>
                            <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                                style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.18)" }}>
                                <Cpu size={12} className="text-indigo-400" />
                                <span className="text-[11px] text-indigo-300/70 font-medium tracking-wide">
                                    Powered by Anthropic 18B · Fine-tuned on your data · Hosted privately
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={0.38}>
                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/book"
                                    className="group px-10 py-4 rounded-full font-bold text-white text-sm tracking-wide flex items-center gap-2.5 transition-all duration-400 hover:shadow-[0_0_55px_rgba(99,102,241,0.24)]"
                                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
                                    See asphalt in Action
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                                <a href="#how-it-works"
                                    className="px-10 py-4 rounded-full border text-white/50 font-medium text-sm tracking-wide hover:border-white/[0.16] hover:text-white transition-all duration-300"
                                    style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                                    How it works ↓
                                </a>
                            </div>
                        </Reveal>

                        {/* Trust indicators */}
                        <Reveal delay={0.48}>
                            <div className="mt-12 flex flex-wrap items-center justify-center gap-5 text-[12px] text-white/22">
                                {["No hallucinations — grounded in your data", "Live across 6+ channels", "Deploys in 48 hours", "You own the model"].map((t, i) => (
                                    <span key={i} className="flex items-center gap-1.5">
                                        <Check size={11} className="text-emerald-400/50" /> {t}
                                    </span>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════
                    LIVE DEMO SECTION
                ══════════════════ */}
                <section className="py-28 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05), transparent 60%)", filter: "blur(80px)" }} />

                    <div className="relative z-10 max-w-6xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">
                            {/* Left text */}
                            <div>
                                <Reveal><Eyebrow>Live across every channel</Eyebrow></Reveal>
                                <Reveal delay={0.08}>
                                    <h2 className="font-head text-[clamp(30px,4.5vw,52px)] font-black tracking-[-0.04em] leading-[1.05] mt-5">
                                        <Glow>One AI.</Glow>
                                        <span className="text-white/92"> Every surface<br />your customers touch.</span>
                                    </h2>
                                </Reveal>
                                <Reveal delay={0.15}>
                                    <p className="mt-5 text-[15.5px] text-white/40 leading-[1.85] font-light">
                                        Your customers don't pick a support channel based on what's convenient for you. They use WhatsApp because it's on their phone. They email because they're at a desk. They message on Slack because that's where the conversation started.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.22}>
                                    <p className="mt-4 text-[15.5px] text-white/40 leading-[1.85] font-light">
                                        asphalt meets them on every channel — with full context of every previous interaction, regardless of where it happened. No more "I already told your colleague about this." No more starting from scratch.
                                    </p>
                                </Reveal>

                                <Reveal delay={0.3}>
                                    <div className="mt-8 grid grid-cols-2 gap-3">
                                        {[
                                            { icon: Globe, label: "Website Chat" },
                                            { icon: MessageCircle, label: "WhatsApp" },
                                            { icon: Inbox, label: "Email" },
                                            { icon: Zap, label: "Slack / Teams" },
                                            { icon: PhoneCall, label: "Voice (beta)" },
                                            { icon: ArrowRight, label: "API — any channel" },
                                        ].map((c, i) => (
                                            <div key={i} className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm text-white/50"
                                                style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
                                                <c.icon size={14} className="text-indigo-400/60" />
                                                {c.label}
                                            </div>
                                        ))}
                                    </div>
                                </Reveal>
                            </div>

                            {/* Right — live chat mock */}
                            <Reveal delay={0.1}>
                                <GlowCard className="rounded-2xl overflow-hidden"
                                    style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                    {/* Titlebar */}
                                    <div className="flex items-center gap-3 px-5 py-4 border-b"
                                        style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.012)" }}>
                                        <div className="flex gap-1.5">
                                            {["#f87171", "#fbbf24", "#34d399"].map((c, i) => (
                                                <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-white/25 tracking-wide">asphalt AI™ — Customer Interface</span>
                                        <div className="ml-auto flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "pulseDot 2s infinite" }} />
                                            <span className="text-[10px] text-white/25">Active</span>
                                        </div>
                                    </div>
                                    <LiveChatMock />
                                </GlowCard>
                            </Reveal>
                        </div>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════
                    THE MODEL
                ══════════════════ */}
                <section className="py-28 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[450px] h-[450px] pointer-events-none"
                        style={{ background: "radial-gradient(circle at right top, rgba(99,102,241,0.06), transparent 65%)", filter: "blur(80px)" }} />

                    <div className="relative z-10 max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>The technology</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(30px,5vw,54px)] font-black tracking-[-0.04em] leading-[1.04] mt-5">
                                    <span className="text-white/92">Built on Anthropic 18B.</span><br />
                                    <Glow>Shaped by your business.</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-[16px] text-white/38 max-w-2xl mx-auto leading-relaxed">
                                    asphalt™ isn't a chatbot wrapper. It's a purpose-built AI layer using one of the most capable language models available, fine-tuned to understand your products, customers, and context at a level generic tools never can.
                                </p>
                            </Reveal>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                            {/* Architecture diagram */}
                            <Reveal>
                                <GlowCard className="rounded-2xl p-7"
                                    style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                    <p className="text-[10px] tracking-[0.22em] uppercase text-white/22 mb-5 font-medium">Model architecture</p>
                                    {/* Layered cards */}
                                    {[
                                        { label: "Anthropic 18B Foundation", sub: "State-of-the-art reasoning, language, and safety alignment", color: "#6366f1", depth: 0 },
                                        { label: "RAG Layer — Your Knowledge Base", sub: "Live retrieval from your docs, CRM, product catalogue, and FAQs", color: "#8b5cf6", depth: 1 },
                                        { label: "Fine-Tuning — Your Business Logic", sub: "Trained on your interaction history, tone, and resolution patterns", color: "#a78bfa", depth: 2 },
                                        { label: "asphalt™ Orchestration Layer", sub: "Action routing, escalation logic, CRM sync, and multi-channel dispatch", color: "#c4b5fd", depth: 3 },
                                    ].map((layer, i) => (
                                        <motion.div key={i}
                                            initial={{ opacity: 0, x: -16 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            className="relative mb-2 last:mb-0 p-4 rounded-xl"
                                            style={{
                                                background: `rgba(${layer.depth === 0 ? "99,102,241" : layer.depth === 1 ? "139,92,246" : layer.depth === 2 ? "167,139,250" : "196,181,253"},0.06)`,
                                                border: `1px solid rgba(${layer.depth === 0 ? "99,102,241" : "139,92,246"},0.15)`,
                                                marginLeft: `${layer.depth * 10}px`,
                                            }}>
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: layer.color }} />
                                                <div>
                                                    <div className="text-xs font-semibold text-white/80">{layer.label}</div>
                                                    <div className="text-[11px] text-white/35 mt-0.5">{layer.sub}</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </GlowCard>
                            </Reveal>

                            {/* Right text */}
                            <div className="space-y-5 text-[15px] text-white/40 leading-[1.85] font-light">
                                <Reveal>
                                    <p>
                                        The Anthropic 18B model gives asphalt™ its reasoning core — the ability to understand nuanced requests, follow complex multi-step conversations, stay within safe operational bounds, and produce responses that feel genuinely human. Not a template. Not a decision tree.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.08}>
                                    <p>
                                        <span className="text-white/78 font-medium">The RAG layer connects the model to your live data.</span> Every time a customer asks about their order, account, product, or policy, asphalt retrieves the exact relevant information from your knowledge base in real time — so the answer is always accurate, always current.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.14}>
                                    <p>
                                        Fine-tuning on your interaction history teaches the model how your business talks, how your team resolves issues, and what your customers actually need — not what a generic training dataset assumed they would. The difference is immediately obvious in the quality of responses.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.2}>
                                    <p>
                                        The orchestration layer is where asphalt™ moves from conversation to action. It updates your CRM, creates support tickets, triggers refunds, adjusts subscriptions, dispatches notifications — all without a human in the loop, unless the logic explicitly requires one.
                                    </p>
                                </Reveal>
                            </div>
                        </div>

                        {/* Stats */}
                        <SG className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard value={18} suffix="B" label="Parameter Foundation" desc="Anthropic's 18B model at the core — state-of-the-art reasoning" color="#6366f1" />
                            <StatCard value={94} suffix="%" label="First-Contact Resolution" desc="Queries resolved without escalation to a human agent" color="#8b5cf6" />
                            <StatCard value={48} suffix="h" label="To Full Deployment" desc="From signed agreement to live customer-facing AI" color="#a78bfa" />
                            <StatCard value={6} suffix="+" label="Channels Simultaneously" desc="One model, consistent context across every touchpoint" color="#c4b5fd" />
                        </SG>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════
                    HOW IT WORKS
                ══════════════════ */}
                <section id="how-it-works" className="py-28">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
                            <div>
                                <Reveal><Eyebrow>Connection topology</Eyebrow></Reveal>
                                <Reveal delay={0.08}>
                                    <h2 className="font-head text-[clamp(30px,4.5vw,52px)] font-black tracking-[-0.04em] leading-[1.05] mt-5">
                                        <span className="text-white/92">Every message in.</span><br />
                                        <Glow>The right action out.</Glow>
                                    </h2>
                                </Reveal>
                                <Reveal delay={0.15}>
                                    <p className="mt-5 text-[15.5px] text-white/40 leading-[1.85] font-light">
                                        asphalt™ sits at the centre of your customer communication graph. It ingests from every channel simultaneously, reasons over the full conversation context, and dispatches the right action — whether that's a reply, a CRM update, a ticket, or an escalation.
                                    </p>
                                </Reveal>
                                <Reveal delay={0.22}>
                                    <div className="mt-7 space-y-3">
                                        {[
                                            "Full conversation memory across all channels",
                                            "Real-time action dispatch — no human in the loop",
                                            "Escalation to your team only when genuinely needed",
                                            "Every interaction logged, searchable, and auditable",
                                        ].map((p, i) => (
                                            <div key={i} className="flex items-center gap-2.5 text-[14px] text-white/50">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                                {p}
                                            </div>
                                        ))}
                                    </div>
                                </Reveal>
                            </div>

                            <Reveal delay={0.1}>
                                <GlowCard className="rounded-2xl p-6"
                                    style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.07)" }}>
                                    <p className="text-[10px] tracking-[0.22em] uppercase text-white/22 mb-4 font-medium">Live connection map</p>
                                    <ConnectionViz />
                                </GlowCard>
                            </Reveal>
                        </div>

                        {/* 3-step flow */}
                        <Reveal>
                            <h3 className="font-head text-2xl font-black text-white/88 mb-8 tracking-tight text-center">From first message to resolved interaction</h3>
                        </Reveal>
                        <SG className="grid md:grid-cols-3 gap-4 mb-16">
                            {[
                                {
                                    n: "01", icon: MessageCircle, title: "Customer sends a message",
                                    desc: "On any channel — website, WhatsApp, email, Slack. asphalt receives it in under 100ms and pulls their full interaction history from across every previous conversation.",
                                    time: "< 100ms",
                                },
                                {
                                    n: "02", icon: Brain, title: "asphalt reasons & retrieves",
                                    desc: "The 18B model analyses intent, retrieves relevant live data from your knowledge base and CRM, and generates a precise, contextual response — grounded in facts, not guesswork.",
                                    time: "< 2 seconds",
                                },
                                {
                                    n: "03", icon: Zap, title: "Action dispatched",
                                    desc: "The response is sent instantly. Any required actions — CRM update, order change, ticket creation, team alert — are executed in the same flow. Customer gets an answer and an outcome.",
                                    time: "Same response",
                                },
                            ].map((step, i) => (
                                <motion.div key={i} variants={sc} className="relative p-7 rounded-2xl overflow-hidden"
                                    style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                    <div className="absolute -top-3 -right-2 font-head text-[88px] font-900 leading-none select-none pointer-events-none"
                                        style={{ color: "rgba(255,255,255,0.016)" }}>{step.n}</div>
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

                {/* ══════════════════
                    WHAT asphalt DOES
                ══════════════════ */}
                <section className="py-28 relative overflow-hidden">
                    <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] pointer-events-none"
                        style={{ background: "radial-gradient(circle at left, rgba(139,92,246,0.05), transparent 65%)", filter: "blur(80px)" }} />

                    <div className="relative z-10 max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>Full capability set</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(28px,4.5vw,50px)] font-black tracking-[-0.04em] leading-[1.06] mt-5">
                                    <span className="text-white/92">What asphalt™ </span><Glow>actually does</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-4 text-[16px] text-white/38 max-w-xl mx-auto leading-relaxed">
                                    Not just a chat interface. A complete customer relationship intelligence system.
                                </p>
                            </Reveal>
                        </div>

                        <SG className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                                { icon: MessageCircle, title: "Conversational Resolution", desc: "Handle support, sales, and account queries end-to-end — from first message to fully resolved outcome, no human needed." },
                                { icon: Brain, title: "Intent Understanding", desc: "The 18B model understands nuance, frustration, urgency, and ambiguity — and responds appropriately to each." },
                                { icon: RefreshCcw, title: "Cross-Channel Memory", desc: "Every conversation is unified. A customer who emailed yesterday and messages on WhatsApp today gets full context continuity." },
                                { icon: Zap, title: "Live Action Execution", desc: "Process refunds, update orders, change plans, create tickets, assign tasks — without opening a single dashboard." },
                                { icon: HeartHandshake, title: "Relationship Building", desc: "asphalt remembers preferences, past issues, and communication style — and uses that to make every interaction feel personal." },
                                { icon: TrendingUp, title: "Upsell & Retention Logic", desc: "Identify upgrade opportunities, flag churn risk, and surface the right offer at the right moment — automatically." },
                                { icon: Shield, title: "Safe by Default", desc: "Built on Anthropic's Constitutional AI — asphalt won't hallucinate, won't go off-script, and escalates before making uncertain decisions." },
                                { icon: BarChart3, title: "Interaction Analytics", desc: "Every conversation generates data — resolution rates, sentiment trends, common issues, response quality scores." },
                                { icon: Users, title: "Seamless Human Handoff", desc: "When asphalt decides a human is needed, it transfers with full context pre-loaded so the agent starts informed, not from scratch." },
                                { icon: Lock, title: "Data Privacy Guaranteed", desc: "Your customer data never trains public models. Full GDPR alignment, end-to-end encryption, and audit logging." },
                                { icon: Globe, title: "Multilingual", desc: "asphalt speaks your customers' language — natively supporting 40+ languages with no quality degradation." },
                                { icon: Activity, title: "Real-Time Monitoring", desc: "Live dashboards showing every active conversation, queue depth, resolution rates, and escalation frequency." },
                            ].map((f, i) => <FeatureRow key={i} icon={f.icon} title={f.title} desc={f.desc} />)}
                        </SG>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════
                    USE CASES
                ══════════════════ */}
                <section className="py-28">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>Deployment scenarios</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(28px,4.5vw,50px)] font-black tracking-[-0.04em] leading-[1.06] mt-5">
                                    <Glow>asphalt™ across</Glow>
                                    <span className="text-white/92"> every team</span>
                                </h2>
                            </Reveal>
                        </div>

                        <SG className="grid md:grid-cols-2 gap-4 mb-8">
                            {[
                                {
                                    title: "Customer Support", icon: HeartHandshake, color: "#6366f1",
                                    desc: "Replace the tier-1 support queue. asphalt resolves the majority of tickets instantly — refunds, order status, account changes, billing queries, product questions — and escalates intelligently when human judgment is required.",
                                    items: ["Handle 70%+ of tickets without any human", "Escalate with full context pre-loaded for agent", "Auto-close resolved tickets and send CSAT", "Learn from every resolved interaction"],
                                },
                                {
                                    title: "Sales Assistance", icon: TrendingUp, color: "#8b5cf6",
                                    desc: "asphalt qualifies, nurtures, and converts inbound leads — answering product questions, scheduling demos, and surfacing the right offer at the right moment based on each prospect's behaviour and intent signals.",
                                    items: ["Qualify leads 24/7 on website and WhatsApp", "Book demos directly into your team's calendar", "Surface upsell opportunities on active accounts", "Draft personalised follow-ups from CRM context"],
                                },
                                {
                                    title: "Account Management", icon: Users, color: "#a78bfa",
                                    desc: "For B2B businesses, asphalt becomes the always-available account intelligence layer — answering usage questions, surfacing renewal risks, and ensuring high-value customers always feel prioritised.",
                                    items: ["Proactive check-ins on underutilising accounts", "Instant answers to contract and billing queries", "Flag churn signals and trigger retention flows", "Executive summary generation on request"],
                                },
                                {
                                    title: "E-commerce Operations", icon: Zap, color: "#c4b5fd",
                                    desc: "For high-volume consumer businesses, asphalt handles the entire post-purchase journey — order tracking, returns, exchanges, complaints, and loyalty rewards — without a single human touch.",
                                    items: ["Order status, updates, and ETA across channels", "Self-serve returns and exchange processing", "Refund execution with instant confirmation", "Loyalty and reward programme management"],
                                },
                            ].map((uc, i) => (
                                <motion.div key={i} variants={sc} className="p-8 rounded-2xl"
                                    style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)" }}>
                                    <div className="flex items-start gap-4 mb-5">
                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                            style={{ background: `rgba(99,102,241,0.1)`, border: `1px solid rgba(99,102,241,0.2)`, color: uc.color }}>
                                            <uc.icon size={18} strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <h4 className="font-head text-lg font-800 text-white/88 tracking-tight">{uc.title}</h4>
                                        </div>
                                    </div>
                                    <p className="text-[14px] text-white/40 leading-relaxed mb-5">{uc.desc}</p>
                                    <ul className="space-y-2.5">
                                        {uc.items.map((item, j) => (
                                            <li key={j} className="flex gap-2.5 text-[13px] text-white/38">
                                                <ChevronRight size={13} className="text-indigo-400/40 shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </SG>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════
                    TESTIMONIALS
                ══════════════════ */}
                <section className="py-28 relative overflow-hidden">
                    <div className="absolute top-1/2 right-0 w-[450px] h-[450px] pointer-events-none"
                        style={{ background: "radial-gradient(circle at right, rgba(99,102,241,0.05), transparent 65%)", filter: "blur(80px)" }} />
                    <div className="relative z-10 max-w-5xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <Reveal><Eyebrow>Client results</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(28px,4.5vw,48px)] font-black tracking-[-0.04em] leading-[1.06] mt-5">
                                    <span className="text-white/92">What happens when</span><br />
                                    <Glow>customers actually get answers</Glow>
                                </h2>
                            </Reveal>
                        </div>
                        <SG className="grid md:grid-cols-3 gap-4">
                            <TestimonialCard
                                quote="We went from a 14-hour average first response time to under 90 seconds. Our CSAT went from 3.2 to 4.7 in six weeks. The team now handles edge cases, not the queue."
                                name="Marta K." role="Head of Support" company="SaaS — 12k customers" stars={5} />
                            <TestimonialCard
                                quote="asphalt handles our WhatsApp channel completely — order tracking, returns, product questions. What used to take 3 staff members now runs autonomously, and our customers prefer it."
                                name="Raj P." role="Operations Director" company="E-commerce — 40k orders/month" stars={5} />
                            <TestimonialCard
                                quote="The AI knows our product better than most of our junior staff. It answers technical questions we'd normally escalate to a solutions engineer. The accuracy is genuinely impressive."
                                name="Sophie L." role="VP Customer Success" company="B2B SaaS — Enterprise tier" stars={5} />
                        </SG>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════
                    DEPLOYMENT TIMELINE
                ══════════════════ */}
                <section className="py-28">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <Reveal><Eyebrow>Deployment process</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(28px,4vw,48px)] font-black tracking-[-0.04em] leading-[1.06] mt-5">
                                    <span className="text-white/92">Live in </span><Glow>48 hours</Glow>
                                </h2>
                            </Reveal>
                            <Reveal delay={0.15}>
                                <p className="mt-5 text-[16px] text-white/38 max-w-xl mx-auto leading-relaxed">
                                    No months-long implementations. No armies of consultants. A structured, fast-path deployment that gets asphalt™ handling real conversations within two days.
                                </p>
                            </Reveal>
                        </div>

                        <SG className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { n: "01", icon: Clock, title: "Discovery — Hour 0", desc: "We audit your customer data, map your most common query types, and define the resolution logic. 2-hour session, fully structured." },
                                { n: "02", icon: Activity, title: "Ingestion — Day 1", desc: "We ingest your knowledge base, connect your CRM, and configure the RAG layer. No engineering required from your side." },
                                { n: "03", icon: Brain, title: "Fine-Tuning — Day 1–2", desc: "The Anthropic 18B base is fine-tuned on your interaction history and calibrated to your brand voice and resolution standards." },
                                { n: "04", icon: Activity, title: "Go Live — Day 2", desc: "asphalt is deployed to your channels. We monitor the first 72 hours live and optimise based on real conversation data." },
                            ].map((step, i) => (
                                <motion.div key={i} variants={sc} className="relative p-7 rounded-2xl overflow-hidden"
                                    style={{ background: "rgba(255,255,255,0.022)", border: "1px solid rgba(255,255,255,0.055)" }}>
                                    <div className="absolute -top-3 -right-2 font-head text-[80px] font-900 leading-none select-none pointer-events-none"
                                        style={{ color: "rgba(255,255,255,0.015)" }}>{step.n}</div>
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.18)", color: "#818cf8" }}>
                                        <step.icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-head text-sm font-700 text-white/85 mb-2">{step.title}</h3>
                                    <p className="text-[13px] text-white/38 leading-relaxed">{step.desc}</p>
                                </motion.div>
                            ))}
                        </SG>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════
                    FAQ
                ══════════════════ */}
                <section className="py-28">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <Reveal><Eyebrow>Questions</Eyebrow></Reveal>
                            <Reveal delay={0.08}>
                                <h2 className="font-head text-[clamp(26px,4vw,42px)] font-black tracking-[-0.035em] mt-5 text-white/92">
                                    Frequently asked
                                </h2>
                            </Reveal>
                        </div>
                        <SG className="space-y-3">
                            {[
                                { q: "What is Anthropic 18B and why does it matter?", a: "Anthropic's 18B model is one of the most capable and safest language models available — trained with Constitutional AI to be helpful, honest, and harmless. For customer-facing applications, this matters enormously: it means asphalt won't hallucinate, won't go off-script, and will escalate when it's uncertain rather than guessing. It's the same model family that powers Claude, which consistently tops safety and capability benchmarks." },
                                { q: "How is asphalt different from a regular chatbot?", a: "A traditional chatbot follows decision trees — if the customer says X, say Y. asphalt reasons. It reads full conversation context, retrieves live data from your systems, understands nuance and frustration, executes real actions (not just replies), and improves over time. It's closer to a very well-trained member of your support team than it is to a FAQ bot." },
                                { q: "Will it replace my customer support team?", a: "asphalt handles the volume work — the repetitive, routine queries that currently consume your team's time. Your team shifts to handling complex, high-value, and genuinely ambiguous situations where human judgment adds real value. Most clients find team morale improves significantly when they stop dealing with 'where's my order' for the 300th time." },
                                { q: "How does it stay accurate? What about hallucinations?", a: "This is why the RAG architecture matters. asphalt only answers using information you've explicitly provided — your documentation, your CRM data, your product catalogue. It doesn't speculate or invent. When it doesn't have a reliable answer, it says so and escalates. The Anthropic 18B base model has industry-leading hallucination resistance, and the RAG layer grounds it in your specific facts." },
                                { q: "Is my customer data used to train public models?", a: "Never. Your data is used exclusively to fine-tune your private instance of asphalt. It never touches Anthropic's public training pipeline and is never shared with any other customer. You can also request full data deletion at any time. Every deployment includes a data processing agreement that satisfies GDPR and standard enterprise data requirements." },
                                { q: "What does it cost?", a: "asphalt™ is priced as a fixed monthly subscription based on conversation volume and channels. There are no per-resolution fees and no usage surprises. Setup and fine-tuning is included. Most clients see positive ROI within the first month from support cost reduction alone. Book a call and we'll give you an accurate quote based on your specific volumes within 24 hours." },
                            ].map((f, i) => <FAQ key={i} q={f.q} a={f.a} />)}
                        </SG>
                    </div>
                </section>

                <Hr />

                {/* ══════════════════
                    FINAL CTA
                ══════════════════ */}
                <section className="py-36 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none"
                        style={{ background: "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(99,102,241,0.08), transparent 70%)" }} />
                    <div className="absolute inset-0 pointer-events-none opacity-[0.012]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
                    {/* Rotating decorative ring */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{ width: "500px", height: "500px", animation: "rotateSlow 60s linear infinite", opacity: 0.04 }}>
                        <svg viewBox="0 0 500 500" fill="none">
                            <circle cx="250" cy="250" r="230" stroke="rgba(139,92,246,1)" strokeWidth="1" strokeDasharray="4 14" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                                style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)" }}>
                                <Sparkles size={12} className="text-indigo-400" />
                                <span className="text-[11px] text-indigo-300/70 font-medium tracking-wide">asphalt AI™ — Available Now</span>
                            </div>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h2 className="font-head text-[clamp(34px,5.5vw,64px)] font-black tracking-[-0.045em] leading-[1.02]">
                                <span className="text-white/92">Your customers deserve</span><br />
                                <span className="glow-text bg-clip-text text-transparent"
                                    style={{ backgroundImage: "linear-gradient(135deg, #a5b4fc, #c4b5fd, #f0abfc, #a5b4fc)" }}>
                                    an instant answer
                                </span>
                            </h2>
                        </Reveal>
                        <Reveal delay={0.18}>
                            <p className="mt-7 text-lg text-white/35 max-w-lg mx-auto leading-relaxed font-light">
                                Book a 30-minute call. We'll show you asphalt™ live, walk through how it would work for your specific customer base, and give you a deployment plan the same day.
                            </p>
                        </Reveal>
                        <Reveal delay={0.28}>
                            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/book"
                                    className="group px-12 py-4 rounded-full font-bold text-white text-sm tracking-wide flex items-center gap-2.5 transition-all duration-400 hover:shadow-[0_0_60px_rgba(99,102,241,0.28)]"
                                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed, #a855f7)" }}>
                                    Book a Demo Call
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                                </Link>
                                <Link href="/contact"
                                    className="px-12 py-4 rounded-full border text-white/45 font-medium text-sm tracking-wide hover:text-white hover:border-white/[0.18] transition-all duration-300"
                                    style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                                    Talk to the Team
                                </Link>
                            </div>
                        </Reveal>
                        <Reveal delay={0.38}>
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[12px] text-white/22">
                                {["Live in 48 hours", "No engineering required", "Fixed monthly pricing", "You own the model"].map((t, i) => (
                                    <span key={i} className="flex items-center gap-1.5">
                                        <Check size={11} className="text-emerald-400/50" />{t}
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