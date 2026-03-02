"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
    ArrowUpRight,
    Fingerprint,
    Network,
    BookOpen,
    ShieldCheck,
} from "lucide-react";

export default function AccessPage() {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
        },
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
    };

    return (
        <main className="flex flex-col lg:flex-row min-h-screen w-full bg-[#050505] text-slate-200 selection:bg-indigo-500/20">

            {/* ================= LEFT PANE ================= */}
            <div className="relative w-full lg:w-[55%] flex flex-col justify-center px-10 lg:px-24 py-20 overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-[#030108]">

                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none  bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px), linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:72px_72px]" />

                {/* Ambient glow */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-40 -left-40 w-[600px] h-[600px]  bg-[radial-gradient(circle,rgba(79,70,229,0.08)_0%,transparent_65%)] pointer-events-none"
                />

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 max-w-2xl"
                >
                    <motion.div variants={fadeUp} className="mb-8 flex items-center gap-3">
                        <div className="h-px w-8 bg-gradient-to-r from-indigo-500 to-transparent" />
                        <span className="text-[12px] font-medium tracking-[0.18em] text-indigo-400/70 uppercase">
                            SYNERGY LTD.
                        </span>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="text-6xl md:text-7xl lg:text-8xl font-medium tracking-[-0.04em] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40"
                    >
                        Make something
                        <br />
                        <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                            Great
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="mt-8 text-lg text-white/50 leading-relaxed max-w-md"
                    >
                        The future of compliant systems —
                        <span className="text-white/80 font-medium">
                            engineered for scale, security, and precision.
                        </span>
                    </motion.p>
                </motion.div>
            </div>

            {/* ================= RIGHT PANE ================= */}
            <div className="relative w-full lg:w-[45%] flex flex-col justify-center px-8 md:px-14 py-20 overflow-hidden">

                {/* Background Image (replace with your image) */}
                <motion.div
                    animate={{ scale: [1.05, 1.08, 1.05] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('/access.jpeg')",
                    }}
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-[#0A0A0C]/85 backdrop-blur-[2px]" />

                {/* Left blend gradient */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#030108] to-transparent pointer-events-none" />

                {/* Content */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl mx-auto"
                >

                    {/* CLIENT ACCESS */}
                    <motion.div
                        variants={fadeUp}
                        className="sm:col-span-2"
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    >
                        <Link
                            href="/signin"
                            className="group flex items-center justify-between gap-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-6 transition-all duration-300 hover:border-indigo-500/40 hover:shadow-[0_0_40px_rgba(79,70,229,0.08)]"
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 transition-all duration-300">
                                    <Fingerprint size={22} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-white/90">
                                        Client Access
                                    </h3>
                                    <p className="text-sm text-white/40">
                                        Sign in to your deployment dashboard.
                                    </p>
                                </div>
                            </div>

                            <ArrowUpRight
                                size={18}
                                strokeWidth={1.5}
                                className="text-white/30 group-hover:text-indigo-400 transition-colors"
                            />
                        </Link>
                    </motion.div>

                    {/* NEW ENGAGEMENT */}
                    <motion.div
                        variants={fadeUp}
                        className="sm:col-span-2"
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    >
                        <Link
                            href="/signup"
                            className="group flex items-center justify-between gap-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] p-6 transition-all duration-300 hover:border-purple-500/40 hover:shadow-[0_0_40px_rgba(192,38,211,0.08)]"
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:bg-purple-500/20 transition-all duration-300">
                                    <Network size={22} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-medium text-white/90">
                                        New Engagement
                                    </h3>
                                    <p className="text-sm text-white/40">
                                        Request bespoke infrastructure access.
                                    </p>
                                </div>
                            </div>

                            <ArrowUpRight
                                size={18}
                                strokeWidth={1.5}
                                className="text-white/30 group-hover:text-purple-400 transition-colors"
                            />
                        </Link>
                    </motion.div>

                    {/* DOCS */}
                    <motion.div variants={fadeUp} whileHover={{ y: -3 }}>
                        <Link
                            href="/documentation"
                            className="group flex flex-col justify-between h-[160px] rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6 hover:border-white/[0.15] transition-all duration-300"
                        >
                            <BookOpen
                                size={20}
                                strokeWidth={1.5}
                                className="text-white/50 group-hover:text-white transition-colors"
                            />
                            <div>
                                <h4 className="text-lg font-medium text-white/90">
                                    Documentation
                                </h4>
                                <span className="text-sm text-white/40">
                                    API integration guides
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                    {/* SECURITY */}
                    <motion.div variants={fadeUp} whileHover={{ y: -3 }}>
                        <Link
                            href="/security"
                            className="group flex flex-col justify-between h-[160px] rounded-2xl bg-white/[0.04] border border-white/[0.08] p-6 hover:border-white/[0.15] transition-all duration-300"
                        >
                            <ShieldCheck
                                size={20}
                                strokeWidth={1.5}
                                className="text-white/50 group-hover:text-white transition-colors"
                            />
                            <div>
                                <h4 className="text-lg font-medium text-white/90">
                                    Security Center
                                </h4>
                                <span className="text-sm text-white/40">
                                    Compliance overview
                                </span>
                            </div>
                        </Link>
                    </motion.div>

                </motion.div>
            </div>
        </main>
    );
}