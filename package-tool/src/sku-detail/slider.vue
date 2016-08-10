<style lang='less'>
	.slider-wrapper{
		position: relative;
		overflow: hidden;
		width: 100%;
		.sliders {
			width: 99999999px;
			transition: all .5s;
			.slider {
				float: left
			}
		}

		.slider-nav {
			position: relative;
			bottom: 25px;
			margin: auto;
			padding: 0;
			li {
				float: left;
				list-style: none;
				.circle {
					display: block;
					margin-left: 7px;
					width: 10px;
					height: 10px;
					border: 1px solid #ddd;
					border-radius: 50%;
					background: transparent;
				}

				.active {
					background-color: #fb83ac;
					border-color: #fb83ac;
				}
			}	
		}
	}
	.slider-wrapper ::after {
		content: '';
		display: block;
		clear: both;
	}
</style>

<template>
	<div class="slider-wrapper"
		@touchstart ='changeImgStart'
		@touchmove="changeImgMove"
		@touchend="changeImgEnd" v-el:wrapper>
		<div class="sliders clearfix" :style="{height: sliderHeight + 'px'}" v-el:sliders>
			<div class="slider" v-for='item in imgArray'>
				<a :href="">
					<img class="slider-img" :src="item.ad_pic">
				</a>
			</div>
		</div>
		<ul class="slider-nav" :style="{display: displayNav}" v-el:circles>
			<li v-for='n in imgsNum'>
				<span class="circle" :class="{'active': n === current }"></span>
			</li>
		</ul>
	</div>

</template>

<script>
	
export default {
	name: 'slider',

	props: {
		interval: Number,
		imgArray: Array,
	},

	data: () => {
		return {
			current: 0,
			sliderWidth: 0,
			sliderHeight: 0,
			sliders: null,
			imgs: [],
			imgsNum: 0,
			imgWidth: 0,
			imgHeight: 0,
			changeImg: '',
			intervalFlag: null,
			startX: 0,
			offsetX: 0,
			displayNav: 'block',
		}
	},
	methods: {
		changeImgStart(e) {
			e.preventDefault()
			let touch = e.touches[0]
			this.startX = touch.pageX
			clearInterval(this.intervalFlag)
		},
		changeImgMove(e) {
			e.preventDefault()
			let touch = e.touches[0]
			this.offsetX = touch.pageX - this.startX
		},
		changeImgEnd(e) {
			e.preventDefault()
			if(this.offsetX === 0) {
				this.imgs[this.current].click()
			} else if(this.offsetX < -150) {
				this.changeImgs('next')
			} else if(this.offsetX > 150) {
				this.changeImgs('pre')
			}
			this.offsetX = 0
			this.autoPlay()
		},
		changeImgs(index) {
			if(index === 'next') {
				this.current ++
			} else if(index === 'pre') {
				this.current --
			} else {
				this.current = parseInt(index)
			}
			this.current = this.current < 0 ? this.imgsNum-1 : this.current % this.imgsNum
			this.sliders.style.marginLeft = '-' + (this.current * this.sliderWidth) + 'px'
		},
		autoPlay() {
			this.intervalFlag = setInterval(() => { this.changeImgs('next') }, this.interval)
		}
	},
	ready() {
		this.sliderWidth = this.$els.wrapper.parentNode.clientWidth
		this.sliderHeight = this.$els.wrapper.parentNode.clientHeight
		this.sliders = this.$els.sliders
		this.imgs = this.sliders.getElementsByTagName('img')
		this.imgsNum = this.imgs.length
		for( let i=0; i<this.imgsNum; i++) {  //重置图片尺寸
			this.imgs[i].style.width = this.sliderWidth + 'px'
			this.imgs[i].style.height = this.sliderHeight + 'px'
		}
		if(this.imgs.length === 1) {
			this.displayNav = 'none'
			return
		}
		this.$els.circles.style.width = this.imgsNum * 20 + 'px'	 //小园点
		this.sliders.style.width = (this.imgsNum * this.sliderWidth) + 'px' //slider总宽度
		this.autoPlay()	//启动
	},
}

</script>