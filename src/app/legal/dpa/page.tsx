"use client";

import { motion, Variants } from "framer-motion";

export default function DataProcessingAgreementPage() {
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

                {/* Subtle grid */}
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
                            className="mt-6 pb-1 text-5xl md:text-6xl font-medium tracking-[-0.04em] leading-[1.05] text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/40"
                            >
                                 Data Processing Agreement
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mt-6 text-lg text-white/50 leading-relaxed"
                        >
                            This Data Processing Agreement (“DPA”) governs the processing
                            of personal data by Synergy AI Solutions when acting as a
                            processor on behalf of enterprise clients.
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
                            1. Scope & Applicability
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            This DPA applies where Synergy AI Solutions processes
                            personal data on behalf of a client acting as the data
                            controller. Processing activities are limited to those
                            necessary to provide contracted services and are conducted
                            strictly in accordance with documented instructions.
                        </p>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            2. Nature of Processing
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Processing may include collection, storage, structuring,
                            retrieval, transmission, and secure deletion of data
                            required to operate enterprise AI infrastructure. No data
                            is repurposed beyond the scope of service delivery.
                        </p>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            3. Security Measures
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            We implement technical and organizational safeguards aligned
                            with industry best practices, including encryption in transit
                            and at rest, role-based access controls, audit logging,
                            network segmentation, and continuous monitoring.
                        </p>
                    </motion.div>

                    {/* Section 4 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            4. Sub-Processors
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            We may engage trusted infrastructure partners to support
                            service delivery. Each sub-processor is contractually bound
                            by confidentiality and data protection obligations
                            equivalent to those outlined in this Agreement.
                        </p>
                    </motion.div>

                    {/* Section 5 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            5. Data Subject Rights
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            We assist clients in fulfilling obligations related to
                            data subject access, rectification, erasure, portability,
                            and restriction requests, as required under applicable
                            data protection laws.
                        </p>
                    </motion.div>

                    {/* Section 6 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            6. International Transfers
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Where cross-border transfers occur, appropriate safeguards
                            such as Standard Contractual Clauses or equivalent
                            mechanisms are implemented to ensure lawful and secure
                            processing.
                        </p>
                    </motion.div>

                    {/* Section 7 */}
                    <motion.div variants={fadeUp}>
                        <h2 className="text-xl font-medium text-white/90 mb-4">
                            7. Termination & Deletion
                        </h2>
                        <p className="text-white/50 leading-relaxed">
                            Upon termination of services, personal data will be securely
                            deleted or returned to the client, unless retention is
                            required by law or regulatory obligation.
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