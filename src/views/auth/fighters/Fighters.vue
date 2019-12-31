<template>
	<section class="fighters">
		<div class="bg-color"/>

		<swipeable-cards />
	</section>
</template>

<script>

export default {
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
	}
}
</style>