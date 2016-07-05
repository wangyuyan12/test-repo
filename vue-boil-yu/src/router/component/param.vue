<template>
	<div>
		
		<h3>Component Param</h3>
		
		<p>Current path: {{ $route.path }} </p>
		<p>Param: {{ $route.params.username }}</p>
		<p>Query: {{ $route.query.name }}</p>
		<p>router: {{ $route.router }}</p>
		<p>name: {{ $route.name }} </p>
	</div>
</template>