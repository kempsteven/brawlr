<template>
	<div class="home">
		<LayoutHeader />

		<section class="main-content">
			<router-view/>
		</section>
	</div>
</template>

<script>

import LayoutHeader from '@/components/home/LayoutHeader'
export default {
	components: {
		LayoutHeader
	}
}
</script>

<style lang="scss" scoped>
.home {
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	.main-content {
		flex: 1 1 auto;
		position: relative;
		-webkit-overflow-scrolling: touch;
	}
}
</style>
