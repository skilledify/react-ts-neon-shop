import { Link } from 'react-router';
import { PageHeader } from '../components/PageHeader';
import { ChevronDownIcon, InfoIcon, MessageIcon } from '../components/icons';

const faqItems = [
    {
        question: 'Как быстро предмет попадёт в инвентарь?',
        answer: 'Обычно — меньше минуты после оплаты. В редких случаях пиковой нагрузки это занимает до 15 минут: мы перепроверяем каждый заказ и уведомим вас, если что-то задерживается.',
    },
    {
        question: 'Что такое демо-режим каталога?',
        answer: 'Без ключа Fortnite API витрина показывает локальную демо-коллекцию так, что проект работает в любом окружении. Добавьте VITE_API_KEY в .env — и каталог загрузится из живого API.',
    },
    {
        question: 'Какие способы оплаты поддерживаются?',
        answer: 'Карта, СБП и крипта. Все платежи проходят через защищённый шлюз, данные карты не попадают в наш сервис.',
    },
    {
        question: 'Можно ли вернуть предмет?',
        answer: 'Да, в течение 30 дней с момента покупки, если предмет не был использован для участия в турнирах. Оформляется в пару кликов через поддержку.',
    },
    {
        question: 'Промокоды складываются со скидками распродажи?',
        answer: 'Да. Введите код в сводке заказа — скидка применится поверх распродажной цены. Лимит — один код на заказ.',
    },
    {
        question: 'Где хранятся мои данные?',
        answer: 'В этом демо — только в localStorage вашего браузера: корзина, избранное, сравнение, профиль и заказы. Никакие данные не отправляются на сервер.',
    },
];

export function FaqPage() {
    return (
        <>
            <PageHeader
                eyebrow="Коротко о важном"
                icon={<InfoIcon className="h-4 w-4" />}
                title={<>Частые <span className="text-gradient">вопросы</span></>}
                description="Собрали ответы на то, что спрашивают чаще всего. Не нашли свой вопрос — напишите в поддержку."
            />

            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="space-y-3">
                    {faqItems.map((item, index) => (
                        <details
                            key={item.question}
                            className="group animate-fade-up rounded-2xl border border-white/10 bg-white/[0.03] transition hover:border-white/20"
                            style={{ animationDelay: `${index * 60}ms` }}
                            open={index === 0}
                        >
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-white marker:hidden [&::-webkit-details-marker]:hidden">
                                {item.question}
                                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-zinc-400 transition group-open:rotate-180 group-open:border-fuchsia-400/40 group-open:text-fuchsia-300">
                                    <ChevronDownIcon className="h-3.5 w-3.5" />
                                </span>
                            </summary>
                            <p className="px-5 pb-5 text-sm leading-relaxed text-zinc-400">
                                {item.answer}
                            </p>
                        </details>
                    ))}
                </div>

                <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-transparent p-7 text-center">
                    <p className="text-3xl">💌</p>
                    <h2 className="mt-3 font-display text-xl font-bold text-white">
                        Не нашли ответ?
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-zinc-400">
                        Поддержка отвечает примерно за четыре минуты — в любое
                        время суток.
                    </p>
                    <Link
                        to="/support"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/25 transition hover:brightness-110"
                    >
                        <MessageIcon className="h-4 w-4" />
                        Написать в поддержку
                    </Link>
                </div>
            </div>
        </>
    );
}
