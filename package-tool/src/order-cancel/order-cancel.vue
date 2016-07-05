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
			<div v-for="prod in prods">
				<order-block :prod-info="prod"></order-block>
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
			<span class="order-operate" :style="{backgroundColor: enabelCancel ? '#30b3fb' : '#d9d9d9'}">取消所选药品</span>
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
			prods: [
				{
					id: '1234',
					name: '1谷胱甘太谷胱甘太谷胱甘太',
					dosage_form: '1片剂',
					specs: '0.1g',
					num: '200盒',
					factory: '杭州天猪科技有限公司',
					price: '8',
					money: 3000,
					verified: true,
				},
				{
					id: '1235',
					name: '2谷胱甘太谷胱甘太谷胱甘太',
					dosage_form: '2片剂',
					specs: '0.18g',
					num: '200盒',
					factory: '杭州天猪科技有限公司',
					price: '8.1',
					money: 3500,
					verified: false,
				},
				{
					id: '1236',
					name: '3谷胱甘太谷胱甘太谷胱甘太',
					dosage_form: '3片剂',
					specs: '0.19g',
					num: '200盒',
					factory: '杭州天猪科技有限公司',
					price: '8.3',
					money: 3600,
					verified: false,
				}
			],
			selectdItem: [],  //选中的订单
			selectAll: false,
			enabelCancel: false,  //取消
		}
	},
	methods: {
		selectAllProd() {
			this.selectAll = !this.selectAll   //全选标签
			this.enabelCancel = this.selectAll  //“取消所选药品”使能控制
			if(this.selectAll) {
				for(let i=0; i<this.prods.length; i++) {
					this.selectdItem.push(this.prods[i].id)  //
				}
				this.$broadcast('selectAllProd', 'selected')
			} else {
				this.selectdItem = []
				this.$broadcast('selectAllProd', 'cancel')
			}
		}
	},
	events: {
		'selectedProd': function(prodId, operate) {
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
			this.enabelCancel = this.selectdItem.length > 0 ? true : false  //“取消所选药品”使能控制
			this.selectAll = this.selectdItem.length === this.prods.length  //
		}
	},

	compiled() {
		console.log('compiled')
	}


}
</script>