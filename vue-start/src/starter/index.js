import vue from 'vue'

import hello from './component/hello.vue'

new vue({
	el: '#app',
	components: {
		'hello': hello
	} 
})