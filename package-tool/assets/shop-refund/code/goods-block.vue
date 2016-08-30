<style lang="less">
	input[type=button]{
		-webkit-appearance: none;
		outline: none;
		padding: 0;
	}
	.tz-no-wrap{
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
	.goods-block {
		background-color: #fff;
	}

	.prod-detail {
		position: relative;
		padding-left: 15px;
		padding-right: 15px;
		background-color: #f5f5f5;
		margin-bottom: 5px;
		.prod-name {
			line-height: 4rem;
			font-size: 1.4rem;
			color: #333;
		}

		.prod-img {
			position: relative;
			float: left;
			width: 20%;
			img {
				width:  6.5rem;
				height:  6.5rem;
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
				width: 70%;
				.num-cunt {
					display: inline-block;
					line-height: 3.5rem;
					border: 1px solid #d9d9d9;
					border-radius: 5px;
					input {
						height: 3.5rem;
						background-color: #f5f5f5;
						width: 3.5rem;
						font-size: 2rem;
						border: 0;
						border-radius: 5px;
					}

					/* span {
						display: inline-block;
						width: 6rem;
						font-size: 1.4rem;
						text-align: center;
						color: #323232;
						border-left: 1px solid #d9d9d9;
						border-right: 1px solid #d9d9d9;
					} */
					.return-num {
						border-left: 1px solid #d9d9d9;
					    border-right: 1px solid #d9d9d9;
					    border-radius: 0;
					    text-align: center;
					    min-width: 50px;
					}
				}
			}
			.sum {
				position: relative;
				display: inline-block;
				line-height: 1.6rem;
				float: right;
				bottom: .9rem;
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
	<div class="goods-block">
		<div class="prod-detail fn-clear">
			<span class="prod-name tz-no-wrap">
				<!-- <span class="select-icon" :style="{ backgroundPosition: selected ? '100%' : '200%' }"></span> -->
				{{ prodInfo.sku.name }}
			</span><br>
			<div class="prod-img">
				<img :src="pic" alt="">
			</div>
			<div class="prod-info">
				<span v-if="prodInfo.has_refund">
					无法再次退货
				</span>
				<span v-else class="detail">数量：
					<span class="num-cunt">
						<input type="button" @click="subNum" value="-"> 
						<input class="return-num" @input="numChange" type="text" :value="returnNum" v-el:returnnum>
						<input type="button" @click="addNum" value="+">
					</span>
				</span>
				
				 <br>
				<span class="sum">总计</span> <br>

				<span phone="13212342345" @click="callFactory" class="factory tz-no-wrap" v-el:factorynum>
					<img src="./resource/phone.png" alt="">
					厂家：&nbsp;{{ prodInfo.sku.factory }}
				</span>
				<span class="sum">￥{{ sum | formatPrice }}</span>
			</div>
		</div>
		<div class="num-date" style="display: none">
			<span>生产批号：&nbsp;12345678901234</span>
			<span class="shelf-life">产品有效期：&nbsp;2016年8月15日</span>
		</div>
		<div class="cover" :style="{display: showHide}"></div>
		<div class="phone-call" :style="{display: showHide}">
			<div class="to-call">
				<span>{{ prodInfo.enterprise.phone }}</span> <br>
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
	name: 'goodsBlock',
	props: {
		'prodInfo': Object,
	},
	data() {
		return {
			phone: '',
			showHide: 'none',
			selected: false,
			returnNum: 0,
			sum: 0,
		}
	},
	methods: {
		callFactory(e) {
			this.showHide = 'block'
			this.phone = this.$els.factorynum.getAttribute('phone')
		},
		cancelCall() {
			this.showHide = 'none'
		},
		addNum() {
			if(this.returnNum < this.prodInfo.num) {
				this.returnNum = this.returnNum + 1
				this.$dispatch('refundProd', {id: this.prodInfo.sku.id, num: this.returnNum})
			} else {
				Jalert('退货数量不能超过订货数量')
			}
		},
		subNum() {
			if(this.returnNum > 0) {
				this.returnNum = this.returnNum - 1
				this.$dispatch('refundProd', {id: this.prodInfo.sku.id, num: this.returnNum})
			}	
		},
		numChange() {
			
			if(!this.$els.returnnum.value || /^[1-9][0-9]*$/.test(this.$els.returnnum.value)) {
				this.returnNum = Number(this.$els.returnnum.value)

				if(this.returnNum <= this.prodInfo.num) {
					this.$dispatch('refundProd', {id: this.prodInfo.sku.id, num: this.returnNum})
				} else {
					this.returnNum = 0
					this.$els.returnnum.value = 0
					this.$dispatch('refundProd', {id: this.prodInfo.sku.id, num: 0})
					Jalert('退货数量不能超过订货数量')
				}
			} else {
				this.$els.returnnum.value = 0
				Jalert('请输入整数')
			}
			
		},
	},
	beforeCompile() {
		this.sum = parseFloat( this.prodInfo.price ) * parseFloat( this.prodInfo.num )
		this.pic = this.prodInfo.sku.pic ? this.prodInfo.sku.pic : '//static.eyaos.com/images/no_product.png'
	},
	filters: {
		formatPrice (price) {
			return Number(price).toFixed(2)
		},
	}

}

</script>