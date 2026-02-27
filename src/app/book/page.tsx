"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Calendar, CheckCircle, Clock } from "lucide-react";

const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

export default function BookPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        date: "",
        time: "",
        service: "",
        notes: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from("bookings").insert([form]);
        if (!error) setSubmitted(true);
        setLoading(false);
    };

    if (submitted) {
        return (
            <section className="min-h-screen flex items-center justify-center px-6">
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-3">You're booked!</h2>
                    <p className="text-slate-400">
                        We'll send a confirmation email with a meeting link shortly.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-32 pb-24 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-6 h-6 text-accent-light" />
                    <h1 className="text-4xl font-bold">
                        Book a <span className="text-gradient">free call</span>
                    </h1>
                </div>
                <p className="text-slate-400 mb-10">
                    30 minutes. No sales pitch. We'll look at your business, identify automation opportunities, and give you a clear action plan — whether you hire us or not.
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
                        <label className="block text-sm text-slate-400 mb-2">Preferred Date *</label>
                        <input
                            required
                            type="date"
                            value={form.date}
                            onChange={(e) => setForm({ ...form, date: e.target.value })}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-2">
                            <Clock className="w-3.5 h-3.5 inline mr-1" />
                            Preferred Time *
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map((slot) => (
                                <button
                                    type="button"
                                    key={slot}
                                    onClick={() => setForm({ ...form, time: slot })}
                                    className={`py-2.5 rounded-lg text-sm font-medium border transition ${form.time === slot
                                        ? "border-accent bg-accent/10 text-accent-light"
                                        : "border-white/10 bg-dark-800 text-slate-400 hover:border-white/20"
                                        }`}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-2">What do you need help with?</label>
                        <select
                            value={form.service}
                            onChange={(e) => setForm({ ...form, service: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white"
                        >
                            <option value="">Select a service</option>
                            <option value="chatbot">AI Chatbot</option>
                            <option value="automation">Workflow Automation</option>
                            <option value="dashboard">Dashboard & Analytics</option>
                            <option value="website">AI-Powered Website</option>
                            <option value="audit">General AI Audit</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm text-slate-400 mb-2">Anything else we should know?</label>
                        <textarea
                            rows={3}
                            value={form.notes}
                            onChange={(e) => setForm({ ...form, notes: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg bg-dark-800 border border-white/10 focus:border-accent/50 focus:outline-none transition text-white resize-none"
                            placeholder="Optional — share your biggest pain point"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !form.time}
                        className="w-full py-3.5 rounded-lg bg-accent hover:bg-accent-dark transition font-semibold text-white disabled:opacity-50"
                    >
                        {loading ? "Booking..." : "Confirm Booking"}
                    </button>
                </form>
            </div>
        </section>
    );
}