import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import {
    BoltIcon,
    HeartIcon,
    MailIcon,
    ShieldIcon,
    SparklesIcon,
} from '../components/icons';

const stats = [
    { value: '2024', label: 'год основания' },
    { value: '12к+', label: 'выданных предметов' },
    { value: '4.9', label: 'средняя оценка' },
    { value: '< 1 мин', label: 'средняя выдача' },
];

const values = [
    {
        icon: <BoltIcon className="h-5 w-5" />,
        title: 'Скорость как культура',
        text: 'Оплата проходит за пару кликов, а предмет оказывается в инвентаре почти мгновенно — мы полируем каждую секунду задержки.',
    },
    {
        icon: <ShieldIcon className="h-5 w-5" />,
        title: 'Гарантия без созвонов',
        text: 'Что-то пошло не так? Возврат по одной кнопке в течение 30 дней. Без объяснительных и заявлений рукописным шрифтом.',
    },
    {
        icon: <SparklesIcon className="h-5 w-5" />,
        title: 'Кураторство вместо свалки',
        text: 'Мы не выгружаем весь магазин подряд. Каждый предмет проходит отбор: характер, анимация и то, как он выглядит в лобби.',
    },
    {
        icon: <HeartIcon className="h-5 w-5" />,
        title: 'Любовь к деталям',
        text: 'Неоновая витрина, быстрые анимации, тихие микроинтеракции — интерфейс должен радовать так же, как сам предмет.',
    },
];

const team = [
    { emoji: '👾', name: 'Михаил', role: 'Основатель и закупщик дропов' },
    { emoji: '🔮', name: 'Аня', role: 'Дизайн витрины и анимации' },
    { emoji: '⚡', name: 'Тимур', role: 'Инфраструктура и выдача' },
    { emoji: '🌙', name: 'Саша', role: 'Поддержка 24/7' },
];

export function AboutPage() {
    return (
        <>
            <PageHeader
                eyebrow="Кто зажигает этот неон"
                icon={<SparklesIcon className="h-4 w-4" />}
                title={<>О <span className="text-gradient">проекте</span></>}
                description="Neon Shop — небольшая команда, которая делает покупку цифровых предметов такой же приятной, как сама игра."
            />

            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <section className="grid animate-fade-up gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5"
                        >
                            <p className="font-display text-3xl font-bold text-white">
                                {stat.value}
                            </p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </section>

                <section className="mt-14 animate-fade-up">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                        Наша история
                    </span>
                    <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
                        Из страсти к коллекциям — в магазин
                    </h2>
                    <div className="mt-5 max-w-3xl space-y-4 text-base leading-relaxed text-zinc-400">
                        <p>
                            Всё началось с личной коллекции, которую наш
                            основатель собирал годами. Друзья просили помочь
                            найти редкий дроп, потом друзья друзей — и в
                            какой-то момент стало ясно: нужен магазин,
                            которому можно доверять.
                        </p>
                        <p>
                            Сегодня Neon Shop работает с двенадцатью
                            поставщиками, держит выдачу меньше минуты и
                            отвечает в поддержке за считанные минуты. Но
                            принцип остался тем же: мы продаём только то, что
                            сами поставили бы в свою коллекцию.
                        </p>
                    </div>
                </section>

                <section className="mt-14 grid animate-fade-up gap-4 sm:grid-cols-2">
                    {values.map((value) => (
                        <div
                            key={value.title}
                            className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]"
                        >
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/15 text-fuchsia-300 ring-1 ring-white/10 transition group-hover:scale-110">
                                {value.icon}
                            </span>
                            <h3 className="mt-4 font-display text-lg font-bold text-white">
                                {value.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                {value.text}
                            </p>
                        </div>
                    ))}
                </section>

                <section className="mt-14 animate-fade-up">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-fuchsia-300">
                        Команда
                    </span>
                    <h2 className="mt-3 font-display text-3xl font-bold text-white">
                        Четыре человека и один аврора-градиент
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 text-center transition duration-300 hover:-translate-y-1 hover:border-white/20"
                            >
                                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-fuchsia-500/15 text-3xl ring-1 ring-white/10">
                                    {member.emoji}
                                </span>
                                <h3 className="mt-4 font-display text-base font-bold text-white">
                                    {member.name}
                                </h3>
                                <p className="mt-1 text-xs text-zinc-500">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent p-7 text-center sm:p-10">
                    <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                        Есть вопрос или идея?
                    </h2>
                    <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                        Мы читаем каждое письмо. Помощь с заказом, предложение
                        дропа или просто «привет» — всё приветствуется.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                            to="/support"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                        >
                            <MailIcon className="h-4 w-4" />
                            Написать в поддержку
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-zinc-200 transition hover:border-white/30 hover:text-white"
                        >
                            На витрину
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
}
