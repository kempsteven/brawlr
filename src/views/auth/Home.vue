<template>
	<div class="home">
		<layout-header />

		<section class="main-content">
			<transition :name="isMobile">
				<router-view v-if="user._id"/>
			</transition>
		</section>
	</div>
</template>

<script>

import LayoutHeader from '@/components/home/LayoutHeader'
import { isMobileRegexFunction } from '@/regex'
import * as user from '@/store/user/'
import * as socket from '@/store/socket/'
import { mapFields } from 'vuex-map-fields'

export default {
	async beforeCreate () {
		if (!this.$store._modulesNamespaceMap['user/']) {
			this.$store.registerModule('user', user.default)
		}

		if (!this.$store._modulesNamespaceMap['socket/']) {
			await this.$store.registerModule('socket', socket.default)
		}

		this.$store.commit('socket/setSocketConnection')
	},

	created () {
        if (!this.online) return
        
		this.getUser()
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
		getUser () {
			this.$store.dispatch('user/getUser')
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
