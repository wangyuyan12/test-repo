import vue from 'vue'
import orderCancel from './order-cancel.vue'

let vm = new vue({
	el: '#order-cancel',
	components: {
		'order-cancel': orderCancel,
	},
})