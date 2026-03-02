"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/book", label: "Book a Call" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-[#070b14]/85 backdrop-blur-2xl border-b border-white/10"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* LOGO — Proper Left Alignment */}
                <Link href="/" className="flex items-center">
                    <div className="relative h-20 w-44">
                        <Image
                            src="/logos/synergy-logo.png"
                            alt="Synergy AI Logo"
                            fill
                            priority
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* DESKTOP LINKS */}
                <div className="hidden md:flex items-center gap-10">
                    {links.map((link) => {
                        const active = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-sm font-medium tracking-wide group"
                            >
                                <span
                                    className={`transition-colors duration-300 ${active ? "text-white" : "text-slate-400"
                                        } group-hover:text-white`}
                                >
                                    {link.label}
                                </span>

                                {/* Clean underline */}
                                <span
                                    className={`absolute left-0 -bottom-2 h-[2px] w-full bg-indigo-500 transition-transform duration-300 origin-left ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                />
                            </Link>
                        );
                    })}

                    {/* SOLID CTA BUTTON */}
                    <Link
                        href="/access"
                        className="px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                    >
                        Login
                    </Link>
                </div>

                {/* MOBILE TOGGLE */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-[#070b14]/95 backdrop-blur-2xl border-t border-white/10 px-6 py-8 space-y-6"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`block text-lg font-medium ${pathname === link.href
                                    ? "text-white"
                                    : "text-slate-400 hover:text-white"
                                    } transition`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* Consistent solid button */}
                        <Link
                            href="/access"
                            onClick={() => setOpen(false)}
                            className="block text-center mt-6 px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold transition hover:bg-indigo-500"
                        >
                            Login
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}