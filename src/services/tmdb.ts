import axios from 'axios';

// Disarankan menambahkan VITE_TMDB_API_KEY di file .env
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

export const fetchTrending = async (page = 1) => {
    const { data } = await tmdbApi.get(`/trending/movie/day?page=${page}`);
    return data;
};

export const fetchPopular = async (page = 1) => {
    const { data } = await tmdbApi.get(`/movie/popular?page=${page}`);
    return data;
};

export const fetchSearch = async (query: string, page = 1) => {
    const { data } = await tmdbApi.get(
        `/search/movie?query=${query}&page=${page}`,
    );
    return data;
};

export const fetchMovieDetail = async (id: string) => {
    const { data } = await tmdbApi.get(
        `/movie/${id}?append_to_response=credits,videos,similar`,
    );
    return data;
};
