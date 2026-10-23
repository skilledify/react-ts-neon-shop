import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App';
import { ShopProvider } from './store/ShopContext';
import './index.css';

const root = document.getElementById('root');

if (!root) {
    throw new Error('Не найден корневой элемент #root');
}

// Vite отдаёт BASE_URL с завершающим слешем, роутеру он не нужен.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

createRoot(root).render(
    <StrictMode>
        <BrowserRouter basename={basename}>
            <ShopProvider>
                <App />
            </ShopProvider>
        </BrowserRouter>
    </StrictMode>
);
