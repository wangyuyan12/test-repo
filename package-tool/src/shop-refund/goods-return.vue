<style lang="less">
	.page-wrapper {
		position: relative;
		background-color: #fff;
		margin-top: 1rem;
		margin-bottom: 5rem;
	}

	.footbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		line-height: 4.5rem;
		font-size: 1.4rem;
		text-align: center;
		background-color: #fff;
		.select-all {
			display: inline-block;
			width: 25%;
		}
		.goods-operate {
			display: inline-block;
			width: 100%;
			background-color: #d9d9d9;
			color: #fff;
		}
	}

	.select-all-icon {
		display: inline-block;
		width: 1.8rem;
		height: 1.8rem;
		background: url('./resource/selected.png');
		background-size: 300% 100%;
		background-position: 200%;
		vertical-align: middle;
	}

</style>

<template>
	<div class="page-wrapper">
		<div class="goods-list">
			<div v-for="prod in prods">
				<goods-block :prod-info="prod"></goods-block>
			</div >
		</div>
		<div class="footbar">
			<!-- <span class="select-all" @click="selectAllProd">
				<span class="select-all-icon" :style="{ backgroundPosition: selectAll ? '100%' : '200%' }">
					<img v-if="selectAll" class="selected-true" src="./resource/selected.png">
					<span v-else class="selected-false">&nbsp;</span>
				</span> 
				<span class="text">全选</span>
			</span> -->
			<span class="goods-operate" :style="{backgroundColor: enabelRefund ? '#30b3fb' : '#d9d9d9'}" @click="refundApply">确认退货</span>
		</div>
	</div>
</template>

<script>
import reqwest from 'reqwest'
import goodsBlock from './goods-block.vue'

export default {
	name: 'goodBlock',
	components: {
		'goods-block': goodsBlock
	},
	data() {
		return {
			csrftoken: '',
			orderId: 0,
			prods: [],
			refundProds: [],  //选退货产品
		}
	},
	methods: {
		refundApply() {
			if(this.enabelRefund) {
				let vm = this
				Loading('show')
				if(this.enabelRefund) {
					reqwest({
						url: '/purchase/api/shop/refundorder/apply/' + this.orderId, 
						method: 'POST',
						contentType: "application/json;",
						headers: {
							'X-CSRFTOKEN': this.csrftoken,
						},
						data: JSON.stringify(this.refundProds)
					}).then(resp => {
						console.log('resp', resp)
						Loading('hide')
						if(resp.status === 201) {
							// Jalert('退货成功', 'icon-ok')
							location.href = '/purchase/m/order/list/'
						}	
					}).fail((err) => {
						console.log(err)
						Loading('hide')
						Jalert('请重试', 'icon-error')
					})
				}
			}
		}
	},
	events: {
		'refundProd': function(refundInfo) {
			for(let i=0; i<this.refundProds.length; i++) {
				if(refundInfo.id === this.refundProds[i].id) {
					this.refundProds.splice(i, 1)
					break
				}
			}
			if(refundInfo.num > 0) {
				this.refundProds.push(refundInfo)
			}
			console.log(this.refundProds)
		}
	},
	ready() {
		this.csrftoken = document.cookie.match(/csrftoken=\w+/g)[0].replace(/csrftoken=/, '')
		this.orderId = /refund\/\d+/.exec(location.href)[0].replace('refund\/', '')
		let vm = this
		Loading('show')
		//加载订单详情
		reqwest({
			url: '/purchase/api/shop/refund/apply/' + vm.orderId, 
			method: 'GET',
			headers: {
				'X-CSRFTOKEN': vm.csrftoken,
			}
		}).then(resp => {
			Loading('hide') 
			console.log('resp1', resp)
			vm.prods = resp	
		}).fail((err) => {
			Loading('hide')
			Jalert('请重试！', 'icon-error')
		})
	},
	computed: {
		enabelRefund: function() {
			return this.refundProds.length > 0 ? true : false
		}
	},


}
</script>