import { Link } from 'react-router';
import { formatPrice } from '../lib/format';
import { useShop } from '../store/ShopContext';
import type { Good } from '../types';
import { CompareIcon, HeartIcon, PlusIcon, StarIcon } from './icons';
import { ProductArt } from './ProductArt';

interface ProductCardProps {
    good: Good;
    index?: number;
}

export function ProductCard({ good, index = 0 }: ProductCardProps) {
    const {
        addToBasket,
        wishlist,
        compare,
        toggleWishlist,
        toggleCompare,
    } = useShop();
    const productPath = `/product/${encodeURIComponent(good.id)}`;
    const isWishlisted = wishlist.includes(good.id);
    const isCompared = compare.includes(good.id);
    const discount = good.oldPrice
        ? Math.round((1 - good.price / good.oldPrice) * 100)
        : 0;

    return (
        <article
            className="group relative flex animate-fade-up flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-500 ease-out hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_35px_90px_-45px_rgba(139,92,246,0.85)]"
            style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
        >
            <div className="relative">
                <Link
                    to={productPath}
                    aria-label={`Открыть ${good.name}`}
                    className="block overflow-hidden"
                >
                    <ProductArt good={good} className="aspect-[4/5] w-full" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night-950/80 to-transparent opacity-80" />
                </Link>

                <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
                    {discount > 0 && (
                        <span className="rounded-full bg-gradient-to-r from-rose-500 to-amber-400 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-night-950 shadow-lg shadow-rose-500/30">
                            −{discount}%
                        </span>
                    )}
                    {good.tag && (
                        <span className="rounded-full border border-white/25 bg-night-950/55 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                            {good.tag}
                        </span>
                    )}
                </div>

                <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
                    <button
                        type="button"
                        onClick={() => toggleWishlist(good)}
                        aria-label={
                            isWishlisted
                                ? `Убрать «${good.name}» из избранного`
                                : `Добавить «${good.name}» в избранное`
                        }
                        aria-pressed={isWishlisted}
                        className={`grid h-8 w-8 place-items-center rounded-lg border backdrop-blur-md transition ${
                            isWishlisted
                                ? 'border-fuchsia-400/50 bg-fuchsia-500/25 text-fuchsia-200'
                                : 'border-white/20 bg-night-950/55 text-zinc-300 hover:border-fuchsia-400/40 hover:text-fuchsia-200'
                        }`}
                    >
                        <HeartIcon
                            filled={isWishlisted}
                            className="h-4 w-4"
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleCompare(good)}
                        aria-label={
                            isCompared
                                ? `Убрать «${good.name}» из сравнения`
                                : `Добавить «${good.name}» к сравнению`
                        }
                        aria-pressed={isCompared}
                        className={`grid h-8 w-8 place-items-center rounded-lg border backdrop-blur-md transition ${
                            isCompared
                                ? 'border-cyan-300/50 bg-cyan-400/20 text-cyan-200'
                                : 'border-white/20 bg-night-950/55 text-zinc-300 hover:border-cyan-300/40 hover:text-cyan-200'
                        }`}
                    >
                        <CompareIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    <span className="truncate">{good.category ?? 'Коллекция'}</span>
                    {typeof good.rating === 'number' && (
                        <span className="inline-flex shrink-0 items-center gap-1 text-amber-300">
                            <StarIcon className="h-3 w-3" />
                            {good.rating.toFixed(1)}
                        </span>
                    )}
                </div>

                <h3 className="font-display text-lg font-semibold leading-tight text-zinc-100">
                    <Link
                        to={productPath}
                        className="transition-colors hover:text-fuchsia-300"
                    >
                        {good.name}
                    </Link>
                </h3>

                <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
                    {good.description}
                </p>

                <div className="mt-auto flex flex-col gap-3 pt-2">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="whitespace-nowrap font-display text-xl font-bold tracking-tight text-white">
                            {formatPrice(good.price)}
                        </span>
                        {good.oldPrice && (
                            <span className="whitespace-nowrap text-xs text-zinc-500 line-through">
                                {formatPrice(good.oldPrice)}
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={() => addToBasket(good)}
                        aria-label={`Добавить «${good.name}» в корзину`}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-fuchsia-500/20 transition duration-300 hover:brightness-110 active:scale-[0.98]"
                    >
                        <PlusIcon className="h-3.5 w-3.5" />
                        В корзину
                    </button>
                </div>
            </div>
        </article>
    );
}
