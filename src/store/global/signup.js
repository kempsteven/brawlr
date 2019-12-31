import api from '@/store/api'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    signup: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: {},
        age: ''
    },

    loading: false,

    isSignUpValid: false
}

export const actions = {
    async signUp ({ commit }, payload) {
        state.loading = true

        const { data } = await api('post', '/user/sign-up', payload)
        
        // if error
        if (data.status !== 200) {
            commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'error',
                modalTitle: 'Oooops!',
                modalDesc: data.message,
            }, { root: true })

            return
        }

        commit('clearSignup')
    }
}

export const mutations = {
    updateField,

    clearSignup () {
        state.firstName = ''
        state.lastName = ''
        state.email = ''
        state.password = ''
        state.gender = {}
        state.age = ''

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
