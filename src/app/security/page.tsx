"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ShieldCheck,
    Lock,
    Server,
    Fingerprint,
    FileText,
    Eye,
    Activity,
    CheckCircle2,
    Database,
    KeyRound
} from "lucide-react";

export default function SecurityPage() {
    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
    };

    const stagger = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    return (
        <main className="min-h-screen bg-[#05030A] text-slate-300 font-sans selection:bg-emerald-500/30 overflow-hidden pb-24">

            {/* ==========================================
          1. AMBIENT BACKGROUND LIGHTING
          ========================================== */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,transparent_60%)]" />
                <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle,rgba(79,70,229,0.08)_0%,transparent_60%)]" />
            </div>

            {/* ==========================================
          2. GLOWING HERO SECTION
          ========================================== */}
            <div className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto text-center border-b border-white/5">
                <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl mx-auto">

                    <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-8">
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Security & Compliance Center
                        </div>
                    </motion.div>

                    {/* Optical Glowing Text Engine */}
                    <motion.div variants={fadeUp} className="relative mb-8">
                        <h1 className="absolute inset-0 text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400 blur-[32px] opacity-40 select-none pointer-events-none">
                            Uncompromising<br />Infrastructure
                        </h1>
                        <h1 className="relative text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 leading-[1.1]">
                            Uncompromising<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-indigo-300">
                                Infrastructure
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p variants={fadeUp} className="text-lg text-white/50 leading-relaxed font-light">
                        Your proprietary model weights, telemetry data, and adversarial simulation environments are secured by military-grade encryption and rigorous compliance frameworks.
                    </motion.p>
                </motion.div>
            </div>

            {/* ==========================================
          3. CERTIFICATIONS DUMP (The Bingo Grid)
          ========================================== */}
            <div className="relative max-w-6xl mx-auto px-6 py-20">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
                    <div className="mb-12">
                        <h2 className="text-2xl font-semibold text-white mb-2">Global Certifications</h2>
                        <p className="text-white/40">Continuously audited by independent third-party firms.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Cert 1 */}
                        <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-colors group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ShieldCheck className="text-emerald-400 mb-4" size={32} strokeWidth={1.5} />
                            <h3 className="text-xl font-medium text-white mb-2">SOC 2 Type II</h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Security, availability, and confidentiality controls are rigorously tested and verified annually.
                            </p>
                        </motion.div>

                        {/* Cert 2 */}
                        <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-teal-500/30 transition-colors group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Lock className="text-teal-400 mb-4" size={32} strokeWidth={1.5} />
                            <h3 className="text-xl font-medium text-white mb-2">ISO 27001</h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Certified adherence to the world's most rigorous information security management standards.
                            </p>
                        </motion.div>

                        {/* Cert 3 */}
                        <motion.div variants={fadeUp} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-colors group relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <FileText className="text-indigo-400 mb-4" size={32} strokeWidth={1.5} />
                            <h3 className="text-xl font-medium text-white mb-2">GDPR & CCPA</h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                Full compliance with major global data privacy frameworks for enterprise telemetry handling.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* ==========================================
          4. ARCHITECTURE & ENCRYPTION SPECS
          ========================================== */}
            <div className="relative border-y border-white/5 bg-[#030108]/50 py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Left Side: Dense Text & Specs */}
                        <motion.div variants={fadeUp} className="flex flex-col justify-center">
                            <h2 className="text-3xl font-semibold text-white mb-6">Zero-Trust Architecture</h2>
                            <p className="text-white/50 leading-relaxed mb-8">
                                Our infrastructure is built on a "never trust, always verify" model. Whether you are running 14-million event baselines or deploying adversarial prompt suites, your data is cryptographically isolated at every layer of the stack.
                            </p>

                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="mt-1"><KeyRound className="text-indigo-400" size={20} /></div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Encryption at Rest & Transit</h4>
                                        <p className="text-sm text-white/40">All databases and block storage volumes are encrypted using AES-256. Data in transit is secured via TLS 1.3 with Perfect Forward Secrecy (PFS).</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="mt-1"><Database className="text-indigo-400" size={20} /></div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Data Residency & Isolation</h4>
                                        <p className="text-sm text-white/40">Client environments operate in single-tenant VPCs. Defect cocktail simulations and proprietary model weights never share hardware memory space with other tenants.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="mt-1"><Fingerprint className="text-indigo-400" size={20} /></div>
                                    <div>
                                        <h4 className="text-white font-medium mb-1">Identity & Access (IAM)</h4>
                                        <p className="text-sm text-white/40">Strict Role-Based Access Control (RBAC). Mandatory MFA, SSO integration via SAML 2.0, and short-lived credential brokering for all internal services.</p>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Right Side: Glowing Visual Spec Table */}
                        <motion.div variants={fadeUp} className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/10 to-transparent">
                            <div className="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-3xl -z-10" />
                            <div className="h-full w-full bg-[#0A0710] rounded-3xl p-8 flex flex-col justify-between border border-white/5">
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <Server size={18} className="text-white/40" />
                                        <span className="font-mono text-sm text-white/60">System Configuration</span>
                                    </div>
                                    <span className="px-2 py-1 bg-green-500/10 text-green-400 font-mono text-[10px] uppercase rounded">Hardened</span>
                                </div>

                                <div className="space-y-4 font-mono text-xs">
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-white/40">KMS Protocol</span>
                                        <span className="text-indigo-300">FIPS 140-2 Level 3</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-t border-white/5">
                                        <span className="text-white/40">Vulnerability Scanning</span>
                                        <span className="text-indigo-300">Continuous / Automated</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-t border-white/5">
                                        <span className="text-white/40">WAF Ruleset</span>
                                        <span className="text-indigo-300">OWASP Top 10 Active</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-t border-white/5">
                                        <span className="text-white/40">DDoS Mitigation</span>
                                        <span className="text-indigo-300">L3/L4 & L7 100Tbps+</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-t border-white/5">
                                        <span className="text-white/40">Audit Logging</span>
                                        <span className="text-indigo-300">Immutable / 365 Days</span>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-white/30 uppercase tracking-widest">
                                    <Activity size={12} className="text-emerald-500" /> Live Threat Monitoring Active
                                </div>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </div>

            {/* ==========================================
          5. CTA / REPORT DOWNLOAD DUMP
          ========================================== */}
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 text-white/50">
                        <Eye size={28} strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-semibold text-white mb-4">Need detailed compliance reports?</h2>
                    <p className="text-white/50 mb-8 max-w-xl mx-auto leading-relaxed">
                        Enterprise clients can request full access to our SOC 2 Type II report, penetration testing summaries, and vendor risk assessments.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#050505] font-medium transition-colors w-full sm:w-auto">
                            Request Compliance Packet
                        </button>
                        <Link href="/security/bug-bounty" className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/5 text-white transition-colors w-full sm:w-auto">
                            Bug Bounty Program
                        </Link>
                    </div>
                </motion.div>
            </div>

        </main>
    );
}