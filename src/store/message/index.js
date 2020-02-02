import api from '@/store/api'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    /* Conversation List State */
    conversationList: [],

    conversationListKeyword: '',

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

    /* Match List State */
    matchList: [],

    matchListPagination: {
        page: 1,
        totalPages: 1,
        hasNextPage: false
    },

    matchListLoading: false,

    /* Message View State */
    activeMessageId: null,
    messageView: {},

    /* Get User Info State */
    userInfo: {},
    userInfoLoading: false,

    /* Send Message State */
    sendMessageLoading: false,
    hasSendMessage: false,
    hasSentFirstMessage: false
}

export const actions = {
    async getConversationList ({ dispatch }) {
        state.conversationListLoading = true

        let getConversationUrl = `/message/get-conversation-list?page=${state.conversationListPagination.page}`

        if (state.conversationListKeyword) getConversationUrl += `&keyword=${state.conversationListKeyword}`

        const { status, data } = await api('get', getConversationUrl)

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        const isConversationEmpty = !state.conversationList.length
        
        state.conversationList = isConversationEmpty
                                    ? data.docs
                                    : [
                                        ...state.conversationList,
                                        ...data.docs
                                    ]
        
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

        state.userInfo = data
    },

    async getMessageList ({ dispatch }, payload) {
        state.messageListLoading = true

        const { status, data } = await api('get', `/message/get-message-list?conversationId=${payload}&page=${state.messageListPagination.page}`)

        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }

        const isPageOne = state.messageListPagination.page === 1

        state.messageList = isPageOne
                                ? data.docs.reverse()
                                : [
                                    ...data.docs.reverse(),
                                    ...state.messageList
                                ]

        state.messageListPagination.totalPages = data.totalPages
        state.messageListPagination.hasNextPage = data.hasNextPage

        state.messageListLoading = false

        state.userInfoLoading = false
    },

    async getMatchList ({ dispatch }, clearMatchList = false) {
        state.matchListLoading = true

        const { status, data } = await api('get', `/match/match-list?page=${state.matchListPagination.page}&removeWithConversation=true`)

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            return
        }
        
        if (!clearMatchList) {
            state.matchList = [
                ...state.matchList,
                ...data.docs
            ]
        } else {
            state.matchList = data.docs
        }

        state.matchListPagination.totalPages = data.totalPages
        state.matchListPagination.hasNextPage = data.hasNextPage

        state.matchListLoading = false
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

            state.hasSendMessage = false
            return
        }

        if (status === 200) {
            await dispatch('removeMatchById', state.messageView._id)

            state.hasSentFirstMessage = true
            state.activeMessageId = data.conversationId
        }

        state.sendMessageLoading = false
        state.hasSendMessage = true
    },

    removeConversationById ({}, conversationId) {
        const conversationIdsIndex = state.conversationList.findIndex(x => x._id === conversationId)
        
        if (conversationIdsIndex === -1) return

        state.conversationList.splice(conversationIdsIndex, 1)
    },

    removeMatchById({}, userId) {
        const matchIndex = state.matchList.findIndex(x => x._id === userId)

        if (matchIndex == -1) return

        state.matchList.splice(matchIndex, 1)
    }
}

export const mutations = {
    updateField,

    resetUserMessageList () {
        state.messageList = []

        state.messageListPagination = {
            page: 1,
            totalPages: 1,
            hasNextPage: false
        },

        state.messageListLoading = false
    },

    resetUserMatchList () {
        state.matchList = []

        state.matchListPagination = {
            page: 1,
            totalPages: 1,
            hasNextPage: false
        }

        state.matchListLoading = false
    },

    resetUserMatchListPagination () {
        state.matchListPagination = {
            page: 1,
            totalPages: 1,
            hasNextPage: false
        }

        state.matchListLoading = false
    },

    resetConversationList () {
        state.conversationList = []

        state.conversationListKeyword = ''

        state.conversationListPagination = {
            page: 1,
            totalPages: 1,
            hasNextPage: false
        },

        state.conversationListLoading = false
    },

    resetMessageView () {
        state.activeMessageId = null
        state.messageView = {}
    }
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
