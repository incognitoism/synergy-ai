"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";

export default function AmbientGlow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathsRef = useRef<(SVGPathElement | null)[]>([]);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

    const waves = [
        // Deep indigo — slow, wide, anchors the scene
        { color: "#4f35e8", freq: 0.0011, amp: 95, speed: 0.0004, offset: 0, yOffset: -160, coreOpacity: 0.55, midOpacity: 0.22, outerOpacity: 0.08 },
        // Violet — mid layer, counter-moving
        { color: "#7c3aed", freq: 0.0018, amp: 72, speed: -0.0005, offset: 40, yOffset: -30, coreOpacity: 0.65, midOpacity: 0.28, outerOpacity: 0.10 },
        // Soft blue-violet — subtle, high frequency shimmer
        { color: "#6d28d9", freq: 0.0025, amp: 55, speed: 0.0009, offset: 80, yOffset: 80, coreOpacity: 0.40, midOpacity: 0.18, outerOpacity: 0.07 },
        // Fuchsia accent — the one color pop, barely visible
        { color: "#a855f7", freq: 0.0014, amp: 65, speed: -0.0006, offset: 110, yOffset: 170, coreOpacity: 0.30, midOpacity: 0.14, outerOpacity: 0.05 },
    ];

    useEffect(() => {
        if (!containerRef.current) return;
        const ro = new ResizeObserver((entries) => {
            const r = entries[0].contentRect;
            setDimensions({ w: r.width, h: r.height });
        });
        ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, []);

    useAnimationFrame((time) => {
        const { w, h } = dimensions;
        if (!w || !h) return;

        waves.forEach((wave, i) => {
            // Organic path: layered sine + cosine for natural drift
            let d = `M -120 ${h / 2 + wave.yOffset}`;
            for (let x = 0; x <= w + 120; x += 36) {
                const y =
                    h / 2 +
                    wave.yOffset +
                    Math.sin(x * wave.freq + time * wave.speed + wave.offset) * wave.amp +
                    Math.cos(x * wave.freq * 0.55 - time * wave.speed * 0.7 + wave.offset * 0.4) * (wave.amp * 0.38) +
                    Math.sin(x * wave.freq * 1.8 + time * wave.speed * 1.2) * (wave.amp * 0.12);
                d += ` Q ${x - 18} ${y} ${x} ${y}`;
            }

            const base = i * 3;
            pathsRef.current[base]?.setAttribute("d", d);
            pathsRef.current[base + 1]?.setAttribute("d", d);
            pathsRef.current[base + 2]?.setAttribute("d", d);
        });
    });

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0"
        >
            <svg
                width="100%"
                height="100%"
                viewBox={`0 0 ${dimensions.w} ${dimensions.h}`}
                preserveAspectRatio="none"
                style={{ mixBlendMode: "screen" }}
            >
                <defs>
                    {/* Atmospheric halo — very wide spread */}
                    <filter id="blur-halo" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="6000" height="6000" colorInterpolationFilters="sRGB">
                        <feGaussianBlur stdDeviation="55" />
                    </filter>
                    {/* Deep glow */}
                    <filter id="blur-deep" filterUnits="userSpaceOnUse" x="-1000" y="-1000" width="4000" height="4000" colorInterpolationFilters="sRGB">
                        <feGaussianBlur stdDeviation="28" />
                    </filter>
                    {/* Mid glow */}
                    <filter id="blur-mid" filterUnits="userSpaceOnUse" x="-1000" y="-1000" width="4000" height="4000" colorInterpolationFilters="sRGB">
                        <feGaussianBlur stdDeviation="10" />
                    </filter>
                    {/* Crisp core */}
                    <filter id="blur-core" filterUnits="userSpaceOnUse" x="-1000" y="-1000" width="4000" height="4000" colorInterpolationFilters="sRGB">
                        <feGaussianBlur stdDeviation="1.5" />
                    </filter>
                </defs>

                {dimensions.w > 0 && waves.map((wave, i) => {
                    const base = i * 3;
                    return (
                        <g key={i}>
                            {/* Halo — widest, most atmospheric */}
                            <path
                                ref={(el) => { pathsRef.current[base] = el; }}
                                fill="none"
                                stroke={wave.color}
                                strokeWidth={110}
                                opacity={wave.outerOpacity}
                                filter="url(#blur-halo)"
                            />
                            {/* Mid bloom */}
                            <path
                                ref={(el) => { pathsRef.current[base + 1] = el; }}
                                fill="none"
                                stroke={wave.color}
                                strokeWidth={32}
                                opacity={wave.midOpacity}
                                filter="url(#blur-mid)"
                            />
                            {/* Core filament — sharp, bright */}
                            <path
                                ref={(el) => { pathsRef.current[base + 2] = el; }}
                                fill="none"
                                stroke={wave.color}
                                strokeWidth={2.5}
                                opacity={wave.coreOpacity}
                                filter="url(#blur-core)"
                                strokeLinecap="round"
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Top + bottom fade — keeps waves from bleeding to edges */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-dark-900 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark-900 to-transparent" />
            {/* Radial center depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_50%,transparent_50%,rgba(5,5,15,0.5)_100%)]" />
        </div>
    );
}