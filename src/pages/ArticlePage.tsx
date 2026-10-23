import { Link, useParams } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { ProductCard } from '../components/ProductCard';
import {
    ArrowLeftIcon,
    CalendarIcon,
    ClockIcon,
    MessageIcon,
} from '../components/icons';
import { articles } from '../data/articles';
import { useShop } from '../store/ShopContext';

export function ArticlePage() {
    const { slug } = useParams<{ slug: string }>();
    const goods = useShop().goods;

    const article = articles.find((item) => item.slug === slug);

    if (!article) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
                <p className="text-5xl">🔎</p>
                <h1 className="mt-4 font-display text-3xl font-bold text-white">
                    Статья не найдена
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    Возможно, материал переехал или ещё пишется.
                </p>
                <Link
                    to="/blog"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Ко всем статьям
                </Link>
            </div>
        );
    }

    const relatedGoods = article.productIds
        ? article.productIds
              .map((id) => goods.find((good) => good.id === id))
              .filter((good) => good !== undefined)
        : [];

    const otherArticles = articles
        .filter((item) => item.slug !== article.slug)
        .slice(0, 3);

    return (
        <>
            <PageHeader
                eyebrow={article.category}
                icon={<MessageIcon className="h-4 w-4" />}
                title={article.title}
                description={article.excerpt}
                actions={
                    <div className="flex flex-col gap-2 text-xs text-zinc-400">
                        <span className="inline-flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-fuchsia-300" />
                            {article.date}
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <ClockIcon className="h-4 w-4 text-fuchsia-300" />
                            {article.readTime} чтения
                        </span>
                    </div>
                }
            />

            <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center gap-3">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Все статьи
                    </Link>
                </div>

                <div
                    className="grid h-44 place-items-center rounded-[2rem] border border-white/10 text-7xl"
                    style={{
                        backgroundImage: `radial-gradient(120% 130% at 20% 0%, ${article.accent[0]}44, transparent 60%), radial-gradient(110% 110% at 90% 100%, ${article.accent[1]}38, transparent 55%), #0a0618`,
                    }}
                    aria-hidden="true"
                >
                    <span className="animate-float">{article.emoji}</span>
                </div>

                <div className="mt-10 space-y-10">
                    {article.sections.map((section, index) => (
                        <section
                            key={index}
                            className="animate-fade-up"
                            style={{ animationDelay: `${index * 80}ms` }}
                        >
                            {section.heading && (
                                <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                                    {section.heading}
                                </h2>
                            )}
                            <div className="space-y-4 text-base leading-relaxed text-zinc-400">
                                {section.paragraphs.map(
                                    (paragraph, parIndex) => (
                                        <p key={parIndex}>{paragraph}</p>
                                    )
                                )}
                            </div>
                            {section.list && (
                                <ul className="mt-4 space-y-3">
                                    {section.list.map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-zinc-300"
                                        >
                                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>
                    ))}
                </div>

                {relatedGoods.length > 0 && (
                    <section className="mt-14">
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                            По мотивам статьи
                        </span>
                        <h2 className="mt-2 font-display text-2xl font-bold text-white">
                            Что пригодится из каталога
                        </h2>
                        <div className="mt-6 grid gap-5 sm:grid-cols-2">
                            {relatedGoods.map((good, index) => (
                                <ProductCard
                                    key={good.id}
                                    good={good}
                                    index={index}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {otherArticles.length > 0 && (
                    <section className="mt-14">
                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                            Читайте также
                        </span>
                        <div className="mt-4 grid gap-3">
                            {otherArticles.map((other) => (
                                <Link
                                    key={other.slug}
                                    to={`/blog/${other.slug}`}
                                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.06]"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="text-2xl"
                                    >
                                        {other.emoji}
                                    </span>
                                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white transition group-hover:text-fuchsia-300">
                                        {other.title}
                                    </span>
                                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                                        {other.readTime}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </>
    );
}
