import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// На GitHub Pages проект живёт по адресу /<repo>/, локально — в корне.
const repository = '/react-ts-neon-shop/';

export default defineConfig(({ command }) => ({
    base: command === 'build' ? repository : '/',
    plugins: [react(), tailwindcss()],
}));
