<style lang='less'>
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
				background: url('./resource/rate-back.png');
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

	.add-cart {
		position: fixed;
		bottom: 0px;
		height: 50px;
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

	.leaveshow-transition {
		transition: .5s ease-in-out;
	}
	.leaveshow-enter, .leaveshow-leave {
		opacity: 0;
	}

</style>

<template>
	<div class="sku-detail">
		<div id='page-one' class='page-one'
			transition='leaveshow'
			v-if='isPageOne'>
			<div class='sku-banner'>
				<slider :count='imgNum' :interval='3000'>
					<div class="slider" v-for='item in imgs'>
						<a :href="">
							<img class="slider-img" :src="item.ad_pic">
						</a>
					</div>
				</slider>
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
				:style="{height: showMoreHeight + 'px'}"
				@touchstart ='touchStartP1'
				@touchmove="touchMoveP1" 
				@touchend="touchEndP1">
				<img src="./resource/arrow.jpg">
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
				@touchend="touchEndP2">		
				<div class="content" v-if='isProdCont'>
					<div class="content-head">
						<span>产品详情</span>
					</div>
					<div class="content-intro">
						<span> {{ adMsg }} </span>
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
		<div class="add-cart">
			<button>加入购物车</button>
		</div>
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
			skuId: null,
			skuName: '--',
			priceInt: '00',
			priceDeci: '00',
			rate: 0,
			specs: '--',
			stock: '--',
			dosageForm: '--',
			limit: '--',
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
			imgs: [{ad_pic: 'http://image.iqing.in/recommend/613890e9-3e5d-4acd-afae-003201e1d86d.jpg-cover'},
					{ad_pic: 'http://image.iqing.in/recommend/11576c83-d543-46e9-9725-89125bd066c2.jpg-cover'},
					{ad_pic: 'http://image.iqing.in/recommend/21bd4d0d-19cb-44a5-8946-8ddfc7326ee2.jpg-cover'}],
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
			if(this.offsetY < -150) {
				this.isPageOne = false
			}
		},
		touchEndP1(e) {
			e.preventDefault()
			document.getElementById('page-one').style.top = 0 + 'px'
		},
		touchStartP2(e) {
			// e.preventDefault()
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
			if(this.offsetY > 150) {
				this.isPageOne = true
			}
		},
		touchEndP2(e) {
			e.preventDefault()
			document.getElementById('page-two').style.top = 0 + 'px'
		}
	},

	ready() {
		console.log('in ready')
		let csrftoken = document.cookie.match(/csrftoken=\w+/ig)[0].replace(/csrftoken=/, '')
		console.log('csrftoken', csrftoken)
		let vm = this
		fetch('http://localhost:8000/purchase/api/m/skuonline/detail/15410?area=12569', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'X-CSRFTOKEN': csrftoken,
			}
		}).then(function(res){
			if(res.ok) {
				res.json().then(function(resp) {
					vm.skuName = resp.sku.name || '--'
					console.log('price', resp)
					vm.priceInt = resp.online_area.price.split('.')[0] || '--'
					vm.priceDeci = resp.online_area.price.split('.')[1] || '--'
					vm.specs = resp.sku.specs || '--'
					vm.dosageForm = resp.sku.dosage_form || '--'
					vm.unit = resp.unit || '--'
					vm.rate = parseFloat(resp.rate) * 100 || 0
					vm.limit = resp.limit === 1 ? '中包' : (resp.limit === 2 ? '整件' : '拆零')
					vm.imgs = resp.sku.pics
					vm.stock = resp.sku_stock.stock
					vm.adMsg = resp.sku.ad_msg
					vm.midBag = resp.middle
					vm.largeBag = resp.package
					vm.isMedCare = resp.sku_pro.yibao ? '是' : '否'
					vm.license = resp.license
					vm.factory = resp.sku.factory
					vm.company = resp.online_area.company.name
				})
			}
		}).catch((err) => {
			console.log('err', err)
		})
	},
	computed: {
		imgNum: function() {
			console.log('pic', this.imgs[0].ad_pic)
			return this.imgs.length
		}
	}

}

</script>