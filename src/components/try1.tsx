"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Brain, Target, Cpu, Layers, ArrowRight } from "lucide-react";
import { useRef, MouseEvent } from "react";

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
    },
    {
        icon: Cpu,
        label: "ML Models",
        title: "Machine learning, tailored to your problem.",
        description:
            "From demand forecasting to anomaly detection — we build, train, and deploy ML models designed around your specific data and business requirements.",
        gradient: "from-[#8b5cf6] to-[#a78bfa]",
        glowColor: "139,92,246",
        stat: "3x",
        statLabel: "prediction accuracy",
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.25, 0.1, 0, 1] }}
            onMouseMove={handleMouse}
            className="group relative rounded-2xl border border-white/[0.06] bg-[#0c0c14]/60 overflow-hidden"
        >
            {/* Mouse-follow glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${smoothX}px ${smoothY}px, rgba(${item.glowColor},0.08), transparent 40%)`,
                }}
            />

            {/* Hover border glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(400px circle at ${smoothX}px ${smoothY}px, rgba(${item.glowColor},0.15), transparent 40%)`,
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "xor",
                    WebkitMaskComposite: "xor",
                    padding: "1px",
                    borderRadius: "1rem",
                }}
            />

            <div className="relative z-10 p-8 md:p-10">
                {/* Top row: icon + label + stat */}
                <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                        {/* Icon with gradient background */}
                        <div
                            className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px] opacity-80 group-hover:opacity-100 transition-opacity duration-500`}
                        >
                            <div className="w-full h-full rounded-[11px] bg-[#0c0c14] flex items-center justify-center">
                                <item.icon className="w-[18px] h-[18px] text-slate-400 group-hover:text-white transition-colors duration-500" />
                            </div>
                        </div>
                        <span className="text-[11px] tracking-[0.2em] uppercase text-slate-500 font-mono group-hover:text-slate-400 transition-colors duration-500">
                            {item.label}
                        </span>
                    </div>

                    {/* Stat pill */}
                    <div className="text-right opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        <span className="text-2xl font-bold text-white">{item.stat}</span>
                        <p className="text-[10px] text-slate-500 tracking-wide mt-0.5">
                            {item.statLabel}
                        </p>
                    </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-semibold text-white/90 mb-3 leading-snug group-hover:text-white transition-colors duration-500">
                    {item.title}
                </h3>

                {/* Animated underline */}
                <div className="relative h-[2px] w-12 mb-5 overflow-hidden rounded-full">
                    <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 leading-relaxed max-w-md font-light group-hover:text-slate-300 transition-colors duration-500">
                    {item.description}
                </p>

                {/* Learn more link — slides in on hover */}
                <div className="mt-6 flex items-center gap-2 text-sm opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    <span
                        className={`bg-clip-text text-transparent bg-gradient-to-r ${item.gradient} font-medium`}
                    >
                        Learn more
                    </span>
                    <ArrowRight
                        className="w-3.5 h-3.5 text-accent-light group-hover:translate-x-1 transition-transform duration-300"
                    />
                </div>
            </div>

            {/* Bottom gradient line */}
            <div
                className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
            />
        </motion.div>
    );
}

export default function Offerings() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Faint background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none">
                <div
                    className="w-full h-full rounded-full opacity-[0.04]"
                    style={{
                        background:
                            "radial-gradient(ellipse, rgba(99,102,241,1) 0%, rgba(139,92,246,0.5) 40%, transparent 70%)",
                    }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
                    className="mb-16 md:mb-20"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 48 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0, 1] }}
                        className="h-[2px] bg-gradient-to-r from-accent to-purple-500 mb-6 rounded-full"
                    />
                    <p className="text-xs tracking-[0.25em] uppercase text-accent-light font-mono mb-4">
                        What we build
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight max-w-xl leading-[1.1]">
                        AI that works{" "}
                        <span className="text-gradient">the way you do</span>
                    </h2>
                    <p className="mt-4 text-slate-400 max-w-lg font-light text-base leading-relaxed">
                        Every solution is custom-engineered around your data, your workflows,
                        and the outcomes that matter to your business.
                    </p>
                </motion.div>

                {/* Cards grid */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                    {offerings.map((item, i) => (
                        <OfferingCard key={item.label} item={item} index={i} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-14 text-center"
                >
                    <p className="text-sm text-slate-500">
                        Not sure what you need?{" "}
                        <a
                            href="/book"
                            className="text-accent-light hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-accent/30 hover:decoration-accent/60"
                        >
                            Book a free strategy call
                        </a>{" "}
                        and we&apos;ll figure it out together.
                    </p>
                </motion.div>
            </div>
        </section >
    );
}