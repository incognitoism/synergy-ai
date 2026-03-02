"use client";

import { motion, Variants } from "framer-motion";

export default function PrivacyPage() {
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

                {/* Subtle grid (same as Access page) */}
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none  bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px), linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:72px_72px]" />

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
                            className="mt-6 text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40"
                        >
                            Privacy Policy
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 text-lg text-white/50 leading-relaxed"
                        >
                            We design systems for clarity and control. That includes how your data is handled.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ================= CONTENT SECTION ================= */}
            <section className="max-w-4xl mx-auto px-8 md:px-16 py-20">

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="space-y-14"
                >

                    {/* Section 1 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            1. Information We Collect
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            We collect only the information necessary to provide and improve our services.
                            This may include account credentials, usage logs, device metadata, and
                            communication records related to support or onboarding.
                        </p>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            2. How We Use Information
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Collected data is used to operate infrastructure services, maintain
                            system integrity, authenticate users, prevent abuse, and enhance
                            deployment performance. We do not sell personal information.
                        </p>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            3. Security & Retention
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            We implement technical and organizational safeguards aligned with
                            industry standards. Data is retained only as long as required for
                            operational or legal purposes.
                        </p>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            4. Third-Party Services
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Certain integrations may rely on trusted third-party providers
                            (authentication, hosting, analytics). These providers operate
                            under their own privacy frameworks.
                        </p>
                    </motion.div>

                    {/* Section 5 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            5. Your Rights
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Depending on your jurisdiction, you may request access, correction,
                            or deletion of your data. For any privacy-related inquiries,
                            contact us at privacy@synergy-ltd.com.
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