<template>
	<div class="home">
		<layout-header />

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
	min-height: 100%;
	display: flex;
	flex-direction: column;

	.main-content {
		width: 100%;
		position: relative;
		-webkit-overflow-scrolling: touch;
	}
}
</style>
