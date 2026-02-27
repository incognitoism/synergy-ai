"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import AmbientGlow from "./AmbientGlow";

const words = ["business", "workflow", "customer support", "sales pipeline", "operations"];

export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-dark-900">
            {/* Interactive canvas background */}
            <AmbientGlow />

            {/* Noise texture */}
            <div
                className="absolute inset-0 z-[1] opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                }}
            />

            {/* Content — pointer-events-auto so buttons still work */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                >
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="text-sm tracking-[0.25em] uppercase text-slate-500 mb-8 font-mono"
                    >
                        AI infrastructure for modern business
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05]"
                    >
                        <span className="text-white/95 drop-shadow-[0_0_40px_rgba(99,102,241,0.1)]">
                            One AI, built
                        </span>
                        <br />
                        <span className="text-white/95 drop-shadow-[0_0_40px_rgba(99,102,241,0.1)]">
                            entirely for your
                        </span>
                        <br />
                        <span className="relative inline-block mt-2">
                            <motion.span
                                key={wordIndex}
                                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="text-gradient drop-shadow-[0_0_40px_rgba(99,102,241,0.3)]"
                            >
                                {words[wordIndex]}
                            </motion.span>
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        We build custom LLMs trained on your data, your processes, and your
                        customers — so your AI doesn't just assist, it{" "}
                        <span className="text-slate-200">understands</span>.
                    </motion.p>

                    {/* pointer-events-auto on buttons so they're clickable */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.6 }}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
                    >
                        <Link
                            href="/book"
                            className="group px-8 py-4 rounded-full bg-accent hover:bg-accent-dark transition-all duration-300 font-semibold text-white text-sm tracking-wide flex items-center gap-2 hover:shadow-[0_0_50px_rgba(99,102,241,0.25)]"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/services"
                            className="px-8 py-4 rounded-full border border-accent/15 text-accent-light font-medium text-sm tracking-wide hover:border-accent/30 hover:text-white transition-all duration-300"
                        >
                            See how it works
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        className="w-5 h-8 rounded-full border border-accent/15 flex items-start justify-center p-1.5"
                    >
                        <div className="w-1 h-1.5 rounded-full bg-accent-light/30" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}