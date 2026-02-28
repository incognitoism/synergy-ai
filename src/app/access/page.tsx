"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
    ArrowUpRight,
    Fingerprint,
    Network,
    BookOpen,
    ShieldCheck
} from "lucide-react";

export default function AccessPage() {
    // Initial Load-in Animations
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
        }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 }
        }
    };

    return (
        <main className="flex flex-col lg:flex-row min-h-screen w-full bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30">

            {/* ==========================================
          LEFT PANE: BRANDING, TYPOGRAPHY & ANIMATED BG
          ========================================== */}
            <div className="relative w-full lg:w-[55%] flex flex-col justify-center p-10 lg:p-24 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5 bg-[#030108]">

                {/* --- 1. INFINITE PANNING GRID --- */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_10%,transparent_100%)]">
                    <motion.div
                        // Animates exactly the height of one grid cell (64px) for a seamless infinite loop
                        animate={{ y: [0, -64] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="absolute inset-[-100%] bg-[linear-gradient(to_right,#4f46e50a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e50a_1px,transparent_1px)] bg-[size:64px_64px]"
                    />
                </div>

                {/* --- 2. FALLING DATA STREAMS --- */}
                {/* Stream 1 */}
                <motion.div
                    animate={{ y: ["-100%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: 0 }}
                    className="absolute left-[15%] top-0 w-[1px] h-[30%] bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent pointer-events-none"
                />
                {/* Stream 2 */}
                <motion.div
                    animate={{ y: ["-100%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 5.5, ease: "linear", delay: 1.5 }}
                    className="absolute left-[65%] top-0 w-[1px] h-[40%] bg-gradient-to-b from-transparent via-fuchsia-500/50 to-transparent pointer-events-none"
                />
                {/* Stream 3 */}
                <motion.div
                    animate={{ y: ["-100%", "300%"] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "linear", delay: 2 }}
                    className="absolute left-[85%] top-0 w-[1px] h-[20%] bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent pointer-events-none"
                />

                {/* --- 3. BREATHING AMBIENT LIGHTS --- */}
                <motion.div
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(79,70,229,0.12)_0%,transparent_60%)] pointer-events-none"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.9, 0.5]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(192,38,211,0.08)_0%,transparent_60%)] pointer-events-none"
                />

                {/* --- FOREGROUND CONTENT --- */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="relative z-10 max-w-2xl">

                    <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 32 }}
                            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            className="h-px bg-gradient-to-r from-indigo-500 to-transparent"
                        />
                        <span className="text-[13px] font-semibold tracking-widest text-indigo-400/80 uppercase">
                            With love from SYNERGY LTD.
                        </span>
                    </motion.div>

                    <motion.div variants={fadeUp} className="relative mb-8">
                        {/* Optical Blur Pulse */}
                        <motion.h1
                            animate={{ opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 blur-[32px] select-none pointer-events-none"
                        >
                            Make something<br />Great
                        </motion.h1>

                        {/* Crisp Text */}
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
                    <motion.div
                        variants={fadeUp}
                        className="sm:col-span-2"
                        whileHover={{ y: -4, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Link
                            href="/signin"
                            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[20px] bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.05] hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(79,70,229,0.1)] transition-all duration-300"
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-3.5 rounded-[14px] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300">
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

                            <div className="p-3 rounded-full bg-white/[0.02] border border-white/[0.05] text-white/30 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-300 sm:self-center self-end">
                                <ArrowUpRight size={20} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* TILE 2: Provisioning */}
                    <motion.div
                        variants={fadeUp}
                        className="sm:col-span-2"
                        whileHover={{ y: -4, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Link
                            href="/signup"
                            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-[20px] bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.05] hover:border-purple-500/30 hover:shadow-[0_0_40px_rgba(192,38,211,0.1)] transition-all duration-300"
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-3.5 rounded-[14px] bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
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

                            <div className="p-3 rounded-full bg-white/[0.02] border border-white/[0.05] text-white/30 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all duration-300 sm:self-center self-end">
                                <ArrowUpRight size={20} strokeWidth={1.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* TILE 3: Docs */}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Link href="/Documentation" className="group flex flex-col justify-between h-[160px] rounded-[20px] bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.05] text-white/50 group-hover:text-white group-hover:bg-white/10 transition-colors">
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
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                        <Link href="/security" className="group flex flex-col justify-between h-[160px] rounded-[20px] bg-white/[0.02] border border-white/[0.05] p-6 hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.05] text-white/50 group-hover:text-white group-hover:bg-white/10 transition-colors">
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