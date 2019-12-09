<template>
	<section class="fighters">
		<swipeable-cards />
	</section>
</template>

<script>
import SwipeableCards from '@/components/fighters/SwipeableCards'
export default {
	components: {
		SwipeableCards,
	},
}
</script>

<style lang="scss" scoped>
.fighters {
	flex: 1 1 auto;
	display: flex;
}
</style>