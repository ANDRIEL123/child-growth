import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';

// Configuração global do Axios
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
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
        let message

        if (error as AxiosError) {
            message = error.message
        }
        else {
            message = error.response?.data?.message ??
                error.response.data?.split('\r')[0] ??
                'Ocorreu algum erro.'
        }

        switch (error?.response?.status) {
            case 401:
                toast.error('Usuário não autorizado.')
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/login";
                }, 2000)
                break;
            case 403:
                toast.error('O usuário não possuí acesso a esse recurso.')
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
