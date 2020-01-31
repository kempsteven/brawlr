<template>
	<div id="app">
		<transition :name="isMobile">
			<router-view/>
		</transition>

		<transition name="_transition-anim">
			<Alerts v-if="modalName.includes('alert-modal')"/>
		</transition>
	</div>
</template>

<script>
import { isMobileRegexFunction } from '@/regex'
import { mapFields } from 'vuex-map-fields'
import * as socket from '@/store/socket/'

export default {
	async beforeCreate () {
		if (!this.$store._modulesNamespaceMap['socket/']) {
			await this.$store.registerModule('socket', socket.default)
		}

		this.$store.commit('socket/setSocketConnection')
	},

	mounted () {
		window.addEventListener('offline', () => {
			this.online = false
		})

		window.addEventListener('online', () => {
			this.online = true
		})
	},

	computed: {
		...mapFields('modal', [
            'modalName',
		]),

		...mapFields('connection-status', [
            'online'
		]),
		
		isMobile () {
			return isMobileRegexFunction ? '' : '_transition-anim'
		}
	},

	components: {
		Alerts: () => import('@/components/global/Alerts'),
	},
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #384e64;
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
