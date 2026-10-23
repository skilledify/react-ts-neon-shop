import { useEffect } from 'react';
import { useShop } from '../store/ShopContext';
import { CheckIcon, CloseIcon } from './icons';

export function Toast() {
    const { toast, hideToast } = useShop();

    useEffect(() => {
        if (!toast) return;

        const timer = window.setTimeout(hideToast, 3200);
        return () => window.clearTimeout(timer);
    }, [toast, hideToast]);

    if (!toast) return null;

    return (
        <div
            key={toast.id}
            className="pointer-events-none fixed inset-x-4 bottom-5 z-[70] flex animate-toast-in justify-center sm:bottom-8"
            role="status"
            aria-live="polite"
        >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-night-800/95 shadow-[0_25px_70px_-20px_rgba(232,121,249,0.55)] backdrop-blur-xl">
                <div className="flex items-center gap-3 px-4 py-3.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-400 via-fuchsia-400 to-amber-300 text-night-950">
                        <CheckIcon className="h-4 w-4" />
                    </span>
                    <p className="flex-1 text-sm font-semibold text-zinc-100">
                        {toast.message}
                    </p>
                    <button
                        type="button"
                        onClick={hideToast}
                        aria-label="Закрыть уведомление"
                        className="grid h-7 w-7 place-items-center rounded-lg text-zinc-400 transition hover:bg-white/10 hover:text-white"
                    >
                        <CloseIcon className="h-4 w-4" />
                    </button>
                </div>
                <div className="h-0.5 origin-left animate-toast-progress bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-300" />
            </div>
        </div>
    );
}
