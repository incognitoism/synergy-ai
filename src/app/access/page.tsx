"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Fingerprint,
    Network,
    BookOpen,
    ShieldCheck
} from "lucide-react";

export default function AccessPage() {
    // Ultra-lightweight animations (removed CPU-heavy blur animations)
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    return (
        // The main container is now a full-screen flex row, creating the "Division"
        <main className="flex flex-col lg:flex-row min-h-screen w-full bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30">

            {/* ==========================================
          LEFT PANE: BRANDING & TYPOGRAPHY
          ========================================== */}
            <div className="relative w-full lg:w-[55%] flex flex-col justify-center p-10 lg:p-24 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5 bg-[#030108]">

                {/* Highly performant background lighting (No mix-blend-mode, no SVG noise) */}
                <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(79,70,229,0.12)_0%,transparent_60%)] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(192,38,211,0.08)_0%,transparent_60%)] pointer-events-none" />

                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 max-w-2xl">

                    <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
                        <div className="h-px w-8 bg-gradient-to-r from-indigo-500 to-transparent" />
                        <span className="text-[13px] font-semibold tracking-widest text-indigo-400/80 uppercase">
                            With love from SYNERGY LTD.
                        </span>
                    </motion.div>

                    {/* Performance-Optimized Optical Text Glow */}
                    <motion.div variants={fadeUp} className="relative mb-8">
                        {/* The Background Glow - Static blur, very fast to render */}
                        <h1 className="absolute inset-0 text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 blur-[32px] opacity-40 select-none pointer-events-none">
                            Make something<br />Great
                        </h1>

                        {/* The Crisp Foreground Text */}
                        <h1 className="relative text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 leading-[1.05]">
                            Make something<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300">
                                Great
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/50 leading-relaxed font-light max-w-md">
                        The future of business compliant systems. <br />
                        <span className="text-white/80 font-medium">Engineered for scale, security, and precision.</span>
                    </motion.p>
                </motion.div>
            </div>

            {/* ==========================================
          RIGHT PANE: ACTION TILES
          ========================================== */}
            <div className="relative w-full lg:w-[45%] flex flex-col justify-center p-6 md:p-12 lg:p-16 bg-[#0A0A0C]">

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full max-w-2xl mx-auto"
                >

                    {/* TILE 1: Sign In */}
                    <motion.div variants={fadeUp} className="sm:col-span-2">
                        <Link
                            href="/signin"
                            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[20px] bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-3.5 rounded-[14px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors duration-300">
                                    <Fingerprint size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-white/95 mb-1 group-hover:text-white transition-colors">
                                        Client Access
                                    </h3>
                                    <p className="text-[14px] text-white/40 font-light">
                                        Sign in to your deployment dashboards.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 rounded-full bg-white/[0.02] border border-white/[0.05] text-white/30 group-hover:text-white group-hover:bg-white/[0.08] transition-all duration-300 sm:self-center self-end">
                                <ArrowUpRight size={20} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* TILE 2: Provisioning */}
                    <motion.div variants={fadeUp} className="sm:col-span-2">
                        <Link
                            href="/signup"
                            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[20px] bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-3.5 rounded-[14px] bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 transition-colors duration-300">
                                    <Network size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-white/95 mb-1 group-hover:text-white transition-colors">
                                        New Engagement
                                    </h3>
                                    <p className="text-[14px] text-white/40 font-light">
                                        Request bespoke infrastructure access.
                                    </p>
                                </div>
                            </div>

                            <div className="p-3 rounded-full bg-white/[0.02] border border-white/[0.05] text-white/30 group-hover:text-white group-hover:bg-white/[0.08] transition-all duration-300 sm:self-center self-end">
                                <ArrowUpRight size={20} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* TILE 3: Docs */}
                    <motion.div variants={fadeUp}>
                        <Link href="/Documentation" className="group flex flex-col justify-between h-[160px] rounded-[20px] bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.05] text-white/50 group-hover:text-white transition-colors">
                                    <BookOpen size={20} strokeWidth={1.5} />
                                </div>
                                <ArrowUpRight size={20} strokeWidth={1.5} className="text-white/20 group-hover:text-white/80 transition-all duration-300" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-white/90 group-hover:text-white mb-0.5">Documentation</h4>
                                <span className="text-[13px] text-white/40 font-light">API integration guides</span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* TILE 4: Security */}
                    <motion.div variants={fadeUp}>
                        <Link href="/security" className="group flex flex-col justify-between h-[160px] rounded-[20px] bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.05] text-white/50 group-hover:text-white transition-colors">
                                    <ShieldCheck size={20} strokeWidth={1.5} />
                                </div>
                                <ArrowUpRight size={20} strokeWidth={1.5} className="text-white/20 group-hover:text-white/80 transition-all duration-300" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium text-white/90 group-hover:text-white mb-0.5">Security Center</h4>
                                <span className="text-[13px] text-white/40 font-light">Compliance & SOC2</span>
                            </div>
                        </Link>
                    </motion.div>

                </motion.div>
            </div>

        </main>
    );
}