"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Code, Rocket, Settings } from "lucide-react";
import { useRef, MouseEvent } from "react";
import Link from "next/link";

const offerings = [
    {
        icon: Code,
        label: "AI-Integrated Web Apps",
        title: "Full-stack apps with smart features built in.",
        description:
            "We build web applications with AI woven into the product — chat interfaces, document processing, AI-assisted workflows, and intelligent dashboards. Not AI for the sake of it. AI where it actually helps your users get things done.",
        gradient: "from-[#6366f1] to-[#8b5cf6]",
        glowColor: "99,102,241",
        wide: true,
    },
    {
        icon: Rocket,
        label: "Startup MVPs",
        title: "From idea to working product. Fast.",
        description:
            "We take your concept from wireframe to working product with clean code, a modern stack, and architecture that won't fall apart when you start scaling. You get something you can demo to investors and ship to real users.",
        gradient: "from-[#8b5cf6] to-[#a78bfa]",
        glowColor: "139,92,246",
        wide: false,
    },
    {
        icon: Settings,
        label: "Automation & Internal Tools",
        title: "The systems that save your team hours every week.",
        description:
            "Admin panels, data pipelines, CRM integrations, reporting dashboards, workflow automation. The unsexy stuff that makes your business run smoother — built properly so it doesn't break.",
        gradient: "from-[#06b6d4] to-[#6366f1]",
        glowColor: "6,182,212",
        wide: false,
    },
];

/* ----- Mini UI mockups — pure CSS, feels hand-built ----- */

function DashboardMockup() {
    return (
        <div className="mt-6 pt-5 border-t border-white/[0.04]">
            <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] p-3 space-y-2.5">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                        <div className="w-8 h-1.5 rounded-full bg-white/[0.06]" />
                    </div>
                    <div className="flex gap-1">
                        <div className="w-4 h-1.5 rounded-full bg-white/[0.04]" />
                        <div className="w-4 h-1.5 rounded-full bg-white/[0.04]" />
                    </div>
                </div>
                {/* Chart bars */}
                <div className="flex items-end gap-[3px] h-10 px-1">
                    {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 68].map((h, i) => (
                        <div
                            key={i}
                            className="flex-1 rounded-sm bg-gradient-to-t from-indigo-500/20 to-indigo-500/5"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
                {/* Bottom row */}
                <div className="flex gap-2">
                    <div className="flex-1 h-2 rounded bg-white/[0.03]" />
                    <div className="flex-1 h-2 rounded bg-white/[0.03]" />
                    <div className="flex-1 h-2 rounded bg-indigo-500/10" />
                </div>
            </div>
        </div>
    );
}

function MobileMockup() {
    return (
        <div className="mt-6 pt-5 border-t border-white/[0.04] flex justify-center">
            <div className="w-[100px] rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 space-y-2">
                {/* Status bar */}
                <div className="flex justify-between px-0.5">
                    <div className="w-4 h-1 rounded-full bg-white/[0.06]" />
                    <div className="w-3 h-1 rounded-full bg-white/[0.06]" />
                </div>
                {/* Content blocks */}
                <div className="space-y-1.5">
                    <div className="w-full h-6 rounded bg-violet-500/10" />
                    <div className="w-3/4 h-1.5 rounded-full bg-white/[0.06]" />
                    <div className="w-1/2 h-1.5 rounded-full bg-white/[0.04]" />
                </div>
                {/* Buttons */}
                <div className="flex gap-1">
                    <div className="flex-1 h-3 rounded bg-violet-500/15" />
                    <div className="flex-1 h-3 rounded bg-white/[0.04]" />
                </div>
                {/* List items */}
                <div className="space-y-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded bg-white/[0.04]" />
                            <div className="flex-1 h-1 rounded-full bg-white/[0.05]" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PipelineMockup() {
    return (
        <div className="mt-6 pt-5 border-t border-white/[0.04]">
            <div className="space-y-2">
                {/* Pipeline steps */}
                {[
                    { label: "Ingest", w: "100%", color: "bg-cyan-500/15" },
                    { label: "Transform", w: "75%", color: "bg-indigo-500/15" },
                    { label: "Sync to CRM", w: "60%", color: "bg-violet-500/15" },
                ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                        <span className="text-[9px] font-mono text-slate-600 w-16 text-right shrink-0">{step.label}</span>
                        <div className="flex-1 h-2.5 rounded-full bg-white/[0.02] overflow-hidden">
                            <div className={`h-full rounded-full ${step.color}`} style={{ width: step.w }} />
                        </div>
                        <span className="text-[9px] font-mono text-emerald-500/50">✓</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const mockups = [DashboardMockup, MobileMockup, PipelineMockup];

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

    const Mockup = mockups[index];

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

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <div className="flex-1">
                    {/* Icon + label */}
                    <div className="flex items-center gap-3.5 mb-7">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px] opacity-70 group-hover:opacity-100 transition-all duration-500`}>
                            <div className="w-full h-full rounded-[11px] bg-[#0c0c14] flex items-center justify-center">
                                <item.icon className="w-[17px] h-[17px] text-slate-400 group-hover:text-white transition-colors duration-500" />
                            </div>
                        </div>
                        <span className="text-[10px] tracking-[0.22em] uppercase text-slate-500 font-mono group-hover:text-slate-400 transition-colors duration-300">
                            {item.label}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-semibold text-white/85 mb-3 leading-snug group-hover:text-white transition-colors duration-500 tracking-tight">
                        {item.title}
                    </h3>

                    {/* Underline */}
                    <div className="relative h-[2px] w-10 mb-5 overflow-hidden rounded-full">
                        <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-25 group-hover:opacity-100 transition-opacity duration-500`} />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed font-light group-hover:text-slate-300 transition-colors duration-500 max-w-lg">
                        {item.description}
                    </p>
                </div>

                {/* Mini UI mockup */}
                <Mockup />
            </div>
        </motion.div>
    );
}

export default function Offerings() {
    return (
        <section className="py-28 px-6 relative overflow-hidden">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-grid opacity-40" />

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
                            Real products,{" "}
                            <span className="text-gradient">not slide decks</span>
                        </h2>
                    </div>
                    <p className="text-slate-400 max-w-sm font-light text-sm leading-relaxed md:text-right">
                        We write code, ship features, and build things people actually use. Here&apos;s what we&apos;re good at.
                    </p>
                </motion.div>

                {/* Bento grid */}
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
                            Let&apos;s hop on a call
                        </Link>{" "}
                        and figure it out.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
