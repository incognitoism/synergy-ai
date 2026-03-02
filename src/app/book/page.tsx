"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, CheckCircle, Clock, ArrowRight, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const perks = [
    { title: "30 minutes", sub: "Focused, no fluff" },
    { title: "No pitch", sub: "Honest advice only" },
    { title: "Action plan", sub: "Yours to keep" },
];

const fieldStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    width: "100%",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "14px",
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
};

const fieldFocused = {
    borderColor: "rgba(99,102,241,0.5)",
    background: "rgba(99,102,241,0.04)",
    boxShadow: "0 0 0 3px rgba(99,102,241,0.08)",
};

function Field({ label, required, focused, children }: {
    label: string; required?: boolean; focused?: boolean; children: React.ReactNode;
}) {
    return (
        <div>
            <div className="flex items-center gap-1.5 mb-2">
                <label className="text-xs font-medium transition-colors duration-200"
                    style={{ color: focused ? "rgba(165,180,252,0.9)" : "rgba(148,163,184,0.7)" }}>
                    {label}
                </label>
                {required && <span className="text-indigo-400 text-xs">*</span>}
            </div>
            {children}
        </div>
    );
}

export default function BookPage() {
    const [form, setForm] = useState({ name: "", email: "", date: "", time: "", service: "", notes: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from("bookings").insert([form]);
        if (!error) setSubmitted(true);
        setLoading(false);
    };

    if (submitted) {
        return (
            <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(99,102,241,0.07), transparent)" }} />
                <motion.div
                    initial={{ opacity: 0, scale: 0.93, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center max-w-md relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center"
                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)" }}
                    >
                        <CheckCircle className="w-9 h-9 text-indigo-400" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-4xl font-bold text-white mb-3 tracking-tight"
                    >
                        You're booked.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="text-slate-400 leading-relaxed"
                    >
                        We'll send a confirmation with a meeting link shortly. Expect a focused, no-fluff conversation.
                    </motion.p>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-8 h-px w-20 mx-auto origin-center rounded-full"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }}
                    />
                </motion.div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen pt-36 pb-28 px-6 overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03]"
                    style={{ background: "radial-gradient(circle at 80% 10%, #6366f1, transparent 65%)" }} />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.025]"
                    style={{ background: "radial-gradient(circle at 20% 90%, #8b5cf6, transparent 65%)" }} />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto">
                <div className="grid lg:grid-cols-5 gap-14 xl:gap-20 items-start">

                    {/* LEFT — info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-2 lg:pt-2"
                    >
                        <p className="text-[10px] tracking-[0.28em] uppercase text-indigo-400/60 font-medium mb-5">
                            Strategy call
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
                            Book a{" "}
                            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                                free call
                            </span>
                        </h1>
                        <p className="text-slate-400 text-sm leading-relaxed mb-10">
                            30 minutes. No sales pitch. We'll look at your business, identify automation opportunities, and give you a clear action plan — whether you hire us or not.
                        </p>

                        {/* Perks */}
                        <div className="space-y-3">
                            {perks.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -14 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex items-center gap-4 p-4 rounded-xl"
                                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                                >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-semibold leading-none mb-0.5">{p.title}</p>
                                        <p className="text-slate-500 text-xs">{p.sub}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* RIGHT — form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        className="lg:col-span-3"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-2xl overflow-hidden"
                            style={{
                                background: "rgba(255,255,255,0.028)",
                                border: "1px solid rgba(255,255,255,0.08)",
                                backdropFilter: "blur(20px)",
                            }}
                        >
                            {/* Form header */}
                            <div className="px-8 py-5 border-b flex items-center justify-between"
                                style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.015)" }}>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-3.5 h-3.5 text-indigo-400/60" />
                                    <span className="text-xs tracking-[0.18em] uppercase text-slate-500 font-medium">Schedule</span>
                                </div>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3].map(d => (
                                        <div key={d} className="w-2 h-2 rounded-full"
                                            style={{ background: d === 1 ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.07)" }} />
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 space-y-6">

                                {/* Name + Email */}
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <Field label="Full Name" required focused={focused === "name"}>
                                        <input
                                            required
                                            value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            onFocus={() => setFocused("name")}
                                            onBlur={() => setFocused(null)}
                                            style={{ ...fieldStyle, ...(focused === "name" ? fieldFocused : {}) }}
                                            placeholder="Your name"
                                        />
                                    </Field>
                                    <Field label="Work Email" required focused={focused === "email"}>
                                        <input
                                            required
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm({ ...form, email: e.target.value })}
                                            onFocus={() => setFocused("email")}
                                            onBlur={() => setFocused(null)}
                                            style={{ ...fieldStyle, ...(focused === "email" ? fieldFocused : {}) }}
                                            placeholder="you@company.com"
                                        />
                                    </Field>
                                </div>

                                {/* Date */}
                                <Field label="Preferred Date" required focused={focused === "date"}>
                                    <input
                                        required
                                        type="date"
                                        value={form.date}
                                        onChange={e => setForm({ ...form, date: e.target.value })}
                                        onFocus={() => setFocused("date")}
                                        onBlur={() => setFocused(null)}
                                        min={new Date().toISOString().split("T")[0]}
                                        style={{ ...fieldStyle, ...(focused === "date" ? fieldFocused : {}), colorScheme: "dark" }}
                                    />
                                </Field>

                                {/* Time slots */}
                                <Field label="Preferred Time" required>
                                    <div className="grid grid-cols-4 gap-2">
                                        {timeSlots.map((slot, i) => {
                                            const active = form.time === slot;
                                            return (
                                                <motion.button
                                                    type="button"
                                                    key={slot}
                                                    onClick={() => setForm({ ...form, time: slot })}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.04, duration: 0.35 }}
                                                    whileHover={{ scale: 1.03 }}
                                                    whileTap={{ scale: 0.97 }}
                                                    className="py-2.5 rounded-lg text-xs font-medium transition-all duration-200"
                                                    style={{
                                                        background: active ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                                                        border: active ? "1px solid rgba(99,102,241,0.45)" : "1px solid rgba(255,255,255,0.07)",
                                                        color: active ? "rgba(165,180,252,0.95)" : "rgba(100,116,139,0.8)",
                                                        boxShadow: active ? "0 0 12px rgba(99,102,241,0.12)" : "none",
                                                    }}
                                                >
                                                    {slot}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </Field>

                                {/* Service */}
                                <Field label="What do you need help with?" focused={focused === "service"}>
                                    <div className="relative">
                                        <select
                                            value={form.service}
                                            onChange={e => setForm({ ...form, service: e.target.value })}
                                            onFocus={() => setFocused("service")}
                                            onBlur={() => setFocused(null)}
                                            style={{
                                                ...fieldStyle,
                                                ...(focused === "service" ? fieldFocused : {}),
                                                appearance: "none",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <option value="" style={{ background: "#0f0f17" }}>Select a service</option>
                                            <option value="chatbot" style={{ background: "#0f0f17" }}>AI Chatbot</option>
                                            <option value="automation" style={{ background: "#0f0f17" }}>Workflow Automation</option>
                                            <option value="dashboard" style={{ background: "#0f0f17" }}>Dashboard & Analytics</option>
                                            <option value="website" style={{ background: "#0f0f17" }}>AI-Powered Website</option>
                                            <option value="audit" style={{ background: "#0f0f17" }}>General AI Audit</option>
                                        </select>
                                    </div>
                                </Field>

                                {/* Notes */}
                                <Field label="Anything else we should know?" focused={focused === "notes"}>
                                    <textarea
                                        rows={3}
                                        value={form.notes}
                                        onChange={e => setForm({ ...form, notes: e.target.value })}
                                        onFocus={() => setFocused("notes")}
                                        onBlur={() => setFocused(null)}
                                        placeholder="Optional — share your biggest pain point"
                                        style={{
                                            ...fieldStyle,
                                            ...(focused === "notes" ? fieldFocused : {}),
                                            resize: "none",
                                        }}
                                    />
                                </Field>

                                {/* Submit */}
                                <motion.button
                                    type="submit"
                                    disabled={loading || !form.time}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full relative overflow-hidden rounded-xl py-4 font-semibold text-white text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-40"
                                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                                >
                                    <AnimatePresence mode="wait">
                                        {loading ? (
                                            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="flex items-center gap-2">
                                                <motion.div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                                                Booking...
                                            </motion.span>
                                        ) : (
                                            <motion.span key="submit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Confirm Booking
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>

                                <p className="text-center text-xs text-slate-600">
                                    Confirmation sent within a few minutes.
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}