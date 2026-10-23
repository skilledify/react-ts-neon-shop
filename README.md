# react-ts-neon-shop

Современная витрина цифровых предметов: неоновая коллекция, корзина с сохранением состояния, поиск, фильтры и анимации.

Проект изначально был CRA-приложением на React 17 + Materialize. Теперь это Vite-приложение на TypeScript с React Router 7 в декларативном режиме и Tailwind CSS 4.

## Стек

- **npm** — пакетный менеджер
- **Vite** — сборка и dev-сервер
- **React 19 + TypeScript**
- **React Router 7** — декларативный подход (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`)
- **Tailwind CSS 4** — через `@tailwindcss/vite`, тема и анимации описаны в `src/index.css`
- **Context + useReducer** — состояние магазина, корзина сохраняется в `localStorage`

## Запуск

```bash
npm install
npm run dev
```

Сборка и предпросмотр:

```bash
npm run build
npm run preview
```

Проверка типов:

```bash
npm run typecheck
```

## Деплой на GitHub Pages

Проект собирается и публикуется автоматически через GitHub Actions
(`.github/workflows/deploy.yml`) при пуше в `main` или вручную из вкладки
Actions.

- Прод-адрес: **https://skilledify.github.io/react-ts-neon-shop/**
- В прод-сборке Vite использует `base: '/react-ts-neon-shop/'`, а роутер —
  соответствующий `basename`.
- GitHub Pages не поддерживает SPA-fallback, поэтому workflow копирует
  `dist/index.html` в `dist/404.html`: глубокие ссылки (`/blog/:slug`,
  `/product/:id`) открываются корректно.

Первичная настройка репозитория (один раз):

1. В **Settings → Pages → Build and deployment** выберите источник
   **GitHub Actions**.
2. Запушьте в `main` — деплой запустится сам.

## Маршруты

| Путь | Страница |
| --- | --- |
| `/` | Витрина: hero, тикер, каталог, поиск, фильтры |
| `/collections` | Категории каталога |
| `/collections/:slug` | Предметы выбранной категории |
| `/sale` | Распродажа с таймером до следующего дропа |
| `/blog` | Журнал: список статей |
| `/blog/:slug` | Полная статья с подборкой предметов |
| `/product/:id` | Карточка товара, отзывы и похожие предметы |
| `/cart` | Полная корзина со сводкой заказа |
| `/wishlist` | Избранное |
| `/compare` | Сравнение предметов |
| `/profile` | Локальный профиль игрока |
| `/orders` | История заказов |
| `/support` | Поддержка и форма обращения |
| `/faq` | Частые вопросы |
| `/about` | О проекте |
| `*` | Страница 404 |

## Каталог и API

Без ключа приложение работает на локальной демо-коллекции из `src/data/demoGoods.ts` — так витрина выглядит одинаково хорошо в любом окружении.

Чтобы загружать предметы из [Fortnite API](https://fortniteapi.io), создайте `.env` по образцу `.env.example`:

```env
VITE_API_KEY=ваш_ключ
VITE_API_URL=https://fortniteapi.io/v1/shop?lang=ru
```

Если API вернёт ошибку или пустой ответ, приложение автоматически откатится на демо-коллекцию.

## Дизайн и анимации

- Глубокий «ночной» фон с аврора-градиентами: фиолетовый, фуксия, циан и янтарь.
- Стеклянные поверхности, неоновые свечения, градиентный текст.
- Кастомные keyframes в Tailwind 4: `fade-up`, `float`, `aurora`, `marquee`, `shimmer`, `slide-in`, `toast-progress` и другие.
- Плавные hover-состояния карточек, skeleton-загрузка, анимированная корзина-drawer, toast-уведомления.
- Учтён `prefers-reduced-motion` — анимации отключаются для пользователей с такой настройкой.

## Структура

```
src/
  components/   # UI: шапка, подвал, карточки, корзина, toast, иконки
  data/         # демо-коллекция
  lib/          # API, форматирование цен, расчёты корзины
  pages/        # Shop, Collections, Sale, Blog, Product, Cart, Wishlist, Compare, Profile, Orders, Support, Faq, About, NotFound
  store/        # reducer и ShopProvider
  App.tsx       # декларативные маршруты
  main.tsx      # BrowserRouter + провайдер
  index.css     # Tailwind 4, тема, keyframes, утилиты
```
