<template>
	<div id="app">
		<transition :name="isMobile">
			<router-view/>
		</transition>
	</div>
</template>

<script>
import { isMobileRegexFunction } from '@/regex'

export default {
	computed: {
		isMobile () {
			return isMobileRegexFunction ? '' : '_transition-anim'
		}
	}
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #384e64;
	width: 100%;
	height: 100%;
	position: relative;
}
</style>
