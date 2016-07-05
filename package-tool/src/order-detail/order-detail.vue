<style lang="less">
	.page-wrapper {
		position: relative;
		background-color: #f5f5f5;
	}
	.page-header {
		margin-top: 15px;
		height: 3.5rem;
		background-color: #fff;
		vertical-align: middle;
		line-height: 3.5rem;

		span {
			font-size: 1.4rem;
		}
		.company {
			color: #646464;		
			margin-left: 15px;
		}
		.status {
			margin-right: 15px;
			float: right;
			color: #45b8f7;
		}
	}
	.order-list {
		background-color: #fff;
	}
	.price-order {
		background-color: #fff;
		padding: 12px 15px 18px;
		line-height: 2rem;
		font-size: 1.2rem;
		color: #999;
	}
	.footbar {
		position: fixed;
		bottom: 0;
		width: 100%;
		margin-top: 1px solid #d9d9d9;
		line-height: 4.5rem;
		font-size: 1.4rem;
		color: #313131;
		text-align: center;
		.wait-verify {
			display: inline-block;
			width: 100%;
			background-color: #fff;
		}
		.other-status {
			display: inline-block;
			width: 49%;
		}
		.left {
			background-color: #fff;
		}
		.right {
			background-color: #30b3fb;
		}
	}

</style>

<template>
	<div class="page-wrapper">
		<div class="page-header">
			<span class="company">{{ busCompany }}</span>
			<span class="status">{{ statusName }}</span>
		</div>
		<div class="order-list">
			<order-block></order-block>
			<order-block></order-block>
		</div>
		<div class="price-order">
			<span class="sum">订单总额：&nbsp;￥3600.00</span><br>
			<span class="deposit">定金金额：&nbsp;￥360</span><br>
			<span class="order-num">订单编号：&nbsp;201607042053</span><br>
			<span class="order-create">订单创建时间：&nbsp;2016年05月23日&nbsp;&nbsp;13:52:33</span>
		</div>
		<div class="footbar">
			<div v-if="status === 2">
				<span class="wait-verify">联系商业公司</span>
			</div>
			<div v-else>
				<span v-else class="other-status left">{{ footer[0] }}</span>
				<span  class="other-status right">{{ footer[1] }}</span>
			</div>	
		</div>
	</div>
	
</template>

<script>
import orderBlock from './order-block.vue'

export default {
	name: 'orderDetail',

	components: {
		'order-block': orderBlock
	},

	data: function() {
		return {
			busCompany: '杭州天猪医药运输公司',
			status: 2,
			statusName: '未付款',
			footer: ['取消订单', '付款']
		}
	}

}
</script>