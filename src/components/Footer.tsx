import { useState } from 'react';
import { Link } from 'react-router';
import { useShop } from '../store/ShopContext';
import {
    ArrowRightIcon,
    CheckCircleIcon,
    GithubIcon,
    MailIcon,
    SendIcon,
    SparklesIcon,
} from './icons';

const shopLinks = [
    { to: '/', label: 'Витрина' },
    { to: '/collections', label: 'Коллекции' },
    { to: '/sale', label: 'Распродажа' },
    { to: '/blog', label: 'Блог' },
];

const accountLinks = [
    { to: '/profile', label: 'Профиль' },
    { to: '/orders', label: 'Мои заказы' },
    { to: '/wishlist', label: 'Избранное' },
    { to: '/compare', label: 'Сравнение' },
];

const helpLinks = [
    { to: '/faq', label: 'FAQ' },
    { to: '/support', label: 'Поддержка' },
    { to: '/about', label: 'О проекте' },
];

const tech = ['Vite', 'React 19', 'React Router 7', 'Tailwind CSS 4'];

function Newsletter() {
    const { notify } = useShop();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    return (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-cyan-500/10 p-6 sm:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-md">
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">
                        <MailIcon className="h-4 w-4" />
                        Рассылка
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                        Новые дропы — первыми
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        Раз в неделю присылаем подборку новых предметов, скидки
                        и гайды. Без спама.
                    </p>
                </div>

                {subscribed ? (
                    <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-5 py-4 text-sm font-semibold text-emerald-200">
                        <CheckCircleIcon className="h-5 w-5" />
                        Готово! Проверьте почту — там уже ждёт первое письмо.
                    </div>
                ) : (
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (!/^\S+@\S+\.\S+$/.test(email)) {
                                notify('Введите корректный e-mail');
                                return;
                            }
                            setSubscribed(true);
                            setEmail('');
                            notify('Вы подписались на рассылку Neon Shop');
                        }}
                        className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
                    >
                        <label className="sr-only" htmlFor="newsletter-email">
                            E-mail для рассылки
                        </label>
                        <input
                            id="newsletter-email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="you@example.com"
                            className="h-12 flex-1 rounded-xl border border-white/15 bg-night-950/50 px-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/60"
                        />
                        <button
                            type="submit"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-5 text-sm font-extrabold text-night-950 shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110"
                        >
                            <SendIcon className="h-4 w-4" />
                            Подписаться
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export function Footer() {
    return (
        <footer className="relative mt-24 border-t border-white/10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <Newsletter />

                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.7fr_0.7fr]">
                    <div>
                        <div className="flex items-center gap-2.5">
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
                            <span className="font-display text-lg font-bold text-white">
                                Neon<span className="text-gradient">Shop</span>
                            </span>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
                            Витрина цифровых предметов с характером. Светящаяся
                            коллекция, мгновенная выдача и никакой скуки.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {tech.map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-zinc-400"
                                >
                                    <SparklesIcon className="h-2.5 w-2.5 text-fuchsia-300" />
                                    {item}
                                </span>
                            ))}
                        </div>
                        <a
                            href="https://github.com/michey85/react-ts-neon-shop"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 transition hover:text-white"
                        >
                            <GithubIcon className="h-4 w-4" />
                            Исходный код на GitHub
                        </a>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                            Магазин
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {shopLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-zinc-400 transition hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                            Аккаунт
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {accountLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-zinc-400 transition hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                            Помощь
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            {helpLinks.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-zinc-400 transition hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to="/cart"
                                    className="inline-flex items-center gap-1 text-fuchsia-300 transition hover:text-fuchsia-200"
                                >
                                    Корзина
                                    <ArrowRightIcon className="h-3 w-3" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Neon Shop ·
                        react-ts-neon-shop
                    </p>
                    <p className="inline-flex items-center gap-1.5">
                        Собрано с
                        <span className="animate-pulse text-fuchsia-400">♥</span>
                        и неоном
                    </p>
                </div>
            </div>
        </footer>
    );
}
