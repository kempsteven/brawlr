import api from '@/store/api'
import { getField, updateField } from 'vuex-map-fields'

export const state = {
    user: {},
    loading: false,

    userForm: {
        firstName: '',
        lastName: '',
        age: '',
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

    updateLoading: false,

    updateImageLoading: false,
    
    activeImagePosition: null,

    isImagePositionAvailable: false,

    isUpdatingUserImage: false
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

            if (status === 404) {
                dispatch('authentication/logOut', '', { root: true })
            }

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
    },

    async updateUserImage ({ commit, dispatch }, payload) {
        state.updateImageLoading = true

        if (!await dispatch('checkImagePositionAvailable')) {
            state.isUpdatingUserImage = true
            await dispatch('setRemoveUserImage')
            state.updateImageLoading = true
        }

        const { status, data } = await api('post', '/user/update-user-image', payload)

        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )

            state.updateImageLoading = false
            state.isUpdatingUserImage = false
            return
        }

        state.user = data

        await dispatch('modal/closeModal', {}, { root: true })

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'Updated image succesfully',
        }, { root: true })

        state.updateImageLoading = false
        state.isUpdatingUserImage = false
    },

    checkImagePositionAvailable() {
        const profilePictures = state.user.profilePictures

        const pictureObject = profilePictures.find(picture => {
                                    return parseInt(picture.position) === state.activeImagePosition
                                })

        if (pictureObject.image !== null) {
            return false
        }

        return true
    },

    async setRemoveUserImage ({ dispatch }) {
        const activePictureObject = state.user.profilePictures.find(picture => {
                                        return parseInt(picture.position) === state.activeImagePosition
                                    })

        const form = new FormData()

        form.append('profilePictures[0][position]', activePictureObject.position)
        form.append('profilePictures[0][image]', activePictureObject.image.publicId)

        await dispatch('removeUserImage', form)
    },

    async removeUserImage ({ commit, dispatch }, payload) {
        state.updateImageLoading = true

        const { status, data } = await api('post', '/user/remove-user-image', payload)

        if (status !== 200) {
            dispatch(
                'modal/errorModal',
                data.message || 'Sorry, Something went wrong.',
                { root: true }
            )

            state.updateImageLoading = false
            return
        }

        state.user = data

        if (state.isUpdatingUserImage) {
            state.updateImageLoading = false

            return
        }

        await dispatch('modal/closeModal', {}, { root: true })

        commit('modal/toggleModal', {
            modalName: 'alert-modal',
            modalType: 'success',
            modalTitle: 'Success',
            modalDesc: 'Removed image succesfully',
        }, { root: true })

        state.updateImageLoading = false
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
