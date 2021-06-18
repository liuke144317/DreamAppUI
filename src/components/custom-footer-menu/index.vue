<template>
	<view class="footer">
		<view class="type">
			<view class="iconfont icon-shouye1"></view>
			<text class="title">首页</text>
		</view>
		<view class="type">
			<view class="iconfont icon-huati"></view>
			<text class="title">标签</text>
		</view>
		<view class="type">
			<view class="iconfont icon-xiaoxi"></view>
			<text class="title">消息</text>
		</view>
		<view class="type" @tap="toUser">
			<view class="iconfont icon-buoumaotubiao03"></view>
			<text class="title">我</text>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toUser () {
				
			}
		}
	}
</script>

<style>
	.footer{
		height: 92rpx;
		display: flex;
		justify-content: space-between;
		flex-shrink: 0;
		padding: 0 30rpx;
	}
	.type{
		width: 92rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
	}
	.type .iconfont{
		font-size: 46rpx;
		margin-top: 6rpx;
	}
	.type .title{
		font-size: 24rpx;
	}
</style>
