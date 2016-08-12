<style lang='less'>
	.fn-clear::after {
	    display: block;
	    font-size: 0;
	    height: 0;
	    visibility: hidden;
	    clear: both;
	    content: " ";
	}
	.sku-detail {
		width: 100%;
		position: relative;
	}
	.page-one {
		position: relative;
	}
	.page-two {
		position: relative;
	}
	.sku-banner {
		height: 30.5rem;
		width: 100%;
		background-color: #d0d0d0;
	}

	.sku-head {
		overflow: hidden;
		background-color: #fff;
		.sku-name {
			margin-top: 10px;
			margin-left: 15px;
			text-overflow: ellipsis;
			font-size: 1.6rem;
			font-weight: 600;
			color: #313131;
		}
		.sku-price {
			margin: 10px 10px 10px 15px;
			color: #ff4202;
			font-size: 1.2rem;
			.price-inter-part {
				font-size: 1.8rem;
			}
			img {
				margin-left: 10px;
				height: 1.8rem;
			}
			.rate {
				display: inline-block;
				background: url('/static/classic/purchase/resource/rate-back.png');
				background-size: 100% 100%;
				margin-left: 10px;
				line-height: 1.8rem;
				color: #fff;
				font-size: 1.2rem;
				padding: 0 5px 0;
			}
		}
	}

	.sku-info {
		margin-top: 10px;
		overflow: hidden;
		background-color: #fff;
		color: #c0c0c0;
		font-size: 1.4rem;
		p {
			margin: 10px 10px 10px 15px;
			.info-left {
				display: inline-block;
				width:55%;
			}
			.info-right {
				display: inline-block;
			}
		}
	}
	
	.show-more {
		padding-top: 20px;
		color: #646464;
		font-size: 1.4rem;
		text-align: center;
		img {
			height: 1.1rem;
		}
	}

	.content-nav {
		color: #323232;
		font-size: 1.6rem;
		text-align: center;
		background-color: #fff;
		span {
			display: inline-block;
			width: 49%;
			padding-top: 12px;
			padding-bottom: 12px;
			
		}

		.selected {
			border-bottom: 2px solid #30b2fd;
			color: #30b2fd;
		}
	}

	.content {
		margin-top: 10px;
		background-color: #fff;
		color: #646464;
		font-size: 1.4rem;

		.content-head {
			
			padding: 10px 10px 10px 15px;
			border-bottom: 1px solid #d9d9d9;
		}

		.content-intro {
			padding: 15px 10px 30px 15px;
			white-space: pre-wrap;
		}
	}
	
	.prod-param {
		margin-top: 10px;
		overflow: hidden;
		background-color: #fff;
		padding: 5px 10px 15px 15px;
		font-size: 1.4rem;
		color: #646464;

		p {
			margin-top: 10px;
			.intro-left {
				display: inline-block;
				width: 55%;
			}
		}
	}
	.cart-operate {
		position: fixed;
		bottom: 5rem;
		z-index: 998;
		background-color: #fff;
		width: 100%;
		height: 17rem;
		text-align: center;
		p {
			margin: 15px;
			.check-cart {
				float: left;
				font-size: 1.4rem;
				text-decoration: none;
				color: #2fb2fa;
			}
			.close {
				display: inline-block;
				float: right;
				width: 1.5rem;
				height: 1.5rem;
				background: url('/static/classic/purchase/resource/close.png');
				background-size: 100% 100%;
			}
		}

		.num-operate {
			line-height: 7rem;
			font-size: 1.6rem;
			color: #323232;
			.num-cunt {
				display: inline-block;
				vertical-align: middle;
				height: 4rem;
				border: 1px solid #d9d9d9;
				border-radius: 4px;
				width: 14.5rem;
				.sub {
					display: inline-block;
					height: 100%;
					width: 3.8rem;
					float: left;
					border-right: 1px solid #d9d9d9;
					background: url('/static/classic/purchase/resource/add-sub.png');
					background-size: 200% 100%;
					background-position: 0;
				}
				.add {
					display: inline-block;
					height: 100%;
					width: 3.8rem; 
					float: right;
					border-left: 1px solid #d9d9d9;
					background: url('/static/classic/purchase/resource/add-sub.png');
					background-size: 200% 100%;
					background-position: 100%;
				}
				.num {
					line-height: 4rem;
					width: 45%;
					float: left;
					font-size: 1.5rem;
				}

			}
		}

	}

	.add-cart {
		position: fixed;
		bottom: 0px;
		height: 5rem;
		width: 100%;
		z-index: 999;
		button {
			width: 100%;
			height: 100%;
			border: 0;
			background-color: #30b3fb;
			color: #dff3fe;
			font-size: 1.6rem;
			font-weight: 600;
		}
	}
	.cover {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: #000;
		top: 0;
		left: 0;
		z-index: 990;
		opacity: 0.15;
		display: none;
	}
	
	.leaveshow-transition {
		transition: .5s ease-in-out;
	}
	.leaveshow-enter, .leaveshow-leave {
		opacity: 0;
	}

	.showcart-transition {
		transition: .5s ease-in-out;
	}
	.showcart-enter, .showcart-leave {
		bottom: -12rem;
	}

</style>

<template>
	<div class="sku-detail">
		<div id='page-one' class='page-one'
			transition='leaveshow'
			v-if='isPageOne'>
			<div class='sku-banner'>
				<!-- 等数据更新好之后，渲染slider，否则 呵呵 -->
				<slider v-if='imgs.length > 0' :interval='3000' :img-array='imgs' > </slider>
			</div>
			<div class='sku-head'>
				<div class="sku-name"><span>{{ skuName }}</span></div>
				<div class="sku-price">
					<span>￥</span>
					<span class='price-inter-part'>{{ priceInt}}</span>
					<span class='price-decimal-part'>.{{ priceDeci }}</span>
					<span class="rate">支付订金{{ rate }}%</span>
				</div>
			</div>
			<div class="sku-info"
				@touchstart ='touchStartP1'
				@touchmove="touchMoveP1" 
				@touchend="touchEndP1"
				@touchcancel="touchCancelP1">
				<p>
					<span class="info-left">规格:&nbsp;&nbsp;{{ specs }}</span>
					<span class="info-right">库存数量:&nbsp;&nbsp;{{ stock }}</span>
				</p>
				<p>
					<span class="info-left">剂型:&nbsp;&nbsp;{{ dosageForm }}</span>
					<span class="info-right">销售控制:&nbsp;&nbsp;{{ limit }}</span>
				</p>
				<p>
					<span class="info-left">单位:&nbsp;&nbsp;{{ unit }}</span>
				</p>
			</div>
			<div id='show-more' class="show-more" 
				:style="{height: showMoreHeight + 'px'}"
				@touchstart ='touchStartP1'
				@touchmove="touchMoveP1" 
				@touchend="touchEndP1"
				@touchcancel="touchCancelP1">
				<img src="/static/classic/purchase/resource/arrow.jpg">
				<span>下拉显示更多</span>
			</div>
		</div>
		<div id='page-two' class="page-two"
			transition='leaveshow'
		 	v-else>
			<div class="content-nav">
				<span :class="isProdCont ? 'selected' : ''" class="selected" @click="contSwitch(true)">图文详情</span>
				<span :class="isProdCont ? '' : 'selected'"  @click="contSwitch(false)">规格参数</span>
			</div>
			<div class="content-container"
				:style="{height: conthHeight + 'px'}" 
				@touchstart ='touchStartP2'
				@touchmove="touchMoveP2" 
				@touchend="touchEndP2"
				@touchcancel="touchCancelP2">		
				<div class="content" v-if='isProdCont'>
					<div class="content-head">
						<span>产品详情</span>
					</div>
					<div class="content-intro" v-el:wordpic>
						 {{ adMsg }} 
					</div>
				</div>
				<div class="prod-param" v-else>
					<p>
						<span class="intro-left">规格:&nbsp;&nbsp;{{ specs }}</span>
						<span class="intro-right">剂型:&nbsp;&nbsp;{{ dosageForm }}</span>
					</p>
					<p>
						<span class="intro-left">中包数量:&nbsp;&nbsp;{{ midBag }}</span>
						<span class="intro-right">整件数量:&nbsp;&nbsp;{{ largeBag }}</span>
					</p>
					<p>
						<span class="intro-left">单位:&nbsp;&nbsp;{{ unit }}</span>
						<span class="intro-right">是否医保:&nbsp;&nbsp;{{ isMedCare }}</span>
					</p>
					<p>
						批准文号:&nbsp;&nbsp;{{ license }}
					</p>
					<p>
						生产企业:&nbsp;&nbsp;{{ factory }}
					</p>
					<p>
						商业公司:&nbsp;&nbsp;{{ company }}
					</p>
				</div>
			</div>
		</div>
		<div v-if='cartStatus' class="cart-operate" transition="showcart">
			<p class="fn-clear">
				<a href="" class="check-cart">查看购物车</a>
				<span class="close" @click="closeCart"></span>
			</p>
			<span class="num-operate fn-clear" >采购数量：
				<span class="num-cunt">
					<span class="sub" @click="subNum"></span>
					<span class="num">{{ addCartNum }}</span>
					<span class="add" @click="addNum"></span>
				</span>
			</span>
		</div>
		<div class="add-cart">
			<button @click="addCart" :disabled="btnStatus" :style="{backgroundColor: btnStatus ? 'gray' : '#30b3fb'}">{{ cartStatus ? "确定" : '加入购物车' }}</button>
		</div>
		<div class="cover" :style="{display: cartStatus ? 'block' : 'none'}"></div>
    </div>
	
</template>

<script>
import fetch from 'isomorphic-fetch'
import slider from './slider.vue'

export default {
	name: 'skuDetail',

	components: {
		'slider': slider,
	},

	data: function() {
		return {
			showMoreHeight: window.innerHeight - 560,
			conthHeight: window.innerHeight - 120,
			csrftoken: '',
			skuId: null,
			skuName: '--',
			priceInt: '00',
			priceDeci: '00',
			rate: 0,
			specs: '--',
			stock: '--',
			dosageForm: '--',
			limit: '--',
			limitNum: 1,
			unit: '--',
			midBag: '--',
			largeBag: '--',
			isMedCare: '--',
			license: '--',
			factory: '--',
			company: '--',
			adMsg: '--',
			isProdCont: true,
			isPageOne: true,
			startY: 0,
			offsetY: 0,
			imgs: [],  //先置为空
			addCartNum: 0,
			cartStatus: false, //false: 加入购物车; true: 确定
			btnStatus: true,
		}
	},

	methods: {
		contSwitch(stat) {
			this.isProdCont = stat
		},
		touchStartP1(e) {
			e.preventDefault()
			let touch = e.touches[0]
			this.startY = touch.pageY
		},
		touchMoveP1(e) {
			e.preventDefault()
			let touch = e.touches[0]
			this.offsetY = touch.pageY - this.startY
			if(this.offsetY < 0) {
				document.getElementById('page-one').style.top = this.offsetY + 'px'
			}
			if(this.offsetY < -100) {
				this.isPageOne = false
			}
		},
		touchEndP1(e) {
			e.preventDefault()
			document.getElementById('page-one').style.top = 0 + 'px'
			this.$els.wordpic.innerHTML = this.adMsg  //渲染图文详情
			return
		},
		touchCancelP1(e) {
			e.preventDefault()
			document.getElementById('page-one').style.top = 0 + 'px'
			this.$els.wordpic.innerHTML = this.adMsg  //渲染图文详情
			return
		},
		touchStartP2(e) {
			e.preventDefault()
			let touch = e.touches[0]
			this.startY = touch.pageY
		},
		touchMoveP2(e) {
			e.preventDefault()
			let touch = e.touches[0]
			this.offsetY = touch.pageY - this.startY
			if(this.offsetY > 0) {
				document.getElementById('page-two').style.top = this.offsetY + 'px'
			}
			if(this.offsetY > 100) {
				this.isPageOne = true
			}
		},
		touchEndP2(e) {
			e.preventDefault()
			document.getElementById('page-two').style.top = 0 + 'px'
			return
		},
		touchCancelP2(e) {
			e.preventDefault()
			document.getElementById('page-two').style.top = 0 + 'px'
			return
		},
		addCart() {
			
			if(this.cartStatus) {
				let param = [{id: this.skuId, num: this.addCartNum }]
				param = JSON.stringify(param)
				let vm = this
				Loading('show')
				fetch('/purchase/api/m/cart/', {
					method: 'POST',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
						'X-CSRFTOKEN': this.csrftoken,
					},
					body: param
				}).then((res) => {
					if(res.ok) {
						res.json().then((resp) => {
							Loading('hide')
							if(resp.status === 200) {
								console.log('cart add success')
								self.location = '/purchase/m/shoppingcar/'
							} else {
								Jalert('请重试！', 'icon-error')
							}
						})
					}
				}).catch((err) => {
					Loading('hide')
					Jalert('请重试！', 'icon-error')
				})
				this.cartStatus = false

			} else {
				this.cartStatus = true
			}
			
		},
		closeCart() {
			this.cartStatus = false
		},
		addNum() {
			this.addCartNum = this.addCartNum + this.limitNum
		},
		subNum() {
			if(this.addCartNum > this.limitNum) {
				this.addCartNum = this.addCartNum - this.limitNum
			}
		}
	},

	ready() {
		this.showMoreHeight = window.innerHeight - 560
		if(this.showMoreHeight < 80) {
			this.showMoreHeight = 80
		}
		this.skuId = /detail\/\d+/.exec(location.href)[0].replace('detail\/', '')
		this.csrftoken = document.cookie.match(/csrftoken=\w+/g)[0].replace(/csrftoken=/, '')
		let vm = this
		Loading('show')
		fetch('/purchase/api/m/skuonline/detail/' + this.skuId, {
			method: 'GET',
			credentials: 'include',
			headers: {
				'X-CSRFTOKEN': this.csrftoken,
			}
		}).then(function(res){
			if(res.ok) {
				res.json().then(function(resp) {
					console.log('resp', resp)
					Loading('hide')
					vm.skuName = resp.sku.name || '--'
					vm.priceInt = resp.online_area.price.split('.')[0] || '--'
					vm.priceDeci = resp.online_area.price.split('.')[1] || '--'
					vm.specs = resp.sku.specs || '--'
					vm.dosageForm = resp.sku.dosage_form || '--'
					vm.unit = resp.unit || '--'
					vm.rate = parseFloat(resp.rate) * 100 || 0
					vm.limit = resp.limit === 1 ? '中包' : (resp.limit === 2 ? '整件' : '拆零')
					if(resp.sku.pics.length > 0) {

						for(let i=0; i<resp.sku.pics.length; i++) {
							resp.sku.pics[i].ad_pic = '//static.eyaos.com/images/no_product.png'
						}
						vm.imgs = resp.sku.pics
					} else {
						vm.imgs = [{ad_pic: '//static.eyaos.com/images/no_product.png'}]
					}
					vm.stock = resp.sku_stock ? resp.sku_stock.stock : 0
					if(vm.stock === 0 || resp.sku_stock.sku_status === false) {
						vm.btnStatus = true
					} else {
						vm.btnStatus = false
					}
					vm.adMsg =  resp.sku.ad_msg || '--'
					vm.midBag = resp.middle || '--'
					vm.largeBag = resp.package || '--'
					vm.isMedCare = resp.sku_pro ? (resp.sku_pro.yibao ? '是' : '否') : '否'
					vm.license = resp.license || '--'
					vm.factory = resp.sku.factory || '--'
					vm.company = resp.online_area ? (resp.online_area.company.name || '--') : '--'
					vm.limitNum = resp.limit_num || '--'
					vm.addCartNum = resp.limit_num || '--'
				})
			}
		}).catch((err) => {
			Loading('hide')
			console.log('err', err)
		})
	},
	computed: {
		imgNum: function() {
			console.log('imgs', this.imgs.length)
			return this.imgs.length
		},

	}

}

</script>