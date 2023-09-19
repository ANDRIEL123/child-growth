import axios from 'axios';
import { toast } from 'react-toastify';

// Configuração global do Axios
const api = axios.create({
    baseURL: 'https://localhost:7085'
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response.data.message ?? 'Ocorreu algum erro.'
        toast.error(message)

        return Promise.reject(error);
    }
);

export default api
