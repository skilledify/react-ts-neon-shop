import { demoGoods } from '../data/demoGoods';
import type { CatalogSource, Good } from '../types';

const API_URL =
    import.meta.env.VITE_API_URL ?? 'https://fortniteapi.io/v1/shop?lang=ru';
const API_KEY = import.meta.env.VITE_API_KEY;

const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

type ApiRecord = Record<string, unknown>;

const asRecord = (value: unknown): ApiRecord =>
    typeof value === 'object' && value !== null ? (value as ApiRecord) : {};

const asString = (value: unknown, fallback = '') =>
    typeof value === 'string' && value.length > 0 ? value : fallback;

const asNumber = (value: unknown, fallback = 0) =>
    typeof value === 'number' && Number.isFinite(value) ? value : fallback;

function normalizeGood(raw: unknown, index: number): Good {
    const item = asRecord(raw);
    const price = asRecord(item.price);

    return {
        id: String(item.id ?? item.offerId ?? `api-${index}`),
        name: asString(item.name, `Предмет #${index + 1}`),
        description: asString(
            item.description,
            asString(asRecord(item.series).name, 'Цифровой предмет из новой коллекции.')
        ),
        price:
            asNumber(price.finalPrice) ||
            asNumber(price.regularPrice) ||
            asNumber(item.price) ||
            0,
        image: asString(item.full_background) || asString(item.image) || undefined,
        category: asString(asRecord(item.series).name, 'Коллекция'),
        tag: asString(asRecord(item.rarity).name) || undefined,
        rating: 4.5 + ((index * 7) % 5) / 10,
        accent: ['#7c3aed', '#0e7490'],
    };
}

export interface CatalogResult {
    goods: Good[];
    source: CatalogSource;
}

export async function loadGoods(): Promise<CatalogResult> {
    if (!API_KEY) {
        await sleep(500);
        return { goods: demoGoods, source: 'demo' };
    }

    try {
        const response = await fetch(API_URL, {
            headers: { Authorization: API_KEY },
        });

        if (!response.ok) {
            throw new Error(`Fortnite API responded with ${response.status}`);
        }

        const data = asRecord(await response.json());
        const featured = Array.isArray(data.featured) ? data.featured : [];

        if (!featured.length) {
            throw new Error('Fortnite API returned an empty catalog');
        }

        return {
            goods: featured.map(normalizeGood),
            source: 'api',
        };
    } catch (error) {
        console.warn(
            '[Neon Shop] Не удалось загрузить каталог, показываем демо-коллекцию.',
            error
        );
        await sleep(300);
        return { goods: demoGoods, source: 'demo' };
    }
}
