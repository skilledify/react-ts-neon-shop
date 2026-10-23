import type { ReactNode } from 'react';

interface EmptyStateProps {
    icon?: ReactNode;
    title: string;
    description: string;
    action?: ReactNode;
    className?: string;
}

export function EmptyState({
    icon,
    title,
    description,
    action,
    className = '',
}: EmptyStateProps) {
    return (
        <div
            className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center ${className}`}
        >
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="relative mx-auto flex max-w-md flex-col items-center gap-5">
                {icon && (
                    <span className="relative grid h-20 w-20 place-items-center rounded-full border border-white/10 bg-white/[0.05] text-fuchsia-300">
                        <span className="absolute inset-0 animate-pulse-ring rounded-full border border-fuchsia-400/30" />
                        {icon}
                    </span>
                )}
                <div>
                    <h2 className="font-display text-2xl font-bold text-white">
                        {title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {description}
                    </p>
                </div>
                {action}
            </div>
        </div>
    );
}
