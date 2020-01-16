<template>
	<section class="fighters">
		<div class="bg-color"/>

		<swipeable-cards />

		<transition name="_transition-anim">
			<modal class="match-container" v-if="modalName.includes('match-modal')">
				<match-modal slot="content"/>
			</modal>
		</transition>
	</section>
</template>
<script>
import * as match from '@/store/match/'
import * as user from '@/store/user/'

import { mapFields } from 'vuex-map-fields'
import io from 'socket.io-client'

export default {
	data() {
		return {
			idWatcher: null,
			socket: io.connect('http://localhost:3000')
		}
	},

	beforeCreate () {
		if (!this.$store._modulesNamespaceMap['match/']) {
            this.$store.registerModule('match', match.default)
		}

		if (!this.$store._modulesNamespaceMap['user/']) {
            this.$store.registerModule('user', user.default)
		}
    },

	created () {
		this.getUser()
	},

	mounted () {
		this.watchUserId()
	},

	destroyed () {
		this.removeSocketListener()
	},

	computed: {
		...mapFields('match', [
			'userList',
			'matchedObject'
		]),

		...mapFields('user', [
            'user'
		]),
		
		...mapFields('modal', [
            'modalName',
		]),
	},

	methods: {
		/* Created Lifecycle Method */
		getUser () {
			if (Object.keys(this.user).length) return

			this.$store.dispatch('user/getUser')
		},

		/* Mounted Lifecycle Method */
		watchUserId () {
			this.idWatcher = this.$watch('user', (val) => {
				if (Object.keys(val).length && val._id) {
					this.setSocketListeners()

					setTimeout(() => this.idWatcher(), 0)
				}
			}, { immediate: true })
		},

		setSocketListeners () {
			this.socket.on(`${this.user._id}_new_match`, (data) => {
				this.$store.commit('modal/toggleModal', {
					modalName: 'match-modal',
				})

				this.matchedObject = data
			})
		},

		/* Destroyed Lifecycle Method */
		removeSocketListener () {
			if (this.user._id) {
				this.socket.removeListener(`${this.user._id}_new_match`)
			}

			this.socket.disconnect()
		}
	},

	components: {
		SwipeableCards: () => import('@/components/fighters/SwipeableCards'),
		Modal: () => import('@/components/global/Modal'),
		MatchModal: () => import('@/components/fighters/MatchModal')
	},
}
</script>

<style lang="scss" scoped>
.fighters {
	flex: 1 1 auto;
	display: flex;
	height: 100%;
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;

	.bg-color {
		width: 110%;
		height: 60%;
		transform: rotate(-4deg);
		background-color: $red;
		position: absolute;
		left: -7%;
		top: -25%;
		z-index: 0;

		@include mobile {
			width: 100%;
			height: 40%;
			top: 0;
			left: 0;
			transform: rotate(0deg);
		}
	}

	.match-container {
		/deep/.modal-container {
			padding: 0;
			background: none;

			@include mobile {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>