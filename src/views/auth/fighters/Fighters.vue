<template>
	<section class="fighters">
		<div class="bg-color"/>

		<swipeable-cards />

		<transition name="_transition-anim">
			<modal
				class="match-container"
				v-if="modalName.includes('match-modal')"
			>
				<match-modal slot="content"/>
			</modal>
		</transition>

		<transition name="_transition-anim">
			<modal
				class="match-container"
				v-if="modalName.includes('countdown-modal')"
			>
				<countdown-modal slot="content"/>
			</modal>
		</transition>

		<transition name="_transition-anim">
			<modal
				class="view-details-container"
				v-if="modalName.includes('view-details-modal')"
			>
				<view-details slot="content" @close="closeViewDetails()"/>
			</modal>
		</transition>
	</section>
</template>
<script>
import * as match from '@/store/match/'
import * as user from '@/store/user/'

import { mapFields } from 'vuex-map-fields'

export default {
	data() {
		return {
			idWatcher: null
		}
	},

	async beforeRouteLeave (to, from, next) {
		if (this.online) await this.removeSocketListener()

		next();
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
		if (!this.online) return

		this.getUser()
	},

	mounted () {
		if (!this.online) return

		this.watchUserId()
	},

	destroyed () {
		this.clearUserList()
	},

	computed: {
		...mapFields('socket', [
            'socket'
		]),

		...mapFields('match', [
			'userList',
			'matchedObject',
			'viewDetailsObject'
		]),

		...mapFields('user', [
            'user'
		]),
		
		...mapFields('modal', [
            'modalName',
		]),

		...mapFields('connection-status', [
            'online'
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
			this.socket.on(`${this.user._id}_new_match`, async ({ socketResponse }) => {
				await this.$store.dispatch('modal/closeModal', {})

				this.$store.commit('modal/toggleModal', {
					modalName: 'match-modal',
				})

				this.matchedObject = socketResponse
			})
		},

		/* Close View Details */
		closeViewDetails () {
			this.viewDetailsObject = {}
            this.$store.dispatch('modal/closeModal', {})
		},
		
		/* Destroyed Lifecycle Method */
		clearUserList () {
			this.userList = []
		},

		/* Before Route Leave Methods */
		async removeSocketListener () {
			await this.socket.removeListener(`${this.user._id}_new_match`)
		}
	},

	components: {
		SwipeableCards: () => import('@/components/fighters/SwipeableCards'),
		Modal: () => import('@/components/global/Modal'),
		MatchModal: () => import('@/components/fighters/MatchModal'),
		CountdownModal: () => import('@/components/fighters/CountdownModal'),
		ViewDetails: () => import('@/components/profile/matches/ViewDetails'),
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
		background: rgba(0, 0, 0, 0.8);

		/deep/.modal-container {
			padding: 0;
			background: none;
			// box-shadow: 0 1px 5px #aaaaaa;

			@include mobile {
				width: 100%;
				height: 100%;
			}
		}
	}

	.view-details-container {
		/deep/.modal-container {
			padding: 0;
			background: none;
			box-shadow: 0 1px 5px #aaaaaa;
			border: 0;

			@include mobile {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>