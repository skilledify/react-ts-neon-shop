import { useEffect, useState } from 'react';

const DROP_TARGET = Date.now() + 1000 * 60 * 60 * 68 + 1000 * 42;

function getParts(remaining: number) {
    const totalSeconds = Math.max(0, Math.floor(remaining / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
        { label: 'дней', value: days },
        { label: 'часов', value: hours },
        { label: 'минут', value: minutes },
        { label: 'секунд', value: seconds },
    ];
}

export function Countdown() {
    const [remaining, setRemaining] = useState(() =>
        Math.max(0, DROP_TARGET - Date.now())
    );

    useEffect(() => {
        const timer = window.setInterval(() => {
            setRemaining(Math.max(0, DROP_TARGET - Date.now()));
        }, 1000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <div
            className="grid grid-cols-4 gap-2"
            role="timer"
            aria-label="До следующего дропа"
        >
            {getParts(remaining).map((part) => (
                <div
                    key={part.label}
                    className="rounded-xl border border-white/10 bg-night-950/50 px-2 py-2.5 text-center backdrop-blur-sm"
                >
                    <span className="block font-display text-xl font-bold tabular-nums text-white sm:text-2xl">
                        {String(part.value).padStart(2, '0')}
                    </span>
                    <span className="mt-0.5 block text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                        {part.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
