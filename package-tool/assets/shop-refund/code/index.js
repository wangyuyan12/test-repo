import vue from 'vue'
import goodsReturn from './goods-return.vue'

let vm = new vue({
	el: '#goods-return',
	components: {
		'goods-return': goodsReturn,
	},
})