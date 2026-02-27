"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
    {
        name: "Dr. Sarah Mitchell",
        role: "Owner, Bright Smile Dental",
        text: "Synergy AI set up an automated booking system that cut our no-shows by 60%. Our front desk staff finally has time to focus on patients instead of phone tag.",
    },
    {
        name: "Raj Patel",
        role: "CEO, Summit Construction",
        text: "They built us a dashboard that pulls data from three different tools into one screen. I can see every project's status in seconds now. Game changer.",
    },
    {
        name: "Maria Lopez",
        role: "Founder, FitLife Studios",
        text: "The AI chatbot on our site handles 80% of inquiries automatically. We went from losing leads at midnight to converting them. Best investment we've made.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 px-6 bg-dark-800/30">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Trusted by <span className="text-gradient">real businesses</span>
                    </h2>
                    <p className="text-slate-400">Results that speak for themselves.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="p-6 rounded-xl border border-white/5 bg-dark-900/50"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                                ))}
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed mb-6">"{t.text}"</p>
                            <div>
                                <div className="text-sm font-semibold text-white">{t.name}</div>
                                <div className="text-xs text-slate-500">{t.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}