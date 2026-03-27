"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
    {
        type: "AI Dashboard",
        title: "Analytics platform for an e-commerce brand",
        description: "Built a real-time dashboard that pulls data from Shopify, runs it through GPT-4 for insights, and surfaces actionable recommendations. Replaced 3 separate tools.",
        tech: ["Next.js", "OpenAI", "PostgreSQL", "Vercel"],
        color: "indigo",
        image: "/projects/project-1.svg",
    },
    {
        type: "Startup MVP",
        title: "Booking platform for a fitness startup",
        description: "Took a Figma mockup to a fully working app in 5 weeks. Class scheduling, payments via Stripe, trainer dashboards, and automated reminders. They raised their seed round 2 months later.",
        tech: ["React", "Node.js", "Stripe", "Supabase"],
        color: "violet",
        image: "/projects/project-2.svg",
    },
    {
        type: "Internal Tool",
        title: "Ops automation for a logistics company",
        description: "Built an internal system that automated their dispatch workflow, connected to their existing CRM, and cut manual data entry by ~6 hours a day. Nothing flashy — just works.",
        tech: ["Python", "React", "PostgreSQL", "AWS"],
        color: "cyan",
        image: "/projects/project-3.svg",
    },
];

const colorMap: Record<string, string> = {
    indigo: "border-indigo-500/20 hover:border-indigo-500/40",
    violet: "border-violet-500/20 hover:border-violet-500/40",
    cyan: "border-cyan-500/20 hover:border-cyan-500/40",
};

const tagColorMap: Record<string, string> = {
    indigo: "text-indigo-400/60 border-indigo-500/10",
    violet: "text-violet-400/60 border-violet-500/10",
    cyan: "text-cyan-400/60 border-cyan-500/10",
};

const overlayMap: Record<string, string> = {
    indigo: "from-indigo-950/40",
    violet: "from-violet-950/40",
    cyan: "from-cyan-950/40",
};

export default function RecentWork() {
    return (
        <section className="py-28 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid opacity-25" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 md:mb-20"
                >
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: 40 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="h-[2px] bg-gradient-to-r from-accent to-purple-500 mb-5 rounded-full"
                    />
                    <p className="text-[10px] tracking-[0.28em] uppercase text-accent-light font-mono mb-4">
                        Recent work
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                        Stuff we&apos;ve{" "}
                        <span className="text-gradient">actually built</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-5">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 + 0.15, duration: 0.6 }}
                            className={`group rounded-2xl border ${colorMap[project.color]} bg-[#0a0a14]/80 overflow-hidden transition-all duration-500 hover:bg-[#0c0c18]/80 flex flex-col`}
                        >
                            {/* Screenshot area */}
                            <div className="relative h-[220px] overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                                    unoptimized
                                />
                                {/* Gradient overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${overlayMap[project.color]} to-transparent`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6 pt-4 flex-1 flex flex-col">
                                <span className="text-[10px] tracking-[0.2em] uppercase text-slate-600 font-mono mb-2">
                                    {project.type}
                                </span>
                                <h3 className="text-[15px] font-semibold text-white/90 mb-2.5 leading-snug tracking-tight">
                                    {project.title}
                                </h3>
                                <p className="text-[13px] text-slate-400 leading-relaxed font-light flex-1">
                                    {project.description}
                                </p>

                                {/* Tech tags */}
                                <div className="flex flex-wrap gap-1.5 mt-4">
                                    {project.tech.map(t => (
                                        <span key={t} className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tagColorMap[project.color]} bg-white/[0.02]`}>
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
