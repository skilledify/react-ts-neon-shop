import type { AppliedCoupon } from '../types';
import { formatPrice } from './format';

export interface CouponRule {
    code: string;
    percent: number;
    minTotal: number;
    description: string;
}

export const couponRules: CouponRule[] = [
    {
        code: 'NEON10',
        percent: 10,
        minTotal: 0,
        description: '−10% на любой заказ',
    },
    {
        code: 'SHOP20',
        percent: 20,
        minTotal: 2000,
        description: '−20% при заказе от 2 000 ₽',
    },
    {
        code: 'DROP15',
        percent: 15,
        minTotal: 3000,
        description: '−15% при заказе от 3 000 ₽',
    },
];

export function resolveCoupon(
    input: string,
    subtotal: number
): { coupon?: AppliedCoupon; error?: string } {
    const code = input.trim().toUpperCase();

    if (!code) return { error: 'Введите промокод' };

    const rule = couponRules.find((item) => item.code === code);

    if (!rule) {
        return { error: 'Такого промокода не существует' };
    }

    if (subtotal < rule.minTotal) {
        return {
            error: `Промокод доступен от ${formatPrice(rule.minTotal)}`,
        };
    }

    return { coupon: { code: rule.code, percent: rule.percent } };
}

export const discountFor = (
    subtotal: number,
    coupon: AppliedCoupon | null
) => (coupon ? Math.round((subtotal * coupon.percent) / 100) : 0);
