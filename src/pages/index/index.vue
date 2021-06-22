<template>
	<view class="page-box">
		<uni-nav-bar title="分享">
			<view slot="right" class="post-message" @click="postMessage">
				<view class="pm-icon iconfont icon-tianjia1"></view>
			</view>
		</uni-nav-bar>
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="content">
				<view class="content-item" v-for="(item,index) in contentItemList" @click="detail" :key="index" :style="item.image ? {'background-image': 'url('+ item.image +')'} : ''">
					<view class="background-shade">
						<view class="ci-top">
							<image class="ch-icon" src='../../static/index/background.png'></image>
							<view class="ch-content">
								<view class="cc-name" v-text="item.title"></view> 
								<view class="cc-description" v-text="item.slogan"></view>
							</view>
							<view class="ch-time" v-if="item.date">
								<view class="ct-month">{{item.date.split('-')[1]}}月</view>
								<view class="ct-data">{{item.date.split('-')[2]}}</view>
							</view>
						</view>
						<view class="ci-bottom">
							<view class="ci-content" v-text="item.description">
							</view>
							<view class="ci-footer">
								<view class="inline iconfont icon-xihuan3"></view><text class="inline text">122</text>
								<view class="inline iconfont icon-xiaoxi1"></view><text class="inline text" style="margin-right: 0;">233</text>
							</view> 
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<custom-footer-menu>	
		</custom-footer-menu>
	</view>
</template>

<script lang="ts">
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import CustomFooterMenu from '@/components/custom-footer-menu/index.vue'
	import { Vue, Component } from 'vue-property-decorator'
	@Component({
		components: {
			uniNavBar,
			CustomFooterMenu
		}
	})
	export default class Index extends Vue {
		title:string = 'Hello';
		contentItemList:Array<any> = [];
		created() {
			this.getList() //操作在getList中处理不然拿出来就是个promise对象
		}
		onShow() {
			if (uni.getStorageSync('isDoRefresh') === 1) {
				this.getList()
			}
		}
		// 获取列表信息
		async getList ():Promise<void> {
			let res = await this.$store.dispatch('index/getBLogList')
			if(res.statusCode && res.statusCode === 200){
				this.contentItemList = res.data
				console.log('this.contentItemList', this.contentItemList)
			}else{
				console.log(res)
			}
		}
		// 详情
		detail ():void {
			uni.navigateTo({url: 'indexDetail/index'})
		}
		// 发帖
		postMessage ():void {
			uni.navigateTo({url: '/pages/publish/index'})
		}
	}
</script>

<style>
	.page-box{
		width: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
	}
	.post-message{
		font-size: 28rpx;
	}
	.pm-icon {
		font-size: 48rpx;
		color: #1A1A1A;
	}
	.scroll-box{
		flex-grow: 1;
		overflow: hidden;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.content-item{
		width: 100%;
		height: 400rpx;
		margin: 0 0 20rpx 0;
		background-image: url(../../static/index/background.png);
		background-position: 50%;
		background-size: cover;
		color: #FFFFFF;
		font-size: 24rpx;
	}
	.content-item:last-child{
		margin: 0;
	}
	.background-shade{
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.4);
		display: flex;
		flex-direction: column;
		justify-content:space-between
	}
	.ci-top{
		display: flex;
		padding: 20rpx 16rpx;
		height: 80rpx;
		line-height: 80rpx;
	}
	.ch-icon{
		width: 80rpx;
		height: 80rpx;	
		margin: 0 20rpx 0 0;
	}
	.ch-content{
		height: 80rpx;
		line-height: 80rpx;
	}
	.ch-time{
		flex-grow: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.ct-data{
		height: 70rpx;
		width: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background: #BF5633;
		border-radius: 50%;
		margin: 0 0 0 10rpx;
	}
	.cc-name{
		height: 42rpx;
		line-height: 42rpx;
		font-size: 32rpx;
	}
	.cc-description{
		height: 32rpx;
		line-height: 32rpx;
		opacity: .5;
	}
	.ci-content{
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		margin: 0 20rpx 20rpx;
	}
	.ci-footer{
		margin: 0 20rpx 20rpx;
		opacity: .5;
		text-align: right;
	}
	.inline{
		display: inline-block;
		margin-right: 6rpx;
	}
	.ci-footer .text{
		height: 32rpx;
		margin-right: 12rpx;
		line-height: 32rpx;
		vertical-align: top;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
