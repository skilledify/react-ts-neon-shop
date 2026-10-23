import { useEffect, useState } from 'react';
import { ArrowUpIcon } from './icons';

export function ScrollTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 700);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Наверх"
            className={`fixed bottom-5 right-4 z-40 grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-night-800/90 text-zinc-300 shadow-xl backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:text-white sm:bottom-8 sm:right-6 ${
                visible
                    ? 'translate-y-0 opacity-100'
                    : 'pointer-events-none translate-y-4 opacity-0'
            }`}
        >
            <ArrowUpIcon className="h-4 w-4" />
        </button>
    );
}
