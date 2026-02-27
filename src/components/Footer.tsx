import { Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-10 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent-light" />
                    <span className="text-sm font-semibold">Synergy AI Solutions</span>
                </div>
                <p className="text-xs text-slate-500">
                    © {new Date().getFullYear()} Synergy AI Solutions. All rights reserved.
                </p>
            </div>
        </footer>
    );
}