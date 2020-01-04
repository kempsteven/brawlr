import api from '@/store/api'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    user: {},
    loading: false,

    userForm: {
        firstName: '',
        lastName: '',
        bio: '',
        fighterType: '',
        location: {},
        gender: {},
        organization: ''
    },

    userSettings: {
        genderPreference: {
            male: 0,
            female: 0,
            others: 0
        },

        ageRange: {
            from: 0,
            to: 100
        }
    },

    updateLoading: false
}

export const actions = {
    async getUser ({ dispatch }) {
        state.loading = true

        const { status, data } = await api('get', '/user/get-user')

        // if error
        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )

            return
        }

        state.user = data

        state.loading = false
    },

    async updateUser ({ commit, dispatch }, payload) {
        state.updateLoading = true

        const { status, data } = await api('post', '/user/update-user', payload)

        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )
            
            state.updateLoading = false
            return
        }

        state.user = data

        await dispatch('modal/closeModal', {}, { root: true })

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'Updated succesfully',
        }, { root: true })

        commit('clearUserForm')

        state.updateLoading = false
    }
}

export const mutations = {
    updateField,

    clearUserForm () {
        state.userForm = {
            bio: '',
            fighterType: '',
            location: {},
            gender: {},
            organization: ''
        }
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
