import type { ReactNode } from 'react';

interface SectionHeadingProps {
    eyebrow: string;
    title: ReactNode;
    description?: ReactNode;
    action?: ReactNode;
    className?: string;
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    action,
    className = '',
}: SectionHeadingProps) {
    return (
        <div
            className={`flex flex-wrap items-end justify-between gap-4 ${className}`}
        >
            <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                    {eyebrow}
                </span>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {title}
                </h2>
                {description && (
                    <p className="mt-2 max-w-xl text-sm text-zinc-400">
                        {description}
                    </p>
                )}
            </div>
            {action}
        </div>
    );
}
