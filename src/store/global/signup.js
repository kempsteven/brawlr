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

    loading: false
}

export const actions = {
    async signUp({ commit, dispatch }, payload) {
        state.loading = true

        const { status, data } = await api('post', '/user/sign-up', payload)
        
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

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: data.message,
        }, { root: true })

        commit('clearSignup')

        state.loading = false
    }
}

export const mutations = {
    updateField,

    clearSignup () {
        state.signup = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            gender: {},
            age: ''
        }

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
