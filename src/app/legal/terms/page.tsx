"use client";

import { motion, Variants } from "framer-motion";

export default function TermsPage() {
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

                {/* Subtle grid background (same theme) */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none 
          bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),
              linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)]
          bg-[size:72px_72px]" />

                <div className="relative max-w-5xl mx-auto px-8 md:px-16 py-28">

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
                            Legal
                        </motion.span>

                        <motion.h1
                            variants={fadeUp}
                            className="mt-6 text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.95]
              text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40"
                        >
                            Terms of Service
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 text-lg text-white/50 leading-relaxed"
                        >
                            These terms govern access to and use of SYNERGY LTD. systems and services.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ================= CONTENT ================= */}
            <section className="max-w-4xl mx-auto px-8 md:px-16 py-20">

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="space-y-16"
                >

                    {/* 1 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            By accessing or using our services, you agree to be bound by these
                            Terms of Service and all applicable laws and regulations. If you
                            do not agree, you may not use the platform.
                        </p>
                    </motion.div>

                    {/* 2 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            2. Use of Services
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            You agree to use the services only for lawful purposes and in
                            accordance with agreed deployment guidelines. Unauthorized
                            access attempts, misuse, or disruption of infrastructure
                            is strictly prohibited.
                        </p>
                    </motion.div>

                    {/* 3 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            3. Account Responsibilities
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            You are responsible for maintaining the confidentiality of
                            authentication credentials and for all activity under your account.
                            We reserve the right to suspend access in cases of suspected abuse.
                        </p>
                    </motion.div>

                    {/* 4 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            4. Intellectual Property
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            All system architecture, software components, documentation,
                            and branding remain the property of SYNERGY LTD. Use of the
                            platform does not grant ownership rights.
                        </p>
                    </motion.div>

                    {/* 5 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            5. Limitation of Liability
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Services are provided on an “as is” basis. To the maximum extent
                            permitted by law, SYNERGY LTD. shall not be liable for indirect,
                            incidental, or consequential damages arising from service use.
                        </p>
                    </motion.div>

                    {/* 6 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            6. Modifications
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            We may update these terms from time to time. Continued use
                            of the services following changes constitutes acceptance
                            of the revised terms.
                        </p>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        variants={fadeUp}
                        className="pt-12 border-t border-white/[0.06]"
                    >
                        <p className="text-sm text-white/40">
                            Last updated: March 2026
                        </p>
                    </motion.div>

                </motion.div>
            </section>
        </main>
    );
}