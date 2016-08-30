import vue from 'vue'
import orderDetail from './order-detail.vue'

let vm = new vue({
	el: '#order-detail',
	components: {
		'order-detail': orderDetail,
	},
})