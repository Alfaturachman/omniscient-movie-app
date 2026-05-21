# OMNISCIENT - Premium Movie Discovery App

OMNISCIENT is a production-ready movie search and discovery web application built with a modern React.js ecosystem. This project serves as a Frontend Developer portfolio, demonstrating mastery in State Management, Data Fetching, Routing, and Premium UI Design.

## Key Features

- **Bento Grid & Glassmorphism UI**: A visually stunning modern interface inspired by Apple, Linear, and Netflix design standards.
- **Framer Motion Animations**: Seamless page transitions and micro-interactions powered by spring physics.
- **Smart Data Fetching**: Aggressive caching and automated loading/error state management using **TanStack Query**.
- **Global State Management**: Watchlist and Dark/Light Mode state handling via **Zustand** (with automatic `localStorage` persistence).
- **Debounced Search**: An intelligent real-time search feature that prevents server overload (API spam).
- **Tailwind CSS v4**: Utilizing the latest version of Tailwind with a direct `@theme` CSS architecture.

## Tech Stack

- **Core**: React 18, TypeScript, Vite
- **Routing**: React Router DOM v6
- **Data Fetching**: TanStack Query (React Query) v5, Axios
- **State Management**: Zustand
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Icons**: React Icons (Feather)
- **API**: The Movie Database (TMDB) API

## Local Installation & Setup

1. **Clone & Install Dependencies**

    ```bash
    npm install
    ```

2. **Environment Variables Setup (.env)**
   This application requires a TMDB API Key to fetch movie data.
    - Create a file named `.env` in the root directory (alongside `package.json`).
    - Add your key using the following format:
        ```env
        VITE_TMDB_API_KEY=your_v3_api_key_here
        ```
        _(You can get a free API Key by registering at [TheMovieDB.org](https://www.themoviedb.org/))_

3. **Start Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your favorite browser.

## Project Structure (Clean Architecture)

```bash
src/
 ├── components/     # Reusable UI components (MovieCard, Navbar)
 ├── hooks/          # Custom hooks (useDebounce)
 ├── pages/          # Main application pages (Home, Search, MovieDetail, Watchlist)
 ├── services/       # External API integrations (tmdb.ts via Axios)
 ├── store/          # Global State Management (useAppStore.ts)
 ├── App.tsx         # Provider configuration (QueryClient) & Routing System
 ├── index.css       # Global stylesheet (Tailwind v4 theme & Glassmorphism)
 └── main.tsx        # Application entry point
```

---

_Designed and developed as part of the React Advanced Learning Roadmap (2026)._
