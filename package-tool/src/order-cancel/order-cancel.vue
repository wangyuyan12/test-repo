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
import orderBlock from './order-block.vue'

export default {
	name: 'orderConcel',

	components: {
		'order-block': orderBlock
	},

	data: function() {
		return {
			csrftoken: '',
			orders: [],
			selectdItem: [],  //选中的订单
			selectAll: false,
		}
	},
	methods: {
		selectAllProd() {
			this.selectAll = !this.selectAll   //全选标签
			if(this.selectAll) {
				for(let i=0; i<this.orders.length; i++) {
					this.selectdItem.push(this.orders[i].sku.id)  //
				}
				this.$broadcast('selectAllProd', 'selected')
			} else {
				this.selectdItem = []
				this.$broadcast('selectAllProd', 'cancel')
			}
		},
		cancelSkus() {
			if(this.enabelCancel) {
				console.log('skus', this.selectdItem)
			}
			
		}
	},
	events: {
		'selectedProd': function(prodId, operate) {
			prodId = parseInt(prodId)
			if(operate === 'add') {
				this.selectdItem.push(prodId)
			} else if(operate === 'del') {
				for(let i=0; i<this.selectdItem.length; i++) {
					if(this.selectdItem[i] === prodId) {
						this.selectdItem.splice(i, 1)
						break
					}
				}
			}
			
			this.selectAll = this.selectdItem.length === this.orders.length
		}
	},

	computed: {
		enabelCancel: function() {
			return this.selectdItem.length > 0 ? true : false  //“取消所选药品”使能控制
		}
	},

	ready() {
		this.csrftoken = document.cookie.match(/csrftoken=\w+/ig)[0].replace(/csrftoken=/, '')
		this.orderNum = /cancel\/\d+/.exec(location.href)[0].replace('cancel\/', '')
		let vm = this
		fetch('/purchase/api/order/' + this.orderNum, {
			methods: 'GET',
			credentials: 'include',
			headers: {
				'X-CSRFTOKEN': this.csrftoken,
			}
		}).then(function(res) {
			res.json().then(function(resp) {
				console.log('resp', resp)
				vm.orders = resp.order_skus
			})
		})
	}

}
</script>