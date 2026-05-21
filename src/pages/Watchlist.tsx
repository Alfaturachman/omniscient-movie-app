import { useAppStore } from '../store/useAppStore';
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';

export default function Watchlist() {
    const { watchlist } = useAppStore();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                    Your <span className="text-primary">Watchlist.</span>
                </h2>
                <p className="text-xl text-slate-500 dark:text-gray-400 font-semibold">
                    Movies you want to watch later.
                </p>
            </motion.div>

            {watchlist.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-32 glass-panel rounded-[3rem] shadow-xl"
                >
                    <p className="text-3xl font-black text-slate-800 dark:text-white mb-4">
                        It's pretty empty here.
                    </p>
                    <p className="text-lg text-slate-500 dark:text-gray-400 font-medium">
                        Go explore some movies and add them to your watchlist!
                    </p>
                </motion.div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {watchlist.map((movie, idx) => (
                        <motion.div
                            key={movie.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05, type: 'spring' }}
                        >
                            <MovieCard movie={movie} />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
