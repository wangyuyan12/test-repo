import vue from 'vue'

import hello from './component/hello.vue'
import tempCond from './component/temp-cond.vue'

let vm = new vue({
	el: '#app',
	data: {
		toShow: false,
		inputDate: '',
		message: ''
	},
	components: {
		'hello': hello,
		'temp-cond': tempCond,
	},
	methods: {
		showTemp: function() {
			this.toShow = ! this.toShow
		},
		getMsgs: function() {
			this.inputDate = this.message + 'fei'
			this.$nextTick(function () {
	        	console.log('nextTick updated') // => 'updated'
	      	})
		},

	},
	init() {
		console.log('in init')
	},
	created() {
		console.log('in created')
	},
	beforeCompile() {
		console.log('in c=beforeCompile')
	},
	compiled() {
		console.log('in compiled')
		this.inputDate = this.message + 'fei'
	},
	ready() {
		console.log('in ready')
	},

})
