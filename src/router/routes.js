/* Unprotected Routes */
const PageNotFound = () => import('@/views/all/PageNotFound')
const AccountActivation = () => import('@/views/all/AccountActivation')

/* Unauthorized Views */
const Guest = () => import('@/views/guest/Guest')
const Login = () => import('@/views/guest/login/Login')
const SignUp = () => import('@/views/guest/signup/SignUp')

/* Authorized Views */
const Home = () => import('@/views/auth/Home')
const Profile = () => import('@/views/auth/profile/Profile')
const Fighters = () => import('@/views/auth/fighters/Fighters')
const Messages = () => import('@/views/auth/messages/Messages')

/* Profile Routes */
const About = () => import('@/views/auth/profile/about/About')
const Matches = () => import('@/views/auth/profile/matches/Matches')
const Settings = () => import('@/views/auth/profile/settings/Settings')

/* Messages Routes */
const MessageView = () => import('@/views/auth/messages/message-view/MessageView')

export default [
	...middleware('guest', [
	// ...middleware('*', [
		{
			path: '/',
			name: 'guest',
			component: Guest,

			children: [
				{
					path: '',
					name: 'login',
					component: Login
				},

				{
					path: 'signup',
					name: 'signup',
					component: SignUp
				},
			]
		},
	]),

	...middleware('auth', [
	// ...middleware('*', [
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
					component: Messages,

					children: [
						{
							path: 'view',
							name: 'message-view',
							component: MessageView
						}
					]
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

		{
			path: '/account-activation',
			name: 'account-activation',
			props: route => ({ ...route.query, ...route.params }),
			component: AccountActivation,
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
