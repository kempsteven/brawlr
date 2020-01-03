import { getField, updateField } from 'vuex-map-fields'

export const state = {
    online: navigator.onLine
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
    getters
}
