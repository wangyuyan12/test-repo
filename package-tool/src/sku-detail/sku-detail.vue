<style lang='less'>
	img {
		width: 100%;
		height: 100%;
	}
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
			.tag {
				display: inline-block;	
				margin-left: 10px;
				line-height: 1.8rem;
				color: #fff;
				font-size: 1.2rem;
				padding: 0 5px 0;
			}
			.rate {
				background: url('/static/classic/purchase/resource/rate-auth.png');
				background-size: 200% 100%;
				background-position: 0 100%;
			}
			.auth {
				background: url('/static/classic/purchase/resource/rate-auth.png');
				background-size: 200% 100%;
				background-position: 100% 100%;
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
			width: 1.1rem;
		}
	}

	.content-nav {
		position: fixed;
		top: 0;
		width: 100%;
		height: 5rem;
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
		padding: 5.5rem 0;
		background-color: #fff;
		color: #646464;
		font-size: 1.4rem;

		.content-head {
			
			padding: 10px 10px 10px 15px;
			border-bottom: 1px solid #d9d9d9;
		}

		.content-intro {
			padding: 15px 10px 30px 15px;
			
		}
	}
	
	.prod-param {
		overflow: hidden;
		background-color: #fff;
		padding: 5.5rem 15px;
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
			@touchstart ='touchStartP1'
			@touchmove="touchMoveP1" 
			@touchend="touchEndP1"
			@touchcancel="touchCancelP1"
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
					<span class="tag rate">支付订金{{ rate }}%</span>
					<span v-if="authState == 1" class="tag auth">未授权</span>
				</div>
			</div>
			<div class="sku-info">
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
				:style="{height: showMoreHeight + 'px'}">
				<img src="/static/classic/purchase/resource/arrow.jpg">
				<span>上拉显示更多</span>
			</div>
		</div>
		<div id='page-two' class="page-two"
			transition='leaveshow'
		 	v-else>
			<div class="content-nav">
				<span :class="isProdCont ? 'selected' : ''" @click="contSwitch(true)">图文详情</span>
				<span :class="isProdCont ? '' : 'selected'"  @click="contSwitch(false)">规格参数</span>
			</div>
			<div class="content-container"
				:style="{minHeight: conthHeight + 'px'}" 
				@touchstart ='touchStartP2'
				@touchmove="touchMoveP2" 
				@touchend="touchEndP2"
				@touchcancel="touchCancelP2">		
				<div class="content" :style="{display: isProdCont ? 'block' : 'none'}">
					<div class="content-head">
						<span>产品详情</span>
					</div>
					<div class="content-intro" v-el:wordpic>
						 <!-- {{ contentIntro }} -->
					</div>
				</div>
				<div class="prod-param" :style="{display: isProdCont ? 'none' : 'block'}">
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
		<div v-if='cartStatus===2' class="cart-operate" transition="showcart">
			<p class="fn-clear">
				<a href="/purchase/m/shoppingcar/" class="check-cart">查看购物车</a>
				<span class="close" @click="closeCart"></span>
			</p>
			<span class="num-operate fn-clear" >订货数量：
				<span class="num-cunt">
					<span class="sub" @click="subNum"></span>
					<span class="num">{{ addCartNum }}</span>
					<span class="add" @click="addNum"></span>
				</span>
			</span>
		</div>
		<div class="add-cart">
			<button @click="addCart" :disabled="btnStatus" :style="{backgroundColor: btnStatus ? 'gray' : '#30b3fb'}">{{ cartStatus==2 ? "确定" : (cartStatus==1 ? '加入购物车' : '已下架') }}</button>
		</div>
		<div class="cover" :style="{display: cartStatus==2 ? 'block' : 'none'}"></div>
    </div>
	
</template>

<script>
import reqwest from 'reqwest'
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
			authState: 1,
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
			contentIntro: '--',
			isProdCont: true,
			isPageOne: true,
			startY: 0,
			offsetY: 0,
			offsetTop: 0,
			imgs: [],  //先置为空
			addCartNum: 0,
			cartStatus: 0, //1: 加入购物车; 2: 确定; 0: 下架/库存不足
			btnStatus: true,
		}
	},

	methods: {
		contSwitch(stat) {
			this.isProdCont = stat
		},
		touchStartP1(e) {
			this.offsetTop = document.body.clientHeight - window.innerHeight
			this.offsetTop = this.offsetTop > 0 ? this.offsetTop : 0  //存在屏幕大于body情况
			let touch = e.touches[0]
			if( Math.abs( this.offsetTop - document.body.scrollTop) < 5 ) { //当移动到底部的时候开始统计
				this.startY = touch.pageY
			}
		},
		touchMoveP1(e) {
			let touch = e.touches[0]
			this.offsetY = touch.pageY - this.startY
			if( Math.abs( this.offsetTop - document.body.scrollTop) < 5 ) {  //当移动到底部的时候进行相关操作
				if(this.offsetY < 0 ) { //上拉
					e.preventDefault()
					document.getElementById('page-one').style.top = this.offsetY + 'px'
				}
				if(this.offsetY < -50 ) { //上拉触发页面切换
					e.preventDefault()
					this.isPageOne = false
				}	
			}
			
		},
		touchEndP1(e) {	
			e.preventDefault()		
			if( this.$els.wordpic ) {
				this.$els.wordpic.innerHTML = this.contentIntro  //渲染图文详情
				document.body.scrollTop = 0  //打开新页面，scroll 回顶部
			}
			return
		},
		touchCancelP1(e) {
			e.preventDefault()		
			if( this.$els.wordpic ) {
				this.$els.wordpic.innerHTML = this.contentIntro  //渲染图文详情
				document.body.scrollTop = 0  //打开新页面，scroll 回顶部
			}
			return
		},
		touchStartP2(e) {
			let touch = e.touches[0]
			this.startY = touch.pageY
		},
		touchMoveP2(e) {
			let touch = e.touches[0]
			this.offsetY = touch.pageY - this.startY
			if(this.offsetY > 0 && document.body.scrollTop == 0) {  //页面回到顶部，下拉
				e.preventDefault()
				if(this.offsetY > 0) {
					document.getElementById('page-two').style.top = this.offsetY + 'px'
				}
				if(this.offsetY > 100) {
					this.isPageOne = true
				}
			}
		},
		touchEndP2(e) {
			if( this.offsetY > 0 && document.body.scrollTop == 0) {
				e.preventDefault()
				document.getElementById('page-two').style.top = 0 + 'px'
				return
			}
		},
		touchCancelP2(e) {
			if(document.body.scrollTop == 0) {
				e.preventDefault()
				document.getElementById('page-two').style.top = 0 + 'px'
				return
			}
		},
		addCart() {
			if(this.cartStatus === 2) {
				let param = [{id: this.skuId, num: this.addCartNum }]
				param = JSON.stringify(param)
				let vm = this
				Loading('show')
				reqwest({
					url: '/purchase/api/m/cart?add=true', 
					method: 'POST',
					contentType: "application/json;",
					headers: {
						'X-CSRFTOKEN': this.csrftoken,
					},
					data: param
				}).then(resp => {
					Loading('hide')
					if(resp.status === 200) {
						console.log('cart add success')
						self.location = '/purchase/m/shoppingcar/'
					} else {
						Jalert('请重试！', 'icon-error')
					}
				}).fail((err) => {
					Loading('hide')
					Jalert('请重试！', 'icon-error')
				})
				this.cartStatus = 1

			} else {
				this.cartStatus = 2
			}
			
		},
		closeCart() {
			this.cartStatus = 1
		},
		addNum() {
			let tmpNum = this.addCartNum + this.limitNum
			if(tmpNum > this.stock) {
				Jalert('超过库存数量', 'icon-error')
				return
			} else {
				this.addCartNum = tmpNum
			}
			
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
		reqwest({
			url: '/purchase/api/m/skuonline/detail/' + vm.skuId,
			method: 'GET',
			contentType: "application/json;charset=utf-8;",
			headers: {
				'X-CSRFTOKEN': this.csrftoken,
			}
		}).then(resp => {
			console.log('resp', resp)
			Loading('hide')
			vm.skuName = resp.sku.name || '--'
			vm.priceInt = resp.online_area.price.split('.')[0] || '--'
			vm.priceDeci = resp.online_area.price.split('.')[1] || '--'
			vm.specs = resp.sku.specs || '--'
			vm.dosageForm = resp.sku.dosage_form || '--'
			vm.unit = resp.unit || '--'
			vm.rate = parseFloat(resp.rate) * 100 || 0
			vm.authState = resp.sku_auth ? resp.sku_auth.auth_state : 1
			vm.limit = resp.limit === 1 ? '中包' : (resp.limit === 2 ? '整件' : '拆零')
			if(resp.sku.pics.length > 0) {

				for(let i=0; i<resp.sku.pics.length; i++) {
					let item = resp.sku.pics[i].ad_pic
					resp.sku.pics[i].ad_pic = item ? item : '//static.eyaos.com/images/no_product.png'
				}
				vm.imgs = resp.sku.pics
			} else {
				vm.imgs = [{ad_pic: '//static.eyaos.com/images/no_product.png'}]
			}
			vm.stock = resp.sku_stock ? resp.sku_stock.stock : 0
			vm.contentIntro =  resp.sku.content.replace(/height:\w+/g, 'height:100%') || '--'
			vm.contentIntro = vm.contentIntro.replace(/width:\w+/g, 'width:100%')
			vm.midBag = resp.middle || '--'
			vm.largeBag = resp.package || '--'
			vm.isMedCare = resp.sku_pro ? (resp.sku_pro.yibao ? '是' : '否') : '否'
			vm.license = resp.license || '--'
			vm.factory = resp.sku.factory || '--'
			vm.company = resp.online_area ? (resp.online_area.company.name || '--') : '--'
			vm.limitNum = resp.limit_num || '--'
			vm.addCartNum = resp.limit_num || '--'
			if(vm.stock < vm.addCartNum || resp.sku_stock.sku_status === false) {
				vm.cartStatus = 0 //下架/库存不足
				vm.btnStatus = true
			} else {
				vm.cartStatus = 1 //加入购物车
				vm.btnStatus = false
			}

		}).fail((err) => {
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