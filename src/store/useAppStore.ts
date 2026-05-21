import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
}

interface AppState {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    watchlist: Movie[];
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (id: number) => void;
    isWatchlisted: (id: number) => boolean;
}

export const useAppStore = create<AppState>()(
    persist(
        (set, get) => ({
            theme: 'dark',
            toggleTheme: () =>
                set((state) => ({
                    theme: state.theme === 'light' ? 'dark' : 'light',
                })),
            watchlist: [],
            addToWatchlist: (movie) =>
                set((state) => {
                    if (state.watchlist.find((m) => m.id === movie.id))
                        return state;
                    return { watchlist: [...state.watchlist, movie] };
                }),
            removeFromWatchlist: (id) =>
                set((state) => ({
                    watchlist: state.watchlist.filter((m) => m.id !== id),
                })),
            isWatchlisted: (id) => {
                return get().watchlist.some((m) => m.id === id);
            },
        }),
        { name: 'cinescope-storage' },
    ),
);
