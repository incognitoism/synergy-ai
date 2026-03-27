"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Layered glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/[0.06] rounded-full blur-[140px]" />
            <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-violet-500/[0.04] rounded-full blur-[100px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-2xl mx-auto text-center"
            >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Got a project?
                    <br />
                    <span className="text-gradient">Let&apos;s talk.</span>
                </h2>
                <p className="text-slate-400 mb-10 text-lg font-light max-w-md mx-auto">
                    30-minute call. No pitch deck. Just a real conversation about what you&apos;re building.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/book"
                        className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-dark-900 font-semibold tracking-wide hover:bg-slate-100 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Book a call
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-sm text-slate-600">
                        or email{" "}
                        <a
                            href="mailto:hello@yourdomain.com"
                            className="text-slate-400 hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-slate-700 hover:decoration-slate-400"
                        >
                            hello@yourdomain.com
                        </a>
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
