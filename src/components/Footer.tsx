import { Sparkles } from "lucide-react";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 bg-black py-12 px-6">
            <div className="max-w-6xl mx-auto">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between gap-10">

                    {/* Left: Social + Brand */}
                    <div className="flex flex-col gap-6">

                        {/* Social Icons */}
                        <div className="flex items-center gap-5 text-slate-400">
                            <a href="https://github.com" target="_blank" className="hover:text-white transition">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" className="hover:text-white transition">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" className="hover:text-white transition">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="mailto:[EMAIL_ADDRESS]" className="hover:text-white transition">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Brand */}
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent-light" />
                            <span className="text-sm font-semibold text-white">
                                Synergy AI Solutions
                            </span>
                        </div>
                    </div>

                    {/* Right: Minimal Links */}
                    <div className="flex gap-12 text-sm text-slate-400">

                        <div className="flex flex-col gap-3">
                            <span className="text-white font-medium">Company</span>
                            <Link href="/about" className="hover:text-white transition">
                                About
                            </Link>
                            <Link href="/services" className="hover:text-white transition">
                                Services
                            </Link>
                            <Link href="/contact" className="hover:text-white transition">
                                Contact
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                            <span className="text-white font-medium">Legal</span>
                            <Link href="/privacy" className="hover:text-white transition">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition">
                                Terms of Service
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Bottom Line */}
                <div className="mt-10 pt-6 border-t border-white/5 text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <span>
                        © {new Date().getFullYear()} Synergy AI Solutions. All rights reserved.
                    </span>

                    <span className="text-slate-600">
                        Helping businesses build smarter digital experiences🤖
                    </span>
                </div>

            </div>
        </footer>
    );
}