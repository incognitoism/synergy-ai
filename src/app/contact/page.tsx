"use client";

import { useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle, ArrowRight, Clock, FileText, Zap } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const steps = [
    {
        icon: FileText,
        title: "We review your submission",
        desc: "Our team analyses your stack, goals, and bottlenecks within 24 hours.",
    },
    {
        icon: Clock,
        title: "Initial strategy call",
        desc: "A focused 30-minute call to align on scope, timeline, and success metrics.",
    },
    {
        icon: Zap,
        title: "Architecture proposal",
        desc: "A detailed roadmap with tech decisions, integration points, and delivery milestones.",
    },
];

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        service_interest: "",
        budget: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const formRef = useRef(null);
    const formInView = useInView(formRef, { once: true, margin: "-80px" });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from("leads").insert([form]);
        if (!error) setSubmitted(true);
        setLoading(false);
    };

    if (submitted) {
        return (
            <section className="min-h-screen flex items-center justify-center px-6 bg-dark-900 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
                        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }} />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center max-w-xl relative z-10"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
                        style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))", border: "1px solid rgba(99,102,241,0.3)" }}
                    >
                        <CheckCircle className="w-9 h-9 text-indigo-400" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.5 }}
                        className="text-4xl font-bold text-white mb-4 tracking-tight"
                    >
                        Inquiry Received
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.5 }}
                        className="text-slate-400 leading-relaxed text-lg"
                    >
                        Our team will review your submission and respond within 24–48 hours with next steps.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 h-px w-24 mx-auto"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }}
                    />
                </motion.div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen pt-36 pb-28 px-6 bg-dark-900 overflow-hidden">

            {/* Background atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.035]"
                    style={{ background: "radial-gradient(circle at 80% 20%, #6366f1, transparent 60%)" }} />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.025]"
                    style={{ background: "radial-gradient(circle at 20% 80%, #8b5cf6, transparent 60%)" }} />
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.018]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Page header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20"
                >
                    <p className="text-xs tracking-[0.28em] uppercase text-slate-500 mb-5 font-medium">
                        Get in touch
                    </p>
                    <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
                        Start an{" "}
                        <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                            AI Initiative
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
                        Tell us about your infrastructure, bottlenecks, and objectives. We design AI systems that integrate directly into enterprise workflows — not surface-level automation.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 xl:gap-20 items-start">

                    {/* LEFT — process steps */}
                    <div className="lg:col-span-2 space-y-2">
                        <p className="text-xs tracking-[0.2em] uppercase text-slate-600 mb-8 font-medium">What happens next</p>

                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="group relative flex gap-5 p-5 rounded-xl transition-all duration-300 cursor-default"
                                    style={{ background: "rgba(255,255,255,0.018)" }}
                                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,102,241,0.05)")}
                                    onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.018)")}
                                >
                                    {/* Step number line */}
                                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                                            style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                                            <Icon className="w-4 h-4 text-indigo-400" />
                                        </div>
                                        {i < steps.length - 1 && (
                                            <div className="w-px flex-1 min-h-[24px]"
                                                style={{ background: "linear-gradient(to bottom, rgba(99,102,241,0.2), transparent)" }} />
                                        )}
                                    </div>
                                    <div className="pb-5">
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="text-[10px] text-indigo-500 font-mono font-medium tracking-widest">0{i + 1}</span>
                                        </div>
                                        <h3 className="text-white font-semibold text-sm mb-1">{step.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                                    </div>
                                </motion.div>
                            );
                        })}

                        {/* Engagement scope card */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 0.6 }}
                            className="mt-4 p-5 rounded-xl"
                            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                        >
                            <h3 className="text-white font-semibold text-sm mb-2">Typical Engagement Scope</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Projects range from workflow automation systems to full custom LLM deployment — tailored to your exact stack and goals.
                            </p>
                        </motion.div>
                    </div>

                    {/* RIGHT — form */}
                    <motion.div
                        ref={formRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={formInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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
                            {/* Form header strip */}
                            <div className="px-8 py-5 border-b flex items-center justify-between"
                                style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.018)" }}>
                                <span className="text-xs tracking-[0.2em] uppercase text-slate-500 font-medium">New Inquiry</span>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3].map(d => (
                                        <div key={d} className="w-2 h-2 rounded-full" style={{ background: d === 1 ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.08)" }} />
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <PremiumInput
                                        label="Full Name"
                                        required
                                        value={form.name}
                                        onChange={v => setForm({ ...form, name: v })}
                                        focused={focusedField === "name"}
                                        onFocus={() => setFocusedField("name")}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                    <PremiumInput
                                        label="Work Email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={v => setForm({ ...form, email: v })}
                                        focused={focusedField === "email"}
                                        onFocus={() => setFocusedField("email")}
                                        onBlur={() => setFocusedField(null)}
                                    />
                                </div>

                                <PremiumInput
                                    label="Company"
                                    value={form.company}
                                    onChange={v => setForm({ ...form, company: v })}
                                    focused={focusedField === "company"}
                                    onFocus={() => setFocusedField("company")}
                                    onBlur={() => setFocusedField(null)}
                                />

                                <div className="grid sm:grid-cols-2 gap-5">
                                    <PremiumSelect
                                        label="Primary Focus Area"
                                        value={form.service_interest}
                                        onChange={v => setForm({ ...form, service_interest: v })}
                                        options={[
                                            "Enterprise AI Assistants",
                                            "Workflow Orchestration",
                                            "Data Intelligence",
                                            "AI Web Infrastructure",
                                            "Custom LLM Deployment",
                                        ]}
                                    />
                                    <PremiumSelect
                                        label="Estimated Budget"
                                        value={form.budget}
                                        onChange={v => setForm({ ...form, budget: v })}
                                        options={[
                                            "$5k – $15k",
                                            "$15k – $50k",
                                            "$50k+",
                                            "Exploring options",
                                        ]}
                                    />
                                </div>

                                <PremiumTextarea
                                    label="Project Overview"
                                    required
                                    value={form.message}
                                    onChange={v => setForm({ ...form, message: v })}
                                    placeholder="Describe your current systems, bottlenecks, and what success looks like."
                                    focused={focusedField === "message"}
                                    onFocus={() => setFocusedField("message")}
                                    onBlur={() => setFocusedField(null)}
                                />

                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full relative overflow-hidden rounded-xl py-4 font-semibold text-white text-sm tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300 disabled:opacity-50"
                                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                                >
                                    {/* Shimmer */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 hover:opacity-100"
                                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <AnimatePresence mode="wait">
                                        {loading ? (
                                            <motion.span
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="relative z-10 flex items-center gap-2"
                                            >
                                                <motion.div
                                                    className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                                />
                                                Submitting...
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                key="submit"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="relative z-10 flex items-center gap-2"
                                            >
                                                <Send className="w-4 h-4" />
                                                Submit Inquiry
                                                <ArrowRight className="w-4 h-4" />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>

                                <p className="text-center text-xs text-slate-600">
                                    Typically responded to within 24–48 business hours.
                                </p>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

/* ─── Premium Field Components ─── */

interface BaseFieldProps {
    label: string;
    required?: boolean;
    focused?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
}

function FieldWrapper({ label, required, focused, children }: BaseFieldProps & { children: React.ReactNode }) {
    return (
        <div className="group">
            <div className="flex items-center gap-1.5 mb-2">
                <label className="block text-xs font-medium transition-colors duration-200"
                    style={{ color: focused ? "rgba(165,180,252,0.9)" : "rgba(148,163,184,0.7)" }}>
                    {label}
                </label>
                {required && (
                    <span className="text-indigo-400 text-xs">*</span>
                )}
            </div>
            {children}
        </div>
    );
}

const fieldBase = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
    width: "100%",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "14px",
};

const fieldFocused = {
    borderColor: "rgba(99,102,241,0.5)",
    background: "rgba(99,102,241,0.04)",
    boxShadow: "0 0 0 3px rgba(99,102,241,0.08)",
};

function PremiumInput({ label, value, onChange, required = false, type = "text", focused, onFocus, onBlur }: BaseFieldProps & {
    value: string; onChange: (v: string) => void; type?: string;
}) {
    return (
        <FieldWrapper label={label} required={required} focused={focused}>
            <input
                type={type}
                required={required}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{ ...fieldBase, ...(focused ? fieldFocused : {}) }}
                placeholder=""
            />
        </FieldWrapper>
    );
}

function PremiumSelect({ label, value, onChange, options }: {
    label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
    const [focused, setFocused] = useState(false);
    return (
        <FieldWrapper label={label} focused={focused}>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{ ...fieldBase, ...(focused ? fieldFocused : {}), appearance: "none", cursor: "pointer" }}
            >
                <option value="" style={{ background: "#0f0f17" }}>Select</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt} style={{ background: "#0f0f17" }}>{opt}</option>
                ))}
            </select>
        </FieldWrapper>
    );
}

function PremiumTextarea({ label, value, onChange, required = false, placeholder, focused, onFocus, onBlur }: BaseFieldProps & {
    value: string; onChange: (v: string) => void; placeholder?: string;
}) {
    return (
        <FieldWrapper label={label} required={required} focused={focused}>
            <textarea
                required={required}
                rows={5}
                value={value}
                placeholder={placeholder}
                onChange={e => onChange(e.target.value)}
                onFocus={onFocus}
                onBlur={onBlur}
                style={{ ...fieldBase, ...(focused ? fieldFocused : {}), resize: "none" }}
            />
        </FieldWrapper>
    );
}