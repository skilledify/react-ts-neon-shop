import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { EmptyState } from '../components/EmptyState';
import { formatPrice } from '../lib/format';
import { useShop } from '../store/ShopContext';
import type { Good } from '../types';
import {
    CloseIcon,
    CompareIcon,
    PlusIcon,
    StarIcon,
} from '../components/icons';
import { PageHeader } from '../components/PageHeader';
import { ProductArt } from '../components/ProductArt';

interface Row {
    label: string;
    render: (good: Good) => ReactNode;
}

const rows: Row[] = [
    {
        label: 'Категория',
        render: (good) => good.category ?? '—',
    },
    {
        label: 'Цена',
        render: (good) => (
            <span className="font-display font-bold text-white">
                {formatPrice(good.price)}
            </span>
        ),
    },
    {
        label: 'Старая цена',
        render: (good) =>
            good.oldPrice ? (
                <span className="text-zinc-500 line-through">
                    {formatPrice(good.oldPrice)}
                </span>
            ) : (
                '—'
            ),
    },
    {
        label: 'Рейтинг',
        render: (good) =>
            typeof good.rating === 'number' ? (
                <span className="inline-flex items-center gap-1 text-amber-300">
                    <StarIcon className="h-3.5 w-3.5" />
                    {good.rating.toFixed(1)}
                </span>
            ) : (
                '—'
            ),
    },
    {
        label: 'В наличии',
        render: (good) =>
            typeof good.stock === 'number' ? `${good.stock} шт.` : 'Много',
    },
    {
        label: 'Описание',
        render: (good) => (
            <span className="text-sm leading-relaxed text-zinc-400">
                {good.description}
            </span>
        ),
    },
];

export function ComparePage() {
    const { goods, compare, toggleCompare, addToBasket, notify } = useShop();

    const items = compare
        .map((id) => goods.find((good) => good.id === id))
        .filter((good) => good !== undefined);

    const bestPrice = Math.min(
        ...items.map((good) => good.price),
        Number.POSITIVE_INFINITY
    );

    return (
        <>
            <PageHeader
                eyebrow="Взвешиваем каждый пиксель"
                icon={<CompareIcon className="h-4 w-4" />}
                title={
                    <>
                        Сравнение<span className="text-gradient">предметов</span>
                    </>
                }
                description={
                    items.length
                        ? `${items.length} ${items.length === 1 ? 'предмет' : 'предметов'} на одной панели. Уберите лишнее и выберите то, что действительно нужно.`
                        : 'Добавьте к сравнению два-три предмета с карточки товара — и выбирайте по фактам.'
                }
            />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                {items.length ? (
                    <div className="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
                        <table className="w-full min-w-[46rem] border-collapse text-left">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="w-40 border-b border-white/10 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500"
                                    >
                                        Параметр
                                    </th>
                                    {items.map((good) => (
                                        <th
                                            key={good.id}
                                            scope="col"
                                            className="border-b border-l border-white/10 px-5 py-4 align-top"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <ProductArt
                                                        good={good}
                                                        className="mb-3 aspect-[3/2] w-full max-w-[11rem] rounded-2xl"
                                                        emojiClassName="text-4xl"
                                                    />
                                                    <Link
                                                        to={`/product/${encodeURIComponent(good.id)}`}
                                                        className="block truncate font-display text-sm font-bold text-white transition hover:text-fuchsia-300"
                                                    >
                                                        {good.name}
                                                    </Link>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleCompare(good)
                                                    }
                                                    aria-label={`Убрать «${good.name}» из сравнения`}
                                                    className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:border-rose-400/40 hover:text-rose-300"
                                                >
                                                    <CloseIcon className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row) => (
                                    <tr
                                        key={row.label}
                                        className="align-top odd:bg-white/[0.02]"
                                    >
                                        <th
                                            scope="row"
                                            className="border-b border-white/[0.06] px-5 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-zinc-500"
                                        >
                                            {row.label}
                                        </th>
                                        {items.map((good) => (
                                            <td
                                                key={good.id}
                                                className="border-b border-l border-white/[0.06] px-5 py-3.5 text-sm text-zinc-200"
                                            >
                                                {row.render(good)}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr>
                                    <td className="px-5 pt-4" />
                                    {items.map((good) => (
                                        <td
                                            key={good.id}
                                            className="border-l border-t border-transparent px-5 pt-4"
                                        >
                                            {good.price === bestPrice && (
                                                <span className="mb-2 inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-200">
                                                    Лучше всего по цене
                                                </span>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    addToBasket(good);
                                                    notify(
                                                        `«${good.name}» добавлен в корзину`
                                                    );
                                                }}
                                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-fuchsia-500/20 transition hover:brightness-110"
                                            >
                                                <PlusIcon className="h-3.5 w-3.5" />
                                                В корзину
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState
                        icon={<CompareIcon className="h-8 w-8" />}
                        title="Пока нечего сравнивать"
                        description="На карточке любого предмета есть кнопка сравнения. Добавьте пару вариантов — и они встретятся здесь."
                        action={
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-110"
                            >
                                Выбрать предметы
                            </Link>
                        }
                    />
                )}
            </div>
        </>
    );
}
