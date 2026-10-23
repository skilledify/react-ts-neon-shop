import { Link } from 'react-router';
import { EmptyState } from '../components/EmptyState';
import { GridIcon } from '../components/icons';
import { PageHeader } from '../components/PageHeader';
import { ProductArt } from '../components/ProductArt';
import { demoGoods } from '../data/demoGoods';
import { formatPrice, pluralize } from '../lib/format';
import { categorySlug } from '../lib/slug';
import { useShop } from '../store/ShopContext';

export function CollectionsPage() {
    const { goods, loading } = useShop();
    const source = goods.length ? goods : demoGoods;

    const collections = Array.from(
        new Set(source.map((good) => good.category).filter(Boolean) as string[])
    ).map((category) => {
        const items = source.filter((good) => good.category === category);
        const cover = items[0];

        return {
            category,
            slug: categorySlug(category),
            count: items.length,
            cheapest: items.reduce(
                (min, item) => (item.price < min.price ? item : min),
                items[0]
            ),
            cover,
        };
    });

    return (
        <>
            <PageHeader
                eyebrow="Полная линейка"
                icon={<GridIcon className="h-4 w-4" />}
                title={
                    <>
                        Коллекции <span className="text-gradient">каталога</span>
                    </>
                }
                description="Каждый предмет разбирается по категориям: скины для характера, кирки и глайдеры для стиля, эмоции для Победы Королевской."
            />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                {loading ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }, (_, index) => (
                            <div
                                key={index}
                                className="aspect-[4/3] animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
                            />
                        ))}
                    </div>
                ) : collections.length ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {collections.map((collection, index) => (
                            <Link
                                key={collection.slug}
                                to={`/collections/${collection.slug}`}
                                className="group relative flex animate-fade-up flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_35px_90px_-45px_rgba(139,92,246,0.85)]"
                                style={{
                                    animationDelay: `${Math.min(
                                        index,
                                        8
                                    ) * 60}ms`,
                                }}
                            >
                                {collection.cover && (
                                    <ProductArt
                                        good={collection.cover}
                                        className="aspect-[3/2] w-full"
                                        emojiClassName="text-6xl"
                                    />
                                )}

                                <div className="flex flex-1 flex-col gap-1 p-5">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-300">
                                        {collection.count}{' '}
                                        {pluralize(collection.count, [
                                            'предмет',
                                            'предмета',
                                            'предметов',
                                        ])}
                                    </p>
                                    <h2 className="font-display text-xl font-bold text-white transition group-hover:text-fuchsia-200">
                                        {collection.category}
                                    </h2>
                                    <p className="mt-1 text-sm text-zinc-400">
                                        от{' '}
                                        {collection.cheapest && (
                                            <span className="font-bold text-zinc-200">
                                                {formatPrice(
                                                    collection.cheapest.price
                                                )}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState
                        icon={<GridIcon className="h-8 w-8" />}
                        title="Коллекции собираются"
                        description="Каталог ещё загружается. Обновите страницу чуть позже."
                    />
                )}
            </div>
        </>
    );
}
