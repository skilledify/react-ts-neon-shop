import { Link, useParams } from 'react-router';
import { EmptyState } from '../components/EmptyState';
import { PageHeader } from '../components/PageHeader';
import { ProductCard } from '../components/ProductCard';
import {
    ArrowLeftIcon,
    ChevronRightIcon,
    GridIcon,
} from '../components/icons';
import { pluralize } from '../lib/format';
import { categorySlug, findCategoryBySlug } from '../lib/slug';
import { useShop } from '../store/ShopContext';

export function CollectionPage() {
    const { slug } = useParams<{ slug: string }>();
    const { goods, loading } = useShop();

    const categories = Array.from(
        new Set(goods.map((good) => good.category).filter(Boolean) as string[])
    );
    const category = slug ? findCategoryBySlug(categories, slug) : undefined;

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="h-40 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]" />
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <div
                            key={index}
                            className="aspect-[3/4] animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
                        />
                    ))}
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <EmptyState
                    icon={<GridIcon className="h-8 w-8" />}
                    title="Коллекция не найдена"
                    description="Такой категории нет в текущей коллекции. Возможно, её переименовали или каталог ещё догружается."
                    action={
                        <Link
                            to="/collections"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Все коллекции
                        </Link>
                    }
                />
            </div>
        );
    }

    const items = goods.filter((good) => good.category === category);

    return (
        <>
            <PageHeader
                eyebrow="Коллекция"
                icon={<GridIcon className="h-4 w-4" />}
                title={
                    <>
                        <span className="text-gradient">{category}</span>
                    </>
                }
                description={`${items.length} ${pluralize(items.length, [
                    'предмет',
                    'предмета',
                    'предметов',
                ])} в этой подборке. Совместимы с любым образом — проверено лобби.`}
            />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <nav
                    aria-label="Хлебные крошки"
                    className="mb-8 flex flex-wrap items-center gap-2 text-xs text-zinc-500"
                >
                    <Link to="/" className="transition hover:text-white">
                        Витрина
                    </Link>
                    <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
                    <Link
                        to="/collections"
                        className="transition hover:text-white"
                    >
                        Коллекции
                    </Link>
                    <ChevronRightIcon className="h-3 w-3" aria-hidden="true" />
                    <span className="text-zinc-300">{category}</span>
                </nav>

                {items.length ? (
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
                        icon={<GridIcon className="h-8 w-8" />}
                        title="Здесь пока пусто"
                        description="Эту категорию добавили совсем недавно, а предметы — вот-вот. Загляните в другие коллекции."
                        action={
                            <Link
                                to="/collections"
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                            >
                                <ArrowLeftIcon className="h-4 w-4" />
                                Все коллекции
                            </Link>
                        }
                    />
                )}

                {categories.filter((item) => item !== category).length > 0 && (
                    <div className="no-scrollbar mt-12 flex gap-2 overflow-x-auto pb-1">
                        {categories
                            .filter((item) => item !== category)
                            .map((item) => (
                                <Link
                                    key={item}
                                    to={`/collections/${categorySlug(item)}`}
                                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-bold text-zinc-400 transition hover:border-white/20 hover:text-white"
                                >
                                    {item}
                                </Link>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
}
