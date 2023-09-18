import api from "./api"

type Authentication = {
    accessToken: string,
    expiresIn: string
}

/**
 * Retorna os dados de autenticação
 */
const getAuthentication = async (
    email: string,
    password: string
): Promise<Authentication> => {
    const response = await api.get('/users/login', {
        params: {
            email,
            password
        }
    })

    return {
        accessToken: response.data.accessToken,
        expiresIn: response.data.expiresIn,
    }
}

export {
    getAuthentication
}

