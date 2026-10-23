export function CatalogSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: count }, (_, index) => (
                <div
                    key={index}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                >
                    <div className="relative aspect-[4/5] overflow-hidden bg-white/[0.04]">
                        <div className="absolute inset-0 skeleton-shimmer" />
                    </div>
                    <div className="space-y-3 p-5">
                        <div className="h-2.5 w-20 rounded-full bg-white/10" />
                        <div className="h-4 w-3/4 rounded-full bg-white/10" />
                        <div className="h-2.5 w-full rounded-full bg-white/[0.07]" />
                        <div className="h-2.5 w-2/3 rounded-full bg-white/[0.07]" />
                        <div className="flex items-center justify-between pt-3">
                            <div className="h-5 w-20 rounded-full bg-white/10" />
                            <div className="h-9 w-24 rounded-xl bg-white/10" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
