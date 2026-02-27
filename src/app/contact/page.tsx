"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        company: "",
        service_interest: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase.from("leads").insert([form]);

        if (!error) {
            setSubmitted(true);
        }
        setLoading(false);
    };

    if (submitted) {
        return (
            <section className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-3">We got your message!</h2>
                    <p className="text-slate-400">We'll be in touch within 24 hours.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold mb-3">
                    Let's <span className="text-gradient">talk</span>
                </h1>
                <p className="text-slate-400 mb-10">
                    Tell us about your business and what you're looking to automate. No pressure, no jargon — just a straight conversation about how AI can help.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Name *</label>
                            <input
                                required
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">Email *</label>
                            <input
                                required
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white"
                                placeholder="you@company.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Company</label>
                        <input
                            value={form.company}
                            onChange={(e) => setForm({ ...form, company: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white"
                            placeholder="Your business name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-2">What are you interested in?</label>
                        <select
                            value={form.service_interest}
                            onChange={(e) => setForm({ ...form, service_interest: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white"
                        >
                            <option value="">Select a service</option>
                            <option value="chatbot">AI Chatbot / Assistant</option>
                            <option value="automation">Workflow Automation</option>
                            <option value="dashboard">Data & Analytics Dashboard</option>
                            <option value="web">AI-Powered Website</option>
                            <option value="other">Something Else</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Tell us more *</label>
                        <textarea
                            required
                            rows={5}
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white resize-none"
                            placeholder="What's your biggest bottleneck right now? What would you love to automate?"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-lg bg-accent hover:bg-accent-dark transition font-semibold text-white disabled:opacity-50"
                    >
                        <Send className="w-4 h-4" />
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            </div>
        </section>
    );
}