import vue from 'vue'

import comp1 from './comp1.vue'
import compFetch from './comp-fetch.vue'

let myComponent = vue.extend({
	props: ['msg'],
	template: '<div>A custom component! <span>{{ msg }}</span> </div>'
})

// vue.component('my-component', myComponent)

new vue({
	el: '#app',
	components: { 
		myComponent,
		comp1,
		compFetch,
	},

	data: {
		messages: [],
	},

	methods: {
		msg2Handler(msg) {
			console.log('in msg2Handler', msg)
			this.messages.push(msg)
		}
	},

	events: {
		'child-msg': function (msg) {
			console.log('msg', msg)
			console.dir(this.messages)
			this.messages.push(msg)
		},

		'child-emit': () => {
			alert('emit events ')
		},
	}
})

