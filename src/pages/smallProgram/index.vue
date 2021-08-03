<template>
	<view class="box">
		<view class="box-app">
			<view class="ba-content" @tap="toApp">
				<view class="iconfont icon-weibo icon-color"></view>
				<view class="cb-type">微博热搜</view>
				<view class="cb-descrip">随时随地，发现新鲜事！</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	@Component({})
	export default class Index extends Vue {
		toApp () {
			uni.navigateTo({
				url: '/pages/smallProgram/weibo/index'
			})
		}
	}
</script>

<style>
	.box{
		width: 100%;
	}
	.box-app{
		width: 50%;
		padding: 10rpx;
	}
	.ba-content{
		height: 200rpx;
		background-color: #E78ED0;
		border-radius: 5px;
		padding: 10rpx;
		position: relative;
	}
	.icon-color{
		color: #fff;
	}
	.cb-type{
		position: absolute;
		left: 5px;
		bottom: 20px;
		font-size: 15px;
		font-weight: bold;
		color: #fff;
	}
	.cb-descrip{
		position: absolute;
		left: 5px;
		bottom: 5px;
		font-size: 12px;
		color: #fff;
	}
</style>
