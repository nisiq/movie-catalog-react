// Base da URL: https://api.themoviedb.org/3/
// URL DA API: https://api.themoviedb.org/3/movie/343611?api_key=b12c1ff8fbe4bcb3a2afda3d2623c00d&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;