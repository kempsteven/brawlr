<template>
	<div class="home">
		<layout-header />

		<section class="main-content">
			<transition :name="isMobile">
				<router-view v-if="Object.keys(user).length || !this.online"/>
			</transition>
		</section>
	</div>
</template>

<script>

import LayoutHeader from '@/components/home/LayoutHeader'
import { isMobileRegexFunction } from '@/regex'
import * as user from '@/store/user/'
import * as socket from '@/store/socket/'
import * as subscription from '@/store/subscription/'
import { mapFields } from 'vuex-map-fields'

export default {
	async beforeCreate () {
		if (!this.$store._modulesNamespaceMap['user/']) {
			this.$store.registerModule('user', user.default)
		}
		
		if (!this.$store._modulesNamespaceMap['socket/']) {
			await this.$store.registerModule('socket', socket.default)
		}

		if (!this.$store._modulesNamespaceMap['subscription/']) {
			await this.$store.registerModule('subscription', subscription.default)
		}
	},

	async created () {
		if (!this.online) return
		
		this.$store.commit('socket/setSocketConnection')

		await this.getUser()

		this.createPushNotificationSubscription()
    },

	computed: {
		isMobile () {
			return isMobileRegexFunction ? '' : '_transition-anim'
		},

		...mapFields('user', [
            'user'
		]),
		
		...mapFields('connection-status', [
            'online'
        ]),
	},

	methods: {
		async getUser () {
			await this.$store.dispatch('user/getUser')
		},

		async createPushNotificationSubscription () {
			const isServiceWorkerSupported = 'serviceWorker' in navigator

			if (!isServiceWorkerSupported) return

			/* Register Service Worker */
			const register = await navigator.serviceWorker.register('/service-worker.js')
			
			const subscription = await register.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: this.urlBase64ToUint8Array(process.env.VUE_APP_WEB_PUSH_PUBLIC_KEY)
			})

			const form = new FormData()

			form.append('userId', this.user._id)
			form.append('subscription', JSON.stringify(subscription))

			this.$store.dispatch('subscription/createSubscription', form)
		},

		urlBase64ToUint8Array(base64String) {
			const padding = '='.repeat((4 - base64String.length % 4) % 4);
			const base64 = (base64String + padding)
				.replace(/-/g, '+')
				.replace(/_/g, '/');

			const rawData = window.atob(base64);
			const outputArray = new Uint8Array(rawData.length);

			for (let i = 0; i < rawData.length; ++i) {
				outputArray[i] = rawData.charCodeAt(i);
			}
			return outputArray;
		}
	},


	components: {
		LayoutHeader
	}
}
</script>	 

<style lang="scss" scoped>
.home {
	width: 100%;
	min-height: 100%;
	position: relative;

	.main-content {
		width: 100%;
		min-height: calc(100vh - 73px);
		position: relative;
		-webkit-overflow-scrolling: touch;

		@include mobile {
			min-height: calc(100vh - 61px);
		}
	}
}
</style>
