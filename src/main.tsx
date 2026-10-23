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

createRoot(root).render(
    <StrictMode>
        <BrowserRouter>
            <ShopProvider>
                <App />
            </ShopProvider>
        </BrowserRouter>
    </StrictMode>
);
