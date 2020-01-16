import axios from 'axios'
import store from './'

axios.defaults.baseURL = process.env.NODE_ENV === 'development'
                                ? 'http://localhost:3000'
                                : 'https://brawlr-backend.herokuapp.com'

axios.defaults.baseURL = 'https://brawlr-backend.herokuapp.com'

axios.interceptors.request.use(request => {
    const token = store.getters['authentication/getField']('token')

    if (token) {
        request.headers.common['Authorization'] = `Bearer ` + token
    }

    return request
})

export default async (method, url, payload) => {
    if (!navigator.onLine) {
        
        if (method === 'post') {
            return {
                status: 503,
                data: {
                    message: 'No internet connection'
                }
            }
        }

        return {
            status: 503,
            data: {}
        }
    }

    try {
        const response = await axios[method](url, payload)

        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        const { status, data } = error.response

        return {
            status: status,
            data: data
        }
    }
}