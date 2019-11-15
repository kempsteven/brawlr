const PageNotFound = () => import('@/views/PageNotFound')
const Login = () => import('@/views/guest/Login')

const Home = () => import('@/views/auth/Home')
const Profile = () => import('@/views/auth/profile/Profile')

export default [
	...middleware('guest', [
		{
			path: '/',
			name: 'login',
            component: Login
		},
	]),

	...middleware('auth', [
		{
			path: '/',
			name: 'home',
			component: Home,
			redirect: '/profile',
			children: [
				{
					path: '/profile',
					name: 'profile',
					component: Profile
				},
			]
		},
	]),

	...middleware('*', [
		{
			path: '*',
			name: 'PageNotFound',
			component: PageNotFound,
		},
	])
]

function middleware(middleware, routes) {
	// setting middleware for every route
	routes.forEach(route => {
		if (route.children) {
			route.children.forEach(child => child.meta = { ...child.meta, middleware })
		}

		route.meta = {
			...route.meta,
			middleware
		}
	})

	return routes
}
