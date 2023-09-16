import axios from 'axios'

const api = axios.create({
    baseURL: 'https://localhost:7085',
})

export default api
