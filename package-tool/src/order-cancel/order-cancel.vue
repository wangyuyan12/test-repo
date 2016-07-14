<style lang="less">
	.page-wrapper {
		position: relative;
		background-color: #fff;
		margin-top: 1rem;
	}

	.footbar {
		position: fixed;
		bottom: 0;
		margin-top: 1px solid #d9d9d9;
		width: 100%;
		line-height: 4.5rem;
		font-size: 1.4rem;
		text-align: center;
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
			<span class="order-operate" :style="{backgroundColor: enabelCancel ? '#30b3fb' : '#d9d9d9'}" @click="cancelSkus">取消所选药品</span>
		</div>

	</div>
	
</template>

<script>
import fetch from 'isomorphic-fetch'
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
		cancelSkus() {  //取消订单中产品
			if(this.enabelCancel) {
				let param = {
					all: this.selectAll,
					sku_list: this.selectedItem,
				}
				//取消订单接口
				fetch('/purchase/api/shop/order/update/' + this.orderId, {
					method: 'PATCH',
					credentials: 'include',
					headers: { 
						'Content-Type': 'application/json',
						'X-CSRFTOKEN': this.csrftoken,
					},
					body: JSON.stringify(param)
				}).then((res) => {
					res.json().then((resp) => {
						console.log('resp', resp)
						if(resp.status === 200) {
							self.location = '/purchase/m/order/list/'
						} else {
							alert(resp.detail)
						}
					})
				}).catch((err) => {
					console.log('err', err)
					alert('取消失败，请重试！')
				})
			}
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
		this.csrftoken = document.cookie.match(/csrftoken=\w+/ig)[0].replace(/csrftoken=/, '')
		this.orderId = /cancel\/\d+/.exec(location.href)[0].replace('cancel\/', '')
		let vm = this
		//加载订单详情
		fetch('/purchase/api/order/' + this.orderId, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'X-CSRFTOKEN': this.csrftoken,
			}
		}).then(function(res) {
			res.json().then(function(resp) {
				console.log('resp', resp)
				vm.orders = resp.order_skus
				for(let i=0; i<vm.orders.length; i++) {
					if(vm.orders[i].state === 1) {
						vm.selectAbleLength += 1
					}
				}
			})
		})
	}

}
</script>