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
		margin-bottom: 4.5rem;
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
		font-size: 1.6rem;
		text-align: center;
		a {
			color: #313131;
		}
		.contact-comp {
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
			color: #fff;
		}
	}

	.cover {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #000;
		top: 0;
		left: 0;
		z-index: 999;
		opacity: 0.15;
		display: none;
	}
	.phone-call {
		position: fixed;
		width: 100%;
		height: 14rem;
		top: 30%;
		z-index: 1001;
		display: none;
		.to-call {
			margin: 0 auto 0;
			width: 26rem;
			height: 100%;
			background-color: #fff;
			border-radius: 4px;
			text-align: center;
			font-size: 1.6rem;
			color: #000;
			span {
				line-height: 9.5rem;
			}
			.call-operate {
				line-height: 4.5rem;
				border-top: 1px solid #d9d9d9;
				a {
					display: inline-block;
					text-decoration: none;	
					width: 48%;
					color: #000;
				}

				.call {
					color: #30b2fb;
					border-left: 1px solid #d9d9d9;
				}
			}			
		}
	}

</style>

<template>
	<div class="page-wrapper">
		<div class="page-header">
			<span class="company">{{ companyName }}</span>
			<span class="status">{{ statusName }}</span>
		</div>
		<div class="order-list">
			<div v-for="order in orderSkus">
				<order-block :order-info="order"></order-block>
			</div>
			
		</div>
		<div class="price-order">
			<span class="sum">订单总额：&nbsp;￥{{ total }}</span><br>
			<!-- <span class="deposit">定金金额：&nbsp;￥360</span><br> -->
			<span class="order-num">订单编号：&nbsp;{{ orderNum }}</span><br>
			<span class="order-create">订单创建时间：&nbsp;{{createTime[0]}}&nbsp;&nbsp;{{createTime[1]}}</span>
		</div>
		<div class="footbar" :style="{display: footerDisp}">
			<div v-if="footerMode === 0">
				<span class="contact-comp" @click="callCompany">联系商业公司</span>
			</div>
			<div v-if="footerMode === 1">
				<a href="/purchase/m/order/cancel/{{orderId}}"><span v-else class="other-status left">取消订单</span></a>
				<a href=""><span  class="other-status right">提交</span></a>
				 <!-- //第一期 付款 改为 提交 -->
			</div>
			<div v-if="footerMode === 2">
				<a href=""><span v-else class="other-status left">确认收货</span></a>
				<span  class="other-status right" @click="callCompany">联系商业公司</span>
			</div>
			<div v-if="footerMode === 3">
				<a href=""><span v-else class="other-status left">申请退货</span></a>
				<span  class="other-status right" @click="callCompany">联系商业公司</span>
			</div>	
		</div>
	</div>
	<div class="cover" :style="{display: showCall}"></div>
	<div class="phone-call" :style="{display: showCall}">
		<div class="to-call">
			<span>{{ phone }}</span><br>
			<div class="call-operate">
				<a class="concel"  @click="cancelCall">取消</a>
				<a class="call" href="tel:{{ phone }}">通话</a>
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
			csrftoken: '',
			total: '--',
			orderId: 0,
			orderNum: '--',
			companyName: '--',
			createTime: '--',
			orderSkus: [],
			statusName: '未提交',
			footerDisp: 'block',
			footerMode: 0,
			showCall: 'none',
			phone: '13212342345'
		}
	},
	methods: {
		callCompany(e) {
			this.showCall = 'block'
		},
		cancelCall() {
			this.showCall = 'none'
		}
	},
	ready() {
		this.csrftoken = document.cookie.match(/csrftoken=\w+/ig)[0].replace(/csrftoken=/, '')
		this.orderId = /detail\/\d+/.exec(location.href)[0].replace('detail\/', '')
		let vm = this
		fetch('/purchase/api/order/' + this.orderId, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'X-CSRFTOKEN': this.csrftoken,
			}
		}).then(function(res) {
			res.json().then(function(resp) {
				vm.orderNum = resp.number
				vm.companyName = resp.company.name
				vm.phone = resp.company.mobile
				if(resp.order_state === 0) {
					vm.statusName = '未付款订单关闭'
					vm.footerDisp = 'none'
				} else if(resp.order_state === 1) {
					vm.statusName = '未提交' //第一期 未付款 改为 未提交
					vm.footerDisp = 'block'
					vm.footerMode = 1
				} else if(resp.order_state === 2) {
					vm.statusName = '等待厂家审核'
					vm.footerDisp = 'none'
				} else if(resp.order_state === 3) {
					vm.statusName = '下单成功'
					vm.footerDisp = 'block'
					vm.footerMode = 1
				} else if(resp.order_state === 4) {
					vm.statusName = '等待收货'
					vm.footerDisp = 'block'
					vm.footerMode = 2
				} else if(resp.order_state === 5) {
					vm.statusName = '交易完成'
					vm.footerDisp = 'block'
					vm.footerMode = 3
				} else if(resp.order_state === 6) {
					vm.statusName = '有退货'
					vm.footerDisp = 'block'
					vm.footerMode = 0
				} else if(resp.order_state === 10) {
					vm.statusName = '完成交易后订单关闭'
					vm.footerDisp = 'none'
				}
				vm.total = resp.total
				vm.createTime = resp.create_time.split('T')
				vm.orderSkus = resp.order_skus
			})
		})
	},


}
</script>