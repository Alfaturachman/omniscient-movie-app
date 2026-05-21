import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchSearch } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { useDebounce } from '../hooks/useDebounce';
import { motion } from 'framer-motion';

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const debouncedQuery = useDebounce(query, 500);

    const { data, isLoading } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: () => fetchSearch(debouncedQuery, 1),
        enabled: !!debouncedQuery,
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                    Search Results.
                </h2>
                <p className="text-xl text-slate-500 dark:text-gray-400 font-semibold flex items-center gap-2">
                    Finding matches for:{' '}
                    <span className="text-primary bg-primary/10 px-3 py-1 rounded-lg">
                        "{query}"
                    </span>
                </p>
            </motion.div>

            {!debouncedQuery && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 glass-panel rounded-[3rem] shadow-xl"
                >
                    <p className="text-3xl font-black text-slate-800 dark:text-white mb-4">
                        Type something to search.
                    </p>
                </motion.div>
            )}

            {isLoading && debouncedQuery && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <div
                            key={n}
                            className="aspect-[2/3] bg-slate-200 dark:bg-gray-800 animate-pulse rounded-3xl"
                        />
                    ))}
                </div>
            )}

            {data?.results && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {data.results.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="col-span-full text-center py-32 glass-panel rounded-[3rem] shadow-xl"
                        >
                            <p className="text-3xl font-black text-slate-800 dark:text-white mb-4">
                                No movies found.
                            </p>
                        </motion.div>
                    ) : (
                        data.results.map((movie: any, idx: number) => (
                            <motion.div
                                key={movie.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: idx * 0.05,
                                    type: 'spring',
                                }}
                            >
                                <MovieCard movie={movie} />
                            </motion.div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
