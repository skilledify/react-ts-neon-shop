import type { ReactNode } from 'react';

interface PageHeaderProps {
    eyebrow: string;
    title: ReactNode;
    description?: ReactNode;
    icon?: ReactNode;
    actions?: ReactNode;
    className?: string;
}

export function PageHeader({
    eyebrow,
    title,
    description,
    icon,
    actions,
    className = '',
}: PageHeaderProps) {
    return (
        <section
            className={`relative overflow-hidden border-b border-white/10 ${className}`}
        >
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_70%_80%_at_25%_0%,black,transparent)]" />
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-[100px]" />

            <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8 lg:py-16">
                <div>
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                        {icon}
                        {eyebrow}
                    </span>
                    <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                            {description}
                        </p>
                    )}
                </div>

                {actions && (
                    <div className="flex flex-wrap items-center gap-3">
                        {actions}
                    </div>
                )}
            </div>
        </section>
    );
}
