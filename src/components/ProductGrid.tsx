import { ProductCard } from './ProductCard';
import type { Good } from '../types';

interface ProductGridProps {
    goods: Good[];
    className?: string;
}

export function ProductGrid({ goods, className = '' }: ProductGridProps) {
    return (
        <div
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${className}`}
        >
            {goods.map((good, index) => (
                <ProductCard key={good.id} good={good} index={index} />
            ))}
        </div>
    );
}
