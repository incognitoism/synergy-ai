"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import AmbientGlow from "./AmbientGlow";

const words = ["actually works", "saves you time", "your users love", "grows with you", "makes sense"];

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 3200);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[100vh] flex flex-col overflow-hidden bg-dark-900">
            <AmbientGlow />

            {/* Grain */}
            <div
                className="absolute inset-0 z-[1] opacity-[0.018] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "192px 192px",
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-0 text-center">

                {/* Availability status — real studios do this */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.07] bg-white/[0.03] text-[11px] tracking-[0.08em] text-white/35 font-medium">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                        </span>
                        Available for new projects
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-semibold tracking-[-0.045em] leading-[0.95] max-w-4xl"
                    style={{ fontSize: "clamp(48px, 8.5vw, 92px)" }}
                >
                    <span className="block text-white/95">We build software</span>
                    <span className="block text-white/30 mt-1.5">that</span>
                    <span className="relative block mt-2.5 min-h-[1.1em]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={wordIndex}
                                initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-gradient-to-r from-indigo-300 via-violet-200 to-fuchsia-300 bg-clip-text text-transparent"
                            >
                                {words[wordIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </motion.h1>

                {/* Sub copy */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.85, duration: 1, ease: "easeOut" }}
                    className="mt-11 space-y-3"
                >
                    <p
                        className="font-light leading-[1.55] tracking-[-0.005em] mx-auto"
                        style={{
                            fontSize: "clamp(15px, 1.8vw, 19px)",
                            maxWidth: "540px",
                            color: "rgba(255,255,255,0.52)",
                        }}
                    >
                        We&apos;re a small team that builds web apps, internal tools, and AI integrations
                        for startups and growing businesses.{" "}
                        <span style={{ color: "rgba(255,255,255,0.82)" }}>No fluff. Just good software.</span>
                    </p>
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-11 flex flex-col sm:flex-row items-center justify-center gap-3"
                >
                    <Link
                        href="/book"
                        className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-[12.5px] font-semibold tracking-[0.04em] uppercase hover:bg-white/92 transition-all duration-200 hover:scale-[1.015] active:scale-[0.985]"
                    >
                        Book a free call
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[12.5px] tracking-[0.04em] uppercase font-medium text-white/35 border border-white/[0.07] hover:text-white/60 hover:border-white/15 transition-all duration-200"
                    >
                        See what we do
                    </Link>
                </motion.div>

                {/* Floating mini terminal — feels handcrafted */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 1 }}
                    className="mt-16 w-full max-w-md mx-auto"
                >
                    <div className="rounded-xl border border-white/[0.06] bg-[#0c0c14]/80 backdrop-blur-sm overflow-hidden">
                        {/* Terminal header */}
                        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.04]">
                            <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
                            <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
                            <div className="w-2 h-2 rounded-full bg-white/[0.08]" />
                            <span className="ml-2 text-[10px] text-slate-600 font-mono">~/synergy/current-project</span>
                        </div>
                        {/* Terminal content */}
                        <div className="px-4 py-3 font-mono text-[12px] leading-[1.8] text-slate-500">
                            <div><span className="text-emerald-500/60">$</span> <span className="text-slate-400">npm run build</span></div>
                            <div className="text-slate-600">✓ Compiled successfully</div>
                            <div className="text-slate-600">✓ 47 pages generated</div>
                            <div className="text-slate-600">✓ Deployed to production</div>
                            <div className="mt-1"><span className="text-emerald-500/60">$</span> <span className="text-slate-500 animate-pulse">_</span></div>
                        </div>
                    </div>
                </motion.div>

            </div>

            {/* Scroll pill */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
                    className="w-[18px] h-7 rounded-full border border-white/[0.07] flex items-start justify-center pt-1.5"
                >
                    <div className="w-0.5 h-1.5 rounded-full bg-white/15" />
                </motion.div>
            </motion.div>
        </section>
    );
}
