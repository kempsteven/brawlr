import api from '@/store/api'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    userList: [],

    userListLoading: false,

    matchedObject: {},

    viewDetailsObject: {},

    challengeUserLoading: false
}

export const actions = {
    async getUserList ({ dispatch }) {
        state.userListLoading = true

        const { status, data } = await api('get', '/match/get-user-list')

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        state.userList = data

        state.userListLoading = false
    },

    async challengeUser({ dispatch }, payload) {
        state.challengeUserLoading = true

        const { status, data } = await api('post', '/match/challenge-user', payload)

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )

            return
        }

        state.challengeUserLoading = false
    }
}

export const mutations = {
    updateField
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
