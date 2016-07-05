<template>
	<div>
		
		<h3>Component Foo</h3>
		<p>This is Foo!</p>
		<p>
			<a href="#" v-link="{path:'/foo/bar'}">Go to Bar</a>
			<a href="#" v-link="{path:'/foo/baz'}">Go to Baz</a>
			<a href="#" v-link="{path:'/foo/param/feifeiyu?name=feifei'}">Go to Param</a>
			<a href="#" v-link="{name: 'param', params: { username: 'mukuku' }, query: {name: 'kuku'}}">Go to Param2</a>
		</p>

		<router-view></router-view>
	</div>
</template>

