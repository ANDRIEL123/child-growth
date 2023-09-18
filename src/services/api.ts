import axios from 'axios';

// Configuração global do Axios
const api = axios.create({
    baseURL: 'https://localhost:7085',
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Verifica se o erro é um status 401 (Não Autorizado)
        if (error.response.status === 401) {
            // trata não autorizado
        }
        return Promise.reject(error);
    }
);

export default api
