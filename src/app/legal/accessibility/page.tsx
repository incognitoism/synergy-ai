"use client";

import { motion, Variants } from "framer-motion";

export default function AccessibilityPage() {
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

                <div className="relative max-w-5xl mx-auto px-8 md:px-16 py-28 pb-[2px]">

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
                            Accessibility
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 text-lg text-white/50 leading-relaxed"
                        >
                            We are committed to ensuring digital accessibility for all users,
                            including individuals with disabilities. Our goal is to provide
                            an inclusive and seamless experience across all platforms.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ================= CONTENT SECTION ================= */}
            <section className="max-w-4xl mx-auto px-8 md:px-16 pt-20">

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="space-y-14"
                >

                    {/* Section 1 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            1. Our Commitment
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Synergy AI Solutions is dedicated to maintaining a website
                            that is accessible and usable by the widest possible audience.
                            We strive to meet recognized accessibility standards and
                            continuously improve usability.
                        </p>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            2. Standards & Guidelines
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Our platform is designed with reference to the Web Content
                            Accessibility Guidelines (WCAG) 2.1 Level AA standards.
                            We regularly evaluate our digital properties to ensure
                            compliance and enhancement opportunities.
                        </p>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            3. Accessibility Features
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Features include keyboard navigability, screen reader
                            compatibility, scalable text, sufficient color contrast,
                            semantic HTML structure, and responsive layouts
                            across devices.
                        </p>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            4. Ongoing Improvements
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Accessibility is an ongoing effort. We conduct periodic
                            reviews and integrate accessibility considerations into
                            new feature development and system updates.
                        </p>
                    </motion.div>

                    {/* Section 5 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            5. Feedback & Assistance
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            If you encounter accessibility barriers or require
                            assistance using our services, please contact us.
                            We value feedback and are committed to addressing
                            concerns promptly.
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