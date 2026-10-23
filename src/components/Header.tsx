import { Link, NavLink } from 'react-router';
import { cartCount } from '../lib/cart';
import { useShop } from '../store/ShopContext';
import {
    CartIcon,
    CompareIcon,
    HeartIcon,
    MenuIcon,
    SearchIcon,
} from './icons';

const navLinks = [
    { to: '/', label: 'Витрина', end: true },
    { to: '/collections', label: 'Коллекции' },
    { to: '/sale', label: 'Распродажа' },
    { to: '/blog', label: 'Блог' },
    { to: '/about', label: 'О нас' },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3.5 py-2 text-sm font-semibold transition ${
        isActive
            ? 'bg-white/10 text-white'
            : 'text-zinc-400 hover:bg-white/5 hover:text-white'
    }`;

function CountBadge({ value }: { value: number }) {
    if (!value) return null;

    return (
        <span
            key={value}
            className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] animate-pop place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-amber-300 px-1 text-[9px] font-extrabold text-night-950 shadow-md shadow-fuchsia-500/40"
        >
            {value > 99 ? '99+' : value}
        </span>
    );
}

export function Header() {
    const { order, openCart, openSearch, openMenu, wishlist, compare } =
        useShop();
    const count = cartCount(order);

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-night-950/70 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    aria-label="Neon Shop — на главную"
                    className="group flex shrink-0 items-center gap-2.5"
                >
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-amber-300 shadow-lg shadow-fuchsia-500/30 transition duration-500 group-hover:rotate-6 group-hover:scale-105">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-5 w-5 text-night-950"
                            fill="currentColor"
                        >
                            <path d="M13.5 2 5 13.2h5.2L8.9 22l9-12.4h-5.3L13.5 2Z" />
                        </svg>
                    </span>
                    <span className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
                        Neon<span className="text-gradient">Shop</span>
                    </span>
                </Link>

                <nav
                    className="ml-4 hidden items-center gap-0.5 lg:flex"
                    aria-label="Основная навигация"
                >
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.end}
                            className={navLinkClass}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
                    <button
                        type="button"
                        onClick={openSearch}
                        aria-label="Открыть поиск"
                        title="Поиск (⌘K)"
                        className="group flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 text-zinc-400 transition hover:border-fuchsia-400/40 hover:text-white sm:px-3"
                    >
                        <SearchIcon className="h-[18px] w-[18px]" />
                        <span className="hidden text-xs font-semibold text-zinc-500 xl:inline">
                            Поиск
                        </span>
                        <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] font-bold text-zinc-500 xl:block">
                            ⌘K
                        </kbd>
                    </button>

                    <Link
                        to="/wishlist"
                        aria-label="Избранное"
                        className="relative hidden h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:border-fuchsia-400/40 hover:text-fuchsia-300 sm:grid"
                    >
                        <HeartIcon
                            filled={wishlist.length > 0}
                            className="h-[18px] w-[18px]"
                        />
                        <CountBadge value={wishlist.length} />
                    </Link>

                    <Link
                        to="/compare"
                        aria-label="Сравнение"
                        className="relative hidden h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition hover:border-cyan-300/40 hover:text-cyan-300 sm:grid"
                    >
                        <CompareIcon className="h-[18px] w-[18px]" />
                        <CountBadge value={compare.length} />
                    </Link>

                    <button
                        type="button"
                        onClick={openCart}
                        className="group relative inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 text-sm font-bold text-white transition hover:border-fuchsia-400/40 hover:bg-white/10 sm:px-4"
                    >
                        <CartIcon className="h-5 w-5 text-fuchsia-300 transition-transform group-hover:-rotate-6" />
                        <span className="hidden md:inline">Корзина</span>
                        <CountBadge value={count} />
                    </button>

                    <button
                        type="button"
                        onClick={openMenu}
                        aria-label="Открыть меню"
                        className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-300 transition hover:border-white/20 hover:text-white lg:hidden"
                    >
                        <MenuIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    );
}
