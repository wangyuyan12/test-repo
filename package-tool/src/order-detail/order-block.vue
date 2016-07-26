<style lang="less">

	.fn-clear::after {
	    display: block;
	    font-size: 0;
	    height: 0;
	    visibility: hidden;
	    clear: both;
	    content: " ";
	}
	.no-wrap{
		white-space:nowrap; 
		text-overflow:ellipsis; 
		-o-text-overflow:ellipsis; 
		overflow:hidden;
	}
	.order-block {
		background-color: #fff;
		margin-bottom: 2px;
	}

	.prod-detail {
		position: relative;
		padding-left: 15px;
		padding-right: 15px;
		background-color: #f5f5f5;
		.prod-name {
			display: inline-block;
			line-height: 4rem;
			font-size: 1.4rem;
			width: 85%;
			color: #333;
		}
		.prod-status {
			position: absolute;
			display: inline-block;
			line-height: 4rem;
			font-size: 1.2rem;
			right: 15px;
			color: #f78175;
		}

		.prod-img {
			position: relative;
			float: left;
			width: 6.5rem;
			height: 6.5rem;
			img {
				width: 100%;
				height: 100%;
			}
			span {
				display: block;
				position: absolute;
				top: 0;
				right: 0;
				background-color: #4395c5;
				line-height: 1.5rem;
				width: 3.5rem;
				font-size: .8rem;
				text-align: center;
				color: #fff;
				
			}
		}
		.prod-info {
			position: relative;
			float: left;
			margin-left: 10px;
			width: 76%;
			line-height: 2rem;
			font-size: 1.2rem;
			color: #999;
			.detail {
				display: inline-block;
				width: 43%;
			}
			.sum {
				position: relative;
				display: inline-block;
				line-height: 1.6rem;
				float: right;
				bottom: .8rem;
			}
			.factory {
				position: relative;
				display: inline-block;
				line-height: 1.6rem;
				color: #2fb1fd;
				float: left;
				bottom: .8rem;
				img {
					height: 1.4rem;
					vertical-align: -10%;
				}
			}
		}
	}

	.batch-date {
		margin-top: 2px;
		margin-bottom: 5px;
		background-color: #f5f5f5;
		height: 2.6rem;
		line-height: 2.6rem;
		font-size: 1rem;
		color: #999;
		text-align: center;
		.shelf-life {
			margin-left: 20px;
		}
	}

	.selected-false {
		display: inline-block;
		height: 1.4rem;
		width:  1.4rem;
		border: 1px solid #333;
		border-radius: 50%;
		vertical-align: middle;
	}
	.selected-true {
		display: inline-block;
		height: 1.8rem;
		width: 1.8rem;
		vertical-align: middle;
	}


</style>

<template>
	<div class="order-block">
		<div class="prod-detail fn-clear">
			
			<span class="prod-name no-wrap">{{ orderInfo.sku.name }}</span>
			<span class="prod-status">{{ prodStatus }}</span>
			<br>
			<div class="prod-img">
				<img :src="pic" alt="">
				<span  :style="{display: verifyTag }">待审核</span>
			</div>
			<div class="prod-info">
				<span class="detail no-wrap">剂型：&nbsp;{{ orderInfo.sku.dosage_form }}</span>
				<span class="detail no-wrap">规格：&nbsp;{{ orderInfo.sku.specs }}</span> <br>
				<span class="detail no-wrap">单价：&nbsp;￥{{ orderInfo.price }}</span>
				<span class="detail no-wrap">数量：&nbsp;{{ orderInfo.num }}</span> <br>
				<span class="sum">总计</span> <br>

				<span @click="callFactory" class="factory" v-el:factorynum>
					<img src="./resource/phone.png" alt="">
					厂家：&nbsp;{{ orderInfo.sku.factory }}
				</span>
				<span class="sum">￥{{ sum }}</span>
			</div>
		</div>
		<div class="batch-date" v-if="showBatchDate">
			<span>生产批号：&nbsp;{{ orderInfo.batch }}</span>
			<span class="shelf-life">产品有效期：&nbsp;{{ orderInfo.expiry_time }}</span>
		</div>

		<!-- 样式在 roder-detial 中编写 -->
		<div class="cover" :style="{display: showHide}"></div>
		<div class="phone-call" :style="{display: showHide}">
			<div class="to-call">
				<span>{{ orderInfo.enterprise.phone }}</span> <br>
				<div class="call-operate">
					<a class="concel"  @click="cancelCall">取消</a>
					<a class="call" href="tel:{{ phone }}">通话</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import fetch from 'isomorphic-fetch'

export default {
	name: 'orderBlock',
	props: {
		'orderInfo': Object,
		'orderStatus': Number,
	},
	data: function() {
		return {
			showHide: 'none',
			selected: true,
			sum: 0,
			pic: '//static.eyaos.com/images/no_product.png',
			verifyTag: 'none',
			prodStatus: '',  //未取消（不显示）， 取消中， 已取消
			showBatchDate: false,
		}
	},
	methods: {
		callFactory(e) {  //拨打厂家电话
			this.showHide = 'block'
		},
		cancelCall() {
			this.showHide = 'none'
		}
	},
	beforeCompile() {
		this.sum = parseFloat( this.orderInfo.price ) * parseFloat( this.orderInfo.num )
		this.pic = this.orderInfo.sku.pic ? this.orderInfo.sku.pic : '//static.eyaos.com/images/no_product.png'
		this.verifyTag = this.orderInfo.sku_auth ? ( this.orderInfo.sku_auth.auth_state === 1 ? 'block' : 'none' ) : 'block'
		this.prodStatus = this.orderInfo.state === 1 ? '' : (this.orderInfo.state === 2 ? '已取消' : '取消中')
		this.showBatchDate = this.orderStatus > 3 ? true : false  
	}

}

</script>