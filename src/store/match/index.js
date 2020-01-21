import api from '@/store/api'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    /* User List */
    userList: [],

    userListPagination: {
        page: 1,
        hasNextPage: false
    },

    userListLoading: false,

    /* Match List */
    matchList: [],

    matchListPagination: {
        page: 1,
        totalPages: 1,
        hasNextPage: false
    },
    
    matchListLoading: false,

    /* Match Modal */
    matchedObject: {},

    /* View User Modal */
    viewDetailsObject: {},

    /* Challenge User Loading */
    challengeUserLoading: false,

    /* Unmatch User Loading */
    unMatchLoading: false
}

export const actions = {
    async getUserList ({ dispatch }) {
        state.userListLoading = true

        const { status, data } = await api('get', `/match/get-user-list?page=${state.userListPagination.page}`)

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        state.userList = [
            ...state.userList,
            ...data.docs
        ]

        state.userListPagination.hasNextPage = data.hasNextPage

        state.userListLoading = false
    },

    async getMatchList ({ dispatch }) {
        state.matchListLoading = true

        const { status, data } = await api('get', `/match/match-list?page=${state.matchListPagination.page}`)

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        state.matchList = data.docs

        state.matchListPagination.totalPages = data.totalPages
        state.matchListPagination.hasNextPage = data.hasNextPage

        state.matchListLoading = false
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
    },

    async unMatch({ dispatch, commit }, payload) {
        state.unMatchLoading = true

        const { status, data } = await api('post', '/match/un-match', payload)

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )

            return
        }

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'Unmatched user succesfully',
        }, { root: true })

        dispatch('getMatchList')

        state.unMatchLoading = false
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
