import { getField, updateField } from 'vuex-map-fields'
import io from 'socket.io-client'

export const state = {
    socket: io.connect(process.env.VUE_APP_API_URL)
}

export const actions = {
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
