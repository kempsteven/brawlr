import store from '@/store'

class FormValidation {
    isFormComplete (form) {
        const formKeys = Object.keys(form)

        for (const key of formKeys) {
            const formProperty = form[key]

            if (
                !formProperty ||
                (formProperty.constructor === Object
                && !Object.keys(formProperty).length)
            ) {
                store.commit('modal/toggleModal', {
                    modalName: 'alert-modal',
                    modalType: 'error',
                    modalTitle: 'Oooops!',
                    modalDesc: 'Please fill up all values',
                })

                return false
            }
        }

        return true
    }

    isEqual (valueOne, valueTwo, message) {
        let isEqual = true

        if (valueOne.constructor !== valueTwo.constructor) isEqual = false

        if (valueOne.constructor === Object) {
            const valueOneKeys = Object.keys(valueOne)
            const valueTwoKeys = Object.keys(valueTwo)
            
            if (valueOneKeys.join() !== valueTwoKeys.join()) isEqual = false

            isEqual = valueOneKeys.every(x => valueOne[x] === valueTwo[x])
        }

        if (valueOne.constructor === Array) {
            const valueOneKeys = Object.keys(valueOne)
            const valueTwoKeys = Object.keys(valueTwo)

            if (valueOneKeys.join() !== valueTwoKeys.join()) isEqual = false
        }

        if (valueOne !== valueTwo) isEqual = false

        if (!isEqual) {
            store.commit('modal/toggleModal', {
                modalName: 'alert-modal',
                modalType: 'error',
                modalTitle: 'Oooops!',
                modalDesc: message || 'Hey Dev, 3rd Parameter is Required.',
            })
        }

        return isEqual
    }
}


export const formValidation = new FormValidation()