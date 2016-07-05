<style lang='less'>
	.root-temp {
		border: 1px solid blue;
	}
</style>

<template>
	<div class='root-temp'>
		<h1>This is root template!</h1>
	</div>
	<div class='v-bind'>
		{{ myMessage }}
	</div>
	<div id='child-comp' class="child-comp"></div>
	<br>
	<h3>Events</h3>
	<input v-model='msg'>
	<button @click="notify">Dispatch Event</button>
</template>

<script>
	export default {
		name: 'comp1',

		props: ['myMessage'],

		data() {
			return { 
				msg: 'hello',
				msg2: 'hello vue.js'
			}
		},

		methods: {
			notify() {
				if(this.msg.trim()) {
					// this.$dispatch('child-msg2', this.msg2)
					
					this.$dispatch('child-msg', this.msg)
					this.msg = ''
				}
			}
		}

	}
</script>

