import { Link } from 'react-router';
import { EmptyState } from '../components/EmptyState';
import { MessageIcon } from '../components/icons';
import { PageHeader } from '../components/PageHeader';
import { articles } from '../data/articles';
import { pluralize } from '../lib/format';

export function BlogPage() {
    const [lead, ...rest] = articles;

    return (
        <>
            <PageHeader
                eyebrow="Журнал Neon"
                icon={<MessageIcon className="h-4 w-4" />}
                title={
                    <>
                        Блог о <span className="text-gradient">неоне</span>
                    </>
                }
                description={`${articles.length} ${pluralize(articles.length, [
                    'разбор',
                    'разбора',
                    'разборов',
                ])} о том, как собрать образ, поймать скидку и не пропустить дроп.`}
            />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                {articles.length ? (
                    <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                        {lead && (
                            <Link
                                to={`/blog/${lead.slug}`}
                                className="group relative flex animate-fade-up flex-col justify-end overflow-hidden rounded-[2rem] border border-white/10 p-7 transition duration-500 hover:-translate-y-1.5 hover:border-white/25 sm:p-9"
                                style={{
                                    backgroundImage: `radial-gradient(120% 120% at 0% 0%, ${lead.accent[0]}3d, #0a0618 55%), radial-gradient(100% 100% at 100% 100%, ${lead.accent[1]}38, transparent 60%)`,
                                }}
                            >
                                <span className="absolute right-5 top-5 text-6xl transition duration-500 group-hover:scale-110 group-hover:-rotate-6">
                                    {lead.emoji}
                                </span>
                                <div className="relative max-w-lg">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-night-950/50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
                                        {lead.category} · {lead.readTime}
                                    </span>
                                    <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white transition group-hover:text-fuchsia-200 sm:text-3xl">
                                        {lead.title}
                                    </h2>
                                    <p className="mt-3 text-sm leading-relaxed text-zinc-300/90">
                                        {lead.excerpt}
                                    </p>
                                    <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
                                        {lead.date}
                                    </p>
                                </div>
                            </Link>
                        )}

                        <div className="grid content-start gap-4">
                            {rest.slice(0, 4).map((article) => (
                                <Link
                                    key={article.slug}
                                    to={`/blog/${article.slug}`}
                                    className="group flex animate-fade-up items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
                                >
                                    <span
                                        className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl ring-1 ring-white/10 transition duration-500 group-hover:rotate-6"
                                        style={{
                                            backgroundImage: `linear-gradient(135deg, ${article.accent[0]}55, ${article.accent[1]}55)`,
                                        }}
                                    >
                                        {article.emoji}
                                    </span>

                                    <div className="min-w-0">
                                        <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                                            <span className="text-fuchsia-300">
                                                {article.category}
                                            </span>
                                            · {article.readTime}
                                        </p>
                                        <h3 className="mt-1 truncate font-display text-base font-bold text-white transition group-hover:text-fuchsia-200">
                                            {article.title}
                                        </h3>
                                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-400">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <EmptyState
                        icon={<MessageIcon className="h-8 w-8" />}
                        title="Статей пока нет"
                        description="Мы уже пишем первые материалы. Загляните позже или выберите предмет на витрине."
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
