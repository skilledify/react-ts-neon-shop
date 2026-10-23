import {
    useDeferredValue,
    useEffect,
    useRef,
    useState,
} from 'react';
import { Link, useNavigate } from 'react-router';
import { useShop } from '../store/ShopContext';
import {
    ArrowRightIcon,
    ChevronRightIcon,
    CloseIcon,
    GridIcon,
    SearchIcon,
    SparklesIcon,
    TagIcon,
} from './icons';
import { ProductArt } from './ProductArt';
import { formatPrice } from '../lib/format';

const quickLinks = [
    {
        to: '/collections',
        label: 'Коллекции',
        icon: <GridIcon className="h-4 w-4" />,
    },
    {
        to: '/sale',
        label: 'Распродажа',
        icon: <TagIcon className="h-4 w-4" />,
    },
    {
        to: '/blog',
        label: 'Блог',
        icon: <SparklesIcon className="h-4 w-4" />,
    },
];

const suggestions = ['Скины', 'Глайдеры', 'Эмоции', 'Кирки'];

export function SearchPalette() {
    const { isSearchOpen, closeSearch, goods } = useShop();
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const deferredQuery = useDeferredValue(query);

    useEffect(() => {
        if (!isSearchOpen) return;

        setQuery('');
        const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 60);
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') closeSearch();
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.clearTimeout(focusTimer);
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isSearchOpen, closeSearch]);

    if (!isSearchOpen) return null;

    const needle = deferredQuery.trim().toLowerCase();
    const results = needle
        ? goods
              .filter(
                  (good) =>
                      good.name.toLowerCase().includes(needle) ||
                      good.description.toLowerCase().includes(needle) ||
                      good.category?.toLowerCase().includes(needle)
              )
              .slice(0, 6)
        : goods.slice(0, 4);

    const open = (path: string) => {
        closeSearch();
        navigate(path);
    };

    return (
        <div
            className="fixed inset-0 z-[60]"
            role="dialog"
            aria-modal="true"
            aria-label="Поиск по магазину"
        >
            <div
                className="absolute inset-0 animate-fade-in bg-black/70 backdrop-blur-md"
                onClick={closeSearch}
                aria-hidden="true"
            />

            <div className="absolute inset-x-3 top-[8vh] mx-auto max-w-2xl animate-scale-in overflow-hidden rounded-3xl border border-white/15 bg-night-900/95 shadow-[0_40px_120px_-30px_rgba(139,92,246,0.5)] backdrop-blur-2xl sm:top-[12vh]">
                <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300" />

                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-4 sm:px-5">
                    <SearchIcon className="h-5 w-5 shrink-0 text-fuchsia-300" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && results[0]) {
                                open(
                                    `/product/${encodeURIComponent(results[0].id)}`
                                );
                            }
                        }}
                        placeholder="Найти скин, кирку, эмоцию…"
                        className="h-8 flex-1 bg-transparent text-base text-white outline-none placeholder:text-zinc-500"
                    />
                    <kbd className="hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 sm:block">
                        ESC
                    </kbd>
                    <button
                        type="button"
                        onClick={closeSearch}
                        aria-label="Закрыть поиск"
                        className="grid h-8 w-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
                    >
                        <CloseIcon className="h-4 w-4" />
                    </button>
                </div>

                {!needle && (
                    <div className="flex flex-wrap items-center gap-2 px-4 pt-4 sm:px-5">
                        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                            Популярное:
                        </span>
                        {suggestions.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setQuery(item)}
                                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-zinc-300 transition hover:border-fuchsia-400/40 hover:text-white"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}

                <div className="max-h-[52vh] overflow-y-auto p-2 sm:max-h-[54vh]">
                    <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                        {needle ? 'Результаты' : 'Начните вводить запрос'}
                    </p>

                    {results.length ? (
                        results.map((good) => (
                            <button
                                key={good.id}
                                type="button"
                                onClick={() =>
                                    open(
                                        `/product/${encodeURIComponent(good.id)}`
                                    )
                                }
                                className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-white/[0.06]"
                            >
                                <ProductArt
                                    good={good}
                                    className="h-12 w-12 shrink-0 overflow-hidden rounded-xl"
                                    emojiClassName="text-xl"
                                    showLabel={false}
                                />
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-semibold text-zinc-100">
                                        {good.name}
                                    </span>
                                    <span className="mt-0.5 block text-[11px] text-zinc-500">
                                        {good.category ?? 'Коллекция'}
                                    </span>
                                </span>
                                <span className="whitespace-nowrap text-xs font-bold text-zinc-300">
                                    {formatPrice(good.price)}
                                </span>
                                <ChevronRightIcon className="h-4 w-4 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-fuchsia-300" />
                            </button>
                        ))
                    ) : (
                        <div className="px-3 py-10 text-center">
                            <p className="text-sm font-semibold text-zinc-300">
                                Ничего не нашлось
                            </p>
                            <p className="mt-1 text-xs text-zinc-500">
                                Попробуйте другой запрос или загляните в
                                каталог.
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3 sm:px-5">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={closeSearch}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-zinc-400 transition hover:border-white/20 hover:text-white"
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                    <span className="ml-auto hidden items-center gap-1 text-[10px] text-zinc-600 sm:inline-flex">
                        <ArrowRightIcon className="h-3 w-3" />
                        Enter — открыть первый результат
                    </span>
                </div>
            </div>
        </div>
    );
}
