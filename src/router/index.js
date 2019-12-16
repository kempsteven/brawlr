import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes,

    scrollBehavior(to, from, savedPosition) {
        setTimeout(() => {
            return { x: 0, y: 0 }
        }, 0);
    }
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

    const routeMiddleware = to.meta.middleware

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