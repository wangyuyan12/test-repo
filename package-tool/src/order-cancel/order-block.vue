<style lang="less">
	.no-wrap{
		white-space: nowrap; 
		text-overflow:ellipsis; 
		-o-text-overflow:ellipsis; 
		overflow:hidden;
	}
	.fn-clear::after {
	    display: block;
	    font-size: 0;
	    height: 0;
	    visibility: hidden;
	    clear: both;
	    content: "";
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
		margin-bottom: 5px;
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

	.num-date {
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
		display: none;
	}
	.select-icon {
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
	<div class="order-block">
		<div class="prod-detail fn-clear">
			
			<span class="prod-name no-wrap" @click="selectProd" :prod-id='orderInfo.sku.id' v-el:skuname>
				<span v-if="selectAble" class="select-icon" :style="{ backgroundPosition: selected ? '100%' : '200%' }"></span>
				{{ orderInfo.sku.name }}
			</span>
			<span class="prod-status">{{ prodStatus }}</span>
			<br>
			<div class="prod-img">
				<img :src="pic" alt="">
				<span :style="{display: verifyTag }">待审核</span>
			</div>
			<div class="prod-info">
				<span class="detail no-wrap">剂型：&nbsp;{{ orderInfo.sku.dosage_form }}</span>
				<span class="detail no-wrap">规格：&nbsp;{{ orderInfo.sku.specs }}</span> <br>
				<span class="detail no-wrap">单价：&nbsp;￥{{ orderInfo.price }}</span>
				<span class="detail no-wrap">数量：&nbsp;{{ orderInfo.num }}</span> <br>
				<span class="sum">总计</span> <br>

				<span @click="callFactory" class="factory tz-no-wrap" v-el:factorynum>
					<img src="./resource/phone.png" alt="">
					厂家：&nbsp;{{ orderInfo.sku.factory }}
				</span>
				<span class="sum">￥{{ sum }}</span>
			</div>
		</div>
		<div class="num-date" style="display: none">
			<span>生产批号：&nbsp;12345678901234</span>
			<span class="shelf-life">产品有效期：&nbsp;2016年8月15日</span>
		</div>
		<div class="cover" :style="{display: showHide}"></div>
		<div class="phone-call" :style="{display: showHide}">
			<div class="to-call">
				<span>{{ phone }}</span> <br>
				<div class="call-operate">
					<a class="concel"  @click="cancelCall">取消</a>
					<a class="call" href="tel:{{ phone }}">通话</a>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>

export default {
	name: 'orderBlock',
	props: {
		'orderInfo': Object,
	},
	data: function() {
		return {
			phone: '',
			showHide: 'none',
			selected: false,
			selectAble: true,
			pic: '//static.eyaos.com/images/no_product.png',
			verifyTag: 'none',
			sum: '--',
			prodStatus: '',
		}
	},
	methods: {
		callFactory(e) {  //拨打厂家
			this.showHide = 'block'
			this.phone = this.$els.factorynum.getAttribute('phone')
		},
		cancelCall() {
			this.showHide = 'none'
		},
		selectProd(e) {  //选择商品
			if(this.selectAble) {
				this.selected = !this.selected
				if(this.selected) {
					this.$dispatch('selectedProd', this.$els.skuname.getAttribute('prod-id'), 'add')
				} else {
					this.$dispatch('selectedProd', this.$els.skuname.getAttribute('prod-id'), 'del')
				}
			}
		}
	},
	events: {
		selectAllProd: function(operate) {  //父组件 broadcast 事件 -- 全选
			if(this.selectAble) {
				if(operate === 'selected') {
					this.selected = true
				} else if(operate === 'cancel') {
					this.selected = false
				}
			}
		}
	},
	beforeCompile() {
		this.sum = parseFloat( this.orderInfo.price ) * parseFloat( this.orderInfo.num )
		this.pic = this.orderInfo.sku.pic ? this.orderInfo.sku.pic : '//static.eyaos.com/images/no_product.png'
		this.verifyTag = this.orderInfo.sku_auth ? ( this.orderInfo.sku_auth.auth_state === 1 ? 'block' : 'none' ) : 'block'
		this.prodStatus = this.orderInfo.state === 1 ? '' : (this.orderInfo.state === 2 ? '已取消' : '取消中')
		this.selectAble = this.orderInfo.state === 1 ? true : false
	},

}

</script>