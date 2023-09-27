import { getItem } from "./StorageService"
import api from "./api"

const httpGet = async (endpoint: string, params?: object) => {
    try {
        const token = getItem('access_token')

        const response = await api.get(endpoint, {
            headers: {
                Authorization: token
            },
            params: {
                ...params
            }
        })

        return response.data
    } catch (error) {
        throw error
    }
}

const httpPost = async (endpoint: string, body: object) => {
    try {
        const token = getItem('access_token')

        const response = await api.post(endpoint, body, {
            headers: {
                Authorization: token
            }
        })

        return response
    } catch (error) {
        throw error
    }
}

const httpPut = async (endpoint: string, body: object) => {
    try {
        const token = getItem('access_token')

        const response = await api.put(endpoint, body, {
            headers: {
                Authorization: token
            }
        })

        return response
    } catch (error) {
        throw error
    }
}

const httpDelete = async (endpoint: string, id: bigint) => {
    try {
        const token = getItem('access_token')

        const response = await api.delete(`${endpoint}/${id}`, {
            headers: {
                Authorization: token
            }
        })

        return response
    } catch (error) {
        throw error
    }
}

export {
    httpDelete, httpGet,
    httpPost,
    httpPut
}

