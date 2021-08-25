<template>
	<view v-if="show" class="box">
		<web-view v-if="showIframe" ref="webView" class="webView" :src="`/static/video.html?urlParams=${urlParams}&others=`"  :style="{height: videoHeight + 'px'}"></web-view>
		<view  :style="{'padding-top': videoHeight + 'px',width: '100%',background: '#000000'}"></view>
		<scroll-view scroll-y="true" class="scroll-box">
			<view v-if="playroad.length !== 0" class="sb-text">线路<text class="sb-text-red">{{type === 'independent' ? '（先选集数再选线路）' : '（先选线路再选集数）'}}</text></view>
			<view v-for="(item,index) in playroad" :class="['sb-collection', index%5===4?'newSty':'', item.active ? 'active': '']" :style="{width: contentImgSize + 'px', 'text-align': textAlign,'padding-left': paddingLeft + 'px'}" @tap="changePlayRoad(item,index)">{{item.text}}</view>
			<view v-if="collections.length !== 0" class="sb-text">播放列表</view>
			<view v-for="(item,index) in collections" :class="['sb-collection', index%5===4?'newSty':'', item.active ? 'active': '']" :style="{width: contentImgSize + 'px', 'text-align': textAlign,'padding-left': paddingLeft + 'px'}" @tap="toPlay(item.url,index)">{{item.text}}</view>
		</scroll-view>
		<uni-popup ref="popup" type="center" class="popup" duration="2000">
		    <view class="dialog">
		    	<text>{{tipMsg}}</text>
		    </view>
		</uni-popup>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { mapState } from 'vuex'
	@Component({
		components: {}
	})
	export default class Index extends Vue {
		show:boolean = true
		textAlign: string = 'center'
		tipMsg: string = ''
		paddingLeft: number = 0
		showIframe: boolean = false
		dtlParams: string = ''
		urlParams: string = ''
		source: any = {}
		contentImgSize: number = 0
		collections: Array<any> = []
		playroad: Array<any> = []
		collectionsArr: Array<any> = []
		currentPageUrl: string = ''
		type:string = ''
		video: any = {}
		player: any = {}
		player_video: any = {}
		videoHeight: number = 0
		form = {
			pusherHeadImg: '',
			msgType: '',
			pusherName: '',
			pushContentText: '',
			pushContentImg: [],
			pushContentVideo: []
		}
		imgs: Array<string> = []
		mounted () {
			this.getData(this.$store.state.movie.toDtlParams, this.$store.state.movie.listType)
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			this.videoHeight = windowHeight/3
			// #ifdef APP-PLUS
				var currentWebview = (this as any).$scope.$getAppWebview();//获取当前web-view
				setTimeout(() => {
					var wv = currentWebview.children()[0];
					wv.setStyle({//设置web-view距离顶部的距离以及自己的高度，单位为px
					height:this.videoHeight
				})
				},0)
			// #endif
		}
		async getData (params: string, listType: string) {
			uni.showLoading({
			    title: '数据加载中...',
				mask: true
			});
			let res = await this.$store.dispatch('movie/find/msgDtl', {params, listType})
			uni.hideLoading();
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			if (res.statusCode === 200) {
				this.show = true
				this.type = res.data.type
				this.collectionsArr = res.data.collection
				if (this.type === 'combination') {
					this.collections = this.collectionsArr[0]
				}
				if (this.type === 'independent'){
					this.collections = this.collectionsArr
				}
				this.collections = this.collections.map((item:any, index: number) => ({
					...item,
					active: index === 0 ? true : false
				}))
				this.playroad = res.data.playroad.map((item:any, index: number) => ({
					...item,
					active: index === 0 ? true : false
				}))
				if (this.collections.filter(item => item.text.length > 6).length !== 0) {
					this.contentImgSize = windowWidth - 20
					this.textAlign = 'left'
					this.paddingLeft = 5
				} else {
					this.contentImgSize = (windowWidth - 40)/5
				}
				this.toPlay(this.collections[0].url, 0)
			} else {
				this.tipMsg = '数据获取失败！';
				(this.$refs.popup as any).open()
				setTimeout(() => {
					(this.$refs.popup as any).close()
				},1000)
			}
		}
		async toPlay (url: string, index: number) {
			this.collections = this.collections.map((item: any, cindex: number) => ({
				...item,
				active: index === cindex ? true : false
			}))
			uni.showLoading({
			    title: '视频加载中...',
				mask: true
			});
			this.showIframe = false
			this.currentPageUrl = url
			let res = await this.$store.dispatch('movie/find/play', url)
			uni.hideLoading();
			if (res.statusCode === 200) {
				this.urlParams = res.data.replace("?","m4u9haha")
				console.log('this.urlParams', this.urlParams)
				setTimeout(() => {
					this.showIframe = true
					var currentWebview = (this as any).$scope.$getAppWebview();//获取当前web-view
					setTimeout(() => {
						var wv = currentWebview.children()[0];
						wv.setStyle({//设置web-view距离顶部的距离以及自己的高度，单位为px
						height:this.videoHeight
					})
					},100)
				}, 200)
			} else {
				this.tipMsg = '视频加载失败！';
				(this.$refs.popup as any).open()
				setTimeout(() => {
					(this.$refs.popup as any).close()
				},1000)
			}
			
		}
		async changePlayRoad (params: any, index: number) {
			this.playroad = this.playroad.map((item: any, cindex: number) => ({
				...item,
				active: index === cindex ? true : false
			}))
			if (this.type === 'combination') {
				this.collections = this.collectionsArr[index]
				return
			}
			uni.showLoading({
			    title: '视频加载中...',
				mask: true
			});
			this.showIframe = false
			let res = await this.$store.dispatch('movie/find/changePlayRoad', {...params, url: this.currentPageUrl})
			uni.hideLoading();
			if (res.statusCode === 200) {
				console.log('res', res)
				this.urlParams = res.data.replace("?","m4u9haha")
				setTimeout(() => {
					this.showIframe = true
					var currentWebview = (this as any).$scope.$getAppWebview();//获取当前web-view
					setTimeout(() => {
						var wv = currentWebview.children()[0];
						wv.setStyle({//设置web-view距离顶部的距离以及自己的高度，单位为px
						height:this.videoHeight
					})
					},100)
				}, 200)
			} else {
				this.tipMsg = '视频加载失败！';
				(this.$refs.popup as any).open()
				setTimeout(() => {
					(this.$refs.popup as any).close()
				},1000)
			}
			
		}
	}
</script>

<style scoped>
	.box{
		position: relative;
		height: 100%;
	}
	.sb-collection{
		font-size: 28rpx;
		height: 52rpx;
		line-height: 52rpx;
		border: #EDEDED 1px solid;
		display: inline-block;
		margin-right: 10rpx;
		margin-bottom: 10rpx;
		box-sizing: border-box;
		text-align: center;
	}
	.newSty{
		margin-right: 0;
	}
	.webView{
		overflow: hidden;
	}
	.scroll-box{
		padding: 20rpx;
		flex-grow: 1;
		box-sizing: border-box;
		/* position: absolute;
		width: 100%;
		bottom: 0;
		z-index: 100; */
	}
	.sb-text, .sb-text-red{
		font-size: 14px;
		margin-bottom: 10rpx;
		margin-left: 4rpx;
		color: #666;
	}
	.sb-text-red{
		color: red;
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
		background: rgba(0,0,0,0)!important;
	}
	.active{
		background-color: #31B341;
		color: #fff;
	}
</style>
