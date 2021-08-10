<template>
	<view class="box">
		<view v-for="(item,index) in appArr" :class="index%2 === 0 ? 'box-app-left' : 'box-app-right'" :style="getColor">
			<view class="ba-content" @tap="toApp(item.page)">
				<view class="iconfont icon-weibo icon-color"></view>
				<view class="cb-type">{{item.title}}</view>
				<view class="cb-descrip">{{item.desc}}</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	@Component({})
	export default class Index extends Vue {
		appArr: Array<any> = [{
			title: '微博热搜',
			desc: '随时随地，发现新鲜事！',
			page: '/pages/smallProgram/weibo/index'
		},{
			title: '知乎',
			desc: '有问题上知乎！',
			page: '/pages/smallProgram/weibo/index'
		}]
		mounted () {
			// this.getColor()
		}
		toApp (page: string) {
			uni.navigateTo({
				url: page
			})
		}
		getColor () {
			let colorInde = Math.floor(Math.random() * 10)
			console.log('colorInde', colorInde)
			if (colorInde === 0)
				return '#CF6F6B'
			if (colorInde === 1)
				return '#E18D72'
			if (colorInde === 2)
				return '#E0AA6B'
			if (colorInde === 3)
				return '#DCC26C'
			if (colorInde === 4)
				return '#82C062'
			if (colorInde === 5)
				return '#65C2AB'
			if (colorInde === 6)
				return '#6EC2D6'
			if (colorInde === 7)
				return '#60A9E7'
			if (colorInde === 6)
				return '#5566BA'
			if (colorInde === 7)
				return '#A479D5'
		}
	}
</script>

<style>
	.box{
		width: 100%;
	}
	.box-app-left{
		width: 50%;
		padding-left: 20rpx;
		padding-right: 10rpx;
		box-sizing: border-box;
		float: left;
	}
	.box-app-right {
		width: 50%;
		padding-left: 10rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		float: left;
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
