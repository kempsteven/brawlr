import axios from 'axios'
import store from './'
import { setupCache } from 'axios-cache-adapter'


// Create `axios-cache-adapter` instance
const cache = setupCache({
    maxAge: 15 * 60 * 1000
})

const axiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    adapter: cache.adapter
});

// axios.defaults.baseURL = process.env.VUE_APP_API_URL

// axios.defaults.baseURL = 'https://brawlr-backend.herokuapp.com'

axiosInstance.interceptors.request.use(request => {
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
        const response = await axiosInstance[method](url, payload, {  })

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