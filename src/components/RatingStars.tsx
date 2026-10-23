import { StarIcon } from './icons';

interface RatingStarsProps {
    value: number;
    className?: string;
    starClassName?: string;
    showValue?: boolean;
}

export function RatingStars({
    value,
    className = '',
    starClassName = 'h-4 w-4',
    showValue = false,
}: RatingStarsProps) {
    const rounded = Math.round(value);

    return (
        <span className={`inline-flex items-center gap-1.5 ${className}`}>
            <span
                className="flex items-center gap-0.5 text-amber-300"
                aria-label={`Рейтинг ${value.toFixed(1)} из 5`}
            >
                {Array.from({ length: 5 }, (_, index) => (
                    <StarIcon
                        key={index}
                        filled={index < rounded}
                        className={starClassName}
                    />
                ))}
            </span>
            {showValue && (
                <span className="text-xs font-bold text-zinc-300">
                    {value.toFixed(1)}
                </span>
            )}
        </span>
    );
}
