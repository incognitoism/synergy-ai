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

    // Add subtle background intensity on scroll
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
                ? "bg-[#070b14]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.4)]"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center group">
                    <div className="relative h-30 w-64">
                        <Image
                            src="/logos/synergy-logo.png"
                            alt="Synergy AI Logo"
                            fill
                            priority
                            className="object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {links.map((link) => {
                        const active = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative text-sm font-medium tracking-wide transition-colors duration-300"
                            >
                                <span
                                    className={`${active ? "text-white" : "text-slate-400"
                                        } hover:text-white`}
                                >
                                    {link.label}
                                </span>

                                {/* Animated underline */}
                                <span
                                    className={`absolute left-0 -bottom-2 h-[2px] w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 transition-transform duration-300 origin-left ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                                        }`}
                                />
                            </Link>
                        );
                    })}

                    {/* Premium CTA */}
                    <Link
                        href="/access"
                        className="relative px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)]"
                    >
                        Login
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-white"
                >
                    {open ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile Menu */}
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

                        <Link
                            href="/book"
                            onClick={() => setOpen(false)}
                            className="block text-center mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-500 text-white font-semibold"
                        >
                            Book a Call
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}