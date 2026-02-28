"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("leads").insert([form]);

        if (!error) setSubmitted(true);

        setLoading(false);
    };

    if (submitted) {
        return (
            <section className="min-h-screen flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-xl"
                >
                    <CheckCircle className="w-16 h-16 text-accent-light mx-auto mb-6" />
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Inquiry Received
                    </h2>
                    <p className="text-slate-400 leading-relaxed">
                        Our team will review your submission and respond within
                        24–48 hours with next steps.
                    </p>
                </motion.div>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-36 pb-24 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20">

                {/* LEFT SIDE */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                        Start an
                        <span className="text-gradient"> AI Initiative</span>
                    </h1>

                    <p className="text-slate-400 text-lg leading-relaxed mb-10">
                        Tell us about your current infrastructure, bottlenecks, and
                        objectives. We design AI systems that integrate directly into
                        enterprise workflows — not surface-level automation.
                    </p>

                    <div className="space-y-6 text-slate-300">
                        <div>
                            <h3 className="font-semibold text-white mb-1">
                                What happens next?
                            </h3>
                            <p className="text-sm text-slate-400">
                                1. We review your submission
                                <br />
                                2. Initial strategy call
                                <br />
                                3. Architecture proposal & roadmap
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-1">
                                Typical Engagement Scope
                            </h3>
                            <p className="text-sm text-slate-400">
                                AI infrastructure projects typically range from
                                workflow automation systems to full custom LLM deployment.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE FORM */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="
            p-10 rounded-2xl
            border border-white/10
            bg-dark-800/40
            backdrop-blur-sm
            space-y-6
          "
                >
                    <div className="grid sm:grid-cols-2 gap-6">
                        <InputField
                            label="Full Name *"
                            value={form.name}
                            onChange={(v) => setForm({ ...form, name: v })}
                            required
                        />

                        <InputField
                            label="Work Email *"
                            type="email"
                            value={form.email}
                            onChange={(v) => setForm({ ...form, email: v })}
                            required
                        />
                    </div>

                    <InputField
                        label="Company"
                        value={form.company}
                        onChange={(v) => setForm({ ...form, company: v })}
                    />

                    <SelectField
                        label="Primary Focus Area"
                        value={form.service_interest}
                        onChange={(v) => setForm({ ...form, service_interest: v })}
                        options={[
                            "Enterprise AI Assistants",
                            "Workflow Orchestration",
                            "Data Intelligence",
                            "AI Web Infrastructure",
                            "Custom LLM Deployment",
                        ]}
                    />

                    <SelectField
                        label="Estimated Budget Range"
                        value={form.budget}
                        onChange={(v) => setForm({ ...form, budget: v })}
                        options={[
                            "$5k – $15k",
                            "$15k – $50k",
                            "$50k+",
                            "Exploring options",
                        ]}
                    />

                    <TextAreaField
                        label="Project Overview *"
                        value={form.message}
                        onChange={(v) => setForm({ ...form, message: v })}
                        required
                        placeholder="Describe your current systems, bottlenecks, and what success would look like."
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="
              w-full flex items-center justify-center gap-2
              px-8 py-4 rounded-lg
              bg-accent hover:bg-accent-dark
              transition font-semibold text-white
              disabled:opacity-50
            "
                    >
                        <Send className="w-4 h-4" />
                        {loading ? "Submitting..." : "Submit Inquiry"}
                    </button>
                </motion.form>
            </div>
        </section>
    );
}

/* ---------- Reusable Fields ---------- */

function InputField({
    label,
    value,
    onChange,
    required = false,
    type = "text",
}: any) {
    return (
        <div>
            <label className="block text-sm text-slate-400 mb-2">
                {label}
            </label>
            <input
                required={required}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white"
            />
        </div>
    );
}

function SelectField({ label, value, onChange, options }: any) {
    return (
        <div>
            <label className="block text-sm text-slate-400 mb-2">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white"
            >
                <option value="">Select</option>
                {options.map((opt: string, i: number) => (
                    <option key={i} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

function TextAreaField({
    label,
    value,
    onChange,
    required = false,
    placeholder = "",
}: any) {
    return (
        <div>
            <label className="block text-sm text-slate-400 mb-2">
                {label}
            </label>
            <textarea
                required={required}
                rows={5}
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-dark-900 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white resize-none"
            />
        </div>
    );
}