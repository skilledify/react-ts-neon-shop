import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import {
    BoltIcon,
    ClockIcon,
    MailIcon,
    MessageIcon,
    SendIcon,
    ShieldIcon,
} from '../components/icons';
import { useShop } from '../store/ShopContext';

const channels = [
    {
        icon: <MessageIcon className="h-5 w-5" />,
        title: 'Чат в профиле',
        text: 'Среднее время ответа — 4 минуты. Работает даже ночью.',
    },
    {
        icon: <MailIcon className="h-5 w-5" />,
        title: 'hello@neon.shop',
        text: 'Для подробных вопросов, предложений и партнёрства.',
    },
];

const topics = ['Заказ', 'Оплата', 'Возврат', 'Предложение дропа'];

export function SupportPage() {
    const { notify } = useShop();
    const [topic, setTopic] = useState(topics[0]);
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();

        if (message.trim().length < 10) {
            notify('Опишите проблему подробнее — хотя бы 10 символов');
            return;
        }

        setSent(true);
        setMessage('');
        notify('Сообщение отправлено — ответим в ближайшие минуты');
    };

    return (
        <>
            <PageHeader
                eyebrow="Мы на связи 24/7"
                icon={<MessageIcon className="h-4 w-4" />}
                title={<>Поддержка <span className="text-gradient">без ботов</span></>}
                description="Отвечают живые игроки. Ни один бот не скажет вам «переустановите и приходите позже»."
            />

            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        {
                            icon: <BoltIcon className="h-4 w-4" />,
                            label: '≈ 4 мин',
                            text: 'средний ответ',
                        },
                        {
                            icon: <ClockIcon className="h-4 w-4" />,
                            label: '24/7',
                            text: 'без выходных',
                        },
                        {
                            icon: <ShieldIcon className="h-4 w-4" />,
                            label: '30 дней',
                            text: 'на возврат заказа',
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4"
                        >
                            <p className="inline-flex items-center gap-2 font-display text-xl font-bold text-white">
                                <span className="text-fuchsia-300">
                                    {stat.icon}
                                </span>
                                {stat.label}
                            </p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                                {stat.text}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
                    <div className="space-y-4">
                        {channels.map((channel) => (
                            <div
                                key={channel.title}
                                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
                            >
                                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/15 text-fuchsia-300 ring-1 ring-white/10">
                                    {channel.icon}
                                </span>
                                <h2 className="mt-3 font-display text-base font-bold text-white">
                                    {channel.title}
                                </h2>
                                <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                                    {channel.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="animate-fade-up rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                    >
                        <h2 className="font-display text-lg font-bold text-white">
                            Написать нам
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {topics.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() => setTopic(item)}
                                    aria-pressed={topic === item}
                                    className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                                        topic === item
                                            ? 'border-fuchsia-400/50 bg-gradient-to-r from-violet-500/25 to-fuchsia-500/20 text-white'
                                            : 'border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        <label className="mt-4 block">
                            <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                                Сообщение
                            </span>
                            <textarea
                                value={message}
                                onChange={(event) =>
                                    setMessage(event.target.value)
                                }
                                rows={5}
                                placeholder="Опишите, что случилось: номер заказа, предмет, что пошло не так…"
                                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-white outline-none transition placeholder:text-zinc-500 focus:border-fuchsia-400/60 focus:bg-white/[0.07]"
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={sent}
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-300 px-6 py-3.5 text-sm font-extrabold text-night-950 shadow-xl shadow-fuchsia-500/25 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
                        >
                            <SendIcon className="h-4 w-4" />
                            {sent ? 'Отправлено' : 'Отправить сообщение'}
                        </button>

                        {sent && (
                            <p className="mt-3 text-center text-xs text-emerald-200">
                                Спасибо! Локальная демо-поддержка уже «готовит»
                                ответ.
                            </p>
                        )}

                        <p className="mt-3 text-center text-[11px] text-zinc-600">
                            Смотрите также{' '}
                            <Link
                                to="/faq"
                                className="font-semibold text-fuchsia-300 transition hover:text-fuchsia-200"
                            >
                                частые вопросы
                            </Link>
                            .
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
