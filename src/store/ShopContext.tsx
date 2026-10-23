import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    type ReactNode,
} from 'react';
import { loadGoods } from '../lib/api';
import { cartTotal } from '../lib/cart';
import { resolveCoupon } from '../lib/coupons';
import type {
    Good,
    Order,
    Review,
    UserProfile,
} from '../types';
import {
    createInitialState,
    shopReducer,
    STORAGE_KEY,
    type ShopState,
} from './reducer';

interface ShopActions {
    addToBasket: (good: Good, quantity?: number) => void;
    removeFromBasket: (id: string) => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
    clearBasket: () => void;
    toggleWishlist: (good: Good) => void;
    toggleCompare: (good: Good) => void;
    clearCompare: () => void;
    markViewed: (id: string) => void;
    applyCoupon: (input: string) => boolean;
    removeCoupon: () => void;
    placeOrder: (order: Order) => void;
    addReview: (review: Review) => void;
    updateProfile: (profile: UserProfile) => void;
    resetData: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    openSearch: () => void;
    closeSearch: () => void;
    openMenu: () => void;
    closeMenu: () => void;
    notify: (message: string) => void;
    hideToast: () => void;
}

type ShopContextValue = ShopState & ShopActions;

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(
        shopReducer,
        undefined,
        createInitialState
    );

    useEffect(() => {
        let cancelled = false;

        loadGoods().then(({ goods, source }) => {
            if (!cancelled) {
                dispatch({ type: 'SET_GOODS', goods, source });
            }
        });

        return () => {
            cancelled = true;
        };
    }, []);

    const actions = useMemo<ShopActions>(
        () => ({
            addToBasket: (good, quantity = 1) =>
                dispatch({ type: 'ADD_TO_BASKET', good, quantity }),
            removeFromBasket: (id) =>
                dispatch({ type: 'REMOVE_FROM_BASKET', id }),
            incrementQuantity: (id) =>
                dispatch({ type: 'INCREMENT_QUANTITY', id }),
            decrementQuantity: (id) =>
                dispatch({ type: 'DECREMENT_QUANTITY', id }),
            clearBasket: () => dispatch({ type: 'CLEAR_BASKET' }),
            toggleWishlist: (good) =>
                dispatch({ type: 'TOGGLE_WISHLIST', id: good.id, name: good.name }),
            toggleCompare: (good) =>
                dispatch({ type: 'TOGGLE_COMPARE', id: good.id, name: good.name }),
            clearCompare: () => dispatch({ type: 'CLEAR_COMPARE' }),
            markViewed: (id) => dispatch({ type: 'MARK_VIEWED', id }),
            applyCoupon: (input) => {
                const result = resolveCoupon(input, cartTotal(state.order));

                if (!result.coupon) {
                    dispatch({
                        type: 'SHOW_TOAST',
                        message: result.error ?? 'Не удалось применить промокод',
                    });
                    return false;
                }

                dispatch({ type: 'SET_COUPON', coupon: result.coupon });
                return true;
            },
            removeCoupon: () => dispatch({ type: 'CLEAR_COUPON' }),
            placeOrder: (order) => dispatch({ type: 'PLACE_ORDER', order }),
            addReview: (review) => dispatch({ type: 'ADD_REVIEW', review }),
            updateProfile: (profile) =>
                dispatch({ type: 'UPDATE_PROFILE', profile }),
            resetData: () => dispatch({ type: 'RESET_DATA' }),
            openCart: () => dispatch({ type: 'OPEN_CART' }),
            closeCart: () => dispatch({ type: 'CLOSE_CART' }),
            toggleCart: () => dispatch({ type: 'TOGGLE_CART' }),
            openSearch: () => dispatch({ type: 'OPEN_SEARCH' }),
            closeSearch: () => dispatch({ type: 'CLOSE_SEARCH' }),
            openMenu: () => dispatch({ type: 'OPEN_MENU' }),
            closeMenu: () => dispatch({ type: 'CLOSE_MENU' }),
            notify: (message) => dispatch({ type: 'SHOW_TOAST', message }),
            hideToast: () => dispatch({ type: 'HIDE_TOAST' }),
        }),
        [state.order]
    );

    const value = useMemo<ShopContextValue>(
        () => ({ ...state, ...actions }),
        [state, actions]
    );

    useEffect(() => {
        const persisted = {
            order: state.order,
            wishlist: state.wishlist,
            compare: state.compare,
            recentlyViewed: state.recentlyViewed,
            orders: state.orders,
            profile: state.profile,
            reviews: state.reviews,
        };

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
        } catch {
            // Хранилище может быть недоступно (приватный режим, лимит квоты).
        }
    }, [
        state.order,
        state.wishlist,
        state.compare,
        state.recentlyViewed,
        state.orders,
        state.profile,
        state.reviews,
    ]);

    return (
        <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
    );
}

export function useShop() {
    const context = useContext(ShopContext);

    if (!context) {
        throw new Error('useShop должен использоваться внутри ShopProvider');
    }

    return context;
}
