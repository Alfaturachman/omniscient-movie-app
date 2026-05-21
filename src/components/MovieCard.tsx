import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { useAppStore } from '../store/useAppStore';

interface MovieProps {
    movie: any;
    featured?: boolean;
}

export default function MovieCard({ movie, featured = false }: MovieProps) {
    const { isWatchlisted, addToWatchlist, removeFromWatchlist } =
        useAppStore();
    const watchlisted = isWatchlisted(movie.id);

    const toggleWatchlist = (e: React.MouseEvent) => {
        e.preventDefault();
        watchlisted ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
    };

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`relative group rounded-3xl overflow-hidden bg-slate-200 dark:bg-gray-800 shadow-2xl cursor-pointer w-full h-full ${featured ? 'aspect-video' : 'aspect-[2/3]'}`}
        >
            <Link to={`/movie/${movie.id}`} className="block w-full h-full">
                <img
                    src={
                        movie.poster_path || movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/w780${featured ? movie.backdrop_path : movie.poster_path}`
                            : 'https://via.placeholder.com/500x750?text=No+Image'
                    }
                    alt={movie.title || movie.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
                    <motion.h3
                        className={`text-white font-black leading-tight mb-2 ${featured ? 'text-3xl md:text-5xl' : 'text-lg md:text-xl line-clamp-2'}`}
                    >
                        {movie.title || movie.name}
                    </motion.h3>
                    <div className="flex items-center gap-3 text-white/80 text-sm font-bold">
                        <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                            <span className="text-yellow-400">★</span>{' '}
                            {movie.vote_average?.toFixed(1)}
                        </span>
                        <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                            {
                                (
                                    movie.release_date || movie.first_air_date
                                )?.split('-')[0]
                            }
                        </span>
                    </div>
                </div>
            </Link>

            <button
                onClick={toggleWatchlist}
                className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-primary transition shadow-2xl"
            >
                <FiHeart
                    className={`${watchlisted ? 'fill-primary text-primary' : ''} transition-colors`}
                    size={20}
                />
            </button>
        </motion.div>
    );
}
