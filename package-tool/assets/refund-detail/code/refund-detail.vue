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
			width: 50%;
			float: left;
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
		// display: none;
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
	.express-info {
		display: none;
		position: fixed;
		top: 20%;
		width: 100%;
		height: 23rem;
		z-index: 1001;
		.express-input {
			position: relative;
			margin: 0 auto 0;
			width: 30rem;
			height: 100%;
			background-color: #fff;
			border-radius: 6px;
			text-align: center;
			font-size: 1.6rem;
			color: #6e6e6e;
			span {
				line-height: 6.5rem;
			}
			input {
				border: 1px solid #d9d9d9;
				margin-bottom: 1.5rem;
				padding-left: 5px;
				height: 3.5rem;
				width: 24rem;
				font-size: 1.4rem;
			}
			p {
				position: absolute;
				bottom: 0;
				margin: 0;
				width: 100%;
				border-top: 1px solid #d9d9d9;
				height: 4.5rem;
				input {
					margin: 0;
					width: 49%;
					height: 100%;
					border: 0;
					background: none;
					font-size: 1.6rem;
					color: #6e6e6e;
				}
				.confirm {
					border-left: 2px solid #d9d9d9;
					color: #2fb2fa;
				}
			}
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
		<div class="page-header">
			<span class="company">{{ companyName }}</span>
			<span class="status">{{ statusName }}</span>
		</div>
		<div class="order-list">
			<div v-for="order in orderSkus">
				<order-block :order-info="order" :order-status="orderStatus"></order-block>
			</div>
		</div>
		<div class="price-order">
			<span class="sum">退款金额：&nbsp;￥{{ total }}</span><br>
			<!-- <span class="deposit">平台退款：&nbsp;￥{{ deposit }}</span><br>
			<span class="deposit">厂家退款：&nbsp;￥{{ remain }}</span><br> -->
			<span class="order-num">退货订单号：&nbsp;{{ orderNum }}</span><br>
			<span class="order-create">创建时间：&nbsp;{{ createTime }}</span>
		</div>
		<div class="footbar" :style="{display: footerDisp}">
			<div v-if="footerMode === 0">
				<span class="contact-comp" @click="callCompany">联系商业公司</span>
			</div>
			<div v-if="footerMode === 1"> 
				<span class="other-status left" @click="confirmOperate(2)">取消退货</span>
				<span class="other-status right" @click="callCompany">联系商业公司</span>
			</div>
			<div v-if="footerMode === 2">
				<span class="other-status left" @click="expressInfoInput">填写退货信息</span>
				<span class="other-status right" @click="callCompany">联系商业公司</span>
			</div>
			<div v-if="footerMode === 3">
				<span class="other-status left" @click="confirmOperate(3)">申请客服介入</span>
				<span class="other-status right" @click="callCompany">联系商业公司</span>
			</div>	
			<div v-if="footerMode === 4">
				<span class="other-status left">等待客服处理</span>
				<span class="other-status right" @click="callCompany">联系商业公司</span>
			</div>
			<div v-if="footerMode === 5">
				<span class="contact-comp">已结束</span>
			</div>
		</div>
	</div>
	<div class="cover" :style="{display: showCover}"></div>
	<div class="phone-call" :style="{display: showCall}">
		<div class="to-call">
			<span>{{ phone }}</span><br>
			<div class="call-operate">
				<a class="concel"  @click="cancelCall">取消</a>
				<a class="call" href="tel:{{ phone }}">通话</a>
			</div>
		</div>
	</div>
	<div class="express-info" :style="{display: showExpress}">
		<div class="express-input">
			<span>填写物流信息</span><br>
			<input type="text" :style="{borderColor: expressColor}" 
				v-model="express" @input="onExpressInput" placeholder="快递公司">
			<input type="text" :style="{borderColor: expressNumColor}" v-model="expressNum" 
			 @input="onExpressNumInput" placeholder="运单号">
			<p>
				<input type="button" class="cancel"  @click="cancelSubmit" value="取消">
				<input type="button" class="confirm" @click="submitExpressInfo" value="确定">
			</p>
		</div>
	</div>
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
import reqwest from 'reqwest'
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
			deposit: '--',
			remain: '--',
			refundId: 0,
			orderNum: '--',
			orderStatus: 0,
			companyName: '--',
			createTime: '--',
			orderSkus: [],
			statusName: '未审核',
			footerDisp: 'block',
			footerMode: 0,
			showCover: 'none',
			showCall: 'none',
			showExpress: 'none',
			phone: '13212342345',
			express: '',
			expressNum: '',
			expressColor: '#d9d9d9',
			expressNumColor: '#d9d9d9',
			confirmState: 0,
			confirmText: '',
			showConfirm: 'none',
		}
	},
	methods: {
		callCompany(e) {  //拨打商业公司电话
			this.showCall = 'block'
			this.showCover = 'block'
		},
		cancelCall() {  //取消拨打
			this.showCall = 'none'
			this.showCover = 'none'
		},
		confirmOperate(state) {
			if(state === 0) {
				this.showConfirm = 'none'
				return
			} else if(state === 1) {
				this.showConfirm = 'none'
				if(this.confirmState === 1) {
					this.refundOperate(this, {refund_state: 0})
				} else if(this.confirmState === 2) {
					this.refundOperate(this, {refund_state: 14})
				}
			} else if(state === 2) {
				this.confirmState = 1
				this.confirmText = '确认取消退货？'
				this.showConfirm = 'block'
			} else if(state === 3) {
				this.confirmState = 2
				this.confirmText = '确认申请客服接入？'
				this.showConfirm = 'block'
			}
		},
		refundOperate(vm, param) {
			Loading('show')
			reqwest({
				url: '/purchase/api/shop/refundorder/' + this.refundId, 
				method: 'PATCH',
				contentType: "application/json;",
				headers: {
					'X-CSRFTOKEN': this.csrftoken,
				},
				data: JSON.stringify(param)
			}).then(resp => {
				console.log('resp', resp)
				Loading('hide')
				vm.statusSetting(resp.refund_state)
				vm.cancelSubmit() //关闭弹窗
			}).fail((err) => {
				console.log(err)
				Loading('hide')
				Jalert('请重试！', 'icon-error')
			})
		},
		onExpressInput() {
			this.expressColor = '#d9d9d9'
		},
		onExpressNumInput() {
			this.expressNumColor = '#d9d9d9'
		},
		submitExpressInfo() {
			console.log('express', this.express, 'express_num', this.expressNum)
			if(!this.express) {
				this.expressColor = 'red'
			}
			if(!this.expressNum) {
				this.expressNumColor = 'red'
			}
			if(this.expressNumColor === 'red' ||
				this.expressColor === 'red') {
				return
			}
			this.refundOperate(this, {refund_state: 9, express: this.express, express_number: this.expressNum})
		},
		cancelSubmit() {
			this.showExpress = 'none'
			this.showCover = 'none'
		},
		expressInfoInput() {
			this.showExpress = 'block'
			this.showCover = 'block'
		},
		statusSetting(stateId) {
			if(stateId === 1 ||
				stateId === 2 ||
				stateId === 3 ||
				stateId === 4 ||
				stateId === 5 ||
				stateId === 6 ||
				stateId === 7) {
				this.statusName = '待审核'
				this.footerMode = 1
			} else if(stateId === 8) {
				this.statusName = '等待退货'
				this.footerMode = 2
			} else if(stateId === 9) {
				this.statusName = '等待厂家收货'
				this.footerMode = 0
			} else if(stateId === 10) {
				this.statusName = '退货成功'
				this.footerMode = 0
			} else if(stateId === 11) {
				this.statusName = '商业公司拒绝退货'
				this.footerMode = 3
			} else if(stateId === 12) {
				this.statusName = '厂家拒绝退货'
				this.footerMode = 3
			} else if(stateId === 13) {
				this.statusName = '平台拒绝退货'
				this.footerMode = 3
			} else if(stateId === 14) {
				this.statusName = '客服介入'
				this.footerMode = 4
			} else if(stateId === 15) {
				this.statusName = '退货失败'
				this.footerMode = 5
			} else if(stateId === 0 ) {
				this.statusName = '取消退货'
				location.href = '/purchase/m/order/refund/list/'
			}
		}

	},
	ready() {
		this.csrftoken = document.cookie.match(/csrftoken=\w+/g)[0].replace(/csrftoken=/, '')
		this.refundId = /detail\/\d+/.exec(location.href)[0].replace('detail\/', '')
		let vm = this
		Loading('show')
		//加载订单详情
		reqwest({
			url: '/purchase/api/shop/refundorder/' + this.refundId, 
			method: 'GET',
			headers: {
				'X-CSRFTOKEN': this.csrftoken,
			}
		}).then(resp => {
			console.log('resp', resp)
			vm.statusSetting(resp.refund_state)
			vm.orderSkus = [{
				sku: resp.sku,
				price: resp.price,
				num: resp.num,
				phone: resp.enterprise.phone,
				enterprise: resp.enterprise.name,
			}]
			vm.companyName = resp.company.name
			vm.total = resp.total
			vm.deposit = resp.deposit
			vm.remain = resp.remain
			vm.orderNum = resp.number
			vm.createTime = resp.create_time.replace('T', '\ ')
			Loading('hide')
		})
	},

}
</script>