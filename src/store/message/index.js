import api from '@/store/api'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    /* Conversation List State */
    conversationList: [],

    conversationListPagination: {
        page: 1,
        totalPages: 1,
        hasNextPage: false
    },

    conversationListLoading: false,
    
    /* Message List State */
    messageList: [],

    messageListPagination: {
        page: 1,
        totalPages: 1,
        hasNextPage: false
    },

    messageListLoading: false,

    /* Message View State */
    activeMessageId: null,
    messageView: {},

    /* Get User Info State */
    userInfoLoading: false,

    /* Send Message State */
    sendMessageLoading: false
}

export const actions = {
    async getConversationList ({ dispatch }) {
        state.conversationListLoading = true

        const { status, data } = await api('get', `/message/get-conversation-list?page=${state.conversationListPagination.page}`)

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        state.conversationList = data.docs
        
        state.conversationListPagination.totalPages = data.totalPages
        state.conversationListPagination.hasNextPage = data.hasNextPage

        state.conversationListLoading = false
    },

    async getUserInfo({ dispatch }, payload) {
        state.userInfoLoading = true

        const { status, data } = await api('get', `/message/get-user-info?userId=${payload}`)

        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        state.messageView = data

        state.userInfoLoading = false
    },

    async getMessageList ({ dispatch }, payload) {
        state.userInfoLoading = true

        const { status, data } = await api('get', `/message/get-message-list?conversationId=${payload}&page=${state.messageListPagination.page}`)

        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        state.messageList = [
            ...state.messageList,
            ...data.docs.reverse()
        ]

        state.messageListPagination.totalPages = data.totalPages
        state.messageListPagination.hasNextPage = data.hasNextPage

        state.userInfoLoading = false
    },

    async sendMessage({ dispatch }, payload) {
        state.sendMessageLoading = true

        const { status, data } = await api('post', `/message/send-message`, payload)

        if (status !== 200 && status !== 204) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        if (state === 200) {
            state.activeMessageId = data.conversationId
        }

        state.sendMessageLoading = false
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
