import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchMovieDetail } from '../services/tmdb';
import { useAppStore } from '../store/useAppStore';
import {
    FiHeart,
    FiArrowLeft,
    FiPlay,
    FiShare2,
    FiPlus,
    FiFilm,
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isWatchlisted, addToWatchlist, removeFromWatchlist } =
        useAppStore();

    const { data: movie, isLoading } = useQuery({
        queryKey: ['movie', id],
        queryFn: () => fetchMovieDetail(id as string),
        enabled: !!id,
    });

    if (isLoading)
        return (
            <div className="h-screen w-full flex items-center justify-center animate-pulse text-2xl font-black text-primary bg-black">
                Loading Universe...
            </div>
        );
    if (!movie)
        return (
            <div className="p-20 text-center text-xl font-bold">
                Movie not found.
            </div>
        );

    const watchlisted = isWatchlisted(movie.id);
    const trailer = movie.videos?.results?.find(
        (v: any) => v.type === 'Trailer' && v.site === 'YouTube',
    );
    const bgImage = `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen relative text-white overflow-hidden bg-[#0a0a0a] flex items-end sm:items-center"
        >
            {/* Full Screen Fixed Backdrop with Cinematic Gradients */}
            <div className="absolute inset-0 z-0">
                <img
                    src={bgImage}
                    alt={movie.title}
                    className="w-full h-full object-cover opacity-60 sm:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
            </div>

            {/* Back Button - Top Left */}
            <button
                onClick={() => navigate(-1)}
                className="absolute top-8 left-4 sm:left-12 z-20 flex items-center gap-2 text-white/50 hover:text-white transition p-3 rounded-full hover:bg-white/10 backdrop-blur-sm"
            >
                <FiArrowLeft size={28} />
            </button>

            {/* Content Container - Left Aligned */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-12 pt-32 pb-12 h-full flex flex-col justify-end sm:justify-center min-h-screen">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
                    {/* TEXT CONTENT */}
                    <div className="max-w-3xl space-y-10 flex-1 w-full">
                        {/* Title */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-bold tracking-[0.05em] uppercase drop-shadow-2xl font-sans-serif leading-none">
                                {movie.title}
                            </h1>
                        </motion.div>

                        {/* Meta Data (Duration, Year, Rating) */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap items-center gap-6 text-lg font-bold text-white/90"
                        >
                            <span>{movie.runtime} min</span>
                            <span>{movie.release_date?.split('-')[0]}</span>
                            <span className="flex items-center gap-2 bg-yellow-500 text-black px-2 py-0.5 rounded text-sm font-black tracking-widest">
                                IMDb{' '}
                                <span className="bg-transparent">
                                    {movie.vote_average.toFixed(1)}
                                </span>
                            </span>
                        </motion.div>

                        {/* Genres */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3"
                        >
                            <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-bold">
                                Genres
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {movie.genres.map((g: any) => (
                                    <span
                                        key={g.id}
                                        className="bg-white/5 hover:bg-white/10 transition cursor-pointer backdrop-blur-md px-6 py-2 rounded-full text-sm font-medium border border-white/10 shadow-lg"
                                    >
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Synopsis */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-3"
                        >
                            <p className="text-white/40 text-xs tracking-[0.2em] uppercase font-bold">
                                Summary
                            </p>
                            <p className="text-lg text-white/80 leading-relaxed font-medium line-clamp-4 sm:line-clamp-none max-w-2xl drop-shadow-lg">
                                {movie.overview}
                            </p>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center gap-4 pt-6"
                        >
                            {trailer && (
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 border border-white/10 shadow-xl"
                                >
                                    <FiPlay
                                        size={20}
                                        className="fill-current"
                                    />{' '}
                                    Trailer
                                </a>
                            )}
                            <button
                                onClick={() =>
                                    watchlisted
                                        ? removeFromWatchlist(movie.id)
                                        : addToWatchlist(movie)
                                }
                                className={`flex items-center justify-center p-4 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl ${watchlisted ? 'bg-primary/20 text-primary border-primary/50' : 'bg-white/10 hover:bg-white/20'}`}
                                title="Add to Watchlist"
                            >
                                {watchlisted ? (
                                    <FiHeart
                                        size={22}
                                        className="fill-current"
                                    />
                                ) : (
                                    <FiPlus size={22} />
                                )}
                            </button>
                            <button className="flex items-center justify-center p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-xl">
                                <FiShare2 size={22} />
                            </button>
                        </motion.div>
                    </div>

                    {/* FLOATING POSTER CARD */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{
                            delay: 0.4,
                            type: 'spring',
                            stiffness: 100,
                        }}
                        className="hidden lg:block w-[300px] xl:w-[350px] shrink-0 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={`${movie.title} Poster`}
                            className="w-full h-auto rounded-3xl border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
