"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Terminal,
    Code2,
    ShieldAlert,
    Zap,
    ChevronRight,
    Search,
    BookOpen,
    Box
} from "lucide-react";

export default function DocsPage() {
    // Simple fade-in for the main content
    const fadeUp = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-indigo-500/30 flex flex-col md:flex-row">

            {/* ==========================================
          LEFT SIDEBAR: NAVIGATION
          ========================================== */}
            <aside className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 border-r border-white/10 bg-[#030108] md:h-screen md:sticky md:top-0 overflow-y-auto hidden md:block">
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                            <Box size={18} />
                        </div>
                        <span className="font-semibold text-white tracking-wide">Synergy Docs</span>
                    </Link>

                    {/* Fake Search Bar */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-sm text-white/40 mb-8 cursor-text hover:bg-white/[0.05] transition-colors">
                        <Search size={16} />
                        <span>Search documentation...</span>
                        <kbd className="ml-auto px-1.5 py-0.5 bg-white/10 rounded text-[10px] font-mono">⌘K</kbd>
                    </div>

                    <nav className="space-y-8">
                        {/* Section 1 */}
                        <div>
                            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-2">Getting Started</h4>
                            <ul className="space-y-1 text-sm">
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-indigo-400 bg-indigo-500/10 rounded-md font-medium"><ChevronRight size={14} /> Introduction</Link></li>
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-white transition-colors"><ChevronRight size={14} className="opacity-0" /> Authentication</Link></li>
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-white transition-colors"><ChevronRight size={14} className="opacity-0" /> Quickstart Guide</Link></li>
                            </ul>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-2">Core Models</h4>
                            <ul className="space-y-1 text-sm">
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-white transition-colors"><ChevronRight size={14} className="opacity-0" /> Baseline 14M Events</Link></li>
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-white transition-colors"><ChevronRight size={14} className="opacity-0" /> Data Ingestion Pipeline</Link></li>
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-white transition-colors"><ChevronRight size={14} className="opacity-0" /> Weights & Biases</Link></li>
                            </ul>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-2">Testing & Simulation</h4>
                            <ul className="space-y-1 text-sm">
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-white transition-colors"><ChevronRight size={14} className="opacity-0" /> Defect Cocktail Creation</Link></li>
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-white transition-colors"><ChevronRight size={14} className="opacity-0" /> 1.5 Healthy Rebar Baselines</Link></li>
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-white transition-colors"><ChevronRight size={14} className="opacity-0" /> Adversarial Prompt Suites</Link></li>
                                <li><Link href="#" className="flex items-center gap-2 px-2 py-1.5 text-white/60 hover:text-white transition-colors"><ChevronRight size={14} className="opacity-0" /> Context Layering & Load</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* ==========================================
          MAIN CONTENT AREA
          ========================================== */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-6 md:p-12 lg:p-16">

                    <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-12">

                        {/* Page Header */}
                        <div>
                            <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-4">
                                <BookOpen size={16} />
                                <span>Documentation</span>
                                <ChevronRight size={14} className="text-white/20" />
                                <span className="text-white/60">Introduction</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4">
                                System Architecture & Integration
                            </h1>
                            <p className="text-lg text-white/50 leading-relaxed">
                                Welcome to the official developer documentation. This guide covers the initialization of the baseline models, deploying adversarial prompt suites, and securely querying the 14-million event databases.
                            </p>
                        </div>

                        <hr className="border-white/10" />

                        {/* Content Block 1: Info Callout */}
                        <div className="p-5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.03] flex gap-4">
                            <Zap className="text-indigo-400 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="text-white font-medium mb-1">Before you begin</h4>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    Ensure you have generated your API keys from the Client Access Portal. All requests to the simulation environments must be authenticated via Bearer tokens. Unauthenticated requests to the defect cocktail generation endpoints will be strictly rate-limited.
                                </p>
                            </div>
                        </div>

                        {/* Content Block 2: Code Snippet */}
                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-4">1. Initializing the Baseline Model</h2>
                            <p className="text-white/60 mb-6 leading-relaxed">
                                To establish the pure concrete baseline, you must pass the initial parameters to the initialization endpoint. The system currently supports a payload of up to 14 million events per batch.
                            </p>

                            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0C]">
                                <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/10 text-xs font-mono text-white/40">
                                    <div className="flex gap-2">
                                        <span className="text-white/60">bash</span>
                                    </div>
                                    <button className="hover:text-white transition-colors">Copy</button>
                                </div>
                                <div className="p-4 overflow-x-auto text-sm font-mono text-white/80 leading-relaxed">
                                    <span className="text-fuchsia-400">curl</span> -X POST https://api.synergy.dev/v1/models/baseline \<br />
                                    &nbsp;&nbsp;-H <span className="text-green-300">"Authorization: Bearer YOUR_API_KEY"</span> \<br />
                                    &nbsp;&nbsp;-H <span className="text-green-300">"Content-Type: application/json"</span> \<br />
                                    &nbsp;&nbsp;-d <span className="text-yellow-300">'{'{'}"model": "pure_concrete", "events_target": 14000000, "stream": true{'}'}'</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Block 3: API Parameters Table */}
                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-4">Adversarial Testing Parameters</h2>
                            <p className="text-white/60 mb-6 leading-relaxed">
                                When deploying adversarial prompt suites for AI testing, the following payload structure is required to ensure context layering and emotional baggage deployment operate correctly.
                            </p>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10 text-white/40">
                                            <th className="pb-3 font-medium">Parameter</th>
                                            <th className="pb-3 font-medium">Type</th>
                                            <th className="pb-3 font-medium">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-white/70">
                                        <tr>
                                            <td className="py-4 pr-4"><code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">suite_id</code></td>
                                            <td className="py-4 pr-4 font-mono text-xs">string</td>
                                            <td className="py-4">The unique identifier for the prompt suite (e.g., <code className="text-white/50 text-xs">hallmark_test_01</code>).</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 pr-4"><code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">context_layers</code></td>
                                            <td className="py-4 pr-4 font-mono text-xs">array[int]</td>
                                            <td className="py-4">Defines the depth of context. Max array length is 5.</td>
                                        </tr>
                                        <tr>
                                            <td className="py-4 pr-4"><code className="text-indigo-300 bg-indigo-500/10 px-1.5 py-0.5 rounded">emotional_load</code></td>
                                            <td className="py-4 pr-4 font-mono text-xs">boolean</td>
                                            <td className="py-4">If true, injects complex emotional baggage constraints into the testing prompt.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Content Block 4: Warning Callout */}
                        <div className="p-5 rounded-xl border border-rose-500/20 bg-rose-500/[0.03] flex gap-4">
                            <ShieldAlert className="text-rose-400 flex-shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="text-white font-medium mb-1">Destructive Operation Warning</h4>
                                <p className="text-sm text-white/60 leading-relaxed">
                                    Executing the defect cocktail over the <code className="text-rose-300/80">1.5 healthy_rebar</code> environment is an irreversible simulation step. Ensure all telemetry data from the pure baseline has been safely exported before initiating the defect integration.
                                </p>
                            </div>
                        </div>

                        {/* Content Block 5: JSON Response Example */}
                        <div>
                            <h2 className="text-2xl font-semibold text-white mb-4">Expected Response</h2>

                            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0C]">
                                <div className="flex items-center px-4 py-2 bg-white/[0.02] border-b border-white/10 text-xs font-mono text-white/40">
                                    <span>Response: 200 OK</span>
                                </div>
                                <div className="p-4 overflow-x-auto text-sm font-mono leading-relaxed text-slate-300">
                                    <span className="text-white/40">{"{"}</span><br />
                                    &nbsp;&nbsp;<span className="text-indigo-300">"status"</span>: <span className="text-green-300">"success"</span>,<br />
                                    &nbsp;&nbsp;<span className="text-indigo-300">"environment"</span>: <span className="text-white/40">{"{"}</span><br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-300">"model_id"</span>: <span className="text-green-300">"rebar_sim_1.5"</span>,<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-300">"events_processed"</span>: <span className="text-yellow-300">14000000</span>,<br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-300">"defect_cocktail_active"</span>: <span className="text-fuchsia-400">true</span><br />
                                    &nbsp;&nbsp;<span className="text-white/40">{"}"}</span><br />
                                    <span className="text-white/40">{"}"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Pagination / Next Steps */}
                        <hr className="border-white/10 mt-12" />
                        <div className="flex justify-between items-center pt-6">
                            <button className="text-white/40 hover:text-white text-sm font-medium transition-colors">
                                ← Previous: Authentication
                            </button>
                            <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
                                Next: Data Ingestion <ChevronRight size={16} />
                            </button>
                        </div>

                    </motion.div>
                </div>
            </main>

        </div>
    );
}