import { Link } from 'react-router';
import { CartItemRow } from '../components/CartItemRow';
import { EmptyState } from '../components/EmptyState';
import { ProductGrid } from '../components/ProductGrid';
import { PromoInput } from '../components/PromoInput';
import { SectionHeading } from '../components/SectionHeading';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    BagIcon,
    BoltIcon,
    CardIcon,
    LockIcon,
    ShieldIcon,
} from '../components/icons';
import { cartCount, cartTotal } from '../lib/cart';
import { discountFor } from '../lib/coupons';
import { formatPrice, pluralize } from '../lib/format';
import { useShop } from '../store/ShopContext';

export function CartPage() {
    const { order, coupon, goods, clearBasket, notify } = useShop();
    const count = cartCount(order);
    const subtotal = cartTotal(order);
    const discount = discountFor(subtotal, coupon);
    const total = subtotal - discount;

    const recommendations = goods
        .filter((good) => !order.some((item) => item.id === good.id))
        .slice(0, 4);

    return (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                        <BagIcon className="h-4 w-4" />
                        Ваш выбор
                    </span>
                    <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                        Корзина
                    </h1>
                    <p className="mt-2 text-sm text-zinc-400">
                        {count
                            ? `${count} ${pluralize(count, [
                                  'предмет',
                                  'предмета',
                                  'предметов',
                              ])} готовы к оформлению`
                            : 'Здесь появятся выбранные предметы'}
                    </p>
                </div>

                <Link
                    to="/"
                    className="group inline-flex items-center gap-2 self-start rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white sm:self-auto"
                >
                    <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                    Продолжить покупки
                </Link>
            </div>

            {!order.length ? (
                <EmptyState
                    className="mt-10"
                    icon={<BagIcon className="h-8 w-8" />}
                    title="Пока пусто"
                    description="Корзина ждёт своего первого предмета. Загляните в коллекцию — там есть скины, кирки и кое-что светящееся."
                    action={
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-5 py-3 text-sm font-extrabold text-night-950 shadow-xl shadow-fuchsia-500/25 transition hover:brightness-110"
                        >
                            В каталог
                            <ArrowRightIcon className="h-4 w-4" />
                        </Link>
                    }
                />
            ) : (
                <>
                    <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_0.8fr] lg:items-start">
                        <div>
                            <div className="flex items-center justify-between px-1 pb-3">
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                                    {count} {pluralize(count, ['товар', 'товара', 'товаров'])}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (
                                            window.confirm(
                                                'Очистить корзину полностью?'
                                            )
                                        ) {
                                            clearBasket();
                                            notify('Корзина очищена');
                                        }
                                    }}
                                    className="text-xs font-semibold text-zinc-500 transition hover:text-rose-300"
                                >
                                    Очистить
                                </button>
                            </div>

                            <div className="divide-y divide-white/5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] px-4 sm:px-5">
                                {order.map((item) => (
                                    <CartItemRow key={item.id} item={item} />
                                ))}
                            </div>

                            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-[11px] text-zinc-500">
                                <span className="inline-flex items-center gap-1.5">
                                    <BoltIcon className="h-3.5 w-3.5 text-cyan-300" />
                                    Выдача сразу после оформления
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <ShieldIcon className="h-3.5 w-3.5 text-violet-300" />
                                    Гарантия 30 дней
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <LockIcon className="h-3.5 w-3.5 text-emerald-300" />
                                    Безопасная оплата
                                </span>
                            </div>
                        </div>

                        <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:sticky lg:top-24">
                            <h2 className="font-display text-xl font-bold text-white">
                                Сводка заказа
                            </h2>

                            <PromoInput className="mt-4" />

                            <dl className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm">
                                <div className="flex items-center justify-between text-zinc-400">
                                    <dt>
                                        Товары ({count}{' '}
                                        {pluralize(count, [
                                            'шт.',
                                            'шт.',
                                            'шт.',
                                        ])})
                                    </dt>
                                    <dd className="font-semibold text-zinc-200">
                                        {formatPrice(subtotal)}
                                    </dd>
                                </div>
                                {coupon && (
                                    <div className="flex items-center justify-between text-zinc-400">
                                        <dt>Скидка {coupon.code}</dt>
                                        <dd className="font-semibold text-emerald-300">
                                            −{formatPrice(discount)}
                                        </dd>
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-zinc-400">
                                    <dt className="inline-flex items-center gap-1.5">
                                        <BoltIcon className="h-3.5 w-3.5 text-cyan-300" />
                                        Доставка
                                    </dt>
                                    <dd className="font-semibold text-cyan-300">
                                        Бесплатно
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between text-zinc-400">
                                    <dt className="inline-flex items-center gap-1.5">
                                        <ShieldIcon className="h-3.5 w-3.5 text-violet-300" />
                                        Гарантия
                                    </dt>
                                    <dd className="font-semibold text-zinc-200">
                                        30 дней
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-5">
                                <span className="text-sm font-semibold text-zinc-300">
                                    Итого
                                </span>
                                <span className="animate-gradient text-gradient font-display text-3xl font-bold">
                                    {formatPrice(total)}
                                </span>
                            </div>

                            <Link
                                to="/checkout"
                                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-5 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-fuchsia-500/25 transition hover:brightness-110 active:scale-[0.99]"
                            >
                                <CardIcon className="h-4 w-4" />
                                Оформить заказ
                            </Link>

                            <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-zinc-500">
                                <ShieldIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300/70" />
                                Демо-оформление: оплата не списывается, заказ
                                появится в истории покупок.
                            </p>
                        </aside>
                    </div>

                    {recommendations.length > 0 && (
                        <section className="mt-16">
                            <SectionHeading
                                eyebrow="Добавьте к заказу"
                                title="Может пригодиться"
                                description="Предметы, которые хорошо сочетаются с вашей корзиной."
                                action={
                                    <Link
                                        to="/"
                                        className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white"
                                    >
                                        Весь каталог
                                        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                    </Link>
                                }
                            />
                            <ProductGrid
                                goods={recommendations}
                                className="mt-6"
                            />
                        </section>
                    )}
                </>
            )}
        </div>
    );
}
