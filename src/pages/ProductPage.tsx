import { Link, useParams } from 'react-router';
import { useState, type FormEvent } from 'react';
import { EmptyState } from '../components/EmptyState';
import { ProductArt } from '../components/ProductArt';
import { ProductCard } from '../components/ProductCard';
import { RatingStars } from '../components/RatingStars';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BagIcon,
    BoltIcon,
    CardIcon,
    CompassIcon,
    MessageIcon,
    PlusIcon,
    SendIcon,
    ShieldIcon,
    SparklesIcon,
    StarIcon,
} from '../components/icons';
import { formatPrice } from '../lib/format';
import { useShop } from '../store/ShopContext';
import type { Good } from '../types';

function ProductSkeleton() {
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-2">
                <div className="aspect-square animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.04]" />
                <div className="space-y-5">
                    <div className="h-5 w-28 animate-pulse rounded-full bg-white/10" />
                    <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-white/10" />
                    <div className="h-4 w-1/3 animate-pulse rounded-full bg-white/[0.07]" />
                    <div className="h-24 w-full animate-pulse rounded-2xl bg-white/[0.07]" />
                    <div className="h-28 w-full animate-pulse rounded-2xl bg-white/[0.07]" />
                </div>
            </div>
        </div>
    );
}

function ReviewsSection({ good }: { good: Good }) {
    const { reviews, addReview, profile, notify } = useShop();
    const list = reviews[good.id] ?? [];
    const [rating, setRating] = useState(5);
    const [author, setAuthor] = useState(profile.name);
    const [text, setText] = useState('');

    const average = list.length
        ? list.reduce((sum, review) => sum + review.rating, 0) / list.length
        : (good.rating ?? 0);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (text.trim().length < 10) {
            notify('Расскажите чуть подробнее — хотя бы 10 символов');
            return;
        }

        addReview({
            id: `review-${Date.now()}`,
            productId: good.id,
            author: author.trim() || 'Гость',
            rating,
            text: text.trim(),
            createdAt: new Date().toISOString(),
        });
        setText('');
        notify('Спасибо! Отзыв добавлен на страницу');
    };

    return (
        <section className="mt-20">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                        Мнения
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                        Отзывы покупателей
                    </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <RatingStars value={average} starClassName="h-4 w-4" />
                    <span className="font-bold text-white">
                        {average.toFixed(1)}
                    </span>
                    <span>
                        · {list.length}{' '}
                        {list.length === 1 ? 'отзыв' : 'отзывов'}
                    </span>
                </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-3">
                    {list.length ? (
                        list.map((review) => (
                            <article
                                key={review.id}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                            >
                                <header className="flex flex-wrap items-center justify-between gap-2">
                                    <div className="flex items-center gap-2.5">
                                        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 text-sm font-bold text-white ring-1 ring-white/10">
                                            {review.author.charAt(0)}
                                        </span>
                                        <div>
                                            <p className="text-sm font-bold text-white">
                                                {review.author}
                                            </p>
                                            <RatingStars
                                                value={review.rating}
                                                starClassName="h-3 w-3"
                                                className="mt-0.5"
                                            />
                                        </div>
                                    </div>
                                    <time
                                        dateTime={review.createdAt}
                                        className="text-[11px] text-zinc-500"
                                    >
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString('ru-RU', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </time>
                                </header>
                                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                                    {review.text}
                                </p>
                            </article>
                        ))
                    ) : (
                        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-zinc-400">
                            Пока никто не оставил отзыв. Будьте первым — это
                            займёт минуту.
                        </p>
                    )}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                    <h3 className="inline-flex items-center gap-2 font-display text-base font-bold text-white">
                        <MessageIcon className="h-4 w-4 text-fuchsia-300" />
                        Оставить отзыв
                    </h3>

                    <div className="mt-3 flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, index) => {
                            const value = index + 1;

                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setRating(value)}
                                    aria-label={`Оценка ${value} из 5`}
                                    aria-pressed={rating === value}
                                    className="rounded-md p-0.5 transition hover:scale-110"
                                >
                                    <StarIcon
                                        filled={value <= rating}
                                        className={`h-6 w-6 ${
                                            value <= rating
                                                ? 'text-amber-300'
                                                : 'text-zinc-600'
                                        }`}
                                    />
                                </button>
                            );
                        })}
                    </div>

                    <label className="mt-4 block">
                        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                            Имя
                        </span>
                        <input
                            type="text"
                            value={author}
                            onChange={(event) =>
                                setAuthor(event.target.value)
                            }
                            placeholder="Как вас подписать?"
                            className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/60"
                        />
                    </label>

                    <label className="mt-3 block">
                        <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                            Отзыв
                        </span>
                        <textarea
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            rows={4}
                            placeholder="Как предмет выглядит в игре?"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm leading-relaxed text-white outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/60"
                        />
                    </label>

                    <button
                        type="submit"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110 active:scale-[0.98]"
                    >
                        <SendIcon className="h-4 w-4" />
                        Опубликовать
                    </button>
                </form>
            </div>
        </section>
    );
}

export function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const { goods, loading, order, addToBasket, reviews } = useShop();

    if (loading) return <ProductSkeleton />;

    const good = goods.find((item) => item.id === id);

    if (!good) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <EmptyState
                    icon={<CompassIcon className="h-8 w-8" />}
                    title="Предмет не найден"
                    description="Возможно, он уже исчез из коллекции или ссылка устарела. Загляните в каталог — там ещё много интересного."
                    action={
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Вернуться в каталог
                        </Link>
                    }
                />
            </div>
        );
    }

    const inCart = order.find((item) => item.id === good.id);
    const productReviews = reviews[good.id] ?? [];

    const sameCategory = goods.filter(
        (item) => item.id !== good.id && item.category === good.category
    );
    const otherGoods = goods.filter(
        (item) => item.id !== good.id && item.category !== good.category
    );
    const related = [...sameCategory, ...otherGoods].slice(0, 4);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <nav
                aria-label="Хлебные крошки"
                className="flex flex-wrap items-center gap-2 text-xs text-zinc-500"
            >
                <Link to="/" className="transition hover:text-white">
                    Витрина
                </Link>
                <span aria-hidden="true">/</span>
                {good.category && (
                    <>
                        <span>{good.category}</span>
                        <span aria-hidden="true">/</span>
                    </>
                )}
                <span className="max-w-[16rem] truncate text-zinc-300">
                    {good.name}
                </span>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
                <div className="group relative animate-fade-up">
                    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_50px_140px_-60px_rgba(139,92,246,0.9)]">
                        <ProductArt
                            good={good}
                            className="aspect-square w-full"
                            emojiClassName="text-[7rem] sm:text-[10rem]"
                            showLabel={false}
                        />

                        {good.tag && (
                            <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-night-950/60 px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-md">
                                {good.tag}
                            </span>
                        )}

                        {typeof good.rating === 'number' && (
                            <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-night-950/60 px-3 py-1.5 text-xs font-bold text-amber-200 backdrop-blur-md">
                                <StarIcon className="h-3.5 w-3.5" />
                                {good.rating.toFixed(1)}
                            </span>
                        )}

                        <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-night-950/55 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
                            <SparklesIcon className="h-3 w-3 text-cyan-300" />
                            Neon Collection
                        </span>
                    </div>
                </div>

                <div className="flex animate-fade-up flex-col [animation-delay:120ms]">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-fuchsia-200">
                            {good.category ?? 'Коллекция'}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">
                            #{good.id}
                        </span>
                    </div>

                    <h1 className="mt-4 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
                        {good.name}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                        <RatingStars
                            value={good.rating ?? 4.8}
                            starClassName="h-4 w-4"
                        />
                        <span className="font-bold text-white">
                            {(good.rating ?? 4.8).toFixed(1)}
                        </span>
                        <span>
                            · {productReviews.length}{' '}
                            {productReviews.length === 1
                                ? 'отзыв'
                                : 'отзывов'}
                        </span>
                    </div>

                    <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg">
                        {good.description}
                    </p>

                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                                    Цена
                                </p>
                                <p className="mt-1 font-display text-3xl font-bold tracking-tight text-white">
                                    {formatPrice(good.price)}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => addToBasket(good)}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-6 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-fuchsia-500/25 transition hover:brightness-110 active:scale-[0.98]"
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    В корзину
                                </button>
                                {inCart && (
                                    <Link
                                        to="/cart"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.05] px-5 py-3.5 text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/[0.09]"
                                    >
                                        <BagIcon className="h-4 w-4 text-fuchsia-300" />
                                        В корзине · {inCart.quantity}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                        {[
                            {
                                icon: <BoltIcon className="h-4 w-4" />,
                                title: 'Мгновенно',
                                text: 'Сразу после оплаты',
                            },
                            {
                                icon: <ShieldIcon className="h-4 w-4" />,
                                title: 'Гарантия',
                                text: '30 дней на возврат',
                            },
                            {
                                icon: <CardIcon className="h-4 w-4" />,
                                title: 'Безопасно',
                                text: 'Защищённая оплата',
                            },
                        ].map((feature) => (
                            <li
                                key={feature.title}
                                className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                            >
                                <span className="flex items-center gap-2 text-xs font-bold text-white">
                                    <span className="text-cyan-300">
                                        {feature.icon}
                                    </span>
                                    {feature.title}
                                </span>
                                <p className="mt-1 text-[11px] text-zinc-500">
                                    {feature.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <ReviewsSection good={good} />

            {related.length > 0 && (
                <section className="mt-20">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                                Подборка
                            </span>
                            <h2 className="mt-2 font-display text-2xl font-bold text-white sm:text-3xl">
                                С этим часто берут
                            </h2>
                        </div>
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white"
                        >
                            Весь каталог
                            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {related.map((item, index) => (
                            <ProductCard
                                key={item.id}
                                good={item}
                                index={index}
                            />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
