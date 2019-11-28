<template>
	<div id="app">
		<transition name="_transition-anim">
			<router-view/>
		</transition>
	</div>
</template>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #384e64;
	width: 100%;
	min-height: 100%;
	position: relative;
}
</style>
