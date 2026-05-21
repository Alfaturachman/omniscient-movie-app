import { useQuery } from '@tanstack/react-query';
import { fetchTrending, fetchPopular } from '../services/tmdb';
import MovieCard from '../components/MovieCard';
import { motion } from 'framer-motion';

export default function Home() {
    const { data: trending, isLoading: trendingLoading } = useQuery({
        queryKey: ['trending'],
        queryFn: () => fetchTrending(1),
    });

    const { data: popular, isLoading: popularLoading } = useQuery({
        queryKey: ['popular'],
        queryFn: () => fetchPopular(1),
    });

    const trendingMovies = trending?.results?.slice(0, 5) || [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 pb-32">
            {/* BENTO GRID HERO SECTION */}
            <section className="min-h-[100svh] flex flex-col justify-center pt-24 pb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 text-center sm:text-left"
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4">
                        Discover.
                        <br />
                        <span className="text-primary">Watch.</span> Repeat.
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-gray-400 max-w-2xl font-semibold">
                        Trending right now. Curated for your cinematic pleasure.
                    </p>
                </motion.div>

                {trendingLoading ? (
                    <div className="h-[600px] w-full rounded-3xl bg-slate-200 dark:bg-gray-800 animate-pulse" />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[600px]">
                        {/* Featured Large Card */}
                        {trendingMovies[0] && (
                            <div className="md:col-span-2 md:row-span-2 h-full">
                                <MovieCard movie={trendingMovies[0]} featured />
                            </div>
                        )}
                        {/* Smaller Cards */}
                        {trendingMovies.slice(1, 5).map((movie: any) => (
                            <div key={movie.id} className="h-full">
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* POPULAR GRID */}
            <section>
                <div className="flex items-end justify-between mb-10">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                        Top Picks
                    </h2>
                </div>

                {popularLoading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <div
                                key={n}
                                className="aspect-[2/3] bg-slate-200 dark:bg-gray-800 animate-pulse rounded-3xl"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {popular?.results
                            ?.slice(0, 10)
                            .map((movie: any, idx: number) => (
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
                            ))}
                    </div>
                )}
            </section>
        </div>
    );
}
