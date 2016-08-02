<style lang="less">
.fn-clear::after {
    display: block;
    font-size: 0;
    height: 0;
    visibility: hidden;
    clear: both;
    content: " ";
}

.prod-detail {
	position: relative;
	padding: 13px 15px;
	border-bottom: 1px solid #f5f5f5;
	overflow: auto;
	img {
		display: inline-block;
		float: left;
		width: 15%;
	}
	.info-detail {
		width: 80%;
		float: left;
		margin-left: 10px;
		overflow: auto;
		span {
			font-size: 1.4rem;
			color: #323232;
		}
		.prod-name {
			display: inline-block;
			width: 65%;
			height: 38px;
		}
		.price-num {
			display: inline-block;
			float: right;
			width: 35%;
			height: 38px;
			text-align: right;
		}
		.specs {
			font-size: 1.1rem;
			color: #999;
		}
	}
}

</style>

<template>
	<div class="prod-detail fn-clear">
		<img :src="pic">
		<div class="info-detail">
			<span class="prod-name">{{ prodInfo.sku.name }}</span>
			<span class="price-num">￥{{ prodInfo.price}}*{{ prodInfo.num }}</span>
			<span class="specs">剂型:&nbsp;&nbsp;{{ prodInfo.sku.specs }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'prodItem',
		props: {
			'prodInfo': Object,
		},
		data() {
			return {
				pic: '',
			}
		},
		beforeCompile() {
			this.pic = this.prodInfo.sku.pic ? this.prodInfo.sku.pic : '//static.eyaos.com/images/no_product.png'
		}
	}
</script>