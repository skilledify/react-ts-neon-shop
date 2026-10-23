import type { CartItem } from '../types';

export const cartCount = (order: CartItem[]) =>
    order.reduce((sum, item) => sum + item.quantity, 0);

export const cartTotal = (order: CartItem[]) =>
    order.reduce((sum, item) => sum + item.price * item.quantity, 0);
