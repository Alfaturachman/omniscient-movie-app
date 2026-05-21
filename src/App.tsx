import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAppStore } from './store/useAppStore';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function App() {
    const { theme } = useAppStore();

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ScrollToTop />
                <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 font-sans selection:bg-primary selection:text-white flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/movie/:id"
                                element={<MovieDetail />}
                            />
                            <Route path="/search" element={<Search />} />
                            <Route path="/watchlist" element={<Watchlist />} />
                            <Route
                                path="*"
                                element={
                                    <h2 className="p-10 text-center text-2xl font-bold">
                                        404 - Halaman Tidak Ditemukan
                                    </h2>
                                }
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
