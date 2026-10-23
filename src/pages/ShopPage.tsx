import {
    useDeferredValue,
    useMemo,
    useState,
    type CSSProperties,
} from 'react';
import { Link } from 'react-router';
import { CatalogSkeleton } from '../components/CatalogSkeleton';
import { EmptyState } from '../components/EmptyState';
import { ProductArt } from '../components/ProductArt';
import { ProductCard } from '../components/ProductCard';
import {
    ArrowDownIcon,
    ArrowRightIcon,
    BoltIcon,
    ChevronDownIcon,
    CloseIcon,
    CompassIcon,
    SearchIcon,
    ShieldIcon,
    SparklesIcon,
    StarIcon,
} from '../components/icons';
import { demoGoods } from '../data/demoGoods';
import { formatPrice, pluralize } from '../lib/format';
import { useShop } from '../store/ShopContext';
import type { Good } from '../types';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const sortLabels: Record<SortKey, string> = {
    featured: 'По популярности',
    'price-asc': 'Сначала дешевле',
    'price-desc': 'Сначала дороже',
    rating: 'По рейтингу',
};

const tickerItems = [
    'Мгновенная выдача',
    'Гарантия на каждый предмет',
    'Поддержка 24/7',
    'Новые дропы каждую неделю',
    'Бесплатная доставка',
];

function MiniProduct({
    good,
    className,
    style,
}: {
    good: Good;
    className: string;
    style: CSSProperties;
}) {
    return (
        <div className={`absolute ${className}`} style={style}>
            <div className="group overflow-hidden rounded-3xl border border-white/15 bg-night-900/85 p-2 shadow-[0_30px_80px_-30px_rgba(10,5,30,0.9)] backdrop-blur-md">
                <ProductArt
                    good={good}
                    className="aspect-[4/5] w-full rounded-2xl"
                    emojiClassName="text-6xl"
                    showLabel={false}
                />
                <div className="px-2 pb-1 pt-2.5">
                    <p className="truncate text-[11px] font-semibold text-white">
                        {good.name}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold text-fuchsia-300">
                        {formatPrice(good.price)}
                    </p>
                </div>
            </div>
        </div>
    );
}

function HeroShowcase({ goods }: { goods: Good[] }) {
    const showcase = (goods.length ? goods : demoGoods).slice(0, 3);

    return (
        <div className="relative mx-auto aspect-square w-full max-w-lg select-none">
            <div className="absolute inset-[10%] animate-spin-slow rounded-full bg-[conic-gradient(from_0deg,#8b5cf6,#22d3ee,#f472b6,#fbbf24,#8b5cf6)] opacity-25 blur-3xl" />
            <div className="absolute inset-[14%] rounded-full border border-white/10" />
            <div className="absolute inset-[25%] rounded-full border border-dashed border-white/10" />

            <MiniProduct
                good={showcase[0]}
                className="left-[1%] top-[20%] z-20 w-[44%] animate-float"
                style={
                    {
                        '--float-rotate': '-8deg',
                        animationDelay: '-1.5s',
                    } as CSSProperties
                }
            />
            <MiniProduct
                good={showcase[1] ?? showcase[0]}
                className="right-[1%] top-[5%] z-30 w-[42%] animate-float-slow"
                style={
                    {
                        '--float-rotate': '7deg',
                        animationDelay: '-4s',
                    } as CSSProperties
                }
            />
            <MiniProduct
                good={showcase[2] ?? showcase[0]}
                className="bottom-[3%] left-[31%] z-10 w-[43%] animate-float"
                style={
                    {
                        '--float-rotate': '4deg',
                        animationDelay: '-7s',
                    } as CSSProperties
                }
            />

            <div
                className="absolute left-[3%] top-[6%] z-40 flex animate-float items-center gap-2 rounded-2xl border border-white/15 bg-night-900/80 px-3.5 py-2.5 shadow-xl backdrop-blur-md"
                style={{ animationDelay: '-2s' } as CSSProperties}
            >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-amber-300/15 text-amber-300">
                    <StarIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                    <p className="text-xs font-bold leading-none text-white">
                        4.9 / 5
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                        2 000+ отзывов
                    </p>
                </div>
            </div>

            <div
                className="absolute bottom-[8%] right-[2%] z-40 flex animate-float-slow items-center gap-2 rounded-2xl border border-cyan-300/20 bg-night-900/80 px-3.5 py-2.5 shadow-xl backdrop-blur-md"
                style={{ animationDelay: '-5s' } as CSSProperties}
            >
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-400/15 text-cyan-300">
                    <BoltIcon className="h-3.5 w-3.5" />
                </span>
                <div>
                    <p className="text-xs font-bold leading-none text-white">
                        Мгновенно
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-zinc-500">
                        выдача 24/7
                    </p>
                </div>
            </div>
        </div>
    );
}

function Hero({ goods }: { goods: Good[] }) {
    return (
        <section className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,black,transparent)]" />

            <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-10 pt-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-16 lg:pt-20">
                <div className="animate-fade-up">
                    <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-fuchsia-200">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                        </span>
                        Новая коллекция · сезон 06
                    </span>

                    <h1 className="mt-6 font-display text-[2.7rem] font-bold leading-[1.03] tracking-tight text-white sm:text-6xl xl:text-7xl">
                        Цифровые вещи, которые{' '}
                        <span className="animate-gradient text-gradient">
                            светятся
                        </span>
                        .
                    </h1>

                    <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
                        Скины, кирки, глайдеры и эмоции из новой коллекции.
                        Выбирайте характер, собирайте образ и забирайте всё
                        мгновенно.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href="#catalog"
                            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-6 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-fuchsia-500/25 transition duration-300 hover:brightness-110 active:scale-[0.98]"
                        >
                            Смотреть коллекцию
                            <ArrowDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                        </a>
                        <Link
                            to="/cart"
                            className="group inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-bold text-zinc-200 transition duration-300 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
                        >
                            Моя корзина
                            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <dl className="mt-10 grid max-w-md grid-cols-3 gap-3">
                        {[
                            {
                                value: `${goods.length || demoGoods.length}+`,
                                label: 'предметов',
                            },
                            { value: '24/7', label: 'поддержка' },
                            { value: '4.9', label: 'рейтинг' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 transition hover:border-white/20 hover:bg-white/[0.05]"
                            >
                                <dt className="font-display text-xl font-bold text-white">
                                    {stat.value}
                                </dt>
                                <dd className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                                    {stat.label}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="animate-fade-up [animation-delay:150ms]">
                    <HeroShowcase goods={goods} />
                </div>
            </div>
        </section>
    );
}

function Ticker() {
    return (
        <div className="relative overflow-hidden border-y border-white/10 bg-white/[0.02] py-3.5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
            <div className="ticker-track flex w-max">
                {[0, 1].map((round) => (
                    <div
                        key={round}
                        className="flex shrink-0 items-center gap-8 pr-8"
                        aria-hidden={round === 1}
                    >
                        {tickerItems.map((item) => (
                            <span
                                key={item}
                                className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500"
                            >
                                <SparklesIcon className="h-3.5 w-3.5 text-fuchsia-400/70" />
                                {item}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export function ShopPage() {
    const { goods, loading, source } = useShop();
    const [query, setQuery] = useState('');
    const [category, setCategory] = useState('Все');
    const [sort, setSort] = useState<SortKey>('featured');

    const deferredQuery = useDeferredValue(query);

    const categories = useMemo(() => {
        const unique = Array.from(
            new Set(
                goods
                    .map((good) => good.category)
                    .filter((value): value is string => Boolean(value))
            )
        );

        return ['Все', ...unique.slice(0, 7)];
    }, [goods]);

    const filteredGoods = useMemo(() => {
        const needle = deferredQuery.trim().toLowerCase();

        const result = goods.filter((good) => {
            const matchesCategory =
                category === 'Все' || good.category === category;
            const matchesQuery =
                needle.length === 0 ||
                good.name.toLowerCase().includes(needle) ||
                good.description.toLowerCase().includes(needle);

            return matchesCategory && matchesQuery;
        });

        return [...result].sort((a, b) => {
            switch (sort) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'rating':
                    return (b.rating ?? 0) - (a.rating ?? 0);
                default:
                    return 0;
            }
        });
    }, [goods, category, deferredQuery, sort]);

    const resetFilters = () => {
        setQuery('');
        setCategory('Все');
        setSort('featured');
    };

    return (
        <>
            <Hero goods={goods} />
            <Ticker />

            <section
                id="catalog"
                className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
            >
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                            <CompassIcon className="h-4 w-4" />
                            Каталог
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Выбери{' '}
                            <span className="text-gradient">свой стиль</span>
                        </h2>
                        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                            {loading
                                ? 'Собираем коллекцию…'
                                : `${filteredGoods.length} ${pluralize(
                                      filteredGoods.length,
                                      ['предмет', 'предмета', 'предметов']
                                  )} из ${goods.length}`}
                            {!loading && source === 'demo' && (
                                <span
                                    title="Задайте VITE_API_KEY, чтобы загружать каталог из Fortnite API"
                                    className="rounded-full border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-amber-200"
                                >
                                    демо
                                </span>
                            )}
                        </p>
                    </div>

                    <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                        <div className="relative flex-1 sm:w-64">
                            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                            <input
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Найти предмет…"
                                aria-label="Поиск по каталогу"
                                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-10 pr-9 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/50 focus:bg-white/[0.07]"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => setQuery('')}
                                    aria-label="Очистить поиск"
                                    className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-zinc-500 transition hover:bg-white/10 hover:text-white"
                                >
                                    <CloseIcon className="h-3.5 w-3.5" />
                                </button>
                            )}
                        </div>

                        <div className="relative">
                            <select
                                value={sort}
                                onChange={(event) =>
                                    setSort(event.target.value as SortKey)
                                }
                                aria-label="Сортировка"
                                className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] pl-4 pr-10 text-sm font-semibold text-zinc-200 outline-none transition hover:bg-white/[0.06] focus:border-fuchsia-400/50 sm:w-52"
                            >
                                {(
                                    Object.keys(sortLabels) as SortKey[]
                                ).map((key) => (
                                    <option
                                        key={key}
                                        value={key}
                                        className="bg-night-900 text-zinc-200"
                                    >
                                        {sortLabels[key]}
                                    </option>
                                ))}
                            </select>
                            <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                        </div>
                    </div>
                </div>

                {!loading && (
                    <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
                        {categories.map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setCategory(item)}
                                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                                    category === item
                                        ? 'border-fuchsia-400/50 bg-gradient-to-r from-violet-500/25 to-fuchsia-500/20 text-white shadow-lg shadow-fuchsia-500/10'
                                        : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
                                }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                )}

                <div className="mt-8">
                    {loading ? (
                        <CatalogSkeleton count={8} />
                    ) : filteredGoods.length ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredGoods.map((good, index) => (
                                <ProductCard
                                    key={good.id}
                                    good={good}
                                    index={index}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            icon={<SearchIcon className="h-8 w-8" />}
                            title="Ничего не нашлось"
                            description="Попробуйте изменить запрос или сбросить фильтры — в коллекции точно есть что-то ваше."
                            action={
                                <button
                                    type="button"
                                    onClick={resetFilters}
                                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                                >
                                    Сбросить фильтры
                                </button>
                            }
                        />
                    )}
                </div>

                <div className="mt-16 grid gap-4 sm:grid-cols-3">
                    {[
                        {
                            icon: <BoltIcon className="h-5 w-5" />,
                            title: 'Мгновенная выдача',
                            text: 'Предмет появляется в инвентаре сразу после оформления.',
                        },
                        {
                            icon: <ShieldIcon className="h-5 w-5" />,
                            title: 'Гарантия 30 дней',
                            text: 'Если что-то пойдёт не так — вернём деньги без вопросов.',
                        },
                        {
                            icon: <SparklesIcon className="h-5 w-5" />,
                            title: 'Только лучшее',
                            text: 'Кураторская коллекция без случайных предметов.',
                        },
                    ].map((feature) => (
                        <div
                            key={feature.title}
                            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                        >
                            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/15 text-fuchsia-300 ring-1 ring-white/10 transition group-hover:scale-110">
                                {feature.icon}
                            </span>
                            <h3 className="mt-4 font-display text-base font-bold text-white">
                                {feature.title}
                            </h3>
                            <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
