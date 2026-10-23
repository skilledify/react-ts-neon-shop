import { Link } from 'react-router';
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from '../components/icons';

export function NotFoundPage() {
    return (
        <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
            <div className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute left-1/4 top-1/2 h-48 w-48 rounded-full bg-violet-500/20 blur-[90px]" />

            <p className="relative animate-gradient text-gradient font-display text-[7rem] font-bold leading-none tracking-tighter sm:text-[10rem]">
                404
            </p>
            <span className="relative mt-2 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-200">
                <SparklesIcon className="h-3.5 w-3.5" />
                Страница потерялась
            </span>

            <h1 className="relative mt-6 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Эта страница улетела в другое измерение
            </h1>
            <p className="relative mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
                Мы искали её по всем разломам, но нашли только коллекцию
                цифровых предметов. Предлагаем начать оттуда.
            </p>

            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-6 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-fuchsia-500/25 transition hover:brightness-110"
                >
                    <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    На главную
                </Link>
                <Link
                    to="/cart"
                    className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-zinc-200 transition hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                >
                    В корзину
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </div>
        </div>
    );
}
