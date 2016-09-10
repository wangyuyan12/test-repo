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

	.shop {
		overflow: auto;
		.shop-detail {
			margin-bottom: 5.5rem;
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
			appearance: none;
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
					appearance: none;
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
	<!-- <div v-if="footType === 1" class="footer change-state">
		<input type="button" class="reject" @click="confirmOperate(2)" value="拒绝">
		<input type="button" @click="confirmOperate(3)" value="同意">
	</div>
	<div  v-if="footType === 2"  class="footer confirm">
		<input type="button" @click="confirmOperate(4)" class="checked-good" value="确认收货">
	</div> -->

	<div class="confirm-cover" :style="{display: showConfirm}">
		<div class="confirm-win">
			<span>{{ confirmText }}</span> <br>
			<div class="confirm-operate">
				<input type="button" class="concel"  @click="confirmOperate(0)" value="取消">
				<input type="button" class="call" @click="confirmOperate(1)" value="确定">
			</div>
		</div>
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
			confirmText: '',
			confirmState: 0,
			showConfirm: 'none',
			stateList: [
				'取消退货',  //0
				'待审核',   //1
				'待商业公司/平台审核', //2
				'待审核', //3
				'待审核',  //4
				'待平台审核',  //5
				'待商业公司审核',  //6
				'待审核',  //7
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
			reqwest({
				url: '/purchase/api/proxy/refundorder/' + vm.orderId, 
				method: 'PATCH',
				contentType: "application/json;charset=utf-8;",
				headers: { 
                    'Authorization': vm.token,
                },
				body: JSON.stringify(param)
			}).then(resp => {
				Loading('hide')
				vm.refundStatus = vm.stateList[resp.refund_state]
				vm.footType = 0
			}).fail((err) => {
				Loading('hide')
				console.log('err', err)
				Jalert('请重试！', 'icon-error')
			})
		},

		confirmOperate(state) {
			if(state === 0) {
				this.showConfirm = 'none'
				return
			} else if(state === 1) {
				this.showConfirm = 'none'
				if(this.confirmState === 2) {
					this.modifyRefundStatus({'refund_state': 12}, this)
				} else if(this.confirmState === 3) { 
					this.modifyRefundStatus({}, this) 
				} else if (this.confirmState === 4) { 
					this.modifyRefundStatus({'refund_state': 10}, this)
				}
			} else if(state === 2) {
				this.confirmState = 2
				this.confirmText = '拒绝退货?'
				this.showConfirm = 'block'
			} else if(state === 3) {
				this.confirmState = 3
				this.confirmText = '同意退货？'
				this.showConfirm = 'block'
			} else if(state ===4 ) {
				this.confirmState = 3
				this.confirmText = '确认收货？'
				this.showConfirm = 'block'
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
			})
		})
	},

}
</script>