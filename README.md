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

## Маршруты

| Путь | Страница |
| --- | --- |
| `/` | Витрина: hero, тикер, каталог, поиск, фильтры |
| `/product/:id` | Карточка товара и похожие предметы |
| `/cart` | Полная корзина со сводкой заказа |
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
  pages/        # Shop, Product, Cart, NotFound
  store/        # reducer и ShopProvider
  App.tsx       # декларативные маршруты
  main.tsx      # BrowserRouter + провайдер
  index.css     # Tailwind 4, тема, keyframes, утилиты
```
