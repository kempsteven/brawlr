import api from '@/store/api'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    subscriptionLoading: false
}

export const actions = {
    async createSubscription ({ dispatch }, payload) {
        state.subscriptionLoading = true

        const { status, data } = await api('post', `/subscription/create-subscription`, payload)

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        state.subscriptionLoading = false
    },
}

export const mutations = {
    updateField,
}

const getters = {
    getField
}

export default {
    state,
    actions,
    mutations,
    getters,
    namespaced: true
}
