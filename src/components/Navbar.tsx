"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";

const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
    { href: "/book", label: "Book a Call" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-dark-900/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition">
                        <Sparkles className="w-4 h-4 text-accent-light" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">
                        Synergy<span className="text-gradient"> AI</span>
                    </span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="text-sm text-slate-400 hover:text-white transition-colors"
                        >
                            {l.label}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-accent hover:bg-accent-dark transition text-white"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile toggle */}
                <button onClick={() => setOpen(!open)} className="md:hidden text-slate-400">
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden border-t border-white/5 bg-dark-900/95 backdrop-blur-xl px-6 py-4 space-y-3">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className="block text-sm text-slate-400 hover:text-white py-2"
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}