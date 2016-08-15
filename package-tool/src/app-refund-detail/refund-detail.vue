<style lang="less">
	.info {
		// position: relative;
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

	.footer {
		position: fixed;
		bottom: 0;
		border-top: 1px solid #d9d9d9;
		height: 5rem;
		width: 100%;
		background-color: #fff;
		input {
			height: 4rem;
			margin-top: .5rem;
			margin-right: 15px;
			min-width: 95px;
			border: 0;
			border-radius: 5px;
			background-color: #30b3fc;
			font-size: 1.8rem;
			color: #fff;
			float: right;
		}
		.reject {
			background-color: #fff;
			border: 1px solid #d9d9d9;
			color: #000;
		}
	}

</style>

<template>
	<div class="refund info">
		<p class="title">订单信息</p>
		<div class="detail refund-detail">
			<p>退货订单号:&nbsp;&nbsp;{{ refundNo }}</p>
			<p>退货状态:&nbsp;&nbsp;<span class="status">{{ refundStatus }}</span></p>
			<p>退货总额:&nbsp;&nbsp;￥{{ sum }}元</p>
			<p>退货申请时间:&nbsp;&nbsp;{{ createTime }}</p>
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
	<div v-if="footType === 1" class="footer change-state">
		<input type="button" class="reject" @click="rejectAppeal" value="拒绝">
		<input type="button" @click="acceptAppeal" value="同意">
	</div>
	<div  v-if="footType === 2"  class="footer confirm">
		<input type="button" @click="signedRefund" class="checked-good" value="确认收货">
	</div>
</template>

<script>
import prodItem from './prod-item.vue'
import reqwest from 'reqwest'

export default {
	name: 'orderDetail',

	components: {
		'prod-item': prodItem
	},

	data() {
		return {
			csrftoken: '',
			token: null,
			orderId: 0,
			prods: [],
			refundNo: '--',
			refundStatus: '--',
			sum: 0,
			createTime: '--',
			shopName: '--',
			city: '--',
			address: '--',
			contact: '--',
			phone: '--',
			footType: 0,
			stateList: [
				'取消退货',  //0
				'待审核',   //1
				'待商业公司/平台审核', //2
				'待厂家/平台审核', //3
				'待厂家/商业公司审核',  //4
				'待平台审核',  //5
				'待商业公司审核',  //6
				'待厂家审核',  //7
				'待药店退货',  //8
				'待厂家收货',  //9
				'退货成功',   //10
				'商业公司拒绝退货',  //11
				'厂家拒绝退货',   //12
				'平台拒绝退货',  //13
				'客服介入',   //14
				'退货失败',   //15
				'状态错误', //16
			],
		}
	},

	methods: {

		modifyRefundStatus(param, vm) {
			fetch('/purchase/api/proxy/refundorder/' + vm.orderId, {
				method: 'PATCH',
				credentials: 'include',
				headers: {
					'Authorization': vm.token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(param)
			}).then((res) => {
				Loading('hide')
				res.json().then((resp) => {
					vm.refundStatus = vm.stateList[resp.refund_state]
					vm.footType = 0
				}).catch(err => {
					Jalert('请重试！', 'icon-error')
				})
				
			}).catch((err) => {
				Loading('hide')
				console.log('err', err)
				Jalert('请重试！', 'icon-error')
			})
		},

		rejectAppeal() {
			let con = confirm('拒绝退货？')
			if(con) {
				Loading('show')
				this.modifyRefundStatus({'refund_state': 12}, this)
			} else {
				return
			}
			
		},
		acceptAppeal() {
			let con = confirm('同意退货？')
			if(con) {
				Loading('show')
				this.modifyRefundStatus({}, this)
			} else {
				return
			}
			
		},
		signedRefund() {
			let con = confirm('确认收货')
			if(con) {
				Loading('show')
				this.modifyRefundStatus({'refund_state': 10}, this)
			} else {
				return
			}
		},
		connectWebViewJavascriptBridge(callback) {
			if(window.WebViewJavascriptBridge) {
				callback(WebViewJavascriptBridge)
			} else {
				document.addEventListener(
					'WebViewJavascriptBridgeReady',
					function() {
						callback(WebViewJavascriptBridge)
					},
					false
				)
			}
		}
	},

	ready() {

		this.orderId = location.href.split('/').pop()
		let vm = this
		Loading('show')
		this.connectWebViewJavascriptBridge((bridge) => {
			bridge.init((message, responseCallback) => {
				//获取token
				vm.token = 'token\ \ ' + message
				//请求数据
				reqwest({
                        url: '/purchase/api/proxy/refundorder/' + vm.orderId,
                        contentType: "application/json;charset=utf-8;",
                        method: 'GET',
                        headers: {
                            'Authorization': vm.token,
                        },
                        error: function (err) { 
                        	Loading('hide')
							Jalert('请重试！', 'icon-error')
                        },
                        success: function(resp) {
                        	Loading('hide')
                            vm.refundNo = resp.number
							vm.refundStatus = vm.stateList[resp.refund_state]
							if(resp.refund_state === 1 ||
								resp.refund_state === 3 ||
								resp.refund_state === 4 ||
								resp.refund_state === 7) {
								vm.footType = 1
							} else if(resp.refund_state === 9) {
								vm.footType = 2
							}
							vm.sum = parseFloat(resp.price)*resp.num
							vm.createTime = resp.create_time.replace('T', '\ ')
							let prodInfo = {}
							prodInfo.sku = resp.sku
							prodInfo.num = resp.num
							prodInfo.price = parseFloat(resp.price)
							vm.prods.push(prodInfo)
							vm.shopName = resp.shop.name
							vm.city = resp.shop.area.name
							vm.address = resp.shop.address
							vm.contact = resp.shop.contact
							vm.phone = resp.shop.phone
							vm.loading = false
                        }
                    })
				/*fetch('/purchase/api/proxy/refundorder/' + vm.orderId, {
					method: 'GET',
					credentials: 'include',
					headers: {
						'Authorization': vm.token,
					}
				}).then((res) => {
					res.json().then((resp) => {
						Loading('hide')
						console.log('data', resp)
						vm.refundNo = resp.number
						vm.refundStatus = vm.stateList[resp.refund_state]
						if(resp.refund_state === 1 ||
							resp.refund_state === 3 ||
							resp.refund_state === 4 ||
							resp.refund_state === 7) {
							vm.footType = 1
						} else if(resp.refund_state === 9) {
							vm.footType = 2
						}
						vm.sum = parseFloat(resp.price)*resp.num
						vm.createTime = resp.create_time.replace('T', '\ ')
						let prodInfo = {}
						prodInfo.sku = resp.sku
						prodInfo.num = resp.num
						prodInfo.price = parseFloat(resp.price)
						vm.prods.push(prodInfo)
						vm.shopName = resp.shop.name
						vm.city = resp.shop.area.name
						vm.address = resp.shop.address
						vm.contact = resp.shop.contact
						vm.phone = resp.shop.phone
						vm.loading = false
					})
				}).catch((err) => {
					Loading('hide')
					Jalert('请重试！', 'icon-error')
				})*/
			})
		})	
	},

}
</script>