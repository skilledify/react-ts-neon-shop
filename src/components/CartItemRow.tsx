import { Link } from 'react-router';
import { formatPrice } from '../lib/format';
import { useShop } from '../store/ShopContext';
import type { CartItem } from '../types';
import { MinusIcon, PlusIcon, TrashIcon } from './icons';
import { ProductArt } from './ProductArt';

interface CartItemRowProps {
    item: CartItem;
    compact?: boolean;
}

export function CartItemRow({ item, compact = false }: CartItemRowProps) {
    const { incrementQuantity, decrementQuantity, removeFromBasket } = useShop();
    const itemPath = `/product/${encodeURIComponent(item.id)}`;

    return (
        <div className={`flex gap-4 ${compact ? 'py-4' : 'p-4 sm:p-5'}`}>
            <Link
                to={itemPath}
                className="group relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10"
                aria-label={`Открыть ${item.name}`}
            >
                <ProductArt
                    good={item}
                    className="h-full w-full"
                    emojiClassName="text-[2rem]"
                    showLabel={false}
                />
            </Link>

            <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <Link
                            to={itemPath}
                            className="line-clamp-1 text-sm font-semibold text-zinc-100 transition-colors hover:text-fuchsia-300"
                        >
                            {item.name}
                        </Link>
                        <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                            {item.category ?? 'Коллекция'}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => removeFromBasket(item.id)}
                        aria-label={`Удалить «${item.name}» из корзины`}
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-zinc-500 transition hover:bg-rose-500/10 hover:text-rose-300"
                    >
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>

                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <div className="inline-flex items-center rounded-xl border border-white/10 bg-white/5">
                        <button
                            type="button"
                            onClick={() => decrementQuantity(item.id)}
                            aria-label="Уменьшить количество"
                            disabled={item.quantity <= 1}
                            className="grid h-8 w-8 place-items-center rounded-l-xl text-zinc-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
                        >
                            <MinusIcon className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold tabular-nums text-white">
                            {item.quantity}
                        </span>
                        <button
                            type="button"
                            onClick={() => incrementQuantity(item.id)}
                            aria-label="Увеличить количество"
                            className="grid h-8 w-8 place-items-center rounded-r-xl text-zinc-300 transition hover:bg-white/10"
                        >
                            <PlusIcon className="h-3.5 w-3.5" />
                        </button>
                    </div>

                    <span className="whitespace-nowrap text-sm font-bold text-white">
                        {formatPrice(item.price * item.quantity)}
                    </span>
                </div>
            </div>
        </div>
    );
}
