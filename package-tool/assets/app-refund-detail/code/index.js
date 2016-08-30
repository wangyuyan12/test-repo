import vue from 'vue'
import refundDetail from './refund-detail.vue'

let vm = new vue({
	el: '#refund-detail',
	components: {
		'refund-detail': refundDetail,
	},
})