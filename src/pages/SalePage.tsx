import { Link } from 'react-router';
import { Countdown } from '../components/Countdown';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { ProductCard } from '../components/ProductCard';
import { PercentIcon, SparklesIcon, TagIcon } from '../components/icons';
import { formatPrice } from '../lib/format';
import { useShop } from '../store/ShopContext';

export function SalePage() {
    const { goods, loading } = useShop();

    const saleGoods = goods
        .filter((good) => good.oldPrice && good.oldPrice > good.price)
        .map((good) => ({
            good,
            discount: Math.round((1 - good.price / (good.oldPrice as number)) * 100),
        }))
        .sort((a, b) => b.discount - a.discount);

    const biggestDiscount = saleGoods[0]?.discount ?? 0;
    const totalSaving = saleGoods.reduce(
        (sum, item) => sum + ((item.good.oldPrice as number) - item.good.price),
        0
    );

    return (
        <>
            <PageHeader
                eyebrow="Скидки светятся ярче"
                icon={<PercentIcon className="h-4 w-4" />}
                title={<>Распродажа <span className="text-gradient">коллекции</span></>}
                description="Цены уже снизили навсегда — это не таймер на фейковом дедлайне. Но следующий дроп заменит витрину, так что ловите момент."
                actions={
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                        <p className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-fuchsia-300">
                            <SparklesIcon className="h-4 w-4" />
                            До следующего дропа
                        </p>
                        <Countdown />
                    </div>
                }
            />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                {loading ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 4 }, (_, index) => (
                            <div
                                key={index}
                                className="aspect-[3/4] animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
                            />
                        ))}
                    </div>
                ) : saleGoods.length ? (
                    <>
                        <div className="mb-8 grid gap-4 sm:grid-cols-3">
                            {[
                                {
                                    label: 'предметов со скидкой',
                                    value: `${saleGoods.length}`,
                                },
                                {
                                    label: 'максимальная скидка',
                                    value: `−${biggestDiscount}%`,
                                },
                                {
                                    label: 'экономия по каталогу',
                                    value: formatPrice(totalSaving),
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                                >
                                    <p className="font-display text-2xl font-bold text-white">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {saleGoods.map((item, index) => (
                                <ProductCard
                                    key={item.good.id}
                                    good={item.good}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent p-7 sm:p-10">
                            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-amber-200">
                                <TagIcon className="h-3.5 w-3.5" />
                                Ещё больше пользы
                            </span>
                            <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
                                Промокод сворачивает скидки вдвое
                            </h2>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                                Соберите корзину и введите код из рассылки в
                                сводке заказа — дополнительная скидка
                                применится поверх распродажных цен.
                            </p>
                            <Link
                                to="/"
                                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                            >
                                Собрать корзину
                            </Link>
                        </div>
                    </>
                ) : (
                    <EmptyState
                        icon={<PercentIcon className="h-8 w-8" />}
                        title="Скидок пока нет"
                        description="С распродажа закончилась быстрее, чем мы успели обновить страницу. Загляните в полный каталог."
                        action={
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                            >
                                Открыть каталог
                            </Link>
                        }
                    />
                )}
            </div>
        </>
    );
}
