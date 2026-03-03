"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import AmbientGlow from "./AmbientGlow";

const words = ["more sales", "faster growth", "loyal customers", "higher turnover", "real results"];

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

            {/* Content — upper 60% of viewport, clean space above the glow */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-0 text-center">

                {/* Category tag */}
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
                    className="mb-11"
                >
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] text-[10.5px] tracking-[0.22em] uppercase text-white/30 font-medium">
                        <span className="w-1 h-1 rounded-full bg-violet-400/60 inline-block" />
                        Revenue operations · MSMEs
                    </span>
                </motion.div>

                {/* Headline — tight, vertical rhythm is everything */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-semibold tracking-[-0.045em] leading-[0.95] max-w-4xl"
                    style={{ fontSize: "clamp(48px, 8.5vw, 92px)" }}
                >
                    <span className="block text-white/95">Your business,</span>
                    <span className="block text-white/30 mt-1.5">engineered for</span>
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

                {/* Sub copy — two distinct tiers, no paragraph */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.85, duration: 1, ease: "easeOut" }}
                    className="mt-11 space-y-3"
                >
                    <p
                        className="font-light leading-[1.45] tracking-[-0.005em] mx-auto"
                        style={{
                            fontSize: "clamp(15px, 1.8vw, 19px)",
                            maxWidth: "500px",
                            color: "rgba(255,255,255,0.52)",
                        }}
                    >
                        More customers handled.{" "}
                        <span style={{ color: "rgba(255,255,255,0.88)" }}>More revenue closed.</span>
                        <br />
                        No extra staff. No extra overhead.
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
                        Start growing
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[12.5px] tracking-[0.04em] uppercase font-medium text-white/35 border border-white/[0.07] hover:text-white/60 hover:border-white/15 transition-all duration-200"
                    >
                        See how it works
                    </Link>
                </motion.div>

                {/* Proof strip — flush at bottom of content, above the glow */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1.2 }}
                    className="mt-20 mb-0 flex items-center justify-center"
                >
                    <div className="flex items-center gap-7">
                        {[
                            { n: "3×", label: "response speed" },
                            { n: "40%", label: "fewer drop-offs" },
                            { n: "0", label: "extra hires" },
                        ].map((stat, i) => (
                            <div key={stat.label} className="flex items-center gap-7">
                                {i > 0 && <div className="w-px h-6 bg-white/[0.07]" />}
                                <div className="text-center">
                                    <div
                                        className="font-semibold tracking-tight bg-gradient-to-b from-white/70 to-white/30 bg-clip-text text-transparent"
                                        style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                                    >
                                        {stat.n}
                                    </div>
                                    <div className="text-[10px] text-white/20 tracking-[0.18em] uppercase mt-0.5 font-light">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
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