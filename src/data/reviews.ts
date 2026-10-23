import { demoGoods } from '../data/demoGoods';
import type { Review } from '../types';

const authors = [
    'Артём',
    'Кира',
    'Максим',
    'Лера',
    'Никита',
    'Соня',
    'Данил',
    'Алиса',
];

const texts = [
    'Выглядит даже лучше, чем на витрине. Сразу собрал новый образ — лобби одобрило.',
    'Взял по скидке и не пожалел. Анимации приятные, в игре смотрится ярко.',
    'Доставили мгновенно, всё пришло без проблем. Один из любимых предметов коллекции.',
    'Цвета просто космос, особенно в тёмных локациях. Рекомендую к покупке.',
    'Необычный дизайн, выделяется среди остальных. Минус только один — хочется ещё.',
    'Брал в подарок, человек остался в восторге. Оформление заняло минуту.',
];

const dates = [
    '2026-09-18T12:00:00.000Z',
    '2026-09-27T16:30:00.000Z',
    '2026-10-04T10:15:00.000Z',
    '2026-10-11T19:45:00.000Z',
    '2026-10-16T09:20:00.000Z',
    '2026-10-20T14:10:00.000Z',
];

export const seedReviews: Record<string, Review[]> = Object.fromEntries(
    demoGoods.map((good, index) => {
        const firstAuthor = authors[index % authors.length];
        const secondAuthor = authors[(index + 3) % authors.length];
        const firstText = texts[index % texts.length];
        const secondText = texts[(index + 2) % texts.length];

        return [
            good.id,
            [
                {
                    id: `seed-${good.id}-1`,
                    productId: good.id,
                    author: firstAuthor,
                    rating: 5,
                    text: firstText,
                    createdAt: dates[index % dates.length],
                },
                {
                    id: `seed-${good.id}-2`,
                    productId: good.id,
                    author: secondAuthor,
                    rating: index % 3 === 0 ? 4 : 5,
                    text: secondText,
                    createdAt: dates[(index + 1) % dates.length],
                },
            ],
        ];
    })
);
