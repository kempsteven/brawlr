<template>
	<section class="fighters">
		<div class="bg-color"/>

		<swipeable-cards />
	</section>
</template>
<script>
import * as match from '@/store/match/'
import { mapFields } from 'vuex-map-fields'

export default {
	
	beforeCreate () {
		if (!this.$store._modulesNamespaceMap['match/']) {
            this.$store.registerModule('match', match.default)
		}
    },

	created () {
		this.getUserList()
	},

	computed: {
		...mapFields('match', [
			'userList'
		])
	},

	methods: {
		getUserList () {
			this.$store.dispatch('match/getUserList')
		}
	},

	components: {
		SwipeableCards: () => import('@/components/fighters/SwipeableCards')
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
}
</style>