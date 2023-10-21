import axios from 'axios';
import { toast } from 'react-toastify';

// Configuração global do Axios
const api = axios.create({
    baseURL: 'https://localhost:7085'
})

api.interceptors.response.use(
    (response) => {
        const message = response.data.message
        if (message) {
            toast.success(message)
        }

        return response
    },
    (error) => {
        const message = error.response.data.message ??
            error.response.data?.split('\r')[0] ??
            'Ocorreu algum erro.'

        switch (error.response.status) {
            case 401:
                toast.error('Usuário não autorizado.')
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/login";
                }, 2000)
                break;
            default:
                toast.error(message)
        }

        return Promise.reject(error)
    }
)

export default api
