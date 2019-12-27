<template>
	<div class="home">
		<layout-header />

		<section class="main-content">
			<transition :name="isMobile">
				<router-view/>
			</transition>
		</section>
	</div>
</template>

<script>

import LayoutHeader from '@/components/home/LayoutHeader'
import { isMobileRegexFunction } from '@/regex'

export default {
	computed: {
		isMobile () {
			return isMobileRegexFunction ? '' : '_transition-anim'
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
		min-height: calc(100vh - 70px);
		position: relative;
		// -webkit-overflow-scrolling: touch;
		// display: flex;
	}
}
</style>
