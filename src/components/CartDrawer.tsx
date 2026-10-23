import { useEffect } from 'react';
import { Link } from 'react-router';
import { cartCount, cartTotal } from '../lib/cart';
import { discountFor } from '../lib/coupons';
import { formatPrice } from '../lib/format';
import { useShop } from '../store/ShopContext';
import { CartItemRow } from './CartItemRow';
import {
    ArrowRightIcon,
    BagIcon,
    BoltIcon,
    CardIcon,
    CloseIcon,
    TagIcon,
} from './icons';

export function CartDrawer() {
    const { isCartOpen, closeCart, order, coupon } = useShop();
    const count = cartCount(order);
    const subtotal = cartTotal(order);
    const discount = discountFor(subtotal, coupon);
    const total = subtotal - discount;

    useEffect(() => {
        if (!isCartOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeCart();
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isCartOpen, closeCart]);

    if (!isCartOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Корзина"
        >
            <div
                className="absolute inset-0 animate-fade-in bg-black/65 backdrop-blur-sm"
                onClick={closeCart}
                aria-hidden="true"
            />

            <aside className="absolute right-0 top-0 flex h-[100dvh] w-full max-w-md animate-slide-in flex-col border-l border-white/10 bg-night-900/95 shadow-[-30px_0_100px_-30px_rgba(139,92,246,0.35)] backdrop-blur-2xl">
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300" />

                <header className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/20 text-fuchsia-300 ring-1 ring-white/10">
                        <BagIcon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                        <h2 className="font-display text-lg font-bold text-white">
                            Корзина
                        </h2>
                        <p className="text-xs text-zinc-400">
                            {count
                                ? `${count} ${count === 1 ? 'предмет' : 'предмета'} внутри`
                                : 'Пока пусто, но это поправимо'}
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={closeCart}
                        aria-label="Закрыть корзину"
                        className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:rotate-90 hover:border-white/20 hover:text-white"
                    >
                        <CloseIcon className="h-5 w-5" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto px-5">
                    {order.length ? (
                        <div className="divide-y divide-white/5">
                            {order.map((item) => (
                                <CartItemRow
                                    key={item.id}
                                    item={item}
                                    compact
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-5 py-16 text-center">
                            <span className="relative grid h-24 w-24 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
                                <span className="absolute inset-0 animate-pulse-ring rounded-full border border-fuchsia-400/30" />
                                <BagIcon className="h-10 w-10 text-fuchsia-300" />
                            </span>
                            <div>
                                <p className="font-display text-xl font-bold text-white">
                                    Корзина пуста
                                </p>
                                <p className="mt-2 max-w-[16rem] text-sm text-zinc-400">
                                    Добавьте что-нибудь из коллекции — и оно
                                    появится здесь.
                                </p>
                            </div>
                            <Link
                                to="/"
                                onClick={closeCart}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                            >
                                В каталог
                                <ArrowRightIcon className="h-4 w-4" />
                            </Link>
                        </div>
                    )}
                </div>

                <footer className="border-t border-white/10 bg-night-950/40 px-5 py-5">
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between text-zinc-400">
                            <span>Товары</span>
                            <span className="font-semibold text-zinc-200">
                                {formatPrice(total)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-zinc-400">
                            <span className="inline-flex items-center gap-1.5">
                                <BoltIcon className="h-3.5 w-3.5 text-cyan-300" />
                                Доставка
                            </span>
                            <span className="font-semibold text-cyan-300">
                                Бесплатно
                            </span>
                        </div>
                        {coupon && (
                            <div className="flex items-center justify-between text-zinc-400">
                                <span className="inline-flex items-center gap-1.5">
                                    <TagIcon className="h-3.5 w-3.5 text-emerald-300" />
                                    {coupon.code}
                                </span>
                                <span className="font-semibold text-emerald-300">
                                    −{formatPrice(discount)}
                                </span>
                            </div>
                        )}
                        <div className="flex items-end justify-between border-t border-white/10 pt-3">
                            <span className="font-semibold text-zinc-300">
                                Итого
                            </span>
                            <span className="font-display text-2xl font-bold text-white">
                                {formatPrice(total)}
                            </span>
                        </div>
                    </div>

                    {order.length ? (
                        <Link
                            to="/checkout"
                            onClick={closeCart}
                            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-5 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-fuchsia-500/25 transition hover:brightness-110 active:scale-[0.99]"
                        >
                            <CardIcon className="h-4 w-4" />
                            Перейти к оформлению
                        </Link>
                    ) : (
                        <button
                            type="button"
                            disabled
                            className="mt-4 inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-5 py-3.5 text-sm font-extrabold text-night-950 opacity-40"
                        >
                            <CardIcon className="h-4 w-4" />
                            Оформить заказ
                        </button>
                    )}

                    <Link
                        to="/cart"
                        onClick={closeCart}
                        className="mt-3 block text-center text-xs font-semibold text-zinc-400 transition hover:text-white"
                    >
                        Открыть страницу корзины
                    </Link>
                </footer>
            </aside>
        </div>
    );
}
