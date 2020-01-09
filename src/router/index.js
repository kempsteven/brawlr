import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'
import offlineTokenValidation from './offline-token-validation'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes
})

const guestMiddleware = (next, token, isLoggedIn) => {
    if (token && isLoggedIn) {
        next({ name: 'home' })
    } else {
        next()
    }
}

const authMiddleware = (next, token, isLoggedIn) => {
    if (token && isLoggedIn) {
        next()
    } else {
        next({ name: 'login' })
    }
}

const offlineMiddleware = async (next) => {
    const routeMiddleware = to.meta.middleware
    const token = store.getters['authentication/getField']('token')

    if (token) {
        if (!await offlineTokenValidation(token)) {
            next({ name: 'login' })

            return
        }

        if (routeMiddleware === 'auth') {
            next()

            return
        }

        next({ name: 'home' })
    } else {
        next({ name: 'login' })
    }
}

router.beforeEach(async (to, from, next) => {
    const isOnline = navigator.onLine

    /* Route Handler for Offline Mode */
    if (!isOnline) { 
        offlineMiddleware(next)   
        return
    }

    /* Route Handler for Online Mode */
    const routeMiddleware = to.meta.middleware
    const token = store.getters['authentication/getField']('token')
    let isLoggedIn = store.getters['authentication/getField']('isLoggedIn')

    if (token && !isLoggedIn) {
        await store.dispatch('authentication/checkToken')
        isLoggedIn = store.getters['authentication/getField']('isLoggedIn')
    }

    // If middleware is *, just go to next route
    if (routeMiddleware === '*') {
        next()
    }

    //middleware for guest middleware type
    if (routeMiddleware === 'guest') {
        guestMiddleware(next, token, isLoggedIn)
    }

    //middleware for auth middleware type
    if (routeMiddleware === 'auth') {
        authMiddleware(next, token, isLoggedIn)
    }
})

export default router