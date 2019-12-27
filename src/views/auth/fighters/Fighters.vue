<template>
	<section class="fighters">
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
}
</style>