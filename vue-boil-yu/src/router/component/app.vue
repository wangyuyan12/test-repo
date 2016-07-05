<style lang='less'>
	body {
		background-color: #FAEBD7;
	}
</style>

<template>
	<div id='wrapper' class='wrapper'>
		<h1>Hello Vue!</h1>
		<!-- <router-view></router-view> -->
		<p>
			<a href="#" v-link="{path:'/foo'}">Go to Foo</a>
			<a href="#" v-link="{path:'/bar'}">Go to Bar</a>
		</p>
		<router-view></router-view>
	</div>
</template>

