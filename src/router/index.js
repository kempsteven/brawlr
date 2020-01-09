import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import offlineTokenValidation from './offline-token-validation'
import store from '../store'

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

// middleware to check if user is authenticated
router.beforeEach(async (to, from, next) => {
    const routeMiddleware = to.meta.middleware

    alert('navigator.onLine', navigator.onLine, !navigator.onLine)
    alert('routeMiddleware', routeMiddleware, routeMiddleware === 'auth')
    if (!navigator.onLine) {
        if (routeMiddleware === 'auth') {
            const token = store.getters['authentication/getField']('token')
            
            alert('token', token)
            if (token) {
                if (!await offlineTokenValidation(token)) {
                    next({ name: 'login' })

                    return
                }

                next()
            } else {
                next({ name: 'login' })
            }
            
            return
        }

        next()
        return
    }

    const token = store.getters['authentication/getField']('token')
    let isLoggedIn = store.getters['authentication/getField']('isLoggedIn')

    if (token && !isLoggedIn) {
        await store.dispatch('authentication/checkToken')
        isLoggedIn = store.getters['authentication/getField']('isLoggedIn')
    }

    // This will return the middleware of a route
    // if a route.name is the same as the next route's name
    // return the route's middleware or
    // if the route has children and one of its childrens name
    // is the same as the next route's name, get the route's middleware
    // const routeMiddleware = routes.find(route => {
    //     return route.name === to.name || (
    //         route.children &&
    //         route.children
    //             .map(item => item.name)
    //             .indexOf(to.name) > -1
    //     )
    // }).middleware

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