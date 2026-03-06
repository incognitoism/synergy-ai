"use client";

import { motion, Variants } from "framer-motion";

export default function CookiePage() {
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

            {/* ================= HERO SECTION ================= */}
            <section className="relative border-b border-white/[0.06] overflow-hidden">

                {/* Subtle grid background */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none 
                bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] 
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
                            className="mt-6 pb-1 text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40"
                        >
                            Cookie Policy
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 text-lg text-white/50 leading-relaxed"
                        >
                            Transparency extends to the technologies we use. This policy explains
                            how cookies and similar mechanisms support performance, security,
                            and product intelligence across our platform.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ================= CONTENT SECTION ================= */}
            <section className="max-w-4xl mx-auto px-8 md:px-16 py-0">

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="space-y-14"
                >

                    {/* Section 1 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            1. What Are Cookies
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Cookies are small data files stored on your device when you visit
                            a website. They enable secure authentication, remember user
                            preferences, and support system-level functionality required for
                            enterprise infrastructure environments.
                        </p>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            2. How We Use Cookies
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            We use cookies to maintain session integrity, safeguard access,
                            monitor performance metrics, and improve reliability of deployed
                            AI systems. Analytical insights derived from cookies are aggregated
                            and never sold or monetized.
                        </p>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            3. Types of Cookies
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            <strong className="text-white/70">Essential Cookies:</strong> Required
                            for authentication and core infrastructure operations.
                            <br /><br />
                            <strong className="text-white/70">Performance Cookies:</strong> Used to
                            analyze system responsiveness and platform reliability.
                            <br /><br />
                            <strong className="text-white/70">Security Cookies:</strong> Assist in
                            detecting anomalies, abuse prevention, and threat mitigation.
                        </p>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            4. Third-Party Technologies
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Some services may integrate with trusted infrastructure partners
                            such as hosting providers or analytics platforms. These entities
                            operate under their own privacy and compliance frameworks aligned
                            with enterprise standards.
                        </p>
                    </motion.div>

                    {/* Section 5 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            5. Managing Preferences
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            You may configure or disable cookies through your browser settings.
                            Note that restricting essential cookies may affect authentication
                            and certain service capabilities.
                        </p>
                    </motion.div>

                    {/* Footer Note */}
                    <motion.div
                        variants={fadeUp}
                        className="pt-10 border-t border-white/[0.06]"
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