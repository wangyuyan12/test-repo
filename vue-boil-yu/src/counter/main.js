import vue from 'vue'
import counter from './counter.vue'
import store from './store'

new vue({
	el: 'body',
	store,
	components: { counter }
})