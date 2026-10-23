import type { Good } from '../types';

/**
 * Локальная коллекция — используется, пока не задан VITE_API_KEY
 * или если Fortnite Shop API недоступен.
 */
export const demoGoods: Good[] = [
    {
        id: 'void-raider',
        name: 'Пустотный рейдер',
        description:
            'Обсидиановая броня с неоновыми контурами. Появляется из разлома прямо на поле боя.',
        price: 1599,
        oldPrice: 1999,
        category: 'Скины',
        emoji: '🥷',
        accent: ['#7c3aed', '#1e1b4b'],
        rating: 4.9,
        tag: 'Хит',
    },
    {
        id: 'cyber-fox',
        name: 'Кибер-лис',
        description:
            'Хвостатый хакер с голографическим мехом. Перехватывает чужие победы ещё до старта.',
        price: 1499,
        oldPrice: 1799,
        category: 'Скины',
        emoji: '🦊',
        accent: ['#fb923c', '#be185d'],
        rating: 4.8,
        tag: 'Новинка',
    },
    {
        id: 'astral-blade',
        name: 'Астральный клинок',
        description:
            'Кирка из сжатого звёздного света. Добывает ресурсы и оставляет за собой след из искр.',
        price: 899,
        category: 'Кирки',
        emoji: '⚔️',
        accent: ['#22d3ee', '#4338ca'],
        rating: 4.7,
    },
    {
        id: 'pixel-storm',
        name: 'Пиксельный шторм',
        description:
            'Эмоция, которая разбирает вас на пиксели и собирает обратно. Идеально для победы.',
        price: 499,
        oldPrice: 749,
        category: 'Эмоции',
        emoji: '🕺',
        accent: ['#e879f9', '#6d28d9'],
        rating: 4.6,
        tag: 'Хит',
    },
    {
        id: 'comet-glider',
        name: 'Глайдер «Комета»',
        description:
            'Спуск с орбиты в компании ледяного хвоста. Слышно за несколько километров.',
        price: 1199,
        oldPrice: 1499,
        category: 'Глайдеры',
        emoji: '☄️',
        accent: ['#38bdf8', '#312e81'],
        rating: 4.8,
    },
    {
        id: 'acid-backpack',
        name: 'Рюкзак «Кислота»',
        description:
            'Светящийся контейнер с токсичным содержимым. Не рекомендуется открывать в лобби.',
        price: 699,
        oldPrice: 899,
        category: 'Рюкзаки',
        emoji: '🎒',
        accent: ['#a3e635', '#047857'],
        rating: 4.5,
    },
    {
        id: 'frost-spike',
        name: 'Кирка «Ледяной шип»',
        description:
            'Кристалл вечной мерзлоты на рукояти из чёрного льда. Бьёт точно и очень холодно.',
        price: 949,
        oldPrice: 1099,
        category: 'Кирки',
        emoji: '❄️',
        accent: ['#67e8f9', '#1d4ed8'],
        rating: 4.7,
    },
    {
        id: 'hyperdrive',
        name: 'Эмоция «Гипердрайв»',
        description:
            'Молниеносная связка движений под синтвейв. Заводит даже самых серьёзных соперников.',
        price: 549,
        oldPrice: 699,
        category: 'Эмоции',
        emoji: '⚡',
        accent: ['#fbbf24', '#ea580c'],
        rating: 4.9,
        tag: 'Лимитка',
    },
    {
        id: 'sakura-glider',
        name: 'Глайдер «Сакура»',
        description:
            'Лепестки, ветер и бесконечный закат. Самый поэтичный способ приземлиться.',
        price: 1249,
        oldPrice: 1499,
        category: 'Глайдеры',
        emoji: '🌸',
        accent: ['#f9a8d4', '#9d174d'],
        rating: 4.8,
        tag: 'Новинка',
    },
    {
        id: 'neon-cat',
        name: 'Рюкзак «Неон-кот»',
        description:
            'Мурлычет на частоте 432 Гц и подсвечивает путь в тёмных коридорах.',
        price: 749,
        category: 'Рюкзаки',
        emoji: '🐱',
        accent: ['#2dd4bf', '#065f46'],
        rating: 4.6,
    },
    {
        id: 'golden-phoenix',
        name: 'Золотой феникс',
        description:
            'Королевский скин с живым пламенем. Возрождается даже после самого неудачного дропа.',
        price: 1899,
        category: 'Скины',
        emoji: '🔥',
        accent: ['#fbbf24', '#b91c1c'],
        rating: 5,
        tag: 'Лимитка',
    },
    {
        id: 'space-guest',
        name: 'Космический гость',
        description:
            'Прилетел за образцами земной моды. Забрал лучшие и оставил немного неона.',
        price: 1699,
        category: 'Скины',
        emoji: '🛸',
        accent: ['#6366f1', '#7e22ce'],
        rating: 4.9,
    },
];
