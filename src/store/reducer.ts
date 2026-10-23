import { seedReviews } from '../data/reviews';
import type {
    AppliedCoupon,
    CartItem,
    CatalogSource,
    Good,
    Order,
    Review,
    UserProfile,
} from '../types';

export const STORAGE_KEY = 'react-ts-neon-shop:state-v2';

export interface Toast {
    id: number;
    message: string;
}

export interface ShopState {
    goods: Good[];
    loading: boolean;
    source: CatalogSource;
    order: CartItem[];
    coupon: AppliedCoupon | null;
    wishlist: string[];
    compare: string[];
    recentlyViewed: string[];
    orders: Order[];
    profile: UserProfile;
    reviews: Record<string, Review[]>;
    isCartOpen: boolean;
    isSearchOpen: boolean;
    isMenuOpen: boolean;
    toast: Toast | null;
}

export type ShopAction =
    | { type: 'SET_GOODS'; goods: Good[]; source: CatalogSource }
    | { type: 'ADD_TO_BASKET'; good: Good; quantity?: number }
    | { type: 'REMOVE_FROM_BASKET'; id: string }
    | { type: 'INCREMENT_QUANTITY'; id: string }
    | { type: 'DECREMENT_QUANTITY'; id: string }
    | { type: 'CLEAR_BASKET' }
    | { type: 'TOGGLE_WISHLIST'; id: string; name: string }
    | { type: 'TOGGLE_COMPARE'; id: string; name: string }
    | { type: 'CLEAR_COMPARE' }
    | { type: 'MARK_VIEWED'; id: string }
    | { type: 'SET_COUPON'; coupon: AppliedCoupon }
    | { type: 'CLEAR_COUPON' }
    | { type: 'PLACE_ORDER'; order: Order }
    | { type: 'ADD_REVIEW'; review: Review }
    | { type: 'UPDATE_PROFILE'; profile: UserProfile }
    | { type: 'RESET_DATA' }
    | { type: 'OPEN_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'OPEN_SEARCH' }
    | { type: 'CLOSE_SEARCH' }
    | { type: 'OPEN_MENU' }
    | { type: 'CLOSE_MENU' }
    | { type: 'SHOW_TOAST'; message: string }
    | { type: 'HIDE_TOAST' };

export const defaultProfile: UserProfile = {
    name: 'Гость',
    email: '',
    phone: '',
    avatar: '🦊',
};

interface PersistedShopState {
    order: CartItem[];
    wishlist: string[];
    compare: string[];
    recentlyViewed: string[];
    orders: Order[];
    profile: UserProfile;
    reviews: Record<string, Review[]>;
}

function isCartItem(value: unknown): value is CartItem {
    if (typeof value !== 'object' || value === null) return false;

    const item = value as Partial<CartItem>;

    return (
        typeof item.id === 'string' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
    );
}

function isOrder(value: unknown): value is Order {
    if (typeof value !== 'object' || value === null) return false;

    const order = value as Partial<Order>;

    return (
        typeof order.id === 'string' &&
        typeof order.createdAt === 'string' &&
        typeof order.total === 'number' &&
        Array.isArray(order.items) &&
        order.items.every(isCartItem)
    );
}

function isReview(value: unknown): value is Review {
    if (typeof value !== 'object' || value === null) return false;

    const review = value as Partial<Review>;

    return (
        typeof review.id === 'string' &&
        typeof review.productId === 'string' &&
        typeof review.author === 'string' &&
        typeof review.rating === 'number' &&
        typeof review.text === 'string'
    );
}

const stringArray = (value: unknown): string[] =>
    Array.isArray(value)
        ? value.filter((item): item is string => typeof item === 'string')
        : [];

function readPersistedState(): Partial<PersistedShopState> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};

        const parsed: unknown = JSON.parse(raw);
        if (typeof parsed !== 'object' || parsed === null) return {};

        const data = parsed as Record<string, unknown>;
        const profile = data.profile as Partial<UserProfile> | undefined;

        const reviews: Record<string, Review[]> = {};
        if (typeof data.reviews === 'object' && data.reviews !== null) {
            Object.entries(data.reviews as Record<string, unknown>).forEach(
                ([productId, value]) => {
                    if (Array.isArray(value)) {
                        const valid = value.filter(isReview);
                        if (valid.length) reviews[productId] = valid;
                    }
                }
            );
        }

        return {
            order: Array.isArray(data.order)
                ? data.order.filter(isCartItem).map((item) => ({
                      ...item,
                      quantity: Math.max(1, Math.floor(item.quantity)),
                  }))
                : [],
            wishlist: stringArray(data.wishlist),
            compare: stringArray(data.compare).slice(0, 4),
            recentlyViewed: stringArray(data.recentlyViewed).slice(0, 8),
            orders: Array.isArray(data.orders)
                ? data.orders.filter(isOrder)
                : [],
            profile:
                profile &&
                typeof profile.name === 'string' &&
                typeof profile.email === 'string'
                    ? {
                          name: profile.name,
                          email: profile.email,
                          phone:
                              typeof profile.phone === 'string'
                                  ? profile.phone
                                  : '',
                          avatar:
                              typeof profile.avatar === 'string'
                                  ? profile.avatar
                                  : defaultProfile.avatar,
                      }
                    : defaultProfile,
            reviews,
        };
    } catch {
        return {};
    }
}

export function createInitialState(): ShopState {
    const stored = readPersistedState();

    return {
        goods: [],
        loading: true,
        source: 'demo',
        order: stored.order ?? [],
        coupon: null,
        wishlist: stored.wishlist ?? [],
        compare: stored.compare ?? [],
        recentlyViewed: stored.recentlyViewed ?? [],
        orders: stored.orders ?? [],
        profile: stored.profile ?? defaultProfile,
        reviews:
            stored.reviews && Object.keys(stored.reviews).length
                ? stored.reviews
                : seedReviews,
        isCartOpen: false,
        isSearchOpen: false,
        isMenuOpen: false,
        toast: null,
    };
}

const nextToast = (state: ShopState, message: string): Toast => ({
    id: (state.toast?.id ?? 0) + 1,
    message,
});

export function shopReducer(state: ShopState, action: ShopAction): ShopState {
    switch (action.type) {
        case 'SET_GOODS':
            return {
                ...state,
                goods: action.goods,
                source: action.source,
                loading: false,
            };

        case 'ADD_TO_BASKET': {
            const quantity = Math.max(1, Math.floor(action.quantity ?? 1));
            const exists = state.order.some((item) => item.id === action.good.id);

            return {
                ...state,
                order: exists
                    ? state.order.map((item) =>
                          item.id === action.good.id
                              ? {
                                    ...item,
                                    quantity: item.quantity + quantity,
                                }
                              : item
                      )
                    : [...state.order, { ...action.good, quantity }],
                toast: nextToast(
                    state,
                    quantity > 1
                        ? `«${action.good.name}» ×${quantity} в корзине`
                        : `«${action.good.name}» теперь в корзине`
                ),
            };
        }

        case 'REMOVE_FROM_BASKET':
            return {
                ...state,
                order: state.order.filter((item) => item.id !== action.id),
            };

        case 'INCREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((item) =>
                    item.id === action.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case 'DECREMENT_QUANTITY':
            return {
                ...state,
                order: state.order.map((item) =>
                    item.id === action.id
                        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                        : item
                ),
            };

        case 'CLEAR_BASKET':
            return { ...state, order: [], coupon: null, isCartOpen: false };

        case 'TOGGLE_WISHLIST': {
            const exists = state.wishlist.includes(action.id);

            return {
                ...state,
                wishlist: exists
                    ? state.wishlist.filter((id) => id !== action.id)
                    : [...state.wishlist, action.id],
                toast: nextToast(
                    state,
                    exists
                        ? `«${action.name}» удалён из избранного`
                        : `«${action.name}» добавлен в избранное`
                ),
            };
        }

        case 'TOGGLE_COMPARE': {
            const exists = state.compare.includes(action.id);

            if (!exists && state.compare.length >= 4) {
                return {
                    ...state,
                    toast: nextToast(
                        state,
                        'В сравнении уже 4 предмета — уберите один'
                    ),
                };
            }

            return {
                ...state,
                compare: exists
                    ? state.compare.filter((id) => id !== action.id)
                    : [...state.compare, action.id],
                toast: nextToast(
                    state,
                    exists
                        ? `«${action.name}» убран из сравнения`
                        : `«${action.name}» добавлен к сравнению`
                ),
            };
        }

        case 'CLEAR_COMPARE':
            return { ...state, compare: [] };

        case 'MARK_VIEWED':
            return {
                ...state,
                recentlyViewed: [
                    action.id,
                    ...state.recentlyViewed.filter((id) => id !== action.id),
                ].slice(0, 8),
            };

        case 'SET_COUPON':
            return {
                ...state,
                coupon: action.coupon,
                toast: nextToast(
                    state,
                    `Промокод ${action.coupon.code} применён: −${action.coupon.percent}%`
                ),
            };

        case 'CLEAR_COUPON':
            return { ...state, coupon: null };

        case 'PLACE_ORDER':
            return {
                ...state,
                orders: [action.order, ...state.orders],
                order: [],
                coupon: null,
                isCartOpen: false,
                toast: nextToast(
                    state,
                    `Заказ ${action.order.id} оформлен — предметы уже летят к вам 🎉`
                ),
            };

        case 'ADD_REVIEW': {
            const current = state.reviews[action.review.productId] ?? [];

            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.review.productId]: [
                        action.review,
                        ...current,
                    ],
                },
            };
        }

        case 'UPDATE_PROFILE':
            return { ...state, profile: action.profile };

        case 'RESET_DATA':
            return {
                ...state,
                order: [],
                coupon: null,
                wishlist: [],
                compare: [],
                recentlyViewed: [],
                orders: [],
                profile: defaultProfile,
                reviews: seedReviews,
                isCartOpen: false,
                isSearchOpen: false,
                isMenuOpen: false,
                toast: nextToast(state, 'Локальные данные очищены'),
            };

        case 'OPEN_CART':
            return { ...state, isCartOpen: true, isMenuOpen: false };

        case 'CLOSE_CART':
            return { ...state, isCartOpen: false };

        case 'TOGGLE_CART':
            return { ...state, isCartOpen: !state.isCartOpen };

        case 'OPEN_SEARCH':
            return {
                ...state,
                isSearchOpen: true,
                isMenuOpen: false,
                isCartOpen: false,
            };

        case 'CLOSE_SEARCH':
            return { ...state, isSearchOpen: false };

        case 'OPEN_MENU':
            return {
                ...state,
                isMenuOpen: true,
                isCartOpen: false,
                isSearchOpen: false,
            };

        case 'CLOSE_MENU':
            return { ...state, isMenuOpen: false };

        case 'SHOW_TOAST':
            return {
                ...state,
                toast: nextToast(state, action.message),
            };

        case 'HIDE_TOAST':
            return { ...state, toast: null };

        default:
            return state;
    }
}
