"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AccessPage() {
    return (
        <main className="access-page">

            <section className="access-shell">

                {/* LEFT — CONTEXT */}
                <div className="access-left">
                    <div className="spectral-gradient" />
                    <div className="noise-layer" />

                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="left-content"
                    >
                        <span className="instrument-label">
                            Secure Node 01
                        </span>

                        <h1>
                            Intelligent Systems<br />
                            Access Portal
                        </h1>

                        <p>
                            Authorized gateway to Synergy AI operational systems,
                            strategic dashboards, and advanced automation frameworks.
                        </p>

                        <div className="synergy-note">
                            Operated under <strong>Synergy Subsystems</strong>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT — ENTRY */}
                <div className="access-right">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="entry-wrapper"
                    >
                        <h2>Authentication Gateway</h2>

                        <p className="subtitle">
                            Select an access path to continue.
                        </p>

                        <div className="button-group">

                            <Link href="/signin" className="primary-btn">
                                Initiate Session
                            </Link>

                            <Link href="/signup" className="secondary-btn">
                                Request Access
                            </Link>

                        </div>

                    </motion.div>
                </div>

            </section>

            <style jsx>{`
        :root {
          --bg: #0b0f19;
          --panel: #0f1523;
          --text: #e2e8f0;
          --muted: #64748b;
          --line: rgba(255,255,255,0.08);
          --accent: #ffffff;
        }

        .access-page {
          min-height: 100vh;
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem;
          font-family: system-ui, -apple-system, sans-serif;
          color: var(--text);
        }

        .access-shell {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: var(--panel);
          border: 1px solid var(--line);
          border-radius: 24px;
          overflow: hidden;
        }

        /* LEFT SIDE */

        .access-left {
          position: relative;
          background: #05070c;
          padding: 5rem;
          overflow: hidden;
        }

        .spectral-gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              600px circle at 30% 20%,
              rgba(255,255,255,0.05),
              transparent 60%
            ),
            radial-gradient(
              500px circle at 80% 80%,
              rgba(255,255,255,0.03),
              transparent 65%
            );
          animation: drift 18s ease-in-out infinite alternate;
        }

        @keyframes drift {
          from { transform: translateY(0); }
          to { transform: translateY(-50px); }
        }

        .noise-layer {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='120' height='120' filter='url(%23n)' opacity='0.04'/></svg>");
        }

        .left-content {
          position: relative;
          max-width: 460px;
        }

        .instrument-label {
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          border-bottom: 1px solid white;
          padding-bottom: 0.6rem;
          margin-bottom: 1.2rem;
          display: inline-block;
          opacity: 0.6;
        }

        .access-left h1 {
          font-size: 2.8rem;
          font-weight: 400;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .access-left p {
          color: #94a3b8;
          font-size: 0.95rem;
          line-height: 1.7;
        }

        .synergy-note {
          margin-top: 2rem;
          font-size: 0.75rem;
          color: #64748b;
        }

        /* RIGHT SIDE */

        .access-right {
          padding: 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .entry-wrapper {
          width: 100%;
          max-width: 360px;
        }

        .entry-wrapper h2 {
          font-size: 2rem;
          font-weight: 400;
          margin-bottom: 1rem;
        }

        .subtitle {
          color: var(--muted);
          font-size: 0.85rem;
          margin-bottom: 3rem;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .primary-btn {
          padding: 0.9rem;
          background: white;
          color: black;
          text-align: center;
          border-radius: 999px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .primary-btn:hover {
          transform: scale(1.03);
          box-shadow: 0 0 40px rgba(255,255,255,0.15);
        }

        .secondary-btn {
          padding: 0.9rem;
          border: 1px solid var(--line);
          text-align: center;
          border-radius: 999px;
          font-weight: 500;
          color: var(--text);
          transition: all 0.3s ease;
        }

        .secondary-btn:hover {
          border-color: white;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .access-shell {
            grid-template-columns: 1fr;
          }

          .access-left {
            display: none;
          }
        }

      `}</style>

        </main>
    );
}