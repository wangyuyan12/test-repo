<style lang='less'>
	.css-test {
		p {
			white-space: pre-wrap;
		}
	}
</style>

<template>
	<div class='temp-test'>
		<h3>Template condition render</h3>
		<p>Paragraph 1</p>
		<p>props: {{ message }}</p>
		<input type="button" @click="printmsg" value="print msg">
		<div class='css-test'>
			<p>feifeiyu
					hi, how fine thank, and you , what the fuck is that. donkey
				are you
			</p>
		</div>
	</div>
</template>

<script>

export default {
	name: 'TempTest',

	// props: ['msgs']
	props: {
		msgs: String,
	},

	data: function() {
		return {
			message: this.msgs
		}
	},

	methods: {
		printmsg() {
			console.log('in methods')
			console.log(this.msgs)
			this.message = this.msgs + 'ok'
		}
	},

	init() {
		console.log('in init2')
	},
	created() {
		console.log('in created2')
	},
	beforeCompile() {
		console.log('in c=beforeCompile2')
	},
	compiled() {
		console.log('in compiled2')
	},
	ready() {
		console.log('in ready2')
	},
}	

</script>