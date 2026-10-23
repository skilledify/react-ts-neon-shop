import { Link } from 'react-router';
import { EmptyState } from '../components/EmptyState';
import { HeartIcon } from '../components/icons';
import { PageHeader } from '../components/PageHeader';
import { ProductCard } from '../components/ProductCard';
import { pluralize } from '../lib/format';
import { useShop } from '../store/ShopContext';

export function WishlistPage() {
    const { goods, wishlist, loading } = useShop();

    const items = wishlist
        .map((id) => goods.find((good) => good.id === id))
        .filter((good) => good !== undefined);

    return (
        <>
            <PageHeader
                eyebrow="Обратная сторона сердца"
                icon={<HeartIcon className="h-4 w-4" />}
                title={
                    <>
                        Избранные{' '}
                        <span className="text-gradient">предметы</span>
                    </>
                }
                description={
                    items.length
                        ? `${items.length} ${pluralize(items.length, [
                              'предмет',
                              'предмета',
                              'предметов',
                          ])} ждут своего часа. Добавьте в корзину, когда будете готовы.`
                        : 'Отмечайте сердечком понравившиеся скины — они соберутся здесь.'
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
                ) : items.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {items.map((good, index) => (
                            <ProductCard
                                key={good.id}
                                good={good}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<HeartIcon filled className="h-8 w-8" />}
                        title="Список пока пуст"
                        description="Загляните на витрину и отметьте сердечком то, что отзывается. Избранное сохранится даже после перезагрузки."
                        action={
                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                            >
                                На витрину
                            </Link>
                        }
                    />
                )}
            </div>
        </>
    );
}
