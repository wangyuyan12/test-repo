<style lang='less'>
	.to-fetch {
		border: 1px solid gray;
		padding: 2px;
		
		button {
			background-color: #BBFFFF;
		 }
	}
</style>

<template>
	<div class='to-fetch'>
		<button @click="chanData"> Change Data </button>
		<button @click="getData"> Get Data </button>
	</div>
	<div>
		<h4>status: {{ status }}</h4>
		<div class="data-fetch" v-for="item of results">
			<h5>{{ item.title }}</h5>
			<p>{{ item.body }}</p>
		</div>
	</div>
</template>

<script>
	import fetch from 'isomorphic-fetch'

	export default {
		name: 'fetch-test',

		data() {
			return {
				results: [{title: 'qui est esse', body: 'feifeifeifieyu'}],
				status: ''
			}
		},

		methods: {
			getData() {
				let vm = this

				fetch('http://jsonplaceholder.typicode.com/posts')
					.then((res) => {
						if(res.ok) {
							res.json().then((resp) => {
								console.log(resp.slice(1,5))
								vm.results = resp.slice(1,5)
								vm.status = vm.status + ' new '
							})
						} else {
							console.log('error failed to get data')
						}
					}).catch((err) => {
						console.log(err)
					})
			},

			chanData() {
				let vm = this
				console.log( vm.results )
				vm.results[0].title = vm.results[0].title + 'a'
				vm.results[0].body = vm.results[0].body + 'b'
			}
		}
	}

</script>