"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const tools = [
    { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
    { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
    { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
    { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
    { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
    { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
    { name: "OpenAI", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg" },
    { name: "Stripe", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg" },
    { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
    { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
];

export default function Marquee() {
    const doubled = [...tools, ...tools];

    return (
        <div className="relative py-8 overflow-hidden border-y border-white/[0.03] bg-dark-900">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-10" />

            <motion.div
                className="flex whitespace-nowrap gap-12 items-center"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    x: { repeat: Infinity, repeatType: "loop", duration: 40, ease: "linear" },
                }}
            >
                {doubled.map((tool, i) => (
                    <div key={i} className="flex items-center gap-2.5 shrink-0 select-none">
                        <Image
                            src={tool.logo}
                            alt={tool.name}
                            width={20}
                            height={20}
                            className="opacity-40 hover:opacity-80 transition-opacity duration-300 invert"
                            unoptimized
                        />
                        <span className="text-[12px] tracking-wide text-white/[0.25] font-medium">
                            {tool.name}
                        </span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
