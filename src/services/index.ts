import { getItem } from "./StorageService"
import api from "./api"

const httpGet = async (endpoint: string, params?: object) => {
    try {
        const token = getItem('access_token')

        const response = await api.get(endpoint, {
            headers: {
                Authorization: token
            },
            params
        })

        return response.data
    } catch (error) {
        throw error
    }
}

const httpPost = async (endpoint: string, body: object) => {
    try {
        const response = await api.post(endpoint, body)

        return response
    } catch (error) {
        throw error
    }
}

export {
    httpGet,
    httpPost
}

