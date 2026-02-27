"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
    return (
        <section className="py-32 px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/[0.05] rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-2xl mx-auto text-center"
            >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                    Build AI that
                    <br />
                    <span className="text-gradient">knows your business</span>
                </h2>
                <p className="text-slate-400 mb-12 text-lg font-light">
                    30-minute call. No pitch. Just a clear roadmap for what AI can do for you.
                </p>
                <Link
                    href="/book"
                    className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-dark-900 font-semibold tracking-wide hover:bg-slate-100 transition"
                >
                    Book a call
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </section>
    );
}