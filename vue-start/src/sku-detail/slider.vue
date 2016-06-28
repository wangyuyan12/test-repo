<style lang='less'>
	.slider-wrapper{
		position: relative;
		overflow: hidden;
		width: 100%;
		height: 341px;
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
	<div class="slider-wrapper" v-el:wrapper 
		@touchstart ='changeImgStart'
		@touchmove="changeImgMove"
		@touchend="changeImgEnd">
		<div class="sliders clearfix" v-el:sliders>
			<slot></slot>
		</div>
		<ul class="slider-nav" v-el:circles>
			<li v-for='n in count'>
				<span class="circle" :class="{'active': n === current }"></span>
			</li>
		</ul>
	</div>

</template>

<script>
	
export default {
	name: 'slider',

	props: {
		count: Number,
		interval: Number
	},

	data: () => {
		return {
			current: 0,
			sliderWidth: 0,
			sliders: null,
			imgs: null,
			imgWidth: 0,
			imgHeight: 0,
			changeImg: '',
			intervalFlag: null,
			startX: 0,
			offsetX: 0,
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
			console.log('offsetX:', this.offsetX)
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
			console.log('in changeImgs', index)
			if(index === 'next') {
				this.current ++
			} else if(index === 'pre') {
				this.current --
			} else {
				this.current = parseInt(index)
			}
			this.current = this.current < 0 ? this.count-1 : this.current % this.count
			this.sliders.style.marginLeft = '-' + (this.current * this.sliderWidth) + 'px'
		},
		autoPlay() {
			this.intervalFlag = setInterval(() => { this.changeImgs('next') }, this.interval)
		}
	},

	ready() {
		console.log('in ready')
		this.sliderWidth = this.$els.wrapper.parentNode.clientWidth
		let sliderHeight = this.$els.wrapper.parentNode.clientHeight
		this.sliders = this.$els.sliders
		this.imgs = this.sliders.getElementsByTagName('img')
		for( let i=0; i<this.imgs.length; i++) {  //重置图片尺寸
			this.imgs[i].style.width = this.sliderWidth + 'px'
			this.imgs[i].style.height = sliderHeight + 'px'
		}
		this.$els.circles.style.width = this.count * 20 + 'px'	 //小园点
		this.sliders.style.width = (this.count * this.sliderWidth) + 'px' //slider总宽度
		this.autoPlay()	//启动
		
	}
}

</script>