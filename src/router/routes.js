const PageNotFound = () => import('@/views/PageNotFound')
const Login = () => import('@/views/guest/Login')

const Home = () => import('@/views/auth/Home')
const Profile = () => import('@/views/auth/profile/Profile')
const Fighters = () => import('@/views/auth/fighters/Fighters')
const Messages = () => import('@/views/auth/messages/Messages')

/* Profile Routes */
const About = () => import('@/views/auth/profile/about/About')
const Matches = () => import('@/views/auth/profile/matches/Matches')
const Settings = () => import('@/views/auth/profile/settings/Settings')

export default [
	// ...middleware('guest', [
	...middleware('*', [
		{
			path: '/',
			name: 'login',
            component: Login
		},
	]),

	// ...middleware('auth', [
	...middleware('*', [
		{
			path: '/',
			name: 'home',
			component: Home,
			redirect: '/profile',

			children: [
				{
					path: '/profile/',
					name: 'profile',
					redirect: '/profile/about',
					component: Profile,

					children: [
						{
							path: 'about',
							name: 'about',
							component: About
						},

						{
							path: 'matches',
							name: 'matches',
							component: Matches
						},

						{
							path: 'settings',
							name: 'settings',
							component: Settings
						},
					]
				},

				{
					path: '/fighters/',
					name: 'fighters',
					component: Fighters
				},

				{
					path: '/messages/',
					name: 'messages',
					component: Messages
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
			route.children.forEach(child => {
				child.meta = { ...child.meta, middleware }

				if (child.children) {
					child.children.forEach(deepChild => deepChild.meta = { ...deepChild.meta, middleware })
				}
			})
		}

		route.meta = {
			...route.meta,
			middleware
		}
	})

	return routes
}
