<template>
	<view v-if="show" class="box">
		<scroll-view scroll-y="true" class="scroll-box">
			<view class="headerInfo">
				<image class="pusherHeadImg" :src="form.pusherHeadImg"></image>
				<view class="hi-text">
					<view class="hi-pusherName">{{form.pusherName}}</view>
					<view class="hi-msgType">类型：{{form.msgType}}</view>
				</view>
			</view>
			<view class="content-text">{{form.pushContentText}}</view>
			<view class="ct-img-box" v-if="form.pushContentImg.length !== 0">
				<image mode="aspectFill" v-for="(item,index) in form.pushContentImg" :src="item.src" :style="{width: contentImgSize + 'px',height: contentImgSize + 'px'}" :class="index%3 === 0 ? 'cb-first' : (index%3 === 1 ? 'cb-second' : 'cb-third')" @tap="previewImg(item.pic_id)"></image>
			</view>
			<view class="ct-video-box" v-if="form.pushContentVideo.length !== 0">
				<video v-for="(item,index) in form.pushContentVideo" :src="item" style="width: 100%;"></video>
			</view>
			<previewImage ref="previewImage" :imgs="imgs" :rotateBtn="false" :saveBtn="false"></previewImage>
		</scroll-view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component } from 'vue-property-decorator'
	import { mapState } from 'vuex'
	import previewImage from '@/components/kxj-previewImage/kxj-previewImage.vue'
	@Component({
		components: {
			previewImage
		}
	})
	export default class Index extends Vue {
		show:boolean = false
		dtlParams: string = ''
		contentImgSize: number = 0
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
			this.getData(this.$store.state.weibo.toDtlParams)
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();
			// this.contentImgSize = (document.body.offsetWidth - 5 - 5 -20)/3
			this.contentImgSize = (windowWidth - 5 - 5 -20)/3
			
		}
		async getData (params: string) {
			let res = await this.$store.dispatch('weibo/hot/searchDtl', params)
			if (res.statusCode === 200) {
				this.show = true
				this.form = res.data
				this.imgs = res.data.pushContentImg.map((item: any) => item.pic_id)
			}
			console.log('res', res)
		}
		previewImg (item: string) {
			(this.$refs.previewImage as any).open(item);
		}
	}
</script>

<style scoped>
	.box{
		padding: 20rpx;
	}
	.pusherHeadImg{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	.hi-text{
		display: inline-block;
		height: 100rpx;
		line-height: 100rpx;
		vertical-align: top;
		margin-left: 20rpx;
	}
	.hi-pusherName{
		font-size: 32rpx;
		font-weight: bold;
		height: 50rpx;
		line-height: 50rpx;
	}
	.hi-msgType{
		font-size: 28rpx;
		height: 50rpx;
		line-height: 50rpx;
		color: #656B7B;
	}
	.hi-pusherName, .hi-msgType{
		height: auto;
		line-height: auto;
	}
	.content-text{
		font-size: 30rpx;
		font-weight: bold;
		color: #313131;
	}
	.ct-video-box{
		margin-top: 20rpx;
	}
	.ct-img-box{
		margin-top: 10rpx;
	}
	.cb-first, .cb-second, .cb-third{
		margin-top: 10rpx;
		float: left;
		border-radius: 8rpx;
	}
	.cb-first{
		margin-right: 6rpx;
	}
	.cb-second{
		margin-right: 4rpx;
		margin-left: 4rpx;
	}
	.cb-third{
		margin-left: 6rpx;
	}
</style>
