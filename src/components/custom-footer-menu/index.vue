<template>
	<view class="footer">
		<view class="type" @tap=changeType(0)>
			<view class="iconfont icon-shouye1"></view>
			<text class="title">首页</text>
		</view>
		<view class="type" @tap=changeType(1)>
			<view class="iconfont icon-huati"></view>
			<text class="title">小程序</text>
		</view>
		<view class="type" @tap=changeType(2)>
			<view class="iconfont icon-xiaoxi"></view>
			<text class="title">消息</text>
		</view>
		<view class="type" @tap=changeType(3)>
			<view class="iconfont icon-buoumaotubiao03"></view>
			<text class="title">我</text>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		methods: {
			changeType (params:number) {
				if (params === 1) {
					uni.navigateTo({
						url: '/pages/smallProgram/index'
					})
				}
				if (params === 3) {
					uni.navigateTo({
						url: '/pages/userinfo/index'
					})
				}
			}
		}
	}
</script>

<style>
	.footer{
		height: 120rpx;
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
