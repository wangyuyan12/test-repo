<style lang="less">
	.info {
		width: 100%;
		background-color: #fff;
		p {
			margin: 13px;
			font-size: 1.4rem;
			color: #323232;
			.status {
				color: #30b2fb;
			}
		}
		.title {
			margin: 0;
			line-height: 4rem;
			padding-left: 15px;
			background-color: #f5f5f5;
			vertical-align: middle;
		}
		.detail {
			margin-top: 15px;
			padding-bottom: 2px;
		}
	}
	
	.prod {
		.prod-list {
			width: 100%;
		}
	}


</style>

<template>
	<div class="order info">
		<p class="title">订单信息</p>
		<div class="detail order-detail">
			<p>订单号:&nbsp;&nbsp;{{ orderNo }}</p>
			<p>订单状态:&nbsp;&nbsp;<span class="status">{{ orderStatus }}</span></p>
			<p>订单总额:&nbsp;&nbsp;￥{{ sum }}元</p>
			<p>下单时间:&nbsp;&nbsp;{{ createTime }}</p>
		</div>
	</div>
	<div class="prod info">
		<p class="title">产品信息</p>
		<div class="prod-list" v-for='prod in prods'>
			<prod-item :prod-info="prod"></prod-item>
		</div>
	</div>
	<div class="shop info">
		<p class="title">药店信息</p>
		<div class="detail shop-detail">
			<p>药店名称:&nbsp;&nbsp;{{ shopName }}</p>
			<p>城市:&nbsp;&nbsp;{{ city }}</p>
			<p>详细地址:&nbsp;&nbsp;{{ address }}</p>
			<p>药店联系人:&nbsp;&nbsp;{{ contact }}</p>
			<p>联系电话:&nbsp;&nbsp;{{ phone }}</p>
		</div>
	</div>
</template>

<script>
import fetch from 'isomorphic-fetch'
import prodItem from './prod-item.vue'

export default {
	name: 'orderDetail',

	components: {
		'prod-item': prodItem
	},

	data() {
		return {
			csrftoken: '',
			orderId: 0,
			prods: [],
			orderNo: '--',
			orderStatus: '--',
			sum: 0,
			createTime: '--',
			shopName: '--',
			city: '--',
			address: '--',
			contact: '--',
			phone: '--'
		}
	},

	ready() {
		this.csrftoken = document.cookie.match(/csrftoken=\w+/ig)[0].replace(/csrftoken=/, '')
		this.orderId = location.href.split('/').pop()
		let vm = this
		fetch('/purchase/api/proxy/order/' + this.orderId, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'X-CSRFTOKEN': this.csrftoken,
			}
		}).then((res) => {
			res.json().then((resp) => {
				console.log('data', resp)
				vm.orderNo = resp.number
				if(resp.order_state === 2) {
					vm.orderStatus = '待审核'
				} else if(resp.order_state === 3) {
					vm.orderStatus = '下单成功'
				} else if(resp.order_state === 4) {
					vm.orderStatus = '等待收货'
				} else if(resp.order_state === 5) {
					vm.orderStatus = '交易完成'
				} else if(resp.order_state === 6) {
					vm.orderStatus = '有退货'
				} else if(resp.order_state === 10) {
					vm.orderStatus = '订单关闭'
				} else {
					vm.orderStatus = '状态异常'
				}
				vm.sum = resp.total
				vm.createTime = resp.create_time.replace('T', '\ ')
				vm.prods = resp.order_skus
				vm.shopName = resp.shop.name
				vm.city = resp.shop.area.name
				vm.address = resp.shop.address
				vm.contact = resp.shop.contact
				vm.phone = resp.shop.phone
			})
		}).catch((err) => {
			alert(err)
		})
	},
}
</script>