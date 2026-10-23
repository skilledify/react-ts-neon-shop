import { useEffect } from 'react';
import { Link } from 'react-router';
import { cartCount } from '../lib/cart';
import { useShop } from '../store/ShopContext';
import {
    ArrowRightIcon,
    BagIcon,
    CloseIcon,
    CompareIcon,
    GridIcon,
    HeartIcon,
    InfoIcon,
    MessageIcon,
    PackageIcon,
    PercentIcon,
    SparklesIcon,
    UserIcon,
} from './icons';

const mainLinks = [
    { to: '/', label: 'Витрина', icon: SparklesIcon },
    { to: '/collections', label: 'Коллекции', icon: GridIcon },
    { to: '/sale', label: 'Распродажа', icon: PercentIcon },
    { to: '/blog', label: 'Блог', icon: MessageIcon },
    { to: '/about', label: 'О проекте', icon: InfoIcon },
];

const accountLinks = [
    { to: '/profile', label: 'Профиль', icon: UserIcon },
    { to: '/orders', label: 'Заказы', icon: PackageIcon },
    { to: '/wishlist', label: 'Избранное', icon: HeartIcon },
    { to: '/compare', label: 'Сравнение', icon: CompareIcon },
    { to: '/support', label: 'Поддержка', icon: MessageIcon },
];

export function MobileMenu() {
    const {
        isMenuOpen,
        closeMenu,
        profile,
        order,
        wishlist,
        compare,
        orders,
    } = useShop();
    const count = cartCount(order);

    useEffect(() => {
        if (!isMenuOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeMenu();
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isMenuOpen, closeMenu]);

    if (!isMenuOpen) return null;

    const badges: Record<string, number> = {
        '/wishlist': wishlist.length,
        '/compare': compare.length,
        '/orders': orders.length,
    };

    return (
        <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
        >
            <div
                className="absolute inset-0 animate-fade-in bg-black/65 backdrop-blur-sm"
                onClick={closeMenu}
                aria-hidden="true"
            />

            <aside className="absolute left-0 top-0 flex h-[100dvh] w-[min(21rem,88vw)] animate-slide-in-left flex-col border-r border-white/10 bg-night-900/95 shadow-[30px_0_100px_-30px_rgba(139,92,246,0.35)] backdrop-blur-2xl">
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300" />

                <div className="flex items-center justify-between px-5 py-4">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="flex items-center gap-2"
                    >
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-300 text-night-950">
                            <svg
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                                className="h-4 w-4"
                                fill="currentColor"
                            >
                                <path d="M13.5 2 5 13.2h5.2L8.9 22l9-12.4h-5.3L13.5 2Z" />
                            </svg>
                        </span>
                        <span className="font-display text-base font-bold text-white">
                            Neon<span className="text-gradient">Shop</span>
                        </span>
                    </Link>
                    <button
                        type="button"
                        onClick={closeMenu}
                        aria-label="Закрыть меню"
                        className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:text-white"
                    >
                        <CloseIcon className="h-4 w-4" />
                    </button>
                </div>

                <div className="mx-5 mb-2 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-violet-500/25 to-fuchsia-500/20 text-2xl ring-1 ring-white/10">
                        {profile.avatar}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-white">
                            {profile.name}
                        </p>
                        <p className="truncate text-[11px] text-zinc-500">
                            {profile.email || 'Локальный профиль'}
                        </p>
                    </div>
                    <Link
                        to="/profile"
                        onClick={closeMenu}
                        className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-300"
                    >
                        Изменить
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto px-3 py-2">
                    <p className="px-3 pb-1 pt-3 text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-600">
                        Магазин
                    </p>
                    {mainLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={closeMenu}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                        >
                            <link.icon className="h-4 w-4 text-zinc-500 transition group-hover:text-fuchsia-300" />
                            {link.label}
                        </Link>
                    ))}

                    <p className="px-3 pb-1 pt-4 text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-600">
                        Аккаунт
                    </p>
                    {accountLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={closeMenu}
                            className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-zinc-300 transition hover:bg-white/[0.06] hover:text-white"
                        >
                            <link.icon className="h-4 w-4 text-zinc-500 transition group-hover:text-fuchsia-300" />
                            <span className="flex-1">{link.label}</span>
                            {badges[link.to] ? (
                                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-zinc-300">
                                    {badges[link.to]}
                                </span>
                            ) : null}
                        </Link>
                    ))}
                </nav>

                <div className="border-t border-white/10 p-4">
                    <Link
                        to="/cart"
                        onClick={closeMenu}
                        className="flex items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-4 py-3 text-sm font-extrabold text-night-950 shadow-lg shadow-fuchsia-500/25"
                    >
                        <span className="inline-flex items-center gap-2">
                            <BagIcon className="h-4 w-4" />
                            Корзина
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            {count} шт.
                            <ArrowRightIcon className="h-4 w-4" />
                        </span>
                    </Link>
                </div>
            </aside>
        </div>
    );
}
