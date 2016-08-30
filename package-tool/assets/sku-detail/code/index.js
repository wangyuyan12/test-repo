import vue from 'vue'
import skuDetail from './sku-detail.vue'

let vm = new vue({
	el: '#sku-detail',
	components: {
		'sku-detail': skuDetail,
	},
})
