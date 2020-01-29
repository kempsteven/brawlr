import { getField, updateField } from 'vuex-map-fields'
import io from 'socket.io-client'

export const state = {
    // socket: io.connect(process.env.VUE_APP_API_URL)
    socket: null
}

export const actions = {
    
}

export const mutations = {
    updateField,

    setSocketConnection () {
        state.socket = io.connect(
                            process.env.VUE_APP_API_URL,
                            { query: { token: this.state.authentication.token } }
                        )

        // state.socket = io.connect(process.env.VUE_APP_API_URL)
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
