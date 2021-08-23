<template>
	<view v-if="show" class="box">
		<web-view v-if="showIframe" ref="webView" class="webView" :src="`/static/video.html?urlParams=${urlParams}`"  :style="{height: videoHeight + 'px'}"></web-view>
		<view  :style="{'padding-top': videoHeight + 'px',width: '100%',background: '#000000'}"></view>
		<scroll-view scroll-y="true" class="scroll-box">
			<view v-if="playroad.length !== 0" class="sb-text">线路<text class="sb-text-red">（先选集数再选线路）</text></view>
			<view v-for="(item,index) in playroad" :class="['sb-collection', index%5===4?'newSty':'']" :style="{width: contentImgSize + 'px', 'text-align': textAlign,'padding-left': paddingLeft + 'px'}" @tap="changePlayRoad(item)">{{item.text}}</view>
			<view v-if="collections.length !== 0" class="sb-text">播放列表</view>
			<view v-for="(item,index) in collections" :class="['sb-collection', index%5===4?'newSty':'']" :style="{width: contentImgSize + 'px', 'text-align': textAlign,'padding-left': paddingLeft + 'px'}" @tap="toPlay(item.url)">{{item.text}}</view>
		</scroll-view>
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
		paddingLeft: number = 0
		showIframe: boolean = false
		dtlParams: string = ''
		urlParams: string = ''
		source: any = {}
		contentImgSize: number = 0
		collections: Array<any> = []
		playroad: Array<any> = []
		currentPageUrl: string = ''
		type:number = 0
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
			this.getData(this.$store.state.movie.toDtlParams)
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
		async getData (params: string) {
			let res = await this.$store.dispatch('movie/find/msgDtl', params)
			console.log('res', res)
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			if (res.statusCode === 200) {
				this.show = true
				this.collections = res.data.collection
				this.playroad = res.data.playroad
				this.type = res.data.type
				if (this.collections.filter(item => item.text.length > 6).length !== 0) {
					this.contentImgSize = windowWidth - 20
					this.textAlign = 'left'
					this.paddingLeft = 5
				} else {
					this.contentImgSize = (windowWidth - 40)/5
				}
				this.toPlay(res.data.collection[0].url)
			} else {
				console.log('无数据')
			}
			console.log('res', res)
		}
		async toPlay (url: string) {
			this.currentPageUrl = url
			let res = await this.$store.dispatch('movie/find/play', url)
			this.showIframe = false
			console.log('res', res)
			this.urlParams = res.data
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
			
		}
		async changePlayRoad (params: any) {
			let res = await this.$store.dispatch('movie/find/changePlayRoad', {...params, url: this.currentPageUrl})
			this.showIframe = false
			console.log('res', res)
			this.urlParams = res.data
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
</style>
