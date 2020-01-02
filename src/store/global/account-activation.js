import api from '@/store/api'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    iv: '',
    key: '',
    message: '',

    loading: false
}

export const actions = {
    async activateAccount({ commit }, payload) {
        state.loading = true

        const { status, data } = await api('post', 'user/account-activation', payload)

        // if error
        if (status !== 200) {
            state.message = data.message
            
            state.loading = false
            return
        }

        state.message = data.message

        commit('clearAccountActivation')

        state.loading = false
    }
}

export const mutations = {
    updateField,

    clearAccountActivation() {
        state.iv = ''
        state.key = ''
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
