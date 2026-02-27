"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";

export default function AmbientGlow() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathsRef = useRef<(SVGPathElement | null)[]>([]);
    const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

    // Softer premium palette
    const waves = [
        { color: "#6526d3ff", freq: 0.0014, amp: 80, speed: 0.0006, offset: 0, yOffset: -140 },
        { color: "#6526d3ff", freq: 0.002, amp: 70, speed: -0.0005, offset: 50, yOffset: -40 },
        { color: "#6526d3ff", freq: 0.0012, amp: 90, speed: 0.0008, offset: 90, yOffset: 70 },
        { color: "#6526d3ff", freq: 0.0016, amp: 75, speed: -0.0007, offset: 120, yOffset: 150 },
    ];

    // Resize observer
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;
            setDimensions({ w: rect.width, h: rect.height });
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    // Animation loop
    useAnimationFrame((time) => {
        const { w, h } = dimensions;
        if (!w || !h) return;

        waves.forEach((wave, i) => {
            let d = `M -100 ${h / 2 + wave.yOffset}`;

            for (let x = 0; x <= w + 100; x += 40) {
                const y =
                    h / 2 +
                    wave.yOffset +
                    Math.sin(x * wave.freq + time * wave.speed + wave.offset) * wave.amp +
                    Math.cos(x * (wave.freq * 0.6) - time * (wave.speed * 0.4)) *
                    (wave.amp * 0.35);

                d += ` Q ${x - 20} ${y} ${x} ${y}`;
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
                    {/* Proper blur — no rectangular artifact */}
                    <filter
                        id="blur-deep"
                        filterUnits="userSpaceOnUse"
                        x="-1000"
                        y="-1000"
                        width="4000"
                        height="4000"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur stdDeviation="35" />
                    </filter>

                    <filter
                        id="blur-mid"
                        filterUnits="userSpaceOnUse"
                        x="-1000"
                        y="-1000"
                        width="4000"
                        height="4000"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur stdDeviation="16" />
                    </filter>

                    <filter
                        id="blur-core"
                        filterUnits="userSpaceOnUse"
                        x="-1000"
                        y="-1000"
                        width="4000"
                        height="4000"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur stdDeviation="3" />
                    </filter>
                </defs>

                {dimensions.w > 0 &&
                    waves.map((wave, i) => {
                        const base = i * 3;
                        return (
                            <g key={i}>
                                {/* Outer atmospheric glow */}
                                <path
                                    ref={(el) => (pathsRef.current[base] = el)}
                                    fill="none"
                                    stroke={wave.color}
                                    strokeWidth={65}
                                    opacity={0.15}
                                    filter="url(#blur-deep)"
                                />

                                {/* Mid glow */}
                                <path
                                    ref={(el) => (pathsRef.current[base + 1] = el)}
                                    fill="none"
                                    stroke={wave.color}
                                    strokeWidth={26}
                                    opacity={0.35}
                                    filter="url(#blur-mid)"
                                />

                                {/* Core line */}
                                <path
                                    ref={(el) => (pathsRef.current[base + 2] = el)}
                                    fill="none"
                                    stroke={wave.color}
                                    strokeWidth={7}
                                    opacity={0.75}
                                    filter="url(#blur-core)"
                                    strokeLinecap="round"
                                />
                            </g>
                        );
                    })}
            </svg>

            {/* Soft edge fade */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(10,15,25,0.55)_100%)]" />
        </div>
    );
}