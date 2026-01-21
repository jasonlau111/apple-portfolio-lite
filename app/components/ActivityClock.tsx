'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from 'next-themes';

export default function ActivityClock() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // State for time display
    const [time, setTime] = useState({
        dateStr: '',
        timeStr: '',
        period: '',
        h: 0, m: 0, s: 0, ms: 0
    });

    // Ref for animation loop
    const frameRef = useRef<number>(0);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const update = () => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const day = now.getDate();
            const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            const weekday = weekdays[now.getDay()];

            const hours = now.getHours();
            const mins = now.getMinutes();
            const secs = now.getSeconds();
            const ms = now.getMilliseconds();

            // Period (Chinese)
            let period;
            if (hours >= 0 && hours < 6) period = '凌晨';
            else if (hours >= 6 && hours < 11) period = '上午';
            else if (hours >= 11 && hours < 13) period = '中午';
            else if (hours >= 13 && hours < 18) period = '下午';
            else period = '晚上';

            const displayHours = hours % 12 || 12;
            const timeString = `${displayHours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            const dateString = `${month}月${day}日 ${weekday}`;

            setTime({
                dateStr: dateString,
                timeStr: timeString,
                period,
                h: hours,
                m: mins,
                s: secs,
                ms: ms
            });

            frameRef.current = requestAnimationFrame(update);
        };

        frameRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    // --- THEME-AWARE COLORS ---
    const isDark = mounted && resolvedTheme === 'dark';

    // Ring colors: Softer in light mode, vibrant in dark mode
    const rings = isDark ? [
        { radius: 120, color: 'hsl(270,80%,60%)' },  // Vibrant Purple
        { radius: 95, color: 'hsl(145,70%,50%)' },   // Vibrant Green
        { radius: 70, color: 'hsl(200,90%,55%)' }    // Vibrant Blue
    ] : [
        { radius: 120, color: 'hsl(270,45%,55%)' },  // Muted Lavender
        { radius: 95, color: 'hsl(145,40%,50%)' },   // Muted Green
        { radius: 70, color: 'hsl(210,50%,50%)' }    // Muted Blue
    ];

    // Background: Deep purple in dark, soft gray in light
    const bgStyle = isDark
        ? { background: 'radial-gradient(circle, rgba(15,12,41,0.95) 0%, rgba(48,43,99,0.85) 70%, transparent 100%)', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }
        : { background: 'radial-gradient(circle, rgba(230,230,235,1) 0%, rgba(200,200,210,0.8) 70%, transparent 100%)', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' };

    // Text colors
    const textPrimary = isDark ? 'text-white' : 'text-[#1d1d1f]';
    const textSecondary = isDark ? 'text-white/70' : 'text-[#6e6e73]';

    const getOffset = (index: number) => {
        const { h, m, s, ms } = time;
        const radius = rings[index].radius;
        const circumference = 2 * Math.PI * radius;
        let progress = 0;

        if (index === 0) progress = (h * 3600 + m * 60 + s) / 86400;
        else if (index === 1) progress = (m * 60 + s) / 3600;
        else progress = (s + ms / 1000) / 60;

        return circumference * (1 - progress);
    };

    // Avoid hydration mismatch for bg
    if (!mounted) {
        return <div className="relative w-full max-w-[280px] aspect-square mx-auto rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />;
    }

    return (
        <div className="relative w-full max-w-[320px] aspect-square mx-auto rounded-full shadow-xl overflow-hidden transition-all duration-500">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 transition-all duration-500" style={bgStyle} />

            {/* Rings SVG */}
            <svg className="absolute inset-0 w-full h-full z-10 rotate-[-90deg]" viewBox="0 0 256 256">
                {rings.map((ring, i) => (
                    <g key={i}>
                        {/* Background Ring */}
                        <circle
                            cx="128" cy="128" r={ring.radius}
                            fill="none" stroke={ring.color} strokeWidth="12"
                            opacity="0.2"
                        />
                        {/* Progress Ring */}
                        <circle
                            cx="128" cy="128" r={ring.radius}
                            fill="none" stroke={ring.color} strokeWidth="12"
                            strokeDasharray={2 * Math.PI * ring.radius}
                            strokeDashoffset={getOffset(i)}
                            strokeLinecap="round"
                            className="transition-all duration-75 ease-linear"
                        />
                    </g>
                ))}
            </svg>

            {/* Center Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20 w-full px-4">
                <div className={`${textSecondary} text-sm mb-2 font-medium tracking-wide transition-colors`}>
                    {time.dateStr}
                </div>
                <div className={`${textPrimary} text-2xl font-semibold mb-1 tabular-nums tracking-tight transition-colors`}>
                    {time.timeStr}
                </div>
                <div className={`${textSecondary} text-sm font-light transition-colors`}>
                    {time.period}
                </div>
            </div>
        </div>
    );
}
