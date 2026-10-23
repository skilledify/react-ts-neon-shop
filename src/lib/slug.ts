const translit: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'h',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'sch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
};

export function slugify(value: string) {
    return value
        .toLowerCase()
        .split('')
        .map((char) => translit[char] ?? char)
        .join('')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

const knownCategories: Record<string, string> = {
    Скины: 'skins',
    Кирки: 'pickaxes',
    Эмоции: 'emotes',
    Глайдеры: 'gliders',
    Рюкзаки: 'backpacks',
};

export const categorySlug = (category: string) =>
    knownCategories[category] ?? slugify(category);

export const findCategoryBySlug = (categories: string[], slug: string) =>
    categories.find((category) => categorySlug(category) === slug);
