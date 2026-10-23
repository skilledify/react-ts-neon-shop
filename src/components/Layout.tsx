import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useShop } from '../store/ShopContext';
import { CartDrawer } from './CartDrawer';
import { Footer } from './Footer';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';
import { ScrollToTop } from './ScrollToTop';
import { ScrollTopButton } from './ScrollTopButton';
import { SearchPalette } from './SearchPalette';
import { Toast } from './Toast';

export function Layout() {
    const { pathname } = useLocation();
    const { openSearch, closeSearch, closeMenu } = useShop();

    useEffect(() => {
        closeSearch();
        closeMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (
                (event.metaKey || event.ctrlKey) &&
                event.key.toLowerCase() === 'k'
            ) {
                event.preventDefault();
                openSearch();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [openSearch]);

    return (
        <div className="flex min-h-screen flex-col">
            <a
                href="#main"
                className="sr-only z-[80] rounded-xl bg-white px-4 py-2 font-semibold text-night-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
            >
                Перейти к содержимому
            </a>

            <ScrollToTop />
            <Header />

            <main id="main" className="flex-1">
                <Outlet />
            </main>

            <Footer />
            <CartDrawer />
            <SearchPalette />
            <MobileMenu />
            <Toast />
            <ScrollTopButton />
        </div>
    );
}
