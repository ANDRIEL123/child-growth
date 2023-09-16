import { setItem } from './StorageService'
import api from "./api"

const setAuthenticationToken = async (
    email: string,
    password: string
) => {
    const response = await api.get('/users/login', {
        params: {
            email,
            password
        }
    })

    setItem('access_token', response.data.accessToken)
    setItem('expires_in', response.data.expiresIn)
}

export {
    setAuthenticationToken
}

