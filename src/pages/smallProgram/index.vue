<template>
	<view class="box" ref="box">
		<view v-for="(item,index) in appArr" :class="[index%2 === 0 ? 'box-app-left' : 'box-app-right', 'app-item']">
			<view :class="['ba-content', 'color' + Math.floor(Math.random() * 10)]" @tap="toApp(item.page)">
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
			title: '天堂电影院',
			desc: '躲不过的沙暴都是风景。',
			page: '/pages/smallProgram/movie/index'
		},{
			title: '音乐',
			desc: '仙人抚我顶，结发受长生。',
			page: '/pages/smallProgram/music/index'
		}]
		mounted () {}
		toApp (page: string) {
			uni.navigateTo({
				url: page
			})
		}
	}
</script>

<style>
	.box{
		width: 100%;
	}
	.box-app-right, .box-app-left{
		margin-bottom: 20rpx;
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
		border-radius: 5px;
		padding: 10rpx;
		position: relative;
	}
	.color0, .color1{
		background-color: #CF6F6B!important;
	}
	.color2{
		background-color: #E18D72!important;;
	}
	.color3{
		background-color: #E0AA6B!important;;
	}
	.color4{
		background-color: #DCC26C!important;;
	}
	.color5{
		background-color: #82C062!important;;
	}
	.color6{
		background-color: #65C2AB!important;;
	}
	.color7{
		background-color: #6EC2D6!important;;
	}
	.color8{
		background-color: #CF6F6B!important;;
	}
	.color9{
		background-color: #5566BA!important;;
	}
	.color10{
		background-color: #A479D5!important;;
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
