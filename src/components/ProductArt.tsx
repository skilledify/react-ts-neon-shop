import type { Good } from '../types';

interface ProductArtProps {
    good: Good;
    className?: string;
    emojiClassName?: string;
    showLabel?: boolean;
}

export function ProductArt({
    good,
    className = '',
    emojiClassName = 'text-[34cqw]',
    showLabel = true,
}: ProductArtProps) {
    if (good.image) {
        return (
            <div className={`relative isolate overflow-hidden ${className}`}>
                <img
                    src={good.image}
                    alt={good.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night-950/55 via-transparent to-white/5" />
            </div>
        );
    }

    const [from, to] = good.accent ?? ['#7c3aed', '#0e7490'];

    return (
        <div
            className={`relative isolate overflow-hidden [container-type:inline-size] ${className}`}
            style={{
                backgroundImage: `linear-gradient(140deg, ${from} 0%, ${to} 100%)`,
            }}
            role="img"
            aria-label={good.name}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.42),transparent_42%)]" />
            <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/25 bg-white/10" />
            <div className="absolute -bottom-12 -left-10 h-44 w-44 rounded-full border-[18px] border-white/10" />
            <div className="absolute inset-x-6 bottom-5 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
            <span
                className={`absolute inset-0 flex items-center justify-center drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] transition-transform duration-700 ease-out group-hover:-rotate-6 group-hover:scale-110 ${emojiClassName}`}
            >
                {good.emoji ?? '✦'}
            </span>
            {showLabel && (
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-[0.4em] text-white/55">
                    Neon Collection
                </span>
            )}
        </div>
    );
}
