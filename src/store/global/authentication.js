import api from '@/store/api'
import cookies from 'js-cookie'
import router from '../../router'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    email: '',
    password: '',
    error: '',
    loading: false,
    token: cookies.get('token'),
    isLoggedIn: false
}

export const actions = {
    async login({ commit, dispatch }, payload) {
        state.loading = true

        const { status, data } = await api('post', '/user/sign-in', payload)

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message, 
                { root: true }
            )

            state.loading = false
            return
        }

        const isInDevelopment = process.env.NODE_ENV === 'development'

        const cookieOptions = isInDevelopment
                                ? { expires: 36500 }
                                : { expires: 36500, secure: true }

        //setting of token
        cookies.set('token', data.token, cookieOptions)

        state.token = data.token

        await router.push({ name: 'profile' })
        commit('clearLogin')
        
        state.loading = false
    },

    async logOut () {
        state.isLoggedIn = false
        state.token = ''
        await cookies.remove('token')

        router.push({ name: 'login' })
        
        location.reload()
    },

    async checkToken () {
        const { status } = await api('get', '/user/check-token')

        if (status !== 200) {
            state.isLoggedIn = false
            state.token = ''
            cookies.remove('token')
            return
        }

        state.isLoggedIn = true
    },
}

export const mutations = {
    updateField,

    clearLogin () {
        state.email = ''
        state.password = ''
        state.error = ''
        state.loading = false
    }
}

const getters = {
    getField
}

export default {
    state,
    actions,
    mutations,
    getters
}
