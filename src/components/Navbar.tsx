import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { FiSun, FiMoon, FiHeart, FiSearch, FiFilm } from 'react-icons/fi';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchSearch } from '../services/tmdb';
import { useDebounce } from '../hooks/useDebounce';

export default function Navbar() {
    const { theme, toggleTheme } = useAppStore();
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    // Gunakan useDebounce agar API tidak dispam saat user mengetik cepat
    const debouncedSearch = useDebounce(search, 300);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { data } = useQuery({
        queryKey: ['searchSuggestion', debouncedSearch],
        queryFn: () => fetchSearch(debouncedSearch, 1),
        enabled: debouncedSearch.trim().length > 0,
    });

    const suggestions = data?.results?.slice(0, 5) || [];

    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (search.trim()) {
            navigate(`/search?q=${search}`);
            setIsFocused(false);
        }
    };

    const handleSelectMovie = (id: number) => {
        navigate(`/movie/${id}`);
        setSearch('');
        setIsFocused(false);
    };

    // Klik di luar dropdown untuk menutup suggestion
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="fixed top-6 w-full z-50 px-4 sm:px-6 lg:px-8 flex justify-center pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-6xl glass-panel rounded-3xl sm:rounded-full px-6 py-3 flex flex-wrap items-center justify-between gap-4 pointer-events-auto transition-all"
            >
                <Link
                    to="/"
                    className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-1"
                >
                    OMNISCIENT
                    <span className="text-primary text-2xl leading-[0]">.</span>
                </Link>

                <div
                    className="flex-1 max-w-md mx-auto hidden sm:block relative"
                    ref={dropdownRef}
                >
                    <form onSubmit={handleSearch}>
                        <div className="relative group">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                placeholder="Search movies"
                                className="w-full bg-slate-200/50 dark:bg-white/5 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium dark:text-white transition-all backdrop-blur-md border border-transparent focus:border-primary/30"
                            />
                        </div>
                    </form>

                    {/* Suggestions Dropdown Card */}
                    <AnimatePresence>
                        {isFocused && search.trim() && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute top-full left-0 right-0 mt-3 bg-white/90 dark:bg-[#141414]/90 border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 backdrop-blur-2xl"
                            >
                                {suggestions.length > 0 ? (
                                    <div className="py-2">
                                        <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Search Suggestions
                                        </p>
                                        {suggestions.map((movie: any) => (
                                            <div
                                                key={movie.id}
                                                onClick={() =>
                                                    handleSelectMovie(movie.id)
                                                }
                                                className="flex items-center gap-4 px-4 py-3 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer transition-colors"
                                            >
                                                {movie.poster_path ? (
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                        alt={movie.title}
                                                        className="w-10 h-14 object-cover rounded-md shadow-sm"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-14 bg-slate-200 dark:bg-white/10 rounded-md flex items-center justify-center">
                                                        <FiFilm className="text-slate-400" />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                                        {movie.title}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                                                        {
                                                            movie.release_date?.split(
                                                                '-',
                                                            )[0]
                                                        }{' '}
                                                        • IMDb{' '}
                                                        {movie.vote_average.toFixed(
                                                            1,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => handleSearch()}
                                            className="w-full text-center py-3 mt-1 text-sm text-primary font-bold hover:bg-primary/10 transition-colors border-t border-slate-100 dark:border-white/5"
                                        >
                                            See all results for "{search}"
                                        </button>
                                    </div>
                                ) : (
                                    <div className="p-6 text-center text-sm font-medium text-slate-500">
                                        No movies found for "{search}"
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 sm:p-2.5 rounded-full bg-slate-200/50 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-white/10 transition-colors backdrop-blur-md"
                    >
                        {theme === 'dark' ? (
                            <FiSun size={18} />
                        ) : (
                            <FiMoon size={18} />
                        )}
                    </button>
                    <Link
                        to="/watchlist"
                        className="p-2 sm:p-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors backdrop-blur-md"
                    >
                        <FiHeart size={18} />
                    </Link>
                </div>
            </motion.nav>
        </div>
    );
}
