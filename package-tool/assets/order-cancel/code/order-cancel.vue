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
		.order-operate {
			display: inline-block;
			width: 73%;
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

	.confirm-cover {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1001;
		background: rgba(0, 0, 0, 0.3);
		display: none;
		.confirm-win {
			margin: 30% auto 0;
			top: 30%;
			width: 26rem;
			height: 14rem;
			background-color: #fff;
			border-radius: 4px;
			text-align: center;
			font-size: 1.6rem;
			color: #000;
			span {
				line-height: 9.5rem;
			}
			.confirm-operate {
				line-height: 4.5rem;
				border-top: 1px solid #d9d9d9;
				input {
					width: 49%;
					color: #30b2fb;
					border: 0;
    				background: none;
    				line-height: 4.3rem;
    				font-size: 1.4rem;
				}
				input:first-of-type {
					color: #000;
					border-right: 1px solid #d9d9d9;
					border-bottom-right-radius: 0px;
					border-top-right-radius: 0px;
				}
			}			
		}
	}

</style>

<template>
	<div class="page-wrapper">
		<div class="order-list">
			<div v-for="order in orders">
				<order-block :order-info="order"></order-block>
			</div >
		</div>
		<div class="footbar">
			<span class="select-all" @click="selectAllProd">
				<span class="select-all-icon" :style="{ backgroundPosition: selectAll ? '100%' : '200%' }">
					<!-- <img v-if="selectAll" class="selected-true" src="./resource/selected.png">
					<span v-else class="selected-false">&nbsp;</span> -->
				</span> 
				<span class="text">全选</span>
			</span>
			<span class="order-operate" :style="{backgroundColor: enabelCancel ? '#30b3fb' : '#d9d9d9'}" @click="orderOperate(2)">取消所选药品</span>
		</div>
	</div>
	<div class="confirm-cover" :style="{display: showConfirm}">
		<div class="confirm-win">
			<span>确定取消订单？</span> <br>
			<div class="confirm-operate">
				<input type="button" class="concel"  @click="orderOperate(0)" value="取消">
				<input type="button" class="call" @click="orderOperate(1)" value="确定">
			</div>
		</div>
	</div>
	
</template>

<script>
import reqwest from 'reqwest'
import orderBlock from './order-block.vue'

export default {
	name: 'orderConcel',

	components: {
		'order-block': orderBlock
	},

	data: function() {
		return {
			csrftoken: '',
			orderId: 0,
			orders: [],
			selectedItem: [],  //选中的订单
			selectAbleLength: 0,
			selectAll: false,
			showConfirm: 'none'
		}
	},
	methods: {
		selectAllProd() {  //全选/取消全选商品
			this.selectAll = !this.selectAll   //全选标签
			if(this.selectAll) {
				this.selectedItem = [] //清空
				for(let i=0; i<this.orders.length; i++) {
					if(this.orders[i].state === 1) {
						this.selectedItem.push(this.orders[i].sku.id)  //
					}
				}
				this.$broadcast('selectAllProd', 'selected')
			} else {
				this.selectedItem = []
				this.$broadcast('selectAllProd', 'cancel')
			}
		},

		orderOperate(state) {
			if(state === 0) {
				this.showConfirm = 'none'
				return
			} else if(state === 1) {
				this.showConfirm = 'none'
				this.cancelSkus()
			} else if(state === 2) {
				if(this.enabelCancel) {
					this.showConfirm = 'block'
				}
			}
		},

		cancelSkus() {  //取消订单中产品
			
			let param = {
				all: this.selectAll,
				sku_list: this.selectedItem,
			}
			let vm = this
			Loading('show')
			//取消订单接口
			reqwest({
				url: '/purchase/api/shop/order/update/' + this.orderId, 
				method: 'PATCH',
				contentType: "application/json;",
				headers: {
					'X-CSRFTOKEN': this.csrftoken,
				},
				data: JSON.stringify(param)
			}).then(resp => {
				Loading('hide')
				console.log('resp', resp)
				if(resp.status === 200) {
					self.location = '/purchase/m/order/list/'
				} else {
					console.log('resp', resp.detail)
					Jalert('请重试！', 'icon-error')
				}
			}).fail((err) => {
				Loading('hide')
				console.log('err', err)
				alert('请重试！', 'icon-error')
			})	
		}
	},
	events: {
		'selectedProd': function(prodId, operate) {  //子组件dispatch事件
			prodId = parseInt(prodId)
			if(operate === 'add') {
				this.selectedItem.push(prodId)
			} else if(operate === 'del') {
				for(let i=0; i<this.selectedItem.length; i++) {
					if(this.selectedItem[i] === prodId) {
						this.selectedItem.splice(i, 1)
						break
					}
				}
			}
			
			this.selectAll = this.selectedItem.length === this.selectAbleLength
		}
	},

	computed: {
		enabelCancel: function() {
			return this.selectedItem.length > 0 ? true : false  //“取消所选药品”使能控制
		},

	},

	ready() {
		this.csrftoken = document.cookie.match(/csrftoken=\w+/g)[0].replace(/csrftoken=/, '')
		this.orderId = /cancel\/\d+/.exec(location.href)[0].replace('cancel\/', '')
		let vm = this
		Loading('show')
		//加载订单详情
		reqwest({
			url: '/purchase/api/order/' + this.orderId, 
			method: 'GET',
			contentType: "application/json;",
			headers: {
				'X-CSRFTOKEN': this.csrftoken,
			}
		}).then(resp => {
			console.log('resp', resp)
			vm.orders = resp.order_skus
			for(let i=0; i<vm.orders.length; i++) {
				if(vm.orders[i].state === 1) {
					vm.selectAbleLength += 1
				}
			}
			Loading('hide')
		}).fail(err => {
			Loading('hide')
			Jalert('请重试！', 'icon-error')
		})
	}

}
</script>