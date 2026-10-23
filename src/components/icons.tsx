import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const strokeProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
};

export function ArrowRightIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

export function ArrowLeftIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
    );
}

export function ArrowDownIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
    );
}

export function CartIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M4 5h2l2.2 10.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.6L21 8H6.2" />
            <circle cx="10" cy="20" r="1.2" fill="currentColor" stroke="none" />
            <circle cx="18" cy="20" r="1.2" fill="currentColor" stroke="none" />
        </svg>
    );
}

export function SparklesIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M12 3.5 13.8 9l5.5 1.8-5.5 1.8L12 18.2l-1.8-5.6L4.7 10.8 10.2 9 12 3.5Z" />
            <path d="M19 3v3M17.5 4.5h3M5 17v3M3.5 18.5h3" />
        </svg>
    );
}

export function SearchIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 4.5 4.5" />
        </svg>
    );
}

export function PlusIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}

export function MinusIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M5 12h14" />
        </svg>
    );
}

export function TrashIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6.5 7l.8 12a2 2 0 0 0 2 1.9h5.4a2 2 0 0 0 2-1.9l.8-12M10 11v5M14 11v5" />
        </svg>
    );
}

export function CloseIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="m6 6 12 12M18 6 6 18" />
        </svg>
    );
}

export function CheckIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="m5 12.5 4.5 4.5L19 7" />
        </svg>
    );
}

export function StarIcon({
    filled = true,
    ...props
}: IconProps & { filled?: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinejoin="round"
            {...props}
        >
            <path d="m12 3.6 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.6Z" />
        </svg>
    );
}

export function ShieldIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M12 3 5 6v5.5c0 4.3 2.9 7.9 7 9.5 4.1-1.6 7-5.2 7-9.5V6l-7-3Z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}

export function BoltIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M13 3 5 14h6l-1 7 9-12h-6l0-6Z" />
        </svg>
    );
}

export function CardIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
            <path d="M3 10h18M7 15h3" />
        </svg>
    );
}

export function ChevronDownIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="m6 9 6 6 6-6" />
        </svg>
    );
}

export function GithubIcon(props: IconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="currentColor"
            {...props}
        >
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
    );
}

export function BagIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M5 8h14l-1 12H6L5 8Z" />
            <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
    );
}

export function CompassIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
    );
}

export function HeartIcon({
    filled = false,
    ...props
}: IconProps & { filled?: boolean }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinejoin="round"
            {...props}
        >
            <path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z" />
        </svg>
    );
}

export function CompareIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M5 20V10M12 20V4M19 20v-7" />
            <path d="M3 20h18" />
        </svg>
    );
}

export function MenuIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
    );
}

export function UserIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.8-3.4 3.5-5.5 7-5.5s6.2 2.1 7 5.5" />
        </svg>
    );
}

export function PackageIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
            <path d="m4.5 7.8 7.5 4.2 7.5-4.2M12 12v9" />
        </svg>
    );
}

export function ClockIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" />
        </svg>
    );
}

export function MailIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
            <path d="m4 7 8 6 8-6" />
        </svg>
    );
}

export function PhoneIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M7.5 3.5 9 8l-2 1.5c.9 2.7 2.8 4.6 5.5 5.5L14 13l4.5 1.5V19c0 .8-.7 1.5-1.5 1.5C9.4 20.5 3.5 14.6 3.5 6.5 3.5 5.7 4.2 5 5 5h2.5Z" />
        </svg>
    );
}

export function MapPinIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M12 21s6-5.3 6-10a6 6 0 1 0-12 0c0 4.7 6 10 6 10Z" />
            <circle cx="12" cy="11" r="2.2" />
        </svg>
    );
}

export function PercentIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="m6 18 12-12" />
            <circle cx="7.5" cy="7.5" r="2" />
            <circle cx="16.5" cy="16.5" r="2" />
        </svg>
    );
}

export function TagIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M4 4h7l9 9-7 7-9-9V4Z" />
            <circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none" />
        </svg>
    );
}

export function MessageIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M20 12a7.5 7.5 0 0 1-10.9 6.7L4 20l1.3-4.5A7.5 7.5 0 1 1 20 12Z" />
        </svg>
    );
}

export function SendIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="m21 3-7 18-3.5-7L3 10.5 21 3Z" />
            <path d="m10.5 14 5-5" />
        </svg>
    );
}

export function PrintIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M7 8V3h10v5M7 17H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="7" y="14" width="10" height="7" rx="1" />
        </svg>
    );
}

export function CalendarIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
            <path d="M8 3v4M16 3v4M3.5 10h17" />
        </svg>
    );
}

export function ArrowUpIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
    );
}

export function CheckCircleIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="m8 12.5 2.5 2.5L16 9" />
        </svg>
    );
}

export function ChevronRightIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="m9 6 6 6-6 6" />
        </svg>
    );
}

export function ShareIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <circle cx="18" cy="18" r="2.5" />
            <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
        </svg>
    );
}

export function GridIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
        </svg>
    );
}

export function GiftIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M4 9h16v11H4V9ZM3 9h18M12 9v11" />
            <path d="M12 9C10.5 5.5 7 5 7 7.2 7 8.4 8 9 9.5 9H12ZM12 9c1.5-3.5 5-4 5-1.8 0 1.2-1 1.8-2.5 1.8H12Z" />
        </svg>
    );
}

export function InfoIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5.5M12 7.8v.2" />
        </svg>
    );
}

export function LockIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <rect x="5" y="10" width="14" height="10" rx="2.5" />
            <path d="M8 10V7.5a4 4 0 0 1 8 0V10M12 14v2.5" />
        </svg>
    );
}

export function TruckIcon(props: IconProps) {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
            <path d="M3 6h10v10H3V6ZM13 10h4l4 4v2h-8v-6Z" />
            <circle cx="7" cy="18" r="1.6" />
            <circle cx="17" cy="18" r="1.6" />
        </svg>
    );
}
