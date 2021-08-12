<template>
	<view class="page-box" @tap="closeOperation">
		<uni-nav-bar title="分享">
			<view slot="right" class="post-message" @click="postMessage">
				<view class="pm-icon iconfont icon-tianjia1"></view>
			</view>
		</uni-nav-bar>
		<scroll-view scroll-y="true" class="scroll-box" @scroll="scrollBtn">
			<view class="content">
				<view class="content-item" v-for="(item,index) in contentItemList" @click="detail" :key="index" :style="item.image ? {'background-image': 'url('+ item.image +')'} : ''" @longpress="longpress($event, scrollValue, item)" @touchstart="touchstart($event, scrollValue)">
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
					<view class="background-opretion" :style="{display: item.show ? 'block' : 'none'}">
						<view class="operation-box">
							<view class="operation-save" @tap.stop="save">保存</view>
							<view class="operation-delete" @tap.stop="cancel(item)">删除</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<custom-footer-menu>	
		</custom-footer-menu>
		<!-- popup -->
		<uni-popup ref="popup" type="center" class="popup" duration="2000">
		    <view class="dialog">
		    	<text>{{msg}}</text>
		    </view>
		</uni-popup>
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
		stopSend: boolean = false
		title:string = 'Hello';
		msg:string = '操作成功';
		contentItemList:Array<any> = [];
		scrollStart: number = 0;
		scrollValue: number = 0;
		created() {
			this.getList() //操作在getList中处理不然拿出来就是个promise对象
		}
		touchstart (res: any, params: number) {
			this.scrollStart = params
		}
		scrollBtn (res: any) {
		 this.scrollValue = res.detail.scrollTop
		 if (this.contentItemList.filter(item => item.show === true).length !== 0) {
			 this.contentItemList = this.contentItemList.map((item: any) => ({
			 	...item,
			 	show: false
			 }))
		 }
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
				this.contentItemList = (res.data as any).map((item: any) => ({
					...item,
					show: false
				}))
				console.log('this.contentItemList', this.contentItemList)
			}else{
				console.log(res)
			}
		}
		longpress (res: any, params: number, item: any) {
			this.stopSend = true
			setTimeout (() => {
				this.stopSend = false
			}, 500)
			if (this.scrollStart !== params) {
				return
			}
			this.contentItemList = this.contentItemList.map(item => ({
				...item,
				show: false
			}))
			console.log('触发删除', item)
			let index = this.contentItemList.findIndex(citem => citem.id === item.id)
			this.contentItemList[index].show = true
		}
		// 详情
		detail ():void {
			uni.navigateTo({url: 'indexDetail/index'})
		}
		// 发帖
		postMessage ():void {
			uni.navigateTo({url: '/pages/publish/index'})
		}
		save () {}
		async cancel (item: any) {
			let res = await this.$store.dispatch('index/deleteBLog', item)
			if (res.statusCode === 200) {
				this.msg = '操作成功'
				this.$refs.popup.open()
				this.getList()
			} else {
				this.msg = '操作失败'
				this.$refs.popup.open()
			}
			setTimeout(() => {
				this.$refs.popup.close()
			},1000)
		}
		closeOperation () {
			if (!this.stopSend) {
				this.contentItemList = this.contentItemList.map((item: any) => ({
					...item,
					show: false
				}))
			}
			
		}
	}
</script>

<style>
	.page-box{
		width: 100%;
		position: fixed;
		top: var(--status-bar-height);
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
		position: relative;
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
	.background-opretion{
		position: absolute;
		background-color: rgba(0,0,0,.7);
		top: 0;
		bottom: 0;
		width: 100%;
	}
	.operation-box{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.operation-save,.operation-delete{
		display: inline-block;
		color: #fff;
		width: 140rpx;
		height: 140rpx;
		line-height: 140rpx;
		font-size: 40rpx;
		font-weight: bold;
		text-align: center;
		border-radius: 50%;
	}
	.operation-save{
		background-color: #82C062;
		margin-right: 30rpx;
	}
	.operation-delete{
		background-color: #CF6F6B;
		margin-left: 30rpx;
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
	.popup >>> .dialog{
		width: 150px;
		height: 100px;
		text-align: center;
		line-height: 100px;
		border-radius: 5px;
		background: rgba(0,0,0,.5);
		color: #fff;
	}
	.popup >>> .uni-transition{
		background: rgba(255, 255, 255, 0.4)!important;
	}
</style>
