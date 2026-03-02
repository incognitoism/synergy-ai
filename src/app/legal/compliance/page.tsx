"use client";

import { motion, Variants } from "framer-motion";
import {
    ShieldCheck,
    Lock,
    Server,
    FileCheck,
} from "lucide-react";

export default function CompliancePage() {
    const fadeUp: Variants = {
        hidden: { opacity: 0, y: 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
        },
    };

    const stagger: Variants = {
        hidden: {},
        visible: {
            transition: { staggerChildren: 0.08 },
        },
    };

    return (
        <main className="min-h-screen bg-[#050505] text-slate-200 selection:bg-indigo-500/20">

            {/* ================= HERO ================= */}
            <section className="relative border-b border-white/[0.06] overflow-hidden">

                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none 
          bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),
              linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)]
          bg-[size:72px_72px]" />

                <div className="relative max-w-6xl mx-auto px-8 md:px-16 py-28">

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl"
                    >
                        <motion.span
                            variants={fadeUp}
                            className="text-[12px] tracking-[0.18em] uppercase text-indigo-400/70"
                        >
                            Trust & Governance
                        </motion.span>

                        <motion.h1
                            variants={fadeUp}
                            className="mt-6 text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.95]
              text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40"
                        >
                            Compliance Framework
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 text-lg text-white/50 leading-relaxed"
                        >
                            Our systems are built to meet modern regulatory standards across security,
                            data protection, and operational integrity.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ================= STANDARDS GRID ================= */}
            <section className="max-w-6xl mx-auto px-8 md:px-16 py-20">

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >

                    {/* SOC 2 */}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.02]
            border border-white/[0.06] p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                <ShieldCheck size={22} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-medium text-white/90">
                                SOC 2 Alignment
                            </h3>
                        </div>
                        <p className="text-white/50 leading-relaxed">
                            Controls are designed in accordance with SOC 2 Trust Service Criteria,
                            including security, availability, and confidentiality.
                        </p>
                    </motion.div>

                    {/* GDPR */}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.02]
            border border-white/[0.06] p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                <FileCheck size={22} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-medium text-white/90">
                                GDPR Readiness
                            </h3>
                        </div>
                        <p className="text-white/50 leading-relaxed">
                            Data processing practices align with EU General Data Protection
                            Regulation principles including data minimization and transparency.
                        </p>
                    </motion.div>

                    {/* Infrastructure Security */}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.02]
            border border-white/[0.06] p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                <Server size={22} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-medium text-white/90">
                                Infrastructure Controls
                            </h3>
                        </div>
                        <p className="text-white/50 leading-relaxed">
                            Environment isolation, encryption at rest and in transit, and
                            continuous monitoring are enforced across production systems.
                        </p>
                    </motion.div>

                    {/* Access Management */}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                        className="rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.02]
            border border-white/[0.06] p-8"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                                <Lock size={22} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-medium text-white/90">
                                Access Governance
                            </h3>
                        </div>
                        <p className="text-white/50 leading-relaxed">
                            Role-based permissions, audit logging, and multi-factor authentication
                            are enforced to protect system integrity.
                        </p>
                    </motion.div>

                </motion.div>
            </section>

            {/* ================= POLICY SUMMARY ================= */}
            <section className="border-t border-white/[0.06]">

                <div className="max-w-4xl mx-auto px-8 md:px-16 py-20">

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        animate="visible"
                        className="space-y-10"
                    >
                        <motion.h2
                            variants={fadeUp}
                            className="text-2xl font-medium text-white/90"
                        >
                            Governance Principles
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="text-white/50 leading-relaxed"
                        >
                            Our compliance posture is guided by structured risk assessment,
                            documented internal controls, and periodic review cycles.
                            We maintain clear documentation and audit readiness
                            to support enterprise client requirements.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            className="pt-10 border-t border-white/[0.06]"
                        >
                            <p className="text-sm text-white/40">
                                For compliance documentation requests, contact compliance@synergy-ltd.com
                            </p>
                        </motion.div>
                    </motion.div>

                </div>
            </section>

        </main>
    );
}