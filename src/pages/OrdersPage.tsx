import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import {
    ArrowRightIcon,
    HeartIcon,
    PackageIcon,
    CheckCircleIcon,
    ClockIcon,
} from '../components/icons';
import { formatPrice } from '../lib/format';
import { useShop } from '../store/ShopContext';

const statusMeta: Record<
    string,
    { label: string; className: string; icon: ReactNode }
> = {
    processing: {
        label: 'В обработке',
        className:
            'border-amber-300/25 bg-amber-300/10 text-amber-200',
        icon: <ClockIcon className="h-3.5 w-3.5" />,
    },
    completed: {
        label: 'Завершён',
        className: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
        icon: <CheckCircleIcon className="h-3.5 w-3.5" />,
    },
};

export function OrdersPage() {
    const { orders } = useShop();

    return (
        <>
            <PageHeader
                eyebrow="История покупок"
                icon={<PackageIcon className="h-4 w-4" />}
                title={
                    <>
                        Мои <span className="text-gradient">заказы</span>
                    </>
                }
                description={
                    orders.length
                        ? `${orders.length} ${orders.length === 1 ? 'заказ' : 'заказов'} уже в истории. Статусы обновляются мгновенно.`
                        : 'Здесь появятся все ваши покупки с составом и статусом выдачи.'
                }
            />

            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                {orders.length ? (
                    <div className="space-y-4">
                        {orders.map((order, index) => {
                            const status =
                                statusMeta[
                                    order.status
                                ] ?? statusMeta.processing;

                            return (
                                <article
                                    key={order.id}
                                    className="animate-fade-up overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:border-white/20"
                                    style={{
                                        animationDelay: `${Math.min(index, 8) * 60}ms`,
                                    }}
                                >
                                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 sm:px-6">
                                        <div>
                                            <p className="font-display text-sm font-bold text-white">
                                                Заказ #{order.id}
                                            </p>
                                            <p className="mt-0.5 text-xs text-zinc-500">
                                                {new Date(
                                                    order.createdAt
                                                ).toLocaleString('ru-RU', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${status.className}`}
                                        >
                                            {status.icon}
                                            {status.label}
                                        </span>
                                    </div>

                                    <ul className="divide-y divide-white/[0.06] px-5 sm:px-6">
                                        {order.items.map((item) => (
                                            <li
                                                key={item.id}
                                                className="flex items-center justify-between gap-3 py-3"
                                            >
                                                <Link
                                                    to={`/product/${encodeURIComponent(item.id)}`}
                                                    className="group flex min-w-0 items-center gap-3"
                                                >
                                                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 text-lg ring-1 ring-white/10">
                                                        {item.emoji ?? '✨'}
                                                    </span>
                                                    <span className="min-w-0">
                                                        <span className="block truncate text-sm font-semibold text-white transition group-hover:text-fuchsia-300">
                                                            {item.name}
                                                        </span>
                                                        <span className="text-xs text-zinc-500">
                                                            {item.quantity} ×{' '}
                                                            {formatPrice(
                                                                item.price
                                                            )}
                                                        </span>
                                                    </span>
                                                </Link>
                                                <span className="shrink-0 text-sm font-bold text-zinc-200">
                                                    {formatPrice(
                                                        item.price *
                                                            item.quantity
                                                    )}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="flex flex-wrap items-center justify-between gap-3 bg-white/[0.02] px-5 py-4 text-sm sm:px-6">
                                        <span className="inline-flex items-center gap-2 text-xs text-zinc-500">
                                            <HeartIcon className="h-3.5 w-3.5 text-fuchsia-300" />
                                            Доставка:{' '}
                                            {order.customer.delivery ===
                                            'account'
                                                ? 'на аккаунт'
                                                : order.customer.delivery ===
                                                    'email'
                                                  ? 'на e-mail'
                                                  : 'в подарок'}
                                        </span>
                                        <span className="font-display text-lg font-bold text-white">
                                            Итого:{' '}
                                            {formatPrice(order.total)}
                                        </span>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                ) : (
                    <EmptyState
                        icon={<PackageIcon className="h-8 w-8" />}
                        title="Заказов пока нет"
                        description="Оформите первый заказ — и он появится здесь вместе с составом и статусом. Демо-заказы никуда не исчезают."
                        action={
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                            >
                                На витрину
                                <ArrowRightIcon className="h-4 w-4" />
                            </Link>
                        }
                    />
                )}
            </div>
        </>
    );
}
