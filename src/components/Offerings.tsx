"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Brain, Target, Cpu, Layers, ArrowRight } from "lucide-react";
import { useRef, MouseEvent } from "react";
import Link from "next/link";

const offerings = [
    {
        icon: Brain,
        label: "Custom LLMs",
        title: "Your data. Your model. Your edge.",
        description:
            "We fine-tune large language models on your internal documents, SOPs, and customer interactions — creating an AI that speaks your language, not generic responses.",
        gradient: "from-[#6366f1] to-[#8b5cf6]",
        glowColor: "99,102,241",
        stat: "40%",
        statLabel: "faster responses",
        tag: "Most popular",
        wide: true, // spans 2 cols on large screens
    },
    {
        icon: Cpu,
        label: "ML Models",
        title: "Machine learning, tailored to your problem.",
        description:
            "From demand forecasting to anomaly detection — we build, train, and deploy ML models designed around your specific data and business requirements.",
        gradient: "from-[#8b5cf6] to-[#a78bfa]",
        glowColor: "139,92,246",
        stat: "3×",
        statLabel: "prediction accuracy",
        tag: null,
        wide: false,
    },
    {
        icon: Target,
        label: "Audience Targeting",
        title: "Hyperspecific. Surgical. Cost-effective.",
        description:
            "AI-driven audience segmentation that identifies and reaches your ideal customers with precision — delivering world-class results at a fraction of traditional ad spend.",
        gradient: "from-[#06b6d4] to-[#6366f1]",
        glowColor: "6,182,212",
        stat: "60%",
        statLabel: "lower ad spend",
        tag: null,
        wide: false,
    },
    {
        icon: Layers,
        label: "Synergy Cloud",
        title: "One platform. Everything connected.",
        description:
            "Deploy, monitor, and scale all your AI models from a single dashboard. The Synergy Cloud handles infrastructure so you can focus on outcomes.",
        gradient: "from-[#a78bfa] to-[#06b6d4]",
        glowColor: "167,139,250",
        stat: "1",
        statLabel: "unified dashboard",
        tag: "New",
        wide: true,
    },
];

function OfferingCard({
    item,
    index,
}: {
    item: (typeof offerings)[0];
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowX = useMotionValue(0);
    const glowY = useMotionValue(0);
    const smoothX = useSpring(glowX, { stiffness: 300, damping: 30 });
    const smoothY = useSpring(glowY, { stiffness: 300, damping: 30 });

    const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        glowX.set(e.clientX - rect.left);
        glowY.set(e.clientY - rect.top);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouse}
            className={`group relative rounded-2xl overflow-hidden ${item.wide ? "md:col-span-2" : ""}`}
            style={{
                background: "rgba(12,12,20,0.7)",
                border: "1px solid rgba(255,255,255,0.06)",
            }}
        >
            {/* Mouse-follow radial glow */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(500px circle at ${smoothX}px ${smoothY}px, rgba(${item.glowColor},0.09), transparent 40%)`,
                }}
            />

            {/* Hover border shimmer */}
            <motion.div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{
                    background: `radial-gradient(350px circle at ${smoothX}px ${smoothY}px, rgba(${item.glowColor},0.18), transparent 40%)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                }}
            />

            {/* Top accent line */}
            <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

            <div className={`relative z-10 p-8 md:p-10 ${item.wide ? "md:flex md:gap-14 md:items-start" : ""}`}>

                {/* Left content */}
                <div className={item.wide ? "md:flex-1" : ""}>
                    {/* Icon row */}
                    <div className="flex items-center justify-between mb-7">
                        <div className="flex items-center gap-3.5">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px] opacity-70 group-hover:opacity-100 transition-all duration-500`}>
                                <div className="w-full h-full rounded-[11px] bg-[#0c0c14] flex items-center justify-center">
                                    <item.icon className="w-[17px] h-[17px] text-slate-400 group-hover:text-white transition-colors duration-500" />
                                </div>
                            </div>
                            <span className="text-[10px] tracking-[0.22em] uppercase text-slate-500 font-mono group-hover:text-slate-400 transition-colors duration-300">
                                {item.label}
                            </span>
                        </div>

                        {item.tag && (
                            <span
                                className={`text-[10px] tracking-widest uppercase font-medium px-2.5 py-1 rounded-full bg-gradient-to-r ${item.gradient} bg-opacity-10`}
                                style={{
                                    background: `linear-gradient(135deg, rgba(${item.glowColor},0.12), rgba(${item.glowColor},0.06))`,
                                    border: `1px solid rgba(${item.glowColor},0.2)`,
                                    color: `rgba(${item.glowColor},0.9)`,
                                }}
                            >
                                {item.tag}
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white/85 mb-3 leading-snug group-hover:text-white transition-colors duration-500 tracking-tight">
                        {item.title}
                    </h3>

                    {/* Animated underline */}
                    <div className="relative h-[2px] w-10 mb-5 overflow-hidden rounded-full">
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-25 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-900" />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors duration-500 max-w-md">
                        {item.description}
                    </p>

                    {/* Learn more */}
                    <div className="mt-6 flex items-center gap-1.5 text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75">
                        <span className={`bg-clip-text text-transparent bg-gradient-to-r ${item.gradient} font-medium`}>
                            Learn more
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                </div>

                {/* Stat — right side for wide cards, top-right for normal */}
                {item.wide ? (
                    <div className="hidden md:flex flex-col items-center justify-center flex-shrink-0 w-44 h-44 rounded-2xl self-center"
                        style={{
                            background: `radial-gradient(circle at center, rgba(${item.glowColor},0.07) 0%, transparent 70%)`,
                            border: `1px solid rgba(${item.glowColor},0.1)`,
                        }}>
                        <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl font-bold text-white tracking-tight"
                        >
                            {item.stat}
                        </motion.span>
                        <p className="text-[11px] text-slate-500 tracking-wider mt-1.5 text-center uppercase font-medium">
                            {item.statLabel}
                        </p>
                    </div>
                ) : (
                    <div className="absolute top-8 right-8 md:top-10 md:right-10 text-right opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-3xl font-bold text-white">{item.stat}</span>
                        <p className="text-[10px] text-slate-500 tracking-wide mt-0.5 uppercase">{item.statLabel}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default function Offerings() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] pointer-events-none">
                <div className="w-full h-full rounded-full opacity-[0.035]"
                    style={{ background: "radial-gradient(ellipse, rgba(99,102,241,1) 0%, rgba(139,92,246,0.5) 40%, transparent 70%)" }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
                >
                    <div>
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 40 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="h-[2px] bg-gradient-to-r from-accent to-purple-500 mb-5 rounded-full"
                        />
                        <p className="text-[10px] tracking-[0.28em] uppercase text-accent-light font-mono mb-4">
                            What we build
                        </p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl leading-[1.1]">
                            AI that works{" "}
                            <span className="text-gradient">the way you do</span>
                        </h2>
                    </div>
                    <p className="text-slate-400 max-w-sm font-light text-sm leading-relaxed md:text-right">
                        Every solution is custom-engineered around your data, your workflows, and the outcomes that matter most.
                    </p>
                </motion.div>

                {/* Bento grid — wide cards span full width, narrows share a row */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    {offerings.map((item, i) => (
                        <OfferingCard key={item.label} item={item} index={i} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-14 text-center"
                >
                    <p className="text-sm text-slate-500">
                        Not sure what you need?{" "}
                        <Link
                            href="/book"
                            className="text-accent-light hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-accent/30 hover:decoration-accent/60"
                        >
                            Book a free strategy call
                        </Link>{" "}
                        and we&apos;ll figure it out together.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}