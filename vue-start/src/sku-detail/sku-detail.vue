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
		height: 305px;
		width: 100%;
		background-color: #d0d0d0;
		.slider-img {
			/* height: 305px;
			width: 414px; */
		}
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
				<slider :count='3' :interval='3000'>
					<div class="slider" v-for='item in imgs'>
						<a :href="item.goto_url">
							<img class="slider-img" :src="item.img_url">
						</a>
					</div>
				</slider>
			</div>
			<div class='sku-head'>
				<div class="sku-name"><span>{{ skuName }}</span></div>
				<div class="sku-price">
					<span>￥</span>
					<span class='price-inter-part'>20</span>
					<span class='price-decimal-part'>.00</span>
					<img src="./resource/deposit.png" alt="deposit">
				</div>
			</div>
			<div class="sku-info">
				<p>
					<span class="info-left">规格： {{ specs }}</span>
					<span class="info-right">库存数量： {{ stock }}</span>
				</p>
				<p>
					<span class="info-left">剂型: {{ dosageForm }}</span>
					<span class="info-right">销售控制: {{ sellCtl }}</span>
				</p>
				<p>
					<span class="info-left">单位: {{ unit }}</span>
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
						<span> {{ contentIntro }} </span>
					</div>
				</div>
				<div class="prod-param" v-else>
					<p>
						<span class="intro-left">规格： {{ specs }}</span>
						<span class="intro-right">剂型： {{ dosageForm }}</span>
					</p>
					<p>
						<span class="intro-left">中包数量： {{ midBag }}</span>
						<span class="intro-right">整件数量： {{ largeBag }}</span>
					</p>
					<p>
						<span class="intro-left">单位： {{ unit }}</span>
						<span class="intro-right">是否医保： {{ isMdeCare }}</span>
					</p>
					<p>
						批准文号： {{ license }}
					</p>
					<p>
						生产企业： {{ factory }}
					</p>
					<p>
						商业公司： {{ businessComp }}
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
			skuName: '阿司匹林泡腾片（巴米尔）',
			specs: '0.25g*20包',
			stock: '2000000盒',
			dosageForm: '颗粒',
			sellCtl: '拆零',
			unit: '盒',
			midBag: '10盒',
			largeBag: '100盒',
			isMdeCare: '是',
			license: '国药准字号Z23032102341',
			factory: '杭州天猪科技有限公司',
			businessComp: '宁波天猪科技有限公司',
			contentIntro: 'when i was young i\'d listen to the radio waiting for my favorite songs when they played i\'d sing along,it make me smile. those were such happy times and not so long ago how i wondered where they\'d gone. but they\'re back again just like a long lost friend all the songs i love so well.every shalala every wo\'wo',
			isProdCont: true,
			isPageOne: true,
			startY: 0,
			offsetY: 0,
			imgs: [{goto_url: 'http://www.baidu.com', img_url: 'http://image.iqing.in/recommend/613890e9-3e5d-4acd-afae-003201e1d86d.jpg-cover'},
					{goto_url: 'http://www.baidu.com', img_url: 'http://image.iqing.in/recommend/11576c83-d543-46e9-9725-89125bd066c2.jpg-cover'},
					{goto_url: 'http://www.ifeng.com', img_url: 'http://image.iqing.in/recommend/21bd4d0d-19cb-44a5-8946-8ddfc7326ee2.jpg-cover'}]
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

	}
}

</script>