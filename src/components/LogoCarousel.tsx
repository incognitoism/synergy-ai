"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Replace these with real logos later — use /public/logos/logo-1.png etc.
const logos = [
    { name: "Acme Corp", src: "/logos/logo-1.png" },
    { name: "NovaTech", src: "/logos/logo-2.png" },
    { name: "Pinnacle", src: "/logos/logo-3.png" },
    { name: "Vertex AI", src: "/logos/logo-4.png" },
    { name: "Helix", src: "/logos/logo-5.png" },
    { name: "Stratos", src: "/logos/logo-6.png" },
    { name: "Orbit", src: "/logos/logo-7.png" },
    { name: "Catalyst", src: "/logos/logo-8.png" },
];

// Double the array for seamless infinite scroll
const doubled = [...logos, ...logos];

export default function LogoCarousel() {
    return (
        <section className="py-16 border-y border-white/5 overflow-hidden">
            <p className="text-center text-xs tracking-[0.25em] uppercase text-slate-500 mb-10 font-mono">
                Trusted by forward-thinking teams
            </p>

            <div className="relative w-full">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex items-center gap-16 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                >
                    {doubled.map((logo, i) => (
                        <div
                            key={`${logo.name}-${i}`}
                            className="flex-shrink-0 w-28 h-10 relative opacity-30 hover:opacity-60 transition-opacity duration-300"
                        >
                            {/* 
                Replace with <Image> when you have real logos.
                For now, placeholder boxes with text.
              */}
                            <div className="w-full h-full flex items-center justify-center">
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={112}
                                    height={40}
                                    className="object-contain brightness-0 invert"
                                    onError={(e) => {
                                        // Fallback if image doesn't exist yet
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = "none";
                                        target.parentElement!.innerHTML = `<span class="text-sm font-medium text-slate-500 tracking-wide">${logo.name}</span>`;
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}