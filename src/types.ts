export interface Good {
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    image?: string;
    category?: string;
    emoji?: string;
    accent?: [string, string];
    rating?: number;
    tag?: string;
    stock?: number;
}

export interface CartItem extends Good {
    quantity: number;
}

export type CatalogSource = 'api' | 'demo';

export interface Review {
    id: string;
    productId: string;
    author: string;
    rating: number;
    text: string;
    createdAt: string;
}

export interface UserProfile {
    name: string;
    email: string;
    phone: string;
    avatar: string;
}

export interface AppliedCoupon {
    code: string;
    percent: number;
}

export type DeliveryMethod = 'account' | 'email' | 'gift';
export type PaymentMethod = 'card' | 'sbp' | 'crypto';
export type OrderStatus = 'processing' | 'completed';

export interface OrderCustomer {
    name: string;
    email: string;
    phone: string;
    delivery: DeliveryMethod;
    payment: PaymentMethod;
    comment: string;
}

export interface Order {
    id: string;
    createdAt: string;
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
    couponCode?: string;
    status: OrderStatus;
    customer: OrderCustomer;
}
