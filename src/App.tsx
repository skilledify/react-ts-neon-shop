import { Route, Routes } from 'react-router';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ArticlePage } from './pages/ArticlePage';
import { BlogPage } from './pages/BlogPage';
import { CartPage } from './pages/CartPage';
import { CollectionPage } from './pages/CollectionPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ComparePage } from './pages/ComparePage';
import { FaqPage } from './pages/FaqPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProductPage } from './pages/ProductPage';
import { ProfilePage } from './pages/ProfilePage';
import { SalePage } from './pages/SalePage';
import { ShopPage } from './pages/ShopPage';
import { SupportPage } from './pages/SupportPage';
import { WishlistPage } from './pages/WishlistPage';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<ShopPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="collections" element={<CollectionsPage />} />
                <Route path="collections/:slug" element={<CollectionPage />} />
                <Route path="sale" element={<SalePage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<ArticlePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="compare" element={<ComparePage />} />
                <Route path="support" element={<SupportPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
