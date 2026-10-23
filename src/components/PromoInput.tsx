import { useState } from 'react';
import { useShop } from '../store/ShopContext';
import { CheckIcon, TagIcon } from './icons';

export function PromoInput({ className = '' }: { className?: string }) {
    const { coupon, applyCoupon, removeCoupon } = useShop();
    const [code, setCode] = useState('');

    if (coupon) {
        return (
            <div
                className={`flex items-center justify-between gap-3 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3.5 py-2.5 ${className}`}
            >
                <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <CheckIcon className="h-3.5 w-3.5" />
                    {coupon.code} · −{coupon.percent}%
                </span>
                <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-[11px] font-semibold text-zinc-400 transition hover:text-white"
                >
                    Убрать
                </button>
            </div>
        );
    }

    return (
        <div className={className}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    if (applyCoupon(code)) setCode('');
                }}
                className="flex gap-2"
            >
                <div className="relative flex-1">
                    <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
                    <input
                        value={code}
                        onChange={(event) =>
                            setCode(event.target.value.toUpperCase())
                        }
                        placeholder="Промокод"
                        aria-label="Промокод"
                        className="h-10 w-full rounded-xl border border-white/10 bg-white/[0.04] pl-9 pr-3 text-xs font-semibold uppercase tracking-wider text-white outline-none transition placeholder:normal-case placeholder:tracking-normal placeholder:text-zinc-500 focus:border-fuchsia-400/50"
                    />
                </div>
                <button
                    type="submit"
                    className="h-10 shrink-0 rounded-xl border border-white/15 bg-white/[0.06] px-4 text-xs font-bold text-white transition hover:border-fuchsia-400/40 hover:bg-white/[0.1]"
                >
                    Применить
                </button>
            </form>
            <p className="mt-2 text-[10px] text-zinc-500">
                Попробуйте{' '}
                <span className="font-bold text-zinc-300">NEON10</span>,{' '}
                <span className="font-bold text-zinc-300">SHOP20</span> или{' '}
                <span className="font-bold text-zinc-300">DROP15</span>
            </p>
        </div>
    );
}
